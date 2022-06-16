import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
documentsListClone: Document[] = [];
storeDocuments() {
  let documents = JSON.stringify(this.documents);
  const headers = new HttpHeaders({'Content-Type':'application/json'});
  this.http.put('https://wdd430-s22-default-rtdb.firebaseio.com/documents.json', documents, {headers: headers, })
  .subscribe(() => {
    this.documentListChangedEvent.next(this.documents.slice());
  });
}
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
  this.http.get('https://wdd430-s22-default-rtdb.firebaseio.com/documents.json')
  .subscribe(
    //success method
    (documents: Document[]) => {
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((a, b) => 
       a.name > b.name ? 1 : b.name >  a.name ? -1 : 0
      );    
      this.documentListChangedEvent.next(this.documents.slice()); 
    }, //error function
    (error: any) => {
      console.log(error);
    });
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
  this.storeDocuments();
}
addDocument(newDocument: Document) {
  if(!newDocument){
    return;
  }
  this.maxDocumentId++;
  newDocument.id = String(this.maxDocumentId);
  this.documents.push(newDocument);
  this.documentsListClone = this.documents.slice();
this.storeDocuments();
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
this.storeDocuments();
}
constructor(private http: HttpClient) { 
  this.maxDocumentId = this.getMaxId();
}
}
