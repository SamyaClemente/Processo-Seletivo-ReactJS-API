import { GameData } from "../components/Interface";
import { useState, useEffect } from 'react';

export const ApiData = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          setError('O servidor demorou para responder, tente mais tarde.');
          setLoading(false);
        }
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
        if (isMounted) {
          setGames(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError('O servidor demorou para responder, tente mais tarde.');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { games, loading, error };
};
