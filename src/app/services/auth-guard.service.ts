import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app-service.service';
import { Router} from '@angular/router';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  // canActivate(): boolean {
  //   if(!this.auth.isAuthenticated()){
  //       this.router.navigate(['login']);
  //       return false;
  //   }  
  //   return true;
  // }
  
  canActivate(): Observable<boolean> {
    return this.auth.isLoggedIn.pipe(
      take(1), map((isLoggedIn: boolean)=>{
        if(!isLoggedIn){
            this.router.navigate(['login']);
            return false;
        }  
        return true;

      })
    )
   
  }

  constructor( public auth: AppService, public router: Router) { }

  }

