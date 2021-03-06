import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({providedIn: 'root'})
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<boolean>();
  private loginUpdated = new Subject<{flag: boolean, type: string}>();
  private changePassUpdated = new Subject<boolean>();
  private forgotPassUpdated = new Subject<boolean>();
  private secretQueUpdated = new Subject<string>();
  private secretAnsUpdated = new Subject<boolean>();
  private forgChangePassUpdated = new Subject<boolean>();
  private accountsUpdated = new Subject<User[]>();
  private acceptedUpdated = new Subject<boolean>();
  private rejectedUpdated = new Subject<boolean>();
  private alreadyPlayedUpdated = new Subject<number>();
  private insertGameUpdated = new Subject<boolean>();
  private secretQuest: string;
  private secretUsername: string;

  constructor(private http: HttpClient) {}

  signUp(user: User, image: File){//signUp komponenta prosledjuje napravljenog usera
    const postData = new FormData();
    if(image.name!="dummy.png")postData.append("image", image, user.username);
    else postData.append("image", image, "empty");
    postData.append("name", user.name);
    postData.append("surname", user.surname);
    postData.append("email", user.email);
    postData.append("job", user.job);
    postData.append("username", user.username);
    postData.append("password", user.password);
    postData.append("gender", user.gender);
    postData.append("jmbg", user.jmbg);
    postData.append("question", user.question);
    postData.append("answer", user.answer);
    postData.append("type", user.type);
    this.http
    .post<{ flag: boolean }>('http://localhost:3000/signUp', postData)
    .subscribe(responseData => {
      this.usersUpdated.next(responseData.flag);
    });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  login(username: string, password: string){
    this.http
      .post<{ flag: boolean, type: string }>('http://localhost:3000/login', {username, password})
      .subscribe(responseData => {console.log(responseData.type);
        this.loginUpdated.next({flag: responseData.flag, type: responseData.type});
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

  forgChangePass(password:string){
    const u = this.secretUsername;
    this.http
    .post<{ flag: boolean }>('http://localhost:3000/newPass', {password, u})
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

  getRequests(){
    this.http.get<{ accounts: User[] }>("http://localhost:3000/requests")
    .subscribe(responseData => {
      this.accountsUpdated.next([...responseData.accounts]);
    });
  }

  getRequestsUpdateListener(){
    return this.accountsUpdated.asObservable();
  }

  accepted(user: User){
    this.http
    .post<{ flag: boolean }>('http://localhost:3000/accepted', {user})
    .subscribe(responseData => {
      this.acceptedUpdated.next(responseData.flag);
    });
  }

  getAcceptedUpdateListener() {
    return this.acceptedUpdated.asObservable();
  }

  rejected(user: User){
    this.http
    .post<{ flag: boolean }>('http://localhost:3000/rejected', {user})
    .subscribe(responseData => {
      this.rejectedUpdated.next(responseData.flag);
    });
  }

  getRejectedUpdateListener() {
    return this.rejectedUpdated.asObservable();
  }

  insertGame(name: string, id: number, date: Date){
    this.http.post<{ flag: boolean }>('http://localhost:3000/insertGame', {name, id, date})
    .subscribe(responseData => {
      this.insertGameUpdated.next(responseData.flag);
    });
  }

  getinsertGameUpdateListener() {
    return this.insertGameUpdated.asObservable();
  }

  alreadyPlayed(date: Date){
    this.http.post<{ flag: number }>('http://localhost:3000/alreadyPlayed', {date})
    .subscribe(responseData => {
      this.alreadyPlayedUpdated.next(responseData.flag);
    });
  }

  getAlreadyPlayedUpdatedListener(){
    return this.alreadyPlayedUpdated.asObservable();
  }
}
