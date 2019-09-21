import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../app.service';

@Component({
  selector: 'app-regulate-acc',
  templateUrl: './regulate-acc.component.html',
  styleUrls: ['./regulate-acc.component.css']
})
export class RegulateAccComponent implements OnInit {

  accounts: User[] = [];

  constructor(private router: Router, public userService: UserService ) {
    this.userService.getRequestsUpdateListener()
    .subscribe((accounts: User[]) => {
      this.accounts = accounts;
    });
    this.userService.getRequests();
   }

  ngOnInit() {
  }

  accept(){

  }

  reject(){

  }

  back(){
    this.router.navigate(['administrator']);
  }

  logout(){
    this.router.navigate(['']);
  }

}
