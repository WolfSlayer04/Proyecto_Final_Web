// Datos de ejemplo para tareas
let tareas = [];

// Cargar los datos almacenados en el localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar tareas almacenadas
    const tareasStorage = localStorage.getItem('tareas');
    if (tareasStorage) {
        tareas = JSON.parse(tareasStorage);
        actualizarListaTareas();
    }
});

// Función para guardar los datos de tareas en el localStorage
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para agregar una nueva tarea
function agregarTarea(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fechaLimite = document.getElementById('fechaLimite').value;

    const nuevaTarea = { titulo, descripcion, fechaLimite };
    tareas.push(nuevaTarea);

    // Actualizar la lista de tareas
    actualizarListaTareas();

    // Guardar tareas en el localStorage
    guardarTareas();

    // Limpiar el formulario después de agregar la tarea
    document.getElementById('agregarTareaForm').reset();
}

// Función para actualizar la lista de tareas
function actualizarListaTareas() {
    const listaTareas = document.getElementById('listaTareas');
    listaTareas.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${tarea.titulo}</strong> - ${tarea.descripcion} - Fecha límite: ${tarea.fechaLimite}
            <button onclick="eliminarTarea(${index})">Eliminar</button> <button onclick="editarTarea(${index})">Editar</button>`;
        listaTareas.appendChild(listItem);
    });
}

// Función para editar una tarea
function editarTarea(index) {
    const tarea = tareas[index];
    const tituloInput = document.getElementById('tituloEditar');
    const descripcionInput = document.getElementById('descripcionEditar');
    const fechaLimiteInput = document.getElementById('fechaLimiteEditar');

    tituloInput.value = tarea.titulo;
    descripcionInput.value = tarea.descripcion;
    fechaLimiteInput.value = tarea.fechaLimite;

    // Mostrar el modal
    document.getElementById('modalEditarTarea').style.display = 'block';

    // Guardar el índice de la tarea en el formulario de edición
    document.getElementById('formularioEditarTarea').setAttribute('data-index', index);
}

// Función para guardar los cambios de una tarea editada
function guardarCambiosTarea() {
    const index = document.getElementById('formularioEditarTarea').getAttribute('data-index');
    const tarea = tareas[index];

    tarea.titulo = document.getElementById('tituloEditar').value;
    tarea.descripcion = document.getElementById('descripcionEditar').value;
    tarea.fechaLimite = document.getElementById('fechaLimiteEditar').value;

    // Actualizar la lista de tareas
    actualizarListaTareas();

    // Guardar tareas en el localStorage
    guardarTareas();

    // Cerrar el modal de edición
    cerrarModalEditarTarea();
}

// Función para eliminar una tarea
function eliminarTarea(index) {
    tareas.splice(index, 1);

    // Actualizar la lista de tareas
    actualizarListaTareas();

    // Guardar tareas en el localStorage
    guardarTareas();
}

// Función para cerrar el modal de edición de tarea
function cerrarModalEditarTarea() {
    // Ocultar el modal
    document.getElementById('modalEditarTarea').style.display = 'none';
}

// Escuchar evento submit para agregar una nueva tarea
document.getElementById('agregarTareaForm').addEventListener('submit', agregarTarea);