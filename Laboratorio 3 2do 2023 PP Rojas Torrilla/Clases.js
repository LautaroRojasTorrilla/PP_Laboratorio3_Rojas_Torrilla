class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
        if (id <= 0 || isNaN(id)) {
            throw new Error("El ID debe ser un número mayor a 0");
        }
        if (!modelo) {
            throw new Error("El modelo no puede ser nulo");
        }
        if (anoFab <= 1885 || isNaN(anoFab)) {
            throw new Error("El año de fabricación debe ser un número mayor a 1885");
        }
        if (velMax <= 0 || isNaN(velMax)) {
            throw new Error("La velocidad máxima debe ser un número mayor a 0");
        }

        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }

    toString() {
        return `Vehículo ${this.modelo} - Año: ${this.anoFab} - Velocidad Máxima: ${this.velMax}`;
    }
}

class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
        super(id, modelo, anoFab, velMax);

        if (altMax <= 0 || isNaN(altMax)) {
            throw new Error("La altitud máxima debe ser un número mayor a 0");
        }
        if (autonomia <= 0 || isNaN(autonomia)) {
            throw new Error("La autonomía debe ser un número mayor a 0");
        }

        this.altMax = altMax;
        this.autonomia = autonomia;
    }
}

class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
        super(id, modelo, anoFab, velMax);

        if (cantPue < -1 || isNaN(cantPue)) {
            throw new Error("La cantidad de pasajeros debe ser un número mayor o igual a -1");
        }
        if (cantRue <= 0 || isNaN(cantRue)) {
            throw new Error("La cantidad de ruedas debe ser un número mayor a 0");
        }

        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
}

// Cadena de datos en formato JSON
const datosVehiculos = '[ \
    {"id": 14, "modelo": "Ferrari F100", "anoFab": 1998, "velMax": 400, "cantPue": 2, "cantRue": 4}, \
    {"id": 51, "modelo": "Dodge Viper", "anoFab": 1991, "velMax": 266, "cantPue": 2, "cantRue": 4}, \
    {"id": 67, "modelo": "Boeing CH-47 Chinook", "anoFab": 1962, "velMax": 302, "altMax": 6, "autonomia": 1200}, \
    {"id": 666, "modelo": "Aprilia RSV 1000 R", "anoFab": 2004, "velMax": 280, "cantPue": 0, "cantRue": 2}, \
    {"id": 872, "modelo": "Boeing 747-400", "anoFab": 1989, "velMax": 988, "altMax": 13, "autonomia": 13450}, \
    {"id": 742, "modelo": "Cessna CH-1 SkyhookR", "anoFab": 1953, "velMax": 174, "altMax": 3, "autonomia": 870} \
]';

// Convertir la cadena a un array de objetos
const datos = JSON.parse(datosVehiculos);

// Array de instancias de las clases
const objetosJerarquia = datos.map(item => {
    if ('altMax' in item) {
        return new Aereo(item.id, item.modelo, item.anoFab, item.velMax, item.altMax, item.autonomia);
    } else if ('cantPue' in item) {
        return new Terrestre(item.id, item.modelo, item.anoFab, item.velMax, item.cantPue, item.cantRue);
    } else {
        return new Vehiculo(item.id, item.modelo, item.anoFab, item.velMax);
    }
});

//LOGICA DEL FORM DE DATOS
document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.querySelector(".table-container");
    const abmForm = document.getElementById("abm-form");

    // Crear la tabla
    const table = document.createElement("table");
    table.classList.add("data-table");

    // Encabezados de la tabla
    const headerRow = document.createElement("tr");
    const columns = ["id", "modelo", "anoFab", "velMax", "altMax", "autonomia", "cantPue", "cantRue"];

    columns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column.charAt(0).toUpperCase() + column.slice(1); // Convertir la primera letra a mayúscula

        // Asignar clase al encabezado según la columna
        th.classList.add(`col-${column}`);

        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Filas de la tabla
    objetosJerarquia.forEach(objeto => {
        const row = document.createElement("tr");
        row.classList.add(objeto instanceof Aereo ? "aereo" : "terrestre");

        // Obtener propiedades del objeto
        const properties = ["id", "modelo", "anoFab", "velMax", "altMax", "autonomia", "cantPue", "cantRue"];

        properties.forEach(prop => {
            const td = document.createElement("td");

            // Condición específica para mostrar "0" solo en la propiedad cantPue de vehículos terrestres
            if (prop === "cantPue" && objeto instanceof Terrestre) {
                td.textContent = objeto[prop] >= 0 ? objeto[prop] : "0";
            } else {
                // Manejar propiedades que no existen o son falsy
                td.textContent = objeto[prop] !== undefined && objeto[prop] !== null ? objeto[prop] : "";
            }

            if (prop === "id") {
                td.addEventListener("dblclick", () => {
                    handleDoubleClick(objeto);
                });
            }

            // Asignar clase a la celda según la columna
            td.classList.add(`col-${prop}`);

            row.appendChild(td);
        });

        table.appendChild(row);
    });

    function handleDoubleClick(objeto) {
        mostrarABMForm();

        resetForm();

        // Llenar el formulario con los valores actuales del objeto
        document.getElementById("abm-id").value = objeto.id;
        document.getElementById("abm-modelo").value = objeto.modelo;
        document.getElementById("abm-anoFab").value = objeto.anoFab;
        document.getElementById("abm-velMax").value = objeto.velMax;

        // Llenar campos específicos para aéreos o terrestres
        if (objeto instanceof Aereo) {
            document.getElementById("abm-altMax").value = objeto.altMax;
            document.getElementById("abm-autonomia").value = objeto.autonomia;
            document.getElementById("abm-type").value = "aereo";
        } else if (objeto instanceof Terrestre) {
            document.getElementById("abm-cantPue").value = objeto.cantPue;
            document.getElementById("abm-cantRue").value = objeto.cantRue;
            document.getElementById("abm-type").value = "terrestre";
        }
    }

    // Agregar la tabla al contenedor
    tableContainer.appendChild(table);

    // Seleccionar checkboxes por defecto
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => (checkbox.checked = true));

});

