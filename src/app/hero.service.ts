import { Injectable } from '@angular/core';
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  private heroesUrl = 'http://localhost:3000/heroes';
  private heroUrl = 'http://localhost:3000/hero';

  constructor(
    private http: HttpClient,
    public messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe( tap(heroes => this.log(`fetched heroes`)) ,
      catchError(this.handleError('getHeroes', []) )
    );
    // this.messageService.add('HeroService: fetched heroes');
    // return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroUrl}/${id}`)
    .pipe(
      tap( hero => this.log(`fetched hero id=${id}`)) ,
      catchError(this.handleError<Hero>(`getHero id=${id}`) )
    );
  //  return of(HEROES.find(hero => hero._id === id ));
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl , hero , httpOptions )
    .pipe(
      tap( _ => this.log(`updated hero id=${hero._id}`) ) ,
      catchError(this.handleError<any>(`getHero id=${hero._id}`) )
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroUrl , hero , httpOptions )
    .pipe(
      tap( (res: Hero) => this.log(`add new hero name=${res.name}`) ) ,
      catchError(this.handleError<Hero>(`addHero`) )
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroUrl}/${hero._id}`;
    return this.http.delete<Hero>(url , httpOptions  )
    .pipe(
      tap( _ => this.log(`deleted hero id=${hero._id}`) ) ,
      catchError(this.handleError<Hero>(`deleteHero`))
    );
  }


  // <T> While using any is certainly generic in that it will cause the function to accept any and all types for the type of arg,
  // we actually are losing the information about what that type was when the function returns.
  // If we passed in a number, the only information we have is that any type could be returned.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add('HeroService: ' + message);
  }

}
