import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorInterceptor } from './_helpers/jwt-interceptor.interceptor';
import { ErrorInterceptorInterceptor } from './_helpers/error-interceptor.interceptor';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomeComponent } from './home/home.component';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { LandingComponent } from './landing/landing.component';
import { HomeAsideComponent } from './home-aside/home-aside.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavHomeComponent,
    HomeLayoutComponent,
    HomeComponent,
    LandingComponent,
    HomeAsideComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
    
   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
