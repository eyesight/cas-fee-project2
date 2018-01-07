import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {UserAuthService} from '../_services/user-auth.service';

@Injectable()
export class RegistrationAuthGuard implements CanActivate {

  constructor( private userAuth: UserAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userAuth.getCurrentUser()){

      // if logged in so redirect to home page with the return url
      this.router.navigate(['/home']);
      return false;
    }
    // not logged in so return true
    return true;
  }
}
