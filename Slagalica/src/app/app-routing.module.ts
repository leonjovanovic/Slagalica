import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SecretQuestionComponent } from './secret-question/secret-question.component';
import { NewPassComponent } from './new-pass/new-pass.component';
import { TakmicarComponent } from './takmicar/takmicar.component';
import { SupervizorComponent } from './supervizor/supervizor.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { GostComponent } from './gost/gost.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgotPass', component: ForgotPassComponent},
  {path: 'changePass', component: ChangePassComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'secretQuestion', component: SecretQuestionComponent},
  {path: 'newPass', component: NewPassComponent},
  {path: 'takmicar', component: TakmicarComponent},
  {path: 'supervizor', component: SupervizorComponent},
  {path: 'administrator', component: AdministratorComponent},
  {path: 'gost', component: GostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
