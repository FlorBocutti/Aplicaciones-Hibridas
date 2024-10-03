import * as service from "../../services/clientes.service.js";

//Obtiene todos los clientes
function getAllClientes(req, res) {
  console.log("Filtros", req.query);
  const filtros = req.query;
  service
    .getAllClientes(filtros)
    .then((clientes) => res.status(200).json(clientes));
}

//Agrega un nuevo cliente
function agregarCliente(req, res) {
  service
    .agregarCliente(req.body)
    .then((cliente) => res.status(201).json(cliente));
}

//Obtiene un cliente por su id
function getClienteId(req, res) {
  const id = req.params.id;
  service.getClienteId(id).then((cliente) => res.status(200).json(cliente));
}

//Reemplaza los datos de un cliente existente
function reemplazarCliente(req, res) {
  const id = req.params.id;
  service
    .modificarCliente(id, req.body)
    .then((cliente) => res.status(201).json(cliente));
}

//Actualiza parcialmente los datos de un cliente
function actualizarCliente(req, res) {
  const id = req.params.id;
  service.actualizarCliente(id, req.body).then((cliente) => {
    if (cliente) {
      res.status(201).json(cliente);
    } else {
      res
        .status(404)
        .json({ error: { message: "No se ha encontrado el cliente" } });
    }
  });
}

//Elimina un cliente por su id
function borrarCliente(req, res) {
  const id = req.params.id;
  service.eliminarCliente(id).then((id) => res.status(202).json({ id: id }));
}

//Exporta las funciones
export {
  getAllClientes,
  getClienteId,
  agregarCliente,
  reemplazarCliente,
  actualizarCliente,
  borrarCliente,
};
