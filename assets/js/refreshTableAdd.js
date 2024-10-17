window.insertEmpleadoTable = async function () {
  try {
    const response = await axios.get(`acciones/getUltimoEmpleado.php`);

    // Verificar si los datos llegan correctamente
    console.log(response.data);

    if (response.status === 200) {
      const infoEmpleado = response.data;

      // Obtener el body de la tabla
      let tableBody = document.querySelector("#table_empleados tbody");

      // Eliminar la fila si ya existe
      let existingRow = document.getElementById(`empleado_${infoEmpleado.id}`);
      if (existingRow) {
        tableBody.removeChild(existingRow);
      }

      // Crear la nueva fila del empleado
      let tr = document.createElement("tr");
      tr.id = `empleado_${infoEmpleado.id}`;
      tr.innerHTML = `
        <th scope="row">${infoEmpleado.id}</th>
        <td>${infoEmpleado.nombre}</td>
        <td>${infoEmpleado.edad}</td>
        <td>${infoEmpleado.cedula}</td>
        <td>${infoEmpleado.cargo}</td>
        <td>
          <img class="rounded-circle" src="acciones/fotos_empleados/${infoEmpleado.avatar || "sin-foto.jpg"}" alt="${infoEmpleado.nombre}" width="50" height="50">
        </td>
        <td>
          <a href="#" onclick="verDetallesEmpleado(${infoEmpleado.id})" class="btn btn-success"><i class="bi bi-binoculars"></i></a>
          <a href="#" onclick="editarEmpleado(${infoEmpleado.id})" class="btn btn-warning"><i class="bi bi-pencil-square"></i></a>
          <a href="#" onclick="eliminarEmpleado(${infoEmpleado.id}, '${infoEmpleado.avatar || ""}')" class="btn btn-danger"><i class="bi bi-trash"></i></a>
        </td>
      `;

      // Añadir la nueva fila a la tabla
      tableBody.appendChild(tr);
    }
  } catch (error) {
    console.error("Error al obtener la información del empleado", error);
  }
};
