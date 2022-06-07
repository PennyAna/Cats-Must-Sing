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
  private subscription: Subscription;
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  contactId: string = '';
  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
   }
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[])=> {
      this.contacts = contactsList;
    });
   /*  this.contactService.contactChangedEvent.subscribe((contactArray: Contact[])=>{
      this.contacts = contactArray;
    }); */
 // this.contacts = this.contactService.getContacts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}
}