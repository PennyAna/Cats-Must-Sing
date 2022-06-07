import { Component, OnInit } from '@angular/core';
import { IndexInfo } from 'typescript';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  groupContacts: Contact[];
onRemoveItem(index: number) {

}
onCancel() {
  
}
  constructor() { }

  ngOnInit(): void {
  }

}
