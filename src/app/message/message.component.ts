import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'cms-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

selectedMessage: Message;
  constructor() { }

  ngOnInit(): void {
  }

}
