import { searchGameByName, getGameDetails } from './rawg.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameNameInput = document.getElementById('gameName');
    const searchBtn = document.getElementById('searchBtn');
    const gameResult = document.getElementById('gameResult');
  
    // Retrieve game details from localStorage
    const gameDetails = JSON.parse(localStorage.getItem('gameDetails'));
  
    if (gameDetails) {
      const ageRating = gameDetails.esrb_rating ? gameDetails.esrb_rating.name + ' (' + gameDetails.esrb_rating.age_rating + ')' : 'Not available';
      const buyLinks = gameDetails.stores.map(store => `<a href="${store.url}" target="_blank">${store.store.name}</a>`).join(', ');
  
      gameResult.innerHTML = `
        <h3>${gameDetails.name}</h3>
        <p>Description: ${gameDetails.description_raw}</p>
        <p>Genre: ${gameDetails.genres.map(genre => genre.name).join(', ')}</p>
        <p>Platforms: ${gameDetails.platforms.map(platform => platform.platform.name).join(', ')}</p>
        <p>Release Date: ${gameDetails.released}</p>
        <p>Publisher: ${gameDetails.publishers.map(publisher => publisher.name).join(', ')}</p>
        <p>Age Rating: ${ageRating} (${gameDetails.esrb_rating ? gameDetails.esrb_rating.age_rating : 'N/A'})</p>
        <p>Buy: ${buyLinks}</p>
        <a href="${gameDetails.website}">Website</a>
      `;
    } else {
      gameResult.innerHTML = 'No se encontró información del juego.';
    }
  
    searchBtn.addEventListener('click', async () => {
      const gameName = gameNameInput.value;
  
      if (gameName) {
        try {
          const gameData = await searchGameByName(gameName);
  
          if (gameData.results.length > 0) {
            const firstGame = gameData.results[0];
            const gameDetails = await getGameDetails(firstGame.id);
  
            if (gameDetails) {
              // Store game details in localStorage
              localStorage.setItem('gameDetails', JSON.stringify(gameDetails));
  
              // Redirect to game.html or index.html based on the current page
              if (window.location.pathname.includes('game.html')) {
                window.location.href = 'game.html';
              } else {
                window.location.href = 'index.html';
              }
            } else {
              gameResult.innerHTML = 'No se encontró información del juego.';
            }
          } else {
            gameResult.innerHTML = 'No se encontró ningún juego con ese nombre.';
          }
        } catch (error) {
          console.error('Error searching game:', error);
          gameResult.innerHTML = 'Ocurrió un error al buscar el juego.';
        }
      }
    });
  });