import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Router } from '@angular/router';
import { GostService } from '../gost.service';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit {
  players20: Player[]=[];
  players1: Player[];
  num1: number = 0;
  num2: number = 0;
  poruka: string;

  constructor(private router: Router, public gostService: GostService ) {
    this.gostService.getPlayer20UpdateListener()
    .subscribe((players20: Player[]) => {
      this.sort(players20);
    });
    this.gostService.getPlayers20();
    /*this.gostService.getPlayer1UpdateListener()
    .subscribe((players1: Player[]) => {
      this.players1 = players1;
    });
    this.gostService.getPlayers1();*/
  }

  ngOnInit() {
  }

  sort(players: Player[]){
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

}
