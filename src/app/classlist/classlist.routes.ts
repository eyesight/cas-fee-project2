/**
 * Created by awedag on 14.10.17.
 */
import { RouterModule } from '@angular/router';
import { ClasslistComponent } from './classlist.component';

const ClasslistRoutes = [
  {
    path: '', children: [
    { path: '', component: ClasslistComponent },
  ]
  },
];

export const ClasslistRoutesModule = RouterModule.forChild(ClasslistRoutes);
