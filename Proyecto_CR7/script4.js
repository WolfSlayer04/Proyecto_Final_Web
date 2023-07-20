// Datos de ejemplo para eventos
let eventos = [];

// Índice del evento seleccionado para editar
let eventoSeleccionadoIndex = null;

// Cargar los datos almacenados en el localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar eventos almacenados
    const eventosStorage = localStorage.getItem('eventos');
    if (eventosStorage) {
        eventos = JSON.parse(eventosStorage);
        actualizarListaEventos();
    }
});

// Función para agregar un nuevo evento
function agregarEvento(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const lugar = document.getElementById('lugar').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    const nuevoEvento = { nombre, descripcion, lugar, fecha, hora, categoria, precio };
    eventos.push(nuevoEvento);

    // Actualizar la lista de eventos
    actualizarListaEventos();

    // Guardar eventos en el localStorage
    guardarEventos();

    // Limpiar el formulario después de agregar el evento
    document.getElementById('agregarEventoForm').reset();
}

// Función para actualizar la lista de eventos
function actualizarListaEventos() {
    const listaEventos = document.getElementById('listaEventos');
    listaEventos.innerHTML = '';

    eventos.forEach((evento, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('evento-card');
        listItem.innerHTML = `
            <h3>${evento.nombre}</h3>
            <p><strong>Lugar:</strong> ${evento.lugar}</p>
            <p><strong>Fecha:</strong> ${evento.fecha}</p>
            <p><strong>Hora:</strong> ${evento.hora}</p>
            <p><strong>Categoría:</strong> ${evento.categoria}</p>
            <p><strong>Precio:</strong> ${evento.precio}</p>
            <div class="evento-buttons">
                <button onclick="editarEvento(${index})">Editar</button>
                <button onclick="eliminarEvento(${index})">Eliminar</button>
            </div>
        `;
        listaEventos.appendChild(listItem);
    });
}

// Función para guardar los datos de eventos en el localStorage
function guardarEventos() {
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

// Función para editar un evento
function editarEvento(index) {
    // Guardar el índice del evento seleccionado
    eventoSeleccionadoIndex = index;

    // Obtener los datos del evento seleccionado
    const eventoSeleccionado = eventos[index];

    // Mostrar los datos del evento en el formulario de edición
    document.getElementById('nombreEditar').value = eventoSeleccionado.nombre;
    document.getElementById('descripcionEditar').value = eventoSeleccionado.descripcion;
    document.getElementById('lugarEditar').value = eventoSeleccionado.lugar;
    document.getElementById('fechaEditar').value = eventoSeleccionado.fecha;
    document.getElementById('horaEditar').value = eventoSeleccionado.hora;
    document.getElementById('categoriaEditar').value = eventoSeleccionado.categoria;
    document.getElementById('precioEditar').value = eventoSeleccionado.precio;

    // Mostrar el modal de edición de evento
    document.getElementById('modalEditarEvento').style.display = 'block';
}

// Función para guardar los cambios del evento editado
function guardarCambiosEvento() {
    // Obtener los nuevos datos del evento editado
    const nombre = document.getElementById('nombreEditar').value;
    const descripcion = document.getElementById('descripcionEditar').value;
    const lugar = document.getElementById('lugarEditar').value;
    const fecha = document.getElementById('fechaEditar').value;
    const hora = document.getElementById('horaEditar').value;
    const categoria = document.getElementById('categoriaEditar').value;
    const precio = document.getElementById('precioEditar').value;

    // Actualizar los datos del evento en el array
    const eventoSeleccionado = eventos[eventoSeleccionadoIndex];
    eventoSeleccionado.nombre = nombre;
    eventoSeleccionado.descripcion = descripcion;
    eventoSeleccionado.lugar = lugar;
    eventoSeleccionado.fecha = fecha;
    eventoSeleccionado.hora = hora;
    eventoSeleccionado.categoria = categoria;
    eventoSeleccionado.precio = precio;

    // Actualizar la lista de eventos
    actualizarListaEventos();

    // Guardar eventos en el localStorage
    guardarEventos();

    // Cerrar el modal de edición de evento
    cerrarModalEditarEvento();
}

// Función para eliminar un evento
function eliminarEvento(index) {
    // Guardar el índice del evento seleccionado
    eventoSeleccionadoIndex = index;

    // Mostrar el modal de confirmación de eliminación de evento
    document.getElementById('modalConfirmacionEliminarEvento').style.display = 'block';

    // Agregar el evento click al botón de confirmar eliminar en el modal
    document.getElementById('confirmarEliminarEvento').addEventListener('click', confirmarEliminarEvento);
}

// Función para confirmar la eliminación de un evento
function confirmarEliminarEvento() {
    // Eliminar el evento del array
    eventos.splice(eventoSeleccionadoIndex, 1);

    // Actualizar la lista de eventos
    actualizarListaEventos();

    // Guardar eventos en el localStorage
    guardarEventos();

    // Cerrar el modal de confirmación de eliminación de evento
    cerrarModalConfirmacionEliminarEvento();

    // Limpiar el índice del evento seleccionado
    eventoSeleccionadoIndex = null;
}

// Función para cerrar el modal de edición de evento
function cerrarModalEditarEvento() {
    document.getElementById('modalEditarEvento').style.display = 'none';
}

// Función para cerrar el modal de confirmación de eliminación de evento
function cerrarModalConfirmacionEliminarEvento() {
    document.getElementById('modalConfirmacionEliminarEvento').style.display = 'none';
}

// Resto de funciones para otras secciones de la aplicación...

// Escuchar eventos de submit para agregar eventos
document.getElementById('agregarEventoForm').addEventListener('submit', agregarEvento);