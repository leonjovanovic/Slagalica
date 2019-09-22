import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
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

  broj: number;
  slovo: string;
  flagFinish: boolean;
  constructor(private router: Router, public geoService: GeografijaService) {
    this.geoService.getInsertGeoUpdateListener()
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

  finish(){
    this.flagFinish = true;
    const username = localStorage.getItem('username');
    if (this.drzava.charAt(0).toLowerCase() === this.slovo) { this.geoService.drzava(this.drzava, username); }
    if (this.grad.charAt(0).toLowerCase() === this.slovo) { this.geoService.grad(this.grad, username); }
    if (this.planina.charAt(0).toLowerCase() === this.slovo) { this.geoService.planina(this.planina, username); }
    if (this.reka.charAt(0).toLowerCase() === this.slovo) { this.geoService.reka(this.reka, username); }
    if (this.jezero.charAt(0).toLowerCase() === this.slovo) { this.geoService.jezero(this.jezero, username); }
    if (this.zivotinja.charAt(0).toLowerCase() === this.slovo) { this.geoService.zivotinja(this.zivotinja, username); }
    if (this.biljka.charAt(0).toLowerCase() === this.slovo) { this.geoService.biljka(this.biljka, username); }
    if (this.muzgrupa.charAt(0).toLowerCase() === this.slovo) { this.geoService.muzGrupa(this.muzgrupa, username); }

    this.geoService.insertGeo(localStorage.getItem("username"), this.points);
  }

  back(){
    this.router.navigate(['takmicar']);
  }

  logout(){
    this.router.navigate(['']);
  }

  call8Services(){
    this.geoService.getDrzavaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
    });
    this.geoService.getGradUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
    });
    this.geoService.getPlaninaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
    });
    this.geoService.getRekaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
    });
    this.geoService.getJezeroUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
    });
    this.geoService.getZivotinjaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
    });
    this.geoService.getBiljkaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
    });
    this.geoService.getMuzGrupaUpdateListener()
    .subscribe((flag: number) => {
      if (flag === 2) { this.points = this.points + 2; }
      else if ( flag === 1) { this.flagEval = true; }
      else { this.poruka = 'Dogodila se greska!'; }
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

}
