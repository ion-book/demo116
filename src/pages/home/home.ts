import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /**
   * @param formularioUsuario Rastrea el valor y el estado de validez de un grupo de instancias de FormControl.
   * Un FormGroup agrega los valores de cada FormControl hijo en un objeto, con cada nombre de control como la clave. 
   * Calcula su estatus reduciendo los estatus de sus hijos. Por ejemplo, si uno de los controles de un grupo no es 
   * válido, todo el grupo se convierte en no válido.
   * FormGroup es uno de los tres bloques de construcción fundamentales utilizados para definir formularios en Angular, 
   * junto con FormControl y FormArray.
   */
  formularioUsuario:FormGroup;
  /**
   * @param datosUsuario Parametro tipo array que almacena la informacion del formulario por el ngModel 
   */
  datosUsuario:any[] = [];
  /**
   * @param _tipoContacto Este parametro se encarga de pasar el tipo de validacion para la directiva que controla
   * la longitud de digitos del numero telefonico de acuerdo a si es telefono o celular.
   */
  _tipoContacto:string ;

  constructor(public navCtrl: NavController, private fb: FormBuilder, private alertCtrl:AlertController) {
    /**
     * @description Asignamos a la propiedad "formularioUsuario" los campos que se van a controlar de la vista
     */
    this.formularioUsuario = this.fb.group({
      nombre:[this.datosUsuario['nombre'],[Validators.required,Validators.maxLength(30)]],
      direccion:[this.datosUsuario['direccion'],[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      correo:[this.datosUsuario['correo'],[Validators.required,Validators.email]],
      tipo_contacto:[this.datosUsuario['tipo_contacto'],[Validators.required]],
      numero_contacto:[this.datosUsuario['numero_contacto'],[Validators.required]]
    })
    this.datosUsuario['tipo_contacto'] = 'Telefono';
  }

  /**
   * evento que se ejecuta al enviar la informacion, este solo cumple la funcion de mostrar un mensaje de informacion,
   * resetea el formulario y sus validaciones y limpia el parametro datosUsuario para el nuevo ingreso de informacion.
   */
  saveData(){
    console.log(this.datosUsuario)
    let alerta = this.alertCtrl.create({
      title:"Datos enviados!",
      subTitle:"Información",
      message:"Los registros fueron enviados correctamente",
      buttons:['Ok']
    });
    alerta.present()
    this.formularioUsuario.reset()
    this.datosUsuario = [];
    this.datosUsuario['tipo_contacto'] = 'Telefono';
  }

  /**
   * Evento que se ejecuta al realizar la seleccion del tipo de contacto, esta carga la propiedad _tipoContacto para
   * realizar la validacion adecuada de acuerdo al tipo seleccionado
   */
  tipoContactoChange(){
    this._tipoContacto = this.datosUsuario['tipo_contacto'];
  }

}
