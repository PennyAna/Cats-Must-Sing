import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentComponent } from '../document.component';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
documents: Document[] = [];
documentId: string = '';
  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { 
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit(): void {
    this.documentService.documentChangedEvent.subscribe((documentArray: Document[])=>{
      this.documents = documentArray;
    });
  }
}

/* this.contactService.getContacts().subscribe((data : any[])=>{
  console.log(data);
  this.contacts = data; 
  above snippet solved my subscribe error and was found at: 
  https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/
  */