'use client'
import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

const VerLibros = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener los libros desde la API
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

    fetchBooks();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error al cargar los libros: {error.message}</Typography>;
  }

  return (
    <Container sx={{ backgroundColor: '#ffe4c4', padding: '20px' }}>
      <Typography variant="h2">Lista de Libros</Typography>
      <List>
        {books.map((book, index) => (
          <ListItem key={index}>
            <ListItemText primary={book.title} secondary={book.author} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default VerLibros;
