// Aquí deberás utilizar una conexión a la base de datos SQL y realizar una consulta para obtener los datos del usuario.
// Asumiendo que tienes una función llamada 'getUserData' que devuelve un objeto con el nombre y apellido del usuario.

// Ejemplo de función getUserData simulada que devuelve datos ficticios:
function getUserData() {
    return {
      firstName: 'fran',
      lastName: 'cek'
    };
  }
  
  // Función para actualizar el nombre y apellido en el HTML
  function updateUserData() {
    const userData = getUserData();
    const userFullName = `${userData.firstName} ${userData.lastName}`;
    const h4Element = document.getElementById('userFullName');
    h4Element.textContent = userFullName;
  }
  
  // Llamamos a la función para actualizar los datos del usuario al cargar la página
  window.addEventListener('DOMContentLoaded', updateUserData);




// Asumiendo que tienes una función llamada 'getWishlistCount' que obtiene la cantidad de juegos en la wishlist del usuario desde la base de datos.

// Ejemplo de función getWishlistCount simulada que devuelve un número ficticio:
function getWishlistCount() {
  // Aquí debes realizar la consulta SQL y obtener la cantidad de juegos en la wishlist para el usuario actual.
  // Luego, devuelve ese número.
  return 0; // Cambiamos el valor ficticio a 0
}

// Función para actualizar la cantidad de juegos en la wishlist en el HTML
function updateWishlistCount() {
  const wishlistCount = getWishlistCount();
  const badgeElement = document.querySelector('.wishlist-count');
  badgeElement.textContent = wishlistCount;
}

// Llamamos a la función para actualizar la cantidad de juegos en la wishlist al cargar la página
window.addEventListener('DOMContentLoaded', updateWishlistCount);