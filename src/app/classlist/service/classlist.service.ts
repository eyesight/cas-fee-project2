import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {User, UserApprove, UserAuth, UserClassListAvatars, UserPwd} from '../../_models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from '../../_services/http-wrapper.service';


@Injectable()
export class ClasslistService {

  private classlistCache: User[] = null;
  constructor(
    private httpWrp: HttpWrapper) {
  }

  public getClasslist(): Observable<User[]>  {

   // instead of json use JSON.strinfiy
    return this.httpWrp.get('/api/user/classlist')
      .map((result) => {this.classlistCache = result.classlist; console.log(result.classlist); return result.classlist; });
  }


  public getUserDetail(id): User {
    console.log('getUserDetail:' + id);

    if (!this.classlistCache) {
      return null;
    }

    const user  = this.classlistCache
      .filter(x =>  x.id === Number.parseInt(id))[0];
    console.log('user:' + user.id);
    return user;
  }

  public approveUser( user: User, approve: number): Observable<any>  {

    const userApprove: UserApprove = new UserApprove;
    userApprove.email = user.email;
    userApprove.approve = approve;
// instead of json use JSON.strinfiy
    return this.httpWrp.put('/api/user/approve', userApprove)
      .map((x) => x);
  }

}
