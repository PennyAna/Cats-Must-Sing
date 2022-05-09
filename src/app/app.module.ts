import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { DocumentComponent } from './document/document.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { ContactItemComponent } from './contact/contact-item/contact-item.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { DocumentListComponent } from './document/document-list/document-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactDetailComponent,
    DocumentComponent,
    MessageComponent,
    DocumentDetailComponent,
    DocumentListComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
