import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Horse } from './horse';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class HorseService {

  private horseUrl = 'api/horses';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient,
               private messageService: MessageService ) { }
 
  /** GET Horses from the server */
  getHorses(): Observable<Horse[]> {
    return this.http.get<Horse[]>(this.horseUrl)
        .pipe(
           tap(_ => this.log('fetched horses')),
           catchError(this.handleError<Horse[]>('getHorses', []))
        );
  }
  
  //////// Save methods //////////

  /** POST: add a new horse to the server */
  addHorse (horse: Horse): Observable<Horse> {
      return this.http.post<Horse>(this.horseUrl, horse, this.httpOptions).pipe(
        tap((newHorse: Horse) => this.log(`added horse w/ id=${newHorse.id}`)),
        catchError(this.handleError<Horse>('addHorse')));
    }

    
  /** DELETE: delete the horse from the server */
  deleteHorse(id: number): Observable<Horse> {
    const url = `${this.horseUrl}/${id}`;
    return this.http.delete<Horse>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted horse id=${id}`)),
      catchError(this.handleError<Horse>('deleteHorse'))
    );
  }

  /** PUT: update the hero on the server */
  updateHorse(horse: Horse): Observable<any> {
      return this.http.put(this.horseUrl, horse, this.httpOptions);
    }

      /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HorseService: ${message}`);
  }
}
