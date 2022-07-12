import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
 document: Document;
 id: string;
  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete() {
    this.documentService.deleteDocument(this.document);
//route back to '/documents' URL
    this.router.navigate(["../document"])
  } 
  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute, private windowRefService: WindRefService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = String(+params['id']);
     this.documentService.getDocument(this.id).subscribe(dData => {
      this.document = dData.document;
     })
     })
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }
}
/* 
    this.route.params.subscribe((params: Params) => {
      this.id = String(+params['id']);
     this.contactService.getContact(this.id).subscribe(cData => {
      this.selectedContact = cData.contact;
     })
    });


this.documentService.documentListChangedEvent.subscribe((documentsList: Document[])=> {
  this.documents = documentsList;
});
this.documentService.getDocuments();
} */