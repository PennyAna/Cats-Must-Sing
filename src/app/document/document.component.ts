import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'], 
  providers: [DocumentService]
})
export class DocumentComponent implements OnInit {
selectedDocument: Document;
  constructor(private documentService: DocumentService) { }
  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe((document: Document) =>{this.selectedDocument = document;})

  }

}
