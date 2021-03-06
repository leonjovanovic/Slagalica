import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../app.service';
import { Subscription } from 'rxjs';
import { User } from '../user';

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
  gender: string;
  jmbg: string;
  question: string;
  answer: string;
  poruka: string;
  same: boolean;
  same_password: string;
  flag: boolean;
  imagePreview: string;

  private usersSub: Subscription;
  width: number;
  height: number;
  file: File;
  constructor(private router: Router, public userService: UserService) { }

  ngOnInit() {
    this.usersSub = this.userService.getUserUpdateListener()//cekamo dok nam ne posalje odgovor
    .subscribe((flag: boolean) => {
      if (flag) {
        this.router.navigate(['']);
      } else {
        this.same_password = 'Username or email is not unique!';
      }
    });
  }

  picture(event: Event){
    this.file = (event.target as HTMLInputElement).files[0];
    this.poruka = this.file.name;
    const reader = new FileReader();
    reader.onload = () => {
      var img = new Image();
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
       };
      img.src = reader.result as string;
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.file);
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
    if (/^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([09][0-9]{2})([0-8][0-9]|9[0-6])([0-9]{3})(\d)$/.test(this.jmbg) === false) {
      this.flag = false;
    }
    if (!this.name || !this.surname || !this.email || !this.job || !this.username || !this.gender || !this.question || !this.answer) {
      this.flag = false;
    }

    if (this.width > 300 || this.height > 300){
      this.same_password = 'Maximum size of image is 300x300 px!';
      this.flag = false;
    }
    if (!this.flag) {return; }

    const user = new User();
    user.name = this.name; user.surname = this.surname; user.email = this.email; user.job = this.job;
    user.username = this.username; user.password = this.password1; user.gender = this.gender;
    user.question = this.question; user.answer = this.answer; user.jmbg = this.jmbg; user.type = 'Takmicar';


    if (this.file == null){this.file = new File(new Array<Blob>(), "dummy.png"); }
    this.userService.signUp(user, this.file); //saljemo user servisu
    //this.usersSub.unsubscribe();
  }

  ngOnDestroy(): void{
    this.usersSub.unsubscribe();
  }
}
