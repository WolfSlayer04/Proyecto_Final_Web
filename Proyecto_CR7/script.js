// Datos de ejemplo para usuarios
let usuarios = [];

// Índice del usuario seleccionado para editar
let usuarioSeleccionadoIndex = null;

// Cargar los datos almacenados en el localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar usuarios almacenados
    const usuariosStorage = localStorage.getItem('usuarios');
    if (usuariosStorage) {
        usuarios = JSON.parse(usuariosStorage);
        actualizarListaUsuarios();
    }
});

// Función para agregar un nuevo usuario
function agregarUsuario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    const nuevoUsuario = { nombre, correo, contrasena };
    usuarios.push(nuevoUsuario);

    // Actualizar la lista de usuarios
    actualizarListaUsuarios();

    // Guardar usuarios en el localStorage
    guardarUsuarios();

    // Limpiar el formulario después de agregar el usuario
    document.getElementById('registroUsuarioForm').reset();
}

// Función para actualizar la lista de usuarios
function actualizarListaUsuarios() {
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = '';

    usuarios.forEach((usuario, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${usuario.nombre}</strong> - ${usuario.correo} <button onclick="editarUsuario(${index})">Editar</button> <button onclick="eliminarUsuario(${index})">Eliminar</button>`;
        listaUsuarios.appendChild(listItem);
    });
}

// Función para guardar los datos de usuarios en el localStorage
function guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para editar un usuario
function editarUsuario(index) {
    // Guardar el índice del usuario seleccionado
    usuarioSeleccionadoIndex = index;

    // Obtener los datos del usuario seleccionado
    const usuarioSeleccionado = usuarios[index];

    // Mostrar los datos del usuario en el formulario de edición
    document.getElementById('nombreEditar').value = usuarioSeleccionado.nombre;
    document.getElementById('correoEditar').value = usuarioSeleccionado.correo;
    document.getElementById('contrasenaEditar').value = usuarioSeleccionado.contrasena;

    // Mostrar el modal de edición de usuario
    document.getElementById('modalEditarUsuario').style.display = 'block';
}

// Función para guardar los cambios del usuario editado
function guardarCambiosUsuario() {
    // Obtener los nuevos datos del usuario editado
    const nombre = document.getElementById('nombreEditar').value;
    const correo = document.getElementById('correoEditar').value;
    const contrasena = document.getElementById('contrasenaEditar').value;

    // Actualizar los datos del usuario en el array
    const usuarioSeleccionado = usuarios[usuarioSeleccionadoIndex];
    usuarioSeleccionado.nombre = nombre;
    usuarioSeleccionado.correo = correo;
    usuarioSeleccionado.contrasena = contrasena;

    // Actualizar la lista de usuarios
    actualizarListaUsuarios();

    // Guardar usuarios en el localStorage
    guardarUsuarios();

    // Cerrar el modal de edición de usuario
    cerrarModalEditarUsuario();
}

// Función para eliminar un usuario
function eliminarUsuario(index) {
    // Guardar el índice del usuario seleccionado
    usuarioSeleccionadoIndex = index;

    // Mostrar el modal de confirmación de eliminación de usuario
    document.getElementById('modalConfirmacionEliminarUsuario').style.display = 'block';

    // Agregar el evento click al botón de confirmar eliminar en el modal
    document.getElementById('confirmarEliminarUsuario').addEventListener('click', confirmarEliminarUsuario);
}

// Función para confirmar la eliminación de un usuario
function confirmarEliminarUsuario() {
    // Eliminar el usuario del array
    usuarios.splice(usuarioSeleccionadoIndex, 1);

    // Actualizar la lista de usuarios
    actualizarListaUsuarios();

    // Guardar usuarios en el localStorage
    guardarUsuarios();

    // Cerrar el modal de confirmación de eliminación de usuario
    cerrarModalConfirmacionEliminarUsuario();

    // Limpiar el índice del usuario seleccionado
    usuarioSeleccionadoIndex = null;
}

// Función para cerrar el modal de edición de usuario
function cerrarModalEditarUsuario() {
    document.getElementById('modalEditarUsuario').style.display = 'none';
}

// Función para cerrar el modal de confirmación de eliminación de usuario
function cerrarModalConfirmacionEliminarUsuario() {
    document.getElementById('modalConfirmacionEliminarUsuario').style.display = 'none';
}

// Escuchar eventos de submit para agregar usuarios
document.getElementById('registroUsuarioForm').addEventListener('submit', agregarUsuario);