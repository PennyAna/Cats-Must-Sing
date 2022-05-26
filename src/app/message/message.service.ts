import { Injectable, EventEmitter } from '@angular/core';
import { HighlightSpanKind } from 'typescript';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  messageSelectedEvent = new EventEmitter<Message>();

  constructor() {
    this.messages = MOCKMESSAGES;
   }
   getMessages(): Message[] {
     return this.messages.slice();
   }
   getMessage(id: string): Message {
     return this.messages.find(message => message.id === id)
   }
}
