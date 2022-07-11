import { Injectable, EventEmitter } from '@angular/core';
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
getDocuments() {
  this.http.get<{message: string, documents: Document[]}>('http://localhost:3000/document/')
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
  console.log(id);
  console.log("bubbles");
  return this.http.get<{ message: string, document: Document }>('http://localhost:3000/document/ ' +id);
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
  this.http.delete('http://localhost:3000/document/' + document.id)
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
  ('http://localhost:3000/document',
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
  this.http.put('http://localhost:3000/document/' + originalDoc.id, 
  newDoc, {headers: headers})
  .subscribe((response: Response) => {
    this.documents[pos] = newDoc;
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
