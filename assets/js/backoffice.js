const link = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MWY1ZWY4MWI0MjAwMTM5YjI3YmUiLCJpYXQiOjE2NzkwNDAzNTAsImV4cCI6MTY4MDI0OTk1MH0.Yl7PW8LE626yNQJ-rRpCeSlXZRL-6GBhLy1vFcVkMU0";

const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

const endpoint = selectedId ? link + selectedId : link;
const method = selectedId ? "PUT" : "POST";

window.onload = () => {
  if (selectedId) {
    document.getElementById("editTitle").innerText = "Modifica";
    document.getElementById("submit").classList.add("d-none");
    document.getElementById("editItem").classList.remove("d-none");
    document.getElementById("deleteItem").classList.remove("d-none");
    document.getElementById("reset").classList.add("d-none");

    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const { name, description, brand, imageUrl, price } = data;
        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("imageUrl").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const startProcess = event => {
  event.preventDefault();

  const article = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  fetch(endpoint, {
    method: method,
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  })
    .then(() => {
      if (!selectedId) {
        document.getElementById("name").value = "";
        document.getElementById("description").value = "";
        document.getElementById("brand").value = "";
        document.getElementById("imageUrl").value = "";
        document.getElementById("price").value = "";
      } else {
        window.location.href = "index.html";
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const DeleteItem = () => {
  const hasAccepted = confirm("Vuoi eliminare l'articolo?");
  if (hasAccepted) {
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    })
      .then(res => {
        if (res.ok) {
          alert("Articolo eliminato con successo");
          window.location.href = "index.html";
        } else {
          throw new Error("Errore durante l'eliminazione dell'articolo");
        }
      })
      .catch(err => {
        console.log(err);
        alert("Si è verificato un errore durante l'eliminazione dell'articolo");
      });
  }
};

//const myPassword = "epicode";

// function checkPassword() {
//   const password = document.getElementById("password").value;
//   if (password === myPassword) {
//     window.location.href = "backoffice.html";
//   } else {
//     document.getElementById("message").innerHTML = "Password errata! Non hai i permessi per accedere alla pagina";
//   }
// }
