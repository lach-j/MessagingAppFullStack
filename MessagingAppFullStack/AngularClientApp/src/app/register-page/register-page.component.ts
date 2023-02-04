import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { ApiService, Response } from '../services/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-page',
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
    <password-field
      placeholder="Confirm Password"
      name="confirmPassword"
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
        Register
      </button>
    </div>
  </form>`,
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  public requestBody = new BehaviorSubject<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  public response$?: Observable<Response<any>>;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.response$ = this.apiService
      .post<any>(
        '/User',
        this.requestBody.pipe(
          filter((body) => !!body?.email && !!body?.password)
        )
      )
      .pipe(
        tap((response) => {
          if (response?.data) this.router.navigate(['login']);
        })
      );
  }

  public onSubmit(f: NgForm) {
    const { email, password, confirmPassword } = f.value;

    this.requestBody.next({
      email,
      password,
      confirmPassword,
    });
  }
}
