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
        <img src=${gameDetails.background_image} class= "imagen-juego"></img>
        <h3 class= "gameName">${gameDetails.name}</h3>
        <p class= "description">Description: ${gameDetails.description_raw}</p>
        <p class= "genre">Genre: ${gameDetails.genres.map(genre => genre.name).join(', ')}</p>
        <p class= "platforms">Platforms: ${gameDetails.platforms.map(platform => platform.platform.name).join(', ')}</p>
        <p class= "released">Release Date: ${gameDetails.released}</p>
        <p class= "publisher">Publisher: ${gameDetails.publishers.map(publisher => publisher.name).join(', ')}</p>
        <p class= "ageRating">Age Rating: ${ageRating}</p>
        <p class= "buyLinks">Buy: ${buyLinks}</p>
        <a href="${gameDetails.website}" class= "website">Website</a>
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