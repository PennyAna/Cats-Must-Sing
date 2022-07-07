import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ContactService } from '../../contact/contact.service';
import { Contact } from '../../contact/contact.model';
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
currentSender:  Contact;
onSendMessage() {
    const subjectValue = this.subject?.nativeElement.value;
    const msgTextValue = this.msgText?.nativeElement.value;
    const newMessage = new Message(
      '', 
      '',
      subjectValue,
      msgTextValue, 
      this.currentSender
      );
      this.messageService.addMessage(newMessage);
      this.onClear();
}
onClear(): void {
  this.subject.nativeElement.value = ' ';
  this.msgText.nativeElement.value = ' ';
}
  constructor(private messageService: MessageService, private contactService: ContactService) { }
  ngOnInit(): void {
      this.contactService.getContact('101').subscribe((contactData) => {
        this.currentSender = contactData.contact;
      });
    }
  }