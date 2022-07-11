import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  @Output() newMessage = new EventEmitter<Message>();
  @Output() selectedMessageEvent = new EventEmitter<Message>();
  messages: Message[] = [];
  onAddMessage(message: Message) {
    //implement the code in this method to push the Message object pass as an argument to the end of the message list
    this.messages.push(message);
  }
  onSelected(message: Message) {
    this.messageService.messageSelectedEvent.emit(message);
  }
  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }
}
