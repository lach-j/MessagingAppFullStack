import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { ApiService, Response } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  template: ` <form #f="ngForm" (ngSubmit)="onSubmit(f)" class="form">
    <app-input-text placeholder="Email" type="text" ngModel name="email" />
    <password-field
      placeholder="Password"
      name="password"
      ngModel
    ></password-field>
    <div *ngIf="{ response: response$ | async } as obs">
      <div *ngIf="obs.response?.error?.error as errors" class="error-text">
        <ul>
          <li *ngFor="let error of errors">{{ error }}</li>
        </ul>
      </div>
      <app-button type="submit" [isPrimary]="true" [disabled]="!f.dirty">Login</app-button>
    </div>
  </form>`,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public requestBody = new BehaviorSubject<{
    email?: string;
    password?: string;
  }>({});

  public response$?: Observable<Response<{ token: string }>>;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    const redirectUrl = this.route.snapshot.queryParams['redirect'];

    this.response$ = this.apiService
      .post<{ token: string; user: User }>(
        '/Authentication/token',
        this.requestBody.pipe(
          filter((body) => !!body?.email && !!body?.password)
        )
      )
      .pipe(
        tap((response) => {
          if (response?.data) {
            this.userService.storeUserData(response.data.user);
            this.router.navigateByUrl(redirectUrl);
          }
        })
      );
  }

  public onSubmit(f: NgForm) {
    const { email, password } = f.value;

    this.requestBody.next({
      email,
      password,
    });
  }
}
