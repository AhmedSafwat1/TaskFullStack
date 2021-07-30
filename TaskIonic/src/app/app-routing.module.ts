import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth-guard';
import { GuestGuard } from './_helpers/guest-guard';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full'   },
  { path: 'login', component: LoginComponent,pathMatch: 'full'  ,canActivate: [GuestGuard]  },
  {
    path: 'home', component: HomeLayoutComponent,canActivate: [AuthGuard] ,
    children: [
        { path: '', component: HomeComponent,pathMatch: 'full'  },
       
    ]
 },  
 { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
