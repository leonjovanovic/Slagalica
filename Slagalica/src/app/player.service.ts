import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PlayerService {
  private playGameUpdated = new Subject<{flag: boolean, game: string, id:number}>();
  private mojBrojUpdated = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  playGame(username: string){
    this.http
    .post<{ flag: boolean, game: string, id: number }>("http://localhost:3000/playGame", {username})
    .subscribe(responseData => {
      this.playGameUpdated.next({flag: responseData.flag, game: responseData.game, id: responseData.id});
    });
  }

  getPlayGameUpdateListener() {
    return this.playGameUpdated.asObservable();
  }

  mojBroj(username: string, points: number){
    this.http.post<{ flag: boolean}>('http://localhost:3000/mojBroj',{username, points})
    .subscribe(responseData => {
      this.mojBrojUpdated.next(responseData.flag);
    });
  }

  getMojBrojUpdateListener() {
    return this.mojBrojUpdated.asObservable();
  }
}
