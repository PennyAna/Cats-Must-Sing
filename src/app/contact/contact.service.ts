import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxId: number;
  currentId: number;
  maxContactId: number;
  contactsListClone: Contact[];
  getMaxId(): number {
    this.maxId = 0;
  this.contacts.forEach(contact => {
    this.currentId = parseInt(contact.id);
    if (this.currentId > this.maxId) {
      this.maxId = this.currentId;
    }})
    return this.maxId;
  }
  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id)
    }
    deleteContact(contact: Contact) {
      if(!contact){
        return;
      }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
        return;
      }
      this.contacts.splice(pos, 1);
      this.contactChangedEvent.emit(this.contacts.slice());
    }
  addDocument(newContact: Contact) {
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }
  updateDocument(originalContact: Contact, newContact: Contact) {
    if (originalContact && newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
  this.contactListChangedEvent.next(this.contactsListClone);
  }
  }
  