function filtrarListado() {
    const filtro = document.getElementById("filter").value;

    objetosJerarquia.forEach(objeto => {
        const row = document.querySelector(`.data-table .${objeto instanceof Aereo ? "aereo" : "terrestre"}`);

        if (
            (filtro === 'todos') ||
            (filtro === 'aereo' && objeto instanceof Aereo && objeto.altMax > 0) ||
            (filtro === 'terrestre' && objeto instanceof Terrestre && objeto.cantPue > 0)
        ) {
            row.classList.remove('oculto');
        } else {
            row.classList.add('oculto');
        }
    });

    // Asegurarse de ocultar la categoría no seleccionada
    document.querySelectorAll('.data-table .aereo').forEach(row => {
        if (filtro === 'terrestre') {
            row.classList.add('oculto');
        } else {
            row.classList.remove('oculto');
        }
    });

    document.querySelectorAll('.data-table .terrestre').forEach(row => {
        if (filtro === 'aereo') {
            row.classList.add('oculto');
        } else {
            row.classList.remove('oculto');
        }
    });
}

function mostrarABMForm() {
    // Mostrar el formulario de ABM
    const abmForm = document.getElementById("abm-form");
    abmForm.style.display = "block";
}

function cancelarAccion() {
    // Mostrar el formulario de datos principal
    const dataForm = document.getElementById("data-form");

    // Ocultar el formulario de ABM
    const abmForm = document.getElementById("abm-form");
    abmForm.style.display = "none";
}

function calcularVelocidad() {
    const filtro = document.getElementById("filter").value;
    let totalVelocidad = 0;
    let totalVehiculos = 0;

    objetosJerarquia.forEach(objeto => {
        // Solo contar las personas que cumplen con el filtro
        if (
            filtro === 'todos' ||
            (filtro === 'aereo' && objeto instanceof Aereo && objeto.altMax > 0) ||
            (filtro === 'terrestre' && objeto instanceof Terrestre && objeto.cantPue >= 0)
        ) {
            totalVelocidad += objeto.velMax;
            totalVehiculos++;
        }
    });

    // Calcular el promedio de edad
    const promedioVelocidad = totalVehiculos > 0 ? Math.round(totalVelocidad / totalVehiculos) : 0;

    // Mostrar el resultado en el cuadro de texto
    const velInput = document.getElementById("velInput");
    velInput.value = promedioVelocidad + " KM/H";
}

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('#columnCheckboxes input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const columnId = this.dataset.column; // Obtén el valor del atributo data-column
            const cells = document.querySelectorAll(`.data-table .col-${columnId}`);

            cells.forEach(cell => {
                cell.style.display = this.checked ? '' : 'none';
            });
        });
    });
});

//LOGICA DEL ABM
document.addEventListener("DOMContentLoaded", function () {
    const abmTypeSelect = document.getElementById("abm-type");
    const terrestreFields = ["cantPue", "cantRue"];
    const aereoFields = ["altMax", "autonomia"];

    abmTypeSelect.addEventListener("change", function () {
        const selectedType = this.value;
        const allFields = ["cantPue", "cantRue", "altMax", "autonomia"];

        // Oculta todos los campos primero
        allFields.forEach(field => {
            const fieldElement = document.getElementById(`abm-${field}`);
            if (fieldElement) {
                fieldElement.parentNode.style.display = "none";
            }
        });

        // Muestra los campos según el tipo seleccionado
        if (selectedType === "terrestre") {
            terrestreFields.forEach(field => {
                const fieldElement = document.getElementById(`abm-${field}`);
                if (fieldElement) {
                    fieldElement.parentNode.style.display = "block";
                }
            });
        } else if (selectedType === "aereo") {
            aereoFields.forEach(field => {
                const fieldElement = document.getElementById(`abm-${field}`);
                if (fieldElement) {
                    fieldElement.parentNode.style.display = "block";
                }
            });
        }
    });
});


function resetForm() {
    document.getElementById("abm-id").value = "";
    document.getElementById("abm-modelo").value = "";
    document.getElementById("abm-anoFab").value = "";
    document.getElementById("abm-velMax").value = "";
    document.getElementById("abm-altMax").value = "";
    document.getElementById("abm-autonomia").value = "";
    document.getElementById("abm-cantPue").value = "";
    document.getElementById("abm-cantRue").value = "";
    document.getElementById("abm-type").value = "";
}

let proximoID = 873; // Iniciar con el ID deseado

function agregarVehiculo() {
    /* 
    me falta hacer la lógica para agregue los elementos desde getElementById("segun corresponda").value
    Actualizar y que lo vuelva a mostrar

    */
}









