import { Injectable } from '@angular/core';
import { EventEmitter } from 'stream';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();
  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(id: string): Contact {
    for(let i=0; i <= this.contacts.length; i++) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
      else {
        return null;
      }
      }
    }
    
    }
