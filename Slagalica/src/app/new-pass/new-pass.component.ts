import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../app.service';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {
  password: string;
  poruka: string;

  usersSub:Subscription;
  constructor(private router:Router, public userService:UserService) {}
  ngOnInit() {
    this.usersSub = this.userService.getForgChangePassUpdateListener()//cekamo dok nam ne posalje odgovor
    .subscribe((flag: boolean) => {
      if (flag) {
        this.router.navigate(['']);
      } else {
        this.poruka = "Error";
      }
    });
  }

  newPass(){
    if(/^(?=.{8,12}$)(?!.*(\S)\1{2})(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[^a-zA-Z0-9])([a-zA-Z]\S*)$/.test(this.password)){
      this.userService.forgChangePass(this.password);
    }
  }

  ngOnDestroy(): void{
    this.usersSub.unsubscribe();
  }
}
