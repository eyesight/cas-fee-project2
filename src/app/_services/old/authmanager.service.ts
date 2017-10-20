import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'

@Injectable()
export class AuthManager implements CanActivate{

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(window.localStorage.getItem('auth_key')){
      return true;
    } else{
      console.log('not logged in');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
