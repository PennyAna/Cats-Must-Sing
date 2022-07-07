import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from 'src/app/contact/contact.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  @Input() selectedContact: Contact;
  originalContact: Contact;
  contact: Contact;
  id: string;
  editMode: boolean = false;
  groupContacts: Contact[];
  invalidFlag: boolean;
  nameInput: string;
  emailInput: string;
  phoneInput: string;
  imageInput: string;
  newContact: Contact;
  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      this.invalidFlag = true;
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidFlag = false;
  }
  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      // newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
  onCancel() {
    this.router.navigate(['../contact']);
  }
  onSubmit(f: NgForm) {
    this.nameInput = f.value.name;
    this.emailInput = f.value.email;
    this.phoneInput = f.value.phone;
    this.imageInput = f.value.imageUrl;
    this.newContact = new Contact(
      null,
      this.nameInput,
      this.emailInput,
      this.phoneInput,
      this.imageInput,
      null
    );
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, this.newContact);
    } else {
      this.contactService.addContact(this.newContact);
    }
    this.router.navigate(['../contact']);
  }
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = String(+params['id']);
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.contactService.getContact(this.id).subscribe((cData) => {
        this.selectedContact = cData.contact;
        if (!this.originalContact) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.contact.group) {
          this.groupContacts = JSON.parse(
            JSON.stringify(this.originalContact.group)
          );
        }
      });
    });
  }
}
