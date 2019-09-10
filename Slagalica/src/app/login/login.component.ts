import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  poruka: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.poruka = "init";
  }

  login() {
    this.router.navigate(['']); // CHANGE TO GAME
  }

  changePass(){
    this.router.navigate(['changePass']);
  }

  guest(){
    this.router.navigate(['']); // CHANGE TO Guest
  }

}
