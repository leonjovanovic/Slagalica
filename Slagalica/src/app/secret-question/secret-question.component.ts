import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../app.service';

@Component({
  selector: 'app-secret-question',
  templateUrl: './secret-question.component.html',
  styleUrls: ['./secret-question.component.css']
})
export class SecretQuestionComponent implements OnInit {
  question: string;
  answer: string;
  poruka:string;

  usersSub:Subscription;
  constructor(private router:Router, public userService:UserService) {
    this.usersSub = this.userService.getSecretQueUpdateListener()//cekamo dok nam ne posalje odgovor
    .subscribe((question: string) => {
      this.question = question;
    });
    this.userService.secretQuestion();
  }

  ngOnInit() {
    this.usersSub = this.userService.getSecretAnswUpdateListener()//cekamo dok nam ne posalje odgovor
    .subscribe((flag: boolean) => {
      if (flag) {
        this.router.navigate(['newPass']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  continue(){
    this.userService.secretAnswer(this.answer);
  }

  ngOnDestroy(): void{
    this.usersSub.unsubscribe();
  }

}
