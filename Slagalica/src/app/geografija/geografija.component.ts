import { Component, OnInit } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GeografijaService } from '../geografija.service';

@Component({
  selector: 'app-geografija',
  templateUrl: './geografija.component.html',
  styleUrls: ['./geografija.component.css']
})
export class GeografijaComponent implements OnInit {
  slova: string[] = ['a', 'b', 'v', 'g', 'd', 'dj', 'e', 'ž', 'z', 'i', 'j', 'k', 'l', 'lj', 'm',
   'n', 'nj', 'o', 'p', 'r', 's', 't', 'ć', 'u', 'f', 'h', 'c', 'č', 'dž', 'š'];

  drzava: string = '';
  grad: string = '';
  jezero: string = '';
  planina: string = '';
  reka: string = '';
  zivotinja: string = '';
  biljka: string = '';
  muzgrupa: string = '';
  subscribeTimer: number = 120;
  timeLeft: number = 120;
  poruka: string = '';
  points: number = 0;
  flagEval: boolean = false;
  counter: number = 0;
  broj: number;
  slovo: string;
  flagFinish: boolean;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;
  sub6: Subscription;
  sub7: Subscription;
  sub8: Subscription;
  sub9: Subscription;
  constructor(private router: Router, public geoService: GeografijaService) {
    this.sub9 = this.geoService.getInsertGeoUpdateListener()
    .subscribe((flag: boolean) => {
      if (flag && this.flagEval){ this.poruka = 'Za sada ste osvojili ' + this.points + ' poena. Neki pojmovi su poslati supervizoru na evaluaciju.'}
      else if (flag && !this.flagEval){ this.poruka = 'Osvojili ste ' + this.points + ' poena.'; }
      else { this.poruka = 'Dogodila se greska!'; }
    });

    this.call8Services();
   }

  ngOnInit() {
    this.broj = Math.floor(Math.random() * 29);
    this.slovo = this.slova[this.broj];
    this.flagFinish = false;
    this.oberserableTimer();
  }

  async finish(){
    this.flagFinish = true;
    const username = localStorage.getItem('username');
    if (this.sameLetter(this.drzava)) { this.geoService.drzava(this.drzava, username); }
    else { this.counter++; }
    if (this.sameLetter(this.grad)) { this.geoService.grad(this.grad, username); }
    else { this.counter++; }
    if (this.sameLetter(this.planina)) { this.geoService.planina(this.planina, username); }
    else { this.counter++; }
    if (this.sameLetter(this.reka)) { this.geoService.reka(this.reka, username); }
    else { this.counter++; }
    if (this.sameLetter(this.jezero)) { this.geoService.jezero(this.jezero, username); }
    else { this.counter++; }
    if (this.sameLetter(this.zivotinja)) { this.geoService.zivotinja(this.zivotinja, username); }
    else { this.counter++; }
    if (this.sameLetter(this.biljka)) { this.geoService.biljka(this.biljka, username); }
    else { this.counter++; }
    if (this.sameLetter(this.muzgrupa)) { this.geoService.muzGrupa(this.muzgrupa, username); }
    else { this.counter++; }

    while(this.counter !== 8) { await this.delay(500);}
    this.geoService.insertGeo(localStorage.getItem("username"), this.points);
  }

  sameLetter(rec: string){
    let flagTemp = false;
    if (this.slovo === 'dj' || this.slovo === 'nj' || this.slovo === 'lj' || this.slovo === 'dž') { flagTemp = true; }
    if (flagTemp) {
      if (rec.charAt(0).toLowerCase() === this.slovo.charAt(0) && rec.charAt(1).toLowerCase() === this.slovo.charAt(1)) { return true; }
      else { return false; }

    } else {
      if (rec.charAt(0).toLowerCase() === this.slovo) { return true; }
      else { return false; }
    }
  }

  back(){
    this.router.navigate(['takmicar']);
  }

  logout(){
    this.router.navigate(['']);
  }

  call8Services(){
    this.sub1 = this.geoService.getDrzavaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
      this.counter++;
    });
    this.sub2 = this.geoService.getGradUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
      this.counter++;
    });
    this.sub3 = this.geoService.getPlaninaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
      this.counter++;
    });
    this.sub4 = this.geoService.getRekaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
      this.counter++;
    });
    this.sub5 = this.geoService.getJezeroUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
      this.counter++;
    });
    this.sub6 = this.geoService.getZivotinjaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
      this.counter++;
    });
    this.sub7 = this.geoService.getBiljkaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
      this.counter++;
    });
    this.sub8 = this.geoService.getMuzGrupaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
      this.counter++;
    });
  }

  oberserableTimer() {
    const source = timer(1000, 1001);
    const abc = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
      if (this.subscribeTimer === 0){
        this.finish();
        abc.unsubscribe();
      }
      if(this.flagFinish){ abc.unsubscribe(); }
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnDestroy(): void{
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
    this.sub6.unsubscribe();
    this.sub7.unsubscribe();
    this.sub8.unsubscribe();
    this.sub9.unsubscribe();
  }

}
