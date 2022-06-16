import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactFilter', 
  pure: false
})
export class ContactFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[] = [];
    if(term && term.length > 0) {
      filteredContacts = contacts.filter(
        (contact: Contact) =>
        contact.name.toLowerCase().includes(term.toLowerCase())
        );
      }  
      if (filteredContacts.length < 1) {
        return contacts;
      }
            return filteredContacts;
  }
}

