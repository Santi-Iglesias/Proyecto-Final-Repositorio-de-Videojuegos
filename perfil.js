// Obtener referencias a los elementos del DOM
const mainElement = document.querySelector('main');

// Datos del usuario
const usuario = {
  nombreUsuario: 'JohnDoe',
  nombreCompleto: 'John Doe',
  edad: 25,
  email: 'johndoe@example.com',
  wishlist: ['Juego 1', 'Juego 2', 'Juego 3'],
  reviews: ['Review 1', 'Review 2', 'Review 3']
};

// Función para mostrar el perfil del usuario
function mostrarPerfil() {
  // Limpiar el contenido actual del main
  mainElement.innerHTML = '';

  // Crear elementos para mostrar los datos del usuario
  const nombreUsuarioElement = document.createElement('h2');
  nombreUsuarioElement.textContent = `Nombre de usuario: ${usuario.nombreUsuario}`;

  const nombreCompletoElement = document.createElement('p');
  nombreCompletoElement.textContent = `Nombre completo: ${usuario.nombreCompleto}`;

  const edadElement = document.createElement('p');
  edadElement.textContent = `Edad: ${usuario.edad}`;

  const emailElement = document.createElement('p');
  emailElement.textContent = `Email: ${usuario.email}`;

  const wishlistButton = document.createElement('button');
  wishlistButton.textContent = 'Cargar Wishlist';
  wishlistButton.addEventListener('click', mostrarWishlist);

  const reviewsButton = document.createElement('button');
  reviewsButton.textContent = 'Mostrar Reviews';
  reviewsButton.addEventListener('click', mostrarReviews);

  // Agregar los elementos al main
  mainElement.appendChild(nombreUsuarioElement);
  mainElement.appendChild(nombreCompletoElement);
  mainElement.appendChild(edadElement);
  mainElement.appendChild(emailElement);
  mainElement.appendChild(wishlistButton);
  mainElement.appendChild(reviewsButton);
}

// Función para mostrar la wishlist de juegos
function mostrarWishlist() {
  // Limpiar el contenido actual del main
  mainElement.innerHTML = '';

  // Crear elementos para mostrar la wishlist de juegos
  const wishlistTitle = document.createElement('h3');
  wishlistTitle.textContent = 'Wishlist de juegos';

  const wishlistList = document.createElement('ul');
  usuario.wishlist.forEach(juego => {
    const juegoItem = document.createElement('li');
    juegoItem.textContent = juego;
    wishlistList.appendChild(juegoItem);
  });

  const backButton = document.createElement('button');
  backButton.textContent = 'Volver';
  backButton.addEventListener('click', mostrarPerfil);

  // Agregar los elementos al main
  mainElement.appendChild(wishlistTitle);
  mainElement.appendChild(wishlistList);
  mainElement.appendChild(backButton);
}

// Función para mostrar las reviews realizadas
function mostrarReviews() {
  // Limpiar el contenido actual del main
  mainElement.innerHTML = '';

  // Crear elementos para mostrar las reviews realizadas
  const reviewsTitle = document.createElement('h3');
  reviewsTitle.textContent = 'Reviews realizadas';

  const reviewsList = document.createElement('ul');
  usuario.reviews.forEach(review => {
    const reviewItem = document.createElement('li');
    reviewItem.textContent = review;
    reviewsList.appendChild(reviewItem);
  });

  const backButton = document.createElement('button');
  backButton.textContent = 'Volver';
  backButton.addEventListener('click', mostrarPerfil);

  // Agregar los elementos al main
  mainElement.appendChild(reviewsTitle);
  mainElement.appendChild(reviewsList);
  mainElement.appendChild(backButton);
}

// Llamar a la función para mostrar el perfil del usuario al cargar la página
mostrarPerfil();