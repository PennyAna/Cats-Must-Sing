import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[cmsDropDown]', 
  exportAs: 'cmsDropDown'
})
export class DropDownDirective {
@HostBinding('class.open') isOpen = false;
@HostListener('click') toggleOpen() {
  this.isOpen= !this.isOpen;
}
  constructor() { }
}