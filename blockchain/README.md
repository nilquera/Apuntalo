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

Hacer testeo (compilar contratos & run test). Básicamente debugar y ver que todo está correcto.
```sh
truffle test
```
**Una vez hecho el deploy de Ganache (está escuchando por un puerto)** podemos enviar lanzar las funciones para que interactúen con la base de datos de Ganache.
```sh
truffle migrate
```




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

**Nota** TestRPC es el "antiguo" Ganache. El comando automáticamente busca el nuevo nombre de Ganache y lo instala.

#### Usos básicos de Ganache

Hacer deploy de Ganache y escuchar en un puerto.
```sh
testrpc
```

<!-- Estructura -->
## ESTRUCTURA DE LOS FICHEROS

* Build: Ficheros de compilación generados automáticamente.
* Contracts: Ficheros .sol (Solidity) implementación de las funciones para interactuar con la base de datos.
* Migrations: Ficheros .js con el deploy de las funciones de Contracts.
* Test: "Juegos de pruebas" para comprobar que las funciones se ejecutan correctamente.
    * truffle-config.js: Archivo de configuración de Truffle.


**Importante:** Todavía está en proceso y la estructura de los ficheros puede variar de una versión a otra.




