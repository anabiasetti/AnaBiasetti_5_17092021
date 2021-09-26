function displayProductCard(teddy, row) {
  console.log(teddy);
  // Colonnes (Col) Bootstrap
  const divCol = document.createElement("div");
  divCol.classList.add("col-12");
  divCol.classList.add("col-lg-6");
  row.appendChild(divCol);
  // Card Bootstrap
  const divCard = document.createElement("div");
  divCard.classList.add("card");
  divCol.appendChild(divCard);
  // Image
  const img = document.createElement("img");
  img.src = teddy.imageUrl;
  img.classList.add("card-img-top");
  img.classList.add("teddy-image");
  img.alt = teddy.name;
  divCard.appendChild(img);
  // CardBody Bootstrap
  const divCardBody = document.createElement("div");
  divCardBody.classList.add("card-body");
  divCard.appendChild(divCardBody);
  // Titre nom du teddy
  const h2 = document.createElement("h2");
  h2.textContent = teddy.name;
  h2.classList.add("card-title");
  divCardBody.appendChild(h2);
  // Description
  const description = document.createElement("p");
  description.classList.add("card-text");
  description.classList.add("description");
  description.textContent = "Description: " + teddy.description;
  divCardBody.appendChild(description);
  // Prix
  const price = document.createElement("p");
  price.classList.add("card-text");
  price.classList.add("price");
  price.textContent = teddy.price / 100 + " €";
  divCardBody.appendChild(price);
}

fetch("http://localhost:3000/api/teddies")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (teddies) {
    const main = document.getElementById("main");
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    main.appendChild(divContainer);
    const groupsOfTeddies = [];
    for (teddyIndex in teddies) {
      const currentTeddy = teddies[teddyIndex];
      // verifier si l'indice est pair
      if (teddyIndex % 2 === 0) {
        // Ajoute d'une nouvelle groupe contenant le teddy à groupsOfTeddies
        const groupToAdd = [];
        const teddyToAdd = currentTeddy;
        groupToAdd.push(teddyToAdd);
        groupsOfTeddies.push(groupToAdd);
      } else {
        // Ajoute d'un teddy au dernièr groupe
        const lastGroup = groupsOfTeddies[groupsOfTeddies.length - 1];
        lastGroup.push(currentTeddy);
      }
    }
    for (group of groupsOfTeddies) {
      // Creation d'une row pour chaque groupe de teddies
      const row = document.createElement("div");
      row.classList.add("row");
      row.classList.add("justify-content-center");
      //Ajoute de chaque teddy de la groupe au row
      for (teddy of group) {
        displayProductCard(teddy, row);
      }
      divContainer.appendChild(row);
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
    const main = document.getElementById("main");
    main.textContent = "Erreur pendant le chargement! " + err;
    console.error(err);
  });
