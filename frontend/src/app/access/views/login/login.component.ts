import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetitionsService } from 'src/app/shared/services/petitions.service';
import Swal from 'sweetalert2';
import { MainResponse } from '../../../shared/interfaces/mainResponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public fLogin!: FormGroup;
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
    if (this.fLogin.valid) {
      this.login();
    }
    else {
      console.log(this.fLogin.controls["email"].value);
      console.log(this.fLogin.controls["password"].value);

      let msg = (this.fLogin.controls["email"].value == null ? 'Ingrese su email' : '');
      msg += (this.fLogin.controls["password"].value == null ? (msg != '' ? "<br>" : '') + 'Ingrese su contraseña' : '');
      this.showAlert({
        title: "Faltan datos!!",
        html: msg,
        icon: "warning",
        dangerMode: true,
      })
    }
  }
  private initializeForm(): void {
    this.fLogin = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  private login(): void {
    this._petitions.doPetition("login", this.fLogin.value)
      .subscribe((r: MainResponse) => {
        if (r.code == 200) this.showAlert({
          title: "Usuario encontrado",
          html: "Bienvenido",
          icon: "success"
        }).then(() => {
          localStorage.setItem("userSession", r.data);
          this._router.navigate(["/users/list"])
        })
      }, err => {
        if (err.error && err.error.msg)
          this.showAlert({
            title: "Usuario no encontrado",
            html: "Por favor, verifique sus información",
            icon: "error"
          })
        else
          this.showAlert({
            title: "Error al logear",
            html: "Ocurrio un error al intentar loegarlo.<br>Por favor intentelo más tarde",
            icon: "error"
          })
      })
  }
  private showAlert(config: any): Promise<any> {
    return Swal.fire(config)
  }
}
