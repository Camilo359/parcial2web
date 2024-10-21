const apiUrl = "https://api.weatherunlocked.com/api/current/51.50,-0.12?app_id=72469a6e&app_key=03bdc79e83940aaaccd19f4c722f49aa";

// Función para obtener y mostrar el clima
async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Aquí puedes formatear la información que deseas mostrar
        const weatherHtml = `
            <h2>Ubicación: ${data.area}</h2>
            <p>Temperatura: ${data.temp_c} °C</p>
            <p>Estado: ${data.weather_desc}</p>
            <p>Humedad: ${data.humidity} %</p>
        `;
        
        // Mostrar la información en el contenedor
        document.getElementById("weather").innerHTML = weatherHtml;
    } catch (error) {
        console.error(error);
        document.getElementById("weather").innerHTML = "<p>Error al obtener los datos del clima.</p>";
    }
}

// Llamar a la función al cargar la página
window.onload = getWeather;

const parkingAvailability = [
    { date: '2024-10-01', availableSlots: 10 },
    { date: '2024-10-02', availableSlots: 8 },
    { date: '2024-10-03', availableSlots: 15 },
    { date: '2024-10-04', availableSlots: 5 },
    { date: '2024-10-05', availableSlots: 12 },
    { date: '2024-10-06', availableSlots: 7 },
    { date: '2024-10-07', availableSlots: 10 },
    { date: '2024-10-08', availableSlots: 9 },
    { date: '2024-10-09', availableSlots: 0 },
    { date: '2024-10-10', availableSlots: 6 },
    { date: '2024-10-11', availableSlots: 11 },
    { date: '2024-10-12', availableSlots: 3 },
    { date: '2024-10-13', availableSlots: 14 },
    { date: '2024-10-14', availableSlots: 4 },
    { date: '2024-10-15', availableSlots: 8 },
    { date: '2024-10-16', availableSlots: 2 },
    { date: '2024-10-17', availableSlots: 5 },
    { date: '2024-10-18', availableSlots: 12 },
    { date: '2024-10-19', availableSlots: 9 },
    { date: '2024-10-20', availableSlots: 10 },
    { date: '2024-10-21', availableSlots: 5 },
    { date: '2024-10-22', availableSlots: 0 },
    { date: '2024-10-23', availableSlots: 12 },
    { date: '2024-10-24', availableSlots: 8 },
    { date: '2024-10-25', availableSlots: 15 },
    { date: '2024-10-26', availableSlots: 7 },
    { date: '2024-10-27', availableSlots: 10 },
    { date: '2024-10-28', availableSlots: 3 },
    { date: '2024-10-29', availableSlots: 9 },
    { date: '2024-10-30', availableSlots: 0 },
    { date: '2024-10-31', availableSlots: 14 }
];


document.getElementById('parking-reservation-form').addEventListener('submit', function(e) {
e.preventDefault();

// Mostrar spinner de carga
document.getElementById('loading-spinner').style.display = 'block';

// Ocultar el botón de reserva
document.getElementById('reserve-button-container').style.display = 'none';

// Obtener valores del formulario
const reservationDate = document.getElementById('reservationDate').value;
const entryTime = document.getElementById('entryTime').value;
const exitTime = document.getElementById('exitTime').value;

// Validación de horas
if (entryTime >= exitTime) {
    document.getElementById('availability-result').style.display = 'none';
    alert("La hora de entrada debe ser menor que la hora de salida.");
    document.getElementById('loading-spinner').style.display = 'none';
    return;
}

// Simular verificación de disponibilidad
setTimeout(() => {
    const availability = parkingAvailability.find(slot => slot.date === reservationDate);

    document.getElementById('loading-spinner').style.display = 'none';
    const availabilityResult = document.getElementById('availability-result');
    const reserveButtonContainer = document.getElementById('reserve-button-container');
    const placa = document.getElementById('placa-vehiculo').value;
    if (availability && availability.availableSlots > 0) {
        availabilityResult.classList.remove('alert-danger');
        availabilityResult.classList.add('alert-success');
        availabilityResult.innerHTML = `Hay ${availability.availableSlots} espacios disponibles para la fecha seleccionada.`;

        // Mostrar botón de reservar
        reserveButtonContainer.style.display = 'block';

        // Añadir evento al botón de reservar
        document.getElementById('reserve-button').onclick = function() {
            // Realizar la reserva
            availability.availableSlots--; // Reducir los espacios disponibles

            // Actualizar el mensaje de disponibilidad
            availabilityResult.innerHTML = `Reserva confirmada para el vehiculo ${placa}. Espacios restantes: ${availability.availableSlots}.`;

            // Ocultar el botón de reservar tras la reserva
            reserveButtonContainer.style.display = 'none';
        };
    } else {
        availabilityResult.classList.remove('alert-success');
        availabilityResult.classList.add('alert-danger');
        availabilityResult.innerHTML = `No hay espacios disponibles para la fecha seleccionada.`;

        // Ocultar el botón de reservar si no hay espacios
        reserveButtonContainer.style.display = 'none';
    }

    availabilityResult.style.display = 'block';
}, 1000); // Simula la verificación con un retraso de 1 segundo
});
