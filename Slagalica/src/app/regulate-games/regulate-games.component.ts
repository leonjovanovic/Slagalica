import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regulate-games',
  templateUrl: './regulate-games.component.html',
  styleUrls: ['./regulate-games.component.css']
})
export class RegulateGamesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['administrator']);
  }

  logout(){
    this.router.navigate(['']);
  }

}
