import * as service from "../../services/recetas.service.js";

//Obtiene todas las recetas
function getAllRecetas(req, res) {
  console.log("Filtros", req.query);
  const filtros = req.query;
  service
    .getAllRecetas(filtros)
    .then((recetas) => res.status(200).json(recetas));
}

//Agrega una nueva receta
function agregarReceta(req, res) {
  service
    .agregarReceta(req.body)
    .then((receta) => res.status(201).json(receta));
}

//Obtiene una receta por su id
function getRecetaId(req, res) {
  const id = req.params.id;
  service.getRecetaId(id).then((receta) => res.status(200).json(receta));
}

//Reemplaza los datos de una receta existente
function reemplazarReceta(req, res) {
  const id = req.params.id;
  service
    .modificarReceta(id, req.body)
    .then((receta) => res.status(201).json(receta));
}

//Actualiza parcialmente los datos de una receta
function actualizarReceta(req, res) {
  const id = req.params.id;
  service.actualizarReceta(id, req.body).then((receta) => {
    if (receta) {
      res.status(201).json(receta);
    } else {
      res
        .status(404)
        .json({ error: { message: "No se ha encontrado la receta" } });
    }
  });
}

//Elimina una receta por su id
function borrarReceta(req, res) {
  const id = req.params.id;
  service.eliminarReceta(id).then((id) => res.status(202).json({ id: id }));
}

//Exporta las funciones
export {
  getAllRecetas,
  getRecetaId,
  agregarReceta,
  reemplazarReceta,
  actualizarReceta,
  borrarReceta,
};
