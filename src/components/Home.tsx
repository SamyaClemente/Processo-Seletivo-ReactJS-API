import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from '@mui/material';
import { fetchData, GameData } from "../components/Interface";
import { filterGames, getUniqueGenres } from "../components/FiltroGenero";

function Home() {
  const [games, setGames] = React.useState<GameData[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let isMounted = true;

    fetchData(setLoading, setError).then(data => {
      if (isMounted) {
        setGames(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setSelectedGenre(event.target.value as string);
  };

  const filteredGames = filterGames(games, searchTerm, selectedGenre);
  const genres = getUniqueGenres(games);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30rem' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="body1" color="white">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '4%',
        }}
      >

        <Grid item xs={12}>
            <Typography
               variant="h2"
                sx={{
                fontWeight: 'bold',
                color: '#d4d4d4',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '3rem',
                 }}
                    >
                 Catálogo de Jogos
             </Typography>
         </Grid>

          <Grid sx={{ display: 'flex', flexDirection: 'row'}}>

          <Grid item xs={12} sm={6} md={8} >
            <TextField
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={handleSearch}
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{
                '& .MuiInputBase-input': {
                  backgroundColor: '#313131',
                  border: '5rem',
                  borderTopLeftRadius: '5rem',
                  borderBottomLeftRadius: '5rem',
                  outline: 'none',
                  color: '#fff',
                  padding: '1rem',
                  width: '100%',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Select
              value={selectedGenre}
              onChange={handleGenreChange}
              variant="standard"
              disableUnderline
              displayEmpty
              renderValue={(selected) => (selected as string) || 'Gêneros'}
              sx={{
                '& .MuiInputBase-input': {
                  backgroundColor: '#313131',
                  borderTopRightRadius: '5rem',
                  borderBottomRightRadius: '5rem',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff6c',
                  padding: '1rem',
                  width: '100%',
                },
                
              }}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre} sx={{ width:'30rem', height:'20px', display: 'flex', whiteSpace: 'normal', maxWidth: '200px'}}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          margin: '5%',
        }}
      >
        <Grid container spacing={5}>
          {filteredGames.map((game: GameData) => (
            <Grid
              item
              key={game.id}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              sx={{
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0.5rem',
                  backgroundColor: '#313131',
                }}
              >
                <CardActionArea>
                  <a href={game.game_url}>
                    <CardMedia component="img" image={game.thumbnail} alt="Jogo" sx={{ height: 300 }} />
                  </a>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 'bold', color: '#aaa9a9', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {game.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
