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
import { PasswordFieldComponent } from './components/password-field/password-field.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { NgIconComponent, NgIconsModule } from '@ng-icons/core';
import { bootstrapEye, bootstrapEyeSlash } from '@ng-icons/bootstrap-icons';
import { InputTextComponent } from './components/input-text/input-text.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MessagesComponent,
    DatePipe,
    PasswordFieldComponent,
    IconButtonComponent,
    InputTextComponent,
    ButtonComponent,
  ],
  imports: [
    NgIconsModule.withIcons({ bootstrapEye, bootstrapEyeSlash }),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgIconComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
