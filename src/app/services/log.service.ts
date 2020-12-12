import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs:Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });
  selectedLog = this.logSource.asObservable();
  
  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.logSource.asObservable();

  constructor() {
    this.logs = [
      {
        id: '1',
        text: 'Generated component',
        date: new Date('12/12/2020')
      },
      {
        id: '2',
        text: 'Added bootstrap',
        date: new Date('12/16/2020')
      },
      {
        id: '3',
        text: 'Added jquery',
        date: new Date('12/14/2020')
      }
    ];
   }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    }
    else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    this.setLocalStorage();
  }

  updateLog(log: Log) {
    this.removeLogFromList(log);
    this.logs.unshift(log);
    this.setLocalStorage();
  }

  deleteLog(log: Log) {
    this.removeLogFromList(log);
    this.setLocalStorage();
  }

  removeLogFromList(log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id) {
        this.logs.splice(index, 1);

      }
    });
  }
  clearState(){
    this.stateSource.next(true);
  }

  setLocalStorage() {
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
}
