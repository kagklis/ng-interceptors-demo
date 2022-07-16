import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from '../cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
   constructor(private cacheService: CacheService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.method !== 'GET') {
         this.cacheService.invalidateCache();
         return next.handle(req);
      }

      const cached = this.cacheService.retrieve(req.url);
      if (cached) {
         console.log('[CacheInterceptor] - Returning cached response.');
         return of(cached);
      }

      console.log('[CacheInterceptor] - Request not found in cache.');
      console.log('[CacheInterceptor] - Executing request...');
      return next.handle(req).pipe(
         tap(event => {
            if (event instanceof HttpResponse) {
               this.cacheService.store(req.url, event);
               console.log('[CacheInterceptor] - Response stored in cache.');
            }
         })
      );
   }
}
