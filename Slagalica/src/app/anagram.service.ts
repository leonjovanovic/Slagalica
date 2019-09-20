import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Player } from './player';

@Injectable({providedIn: 'root'})
export class AnagramService {
  private anagramUpdated = new Subject<boolean>();
  private getAnagramUpdated = new Subject<string>();
  private resultUpdated = new Subject<{flag: boolean, points: number}>();

  constructor(private http: HttpClient) {}

  putAnagram(anagram: string, recenica: string) {
    this.http
      .post<{ flag: boolean}>('http://localhost:3000/putAnagram', {anagram, recenica})
      .subscribe(responseData => {
        this.anagramUpdated.next(responseData.flag);
      });
  }

  getAnagramUpdateListener() {
    return this.anagramUpdated.asObservable();
  }

  getAnagram(id: number) {
    this.http.post<{ anagram: string }>('http://localhost:3000/getAnagram',{id})
    .subscribe(responseData => {
      this.getAnagramUpdated.next(responseData.anagram);
    });
  }

  getGetAnagramUpdateListener() {
    return this.getAnagramUpdated.asObservable();
  }

  result(id: number, answer: string, username: string) {
    this.http.post<{ flag: boolean, points: number }>('http://localhost:3000/resultAnagram',{id, answer, username})
    .subscribe(responseData => {
      this.resultUpdated.next({flag: responseData.flag, points: responseData.points});
    });
  }

  getResultUpdateListener(){
    return this.resultUpdated.asObservable();
  }
}
