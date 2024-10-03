import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");

//Obtiene todas las recetas de la base de datos que no han sido eliminadas, aplicando filtros como categoría, puntuación y título.
async function getAllRecetas(filtros = {}) {
  const filterMongo = { eliminado: { $ne: true } };
  if (filtros.categoria !== undefined) {
    filterMongo.categoria = { $eq: filtros.categoria };
  }
  if (filtros.mayorPuntuacion !== undefined) {
    filterMongo.puntuacion = { $gt: parseInt(filtros.mayorPuntuacion) };
  }
  if (filtros.titulo !== undefined) {
    filterMongo.$text = { $search: filtros.titulo };
  }
  await client.connect();
  return db.collection("recetario").find(filterMongo).toArray();
}

//Obtiene una receta por su id desde la base de datos.Valida que el id sea válido.
async function getRecetaId(id) {
  await client.connect();
  console.log("id recibido", id);

  if (!ObjectId.isValid(id)) {
    throw new Error("El ID no es válido");
  }

  const datos = await db
    .collection("recetario")
    .findOne({ _id: new ObjectId(id) });
  return datos;
}

//Agrega una nueva receta a la base de datos
async function agregarReceta(receta) {
  await client.connect();
  await db.collection("recetario").insertOne(receta);
  return receta;
}

//Marca una receta como eliminada en la base de datos, sin borrarla físicamente
async function eliminarReceta(id) {
  await client.connect();
  await db.collection("recetario").updateOne(
    { _id: ObjectId.createFromHexString(id) },
    {
      $set: {
        eliminado: true,
      },
    }
  );
  return id;
}

//Reemplaza completamente una receta existente por una receta actualizada
const modificarReceta = async (id, recetaActualizada) => {
  await client.connect();
  await db
    .collection("recetario")
    .replaceOne({ _id: ObjectId.createFromHexString(id) }, recetaActualizada);
  return recetaActualizada;
};

//Actualiza algunos campos de una receta en la base de datos.
const actualizarReceta = async (id, recetaActualizada) => {
  await client.connect();
  await db
    .collection("recetario")
    .updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: recetaActualizada }
    );
  return recetaActualizada;
};

export {
  getRecetaId,
  getAllRecetas,
  agregarReceta,
  eliminarReceta,
  modificarReceta,
  actualizarReceta,
};
