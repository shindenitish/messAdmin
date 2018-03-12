import { Component,OnInit } from '@angular/core';
import { Loading, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { WindowProvider } from '../../providers/window/window';

import { ContactValidator } from '../../validators/contact';

import firebase from 'firebase/app';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage  implements OnInit{
  
  loading: Loading;
  loginForm: FormGroup;

  windowRef: any;

  user: any;
  verificationCode: string;
  f: boolean=false;

  private appVerifier: firebase.auth.RecaptchaVerifier;
  
  
  constructor(private authProvider: AuthProvider,
  private win: WindowProvider,
  private formBuilder: FormBuilder,
  public navCtrl: NavController,
  private alertCtrl: AlertController, 
  private loadingCtrl: LoadingController
  ) {
    this.loginForm = formBuilder.group({
      contact: ['', Validators.compose([Validators.required, ContactValidator.isValid])]
    });
  }

  ngOnInit() {
    this.f=false;
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', 
    {
      'size': 'normal',
      'callback': response => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.f=true;
      },
      'expired-callback': function() {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    });

    this.windowRef.recaptchaVerifier.render();
  }  

  sendLoginCode() {    
    firebase.auth().signInWithPhoneNumber('+91'+this.loginForm.value.contact, this.windowRef.recaptchaVerifier)
    .then(result => {
      this.windowRef.confirmationResult = result;
    })
    .catch( error => console.log('Auth failed\n', error.message) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult.confirm(this.verificationCode)
    .then( result => {
      this.user = result.user;
    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }
}
