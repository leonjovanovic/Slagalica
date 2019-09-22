import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';
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
  used1: boolean= true;
  used2: boolean = true;
  used3: boolean = true;
  used4: boolean = true;
  used10: boolean = true;
  used100: boolean = true;
  flagsArray: boolean[] = [false, false, false, false, false, false];

  sub1: Subscription;
  constructor(private router: Router, public playerService: PlayerService) {
    this.num1Rand();
    this.num2Rand();
    this.num3Rand();
    this.num4Rand();
    this.num10Rand();
    this.num100Rand();
    this.brojRand();

    this.sub1 = this.playerService.getMojBrojUpdateListener()
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
    else if (this.flagNum1) { this.flagNum1 = false; this.used1 = false; this.flagsArray[0] = false; }
    else if (this.flagNum2) { this.flagNum2 = false; this.used2 = false; this.flagsArray[1] = false;}
    else if (this.flagNum3) { this.flagNum3 = false; this.used3 = false; this.flagsArray[2] = false;}
    else if (this.flagNum4) { this.flagNum4 = false; this.used4 = false; this.flagsArray[3] = false;}
    else if (this.flagNum10) { this.flagNum10 = false; this.used10 = false; this.flagsArray[4] = false;}
    else if (this.flagNum100) {this.flagNum100 = false; this.oberserableTimer(); this.flagFinish = false; this.flagStop = true; this.used100 = false;this.flagsArray[5] = false;}
  }

  finish() {
    this.flagFinish = true;
    const num: number = +this.result;
    try {
      if (eval(this.answer) !== num) { this.points = 0; }
      else if (num === this.broj) { this.points = 20; }
      else {this.points = 10; }
    } catch(e) {
      if (e instanceof SyntaxError) {
          this.points = 0;
      }
  }
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
      if (this.flagFinish) {
        abc.unsubscribe();
      }
    });
  }

  addSymbol(c: string) {
    if (c === '1') {this.answerArray.push(this.num1.toString()); this.answer = this.answer + this.num1; this.setFlags(); this.flagsArray[0] = true; return; }
    if (c === '2') {this.answerArray.push(this.num2.toString()); this.answer = this.answer + this.num2; this.setFlags(); this.flagsArray[1] = true; return; }
    if (c === '3') {this.answerArray.push(this.num3.toString()); this.answer = this.answer + this.num3; this.setFlags(); this.flagsArray[2] = true; return; }
    if (c === '4') {this.answerArray.push(this.num4.toString()); this.answer = this.answer + this.num4; this.setFlags(); this.flagsArray[3] = true; return; }
    if (c === '10') {this.answerArray.push(this.num10.toString()); this.answer = this.answer + this.num10; this.setFlags(); this.flagsArray[4] = true; return; }
    if (c === '100') {this.answerArray.push(this.num100.toString()); this.answer = this.answer + this.num100; this.setFlags(); this.flagsArray[5] = true; return; }
    this.answerArray.push(c); this.answer = this.answer + c; this.restoreFlags();
  }

  popSymbol() {
    const temp = this.answerArray.pop();
    if(temp === '('){this.answer = this.answer.substring(0, this.answer.length - 1); this.restoreFlags(); return; }
    if (isNaN(Number(temp))) {this.answer = this.answer.substring(0, this.answer.length - 1); this.setFlags(); return; }
    const br = +temp;
    if (br > 9) {
      if (br > 20) {this.used100 = false; this.flagsArray[5] = false;}
      else { this.used10 = false; this.flagsArray[4] = false;}
      this.answer = this.answer.substring(0, this.answer.length - 2);
      this.restoreFlags();
      return;
    } else {
      this.answer = this.answer.substring(0, this.answer.length - 1);
      if(br === this.num1 && this.used1) {this.used1 = false; this.flagsArray[0] = false; this.restoreFlags(); return;}
      if(br === this.num2 && this.used2) {this.used2 = false; this.flagsArray[1] = false; this.restoreFlags(); return;}
      if(br === this.num3 && this.used3) {this.used3 = false; this.flagsArray[2] = false; this.restoreFlags(); return;}
      if(br === this.num4 && this.used4) {this.used4 = false; this.flagsArray[3] = false; this.restoreFlags(); return;}
    }
  }

  setFlags(){//Oni koji nisu disejblovani se cuvaju
    this.used1 = this.used2 = this.used3 = this.used4 = this.used10 = this.used100 = true;
  }

  restoreFlags(){
    this.used1 = this.flagsArray[0];
    this.used2 = this.flagsArray[1];
    this.used3 = this.flagsArray[2];
    this.used4 = this.flagsArray[3];
    this.used10 = this.flagsArray[4];
    this.used100 = this.flagsArray[5];
  }

  ngOnDestroy(): void{
    this.sub1.unsubscribe();
  }
}
