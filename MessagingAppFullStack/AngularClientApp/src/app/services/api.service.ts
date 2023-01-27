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

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // TODO: dynamically infer the url or use SPA proxy
  private readonly baseUrl = 'https://localhost:7131';

  constructor(private httpClient: HttpClient) {}

  public post<T>(
    endpoint: string,
    body$: Observable<any>
  ): Observable<Response<T>> {
    return body$.pipe(
      switchMap((body) =>
        this.httpClient
          .post<T>(`${this.baseUrl}${endpoint}`, body)
          .pipe(apiTransform())
      )
    );
  }

  public get<T>(endpoint: string): Observable<Response<T>> {
    return this.httpClient
      .get<T>(`${this.baseUrl}${endpoint}`)
      .pipe(apiTransform());
  }
}

const apiTransform = <T>() => {
  return pipe(
    map((data: T) => ({ data, loading: false })),
    catchError((error) => of({ error, loading: false })),
    startWith({ loading: true })
  );
};

export interface Response<T> {
  data?: T;
  loading: boolean;
  error?: HttpErrorResponse;
}
