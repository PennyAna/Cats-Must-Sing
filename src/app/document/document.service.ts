import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
documents: Document[] = [];
documentSelectedEvent = new EventEmitter<Document>();
documentChangedEvent = new EventEmitter<Document[]>();
getDocuments() {
  return this.documents.slice();
}
getDocument(id:string): Document {
  return this.documents.find(document =>  document.id === id)
}   
deleteDocument(document: Document) {
  console.log(this.documents);
  if(!document) {
    return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
    return;
  }
  this.documents.splice(pos, 1);
  this.documentChangedEvent.emit(this.documents.slice());
  console.log(this.documents);
}
constructor() { 
  this.documents = MOCKDOCUMENTS;
}
}
