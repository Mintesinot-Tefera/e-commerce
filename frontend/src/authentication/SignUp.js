import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/joy/FormHelperText';
import Link from '@mui/joy/Link';
import axios from 'axios';




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

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        fullname: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.fullname) {
            newErrors.fullname = 'Full Name is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                const response = await axios.post('http://localhost:5000/auth/register', {
                    email: formData.email,
                    fullname: formData.fullname,
                    password: formData.password,
                });
                alert(response.data.message);
                navigate('/');
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.message);
                } else {
                    alert('There was an error registering!');
                }
            }
        }
    };


    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
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
                        {/* <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                            <IconButton variant="soft" color="primary" size="sm">
                                <BadgeRoundedIcon />
                            </IconButton>
                            <Typography level="title-lg">Company logo</Typography>
                        </Box> */}
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
                                    Register
                                </Typography>
                                {/* <Typography level="body-sm">
                                    New to company?{' '}
                                    <Link href="#replace-with-a-link" level="title-sm">
                                        Sign up!
                                    </Link>
                                </Typography> */}
                            </Stack>
                            {/* <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                startDecorator={<GoogleIcon />}
                            >
                                Continue with Google
                            </Button> */}
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
                                    <FormLabel>Full Name</FormLabel>
                                    <Input type="fullname" name="fullname" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" name="password" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input type="password" name="password" />
                                </FormControl>
                                <Stack gap={4} sx={{ mt: 2 }}>
                                    {/* <Box
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
                                    </Box> */}
                            {/* <Button type="submit" fullWidth>
                                        Sign Up
                                    </Button>
                                </Stack>
                            </form> */}

                            <form onSubmit={handleSubmit}>
                                <FormControl required error={Boolean(errors.email)} fullWidth margin="normal">
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                                    <FormHelperText>{errors.email}</FormHelperText>
                                </FormControl>

                                <FormControl required error={Boolean(errors.fullname)} fullWidth margin="normal">
                                    <FormLabel>Full Name</FormLabel>
                                    <Input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
                                    <FormHelperText>{errors.fullname}</FormHelperText>
                                </FormControl>

                                <FormControl required error={Boolean(errors.password)} fullWidth margin="normal">
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                                    <FormHelperText>{errors.password}</FormHelperText>
                                </FormControl>

                                <FormControl required error={Boolean(errors.confirmPassword)} fullWidth margin="normal">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                    <FormHelperText>{errors.confirmPassword}</FormHelperText>
                                </FormControl>



                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Button type="submit" fullWidth
                                        sx={{
                                            backgroundColor: '#092f6e',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: '#092f6h',
                                            },
                                        }}>
                                        Sign Up
                                    </Button>
                                </Stack>

                                <Stack gap={1}>
                                    <Typography level="body-sm">
                                        Already have an account{' '}
                                        <Link href="/signin" level="title-sm">
                                            Sign in
                                        </Link>
                                        {' '}here
                                    </Typography>
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
                    left: { xs: 0, md: '50vw' },
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
