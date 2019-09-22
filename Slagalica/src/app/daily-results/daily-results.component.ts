import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { GostService } from '../gost.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daily-results',
  templateUrl: './daily-results.component.html',
  styleUrls: ['./daily-results.component.css']
})
export class DailyResultsComponent implements OnInit {
  players10: Player[] = [];
  username: string;
  points: number = 0;
  rank: number;
  num: number = 1;
  poruka: string;

  sub1: Subscription;
  constructor(private router: Router, public gostService: GostService ) {
    this.sub1 = this.gostService.getPlayer10UpdateListener()
    .subscribe((players10: Player[]) => {
      this.sort(players10);
      this.findIn10();
      this.trim10();
    });
    this.gostService.getPlayers10();
   }

  ngOnInit() {
  }

  findIn10(){
    this.username = localStorage.getItem("username");
    for(let i = 0; i< this.players10.length; i++){
      if(this.players10[i].username === this.username){
        if(i > 9){
          this.points = this.players10[i].points;
          this.rank = i + 1;
          return;
        }else{
          this.username = "";
          this.rank = null;
          this.points = null;
          return;
        }
      }
    }
  }

  sort(players: Player[]){
    for(let i = 0; i< players.length; i++){
      if(this.players10.filter(x => x.username == players[i].username)[0]){
        let temp = this.players10.filter(x => x.username == players[i].username)[0];
        temp.addPoints(players[i].points);
      }
      else{
        this.players10.push(new Player(players[i].username, players[i].points));//nema ga, samo dodaj
      }
    }
    this.players10.sort(function(a, b) {
      return (b.points) - (a.points);
    });
    return null;
  }

  trim10(){
    let end = this.players10.length;
    for(let i = 10; i < end;i++){
      this.players10.pop();
    }
  }

  back(){
    this.router.navigate(['takmicar']);
  }

  logout(){
    this.router.navigate(['']);
  }

  inc(){
    this.num = this.num + 1;
  }

  ngOnDestroy(): void{
    this.sub1.unsubscribe();
  }
}
