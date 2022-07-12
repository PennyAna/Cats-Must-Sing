import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { consoleTestResultHandler } from 'tslint/lib/test';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private url = 'http://localhost:3000/document/';
documents: Document[] = [];
documentListChangedEvent = new Subject<Document[]>();
documentSelectedEvent = new EventEmitter<Document>();
documentChangedEvent = new EventEmitter<Document[]>();
maxId: number;
currentId: number;
maxDocumentId: number;
documentsListClone: Document[] = [];
getDocuments() {
  this.http.get<{message: string, documents: Document[]}>(this.url)
  .subscribe(
    //success method
          (responseData) => {
            this.documents = responseData.documents;
          this.sortAndSend();
    }, //error function
    (error: any) => {
      console.log(error);
    });
}
getDocument(id:string) {
  return this.http.get<{ message: string, document: Document }>(this.url +id);
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
  this.http.delete(this.url + document.id)
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
  (this.url,
    document,
    { headers: headers })
    .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      }
    );
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }
  const pos = this.documents.findIndex(d => d.id === originalDocument.id);
  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  newDocument._id = originalDocument._id;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put(this.url + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      }
    );
}
sortAndSend() {
  this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 :0);
  this.documentListChangedEvent.next(this.documents.slice());
 }
constructor(private http: HttpClient) { 
}
}
