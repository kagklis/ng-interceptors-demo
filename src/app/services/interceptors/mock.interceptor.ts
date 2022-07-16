import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';


@Injectable()
export class MockInterceptor implements HttpInterceptor {

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.method === 'GET' && req.url.endsWith('/pandas')) {
         console.log('[MockInterceptor] - Returning mock data.')
         return of(
            new HttpResponse({
               status: 200,
               statusText: 'OK',
               body: PANDA_DATA
            })
         ).pipe(delay(450));
      } else {
         return of(
            new HttpResponse({
               status: 404,
               statusText: 'Not Found',
               body: 'No such endpoint exists!'
            })
         );
      }
   }
}

interface Panda {
   id: number;
   name: string;
   sex: 'F' | 'M';
   birthDate: Date;
   currentLocation: string;
}

const PANDA_DATA: Panda[] = [
   {
      id: 1,
      name: 'Bao Bao',
      sex: 'F',
      birthDate: new Date(2013, 8, 23),
      currentLocation: 'Wolong National Nature Reserve',
   },
   {
      id: 2,
      name: 'Bei Bei',
      sex: 'M',
      birthDate: new Date(2015, 8, 22),
      currentLocation: 'Bifengxia Panda Base',
   },
   {
      id: 3,
      name: 'Da Mao',
      sex: 'M',
      birthDate: new Date(2008, 9, 1),
      currentLocation: 'Calgary Zoo',
   },
   {
      id: 4,
      name: 'Er Shun',
      sex: 'F',
      birthDate: new Date(2007, 8, 10),
      currentLocation: 'Wolong National Nature Reserve',
   },
   {
      id: 5,
      name: 'Gu Gu',
      sex: 'M',
      birthDate: new Date(1999, 9, 25),
      currentLocation: 'Beijing Zoo',
   },
   {
      id: 6,
      name: 'Lun Lun',
      sex: 'F',
      birthDate: new Date(1997, 8, 25),
      currentLocation: 'Zoo Atlanta',
   },
   {
      id: 7,
      name: 'Mei Lan',
      sex: 'M',
      birthDate: new Date(2006, 9, 6),
      currentLocation: 'Chengdu Panda Base',
   },
   {
      id: 8,
      name: 'Mei Sheng',
      sex: 'M',
      birthDate: new Date(2003, 8, 3),
      currentLocation: 'Bifengxia Panda Base',
   },
];
