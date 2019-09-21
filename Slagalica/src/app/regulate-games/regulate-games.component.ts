import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnagramService } from '../anagram.service';
import { Anagram } from '../anagram';
import { UserService } from '../app.service';

@Component({
  selector: 'app-regulate-games',
  templateUrl: './regulate-games.component.html',
  styleUrls: ['./regulate-games.component.css']
})
export class RegulateGamesComponent implements OnInit {
  poruka: string;
  today: Date;
  todayString: string ;
  pickedDate: Date = null;
  game: string = '';
  anagram: Anagram = null;
  anagrams: Anagram[] = [];
  constructor(private router: Router, public anagramService: AnagramService, public userService: UserService) {
    this.today = new Date();
    if (this.today.getMonth() < 9) { this.todayString = '' + this.today.getFullYear() + '-0' + (this.today.getMonth() + 1) + '-' + this.today.getDate(); }
    else  { this.todayString = '' + this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate(); }

    this.anagramService.getAllAnagramsUpdateListener()
    .subscribe((anagrams: Anagram[]) => {
      this.anagrams = anagrams;
    });

    this.userService.getinsertGameUpdateListener()
    .subscribe((flag: boolean) => {
      if(flag) { this.poruka = "Uspesno dodata igra u kalendar.";}
      else { this.poruka = "Neuspesno dodata igra u kalendar.";}
    });

    this.userService.getAlreadyPlayedUpdatedListener()
    .subscribe((flag: number) => {
      if(flag === 2) {
        let id = -1;
        if (this.game === 'anagram') { id = this.anagram.id; }
        this.userService.insertGame(this.game, id, this.pickedDate);//TODO AKO VEC POSTOJI UPDATOVATI NE INSERT
      }
      else if(flag === 1){ this.poruka = "Igra je vec odigrana, modifikovanje nije moguce!";}
      else { this.poruka = "Greska";}
    });
  }

  ngOnInit() {
  }

  insertGame() {
    if(this.pickedDate=== null){
      this.poruka = "Unesite datum!"; return;
    }
    if(this.game===''){
      this.poruka = "Unesite igru!"; return;
    }
    if(this.game === 'anagram' && this.anagram === null){
      this.poruka = "Unesite anagram!"; return;
    }
    this.userService.alreadyPlayed(this.pickedDate);
    this.poruka = "";
  }

  loadAnagrams() {
    this.anagramService.allAnagrams();
  }

  back() {
    this.router.navigate(['administrator']);
  }

  logout() {
    this.router.navigate(['']);
  }

}
