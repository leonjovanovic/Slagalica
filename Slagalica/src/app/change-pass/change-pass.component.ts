import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { and } from '@angular/router/src/utils/collection';
import { UserService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  username: string;
  old_password: string;
  new_password1: string;
  new_password2: string;
  poruka: string;

  usersSub:Subscription;
  constructor(private router:Router, public userService:UserService) { }

  ngOnInit() {
    this.usersSub = this.userService.getChangePassUpdateListener()//cekamo dok nam ne posalje odgovor
    .subscribe((flag: boolean) => {
      if (flag) {
        this.router.navigate(['']);
      } else {
        this.poruka = 'Username or old password is not correct!';
      }
    });
  }

  changePass(){

    if (this.new_password1 !== this.new_password2){
      this.poruka="New passwords dont match!";
      return;
    }
    if(/^(?=.{8,12}$)(?!.*(\S)\1{2})(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[^a-zA-Z0-9])([a-zA-Z]\S*)$/.test(this.new_password1))
    {
      this.userService.changePass(this.username, this.old_password, this.new_password1);
    }
  }
}
