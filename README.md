# PRUEBA DE DESARROLADOR


Clonar el repositorio
```
git clone https://github.com/santi280403/Prueba-desarrollador.git
```

### Punto 1 (is leap year)
Navegamos a la carpeta
```
cd Is\ leap\ year/
```
Ejecutamos el script
```
node index.js
```

Nos va a pedir que ingresemos un año (tiene que ser en número) y de ahí nos dira si es un año bisiesto nos devolvera true si es bisiesto o false si no lo es

### Punto 2 (Mini aplicación)
Navegamos a la carpeta
```
cd app
```
#### Servidor
Navegamos a la carpeta
```
cd server
```
Instalamos las dependencias
```
npm install
```
Creamos un archivo .env y en el ingresamos la siguiente informacion
```
# DATABASE
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db_name

# TOKEN
SECRET_TOKEN_KEY=your_secret_key
```
Se crea la base de datos ya sea desde phpmyadmin o desde mysql por consola, si es por phpmyadmin solo es subir el archivo que esta en la carpeta db en la raíz del directorio y si es por consola solo es copiar y pegar el contenido del mismo.

Por ultimo ejecutamos el servidor
```
npm start
```
#### Cliente
Navegamos a la carpeta
```
cd client
```
Instalamos las dependencias
```
npm install
```
Y por ultimo ejecutamos la aplicación
```
npm start
```