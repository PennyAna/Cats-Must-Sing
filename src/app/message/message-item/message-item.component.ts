import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  messageSender: string = '';
@Input() message: Message;
  constructor(private messageService: MessageService) { }
  ngOnInit(): void {
    const message: Message = this.messageService.getMessage(this.message.id);
    this.messageSender = message.sender;
  }

}