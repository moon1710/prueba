/**
 * Modal para agregar un nuevo empleado
 */
async function modalRegistrarEmpleado() {
  try {
    // Ocultar la modal si está abierta
    const existingModal = document.getElementById("detalleEmpleadoModal");
    if (existingModal) {
      const modal = bootstrap.Modal.getInstance(existingModal);
      if (modal) {
        modal.hide();
      }
      existingModal.remove(); // Eliminar la modal existente
    }

    const response = await fetch("modales/modalAdd.php");

    if (!response.ok) {
      throw new Error("Error al cargar la modal");
    }

    // response.text() es un método en programación que se utiliza para obtener el contenido de texto de una respuesta HTTP
    const data = await response.text();

    // Crear un elemento div para almacenar el contenido de la modal
    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = data;

    // Agregar la modal al documento actual
    document.body.appendChild(modalContainer);

    // Mostrar la modal
    const myModal = new bootstrap.Modal(
      modalContainer.querySelector("#agregarEmpleadoModal")
    );
    myModal.show();
  } catch (error) {
    console.error(error);
  }
}

/**
 * Función para enviar el formulario al backend
 */
async function registrarEmpleado(event) {
  try {
    event.preventDefault(); // Evitar que la página se recargue

    const formulario = document.querySelector("#formularioEmpleado");

    // Validar que los campos no estén vacíos
    const nombre = formulario.querySelector("[name='nombre']").value.trim();
    const edad = formulario.querySelector("[name='edad']").value.trim();
    const cedula = formulario.querySelector("[name='cedula']").value.trim();
    const sexo = formulario.querySelector("[name='sexo']").value.trim();
    const telefono = formulario.querySelector("[name='telefono']").value.trim();
    const cargo = formulario.querySelector("[name='cargo']").value.trim();

    if (!nombre || !edad || !cedula || !sexo || !telefono || !cargo) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Validar que la edad sea un número válido
    if (isNaN(edad) || edad <= 0) {
      alert("Por favor, ingresa una edad válida.");
      return;
    }

    // Validar que la cédula sea solo numérica
    if (isNaN(cedula)) {
      alert("La cédula debe ser un número.");
      return;
    }

    // Validar que el teléfono tenga un formato adecuado (solo números y al menos 10 dígitos)
    if (!/^\d{10}$/.test(telefono)) {
      alert("El teléfono debe tener al menos 10 dígitos.");
      return;
    }

    // Crear un objeto FormData para enviar los datos del formulario
    const formData = new FormData(formulario);
    console.log([...formData.entries()]); // Esto imprimirá los datos del formulario en la consola


    // Enviar los datos del formulario al backend usando Axios
    const response = await axios.post("acciones/acciones.php", formData);

    if (response.status === 200) {
      window.insertEmpleadoTable();

      setTimeout(() => {
        $("#agregarEmpleadoModal").css("opacity", "");
        $("#agregarEmpleadoModal").modal("hide");

        // Mostrar un mensaje de éxito
        toastr.success("¡El empleado se registró correctamente!");
      }, 600);
    } else {
      console.error("Error al registrar el empleado");
    }
  } catch (error) {
    console.error("Error al enviar el formulario", error);
  }
}

