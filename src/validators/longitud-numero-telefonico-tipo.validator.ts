import { AbstractControl, ValidatorFn } from "@angular/forms";

function validarTamano(c: string,d:any) {
    console.log({funcion:'validar tamaño',parametros:{ c:c,d:d,tamano:c.length}})
    let retorno:any[] = [];
    retorno['mensaje'] = '';
    retorno['valor'] = -1;
    if(c != undefined && d != undefined){
        let tamano = c.length;
        if(d == 'Telefono'){
            if(tamano >= 8){
                retorno['mensaje'] = 'El numero de telefono no puede contener mas de 7 caracteres';
                retorno['valor'] = null;
                return retorno
            }
        }else{
            if(tamano >= 11){
                retorno['mensaje'] = 'El numero de celular no puede contener mas de 10 caracteres';
                retorno['valor'] = null;
                return retorno
            }
        }

    }
    return retorno
}

export function esValidoTamano (tipoContacto: string): ValidatorFn {
  return function (control: AbstractControl): {[key: string]: any} {
    if (control.value != null || typeof control.value === 'string' && control.value.length !== 0) {
        let tipo = tipoContacto;
        let retorno = validarTamano(control.value,tipo);
        if(retorno['valor'] == -1){
            return null;
        }else{
            return { 'tamano-telefono-tipo': true,'mensaje':retorno['mensaje'] } 
        }
    } else {
        return null;
    }
  }
}