import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
@Input() selectedMessage: Message;
  constructor() { }
  ngOnInit(): void {
  }

}


