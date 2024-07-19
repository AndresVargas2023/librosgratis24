'use client'
import { Container, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';
import styles from './page.module.css';

const Home = () => {
  return (
    <Container className={styles.main}>
      <Typography variant="h2" gutterBottom align="center">
        Bienvenido a BookManager
      </Typography>

      <Typography variant="body1" paragraph className={styles.description}>
        <strong>Descripción:</strong> BookManager es una aplicación intuitiva diseñada para ayudar a los usuarios a gestionar su colección de libros de manera eficiente. Ofrecemos una interfaz amigable que permite a los usuarios agregar nuevos libros, buscar títulos específicos y organizar su biblioteca con facilidad. Con opciones de filtrado avanzadas y una base de datos actualizada, BookManager asegura que los usuarios puedan encontrar y acceder a la información de sus libros rápidamente.
      </Typography>

      <Typography variant="body1" paragraph className={styles.description}>
        <strong>Objetivo:</strong>
      </Typography>
      
      <div className={styles.objectiveList}>
        <Typography variant="body1" paragraph>
          - <strong>Agregar Libros:</strong> Introduce nuevos títulos a la biblioteca con detalles como autor, género, fecha de publicación y una descripción.
        </Typography>
        <Typography variant="body1" paragraph>
          - <strong>Buscar y Filtrar:</strong> Utiliza funciones de búsqueda y filtros para encontrar libros específicos de manera rápida y precisa.
        </Typography>
        <Typography variant="body1" paragraph>
          - <strong>Organizar:</strong> Mantén tu colección organizada con herramientas que permiten clasificar y gestionar los libros según diversos criterios.
        </Typography>
        <Typography variant="body1" paragraph>
          - <strong>Acceso Rápido:</strong> Facilita el acceso a la información sobre cada libro y permite descargar contenido adicional cuando está disponible.
        </Typography>
      </div>

      <Grid container spacing={2} justifyContent="center" className={styles.buttonGroup}>
        <Grid item>
          <Link href="/AgregarLibros" passHref>
            <Button variant="contained" className={styles.linkButton}>Agregar Libros</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/VerLibros" passHref>
            <Button variant="contained" className={styles.linkButton}>Ver Libros</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
