// Clases
class Persona {
  constructor(id, nombre, apellido, edad) {
    if (id === null || nombre === null || apellido === null || edad === null) {
      throw new Error('Los campos id, nombre, apellido y edad son obligatorios.');
    }

    if (edad <= 15) {
      throw new Error('La edad debe ser mayor a 15.');
    }

    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }

  toString() {
    return `Persona [ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}]`;
  }

  toJson() {
    return JSON.stringify({
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
    });
  }
}

class Empleado extends Persona {
  constructor(id, nombre, apellido, edad, sueldo, ventas) {
    super(id, nombre, apellido, edad);

    if (sueldo === null || ventas === null || sueldo <= 15 || ventas <= 15) {
      throw new Error('Los campos sueldo y ventas son obligatorios y deben ser mayores a 15.');
    }

    this.sueldo = sueldo;
    this.ventas = ventas;
  }

  toString() {
    return `${super.toString()}, Sueldo: ${this.sueldo}, Ventas: ${this.ventas}`;
  }

  toJson() {
    const personaJson = JSON.parse(super.toJson());
    return JSON.stringify({
      ...personaJson,
      sueldo: this.sueldo,
      ventas: this.ventas,
    });
  }
}

class Cliente extends Persona {
  constructor(id, nombre, apellido, edad, compras, telefono) {
    super(id, nombre, apellido, edad);

    if (compras === null || telefono === null || compras <= 0) {
      throw new Error('Los campos compras y telefono son obligatorios y compras debe ser mayor a 0.');
    }

    this.compras = compras;
    this.telefono = telefono;
  }

  toString() {
    return `${super.toString()}, Compras: ${this.compras}, Teléfono: ${this.telefono}`;
  }

  toJson() {
    const personaJson = JSON.parse(super.toJson());
    return JSON.stringify({
      ...personaJson,
      compras: this.compras,
      telefono: this.telefono,
    });
  }
}

// Punto 2: Cadena de datos en formato JSON
const cadenaDatos = '[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "ventas":15000, "sueldo":2000},'+
                   '{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "ventas": 6000, "sueldo": 1000},'+
                   '{"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30, "ventas":500, "sueldo":15000},'+
                   '{"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "compras":8000, "telefono":"152111131"},'+
                   '{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "compras":50000, "telefono":"42040077"},'+
                   '{"id":666, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "compras":7000, "telefono":"1813181563"}]';

// Convertir la cadena a un array de objetos
const datos = JSON.parse(cadenaDatos);

// Crear un array de instancias de las clases
const objetosJerarquia = datos.map(item => {
  if ('ventas' in item) {
    return new Empleado(item.id, item.nombre, item.apellido, item.edad, item.sueldo, item.ventas);
  } else if ('compras' in item) {
    return new Cliente(item.id, item.nombre, item.apellido, item.edad, item.compras, item.telefono);
  } else {
    return new Persona(item.id, item.nombre, item.apellido, item.edad);
  }
});

//LOGICA DEL FORM DE DATOS
document.addEventListener("DOMContentLoaded", function () {
  const tableContainer = document.querySelector(".table-container");

  // Crear la tabla
  const table = document.createElement("table");
  table.classList.add("data-table");

  // Encabezados de la tabla
const headerRow = document.createElement("tr");
const columns = ["id", "nombre", "apellido", "edad", "ventas", "sueldo", "compras", "telefono"];

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
    row.classList.add(objeto instanceof Empleado ? "empleado" : "cliente");

    // Obtener propiedades del objeto
    const properties = ["id", "nombre", "apellido", "edad", "ventas", "sueldo", "compras", "telefono"];

    properties.forEach(prop => {
        const td = document.createElement("td");
        td.textContent = objeto[prop] || ""; // Manejar casos donde la propiedad no existe

        // Asignar clase a la celda según la columna
        td.classList.add(`col-${prop}`);
        
        row.appendChild(td);
    });

    table.appendChild(row);
});

  // Agregar la tabla al contenedor
  tableContainer.appendChild(table);

  // Seleccionar checkboxes por defecto
  const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
  checkboxes.forEach(checkbox => (checkbox.checked = true));
});

function filtrarListado() {
  const filtro = document.getElementById("filter").value;

  objetosJerarquia.forEach(objeto => {
    const row = document.querySelector(`.data-table .${objeto instanceof Empleado ? 'empleado' : 'cliente'}`);
    
    if (
      (filtro === 'todos') ||
      (filtro === 'empleado' && objeto instanceof Empleado && objeto.ventas > 0) ||
      (filtro === 'cliente' && objeto instanceof Cliente && objeto.compras > 0)
    ) {
      row.classList.remove('oculto');
    } else {
      row.classList.add('oculto');
    }
  });

  // Asegurarse de ocultar la categoría no seleccionada
  document.querySelectorAll('.data-table .cliente').forEach(row => {
    if (filtro === 'empleado') {
      row.classList.add('oculto');
    } else {
      row.classList.remove('oculto');
    }
  });

  document.querySelectorAll('.data-table .empleado').forEach(row => {
    if (filtro === 'cliente') {
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

function calcularEdad() {
  const filtro = document.getElementById("filter").value;
  let totalEdad = 0;
  let totalPersonas = 0;

  objetosJerarquia.forEach(objeto => {
    // Solo contar las personas que cumplen con el filtro
    if (
      (filtro === 'todos') ||
      (filtro === 'empleado' && objeto instanceof Empleado && objeto.ventas > 0) ||
      (filtro === 'cliente' && objeto instanceof Cliente && objeto.compras > 0)
    ) {
      totalEdad += objeto.edad;
      totalPersonas++;
    }
  });

  // Calcular el promedio de edad
  const promedioEdad = totalPersonas > 0 ? Math.round(totalEdad / totalPersonas) : 0;

  // Mostrar el resultado en el cuadro de texto
  const ageInput = document.getElementById("ageInput");
  ageInput.value = promedioEdad + " años";
}

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('#columnCheckboxes input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
          const columnId = this.dataset.column; // Obtén el valor del atributo data-column
          const cells = document.querySelectorAll(`.data-table .col-${columnId}`);
          
          cells.forEach(cell => {
              cell.style.display = this.checked ? 'table-cell' : 'none';
          });
      });
  });
});

//LOGICA DEL ABM

document.addEventListener("DOMContentLoaded", function () {
    const abmTypeSelect = document.getElementById("abm-type");
    const empleadoFields = ["sueldo", "ventas"];
    const clienteFields = ["compras", "telefono"];

    abmTypeSelect.addEventListener("change", function () {
        const selectedType = this.value;
        const allFields = ["sueldo", "ventas", "compras", "telefono"];

        // Oculta todos los campos primero
        allFields.forEach(field => {
            const fieldElement = document.getElementById(`abm-${field}`);
            if (fieldElement) {
                fieldElement.parentNode.style.display = "none";
            }
        });

        // Muestra los campos según el tipo seleccionado
        if (selectedType === "empleado") {
            empleadoFields.forEach(field => {
                const fieldElement = document.getElementById(`abm-${field}`);
                if (fieldElement) {
                    fieldElement.parentNode.style.display = "block";
                }
            });
        } else if (selectedType === "cliente") {
            clienteFields.forEach(field => {
                const fieldElement = document.getElementById(`abm-${field}`);
                if (fieldElement) {
                    fieldElement.parentNode.style.display = "block";
                }
            });
        }
    });
});

// Resto del código...



