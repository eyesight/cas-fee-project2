import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {UserAuthService} from '../_services/user-auth.service';
import {AlertService} from '../_services/alert.service';
import {RoutesPermission} from '../_models/routes-permission';
import {AlertMessagesService} from '../_services/alert-messages.service';

// map route to access_right
export const ROUTES_PERMISSION: RoutesPermission[] = [
  {route: 'classlist', accessRight: 'classlist'},
  {route: 'chat', accessRight: 'chat'}
];

@Injectable()
export class CanActivateProtectedPagesGuard implements CanActivate {

  private routesAccessRights = ROUTES_PERMISSION;

  constructor(
    private userAuthService: UserAuthService,
    private alertService: AlertService,
    private alertMessagesService: AlertMessagesService) {
  }

  public canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const decision = this.permit(this.userAuthService.getCurrentCan(), this.routesAccessRights.find((x) => x.route === route.routeConfig.path).accessRight);
    if (!decision) {
      this.alertService.error(this.alertMessagesService.MessagesError.authorization);
    }
    return decision;
  }

  public permit(can: string[], accessRight: string): boolean {
    return !!can.find((x) => x === accessRight);
  }
}

