import { Component } from '@angular/core';
import { Loading, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { ContactValidator } from '../../validators/contact';

import firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  loading: Loading;
  loginForm: FormGroup;
  private appVerifier: firebase.auth.RecaptchaVerifier;
  
  constructor(private authProvider: AuthProvider,
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

  ionViewDidLoad() {
    this.appVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(){
    console.log("Parameters:", this.loginForm.value.contact, this.loginForm.value.password);
    
    firebase.auth().signInWithPhoneNumber('+91'+this.loginForm.value.contact, this.appVerifier)
    .then(confirmationResult => {
      let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              // Here we need to handle the confirmation code
              confirmationResult.confirm(data.confirmationCode).then(result=> {
                // User signed in successfully.
                console.log(result.user);
                // ...
              }).catch(error => {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log(error);
              });
            }
          }
        ]
      });
      prompt.present();
    }).catch(error => {
      // Error; SMS not sent
      console.error("SMS not sent", error);
    });
  }

}
