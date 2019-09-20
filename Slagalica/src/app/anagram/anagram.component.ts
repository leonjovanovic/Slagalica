import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnagramService } from '../anagram.service';
import { PlayerService } from '../player.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-anagram',
  templateUrl: './anagram.component.html',
  styleUrls: ['./anagram.component.css']
})
export class AnagramComponent implements OnInit {
  poruka: string;
  anagram: string;
  answer: string;
  id: number;
  flag: boolean;
  subscribeTimer:number;
  timeLeft: number=60;

  constructor(private router:Router, public anagramService:AnagramService, public playerService:PlayerService) {
    this.playerService.getPlayGameUpdateListener()
    .subscribe(({flag, game, id}) => {
      if(flag) {
        this.id = id;
        this.anagramService.getGetAnagramUpdateListener()
        .subscribe((anagram: string) => {
          this.anagram = anagram;
        });
        this.anagramService.getAnagram(id);
      }
      else {this.poruka = "No available game at the moment, please try later.";}
    });
    this.playerService.playGame();

    this.anagramService.getResultUpdateListener()
    .subscribe(({flag, points}) => {
      if(flag)this.poruka = "Osvojili ste "+points+" poena!";
      this.flag = flag;
    });
  }

  ngOnInit() {
    this.flag = true;
    this.oberserableTimer();
  }

  finish(){
    const username = localStorage.getItem("username");
    this.anagramService.result(this.id, this.answer, username);
    this.answer= "";
  }

  back(){
    this.router.navigate(['takmicar']);
  }

  logout(){
    this.router.navigate(['']);
  }

  oberserableTimer() {
    const source = timer(1000, 1001);
    const abc = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
      if(this.subscribeTimer == 0){
        this.finish();
        abc.unsubscribe();
      }
    });
  }

}
