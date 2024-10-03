import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb://localhost:27017");

cliente
  .connect()
  .then(async () => {
    console.log("Me Conecte!");
    const db = cliente.db("AH20232CP1");

    const datos = await db.collection("recetario").find().toArray();
    console.log(datos);

    const baseClientes = await db.collection("clientes").find().toArray();
    console.log(baseClientes);
  })
  .catch(() => console.log("No me pude conectar"));
