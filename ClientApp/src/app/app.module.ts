import { PhotoService } from './services/photo.service';
import { PaginationComponent } from './shared/pagination.component';
import * as Raven from 'raven-js';
import { ErrorHandler } from '@angular/core';
import { VehicleService } from './services/vehicle.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppErrorHandler } from './app.error-handler';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { AuthHttpInterceptor, AuthModule, HttpMethod } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './login-button/login-button.component';
import { AuthenticationButtonComponent } from './authentication-button/authentication-button.component';
import { SignupButtonComponent } from './signup-button/signup-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';

Raven.config('https://243b1651f96d443bac302e2cd14b2269@o1060761.ingest.sentry.io/6050576').install();

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    LoginButtonComponent,
    AuthenticationButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'udemyvegaproj.eu.auth0.com',
      clientId: 'WgbzN2Kjzbw1EDGBDuY6mjVOMWV0gVCT',
      httpInterceptor: {
        allowedList:[
          //'/api','/api/*',
          
          {
            uri: '/api/vehicle/*',
            httpMethod: HttpMethod.Put,
            tokenOptions: {
              audience: 'https://api.vega.com',
            }
          },

          {
            uri: '/api/vehicle/*',
            httpMethod: HttpMethod.Delete,
            tokenOptions: {
              audience: 'https://api.vega.com',
            }
          },

          {
            uri: '/api/vehicle',
            httpMethod: HttpMethod.Post,
            tokenOptions: {
              audience: 'https://api.vega.com',
            }
          },
         

        ]
      }
      
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    VehicleService,
    PhotoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
