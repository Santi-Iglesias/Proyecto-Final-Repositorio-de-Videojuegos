import { searchGameByName, getGameDetails } from './rawg.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameNameInput = document.getElementById('input');
    const gameResult = document.getElementById('gameResult');
  
    // Retrieve game details from localStorage
    const gameDetails = JSON.parse(localStorage.getItem('gameDetails'));
  console.log(gameDetails)
    if (gameDetails) {
      const ageRating = gameDetails.esrb_rating ? gameDetails.esrb_rating.name + ' (' + (gameDetails.esrb_rating.age_rating ? gameDetails.esrb_rating.age_rating : 'N/A')+ ')' : 'Not available';
      const buyLinks = gameDetails.stores.map(store => `<a href="${store.url ==""? "https://"+store.store.domain:store.url}" target="_blank">${store.store.name}</a>`).join(', ');
  
      gameResult.innerHTML = `
        <img src=${gameDetails.background_image}></img>
        <h3>${gameDetails.name}</h3>
        <p>Description: ${gameDetails.description_raw}</p>
        <p>Genre: ${gameDetails.genres.map(genre => genre.name).join(', ')}</p>
        <p>Platforms: ${gameDetails.platforms.map(platform => platform.platform.name).join(', ')}</p>
        <p>Release Date: ${gameDetails.released}</p>
        <p>Publisher: ${gameDetails.publishers.map(publisher => publisher.name).join(', ')}</p>
        <p>Age Rating: ${ageRating}</p>
        <p>Buy: ${buyLinks}</p>
        <a href="${gameDetails.website}">Website</a>
      `;
    } else {
      gameResult.innerHTML = 'No se encontró información del juego.';
    }
  
    gameNameInput.addEventListener("keypress", (event) => {
      console.log("Evnto")
      if (event.key === "Enter") {
        const gameName = gameNameInput.value.trim();
  
        if (gameName !== "") {
          localStorage.setItem("gameToSearch",gameName);
          window.location.href = "index.html"
        }
      }
    });
  });