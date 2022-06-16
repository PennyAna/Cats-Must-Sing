import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'cms-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'], 
  providers: [MessageService]
})
export class MessageComponent implements OnInit {
selectedMessage: Message;
changedMessage: Message;
  constructor(private messageService: MessageService) { }
  ngOnInit(): void {
    this.messageService.messageSelectedEvent.subscribe((message: Message) => {this.selectedMessage = message; })
    this.messageService.messageChangedEvent.subscribe((message: Message) => {this.changedMessage = message; })
  }
}
