import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject, throwIfEmpty } from 'rxjs';
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

  getContacts() {
    this.http.get<{message: string, contacts: Contact[]}>('http://localhost:3000/contact/')
    .subscribe(
      //success method
      (responseData) => {
        this.contacts = responseData.contacts;
        this.sortAndSend();
      },
      (error: any) => {
        console.log(error);
      });
  }
  getContact(id: string) {
    return this.http.get<{ message: string, contact:Contact }>('http://localhost:3000/contact/ ' +id);
    }
    deleteContact(contact: Contact) {
      if(!contact) {
        return;
      }
      const pos = this.contacts.findIndex(d => d.id === contact.id);
      if(pos < 0) {
        return;
      }
      //delete from db
      this.http.delete('http://localhost:3000/contact/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      }
      );
    }
  addContact(contact: Contact) {
    if(!contact) {
    return;
  }
  //make sure id of new empty
  contact.id = '';
  const headers = new HttpHeaders({'Content-Type':'application/json'});
  //add to db
  this.http.post<{message: string, contact: Contact}>
  ('http://localhost:3000/contact/', 
  document, 
  {headers: headers})
  .subscribe((responseData) => {
    //add new to contacts
    this.contacts.push(responseData.contact);
    this.sortAndSend();
  }
  );
}
updateContact(originalCon: Contact, newCon: Contact) {
  if(!originalCon || !newCon){
    return;
  }
  const pos = this.contacts.findIndex(d => d.id === originalCon.id);
  if (pos < 0) {
    return;
  }
  //set id of new contact to id of old contact
  newCon.id = originalCon.id;
  newCon._id = originalCon._id;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //update db
  this.http.put('http://localhost:3000/contact/' + originalCon.id, 
  newCon, {headers: headers})
  .subscribe((response: Response) => {
    this.contacts[pos] = newCon;
    this.sortAndSend();
  }
  );
}
sortAndSend() {
 this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 :0);
 this.contactListChangedEvent.next(this.contacts.slice());
}
  constructor(private http: HttpClient) { 
    // this.maxContactId = this.getMaxId();
  }
  }
  