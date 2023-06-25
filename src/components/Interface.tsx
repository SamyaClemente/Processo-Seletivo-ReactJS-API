export interface GameData {
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
  
  export async function fetchData(
    setLoading: (loading: boolean) => void,
    setError: (error: string) => void
  ): Promise<GameData[]> {
    setLoading(true);
    setError('');
  
    const timeoutId = setTimeout(() => {
      setError('O servidor demorou para responder, tente mais tarde.');
      setLoading(false);
    }, 5000);
  
    try {
      const response = await fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', {
        headers: {
          'dev-email-address': 'samya@gmail.com'
        }
      });
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        if (
          response.status === 500 ||
          response.status === 502 ||
          response.status === 503 ||
          response.status === 504 ||
          response.status === 507 ||
          response.status === 508 ||
          response.status === 509
        ) {
          throw new Error('O servidor falhou em responder, tente recarregar a página.');
        } else {
          throw new Error('O servidor não conseguiu responder por agora, tente voltar novamente mais tarde.');
        }
      }
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      setError('O servidor demorou para responder, tente mais tarde.');
      setLoading(false);
      return [];
    }
  }
  