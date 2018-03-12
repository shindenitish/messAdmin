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
  verificationCode: string;

  private appVerifier: firebase.auth.RecaptchaVerifier;
  
  constructor(private authProvider: AuthProvider,
  private win: WindowProvider,
  private formBuilder: FormBuilder,
  public navCtrl: NavController,
  private alertCtrl: AlertController, 
  private loadingCtrl: LoadingController
  ) {
    this.loginForm = formBuilder.group({
      contact: ['', Validators.compose([Validators.required, ContactValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {'size':'invisble'});

    this.windowRef.recaptchaVerifier.render();
  }


  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = '+91'+this.loginForm.value.contact;;

    firebase.auth().signInWithPhoneNumber(num, appVerifier).then(result => {
      this.windowRef.confirmationResult = result;
    })
    .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then( result => {
      this.user = result.user;
    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }
}
