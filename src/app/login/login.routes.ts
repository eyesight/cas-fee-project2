import { RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login.component';

const LoginRoutes = [
  {
    path: '', component: LoginComponent, data: {title: 'Logout'},
    children: [{path: 'forgot-password', component: ForgotPasswordComponent}
    ]
  },
];

export const LoginRoutesModule = RouterModule.forChild(LoginRoutes);
