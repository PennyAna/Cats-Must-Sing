import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'http://localhost:3000/message/';
  maxMessageId: number;
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
   messageSelectedEvent = new EventEmitter<Message>();
  currentMessageId: number;
   getMessages() {
    this.http.get<{message: string, messages: Message[]}>(this.url)
    .subscribe(
      //success method
      (responseData) => {
        this.messages = responseData.messages;
        this.sortAndSend();
      }, //error function
      (error: any) => {
        console.log(error);
      });
   }
   getMessage(id: string) {
    return this.http.get<{ message: string, messages: Message }>(this.url +id);
   }
   addMessage(msgIn: Message) {
    if(!msgIn) {
      return;
    }
    //make sure id of new msg empty
    msgIn.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //add to db
    this.http.post<{message: string, messages: Message}>
    (this.url,
    msgIn, 
    {headers: headers})
    .subscribe((responseData) => {
      //add new to contacts
      this.messages.push(responseData.messages);
      this.sortAndSend();
    }
    );
    this.getMessages();
   }
   sortAndSend() {
    this.messages.sort((a, b) => a.sender > b.sender ? 1 : b.sender > a.sender ? -1 :0);
    this.messageChangedEvent.next(this.messages.slice());
   }
   constructor(private http: HttpClient) {
   }
}







  