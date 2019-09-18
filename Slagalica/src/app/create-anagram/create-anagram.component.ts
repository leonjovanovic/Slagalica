import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnagramService } from '../anagram.service';

@Component({
  selector: 'app-create-anagram',
  templateUrl: './create-anagram.component.html',
  styleUrls: ['./create-anagram.component.css']
})
export class CreateAnagramComponent implements OnInit {

  anagram: string;
  recenica: string;
  poruka: string;

  usersSub:Subscription;
  constructor(private router:Router, public anagramService:AnagramService) {
    this.usersSub = this.anagramService.getAnagramUpdateListener()//cekamo dok nam ne posalje odgovor
    .subscribe((flag: boolean) => {
      if(flag) this.poruka = "Anagram je uspesno dodat!";
      this.anagram="";
      this.recenica="";
    });
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['']);
  }

  publish(){
    this.anagramService.putAnagram(this.anagram, this.recenica);
  }

  back(){
    this.router.navigate(['supervizor']);
  }

}
