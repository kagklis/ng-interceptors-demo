import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { CacheInterceptor } from './services/interceptors/cache.interceptor';
import { LogInterceptor } from './services/interceptors/log.interceptor';
import { MockInterceptor } from './services/interceptors/mock.interceptor';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule,
      NgbModule,
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
