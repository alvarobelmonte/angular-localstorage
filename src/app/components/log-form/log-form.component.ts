import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id:string;
  text:string = '';
  date:any;

  isNew:boolean = true;

  constructor(private logsService: LogService) { }

  ngOnInit(): void {
    //Subscribe
    this.logsService.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.isNew = false;
        this.id= log.id;
        this.text = log.text;
        this.date = log.date;
      }
      console.log(log);
    });
  }

  onSubmit() {
    if(this.isNew) {
      const newLog = {
        id: this.generateUUID(),
        text: this.text,
        date: new Date()
      };
      this.logsService.addLog(newLog);
    }
    else {
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      };
      this.logsService.updateLog(updLog);
    }

    this.clearState();
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  clearState(){
    this.isNew = true;
    this.id = null;
    this.text = null;
    this.date = null;
    this.logsService.clearState();
  }

}
