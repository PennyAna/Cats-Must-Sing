import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from 'src/app/contact/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  messageSender: string = '';
  @Input() message: Message;
  constructor(private contactService: ContactService) {}
  ngOnInit(): void {
    this.contactService
      .getContact(this.message.sender.id)
      .subscribe((contactData) => {
        this.messageSender = contactData.contact.name;
      });
  }
}
