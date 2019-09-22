import { Component, OnInit } from '@angular/core';
import { GeoEval } from '../geoEval';
import { Router } from '@angular/router';
import { GeografijaService } from '../geografija.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-geography',
  templateUrl: './create-geography.component.html',
  styleUrls: ['./create-geography.component.css']
})
export class CreateGeographyComponent implements OnInit {

  reci: GeoEval[] = [];
  toRemoveRec: GeoEval;
  poruka: string;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  constructor(private router: Router, public geoService: GeografijaService ) {//KOJI SERVICE
    this.sub1 = this.geoService.getReciUpdateListener()
    .subscribe((reci: GeoEval[]) => {
      this.reci = reci;
    });
    this.geoService.getReci();

    this.sub2 = this.geoService.getAcceptedUpdateListener()
    .subscribe((flag: boolean) => {
      if(flag) {
        this.reci = this.reci.filter(obj => obj !== this.toRemoveRec);
        this.poruka = "Uspesno povecan broj poena!";
      }
    });

    this.sub3 = this.geoService.getRejectedUpdateListener()
    .subscribe((flag: boolean) => {
      if(flag) {
        this.reci = this.reci.filter(obj => obj !== this.toRemoveRec);
        this.poruka = "Uspesno odbijen!";
      }
    });
   }

  ngOnInit() {
  }

  accept(rec: GeoEval){
    this.toRemoveRec = rec;
    this.geoService.accepted(rec);
  }

  reject(rec: GeoEval){
    this.toRemoveRec = rec;
    this.geoService.rejected(rec);
  }

  back(){
    this.router.navigate(['supervizor']);
  }

  logout(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void{
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
