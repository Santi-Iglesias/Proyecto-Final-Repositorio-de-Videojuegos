import { searchGameByName } from './rawg.js';

document.addEventListener('DOMContentLoaded', () => {
  const gameNameInput = document.getElementById('gameName');
  const searchBtn = document.getElementById('searchBtn');
  const allGamesSection = document.getElementById('allGamesSection');
  const paginationButtons = document.getElementById('paginationButtons');

  const gamesPerPage = 10; // Define el número de juegos por página

  // Función para mostrar los juegos en la página actual
  const displayGames = (games, currentPage) => {
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const currentGames = games.slice(startIndex, endIndex);

    allGamesSection.innerHTML = '';

    currentGames.forEach(game => {
      const card = document.createElement('div');
      card.className = 'card';

      const image = document.createElement('img');
      image.src = game.background_image;
      image.alt = game.name;
      image.className = 'game-image';

      const name = document.createElement('p');
      name.textContent = game.name;
      name.className = 'game-name';

      card.appendChild(image);
      card.appendChild(name);

      allGamesSection.appendChild(card);
    });
  };

  // Función para crear los botones de paginación
  const createPaginationButtons = (games, currentPage) => {
    const totalPages = Math.ceil(games.length / gamesPerPage);
    paginationButtons.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => {
        displayGames(games, i);
      });

      if (i === currentPage) {
        button.classList.add('active');
      }

      paginationButtons.appendChild(button);
    }
  };

  // Obtener todos los juegos
  searchGameByName('')
    .then(data => {
      const games = data.results;

      let currentPage = 1;

      displayGames(games, currentPage);
      createPaginationButtons(games, currentPage);
    })
    .catch(error => {
      console.error('Error fetching games:', error);
    });

  searchBtn.addEventListener('click', () => {
    const gameName = gameNameInput.value.trim();

    if (gameName !== '') {
      searchGameByName(gameName)
        .then(data => {
          const games = data.results;

          let currentPage = 1;

          displayGames(games, currentPage);
          createPaginationButtons(games, currentPage);
        })
        .catch(error => {
          console.error('Error searching games:', error);
        });
    }
  });
});