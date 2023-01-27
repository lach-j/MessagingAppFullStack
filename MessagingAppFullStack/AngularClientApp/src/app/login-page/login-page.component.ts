import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { ApiService, Response } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  template: ` <div>
    <label for="username-input">Username:</label>
    <input type="text" [(ngModel)]="username" id="username-input" />
    <label for="password-input">Password:</label>
    <input type="password" [(ngModel)]="password" id="password-input" />
    <button (click)="onSubmit()">Login</button>
    <div *ngIf="response$ | async as response">
      <!-- TODO: Remove these and replace with humanised error messages-->
      <p>Loading: {{ response.loading }}</p>
      <p>Token: {{ response.data?.token }}</p>
      <p>Error: {{ response.error?.error | json }}</p>
    </div>
  </div>`,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public username: string = '';
  public password: string = '';

  public requestBody = new BehaviorSubject<{
    username?: string;
    password?: string;
  }>({});

  public response$?: Observable<Response<{ token: string }>>;

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

  public onSubmit() {
    this.requestBody.next({
      username: this.username,
      password: this.password,
    });
  }
}
