# Git Avanzado

## Introducción

## 1. Que es Git

Git es el sistema de control de versiones

### 2. Repositorios

El termino repositorio significa "Un lugar donde se guarda algo". Y en nuestro caso, ¿qué guardamos?

### 3. Software

Es algo que es "blando", fácil de cambiar. Es más, esperamos que el software cambie a lo largo del tiempo. Y esos cambios pueden ser simples o muy complejos.
*Como desarrolladores de software profesionales, nuestra principal responsabilidad es gestionar esos cambios, no meramente escribir código. Es por eso que necesitamos un buen sistema que nos permita hacer seguimiento de los cambios.*

## Arquitectura de Git

### 1. Desde el interior

- Para Git un repositorio es solo una carpeta en el sistema de archivos, la cual llamamos *árbol de trabajo.*
- En el directorio oculto ```.git.``` Git guarda toda la información necesaria para el control de cambios.:
- El directorio **objects** es donde se guarda todo el contenido de la base de datos de git.
- En el directorio **refs** se guardan referencias a los objetos "commit" dentro de esa base de datos, como las ramas y los tags.
- El archivo **HEAD** apunta a la rama actual en la que estamos trabajando. 
- El archivo **index** es donde git guarda la información del staging area o área de preparación, es decir, los cambios que estamos preparando para incluir en el próximo commit. 

### 2. Objetos de Git

Git almacena tres tipos de objetos en su base de datos: *blobs, trees y commits.*

    - Un blob es un objeto que representa solo el contenido de un archivo en un momento dado. Es importante entender que un blob en Git:
    - Para resolver los nombres tenemos los trees o arboles que son objetos que representan el estado de un directorio en un momento dado. Cada entrada de un tree contiene referencias a los blobs y a otros trees que podrían estar dentro, junto con sus nombres y permisos.
    - Un commit es un objeto que representa un conjunto de cambios en el proyecto en un momento dado. Cada commit registra quién hizo los cambios (autor), cuándo los hizo (timestamp) y por qué los hizo (mensaje de commit). Además, cada commit tiene un puntero al commit anterior, lo que nos permite recorrer la historia del proyecto.

### 3. REFs

Las REFs o referencias son nombres que apuntan un commit específico y de esta manera nos permiten acceder a él de manera más sencilla.
Para ver que REFs tenemos en nuestro repositorio podemos mirar la carpeta ```.git/refs```

- En ```refs/stash``` se guardan la referencia a la pila de cambios que hemos guardado con git stash.
- Los archivos dentro del directorio ```refs/heads``` y ```refs/remotes``` son las branches o ramas de nuestro proyecto.

### 4. Tags

Los tags son nombres que apuntan a un commit específico y nos permiten marcar un punto en la historia del proyecto.
Para ver los tags que tenemos en nuestro repositorio podemos mirar la carpeta ```.git/refs/tags```

### 5. HEAD

¿Cómo sabe Git en qué referencia estamos trabajando en este momento?
El archivo HEAD es un puntero que apunta al commit o a la REF actual en la que estamos trabajando.

## Buenas prácticas

### 1. Commits

El concepto más importante de Git es el commit. En el proceso de administrar los cambios de un proyecto, los commits son la unidad básica de trabajo.

- Cambios atómicos: Lo principal es que un commit debe agrupar un conjunto de cambios relacionados. Es importante que los commits hagan una sola cosa.
- Hacer commits frecuentes: Ir guardando avances incrementales de nuestra tarea, explorar diferentes caminos, y si algo sale mal, o no nos convence, podemos volver a un estado anterior sin perder trabajo.
- Cuidar lo que agregamos: Olvidar completamente del comando git ```add .```. La manera correcta es agregar los cambios de manera selectiva.
- Buenos mensajes: Escribir mensajes de commit descriptivos y claros. Deben estar en tiempo presente e imperativo que describa lo que hace el commit al aplicarlo al proyecto. Preferentemente en ingles.

### Ejemplos de Buenos commits

    ```bash
    feat: agregar función de login
    ```

    *Este commit agrega una nueva funcionalidad específica y completa: la función de login.*

    ```bash
    fix: corregir error en la validación de email
    ```
    *Este commit corrige un error específico en la validación de email, sin incluir otros cambios no relacionados.*

    ```bash 
    refactor: renombrar variables en login.tsx para mayor claridad
    ```
    *Este commit se enfoca únicamente en renombrar variables para mejorar la legibilidad del código, sin cambiar la lógica.*

### Ejemplos de Malos commits

    ```bash 
    feat: agregar función de login y actualizar estilos de la página principal
    ```
    *Este commit mezcla dos cambios no relacionados: agregar una función de login y actualizar estilos.*

    ```bash
    fix: corregir varios errores
    ```
    *Este commit es demasiado vago y no especifica qué errores se corrigieron, lo que dificulta el seguimiento de los cambios.*

    ```bash 
    refactor: renombrar variables y agregar nueva función
    ```
    Este commit combina un refactor con la adición de una nueva funcionalidad, lo que debería estar en commits separados.

### 2. Branches (ramas)

Las ramas son otra característica fundamental de Git. Son la forma por excelencia de dividir nuestro trabajo en bloques funcionales y nos permiten trabajar en paralelo en un proyecto minimizando los conflictos con otros colaboradores.

