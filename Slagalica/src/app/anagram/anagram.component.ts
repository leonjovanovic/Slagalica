import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnagramService } from '../anagram.service';
import { PlayerService } from '../player.service';
import { timer, Subscription } from 'rxjs';

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
  flagFinish: boolean;
  subscribeTimer:number = 60;
  timeLeft: number=60;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(private router:Router, public anagramService:AnagramService, public playerService:PlayerService) {
    this.sub1 = this.playerService.getPlayGameUpdateListener()
    .subscribe(({flag, game, id}) => {
      if(flag) {
        this.id = id;
        this.sub2 = this.anagramService.getGetAnagramUpdateListener()
        .subscribe((anagram: string) => {
          this.anagram = anagram;
        });
        this.anagramService.getAnagram(id);
      }
      else {this.poruka = "No available game at the moment, please try later.";}
    });
    this.playerService.playGame(localStorage.getItem("username"));

    this.sub3 = this.anagramService.getResultUpdateListener()
    .subscribe(({flag, points}) => {
      if(flag)this.poruka = "Osvojili ste "+points+" poena!";
      this.flag = flag;
    });
  }

  ngOnInit() {
    this.flag = false;
    this.flagFinish = false;
    this.oberserableTimer();
  }

  finish(){
    this.flagFinish = true;
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
      if(this.subscribeTimer == 0 || this.flagFinish){
        this.finish();
        abc.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

}
