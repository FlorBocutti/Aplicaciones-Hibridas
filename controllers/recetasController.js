import * as recetasService from "../services/recetas.service.js";
import * as recetasView from "../views/recetasView.js";

//Obtiene y muestra todas las recetas
const getAllRecetas = (req, res) => {
  recetasService.getAllRecetas().then((recetas) => {
    res.send(
      recetasView.crearPagina(
        "Listado de recetas",
        recetasView.crearListadoRecetas(recetas)
      )
    );
  });
};

//Obtiene y muestra los detalles de una receta por su id
const getRecetaId = (req, res) => {
  console.log(req.params.id);
  recetasService
    .getRecetaId(req.params.id)
    .then((recetas) =>
      res.send(
        recetasView.crearPagina(
          "detalle",
          recetasView.crearDetalleReceta(recetas)
        )
      )
    )
    .catch((error) => {
      console.log("Error:", error);
      res.status(400).send("Error al obtener la receta");
    });
};

//Crear una nueva receta
const nuevaReceta = (req, res) => {
  res.send(recetasView.crearPagina("Nueva receta", recetasView.nuevaReceta()));
};

//Agrega una nueva receta
const agregarReceta = (req, res) => {
  recetasService
    .agregarReceta(req.body)
    .then(() => {
      res.redirect("/recetas");
    })
    .catch((err) =>
      res.send(
        recetasView.crearPagina("Error Al agregar una receta", `<p>${err}</p>`)
      )
    );
};

//Elimina una receta
const eliminarReceta = (req, res) => {
  recetasService
    .eliminarReceta(req.params.id)
    .then((id) => res.redirect("/recetas"))
    .catch((err) =>
      res.send(
        recetasView.crearPagina("Error Al eliminar una receta", `<p>${err}</p>`)
      )
    );
};

//Modifica una receta
const modificarRecetaForm = (req, res) => {
  const idReceta = req.params.id;
  recetasService
    .getRecetaId(idReceta)
    .then((receta) =>
      res.send(
        recetasView.crearPagina(
          "Modificar Receta",
          recetasView.modificarForm(receta)
        )
      )
    )
    .catch((err) =>
      res.send(
        recetasView.crearPagina(
          "Error Al modificar una receta",
          `<p>${err}</p>`
        )
      )
    );
};

//Modifica una receta
export const modificarReceta = (req, res) => {
  const idReceta = req.params.id;
  recetasService
    .modificarReceta(idReceta, req.body)
    .then(() => res.redirect("/recetas"));
};

//Muestra la página de inicio
export const getInicio = (req, res) => {
  res.send(recetasView.crearPagina("Inicio - Comidas", recetasView.inicio()));
};

//Obtiene las recetas por categoría y muestra la lista
export const getRecetasPorCategoria = (categoria) => {
  return (req, res) => {
    recetasService
      .getAllRecetas({ categoria })
      .then((recetas) => {
        res.send(
          recetasView.crearPagina(
            `${
              categoria.charAt(0).toUpperCase() + categoria.slice(1)
            } - Recetas`,
            recetasView.crearListadoRecetas(recetas)
          )
        );
      })
      .catch((error) => {
        console.log("Error:", error);
        res.status(400).send("Error al obtener las recetas");
      });
  };
};

export {
  getRecetaId,
  getAllRecetas,
  nuevaReceta,
  agregarReceta,
  eliminarReceta,
  modificarRecetaForm,
};
