import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contact/contact-item/contact-item.component';

import { DocumentComponent } from './document/document.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { DocumentItemComponent } from './document/document-item/document-item.component';

import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { MessageItemComponent } from './message/message-item/message-item.component';
import { MessageEditComponent } from './message/message-edit/message-edit.component';
import { MessageDetailComponent } from './message/message-detail/message-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactDetailComponent,
    DocumentComponent,
    DocumentDetailComponent,
    DocumentListComponent, 
    DocumentItemComponent,
    MessageComponent, 
    MessageListComponent, 
    MessageItemComponent, 
    MessageEditComponent, 
    MessageDetailComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
