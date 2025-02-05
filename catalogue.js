const displayBooks = document.getElementById("book-display");
const filterSelect = document.getElementById("filter"); // Pour le filtre principal
const categorySelect = document.getElementById("category-select"); // Pour le filtre catégorie
const locationSelect = document.getElementById("location-select"); // Pour le filtre lieu
const alphabeticalFilterSelect = document.getElementById("alphabetical-select"); // Pour trier alphabétiquement

let books = [];
let categories = [];
let locations = [];

// Récupérer les livres depuis l'API
fetch('http://localhost:3000/books')
  .then(response => response.json())
  .then(data => {
    books = data;
    renderBooks(books); // Afficher les livres dès qu'ils sont chargés

    // Remplir dynamiquement les filtres avec les valeurs uniques de tags et location
    categories = [...new Set(books.flatMap(book => {
      return book.tags ? book.tags.split(',').map(tag => tag.trim()) : [];
    }))];
    locations = [...new Set(books.map(book => book.location))];

    populateCategoryFilter();
    populateLocationFilter();
  })
  .catch(error => console.error('Erreur:', error));

// Fonction pour remplir le filtre des catégories
function populateCategoryFilter() {
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Fonction pour remplir le filtre des lieux
function populateLocationFilter() {
  locations.forEach(location => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    locationSelect.appendChild(option);
  });
}

// Fonction pour afficher les livres
function renderBooks(filteredBooks) {
  displayBooks.innerHTML = ""; // Réinitialiser l'affichage
  filteredBooks.forEach(element => {
    const bookDiv = document.createElement("li");
    bookDiv.classList.add("book");

    const bookImage = document.createElement("img");
    bookImage.src = element.cover;
    bookImage.alt = element.title;
    bookDiv.appendChild(bookImage);

    const bookDetail = document.createElement("div");
    bookDiv.appendChild(bookDetail);

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = element.title;
    bookDetail.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Auteur: ${element.author}`;
    bookDetail.appendChild(bookAuthor);

    const bookTags = document.createElement("p");
    bookTags.textContent = `Catégorie(s): ${element.tags}`;
    bookDetail.appendChild(bookTags);

    const bookLocation = document.createElement("p");
    bookLocation.textContent = `Bibliothèque de ${element.location}`;
    bookDetail.appendChild(bookLocation);

    const bookDescription = document.createElement("p");
    bookDescription.textContent = `Description: ${element.description}`;
    bookDetail.appendChild(bookDescription);

    displayBooks.appendChild(bookDiv);
  });
}

// Fonction d'événement pour appliquer les filtres combinés
function applyFilters() {
  let filteredBooks = [...books]; // Créer une copie de la liste des livres

  // Filtrage par catégorie
  const selectedCategory = categorySelect.value;
  if (selectedCategory !== "all") {
    filteredBooks = filteredBooks.filter(book => {
      if (book.tags) {
        const tags = book.tags.split(',').map(tag => tag.trim().toLowerCase());
        return tags.includes(selectedCategory.toLowerCase()); // Comparaison insensible à la casse
      }
      return false;
    });
  }

  // Filtrage par lieu
  const selectedLocation = locationSelect.value;
  if (selectedLocation !== "all") {
    filteredBooks = filteredBooks.filter(book => book.location.toLowerCase() === selectedLocation.toLowerCase());
  }

  // Filtrage par ordre alphabétique
  const selectedAlphabetical = alphabeticalFilterSelect.value;
  if (selectedAlphabetical === "alphabetical") {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title)); // A-Z
  } else if (selectedAlphabetical === "reversealphabetical") {
    filteredBooks.sort((a, b) => b.title.localeCompare(a.title)); // Z-A
  }

  renderBooks(filteredBooks); // Afficher les livres filtrés
}

// Ajouter les événements sur les sélecteurs pour appliquer les filtres
categorySelect.addEventListener("change", applyFilters);
locationSelect.addEventListener("change", applyFilters);
alphabeticalFilterSelect.addEventListener("change", applyFilters);