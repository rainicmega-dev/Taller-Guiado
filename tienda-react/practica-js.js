function calcularTotal(precio, cantidad) {
  const total = precio * cantidad;
  return total;
}

const resultado = calcularTotal(50000, 3);
console.log(resultado);


function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  return a / b;
}

function calcularPromedio(nota1, nota2, nota3) {
  return (nota1 + nota2 + nota3) / 3;
}

console.log(sumar(10, 5));
console.log(restar(10, 5));
console.log(multiplicar(10, 5));
console.log(dividir(10, 5));
console.log(calcularPromedio(4.5, 3.8, 4.2));


function aplicarIva(precio) {
  return precio * 1.19;
}


const aplicarIvaFlecha = (precio) => {
  return precio * 1.19;
};

const aplicarIvaCorta = precio => precio * 1.19;


const cuadrado = numero => numero * numero;

const esMayorEdad = edad => edad >= 18;

const nombreCompleto = (nombre, apellido) => `${nombre} ${apellido}`;

console.log(aplicarIva(100000));
console.log(aplicarIvaFlecha(100000));
console.log(aplicarIvaCorta(100000));
console.log(cuadrado(5));
console.log(esMayorEdad(20));
console.log(esMayorEdad(15));
console.log(nombreCompleto("Ana", "Gómez"));

const productos = [
  { id: 1, nombre: 'Mouse', precio: 50000, categoria: 'Perifericos', stock: 5 },
  { id: 2, nombre: 'Teclado', precio: 90000, categoria: 'Perifericos', stock: 0 },
  { id: 3, nombre: 'Monitor', precio: 650000, categoria: 'Pantallas', stock: 3 },
  { id: 4, nombre: 'Audífonos', precio: 120000, categoria: 'Audio', stock: 8 },
  { id: 5, nombre: 'Webcam', precio: 180000, categoria: 'Perifericos', stock: 0 },
  { id: 6, nombre: 'SSD 1TB', precio: 350000, categoria: 'Almacenamiento', stock: 4 },
  { id: 7, nombre: 'Memoria RAM 16GB', precio: 280000, categoria: 'Componentes', stock: 6 },
  { id: 8, nombre: 'Silla Gamer', precio: 450000, categoria: 'Mobiliario', stock: 2 },
  { id: 9, nombre: 'Micrófono', precio: 95000, categoria: 'Audio', stock: 7 },
  { id: 10, nombre: 'Hub USB', precio: 45000, categoria: 'Perifericos', stock: 10 }
];

console.log(productos);
console.log("Total de productos:", productos.length);


productos.forEach((producto, indice) => {
  console.log(`${indice + 1}. ${producto.nombre} - $${producto.precio} - stock: ${producto.stock}`);
});

// ===== Reto 5: map() =====

const nombres = productos.map(producto => producto.nombre);
console.log("Nombres:", nombres);

const preciosConIva = productos.map(producto => producto.precio * 1.19);
console.log("Precios con IVA:", preciosConIva);

const nombresMayuscula = productos.map(producto => producto.nombre.toUpperCase());
console.log("Nombres en mayúscula:", nombresMayuscula);

const resumenProductos = productos.map(producto => `${producto.nombre} cuesta $${producto.precio}`);
console.log("Resumen:", resumenProductos);

// ===== Reto 6: filter() y find() =====

const disponibles = productos.filter(producto => producto.stock > 0);
console.log("Disponibles:", disponibles);

const caros = productos.filter(producto => producto.precio > 100000);
console.log("Más de $100.000:", caros);

const rangoMedio = productos.filter(producto => producto.precio >= 50000 && producto.precio <= 200000);
console.log("Entre $50.000 y $200.000:", rangoMedio);

const categoriaAudio = productos.filter(producto => producto.categoria === 'Audio');
console.log("Categoría Audio:", categoriaAudio);

const producto5 = productos.find(producto => producto.id === 5);
console.log("Producto id 5:", producto5);

function buscarProducto(id) {
  return productos.find(producto => producto.id === id);
}

console.log("Buscar producto 3:", buscarProducto(3));
console.log("Buscar producto 99:", buscarProducto(99));

// ===== Reto 7: some(), every() y reduce() =====

const hayAgotados = productos.some(producto => producto.stock === 0);
console.log("¿Hay productos agotados?", hayAgotados);

const hayMuyCaro = productos.some(producto => producto.precio > 1000000);
console.log("¿Hay algún producto > $1.000.000?", hayMuyCaro);

const preciosValidos = productos.every(producto => producto.precio > 0);
console.log("¿Todos tienen precio > 0?", preciosValidos);

const stockValido = productos.every(producto => producto.stock >= 0);
console.log("¿Todos tienen stock >= 0?", stockValido);

const valorInventario = productos.reduce(
  (total, producto) => total + producto.precio * producto.stock,
  0
);
console.log("Valor total del inventario: $", valorInventario);

