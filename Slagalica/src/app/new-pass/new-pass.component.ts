import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {
  password: string;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  newPass(){
    if(/^(?=.{8,12}$)(?!.*(\S)\1{2})(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[^a-zA-Z0-9])([a-zA-Z]\S*)$/.test(this.password)){
      this.router.navigate(['']);
    }
  }

}
