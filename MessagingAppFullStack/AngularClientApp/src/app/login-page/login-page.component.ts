import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { ApiService, Response } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  template: ` <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
    <label for="username-input">Username:</label>
    <input name="username" type="text" ngModel id="username-input" />
    <label for="password-input">Password:</label>
    <input name="password" type="password" ngModel id="password-input" />
    <button type="submit" pButton [loading]="(loading$ | async) ?? false">
      Login
    </button>
    <div *ngIf="response$ | async as response">
      <!-- TODO: Remove these and replace with humanised error messages-->
      <p>Loading: {{ response.loading }}</p>
      <p>Error: {{ response.error?.error?.message }}</p>
    </div>
  </form>`,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public requestBody = new BehaviorSubject<{
    username?: string;
    password?: string;
  }>({});

  public response$?: Observable<Response<{ token: string }>>;
  public loading$ = this.response$?.pipe(map((res) => res.loading));

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const redirectUrl = this.route.snapshot.queryParams['redirect'];

    this.response$ = this.apiService
      .post<{ token: string }>(
        '/Authentication/token',
        this.requestBody.pipe(
          filter((body) => !!body?.username && !!body?.password)
        )
      )
      .pipe(
        tap((response) => {
          if (response?.data?.token) this.router.navigateByUrl(redirectUrl);
        })
      );
  }

  public onSubmit(f: NgForm) {
    const { username, password } = f.value;

    this.requestBody.next({
      username,
      password,
    });
  }
}
