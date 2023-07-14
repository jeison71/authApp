import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { ROUTER_CONFIGURATION } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authstatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authstatus = computed( () => this._authstatus() );


  constructor() { }

  login( email: string, password: string ): Observable<boolean>{
    const url = `${ this.baseUrl }/auth/login`;
    const body = {email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap( ({ user, token }) => {
          this._currentUser.set(user);
          this._authstatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);

          console.log({user, token});

        }),

        map( () => true ),

        //Todo: errores
        catchError( err => throwError( () => err.error.message)),

      );

  }
}
