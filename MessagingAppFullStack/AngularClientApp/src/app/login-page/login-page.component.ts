import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { ApiService, Response } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  template: ` <form #f="ngForm" (ngSubmit)="onSubmit(f)" class="form">
    <input
      placeholder="Email"
      fullWidth
      type="text"
      nbInput
      ngModel
      name="email"
    />
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
      <button
        [nbSpinner]="obs.response?.loading ?? false"
        nbButton
        type="submit"
        [disabled]="!f.dirty"
      >
        Login
      </button>
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const redirectUrl = this.route.snapshot.queryParams['redirect'];

    this.response$ = this.apiService
      .post<{ token: string }>(
        '/Authentication/token',
        this.requestBody.pipe(
          filter((body) => !!body?.email && !!body?.password)
        )
      )
      .pipe(
        tap((response) => {
          if (response?.data?.token) this.router.navigateByUrl(redirectUrl);
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
