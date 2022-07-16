import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Panda } from '../pandas/panda';

@Injectable({
   providedIn: 'root',
})
export class PandaService {
   constructor(private http: HttpClient) {}

   public getPandas(): Observable<Panda[]> {
      return this.http.get<Panda[]>('/pandas');
   }
}
