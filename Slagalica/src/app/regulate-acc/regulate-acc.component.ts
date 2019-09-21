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
  toRemoveUser: User;
  poruka: string;

  constructor(private router: Router, public userService: UserService ) {
    this.userService.getRequestsUpdateListener()
    .subscribe((accounts: User[]) => {
      this.accounts = accounts;
    });
    this.userService.getRequests();

    this.userService.getAcceptedUpdateListener()
    .subscribe((flag: boolean) => {
      if(flag) {
        this.accounts = this.accounts.filter(obj => obj !== this.toRemoveUser);
        this.poruka = "Uspesno ubacen u listu naloga!";
      }
    });

    this.userService.getRejectedUpdateListener()
    .subscribe((flag: boolean) => {
      if(flag) {
        this.accounts = this.accounts.filter(obj => obj !== this.toRemoveUser);
        this.poruka = "Uspesno izbacen iz liste naloga!";
      }
    });
   }

  ngOnInit() {
  }

  accept(user: User){
    this.toRemoveUser = user;
    this.userService.accepted(user);
  }

  reject(user: User){
    this.toRemoveUser = user;
    this.userService.rejected(user);
  }

  back(){
    this.router.navigate(['administrator']);
  }

  logout(){
    this.router.navigate(['']);
  }

}
