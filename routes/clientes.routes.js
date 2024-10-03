import express from "express";
import * as controllerCliente from "../controllers/clientesController.js";

const route = express.Router();

//Rutas para manejar solicitudes
route.get("/", controllerCliente.getAllClientes);
route.get("/clientes", controllerCliente.getAllClientes);
route.get("/clientes/nuevo", controllerCliente.nuevoCliente);
route.post("/clientes/nuevo", controllerCliente.agregarCliente);
route.get("/clientes/eliminar/:id", controllerCliente.eliminarCliente);
route.get("/clientes/modificar/:id", controllerCliente.modificarClienteForm);
route.post("/clientes/modificar/:id", controllerCliente.modificarCliente);
route.get("/clientes/:id", controllerCliente.getClienteId);

export default route;
