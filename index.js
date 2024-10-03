import express from "express";
import recetasRoutes from "./routes/recetas.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import apiRecetasRoute from "./api/routes/recetas.Routes.js";
import apiClientesRoute from "./api/routes/clientes.routes.js";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRecetasRoute);
app.use("/api", apiClientesRoute);
app.use(recetasRoutes);
app.use(clientesRoutes);

app.listen(3333, () => console.log("Servidor funcionando"));
