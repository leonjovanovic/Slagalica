import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../app.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  username: string;
  jmbg: string;
  poruka: string;
  usersSub:Subscription;
  constructor(private router:Router, public userService:UserService) { }

  ngOnInit() {
    this.usersSub = this.userService.getForgotPassUpdateListener()//cekamo dok nam ne posalje odgovor
    .subscribe((flag: boolean) => {
      if (flag) {
        this.router.navigate(['secretQuestion']);
      } else {
        this.poruka = 'Username or jmbg is not correct!';
      }
    });
  }

  continue() {
    if (/^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([09][0-9]{2})([0-8][0-9]|9[0-6])([0-9]{3})(\d)$/.test(this.jmbg) === true) {
      this.userService.forgotPass(this.username, this.jmbg);
    }
  }

  ngOnDestroy(): void{
    this.usersSub.unsubscribe();
  }
}
