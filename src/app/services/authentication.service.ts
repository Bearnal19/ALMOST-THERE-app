import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage, private plt: Platform) {
    //This may be not should be used 'cause the login in the app is no requerited that all
    /* this.plt.ready().then(()=>{
      this.checkToken();
    }); */
  }

  login(){
    //Steps to proceed
    /* 1. get the credentials
    2. Request to the back end (this return the token)
    3. Storage the token */
    return this.storage.set(TOKEN_KEY, 'User 123456').then(res =>{
      this.authenticationState.next(true);
    });
  }
  logout(){
    return this.storage.remove(TOKEN_KEY).then(res =>{
      this.authenticationState.next(false);
    });
  }
  isAuthenticated(){
    return this.authenticationState.value;
  }
  checkToken(){
    return this.storage.get(TOKEN_KEY).then(res =>{
      //Should check is the token isn't expired and that stuff
      if(res){
        this.authenticationState.next(true);
      }
      
    });
  }
}
