import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  accounts(){
    this.router.navigate(['regulateAcc']);
  }

  games(){
    this.router.navigate(['regulateGames']);
  }

  logout(){
    this.router.navigate(['']);
  }
}
