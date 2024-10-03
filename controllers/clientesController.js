import * as clientesService from "../services/clientes.service.js";

//Obtiene y muestra todos los clientes
const getAllClientes = (req, res) => {
  clientesService.getAllClientes().then((clientes) => {
    res.send(
      clientesView.crearPagina(
        "Listado de clientes",
        clientesView.crearListadoClientes(clientes)
      )
    );
  });
};

//Obtiene y muestra los detalles de un cliente por su id
const getClienteId = (req, res) => {
  console.log(req.params.id);
  clientesService
    .getClienteId(req.params.id)
    .then((cliente) =>
      res.send(
        clientesView.crearPagina(
          "Detalle del Cliente",
          clientesView.crearDetalleCliente(cliente)
        )
      )
    )
    .catch((error) => {
      console.log("Error:", error);
      res.status(400).send("Error al obtener el cliente");
    });
};

//Crear un nuevo cliente
const nuevoCliente = (req, res) => {
  res.send(
    clientesView.crearPagina("Nuevo Cliente", clientesView.nuevoCliente())
  );
};

//Agregar un nuevo cliente
const agregarCliente = (req, res) => {
  clientesService
    .agregarCliente(req.body)
    .then(() => {
      res.redirect("/clientes");
    })
    .catch((err) =>
      res.send(
        clientesView.crearPagina("Error al agregar un cliente", `<p>${err}</p>`)
      )
    );
};

//Elimina un cliente
const eliminarCliente = (req, res) => {
  clientesService
    .eliminarCliente(req.params.id)
    .then((id) => res.redirect("/clientes"))
    .catch((err) =>
      res.send(
        clientesView.crearPagina(
          "Error al eliminar un cliente",
          `<p>${err}</p>`
        )
      )
    );
};

//Modifica un cliente
const modificarClienteForm = (req, res) => {
  const idCliente = req.params.id;
  clientesService
    .getClienteId(idCliente)
    .then((cliente) =>
      res.send(
        clientesView.crearPagina(
          "Modificar Cliente",
          clientesView.modificarForm(cliente)
        )
      )
    )
    .catch((err) =>
      res.send(
        clientesView.crearPagina(
          "Error al modificar un cliente",
          `<p>${err}</p>`
        )
      )
    );
};
//Modifica un cliente
export const modificarCliente = (req, res) => {
  const idCliente = req.params.id;
  clientesService
    .modificarCliente(idCliente, req.body)
    .then(() => res.redirect("/clientes"));
};

export {
  getClienteId,
  getAllClientes,
  nuevoCliente,
  agregarCliente,
  eliminarCliente,
  modificarClienteForm,
};
