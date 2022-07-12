import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
documents: Document[] = [];
  constructor(private documentService: DocumentService) { }
  ngOnInit(): void {
this.documentService.documentListChangedEvent.subscribe((documentsList: Document[])=> {
    this.documents = documentsList;
});
this.documentService.getDocuments();
  }
}
/* this.contactService.getContacts().subscribe((data : any[])=>{
  console.log(data);
  this.contacts = data; 
  above snippet solved my subscribe error and was found at: 
  https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/
  */