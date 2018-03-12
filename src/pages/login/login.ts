import { Component, OnInit } from '@angular/core';
import { Loading, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { WindowProvider } from '../../providers/window/window';

import { ContactValidator } from '../../validators/contact';

import firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  
  loading: Loading;
  
  loginForm: FormGroup;

  windowRef: any;
  user: any;

  flag: boolean=false;
  
  constructor(private authProvider: AuthProvider,
  private win: WindowProvider,
  private formBuilder: FormBuilder,
  public navCtrl: NavController,
  private alertCtrl: AlertController, 
  private loadingCtrl: LoadingController
  ) {
    this.loginForm = formBuilder.group({
      contact: ['', Validators.compose([Validators.required, ContactValidator.isValid])],
    });
    
  }

  ngOnInit() {
    this.flag=false;
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': response => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.flag=true;
      }
    });

    this.windowRef.recaptchaVerifier.render().then( widgetId => {
      this.flag=false;
      this.windowRef.recaptchaVerifier.reset(widgetId);
    });
  }

  sendLoginCode() {
    firebase.auth().signInWithPhoneNumber('+91'+this.loginForm.value.contact, this.windowRef.recaptchaVerifier).then(result => {
      this.windowRef.confirmationResult = result;

    })
    .catch( error => console.log("Authentication Error: ", error.message) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult.confirm().then( result => {
      this.user = result.user;
    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }
}
