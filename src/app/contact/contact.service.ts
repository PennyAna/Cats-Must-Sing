import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

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
  storeContacts() {
    let contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.put('https://wdd430-s22-default-rtdb.firebaseio.com/contacts.json', contacts, {headers: headers, })
    .subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }
  getMaxId(): number {
    this.maxId = 0;
  this.contacts.forEach(contact => {
    this.currentId = parseInt(contact.id);
    if (this.currentId > this.maxId) {
      this.maxId = this.currentId;
    }})
    return this.maxId;
  }
  getContacts() {
    this.http.get('https://wdd430-s22-default-rtdb.firebaseio.com/contacts.json')
    .subscribe(
      //success method
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => 
         a.name > b.name ? 1 : b.name >  a.name ? -1 : 0
        );    
        this.contactListChangedEvent.next(this.contacts.slice()); 
      }, //error function
      (error: any) => {
        console.log(error);
      });
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
      this.storeContacts();
    }
  addContact(newContact: Contact) {
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    console.log(newContact, originalContact);
    if (originalContact === newContact) { //this was the bug, it used to be original && new, thus the rest of the function never executed
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();
  }
  constructor(private http: HttpClient) { 
    this.maxContactId = this.getMaxId();
  }
  }
  