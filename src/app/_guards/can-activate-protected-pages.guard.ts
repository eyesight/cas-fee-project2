import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {UserAuthService} from "../_services/user-auth.service";
import {AlertService} from "../_services/alert.service";
import {RoutesPermission} from "../_models/routes-permission";


// map route to access_right
export const ROUTES_PERMISSION: RoutesPermission[] = [
  {route: 'classlist', accessRight: 'classlist'},
  {route: 'chat', accessRight: 'chat'}
]


@Injectable()
export class CanActivateProtectedPagesGuard implements CanActivate {

  private accessRight = 'chat';
  private routesAccessRights = ROUTES_PERMISSION;

  constructor(private userAuthService: UserAuthService, private alertService: AlertService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(route.routeConfig.path)

    const decision = this.permit(this.userAuthService.getCurrentCan(), this.routesAccessRights.find((x) => x.route === route.routeConfig.path).accessRight);
    if (!decision) {
      this.alertService.error('Sie haben keine Berechtigung für diesen Menupunkt. Ihre Bestätigung ist noch ausstehend', false, 2500);
    }
    return decision;
  }

  public permit(can: string[], accessRight: string): boolean {
    return !!can.find((x) => x === accessRight);
  }
}

