const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export async function getGameDetails(gameId) {
  const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
  const data = await response.json();

  return data;
}

export async function getTrendingGames() {
  const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&ordering=-added`);
  const data = await response.json();

  return data;
}

export async function searchGameByName(name) {
  const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(name)}`);
  const data = await response.json();

  return data;
}