import { RouterModule } from '@angular/router';

import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { RegistrationComponent } from './registration.component';

const RegistrationRoutes = [
  {
    path: '', component: RegistrationComponent,
    children: [{ path: 'terms-of-use', component: TermsOfUseComponent }
    ]
  },
];

export const RegistrationRoutesModule = RouterModule.forChild(RegistrationRoutes);
