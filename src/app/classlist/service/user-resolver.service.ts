import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ClasslistService} from './classlist.service';
import {User} from '../../_models/user.model';

@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(
    private classlistService: ClasslistService) {}
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): User {
      return this.classlistService.getUserDetail(route.paramMap.get('id'));
    }

}


