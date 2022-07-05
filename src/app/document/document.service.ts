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
  this.http.get('http://localhost:3000/documents')
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
  if(!document) {
    return;
  }
  const pos = this.documents.findIndex(d => d.id === document.id);
  if (pos < 0) {
    return;
  }
  //delete from db
  this.http.delete('http://localhost:3000/documents/' + document.id)
  .subscribe((response: Response) => {
    this.documents.splice(pos, 1);
    this.sortAndSend();
  }
  );
}
addDocument(document: Document) {
  if (!document) {
    return;
  }
  // make sure id of the new Document is empty
  document.id = '';
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  // add to database
  this.http.post<{ message: string, document: Document }>
  ('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      }
    );
}
updateDocument(originalDoc: Document, newDoc: Document) {
  if (!originalDoc || ! newDoc) {
    return;
  }
  const pos = this.documents.findIndex(d => d.id === originalDoc.id);
  if (pos < 0) {
    return;
  }
  //set id of new doc to id of old doc
  newDoc.id = originalDoc.id;
  newDoc._id = originalDoc._id;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //update db
  this.http.put('http://localhost:3000/documents/' + originalDoc.id, 
  newDoc, {headers: headers})
  .subscribe((response: Response) => {
    this.documents[pos] = newDoc;
    this.sortAndSend();
  }
  );
}
constructor(private http: HttpClient) { 
  this.maxDocumentId = this.getMaxId();
}
}
