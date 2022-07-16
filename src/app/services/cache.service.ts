import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class CacheService {
   private cache: Record<string, HttpResponse<any> | undefined> = {};

   constructor() {}

   store(url: string, response: HttpResponse<any>): void {
      this.cache[url] = response;
   }

   retrieve(url: string): HttpResponse<any> | undefined {
      return this.cache[url];
   }

   invalidateUrl(url: string): void {
      delete this.cache[url];
   }

   invalidateCache(): void {
      this.cache = {};
   }
}
