import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PlayerService {
  private playGameUpdated = new Subject<{flag: boolean, game: string, id:number}>();

  constructor(private http: HttpClient) {}

  playGame(){
    this.http
    .get<{ flag: boolean, game: string, id: number }>("http://localhost:3000/playGame")
    .subscribe(responseData => {
      this.playGameUpdated.next({flag: responseData.flag, game: responseData.game, id: responseData.id});
    });
  }

  getPlayGameUpdateListener() {
    return this.playGameUpdated.asObservable();
  }
}
