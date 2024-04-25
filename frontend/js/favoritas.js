window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // obtener las películas favoritas del localStorage
  let favoritos = localStorage.getItem('favoritos');
  favoritos = favoritos ? JSON.parse(favoritos) : {};

  if (Object.keys(favoritos).length == 0) {
    const message = document.createElement("p");
    message.textContent = "No hay estrellas en ninguna pelicula";
    container.appendChild(message);
    return; 
  }

  Object.values(favoritos).forEach((movie) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const h1 = document.createElement("h1");
    h1.textContent = movie.title;

    const p = document.createElement("p");
    p.textContent = `Rating: ${movie.rating}`;

    const duracion = document.createElement("p");
    duracion.textContent = `Duración: ${movie.length}`;

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p);
    if (movie.genre !== null) {
      const genero = document.createElement("p");
      genero.textContent = `Género: ${movie.genre.name}`;
      card.appendChild(genero);
    }
    card.appendChild(duracion);
  });
    // Botón de volvel al home
    const backHomeButton = document.createElement("button");
    backHomeButton.textContent = "back Home";
    backHomeButton.style.position = "absolute";
    backHomeButton.style.top = "106px";
    backHomeButton.addEventListener("click", () => {
      const createURL = `http://127.0.0.1:5500/frontend/home.html`;
      window.location.href = createURL;
    });
    app.appendChild( backHomeButton );
};
