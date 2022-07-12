import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  selectedContact: Contact;
  groupContact: Contact[];
  id: string;
  onDelete() {
    this.contactService.deleteContact(this.selectedContact);
//route back to '/documents' URL
    this.router.navigate(["../contact"])
  }
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = String(+params['id']);
     this.contactService.getContact(this.id).subscribe(cData => {
      this.selectedContact = cData.contact;
     })
    });
  }

}