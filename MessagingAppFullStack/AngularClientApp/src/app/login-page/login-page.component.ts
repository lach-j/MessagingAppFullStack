import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { ApiService, Response } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  template: ` <form #f="ngForm" (ngSubmit)="onSubmit(f)">
    <input fullWidth type="text" nbInput ngModel name="username" />
    <password-field name="password" ngModel></password-field>
    <div *ngIf="{ response: response$ | async } as obs">
      <button
        [nbSpinner]="obs.response?.loading ?? false"
        nbButton
        type="submit"
        [disabled]="!f.dirty"
      >
        Login
      </button>
      <p>Error: {{ obs.response?.error?.error?.message }}</p>
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
