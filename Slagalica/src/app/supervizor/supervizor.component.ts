import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervizor',
  templateUrl: './supervizor.component.html',
  styleUrls: ['./supervizor.component.css']
})
export class SupervizorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['']);
  }

  anagram() {
    this.router.navigate(['createAnagram']);
  }

  geography() {
    this.router.navigate(['createGeography']);
  }

}
