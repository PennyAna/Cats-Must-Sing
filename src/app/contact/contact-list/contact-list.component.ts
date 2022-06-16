import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy{
  term: string;
  private subscription: Subscription;
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  contactId: string = '';
  search(value: string) {
    this.term = value;
  }
  constructor(private contactService: ContactService) {
   }
  ngOnInit(): void {
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[])=> {
      this.contacts = contactsList;
    });
    this.contactService.getContacts();
    }
 // this.contacts = this.contactService.getContacts();
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}
}