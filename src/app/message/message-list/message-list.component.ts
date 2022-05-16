import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
@Input() message: Message;
@Output() newMessage = new EventEmitter<Message>();
messages: Message[] = [
  new Message('1', 'Grades', 'The grades for this assignment have been posted.', 'Bro. Jackson'), 
  new Message('2', 'Assignment3', 'When is assignment 3 due?', 'Steve Johnson'), 
  new Message('3', 'Re:Assignment3', 'Assignment 3 is due on Saturday at 11:30 PM.', 'Bro. Jackson'),
  new Message('4', 'Help with Assignment3', 'Can I meet with you sometime. I need help with assignment 3.', 'Mark Smith'),
];
onAddMessage(message: Message) {
    this.messages.push(message);
}
constructor() { }

  ngOnInit(): void {
  }

}