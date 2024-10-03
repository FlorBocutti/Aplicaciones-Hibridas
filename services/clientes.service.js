import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");

//Obtiene todas los clientes de la base de datos que no han sido eliminados.Aplica filtro para el nombre.
async function getAllClientes(filtros = {}) {
  const filterMongo = { eliminado: { $ne: true } };
  if (filtros.nombre !== undefined) {
    filterMongo.$text = { $search: filtros.nombre };
  }
  await client.connect();
  return db.collection("clientes").find(filterMongo).toArray();
}

//Obtiene un cliente por su id desde la base de datos.Valida que el id sea válido.
async function getClienteId(id) {
  await client.connect();
  console.log("id recibido", id);

  if (!ObjectId.isValid(id)) {
    throw new Error("El ID no es válido");
  }
  const datos = await db
    .collection("clientes")
    .findOne({ _id: new ObjectId(id) });
  return datos;
}

//Agrega un nuevo cliente a la base de datos
async function agregarCliente(cliente) {
  await client.connect();
  await db.collection("clientes").insertOne(cliente);
  return cliente;
}

//Marca un cliente como eliminado en la base de datos, sin borrarlo físicamente
async function eliminarCliente(id) {
  await client.connect();
  await db.collection("clientes").updateOne(
    { _id: ObjectId.createFromHexString(id) },
    {
      $set: {
        eliminado: true,
      },
    }
  );
  return id;
}

//Reemplaza completamente un cliente existente por un cliente actualizado
const modificarCliente = async (id, clienteActualizado) => {
  await client.connect();
  await db
    .collection("clientes")
    .replaceOne({ _id: ObjectId.createFromHexString(id) }, clienteActualizado);
  return clienteActualizado;
};

//Actualiza solo algunos campos de un cliente en la base de datos
const actualizarCliente = async (id, clienteActualizado) => {
  await client.connect();
  await db
    .collection("clientes")
    .updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: clienteActualizado }
    );
  return clienteActualizado;
};

export {
  getClienteId,
  getAllClientes,
  agregarCliente,
  eliminarCliente,
  modificarCliente,
  actualizarCliente,
};
