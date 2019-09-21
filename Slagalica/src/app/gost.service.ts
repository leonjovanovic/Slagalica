import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Player } from './player';

@Injectable({providedIn: 'root'})
export class GostService {
  private players20: Player[] = [];
  private players1: Player[] = [];
  private players10: Player[] = [];
  private players20Updated = new Subject<Player[]>();
  private players1Updated = new Subject<Player[]>();
  private players10Updated = new Subject<Player[]>();

  constructor(private http: HttpClient) {}

  getPlayers20(){
    this.http
    .get<{ players20: Player[] }>(
      "http://localhost:3000/players20"
    )
    .subscribe(responseData => {
      this.players20 = responseData.players20;
      this.players20Updated.next([...this.players20]);
    });
  }

  getPlayer20UpdateListener() {
    return this.players20Updated.asObservable();
  }

  getPlayers1(){
    this.http
    .get<{ players1: Player[] }>(
      "http://localhost:3000/players1"
    )
    .subscribe(responseData => {
      this.players1 = responseData.players1;
      this.players1Updated.next([...this.players1]);
    });
  }

  getPlayer1UpdateListener() {
    return this.players1Updated.asObservable();
  }

  getPlayers10() {this.http.get<{ players10: Player[] }>("http://localhost:3000/players10")
    .subscribe(responseData => {
      this.players10 = responseData.players10;
      this.players10Updated.next([...this.players10]);
    });
  }

  getPlayer10UpdateListener() {
    return this.players10Updated.asObservable();
  }
}
