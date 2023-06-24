import { Container } from "../styles/style";
import { GameList } from "../styles/gameList";
import { Game } from "../styles/games";
import { useState, useEffect } from 'react';
import { Search } from "./Search";

interface GameData {
    id: number,
    title: string,
    thumbnail: string,
    short_description: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    developer: string,
    release_date: number,
    freetogame_profile_url: string
}

function Home() {
  const image_path = 'https://www.freetogame.com/g'
  const [games, setGames ] = useState<GameData[]>([])

  useEffect(() => {
    fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', {
      headers: {
        'dev-email-address': 'samya@gmail.com'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGames(data);
      });
      
  }, []);

  return(
    <Container>
      <Search>
        <h1>Catálogo de Jogos</h1>
        <input type="text" placeholder="Buscar um jogo"/>
        <button></button>
      </Search>
      <GameList>
        {games.map((game: GameData) => (
          <Game key={game.id}>
            <a href={game.game_url}>
              <img src={game.thumbnail} alt="Jogo"/>
            </a>        
            <span>{game.title}</span>
          </Game>
        ))}
      </GameList>
    </Container>
  )
}

export default Home;
