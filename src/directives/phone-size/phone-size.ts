import { Directive } from '@angular/core';

/**
 * Generated class for the PhoneSizeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[phone-size]' // Attribute selector
})
export class PhoneSizeDirective {

  constructor() {
    console.log('Hello PhoneSizeDirective Directive');
  }

}
