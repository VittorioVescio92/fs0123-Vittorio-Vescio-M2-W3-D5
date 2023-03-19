const link = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MWY1ZWY4MWI0MjAwMTM5YjI3YmUiLCJpYXQiOjE2NzkwNDAzNTAsImV4cCI6MTY4MDI0OTk1MH0.Yl7PW8LE626yNQJ-rRpCeSlXZRL-6GBhLy1vFcVkMU0";

const header = document.querySelector("header");
header.innerHTML = `
    <div class="d-flex justify-content-center">
      <div class="spinner-border fs-2 my-5" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>
    </div>    
    
  `;

const removeSpinner = () => {
  const spinner = document.querySelector(".spinner-border");
  spinner.parentElement.removeChild(spinner);
};

window.onload = () => {
  fetch(link, {
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then(responseObj => responseObj.json())
    .then(products => {
      const rowDiv = document.getElementById("row");
      products.forEach(product => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("col");
        rowDiv.appendChild(cardDiv);
        cardDiv.innerHTML = `
        <div class="card shadow-lg bg-light mt-2">
        <img class="img" src="${product.imageUrl}" alt="article image"/>
          <div style="height:50%" class="card-body p-3 d-grid align-content-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.brand}</p>
            <p class="card-text fs-4">${product.price} €</p>
            <div class="container-fluid p-0 d-flex justify-content-between align-self-end">
              <a href="object.html?id=${product._id}" class="btn btn-primary me-1">Scopri di più</a>
              <a href="backoffice.html?id=${product._id}" class="btn btn-warning">Modifica</a>
            </div>
          </div>
        </div>
      `;
      });
      removeSpinner();
      const footer = document.getElementById("footer");
      footer.innerHTML = `<p class="ms-3">Made with &hearts; by Vittorio Vescio</p>`;
    })
    .catch(error => console.error(error));
};
