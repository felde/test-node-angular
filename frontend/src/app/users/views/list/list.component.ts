import { Component, OnInit } from '@angular/core';
import { PetitionsService } from '../../../shared/services/petitions.service';
import { MainResponse } from '../../../shared/interfaces/mainResponse.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private rols: any = {
    "1": "Administrador",
    "2": "Usuario"
  }
  public filter: string = "test";
  public users: User[] = [];
  public usersFilter: User[] = [];
  public fRegister!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _service: PetitionsService,
    private _router: Router,
    private modalService: NgbModal) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  private loadUser(): void {
    this.filter = "";
    this._service.doPetition("getAll", null)
      .subscribe((r: MainResponse) => {
        if (r.code == 200) {
          this.users = r.data
          this.usersFilter = this.users;
        }
        else console.log(r);

      }, err => {
        console.log(err);
        this.showAlert({
          title: "Error al obtener los usuarios",
          html: err.error.msg ? "Usted no puede ver información clasificada" : "Ocurrio un error al intentar loegarlo.<br>Por favor intentelo más tarde",
          icon: "error"
        }).then(() => {
          if (err.error.msg) this._router.navigate(["/access/logout"])
        })
      });
  }
  private showAlert(config: any): Promise<any> {
    return Swal.fire(config)
  }
  private initializeForm(): void {
    this.fRegister = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      rol: ["", Validators.required]
    });
  }
  private register(): void {
    this._service.doPetition("register", this.fRegister.value)
      .subscribe((r: MainResponse) => {
        if (r.code == 200) this.showAlert({
          title: "Usuario registrado",
          html: "Ya puede iniciar sesión con el",
          icon: "success"
        }).then(() => {
          this.loadUser();
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
  public submitForm(): void {
    if (this.fRegister.valid) {
      this.register();
    }
    else {
      let msg = (this.fRegister.controls["email"].value == null ? 'Ingrese un email valido' : '');
      msg += (this.fRegister.controls["password"].value == null ? (msg != '' ? "<br>" : '') + 'Ingrese una contraseña' : '');
      msg += (this.fRegister.controls["rol"].value == "" ? (msg != '' ? "<br>" : '') + 'Seleccione un rol' : '');
      this.showAlert({
        title: "Imposible registrar!!",
        html: msg,
        icon: "warning",
        dangerMode: true,
      })
    }
  }
  public open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }
  public getRol(rol: number): void {
    return this.rols[rol]
  }
  public searchData(event: any): void {
    //console.log(event.value);

    this.usersFilter = event.value == "" ? this.users : this.users.filter(r => r.email.indexOf(event.value) > -1);
  }
}
