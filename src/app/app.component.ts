import { Component } from '@angular/core';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = RegisterPage;

  constructor(authProvider:AuthProvider) {
    // this.authProvider.getAuthState().subscribe((user) => {
    //   if(user){
    //     console.log('LoggedIn', user);
    //   }
    //   else{
    //     console.log('LoggedOut');
    //   }
    // }); 
  }
}