// Array para almacenar empleados
let empleados = [];

// Cargar empleados desde el local storage
function cargarEmpleados() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
        empleados = JSON.parse(empleadosGuardados);
    } else {
        // Si no hay empleados guardados, agregar empleados de ejemplo
        empleados = [
            { nombre: "Juan Pérez", puesto: "Piloto", turno: "mañana" },
            { nombre: "María López", puesto: "Piloto", turno: "tarde" },
            { nombre: "Carlos García", puesto: "Personal de tierra", turno: "noche" },
            { nombre: "Ana Martínez", puesto: "Personal de tierra", turno: "mañana" },
            { nombre: "Luis Rodríguez", puesto: "Seguridad", turno: "tarde" },
            { nombre: "Laura Gómez", puesto: "Seguridad", turno: "noche" },
            { nombre: "Pedro Sánchez", puesto: "Controlador aéreo", turno: "mañana" },
            { nombre: "Sofía Castro", puesto: "Controlador aéreo", turno: "tarde" },
            { nombre: "Javier Morales", puesto: "Ingeniero de mantenimiento", turno: "noche" },
            { nombre: "Valentina Ramírez", puesto: "Ingeniero de mantenimiento", turno: "mañana" },
            { nombre: "Diego Torres", puesto: "Atención al cliente", turno: "tarde" },
            { nombre: "Isabel Díaz", puesto: "Atención al cliente", turno: "noche" },
        ];
    }
    mostrarEmpleados();
}

// Mostrar empleados en la tabla
function mostrarEmpleados() {
    const empleadosTabla = document.getElementById('empleadosTabla').getElementsByTagName('tbody')[0];
    empleadosTabla.innerHTML = ''; // Limpiar tabla

    empleados.forEach((empleado, index) => {
        const row = empleadosTabla.insertRow();
        row.innerHTML = `
            <td>${empleado.nombre}</td>
            <td>${empleado.puesto}</td>
            <td>${empleado.turno}</td>
            <td>
                <button class="btn btn-warning" onclick="editarEmpleado(${index})" data-toggle="modal" data-target="#editarEmpleadoModal">Editar</button>
                <button class="btn btn-danger" onclick="confirmarEliminacion(${index})">Eliminar</button>
            </td>
        `;
    });
}

// Guardar empleado
document.getElementById('empleadoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const puesto = document.getElementById('puesto').value;
    const turno = document.getElementById('turno').value;

    // Comprobar si el nombre ya existe
    if (empleados.some(empleado => empleado.nombre === nombre)) {
        alert('El nombre ya existe. Por favor, elige otro.');
        return;
    }

    // Agregar nuevo empleado
    empleados.push({ nombre, puesto, turno });
    localStorage.setItem('empleados', JSON.stringify(empleados));
    mostrarEmpleados();

    // Limpiar formulario
    document.getElementById('empleadoForm').reset();
});

// Editar empleado
function editarEmpleado(index) {
    const empleado = empleados[index];
    document.getElementById('editarNombre').value = empleado.nombre;
    document.getElementById('editarPuesto').value = empleado.puesto;
    document.getElementById('editarTurno').value = empleado.turno;

    document.getElementById('editarEmpleadoForm').onsubmit = function (event) {
        event.preventDefault();

        const nuevoNombre = document.getElementById('editarNombre').value;
        const nuevoPuesto = document.getElementById('editarPuesto').value;
        const nuevoTurno = document.getElementById('editarTurno').value;

        // Comprobar si el nuevo nombre ya existe
        if (empleados.some((emp, idx) => emp.nombre === nuevoNombre && idx !== index)) {
            alert('El empleado ya existe. Por favor, edita el empleado existente ó usa un nombre distinto.');
            return;
        }

        // Actualizar empleado
        empleados[index] = { nombre: nuevoNombre, puesto: nuevoPuesto, turno: nuevoTurno };
        localStorage.setItem('empleados', JSON.stringify(empleados));
        mostrarEmpleados();
        $('#editarEmpleadoModal').modal('hide');
    };
}

// Confirmar eliminación de empleado
function confirmarEliminacion(index) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (confirmacion) {
        eliminarEmpleado(index);
    }
}

// Eliminar empleado
function eliminarEmpleado(index) {
    empleados.splice(index, 1);
    localStorage.setItem('empleados', JSON.stringify(empleados));
    mostrarEmpleados();
}

// Cargar empleados al inicio
window.onload = cargarEmpleados;

// Filtrar empleados
function filtrarEmpleados() {
    const nombreBusqueda = document.getElementById('busquedaNombre').value.toLowerCase();
    const puestoFiltro = document.getElementById('filtroPuesto').value;
    const turnoFiltro = document.getElementById('filtroTurno').value;

    const empleadosTabla = document.getElementById('empleadosTabla').getElementsByTagName('tbody')[0];
    empleadosTabla.innerHTML = ''; // Limpiar tabla

    empleados.filter(empleado => {
        const coincideNombre = empleado.nombre.toLowerCase().includes(nombreBusqueda);
        const coincidePuesto = puestoFiltro ? empleado.puesto === puestoFiltro : true;
        const coincideTurno = turnoFiltro ? empleado.turno === turnoFiltro : true;

        return coincideNombre && coincidePuesto && coincideTurno;
    }).forEach((empleado, index) => {
        const row = empleadosTabla.insertRow();
        row.innerHTML = `
            <td>${empleado.nombre}</td>
            <td>${empleado.puesto}</td>
            <td>${empleado.turno}</td>
            <td>
                <button class="btn btn-warning" onclick="editarEmpleado(${index})" data-toggle="modal" data-target="#editarEmpleadoModal">Editar</button>
                <button class="btn btn-danger" onclick="confirmarEliminacion(${index})">Eliminar</button>
            </td>
        `;
    });
}
