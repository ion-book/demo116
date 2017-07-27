import { Directive, Input, forwardRef, OnChanges, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

import { esValidoTamano } from '../validators/longitud-numero-telefonico-tipo.validator';

const TAMANO_TELEFONO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => LongitudNumeroTelefonoTipo),
  multi: true
};

@Directive({
    selector:'[tamano-telefono-tipo]',
    providers:[TAMANO_TELEFONO_VALIDATOR]
})
export class LongitudNumeroTelefonoTipo implements Validator, OnInit, OnChanges{

    @Input() tipoContacto:string;
    private validatorFn: Function;
    private onChange: Function;

    constructor() {console.log({directiva:'entro directiva'}) }

    ngOnInit(){
        this.tipoContacto = this.tipoContacto === null || this.tipoContacto === undefined ? 
        'Telefono' : this.tipoContacto;
    }

    ngOnChanges(changes: SimpleChanges){
        let cambioTipo: SimpleChange = changes['tipoContacto'];
        this.createValidatorFunction(cambioTipo.currentValue);
        if (this.onChange) this.onChange();
    }

    validate(control:AbstractControl): {[key: string]: any} {
        console.log({funcion:'validate',parametros:{control:control},descripcion:"Funcion validate que implementa la clase Validator"})
        return this.validatorFn ? this.validatorFn(control) : null;
    }

    registerOnValidatorChange(fn: () => void) { this.onChange = fn; }

    private createValidatorFunction (tipoContacto: any) {
        this.validatorFn = esValidoTamano(this.tipoContacto);
    }
}