import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-takmicar',
  templateUrl: './takmicar.component.html',
  styleUrls: ['./takmicar.component.css']
})
export class TakmicarComponent implements OnInit {
  poruka: string;
  private usersSub: Subscription;
  constructor(private router: Router, public playerService: PlayerService) {
    this.usersSub = this.playerService.getPlayGameUpdateListener()//cekamo dok nam ne posalje odgovor
    .subscribe(({flag, game}) => {
      if(flag) this.router.navigate([game]);
      else this.poruka = "There isn't any available game at the moment, please try again later.";
    });
  }

  ngOnInit() {
  }

  playGame(){//na koju igru da redictujemo
    this.playerService.playGame();
  }

  results(){
    this.router.navigate(['dailyResults']);
  }

  logout(){
    this.router.navigate(['']);
  }

}
