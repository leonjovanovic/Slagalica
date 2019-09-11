import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  name: string;
  surname: string;
  email: string;
  job: string;
  username: string;
  password1: string;
  password2: string;
  gender: number;
  jmbg: string;
  question: string;
  answer: string;
  poruka: string;
  same: boolean;
  same_password: string;
  flag: boolean;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  signUp() {
    this.flag = true;
    this.same = true;
    if (this.password1 !== this.password2) {
      this.same = false;
      this.same_password = 'Passwords do not match!';
      this.flag = false;
    }
    if (/^(?=.{8,12}$)(?!.*(\S)\1{2})(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[^a-zA-Z0-9])([a-zA-Z]\S*)$/.test(this.password1) === false) {
      this.flag = false;
    }
    if(/^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([09][0-9]{2})([0-8][0-9]|9[0-6])([0-9]{3})(\d)$/.test(this.jmbg)===false) {
      this.flag = false;
    }
    if (!this.name || !this.surname || !this.email || !this.job || !this.username || !this.gender || !this.question || !this.answer) {
      this.flag = false;
    }
    if(this.flag){this.router.navigate([''])};


  }

}
