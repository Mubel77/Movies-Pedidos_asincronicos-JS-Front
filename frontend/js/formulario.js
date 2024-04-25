window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId) {
        document.querySelectorAll(".botonAgregar").forEach(btn => {
            btn.style.display = "none";
        });

        fetch(`http://localhost:3031/api/movies/${movieId}`)
            .then(response => response.json())
            .then(movie => {
                let data = movie.data;
                document.getElementById("title").value = data.title;
                document.getElementById("rating").value = data.rating;
                document.getElementById("awards").value = data.awards;
                document.getElementById("release_date").value = data.release_date.split('T')[0];
                document.getElementById("length").value = data.length;

                //  botón de actualizar
                const updateButton = document.getElementById("botonModificar");
                updateButton.onclick = (e) => {
                    e.preventDefault();
                    const editMovie = {
                        title: document.getElementById("title").value,
                        rating: document.getElementById("rating").value,
                        awards: document.getElementById("awards").value,
                        release_date: document.getElementById("release_date").value,
                        length: document.getElementById("length").value
                    };

                    fetch(`http://localhost:3031/api/movies/update/${movieId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(editMovie)
                    })
                    .then((response) => response.json())
                    .then(movie => {
                        let data = movie.data;
                        if (data) {
                            window.location.href = "http://127.0.0.1:5500/frontend/home.html";
                        } else {
                            const msj = document.createElement("h1");
                            msj.textContent = "Cargando...";
                        }
                    })
                    .catch(error => console.error(error));
                };

                //  botón de ELIMINAR
                const destroyButton = document.getElementById("botonBorrar");
                destroyButton.onclick = (e) => {
                    e.preventDefault();
                    fetch(`http://localhost:3031/api/movies/delete/${movieId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                    .then((response) => {
                        if (response) {
                            window.location.href = "http://127.0.0.1:5500/frontend/home.html";
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                };
                

                })
            .catch(error => console.error(error));
    } else {
        document.querySelectorAll(".botonModificar, .botonBorrar").forEach(btn => {
            btn.style.display = "none";
        });
          //  botón de CREAR
          const createButton = document.getElementById("botonAgregar");
          createButton.onclick = (e) => {
              e.preventDefault();
              const CreateMovie = {
                  title: document.getElementById("title").value,
                  rating: document.getElementById("rating").value,
                  awards: document.getElementById("awards").value,
                  release_date: document.getElementById("release_date").value,
                  length: document.getElementById("length").value
              };

              fetch(`http://localhost:3031/api/movies/create`, {
                  method: 'POST',
                  headers: {
                      'Content-type': 'application/json'
                  },
                  body: JSON.stringify(CreateMovie)
              })
              .then((response) => response.json())
              .then(movie => {
                  let data = movie.data;
                  console.log(movie);
                  if (data) {
                      window.location.href = "http://127.0.0.1:5500/frontend/home.html";
                  } else {
                      const msj = document.createElement("h1");
                      msj.textContent = "Cargando...";
                  }
              })
              .catch(error => console.error(error));
          };
    }
}
