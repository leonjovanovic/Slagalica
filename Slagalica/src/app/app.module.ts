import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { SecretQuestionComponent } from './secret-question/secret-question.component';
import { NewPassComponent } from './new-pass/new-pass.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPassComponent,
    SignUpComponent,
    ChangePassComponent,
    SecretQuestionComponent,
    NewPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
