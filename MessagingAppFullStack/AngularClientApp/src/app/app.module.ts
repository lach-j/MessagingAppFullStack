import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MessagesComponent } from './messages/messages.component';
import { DatePipe } from './pipes/date.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbInputModule,
  NbIconModule,
  NbFormFieldModule,
  NbButtonModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { PasswordFieldComponent } from './components/password-field.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MessagesComponent,
    DatePipe,
    PasswordFieldComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbIconModule,
    NbFormFieldModule,
    NbButtonModule,
    NbSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
