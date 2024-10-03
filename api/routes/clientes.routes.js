import { Router } from "express";
import * as controller from "../controllers/clientesController.js";

const route = Router();

//Rutas para manejar solicitudes
route.get("/clientes", controller.getAllClientes);
route.get("/clientes/:id", controller.getClienteId);
route.post("/clientes", controller.agregarCliente);
route.put("/clientes/:id", controller.reemplazarCliente);
route.patch("/clientes/:id", controller.actualizarCliente);
route.delete("/clientes/:id", controller.borrarCliente);

export default route;
