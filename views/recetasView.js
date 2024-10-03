// Crea un listado de recetas
export function crearListadoRecetas(recetas) {
  let html = "";
  html += "<a href='/recetas/nuevo' class='add-recipe'>Agregar receta</a>";
  html += "<h1>Recetas</h1>";

  if (recetas.length === 0) {
    html += "<div class='empty-message'>No hay recetas disponibles</div>";
  } else {
    html += "<div class='card-container'>";
    recetas.forEach((receta) => {
      html += `
        <div class="card">
        <h2>${receta.titulo}</h2>
        <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
        <p><strong>Puntuación:</strong> ${receta.puntuacion}</p>
        <p><strong>Categoría:</strong> ${receta.categoria}</p>
        <p><strong>Descripción:</strong> ${receta.descripcion}</p>
        <div class="button-container"> <!-- Contenedor para los botones de ver, modificar y eliminar -->
            <a href='/recetas/${receta._id}' class='ver-mas'>Ver más</a>
            <a href='/recetas/modificar/${receta._id}' class='modificar'>Modificar</a>
            <a href='/recetas/eliminar/${receta._id}' class='eliminar'>Eliminar</a>
        </div>
        </div>
    `;
    });
    html += "</div>";
  }
  return html;
}

//Crea una página
export function crearPagina(titulo, contenido) {
  let html = `
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titulo}</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <nav>
            <ul>
                <div class="menu-left">
                    <li><a href="/">Sabores a la Carta</a></li>
                </div>
                <div class="menu-right">
                    <li><a href="/comida-argentina">Comida Argentina</a></li>
                    <li><a href="/comida-china">Comida China</a></li>
                    <li><a href="/comida-mexicana">Comida Mexicana</a></li>
                    <li><a href="/comida-peruana">Comida Peruana</a></li>
                    <li><a href="/comida-francesa">Comida Francesa</a></li>
                </div>
            </ul>
        </nav>
        <div class="banner">
            <img src="/img/banner3.jpg" alt="Banner de recetas">
            <h2>Bienvenidos a la mejor colección de recetas internacionales</h2>
        </div>
        ${contenido}
        <footer>
            <p>Sabores a la Carta</p>
            <p>Todos los derechos reservados © 2024</p>  
        </footer>
</html>
`;
  return html;
}

//Crea un detalle de la receta
export function crearDetalleReceta(receta) {
  let html = `
<div class="detail-card">
    <h1>${receta.titulo}</h1>
    <img src="../img/${receta.imgen}" alt="Imagen de la receta">
    <p><strong>ID:</strong> ${receta._id}</p>
    <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
    <p><strong>Puntuación:</strong> ${receta.puntuacion}</p>
    <p><strong>Categoría:</strong> ${receta.categoria}</p>
    <p><strong>Descripción:</strong> ${receta.descripcion}</p>
    <a href="/recetas">Atrás</a>
</div>
`;
  return html;
}
//Crea una nueva receta
export function nuevaReceta() {
  let html = `
    <div class="form-container">
    <h1>Agregar Nueva Receta</h1>
    <form action='/recetas/nuevo' method='post'>
        <label for='titulo'>Título</label>
        <input type='text' name='titulo' required>

        <label for='ingredientes'>Ingredientes</label>
        <input type='text' name='ingredientes' required>

        <label for='puntuacion'>Puntuación</label>
        <input type='number' name='puntuacion' required>

        <label for='categoria'>Categoría</label>
        <input type='text' name='categoria' required>

        <label for='descripcion'>Descripción</label>
        <input type='text' name='descripcion' required>

        <button type='submit'>Agregar</button>
    </form>
    </div>
`;
  return html;
}

//Modifica la receta
export function modificarForm(receta) {
  let html = `
    <div class="form-container">
    <h1>Modificar Receta</h1>
    <form action='/recetas/modificar/${receta._id}' method='post'>
        <label for='titulo'>Título</label>
        <input type='text' name='titulo' value="${receta.titulo}" required>

        <label for='ingredientes'>Ingredientes</label>
        <input type='text' name='ingredientes' value="${receta.ingredientes}" required>

        <label for='puntuacion'>Puntuación</label>
        <input type='number' name='puntuacion' value="${receta.puntuacion}" required>

        <label for='categoria'>Categoría</label>
        <input type='text' name='categoria' value="${receta.categoria}" required>

        <label for='descripcion'>Descripción</label>
        <input type='text' name='descripcion' value="${receta.descripcion}" required>

        <button type='submit'>Modificar</button>
    </form>
    <a href='/recetas' class='back-button'>← Regresar a la página anterior sin modificar</a>
    </div>
`;
  return html;
}
