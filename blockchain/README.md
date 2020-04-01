<!-- TABLE OF CONTENTS -->
## Índice

* [Esquema de trabajo](#esquema-de-trabajo-con-trufflesuite)
    * [Truffle](#truffle)
        * [Usos básicos de Truffle](#usos-basicos-de-truffle)
    * [Ganache](#ganache)
        * [Usos básicos de Ganache](#usos-basicos-de-ganache)
* [Estructura de los ficheros](#estructura-de-los-ficheros)



<!-- Esquema -->
## ESQUEMA DE TRABAJO CON TRUFFLESUITE

**Este archivo todavía no está completo y puede que los conceptos explicados no sean del todo correctos.**

Trufflesuite trabaja con dos plataformas básicas:

* Truffle: El "backend" de la blockchain (en nuestro caso la blockchain que usaremos será Ethereum). Desde Truffle se administrarán los "smart contracts" para mandar peticiones a la blockchain y administrar los accesos y funciones.
* Ganache: La "base de datos" de la blockchain.

### Truffle

Truffle será la plataforma desde la que se controlarán todos los accesos a la Base de Datos. 

Truffle cuenta con 2 partes claramente diferenciadas:

* Smart Contracts: Funciones para interaccionar con la base de datos de blockchain. Aquí se implementarán funciones como ver el balance de una moneda en una cuenta determinada, ejecutar las transferencias, etc...

**Lenguaje:** Solidity.

* Migrations: Donde se hará el deploy de las funciones escritas en Solidity. 

**Lenguaje:** JavaScript


Para la instalación de Truffle
```sh
npm install -g truffle
```
Para iniciar Truffle con contratos simples por defecto:
```sh
truffle init
```

Para iniciar un proyecto con una moneda básica:
```sh
truffle unbox metacoin
```

#### Usos básicos de Truffle

Hacer testeo (compilar contratos & run test). Básicamente compilar contratos y ver que todo está correcto. Esto ejecuta todas las funciones de los ficheros los cuales hemos hecho deploy.
```sh
truffle test
```
Usar develop mode: Nos permite ejecutar sólo ciertas funciones a nuestro gusto, insertar valores a variables, etc...todo para testear que las funciones van correctamente.
```sh
truffle develop
```
**Usar console mode:** el que se usa de verdad.
```sh
truffle console
```
**Estando en console mode:**
```sh
truffle(developer)-> migrate
```
y se pueden hacer instancias o ejecutar funciones concretas:
```sh
truffle(developer)-> let instance = await HelloWorld.deployed()
```
```sh
truffle(developer)-> let accounts = await web3.eth.getAccounts()
```
```sh
truffle(developer)-> instance.sendCoin(accounts[0], accounts[1], 10);
```
```sh
truffle(developer)-> instance.isTaken(accounts[1]);
```
Una vez ejecutado el comando se abrirá un terminal de developer, donde deberemos ejecutar migrate para hacer el deploy de las funciones. Cuando hagamos esto ya podemos trabajar con las funciones de manera personalizada. P.e: NombreContrato.at("address block").getName.call() <-- getName puede ser cualquier función.

Para saber más sobre turffle develop clica [aquí](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)


**Una vez hecho el deploy de Ganache (está escuchando por un puerto)** podemos enviar lanzar las funciones para que interactúen con la base de datos de Ganache.
```sh
truffle migrate
```



#### Documentación oficial de TruffleSuite (muy útil)

Para futuro development (y si queremos llevar nuestros contratos a una blockchain real):

* [Trufflesuite CONFIG](https://www.trufflesuite.com/docs/truffle/reference/configuration)

* [Trufflesuite DEVELOP](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

* [Trufflesuite Interacting with Contracts](https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts)


### Ganache

Ganache es la propia blockchain virtual sobre la que ejecutaremos las funciones implementadas en Truffle. Es la DataBase.
Ganache usa la blockchain de [Ethereum](https://ethereum.org/). Su funcionamiento: 10 direcciones Ethereum iniciales recargadas con 100 Ethereum (simulado) cada una, permitiendo el testeo.

En esta base de datos no existe el "mining" por defecto, por lo que immediatamente confirma cualquier transacción que le llega. 

Se podrá testear la Base de Datos usando los ficheros de la carpeta **test**. Se ejecutarán las simulaciones y una vez terminadas, se podrá volver a la situación inicial de la base de datos para permitir posteriores testeos.

Para la instalación de Ganache
```sh
npm install -g ethereumjs-testrpc
```

Para activar el servidor Ganache escuchando un puerto:
```sh
testrpc
```
**tools:**
* Indicar el número de cuentas Ethereum:
```sh
testrpc -a [num_cuentas_eth_deseadas]
```

**Nota** TestRPC es el "antiguo" Ganache. El comando automáticamente busca el nuevo nombre de Ganache y lo instala.

#### Usos básicos de Ganache

Hacer deploy de Ganache y escuchar en un puerto.
```sh
testrpc
```

### Web3

Web3 nos permite enlazar la blockchain con nuestro backend, permitiendo lanzar peticiones remotas hacia esta.

Para instalar web3:
```sh
npm install web3
```

**Muy útil** [Llamada a los métodos en web3](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html)



<!-- Estructura -->
## ESTRUCTURA DE LOS FICHEROS

* Build: Ficheros de compilación generados automáticamente.
* Contracts: Ficheros .sol (Solidity) implementación de las funciones para interactuar con la base de datos.
* Migrations: Ficheros .js con el deploy de las funciones de Contracts.
* Test: "Juegos de pruebas" para comprobar que las funciones se ejecutan correctamente.
    * truffle-config.js: Archivo de configuración de Truffle.


**Importante:** Todavía está en proceso y la estructura de los ficheros puede variar de una versión a otra.




