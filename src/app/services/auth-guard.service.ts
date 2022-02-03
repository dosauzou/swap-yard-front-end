import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app-service.service';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(): boolean {
    if(!this.auth.isAuthenticated()){
        this.router.navigate(['login']);
        return false;
    }  
    return true;
  }

  constructor( public auth: AppService, public router: Router) { }

  }

