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
getDocuments() {
  return this.documents.slice();
}
getDocument(id:string): Document {
  return this.documents.find(document =>  document.id === id)
}   
constructor() { 
  this.documents = MOCKDOCUMENTS;
}
}
