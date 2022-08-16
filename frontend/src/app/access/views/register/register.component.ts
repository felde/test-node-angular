import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainResponse } from 'src/app/shared/interfaces/mainResponse.interface';
import { PetitionsService } from 'src/app/shared/services/petitions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public fRegister!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _petitions: PetitionsService,
    private _router: Router
  ) {
    this.initializeForm();
  }
  ngOnInit(): void {
  }

  public submitForm(): void {
    if (this.fRegister.valid) {
      this.register();
    }
    else {
      let msg = (this.fRegister.controls["email"].value == null ? 'Ingrese un email valido' : '');
      msg += (this.fRegister.controls["password"].value == null ? (msg != '' ? "<br>" : '') + 'Ingrese una contraseña' : '');
      msg += (this.fRegister.controls["rol"].value == "" ? (msg != '' ? "<br>" : '') + 'Seleccione un rol' : '');
      this.showAlert({
        title: "Faltan datos!!",
        html: msg,
        icon: "warning",
        dangerMode: true,
      })
    }
  }
  private initializeForm(): void {
    this.fRegister = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      rol: ["", Validators.required]
    });
  }
  private register(): void {
    this._petitions.doPetition("register", this.fRegister.value)
      .subscribe((r: MainResponse) => {
        if (r.code == 200) this.showAlert({
          title: "Usuario registrado",
          html: "Ya puede iniciar sesión con el",
          icon: "success"
        }).then(() => {
          this._router.navigate(["/access"])
        })
      }, err => {
        console.log(err);

        this.showAlert({
          title: "Error al registrar",
          html: "Ocurrio un error al intentar registrar el usuario, check log",
          icon: "error"
        })
      })
  }
  private showAlert(config: any): Promise<any> {
    return Swal.fire(config)
  }
}
