import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  canActivate(): boolean{
    return this.authService.isAuthenticated();
  }
  constructor(private authService: AuthenticationService) { }
}
