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
import { HttpClientModule } from "@angular/common/http";
import { TakmicarComponent } from './takmicar/takmicar.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { SupervizorComponent } from './supervizor/supervizor.component';
import { GostComponent } from './gost/gost.component';
import { CreateAnagramComponent } from './create-anagram/create-anagram.component';
import { CreateGeographyComponent } from './create-geography/create-geography.component';
import { DailyResultsComponent } from './daily-results/daily-results.component';
import { AnagramComponent } from './anagram/anagram.component';
import { GeografijaComponent } from './geografija/geografija.component';
import { MojBrojComponent } from './moj-broj/moj-broj.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPassComponent,
    SignUpComponent,
    ChangePassComponent,
    SecretQuestionComponent,
    NewPassComponent,
    TakmicarComponent,
    AdministratorComponent,
    SupervizorComponent,
    GostComponent,
    CreateAnagramComponent,
    CreateGeographyComponent,
    DailyResultsComponent,
    AnagramComponent,
    GeografijaComponent,
    MojBrojComponent
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
    MatRadioModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
