'use client'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { login } from '@/app/api/route';
import { useCookies } from 'next-client-cookies';
import { setUser, userLogin } from '@/lib/features/users/userSlice';
import { useRouter } from 'next/navigation';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from '@/lib/hooks';
import Swal from 'sweetalert2';

const defaultTheme = createTheme();

const LoginForm = () => {
    const [errors, setErrors] = useState({});
    const cookies = useCookies();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const result = await login(data);
            cookies.set("userToken", result.token);
            cookies.set("info", result.user._id);
            dispatch(userLogin());
            dispatch(setUser(result.user));
            
            Swal.fire({
                title: `Bienvenido ${result.user.firstName} ${result.user.lastName}`,
                icon: "success",
                confirmButtonColor: "#34473a",
                iconColor: "#42826c"
            });
            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (error) {
            console.error("Error during login:", error);
            console.log("Error response:", error.response?.data?.errors);
            setErrors(error.response?.data?.errors || {});
            Swal.fire({
                title: "Usuario no encontrado",
                icon: "error",
                confirmButtonColor: "#34473a"
            });
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '92vh', mt: "80px" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#2f3543' }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar Sesión
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={Boolean(errors.email)}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Constraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={Boolean(errors.password)}
                                helperText={errors.password ? errors.password.message : ''}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Recordar contraseña"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: "#42826c", height: "56px", ":hover": { backgroundColor: "#34473a" } }}
                            >
                                Iniciar sesión
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/passwordReset" variant="body2">
                                        ¿Olvidaste la contraseña?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"¿No tienes una cuenta? Crear"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default LoginForm;
