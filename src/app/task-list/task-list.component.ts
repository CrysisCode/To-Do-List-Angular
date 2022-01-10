import { Component, OnInit, Input } from '@angular/core';
import { isBefore, isPast, isTomorrow, isFuture } from 'date-fns';
import { FetchDataService } from './fetch-data.service';
import { ITask } from './task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  currentDate = new Date();
  inputText:any = '';
  inputTime:any = '';
  modalText:any = '';
  modalTime:any = '';
  errorMessage: string = '';
  task: ITask[] = [];
  
constructor(private fetchDataService: FetchDataService){}

  ngOnInit(): void {
    this.fetchDataService.getTasks().subscribe({
      next: (tasks:any) => this.task = tasks,
      error: err => this.errorMessage = err
    });
  }

  deleteTask(task: ITask) {
    this.fetchDataService
    .deleteTask(task)
    .subscribe(() => (this.task = this.task.filter((item) => item.id !== task.id))
    )
  }

  createTask(task: ITask) {
    this.fetchDataService
    .createTask(task)
    .subscribe((task) => this.task.push(task))
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




