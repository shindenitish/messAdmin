import { Component } from '@angular/core';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

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