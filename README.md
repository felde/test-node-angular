# Prueba desarrollo 2bCore

Este desarrollo esta desarrollado con las siguientes caracteristicas:

## Herramientas front

- [Ng-Bootstrap](https://ng-bootstrap.github.io/)

## Herramientas backend

- [NodeJS](https://nodejs.org/es/)

## Instalación de dependecias y puesta en marcha

- en consola navegar hasta el repositorio clonado

### front

```
$ cd front
$ npm i --save
$ npm run start:local
```

- [Nevegar al sitio](http://localhost:4200)

#### Para publicar en local

```
$ npm run build:local
```

- [Nevegar al sitio local](http://localhost:8080)

### back

```
$ cd api
$ npm i --save
$ npm run start:dev
```

- [Nevegar a la api](http://localhost:8080)

# Requerimiento

## Front-end

Crear maquetado de la aplicación utilizando Bootstrap, hay que considerar que todas las pantallas deben ser 100% responsivas (considerar a partir de 375px)

### Flujo de pantallas:

Pantalla de registro:

- Formulario con información de usuario (correo y contraseña y rol)
- el formulario debe tener las validaciones correspondientes
- el campo de rol debe ser un Select

Log in:

- Formulario (correo y contraseña)
- validaciones correspondientes
- modales en caso de error.

Lista de usuarios registrados:
CASO 1:
Al ingresar correctamente al sistema como administrador se podrá

- ver una lista con los usuarios registrados Campos: (correo, rol y añadir un id de acuerdo con la posición del usuario en el arreglo)
- también se debe agregar un filtro de búsqueda por correo en la tabla.

CASO 2:
Al ingresar como rol ‘usuario’ debe mostrarse un modal diciendo que no puede ver información clasificada y sacarlo de la sesión.

## Back-end

1.- Crear un servicio que registre usuarios con correo, contraseña con cifrado irreversible y rol.

2.- Registrar dos usuarios, uno con rol ‘administrador’ y otro con rol ‘usuario’.

3.- Crear servicio de autenticación que reciba correo y contraseña

- cuando la autenticación sea correcta retorne un JSON Web Token con el correo y rol en payload.

  4.- Crear un servicio que retorne todos los usuarios registrados

- el token debe ser requerido y enviado en las cabeceras de la petición
- valide desde el token el rol del usuario
  - CASO 1: si el rol es ‘administrador’ retorna la información
  - CASO 2: si el rol es ‘usuario’ retorna un error.

## Changelog

[Api complete](https://github.com/felde/test-node-angular/commit/ec5cb049277d8292aa0e277d999994d163a730f1)

Se agrega parte back end en NodeJS

[init front project](https://github.com/felde/test-node-angular/commit/d119bc7d455233a236d28fe6dda1a9b07d1ae338)

Se inicializa el proyecto angular front

[login mponent](https://github.com/felde/test-node-angular/commit/b1f9ea7a6cb28939baab2f442dc0a054de638884)

Fromulario de logea y acceso a sitio

[register and logout](https://github.com/felde/test-node-angular/commit/cfb7fa8bd308570978d860390e904b638e722177)

Se agrega formulario de registro y template de logout

[users list](https://github.com/felde/test-node-angular/commit/f42ebe0e13dcf43f1b349143e48eb9df1041452d)

Se agrega componente del listado de usuario con las validaciones solicitadas
