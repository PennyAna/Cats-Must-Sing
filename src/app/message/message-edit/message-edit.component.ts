import { Component, OnInit, Input, ViewChild, EventEmitter, ElementRef, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@Input() message: Message;
@ViewChild('msgText') msgText: ElementRef;
@ViewChild('subject') subject: ElementRef;
@Output() addMessageEvent = new EventEmitter<Message>();
currentSender = 'Nicole Lawrence';
currentId = '5';
onSendMessage() {
    const subjectValue = this.subject?.nativeElement.value;
    const msgTextValue = this.msgText?.nativeElement.value;

    const message = new Message(
      this.currentId, 
      subjectValue, 
      msgTextValue, 
      this.currentSender);
      
      console.log(message);
      this.messageService.addMessage(message);
      this.onClear();
}
onClear(): void {
  this.subject.nativeElement.value = ' ';
  this.msgText.nativeElement.value = ' ';
}
  constructor(private messageService: MessageService) { }
  ngOnInit(): void {
  }
}