import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  pipe,
  startWith,
  switchMap,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // TODO: dynamically infer the url or use SPA proxy
  private readonly baseUrl = '/api';

  constructor(private httpClient: HttpClient, private router: Router) {}

  public post<T>(
    endpoint: string,
    body$: Observable<any>
  ): Observable<Response<T>> {
    return body$.pipe(
      switchMap((body) =>
        this.httpClient
          .post<T>(`${this.baseUrl}${endpoint}`, body)
          .pipe(this.apiTransform())
      )
    );
  }

  public get<T>(endpoint: string): Observable<Response<T>> {
    return this.httpClient
      .get<T>(`${this.baseUrl}${endpoint}`)
      .pipe(this.apiTransform());
  }

  private apiTransform = <T>() => {
    return pipe(
      map((data: T) => ({ data, loading: false })),
      catchError((error) => {
        this.router.navigate(['/login'], {
          queryParams: { redirect: this.router.url },
        });
        return of({ error, loading: false });
      }),
      startWith({ loading: true })
    );
  };
}

export interface Response<T> {
  data?: T;
  loading: boolean;
  error?: HttpErrorResponse;
}
