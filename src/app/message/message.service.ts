import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  maxMessageId: number;
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
   messageSelectedEvent = new EventEmitter<Message>();
  currentMessageId: number;
   storeMessages() {
    let messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.put('https://wdd430-s22-default-rtdb.firebaseio.com/messages.json', messages, {headers: headers, })
    .subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    });
  }
  getMaxId(): number {
    this.maxMessageId = 0;
  this.messages.forEach(message => {
    this.currentMessageId = parseInt(message.id);
    if (this.currentMessageId > this.maxMessageId) {
      this.maxMessageId = this.currentMessageId;
    }})
    return this.maxMessageId;
  }
   getMessages() {
    this.http.get('https://wdd430-s22-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      //success method
      (messages: Message[]) => {
        this.messages = messages;
        console.log(this.messages);
        this.maxMessageId = this.getMaxId();
        console.log(this.maxMessageId);
        this.messageChangedEvent.next(this.messages.slice());
      }, //error function
      (error: any) => {
        console.log(error);
      });
   }
   getMessage(id: string): Message {
     return this.messages.find(message => message.id === id);
   }
   addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }
   constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
   }
}







  