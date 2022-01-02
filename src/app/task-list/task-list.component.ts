import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, } from '@angular/core';
import { isAfter, isBefore, isPast, isToday, monthsInYear, isTomorrow, isYesterday, isFuture } from 'date-fns';
import { FetchDataService } from './fetch-data.service';
import { ITask } from './task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  currentDate:any = new Date();
  inputText:string = '';
  inputTime:any = '';
  modalText:any = '';
  modalTime:any = '';
  errorMessage: string = '';
  task: ITask[] = [
    {
    "id": 1,
    "text": "Task1",
    "deadline": new Date("12.8.2021."),
    "done": false,
    "warning": true
    },
    {
      "id": 2,
      "text": "Task2",
      "deadline": new Date("12.10.2021."),
      "done": false,
      "warning": false
      },
      {
        "id": 3,
        "text": "Task3",
        "deadline": new Date("12.21.2021."),
        "done": false,
        "warning": true
        },
        {
          "id": 4,
          "text": "Task4",
          "deadline": new Date("12.29.2021."),
          "done": false,
          "warning": true
          }
];
  
constructor(private fetchDataService: FetchDataService){}

  ngOnInit(): void {
    this.fetchDataService.getTasks().subscribe({
      next: tasks => this.task = tasks,
      error: err => this.errorMessage = err
    });
  }

  tomorowTime (time:any) {
    
    if(isTomorrow(new Date(time))){
      return true;
    }
    else {
      return false;
    }
    
  }

  futureTime (time:any) {
    
    if(isFuture(new Date(time))){
      return true;
    }
    else {
      return false;
    }
    
  }

  addTask (item:string, time:any)
  {
    if(item == ""){
      return alert("You must write something!");
    }
    else if (isBefore(new Date(time), this.currentDate)){
      return alert("You must set deadline in the future date!");
    }
    else{
      this.task.push({id:this.task.length,text:item,deadline:time,done:false,warning:true});
      console.warn(item,time);
      this.inputText = '';
      this.inputTime = null;
      
      // TODO resetirati input fields, item = '', time = null"   XXX
    }
  }

  checkTask(item:string, time:any, id:number, done:boolean){
    // TODO provjeriti da li je unešeni datum u prošlosti isPast(time), ovaj uslov uvijek vraća false jer poredi time i true/false   xxxx
    if(isPast(new Date(time))){
      
      return alert("This is the past time!");
    }

    else if(done == false){

      this.task.push({id:this.task.length,text:item,deadline:time,done:true,warning:false});
      this.task=this.task.filter(item=>item.id!==id);
      console.warn(item,time);

    }
  }

  removeTask(id:number){
    
    // TODO provjeriti da li je odabrani task završen, može obrisati samo ako jest      XXXx
    if(id == this.task.length){

      return alert("This task isn't done yet!");
      
    }

    else {

      console.warn(id);
      this.task=this.task.filter(item=>item.id!==id);

    }
  }
  
  removeTaskDone(id:number){
    console.warn(id);
    this.task=this.task.filter(item=>item.id!==id);
  }

  updateTask(item:string, time:any){
    
    if(item == ""){
      return alert("You must write something!");
    }
    else if (isBefore(new Date(time), this.currentDate)){
      return alert("You must set deadline in the future date!");
    }
    else{
      this.task.push({id:this.task.length,text:item,deadline:time,done:true,warning:true});
      console.warn(item,time);
      this.modalText = '';
      this.modalTime = null;
    }
  }
}



