import {Injectable} from '@angular/core';
import {User, UserApprove} from '../../_models/user.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from '../../_services/http-wrapper.service';
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ClasslistService {

  private classlistCache: User[] = null;
  private subject = new Subject<number>();

  //private getClassListSub: Subscription;
  constructor(private httpWrp: HttpWrapper) {
  }


  public getClasslistObserver(): Observable<User[]> {


    return new Observable((observer) => {
      let sub1: Subscription = null;
      let sub2: Subscription = null;
      try {
        // initially receive classlist anyway -> next it
        sub1 = this.getClasslist()
          .subscribe((content) => observer.next(content),
            (error) => observer.error(error));

        // wait for anyone kicking us to read data again
        this.subject.asObservable().subscribe((key) => {
            sub2 = this.getClasslist()
              .subscribe((content) => observer.next(content),
                (error) => observer.error(error));
          }
          ,
          (error) => {
            observer.error(error);
          });
      } catch (e) {
        observer.error(e);
      }
      // remove observable
      return () => {
        if (sub1) {
          console.log('getClasslistObserver:unsbus sub1');
          sub1.unsubscribe();
        }
        if (sub2) {
          console.log('getClasslistObserver: unsbus sub2');

          sub2.unsubscribe();
        }
        // nothing to execute
      };
    });

  }

  public getUserDetail(id): User {
    console.log('getUserDetail:' + id);

    if (!this.classlistCache) {
      return null;
    }

    const user = this.classlistCache
      .filter(x => x.id === Number.parseInt(id))[0];
    console.log('user:' + user.id);
    return user;
  }

  public approveUser(userId: number, approve: number): Observable<any> {

    const userApprove: UserApprove = new UserApprove;
    // userApprove.email = user.email;
    userApprove.approve = approve;
    return this.httpWrp.put('/api/user/approve/' + userId, userApprove)
      .map((x) => x);
  }

  public deleteUser(userId: number): Observable<any> {
    console.log('classlistservice:' + userId);
// instead of json use JSON.strinfiy
    return this.httpWrp.delete('/api/user/' + userId)
      .map((x) => {
        this.subject.next(userId);
        return x;
      });
  }

  private getClasslist(): Observable<User[]> {

    return this.httpWrp.get('/api/classlist/all')
      .map((result) => {
        this.classlistCache = result.classlist;
        return result.classlist;
      });
  }

}
