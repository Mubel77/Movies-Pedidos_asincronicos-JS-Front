window.onload = () => {
  const app = document.getElementById("root");

  // Botón de películas favoritas
  const favButton = document.createElement("button");
  favButton.textContent = "Mis películas favoritas";
  favButton.style.position = "absolute";
  favButton.style.top = "106px";
  favButton.style.left = "83.5%";
  favButton.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/frontend/favoritas.html";
  });
  app.appendChild(favButton);

  //  películas favoritas en localStorage
  let favoritos = localStorage.getItem('favoritos');
  favoritos = favoritos ? JSON.parse(favoritos) : {};

  // Fetch para obtener las películas
  fetch('http://localhost:3031/api/movies')
  .then((response) => response.json())
  .then((movies) => {
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    app.appendChild(container);

    let data = movies.data;
    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      // Icono de estrella
      const starIcon = document.createElement("i");
      starIcon.classList.add("far", "fa-star");
      if (favoritos[movie.id]) {
        starIcon.classList.add("fas");
      }
      // evento estrella 
      starIcon.addEventListener("click", () => {
        if (starIcon.classList.contains("fas")) {
          delete favoritos[movie.id];
          starIcon.classList.remove("fas");
          starIcon.classList.add("far");
        } else {
          favoritos[movie.id] = movie;
          starIcon.classList.remove("far");
          starIcon.classList.add("fas");
        }
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
      });
      // Botón del detalle
      const detailButton = document.createElement("button");
      detailButton.textContent = "View Detail";
      detailButton.addEventListener("click", () => {
        const detailURL = `http://127.0.0.1:5500/frontend/formulario.html?id=${movie.id}`;
        window.location.href = detailURL;
      });

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Género: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(starIcon);
      card.appendChild(detailButton);
    });

    // Botón de creación
    const addButton = document.createElement("button");
    addButton.textContent = "Add Movie";
    addButton.style.position = "absolute";
    addButton.style.top = "106px";
    addButton.addEventListener("click", () => {
      const createURL = `http://127.0.0.1:5500/frontend/formulario.html`;
      window.location.href = createURL;
    });
    app.appendChild(addButton);
  })
  .catch(error => console.error('Error al obtener la lista de películas:', error));
}
