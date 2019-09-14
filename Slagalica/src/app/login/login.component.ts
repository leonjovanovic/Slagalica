import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  poruka: string;

  private usersSub: Subscription;
  constructor(private router: Router, public userService: UserService ) { }

  ngOnInit() {
    this.usersSub = this.userService.getLoginUpdateListener()//cekamo dok nam ne posalje odgovor
    .subscribe(({flag, type}) => {
      if (flag) { this.router.navigate([type.toLowerCase()]); }
      else {
        this.poruka = 'Username or password is not correct!';
      }
    });
  }

  login() {
    this.userService.login(this.username, this.password);
  }

  changePass(){
    this.router.navigate(['changePass']);
  }

  guest(){
    this.router.navigate(['gost']);
  }

}
