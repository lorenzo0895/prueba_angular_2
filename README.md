# Bienvenido al test de Angular de ADOCLIC

## Desafío

Tu misión es crear una aplicación Angular que se asemeje lo más posible a la mostrada en el video adjunto llamado "AngularTest.webm".

## Instrucciones

### Login

1. Crea un formulario de ingreso.
2. Debe validar que el formato del correo electrónico sea correcto y que la contraseña tenga al menos 6 caracteres.
3. Debes permitir el acceso con el usuario "<user@demo.com>" y la contraseña "123456".
4. Al ingresar correctamente, redirige al usuario a la página "Product List".

Recomendaciones:

- Utiliza Reactive Forms para el formulario de ingreso.
- Crea un servicio y un interceptor para simular una fake API local .

### Product List

1. Utiliza la siguiente API para obtener la información: [https://fakestoreapi.com/](https://fakestoreapi.com/).
2. Verifica que el usuario esté logeado antes de mostrar la lista de productos.
3. Muestra el listado de productos en una tabla.
4. Permite hacer clic en un producto para abrir un modal con la información detallada del mismo.
5. Crea un filtro para categorías y una opción para seleccionar la cantidad de elementos a mostrar.
6. Agrega un botón de logout para permitir al usuario cerrar sesión.

### Pruebas Unitarias

1. Implementa pruebas unitarias para los componentes clave de la aplicación, como el formulario de ingreso, la validación de datos, la autenticación, la obtención de datos de la API, etc.
2. Asegúrate de probar diferentes escenarios: casos válidos, casos inválidos, errores, etc.
3. Utiliza herramientas como Jasmine, Karma y/o Jest para escribir y ejecutar las pruebas unitarias.
4. Incluye documentación sobre cómo ejecutar las pruebas y cómo interpretar los resultados obtenidos.

Recomendaciones:

- Utiliza la tabla de Angular Material para mostrar la lista de productos.
- Emplea Ng-bootstrap para el modal.

¡Buena suerte en el desafío! Esperamos ver tu implementación en Angular.
