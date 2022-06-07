import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MaxValidator } from '@angular/forms';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
documents: Document[] = [];
documentListChangedEvent = new Subject<Document[]>();
documentSelectedEvent = new EventEmitter<Document>();
documentChangedEvent = new EventEmitter<Document[]>();
maxId: number;
currentId: number;
maxDocumentId: number;
documentsListClone: Document[];
getMaxId(): number {
  this.maxId = 0;
this.documents.forEach(document => {
  this.currentId = parseInt(document.id);
  if (this.currentId > this.maxId) {
    this.maxId = this.currentId;
  }})
  return this.maxId;
}
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
addDocument(newDocument: Document) {
  if(!newDocument){
    return;
  }
  this.maxDocumentId++;
  newDocument.id = String(this.maxDocumentId);
  this.documents.push(newDocument);
  this.documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(this.documentsListClone);
}
updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }
  const pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
    return;
  }
  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  this.documentsListClone = this.documents.slice();
this.documentListChangedEvent.next(this.documentsListClone);
}
constructor() { 
  this.documents = MOCKDOCUMENTS;
  this.maxDocumentId = this.getMaxId();
}
}
