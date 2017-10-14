/**
 * Created by awedag on 14.10.17.
 */
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';

const ChatRoutes = [
  {
    path: '', children: [
    { path: '', component: ChatComponent },
  ]
  },
];

export const ChatRoutesModule = RouterModule.forChild(ChatRoutes);
