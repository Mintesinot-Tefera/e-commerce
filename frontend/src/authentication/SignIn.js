import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from './GoogleIcon';
// import myLogo5 from '../components/logo/logo4.png';
import myLogo5 from '../components/logo/logo6.png';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from '../App';



function ColorSchemeToggle(props) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);



    return (
        <IconButton
            aria-label="toggle light/dark mode"
            size="sm"
            variant="outlined"
            disabled={!mounted}
            onClick={(event) => {
                setMode(mode === 'light' ? 'dark' : 'light');
                onClick?.(event);
            }}
            {...other}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

export default function SignIn() {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);


    const [formData, setFormData] = useState({
        email: '',
        password: '',
        persistent: false,
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');


    const logoStyle = {
        height: '50px',
        marginRight: '10px',
    };


    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: type === 'checkbox' ? checked : value,
    //     });
    // };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: updatedValue,
        });

        // Validate the field that is being changed
        const newErrors = validate(name, updatedValue);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: newErrors[name] || '',
        }));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                const response = await axios.post('http://localhost:5000/auth/login', formData);
                // sessionStorage.setItem('user_logged_in', 'true');
                if (response.data.authToken) {
                    sessionStorage.setItem('fullname', response.data.fullname);  // Store the fullname in sessionStorage
                    sessionStorage.setItem('authToken', response.data.authToken);  // Store the token in sessionStorage

                    // Check if there's a pending cart item
                    const pendingCartItem = sessionStorage.getItem('pendingCartItem');
                    if (pendingCartItem) {
                        const { product, quantity } = JSON.parse(pendingCartItem);
                        addToCart(product, quantity); // Add the pending item to the cart
                        sessionStorage.removeItem('pendingCartItem'); // Clear the stored item
                    }

                    navigate('/');  // Navigate to the dashboard

                }
                // sessionStorage.setItem('authToken', response.data.token);
                // navigate('/userdashboard');

            } catch (error) {
                console.error('There was an error logging in!', error);
                if (error.response && error.response.data) {
                    setServerError(error.response.data.message);
                } else {
                    setServerError('There was an error logging in!');
                }
            }
        }
    };


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const newErrors = validate();
    //     if (Object.keys(newErrors).length > 0) {
    //       setErrors(newErrors);
    //     } else {
    //       try {
    //         const response = await axios.post('http://localhost:5000/auth/login', formData);

    //         if (response.data.authToken) {
    //           sessionStorage.setItem('fullname', response.data.fullname);
    //           sessionStorage.setItem('authToken', response.data.authToken);

    //           // Check for pending cart item
    //           const pendingItem = sessionStorage.getItem('pendingCartItem');
    //           if (pendingItem) {
    //             const item = JSON.parse(pendingItem);
    //             // Add item to cart
    //             axios.post('/api/cart', { item })
    //               .then(() => sessionStorage.removeItem('pendingCartItem')) // Clear pending item
    //               .catch(err => console.error('Error adding pending item to cart:', err));
    //           }

    //           navigate('/'); // Redirect to dashboard
    //         }
    //       } catch (error) {
    //         console.error('There was an error logging in!', error);
    //         setServerError(error.response?.data?.message || 'There was an error logging in!');
    //       }
    //     }
    //   };



    return (
        <CssVarsProvider defaultMode="light" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width: { xs: '100%', md: '50vw' },
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(255 255 255 / 0.2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={myLogo5} alt="Logo" style={logoStyle} />
                            {/* <div style={titleStyle}>YIGEBYU</div> */}
                        </div>

                        {/* <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}> */}
                        {/* <IconButton variant="soft" color="primary" size="sm">
                                <BadgeRoundedIcon />
                            </IconButton> */}
                        {/* <Typography level="title-lg">Company logo</Typography> */}
                        {/* </Box> */}
                        {/* <ColorSchemeToggle /> */}
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .MuiFormLabel-asterisk`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <Stack gap={4} sx={{ mb: 2 }}>
                            <Stack gap={1}>
                                <Typography component="h1" level="h3">
                                    User Sign in
                                </Typography>
                                <Typography level="body-sm">
                                    If you are a new user{' '}
                                    <Link href="signup" level="title-sm"
                                        sx={{
                                            color: '#092f6e',
                                            '&:hover': {
                                                backgroundColor: '#092f6h',
                                            },
                                        }}>
                                        Sign up
                                    </Link>
                                    {' '}here
                                </Typography>
                            </Stack>

                        </Stack>
                        {/* <Divider
                            sx={(theme) => ({
                                [theme.getColorSchemeSelector('light')]: {
                                    color: { xs: '#FFF', md: 'text.tertiary' },
                                },
                            })}
                        >
                            or
                        </Divider> */}
                        <Stack gap={4} sx={{ mt: 2 }}>
                            {/* <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements;
                                    const data = {
                                        email: formElements.email.value,
                                        password: formElements.password.value,
                                        persistent: formElements.persistent.checked,
                                    };
                                    alert(JSON.stringify(data, null, 2));
                                }}
                            >
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" name="password" />
                                </FormControl>
                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Checkbox size="sm" label="Remember me" name="persistent" />
                                        <Link level="title-sm" href="#replace-with-a-link">
                                            Forgot your password?
                                        </Link>
                                    </Box>
                                    <Button type="submit" fullWidth>
                                        Sign in
                                    </Button>
                                </Stack>
                            </form> */}

                            <form onSubmit={handleSubmit}>
                                <FormControl required error={!!errors.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                                </FormControl>
                                <FormControl required error={!!errors.password}>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                                    {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                                </FormControl>
                                {serverError && (
                                    <Box mt={2}>
                                        <FormHelperText error>{serverError}</FormHelperText>
                                    </Box>
                                )}
                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Checkbox size="sm" label="Remember me" name="persistent" checked={formData.persistent} onChange={handleChange} />
                                        <Link level="title-sm" href="#replace-with-a-link"
                                            sx={{

                                                color: '#092f6e',
                                                '&:hover': {
                                                    backgroundColor: '#092f6g',
                                                },
                                            }}>
                                            Forgot your password?
                                        </Link>
                                    </Box>
                                    <Button type="submit" fullWidth
                                        sx={{
                                            backgroundColor: '#092f6e',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: '#092f6h',
                                            },
                                        }}
                                    >
                                        Sign in
                                    </Button>
                                    <Button
                                        variant="soft"
                                        color="neutral"
                                        fullWidth
                                        startDecorator={<GoogleIcon />}
                                    >
                                        Continue with Google
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            © ATMCareConnect {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box

                sx={(theme) => ({
                    height: '75%',
                    position: 'fixed',
                    right: 50,
                    top: 50,
                    bottom: 50,
                    left: { xs: 50, md: '50vw' },
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://blog.eftpos.co.nz/hubfs/Blog/Hero_Images/eCommerce%20Blog.png)',

                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage:
                            'url(https://blog.eftpos.co.nz/hubfs/Blog/Hero_Images/eCommerce%20Blog.png)',

                    },

                })}
            />
        </CssVarsProvider>
    );
}

// 'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
