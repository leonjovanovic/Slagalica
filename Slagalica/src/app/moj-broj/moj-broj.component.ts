import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-moj-broj',
  templateUrl: './moj-broj.component.html',
  styleUrls: ['./moj-broj.component.css']
})
export class MojBrojComponent implements OnInit {
  subscribeTimer = 60;
  broj = 572;
  flagBroj = true;
  answer = '';
  answerArray: string[] = [];
  result: string;
  poruka: string;
  eval: string;
  flagStop: boolean;
  flagFinish: boolean;
  timeLeft = 60;
  num1: number;
  flagNum1 = true;
  num2: number;
  flagNum2 = true;
  num3: number;
  flagNum3 = true;
  num4: number;
  flagNum4 = true;
  num10: number;
  flagNum10 = true;
  array10: number[] = [10, 15, 20];
  num100: number;
  flagNum100 = true;
  array100: number[] = [25, 50, 75, 100];
  points: number;
  used1: boolean= false;
  used2: boolean = false;
  used3: boolean = false;
  used4: boolean = false;
  used10: boolean = false;
  used100: boolean = false;

  constructor(private router: Router, public playerService: PlayerService) {
    this.num1Rand();
    this.num2Rand();
    this.num3Rand();
    this.num4Rand();
    this.num10Rand();
    this.num100Rand();
    this.brojRand();

    this.playerService.getMojBrojUpdateListener()
    .subscribe((flag) => {
      if (flag) {this.poruka = "Osvojili ste "+this.points+" poena!"; }
    });
   }

  ngOnInit() {
    this.flagStop = false;
    this.flagFinish = true;
  }

  stop() {
    if (this.flagBroj) { this.flagBroj = false; }
    else if (this.flagNum1) { this.flagNum1 = false; }
    else if (this.flagNum2) { this.flagNum2 = false; }
    else if (this.flagNum3) { this.flagNum3 = false; }
    else if (this.flagNum4) { this.flagNum4 = false; }
    else if (this.flagNum10) { this.flagNum10 = false; }
    else if (this.flagNum100) {this.flagNum100 = false; this.oberserableTimer(); this.flagFinish = false; this.flagStop = true}
  }

  finish() {
    this.flagFinish = true;
    const num: number = +this.result;
    if (eval(this.answer) !== num || eval(this.answer) === undefined) { this.points = 0; } else if (num === this.broj) { this.points = 20; } else {this.points = 10; }

    this.playerService.mojBroj(localStorage.getItem('username'), this.points);
  }

  back() {
    this.router.navigate(['takmicar']);
  }

  logout() {
    this.router.navigate(['']);
  }

  num1Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num1 = Math.floor(Math.random() * 9) + 1;
      if (!this.flagNum1) { abc.unsubscribe(); }
    });
  }

  num2Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num2 = Math.floor(Math.random() * 9) + 1;
      if (!this.flagNum2) { abc.unsubscribe(); }
    });
  }

  num3Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num3 = Math.floor(Math.random() * 9) + 1;
      if (!this.flagNum3) { abc.unsubscribe(); }
    });
  }

  num4Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num4 = Math.floor(Math.random() * 9) + 1;
      if (!this.flagNum4) { abc.unsubscribe(); }
    });
  }

  num10Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num10 = this.array10[Math.floor(Math.random() * 3)];
      if (!this.flagNum10) { abc.unsubscribe(); }
    });
  }

  num100Rand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.num100 = this.array100[Math.floor(Math.random() * 3)];
      if (!this.flagNum100) { abc.unsubscribe(); }
    });
  }

  brojRand() {
    const source = timer(50, 51);
    const abc = source.subscribe(val => {
      this.broj = Math.floor(Math.random() * 999) + 1;
      if (!this.flagBroj) { abc.unsubscribe(); }
    });
  }

  oberserableTimer() {
    const source = timer(1000, 1001);
    const abc = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
      if (this.subscribeTimer == 0) {
        this.finish();
        abc.unsubscribe();
      }
      if (!this.flagFinish) {
        abc.unsubscribe();
      }
    });
  }

  addSymbol(c: string) {
    if (c === '1') {this.answerArray.push(this.num1.toString()); this.answer = this.answer + this.num1; this.used1 = true; return; }
    if (c === '2') {this.answerArray.push(this.num2.toString()); this.answer = this.answer + this.num2; this.used2 = true; return; }
    if (c === '3') {this.answerArray.push(this.num3.toString()); this.answer = this.answer + this.num3; this.used3 = true; return; }
    if (c === '4') {this.answerArray.push(this.num4.toString()); this.answer = this.answer + this.num4; this.used4 = true; return; }
    if (c === '10') {this.answerArray.push(this.num10.toString()); this.answer = this.answer + this.num10; this.used10 = true; return; }
    if (c === '100') {this.answerArray.push(this.num100.toString()); this.answer = this.answer + this.num10; this.used100 = true; return; }
    this.answerArray.push(c); this.answer = this.answer + c;
  }

  popSymbol() {
    const temp = this.answerArray.pop();
    if (isNaN(Number(temp))) {this.answer = this.answer.substring(0, this.answer.length - 1); return; }
    const br = +temp;
    if (br > 9) {
      if (br > 20) {this.used100 = false; }
      else { this.used10 = false; }
      this.answer = this.answer.substring(0, this.answer.length - 2);
    } else {
      this.answer = this.answer.substring(0, this.answer.length - 1);
      if(br === this.num1 && this.used1) {this.used1 = false; return;}
      if(br === this.num2 && this.used2) {this.used2 = false; return;}
      if(br === this.num3 && this.used3) {this.used3 = false; return;}
      if(br === this.num4 && this.used4) {this.used4 = false; return;}
    }
  }
}
