import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Player } from './player';

@Injectable({providedIn: 'root'})
export class AnagramService {
  private anagramUpdated = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  putAnagram(anagram: string, recenica: string){
    this.http
      .post<{ flag: boolean}>('http://localhost:3000/putAnagram', {anagram, recenica})
      .subscribe(responseData => {
        this.anagramUpdated.next(responseData.flag);
      });
  }

  getAnagramUpdateListener() {
    return this.anagramUpdated.asObservable();
  }
}
