import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secret-question',
  templateUrl: './secret-question.component.html',
  styleUrls: ['./secret-question.component.css']
})
export class SecretQuestionComponent implements OnInit {
  question: string;
  answer: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.question = "What is your favourite colour?" //Preko servisa preneti iz Forgot Pass
  }

  continue(){
    if (this.answer === 'Red') {this.router.navigate(['newPass']); }
    else {this.router.navigate(['']); }
  }

}
