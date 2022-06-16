import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  selectedContact: Contact;

  constructor(private contactService: ContactService) { }
  ngOnInit() {
this.contactService.contactSelectedEvent.subscribe((contact: Contact) =>{this.selectedContact = contact;})
  }

}