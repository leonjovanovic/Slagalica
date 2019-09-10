import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { and } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  username:string;
  old_password:string;
  new_password1:string;
  new_password2:string;
  poruka:string;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  changePass(){
    if(true)//Uspesno nasao u bazi username i password
    if(/^(?=.{8,12}$)(?!.*(\S)\1{2})(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[^a-zA-Z0-9])([a-zA-Z]\S*)$/.test(this.new_password1)
     && this.new_password1===this.new_password2) this.router.navigate(['']);
  }

}
