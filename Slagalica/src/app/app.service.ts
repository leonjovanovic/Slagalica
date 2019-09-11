import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({providedIn: 'root'})
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<boolean>();
  private loginUpdated = new Subject<boolean>();
  private changePassUpdated = new Subject<boolean>();
  private forgotPassUpdated = new Subject<boolean>();
  private secretQueUpdated = new Subject<string>();
  private secretAnsUpdated = new Subject<boolean>();
  private forgChangePassUpdated = new Subject<boolean>();
  private secretQuest: string;
  private secretUsername: string;

  constructor(private http: HttpClient) {}

  signUp(user: User){//signUp komponenta prosledjuje napravljenog usera
    this.http
    .post<{ flag: boolean }>('http://localhost:3000/signUp', user)
    .subscribe(responseData => {
      this.usersUpdated.next(responseData.flag);
    });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  login(username: string, password: string){
    this.http
      .post<{ flag: boolean }>('http://localhost:3000/login', {username, password})
      .subscribe(responseData => {
        this.loginUpdated.next(responseData.flag);
      });
  }

  getLoginUpdateListener() {
    return this.loginUpdated.asObservable();
  }

  changePass(username: string, password: string, new_pass: string){
    this.http
    .post<{ flag: boolean }>('http://localhost:3000/changePass', {username, password, new_pass})
    .subscribe(responseData => {
      this.changePassUpdated.next(responseData.flag);
    });
  }

  getChangePassUpdateListener() {
    return this.changePassUpdated.asObservable();
  }

  forgotPass(username: string, jmbg: string){
    this.http
    .post<{ flag: boolean, question: string, username: string }>('http://localhost:3000/forgotPass', {username, jmbg})
    .subscribe(responseData => {
      this.secretQuest = responseData.question;
      this.secretUsername = responseData.username;
      this.forgotPassUpdated.next(responseData.flag);
    });
  }

  getForgotPassUpdateListener() {
    return this.forgotPassUpdated.asObservable();
  }
  secretQuestion(){
    if(this.secretQuest!=null)this.secretQueUpdated.next(this.secretQuest);
    else this.secretQueUpdated.next("Unable to load question");
  }

  getSecretQueUpdateListener() {
    return this.secretQueUpdated.asObservable();
  }
  secretAnswer(answer: string){
    const u = this.secretUsername;
    this.http
    .post<{ flag: boolean }>('http://localhost:3000/secretQuestion', {answer, u})
    .subscribe(responseData => {
      this.secretAnsUpdated.next(responseData.flag);
    });
  }

  getSecretAnswUpdateListener() {
    return this.secretAnsUpdated.asObservable();
  }

  forgChangePass(pass:string){
    const u = this.secretUsername;
    this.http
    .post<{ flag: boolean }>('http://localhost:3000/newPass', {pass, u})
    .subscribe(responseData => {
      this.forgChangePassUpdated.next(responseData.flag);
    });
  }
  getForgChangePassUpdateListener() {
    return this.forgChangePassUpdated.asObservable();
  }
  broj(){
    return this.users.length;
  }
}
