import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-moj-broj',
  templateUrl: './moj-broj.component.html',
  styleUrls: ['./moj-broj.component.css']
})
export class MojBrojComponent implements OnInit {
  subscribeTimer: number = 60;
  broj: number = 572;
  flagBroj: boolean = true;
  answer: string;
  result: string;
  poruka: string;
  flagStop: boolean;
  flagFinish: boolean;
  timeLeft: number = 60;
  num1 :number;
  flagNum1: boolean = true;
  num2 :number;
  flagNum2: boolean = true;
  num3 :number;
  flagNum3: boolean = true;
  num4 : number;
  flagNum4: boolean = true;
  num10 : number;
  flagNum10: boolean = true;
  array10: number[] = [10, 15, 20];
  num100 : number;
  flagNum100: boolean = true;
  array100: number[] = [25, 50, 75, 100];
  points: number;

  constructor(private router: Router) {
    this.num1Rand();
    this.num2Rand();
    this.num3Rand();
    this.num4Rand();
    this.num10Rand();
    this.num100Rand();
    this.brojRand();
   }

  ngOnInit() {
    this.flagStop = true;
    this.flagFinish = true;
  }

  stop(){
    if(this.flagBroj) this.flagBroj = false;
    else if(this.flagNum1) this.flagNum1 = false;
    else if(this.flagNum2) this.flagNum2 = false;
    else if(this.flagNum3) this.flagNum3 = false;
    else if(this.flagNum4) this.flagNum4 = false;
    else if(this.flagNum10) this.flagNum10 = false;
    else if(this.flagNum100) {this.flagNum100 = false; this.oberserableTimer();}
  }

  finish(){
    this.flagFinish = false;

    if(eval(this.answer) === this.result.valueOf()){ this.points = 0;}
    else if(this.result.valueOf() as number == this.broj){ this.points = 20;}
    else {this.points = 10;}
    this.poruka = this.answer;
  }

  back(){
    this.router.navigate(['takmicar']);
  }

  logout(){
    this.router.navigate(['']);
  }

  num1Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num1 = Math.floor(Math.random() * 9)+1;
      if(!this.flagNum1) abc.unsubscribe();
    });
  }

  num2Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num2 = Math.floor(Math.random() * 9)+1;
      if(!this.flagNum2) abc.unsubscribe();
    });
  }

  num3Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num3 = Math.floor(Math.random() * 9)+1;
      if(!this.flagNum3) abc.unsubscribe();
    });
  }

  num4Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num4 = Math.floor(Math.random() * 9)+1;
      if(!this.flagNum4) abc.unsubscribe();
    });
  }

  num10Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num10 = this.array10[Math.floor(Math.random() * 3)];
      if(!this.flagNum10) abc.unsubscribe();
    });
  }

  num100Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num100 = this.array100[Math.floor(Math.random() * 3)];
      if(!this.flagNum100) abc.unsubscribe();
    });
  }

  brojRand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.broj = Math.floor(Math.random() * 999)+1;
      if(!this.flagBroj) abc.unsubscribe();
    });
  }

  oberserableTimer() {
    const source = timer(1000, 1001);
    const abc = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
      if(this.subscribeTimer == 0 || !this.flagFinish){
        this.finish();
        abc.unsubscribe();
      }
    });
  }

}
