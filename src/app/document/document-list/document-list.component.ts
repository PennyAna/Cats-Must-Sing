import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
@Output() selectedDocument = new EventEmitter<Document>();
documents: Document[] = [
  new Document("1", "Nicole Lawrence", "Updates on Kracken Subject 1", "www.document.com/krackenOne", null), 
  new Document("2", "Nicole Lawrence", "Warnings: Behaviors Exbibited by Kracken Subject 1", "www.document.com/krackenTwo", null), 
  new Document("3", "Nicole Lawrence", "Mind Control: Disturbing Mutations in Kracken Subject 1", "www.document.com/krackenThree", null),
];
  constructor() { }

  ngOnInit(): void {
  }
documentWasSelected(document: Document) {
  this.selectedDocument.emit(document);
}
}
