import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usr="";
  pwd="";
  msg=""
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login(){
    if(this.usr !="" && this.pwd!=""){
      this.authService.login();
    }else{
      this.msg="Ops... User and password are required"
    }
  }
}
