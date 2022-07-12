import { Contact } from "../contact/contact.model";
export class Message {
    public _id: string;
    public id: string;
    public subject: string;
    public msgText: string;
    public sender: Contact;
    constructor(_id: string, id: string, subject: string, msgText: string, sender: Contact) {
        this._id = _id;
        this.id = id;
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
    }
}