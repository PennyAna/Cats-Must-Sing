import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

@Input() message: Message | undefined;
onSendMessage() {
  
}
onClear() {
  
}
  constructor() { }

  ngOnInit(): void {
  }

}
