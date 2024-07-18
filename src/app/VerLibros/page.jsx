'use client'
import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Card, CardContent, CardMedia, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const VerLibros = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://apisergiecode.onrender.com/books');
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://apisergiecode.onrender.com/books/${id}`);
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
      <Typography variant="h2" gutterBottom>Lista de Libros</Typography>
      <List>
        {books.map((book) => (
          <ListItem key={book._id}>
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
                    Descargar
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
    </Container>
  );
};

export default VerLibros;
