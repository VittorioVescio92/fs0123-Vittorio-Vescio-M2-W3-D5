const link = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MWY1ZWY4MWI0MjAwMTM5YjI3YmUiLCJpYXQiOjE2NzkwNDAzNTAsImV4cCI6MTY4MDI0OTk1MH0.Yl7PW8LE626yNQJ-rRpCeSlXZRL-6GBhLy1vFcVkMU0";

const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

const endpoint = selectedId ? link + selectedId : link;
const method = selectedId ? "PUT" : "POST";

window.onload = () => {
  fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      const prodotto = data;

      const rowDiv = document.getElementById("row");
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("col");
      cardDiv.innerHTML = `
        <div class="card shadow-sm bg-light mt-4">
          <img src="${prodotto.imageUrl}" alt="article image" />
          <div class="card-body">
            <h5 class="card-title">${prodotto.name}</h5>
            <p class="card-text">${prodotto.brand}</p>
            <p class="card-text">${prodotto.description}</p>
            <p class="card-text">${prodotto.price} €</p>
            <div class="d-flex justify-content-between">
              <a href="backoffice.html?id=${prodotto._id}" class="btn btn-warning">Modifica Articolo</a>
            </div>
          </div>
        </div>
      `;
      rowDiv.appendChild(cardDiv);
    })
    .catch(err => {
      console.log(err);
    });
};
