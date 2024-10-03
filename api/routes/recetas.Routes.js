import { Router } from "express";
import * as controller from "../controllers/recetasController.js";

const route = Router();

//Rutas para manejar solicitudes
route.get("/recetas", controller.getAllRecetas);
route.get("/recetas/:id", controller.getRecetaId);
route.post("/recetas", controller.agregarReceta);
route.put("/recetas/:id", controller.reemplazarReceta);
route.patch("/recetas/:id", controller.actualizarReceta);
route.delete("/recetas/:id", controller.borrarReceta);

export default route;
