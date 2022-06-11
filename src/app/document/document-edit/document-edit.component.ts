import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  id: string;
  editMode: boolean = false;
  nameInput: string;
  descriptionInput: string;
  urlInput: string;
  newDocument: Document;
  onCancel(): void {
    this.router.navigate(["../document"])
  }
  onSubmit(f: NgForm) {
    this.nameInput = f.value.name;
    this.descriptionInput = f.value.description;
    this.urlInput = f.value.url;
    this.newDocument = new Document(null, this.nameInput, this.descriptionInput, this.urlInput, null);
    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, this.newDocument);
    }
    else {
      this.documentService.addDocument(this.newDocument);
    }
    this.router.navigate(["../document"]);
    }
  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { 

  }
 ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = String(+params['id']);
      if(!this.id){
        this.editMode = false;
        return;
      }
        this.originalDocument = this.documentService.getDocument(this.id);
        if(!this.originalDocument) {
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      });
}
}
