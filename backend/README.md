# Apúntalo - backend

## Development server

Per tal de provar el backend en mode *development* cal executar les següents comandes desde la carpeta backend:
```bash
npm install
node server/server
```
La web s'executa en l'adreça http://localhost:3000. Actualment, el propi backend serveix el frontend estàticament. Les funcionalitats de l'API es troben a partir de l'endpoint http://localhost:3000/api.

## Organització del codi

A la carpeta root podem trobar diversos arxius propis d'npm i git i la carpeta **server**, que conté el codi font. Dins de server podem trobar el següent:

- server.js: arxiu principal que executa el servidor i es connecta a la BD.
- config: config.js conté diverses variables d'entorn de node, tal com l'URL de la BD o el període d'expiració dels tokens d'autenticació. Totes les variables tenen un valor per defecte. Heroku pot setejar algunes d'elles en mode producció, fet que permet definir dos entorns.
- middlewares: funcions que se situen entre la petició i l'endpoint. Permeten fer comprovacions com l'autenticitat d'un token.
- models: conté la definició dels models (classes) de la base de dades.
- routes: rutes de la nostra API
