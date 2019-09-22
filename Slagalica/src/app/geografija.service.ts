import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class GeografijaService {
  private drzavaUpdated = new Subject<number>();
  private gradUpdated = new Subject<number>();
  private planinaUpdated = new Subject<number>();
  private rekaUpdated = new Subject<number>();
  private jezeroUpdated = new Subject<number>();
  private zivotinjaUpdated = new Subject<number>();
  private biljkaUpdated = new Subject<number>();
  private muzGrupaUpdated = new Subject<number>();
  private insertGeoUpdated = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  drzava(name: string, username: string){
    this.http.post<{ flag: number}>('http://localhost:3000/drzava', {name, username})
    .subscribe(responseData => {
      this.drzavaUpdated.next(responseData.flag);
    });
  }

  getDrzavaUpdateListener(){
    return this.drzavaUpdated.asObservable();
  }

  grad(name: string, username: string){
    this.http.post<{ flag: number}>('http://localhost:3000/grad',{name, username})
    .subscribe(responseData => {
      this.gradUpdated.next(responseData.flag);
    });
  }

  getGradUpdateListener(){
    return this.gradUpdated.asObservable();
  }

  planina(name: string, username: string){
    this.http.post<{ flag: number}>('http://localhost:3000/planina',{name, username})
    .subscribe(responseData => {
      this.planinaUpdated.next(responseData.flag);
    });
  }

  getPlaninaUpdateListener(){
    return this.planinaUpdated.asObservable();
  }

  reka(name: string, username: string){
    this.http.post<{ flag: number}>('http://localhost:3000/reka',{name, username})
    .subscribe(responseData => {
      this.rekaUpdated.next(responseData.flag);
    });
  }

  getRekaUpdateListener(){
    return this.rekaUpdated.asObservable();
  }

  jezero(name: string, username: string){
    this.http.post<{ flag: number}>('http://localhost:3000/jezero',{name, username})
    .subscribe(responseData => {
      this.jezeroUpdated.next(responseData.flag);
    });
  }

  getJezeroUpdateListener(){
    return this.jezeroUpdated.asObservable();
  }

  zivotinja(name: string, username: string){
    this.http.post<{ flag: number}>('http://localhost:3000/zivotinja',{name, username})
    .subscribe(responseData => {
      this.zivotinjaUpdated.next(responseData.flag);
    });
  }

  getZivotinjaUpdateListener(){
    return this.zivotinjaUpdated.asObservable();
  }

  biljka(name: string, username: string){
    this.http.post<{ flag: number}>('http://localhost:3000/biljka',{name, username})
    .subscribe(responseData => {
      this.biljkaUpdated.next(responseData.flag);
    });
  }

  getBiljkaUpdateListener(){
    return this.biljkaUpdated.asObservable();
  }

  muzGrupa(name: string, username: string){
    this.http.post<{ flag: number}>('http://localhost:3000/muzGrupa',{name, username})
    .subscribe(responseData => {
      this.muzGrupaUpdated.next(responseData.flag);
    });
  }

  getMuzGrupaUpdateListener(){
    return this.muzGrupaUpdated.asObservable();
  }

  insertGeo(username: string, points: number){
    this.http.post<{ flag: boolean}>('http://localhost:3000/insertGeo',{username, points})
    .subscribe(responseData => {
      this.insertGeoUpdated.next(responseData.flag);
    });
  }

  getInsertGeoUpdateListener(){
    return this.insertGeoUpdated.asObservable();
  }
}
