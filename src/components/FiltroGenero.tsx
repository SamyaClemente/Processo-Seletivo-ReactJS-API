import { GameData } from "../components/Interface";

export function filterGames(games: GameData[], searchTerm: string, selectedGenre: string): GameData[] {
    return games.filter(game =>
      (game.title.toLowerCase().includes(searchTerm.toLowerCase()) || game.genre.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedGenre === '' || game.genre.toLowerCase() === selectedGenre.toLowerCase())
    );
  }
  
  export function getUniqueGenres(games: GameData[]): string[] {
    return Array.from(new Set(games.map(game => game.genre)));
  }
  