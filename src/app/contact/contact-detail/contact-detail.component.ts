import { Component, Input, OnInit } from '@angular/core';
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
  //contact: Contact = new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../../assets/images/jacksonk.jpg', null);
  onDelete() {
    this.contactService.deleteContact(this.selectedContact);
//route back to '/documents' URL
    this.router.navigate(["../contact"])
  }constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = String(+params['id']);
      this.selectedContact = this.contactService.getContact(this.id);
    });
  }

}