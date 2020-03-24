# Apúntalo (FRONTEND)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.5.

## Development server

Per provar la web, executar des de terminal `ng serve`, cal estar a la carpeta. La web funciona en l'adreça `http://localhost:4200/`. Si s'efectuen canvis en el codi, no cal reiniciar el servidor, es torna a compilar automàticament.

És important saber que la web no tindrà un bon funcionament si el servidor de backend no està funcionant, ja que el necessita per poder fer crides a l'API.

## Sobre Angular i organització carpetes

El codi font pot ser trobat a la carpeta `src`. La carpeta, contè fitxers inicials i varies carpetes de les quals:

* assets: És la carpeta per posar contingut múltimedia (bàsicament imatges)

* app: És on hi ha bàsicament tot el codi, organitzat per components

### Carpeta app
  Tots els fitxers de components. Cada carpeta dins d'app és un component i en la carpeta app hi ha el component principal `app.component`. En aquesta carpeta també hi han:
  * serveis, que son classes per poder fer crides al backend.
  * interficies, per poder agrupar variables en una sola. (útil pels JSONs).
  * llistes, per poder provar les interfícies sense necessitat de backend.

### Components

La comanda per crear components és `ng generate component component-name` . Aquesta comanda també es pot fer servir per generar altres coses:  `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Un component consta de quatre fitxers, dels quals només interessen tres:
  - component.html: Per definir el component, com el veurà l'usuari.
  - component.css: Per poder definir el disseny del component.
  - component.ts: Per definir el comportament del component.

Els components actuals són:
 * [Login](src/app/login): Aquest component és el formulari de login. El que fa el login és fer una crida en el [servei de Login](src/app/login.service.ts), es comprova per l'API si les credencials son correctes i en cas afirmatiu es guarda en el localStorage el token rebut i es redirecciona a l'apartat d'usuari.

 * [Nosotros](src/app/nosotros): Aquest component és l'apartat de nosaltres. Només és un text.

 * [Registro](src/app/registro): Aquest component és el formulari de registre. En aquests moments no fa res encara, en un futur s'utilitzarà un servei de registre per poder parlar amb l'API i crear un nou usuari.

 * [Unidetail](src/app/unidetail): Aquest component és per poder mostrar un llistat de totes les carreres d'una universitat. Utilitza el [servei unidetail](src/app/unidetail.service.ts) per poder fer una crida a l'api.

 * [Universitats](src/app/universitats): Aquest component fa un llistat de totes les universitats mitjançant el [servei universitat](src/app/universitat.service.ts). El llistat es mostra en menú i clicant en una de les universitats porta al component Unidetail.

 * [User](src/app/user): Aquest component serà el tauler de control de l'usuari, per mostrar la seva informació i per si vol fer algun canvi a les preferències. Encara està en progrès.

 * [Carreradetail](src/app/carreradetail): Aquest component és per poder mostrar un llistat de totes les assignatures d'una carrera. Utilitza el [servei cardetail](src/app/cardetail.service.ts) per poder fer una crida a l'api.

 * [Documents](src/app/documents): Aquest component és per poder mostrar un llistat de totes els documents que creen els usuaris sobre una assignatura. Utilitza el [servei documents](src/app/documents.service.ts) per poder fer una crida a l'api.

 * [Desconectar](src/app/desconectar): Aquest component el que fa es destruir el token del localStorage i modificar el menú per poder tornar a fer login o registrar-te.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
