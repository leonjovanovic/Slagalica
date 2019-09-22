import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Router } from '@angular/router';
import { GostService } from '../gost.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit {
  players20: Player[]=[];
  players1: Player[]=[];
  num1: number = 0;
  num2: number = 0;
  poruka: string;

  sub1: Subscription;
  sub2: Subscription;
  constructor(private router: Router, public gostService: GostService ) {
    this.sub1 = this.gostService.getPlayer20UpdateListener()
    .subscribe((players20: Player[]) => {
      this.sort1(players20);
      this.num1 = this.players20.length;
    });
    this.gostService.getPlayers20();

    this.sub2 = this.gostService.getPlayer1UpdateListener()
    .subscribe((players1: Player[]) => {
      this.sort2(players1);
      this.num2 = this.players1.length;
    });
    this.gostService.getPlayers1();
  }

  ngOnInit() {
  }

  sort1(players: Player[]){
    for(let i = 0; i< players.length; i++){
      if(this.players20.filter(x => x.username == players[i].username)[0]){
        let temp = this.players20.filter(x => x.username == players[i].username)[0];
        temp.addPoints(players[i].points);
        this.num2++;
      }
      else{
        this.players20.push(new Player(players[i].username, players[i].points));//nema ga, samo dodaj
        this.num1++;
      }
    }
    this.players20.sort(function(a, b) {
      return (b.points) - (a.points);
    });
    return null;
  }

  sort2(players: Player[]){
    for(let i = 0; i< players.length; i++){
      if(this.players1.filter(x => x.username == players[i].username)[0]){
        let temp = this.players1.filter(x => x.username == players[i].username)[0];
        temp.addPoints(players[i].points);
        this.num2++;
      }
      else{
        this.players1.push(new Player(players[i].username, players[i].points));//nema ga, samo dodaj
        this.num1++;
      }
    }
    this.players1.sort(function(a, b) {
      return (b.points) - (a.points);
    });
    return null;
  }

  logout() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void{
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