#### Nombres descriptivos

Un buen nombre de rama debe ser descriptivo y conciso. Debe explicar qué se está haciendo en esa rama y por qué.

#### Nombres consistentes

Es importante que los nombres de las ramas sigan una convención para que sea fácil identificarlas:

- Nueva funcionalidad, podemos nombrar la rama feature/nombre-de-la-funcionalidad
- Arreglando un bug, podemos nombrar la rama bugfix/nombre-del-bug
- Haciendo una tarea de mantenimiento en el repo podemos nombrar la rama chore/nombre-del-cambio,

#### Ramas cortas

Una rama de corta duración es más fácil de mantener y de colaborar. Si una rama se extiende demasiado en el tiempo, es probable que se acumulen muchos cambios y sea más difícil de integrar con la rama principal.

## Flujo de trabajo

En git tenemos varios flujos de trabajo que nos permiten organizar el desarrollo de un proyecto. Cada uno de estos flujos tiene sus ventajas y desventajas.

### 1. GitFlow

### Ramas principales

El flujo se organiza partiendo de dos ramas fijas principales: main y develop.

- Main: La rama main es el tronco del proyecto y representa la versión de producción. El código que se agrega a main debe ser siempre estable y debemos estar seguros de que siempre funciona correctamente.
- Develop: La rama develop por otro lado, es una instancia previa de integración en donde se unen todas las funcionalidades que se van a incluir en alguna versión futura del proyecto.

### Implementación (GitFlow)

- Para desarrollar usando este flujo, lo que hacemos es crear ramas *feature* partiendo desde develop.
- Cuando una funcionalidad está lista, la fusionamos con develop mediante un *pull-request* (PR)
- Cuando se tiene un conjunto de funcionalidades listas para ser desplegadas en producción, se crea una rama de *release* a partir de develop.
  - En esta rama se realizan los ajustes finales y se prueban las funcionalidades antes de integrar en main.
  - En base a esta rama se puede hacer un deploy de demo, staging o preproducción para probar que todo funciona correctamente.
  - Cualquier cosa que se necesite ajustar en esta rama se hace directamente en ella. O una mejor práctica es hacer una rama de fix y luego integrarla directamente a la rama de release mediante un pull-request
  - Además, si sucedieron cambios en la rama de release, estos cambios también se integran en develop.
- Finalmente, si en producción se detecta un problema que necesita ser resuelto de manera urgente y no puede esperar hasta el próximo release, se crea una rama de hotfix a partir de main. Este es el único caso en el que se crea una rama a partir de main.

### Conclusión

Git Flow es un flujo de trabajo que se volvió muy popular y aún hoy en dia es utilizado por muchos equipos. Sin embargo ha caído en desuso en favor de otros flujos de trabajo más simples y eficientes.
Desventajas:

- En primer lugar, es complejo y difícil de entender.
- Para iteraciones cortas y rápidas, se vuelve un exceso de burocracia.
- Requiere de mucho mantenimiento y esfuerzo para seguir las reglas.
- Puede llevar a situaciones en donde las ramas se desincronizan entre ellas y se generan conflictos difíciles de resolver.
- Dificultan la integración continua y el despliegue continuo, características muy importantes en la actualidad.

### 2. Trunk-based Development (TBD)

Este flujo es uno de los más antiguos, utilizado por muchos equipos desde que existen los sistemas de control de versiones.
La principal característica de Trunk based development es que se trabaja directamente sobre la rama principal del proyecto y no se usa ninguna otra rama de "larga duración"

### Listo para deplegar

El código en main siempre debe estar en un estado estable y funcional, listo para ser desplegado a producción en cualquier momento.

### Implementación (TBD)

- Para poder hacer esto, cualquier feature se desarrolla en pequeñas ramas de corta duración que se crean a partir de main.
- Cada rama de feature se integra en main mediante un pull-request una vez que está lista.
- Es importante que estas ramas sean de corta duración para minimizar la divergencia entre ellas y main, y así evitar conflictos.

### Integración continua

- Para poder asegurarnos de que el código en main siempre está en un estado estable, es necesario tener un sistema de integración continua.
- El ambiente de CI monitorea los cambios pull-requests y ejecuta pruebas automáticas para asegurarse de que el código es funcional al momento de integrar.

### Hotfixs

Si hay que hacer correcciones en una versión ya desplegada, se hace en una rama de hotfix que se integra en main mediante un pull-request, y luego se crea un nuevo tag.

### Deployment continuo

Con *Trunk Based development*, es posible hacer deploys continuos a producción. Esto significa que cada vez que se integra un cambio en main, este cambio se despliega automáticamente a producción.

### Conclusión TDB

*Trunk-based Development* es una técnica simple y natural que se adapta muy bien a la mayoría de los proyectos. Comparándolo con otros flujos, podemos ver las siguientes ventajas:

- Es simple y fácil de entender.
- Permite iteraciones rápidas y cortas.
- Requiere menos mantenimiento y esfuerzo para seguir las reglas.
- Permite desplegar con mayor frecuencia.
- Facilita la integración continua y el despliegue continuo.
- Reduce la complejidad y el tiempo de resolución de conflictos.
- Fomenta la colaboración y la comunicación entre los miembros del equipo.
