fetch("http://localhost:3000/api/teddies")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (values) {
    const main = document.getElementById("main");
    for (value of values) {
      console.log(value);
      const article = document.createElement("article");
      // Titre
      const h2 = document.createElement("h2");
      h2.textContent = value.name;
      article.appendChild(h2);
      // Image
      const img = document.createElement("img");
      img.src = value.imageUrl;
      img.classList.add("teddy-image");
      article.appendChild(img);

      // Description
      const description = document.createElement("p");
      description.classList.add("description");
      description.textContent = "Description: " + value.description;
      article.appendChild(description);
      // Prix
      const price = document.createElement("p");
      price.classList.add("price");
      price.textContent = "Prix: " + value.price / 100 + " €";
      article.appendChild(price);
      main.appendChild(article);
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
    console.error(err);
  });
