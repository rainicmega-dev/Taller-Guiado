# Tienda tecnológica — React + Vite

Práctica académica de React con CRUD de productos, persistencia temporal mediante `localStorage` y consulta de datos a PokéAPI.

## Funcionalidades

- **CREATE:** agregar productos con nombre, precio y stock.
- **READ:** listar los productos y ver el resumen del inventario.
- **UPDATE:** editar un producto existente.
- **DELETE:** eliminar un producto con confirmación.
- **Persistencia local:** recuperar el inventario al abrir la aplicación y guardar los cambios cuando el estado cambia.
- **Búsqueda:** filtrar productos por nombre.
- **Mini PokéAPI:** consultar un Pokémon por nombre o número; muestra imagen, número, altura, peso y tipos.
- **Validaciones:** nombre obligatorio, precio mayor que cero y stock entero no negativo.

## Cómo ejecutar

Necesitas Node.js instalado. Abre una terminal en la carpeta `tienda-react` y ejecuta:

```bash
npm install
npm run dev
```

Abre la URL local que muestre Vite en la terminal. Para comprobar la versión de entrega:

```bash
npm run build
```

## Cómo funciona `localStorage`

1. `leerProductosGuardados()` intenta recuperar la clave `productos` al iniciar.
2. `JSON.parse()` transforma el texto guardado en un arreglo de JavaScript.
3. `useState()` mantiene el inventario actual en React.
4. `useEffect()` ejecuta `localStorage.setItem()` cada vez que cambia el arreglo.
5. `JSON.stringify()` convierte el arreglo a texto para poder guardarlo.

`localStorage` conserva datos en el navegador utilizado. No es una base de datos central ni debe usarse para contraseñas o datos sensibles. Si se borran los datos del sitio/navegador, el inventario guardado también puede desaparecer.

## Pruebas manuales para la entrega

1. Agrega un producto y confirma que aparece en el listado.
2. Edita el producto y confirma que cambia su nombre, precio o stock.
3. Recarga con `F5` y comprueba que el producto sigue allí.
4. Elimina un producto, recarga y comprueba que no reaparece.
5. Intenta guardar sin nombre, con precio `0` y con stock negativo; deben mostrarse validaciones.
6. Busca un producto por parte del nombre.
7. En PokéAPI consulta `pikachu` o `25`; después prueba un nombre inventado y comprueba el mensaje de error.

La consulta a PokéAPI requiere conexión a internet. El inventario local no necesita un servidor para guardar sus cambios.

## Archivos principales

- `src/App.jsx`: estados, CRUD, validación, búsqueda y persistencia.
- `src/components/ProductoCard.jsx`: tarjeta individual de producto.
- `src/components/BuscadorPokemon.jsx`: consulta a la API externa.
- `src/App.css` y `src/index.css`: presentación y estilos adaptables.
- `src/data/productos.js`: inventario de ejemplo usado la primera vez.

## Commits sugeridos para el proceso

```bash
git add .
git commit -m "feat: implementar CRUD local con React"

git add .
git commit -m "feat: persistir inventario con localStorage"

git add .
git commit -m "feat: consultar PokéAPI desde React"

git add .
git commit -m "style: mejorar interfaz de tienda tecnológica"
```

Antes de hacer `git push`, revisa `git status` y confirma que estás en el repositorio correcto.
