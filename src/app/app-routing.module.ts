import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MessagingComponent } from './components/messaging/messaging.component';
import { NotificationComponent } from './components/notification/notification.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';


const routes: Routes = [
  { path: '',     component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent,canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'chats', component: MessagingComponent, canActivate: [AuthGuardService]},
  {path: 'matches', component: NotificationComponent, canActivate: [AuthGuardService]},
  // {component: UserHeaderComponent,canActivate[AuthGuardService] }

  { path: '**', redirectTo: '' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
