/**
 * Created by awedag on 14.10.17.
 */
import { RouterModule } from '@angular/router';
import { ClasslistComponent } from './classlist.component';
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {UserResolverService} from "./service/user-resolver.service";
import {CanDeactivateClasslistService} from "./service/can-deactivate-classlist.service";

const ClasslistRoutes = [
  {
     path: '', component: ClasslistComponent, canDeactivate: [CanDeactivateClasslistService],
    children: [
    { path: 'detail/:id', component: UserDetailComponent,
      resolve: { user: UserResolverService }}
  ]
  },
];

// export const ClasslistRoutesModule = [RouterModule.forChild(ClasslistRoutes), UserResolverService]
export const ClasslistRoutesModule = RouterModule.forChild(ClasslistRoutes);
