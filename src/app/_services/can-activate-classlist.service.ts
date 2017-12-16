import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {UserContentDbService} from "./user-content-db.service";
import {Can, User, UserAuth} from "../_models/user.model";
import {UserContentService} from "./user-content.service";
import {UserAuthService} from "./user-auth.service";


@Injectable()
export class CanActivateChat implements CanActivate {

 private accessRight = 'chat';
  constructor( private userAuthService: UserAuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.permit(this.userAuthService.getCurrentCan(), this.accessRight);
  }

  public permit(can: string[], accessRight: string): boolean {
    return !!can.find((x) => x === accessRight);
  }
}

@Injectable()
export class CanActivateClassList implements CanActivate {

  private accessRight = 'classlist';
  constructor( private userAuthService: UserAuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.permit(this.userAuthService.getCurrentCan(), this.accessRight);
  }

  public permit(can: string[], accessRight: string): boolean {
    return !!can.find((x) => x === accessRight);
  }
}


