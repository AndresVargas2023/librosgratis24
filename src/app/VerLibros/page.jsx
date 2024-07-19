'use client'
import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Card, CardContent, CardMedia, Button, CircularProgress, TextField, Grid } from '@mui/material';
import axios from 'axios';
import styles from '../page.module.css'; // Asegúrate de tener este archivo CSS

const VerLibros = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_BOOKS);
      console.log('Datos de la API:', response.data); // Log para verificar los datos
      setBooks(response.data);
    } catch (err) {
      console.error('Error al obtener los libros:', err); // Log para detalles del error
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.genre.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`https://apisergiecode.onrender.com/books/${id}`);
      // Actualiza la lista de libros después de la eliminación
      fetchBooks();
    } catch (err) {
      console.error('Error al eliminar el libro:', err);
      setError(err);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error al cargar los libros: {error.message}</Typography>;
  }

  return (
    <Container sx={{ backgroundColor: '#ffe4c4', padding: '20px' }}>
      <Typography variant="h2" gutterBottom>Libros</Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="center" className={styles.buttonGroup}>
        <Grid item xs={12} md={10}>
          <TextField 
            fullWidth
            className={styles.search}
            label="Buscar Libros" 
            variant="outlined" 
            value={search} 
            onChange={handleSearch} 
          />
        </Grid>
      </Grid>

      {filteredBooks.length > 0 ? (
        <List className={styles.list}>
          {filteredBooks.map((book) => (
            <ListItem key={book._id} className={styles.listItem}>
              <Card sx={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                {book.image_url && (
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={book.image_url}
                    alt={book.title}
                  />
                )}
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h5" variant="h5">
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Género: {book.genre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de Publicación: {book.publication_date}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {book.description}
                  </Typography>
                  {book.download_url && (
                    <Button
                      variant="contained"
                      color="primary"
                      href={book.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ marginRight: '10px' }}
                    >
                      Link
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(book._id)}
                    disabled={true} // Puedes cambiar esta condición según necesites
                  >
                    Eliminar
                  </Button>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" className={styles.header}>
          No se encontraron libros.
        </Typography>
      )}
    </Container>
  );
};

export default VerLibros;
