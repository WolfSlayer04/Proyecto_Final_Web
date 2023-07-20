// Datos de ejemplo para productos
let productos = [];

// Índice del producto seleccionado para editar
let productoSeleccionadoIndex = null;

// Cargar los datos almacenados en el localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos almacenados
    const productosStorage = localStorage.getItem('productos');
    if (productosStorage) {
        productos = JSON.parse(productosStorage);
        actualizarListaProductos();
    }
});

// Función para agregar un nuevo producto
function agregarProducto(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;

    const nuevoProducto = { nombre, descripcion };
    productos.push(nuevoProducto);

    // Actualizar la lista de productos
    actualizarListaProductos();

    // Guardar productos en el localStorage
    guardarProductos();

    // Limpiar el formulario después de agregar el producto
    document.getElementById('agregarProductoForm').reset();
}

// Función para actualizar la lista de productos
function actualizarListaProductos() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';

    productos.forEach((producto, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="producto-card">
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                </div>
                <div class="producto-botones">
                    <button onclick="editarProducto(${index})">Editar</button>
                    <button onclick="eliminarProducto(${index})">Eliminar</button>
                </div>
            </div>
        `;
        listaProductos.appendChild(listItem);
    });
}

// Función para guardar los datos de productos en el localStorage
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para editar un producto
function editarProducto(index) {
    // Guardar el índice del producto seleccionado
    productoSeleccionadoIndex = index;

    // Obtener los datos del producto seleccionado
    const productoSeleccionado = productos[index];

    // Mostrar los datos del producto en el formulario de edición
    document.getElementById('nombreEditar').value = productoSeleccionado.nombre;
    document.getElementById('descripcionEditar').value = productoSeleccionado.descripcion;

    // Mostrar el modal de edición de producto
    document.getElementById('modalEditarProducto').style.display = 'block';
}

// Función para guardar los cambios del producto editado
function guardarCambiosProducto() {
    // Obtener los nuevos datos del producto editado
    const nombre = document.getElementById('nombreEditar').value;
    const descripcion = document.getElementById('descripcionEditar').value;

    // Actualizar los datos del producto en el array
    const productoSeleccionado = productos[productoSeleccionadoIndex];
    productoSeleccionado.nombre = nombre;
    productoSeleccionado.descripcion = descripcion;

    // Actualizar la lista de productos
    actualizarListaProductos();

    // Guardar productos en el localStorage
    guardarProductos();

    // Cerrar el modal de edición de producto
    cerrarModalEditarProducto();
}

// Función para eliminar un producto
function eliminarProducto(index) {
    // Guardar el índice del producto seleccionado
    productoSeleccionadoIndex = index;

    // Mostrar el modal de confirmación de eliminación de producto
    document.getElementById('modalConfirmacionEliminarProducto').style.display = 'block';

    // Agregar el evento click al botón de confirmar eliminar en el modal
    document.getElementById('confirmarEliminarProducto').addEventListener('click', confirmarEliminarProducto);
}

// Función para confirmar la eliminación de un producto
function confirmarEliminarProducto() {
    // Eliminar el producto del array
    productos.splice(productoSeleccionadoIndex, 1);

    // Actualizar la lista de productos
    actualizarListaProductos();

    // Guardar productos en el localStorage
    guardarProductos();

    // Cerrar el modal de confirmación de eliminación de producto
    cerrarModalConfirmacionEliminarProducto();

    // Limpiar el índice del producto seleccionado
    productoSeleccionadoIndex = null;
}

// Función para cerrar el modal de edición de producto
function cerrarModalEditarProducto() {
    document.getElementById('modalEditarProducto').style.display = 'none';
}

// Función para cerrar el modal de confirmación de eliminación de producto
function cerrarModalConfirmacionEliminarProducto() {
    document.getElementById('modalConfirmacionEliminarProducto').style.display = 'none';
}

// Resto de funciones para otras secciones de la aplicación...

// Escuchar eventos de submit para agregar productos
document.getElementById('agregarProductoForm').addEventListener('submit', agregarProducto);