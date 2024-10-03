import express from "express";
import * as controllerReceta from "../controllers/recetasController.js";

const route = express.Router();

//Rutas para manejar solicitudes
route.get("/", controllerReceta.getAllRecetas);
route.get("/recetas", controllerReceta.getAllRecetas);
route.get("/recetas/nuevo", controllerReceta.nuevaReceta);
route.post("/recetas/nuevo", controllerReceta.agregarReceta);
route.get("/recetas/eliminar/:id", controllerReceta.eliminarReceta);
route.get("/recetas/modificar/:id", controllerReceta.modificarRecetaForm);
route.post("/recetas/modificar/:id", controllerReceta.modificarReceta);

route.get("/recetas/:id", controllerReceta.getRecetaId);

route.get(
  "/comida-argentina",
  controllerReceta.getRecetasPorCategoria("Argentina")
);
route.get("/comida-china", controllerReceta.getRecetasPorCategoria("China"));
route.get(
  "/comida-mexicana",
  controllerReceta.getRecetasPorCategoria("Mexicana")
);
route.get(
  "/comida-peruana",
  controllerReceta.getRecetasPorCategoria("Peruana")
);
route.get(
  "/comida-francesa",
  controllerReceta.getRecetasPorCategoria("Francesa")
);

export default route;
