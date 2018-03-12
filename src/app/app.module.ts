import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AuthProvider } from '../providers/auth/auth';
import { WindowProvider } from '../providers/window/window';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC_KeK56MdvteYU96PocSxfAaOgO9aVBSI",
  authDomain: "mymess-11f8c.firebaseapp.com",
  databaseURL: "https://mymess-11f8c.firebaseio.com",
  projectId: "mymess-11f8c",
  storageBucket: "mymess-11f8c.appspot.com",
  messagingSenderId: "201921251715"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    WindowProvider
  ]
})
export class AppModule {}
