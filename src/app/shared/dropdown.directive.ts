import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appdropdown]'
})
export class DropdownDirective {
    @HostBinding('class.show') isOpen = true

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;

        console.log("dropdown")

    }

    constructor(){}
}