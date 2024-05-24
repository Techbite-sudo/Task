import { AppBar, Badge, Button, IconButton, Stack, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import Logo from '../components/logo';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth/auth-context';
import { useAppContext } from '../contexts/app-context';
import { Menu, ShoppingCartOutlined } from '@mui/icons-material';
import { MouseEvent, useState } from 'react';
import LinkMenu from './link-menu';

interface TB {
    color?: 'inherit' | 'transparent',
    position?: 'fixed' | 'static' | 'absolute',
    buttonWhite?: boolean
}

const TopBar = ({ color = 'inherit', position = 'static', buttonWhite = false }: TB) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isAuthenticated } = useAuthContext();
    const { cart } = useAppContext();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const cartQuantity = cart?.length || 0;

    const [linkAnchorEl, setLinkAnchorEl] = useState<null | HTMLElement>(null);
    const linkOpen = Boolean(linkAnchorEl);

    const linkMenuId='link-menu'

    const openLinkMenu = (event: MouseEvent<HTMLElement>) => {
        setLinkAnchorEl(event.currentTarget);
    };

    const closeLinkMenu = () => {
        setLinkAnchorEl(null);
    };

  return (
    <>
        {isSmallScreen && <LinkMenu anchorEl={linkAnchorEl} closeMenu={closeLinkMenu} id={linkMenuId} open={linkOpen} />}
        <AppBar elevation={0} position={position} color={color}>
            <Toolbar>
                <Stack direction='row' alignItems='center' justifyContent='space-between' gap={isSmallScreen ? 1 : 3} sx={{ width: '100%', py: 2 }} flexWrap='wrap'>
                    <Logo width='225px' />
                    {!isSmallScreen && <Stack direction='row' gap={2} alignItems='center' flexWrap='wrap'>
                        <Button 
                            onClick={() => { navigate('/') }} 
                            size='small' 
                            color={pathname === '/' ? 'primary' : 'secondary'} 
                            variant={pathname === '/' ? 'outlined' : 'text'}
                            sx={{ ...(buttonWhite && { color: 'white', borderColor: 'white' }) }}
                        >
                            Home
                        </Button>
                        <Button 
                            onClick={() => { navigate('/about') }} 
                            size='small' 
                            color={pathname === '/about' ? 'primary' : 'secondary'} 
                            variant={pathname === '/about' ? 'outlined' : 'text'}
                            sx={{ ...(buttonWhite && { color: 'white', borderColor: 'white' }) }}
                        >
                            About Us
                        </Button>
                        <Button 
                            onClick={() => { navigate('/book-a-flight') }} 
                            size='small' 
                            color={pathname === '/book-a-flight' ? 'primary' : 'secondary'} 
                            variant={pathname === '/book-a-flight' ? 'outlined' : 'text'}
                            sx={{ ...(buttonWhite && { color: 'white', borderColor: 'white' }) }}
                        >
                            Book A Flight
                        </Button>
                        <Button 
                            onClick={() => { navigate('/book-hotel') }} 
                            size='small' 
                            color={pathname === '/book-hotel' ? 'primary' : 'secondary'} 
                            variant={pathname === '/book-hotel' ? 'outlined' : 'text'}
                            sx={{ ...(buttonWhite && { color: 'white', borderColor: 'white' }) }}
                        >
                            Book Hotel
                        </Button>
                        <Button 
                            onClick={() => { navigate('/safari-packages') }} 
                            size='small' 
                            color={pathname === '/safari-packages' ? 'primary' : 'secondary'} 
                            variant={pathname === '/safari-packages' ? 'outlined' : 'text'}
                            sx={{ ...(buttonWhite && { color: 'white', borderColor: 'white' }) }}
                        >
                            Safari Package
                        </Button>
                        <Button 
                            onClick={() => { navigate('/gift-shop') }} 
                            size='small' 
                            color={pathname === '/gift-shop' ? 'primary' : 'secondary'} 
                            variant={pathname === '/gift-shop' ? 'outlined' : 'text'}
                            sx={{ ...(buttonWhite && { color: 'white', borderColor: 'white' }) }}
                        >
                            Gift Shop
                        </Button>
                        <Button 
                            onClick={() => { navigate('/about#csr') }} 
                            size='small' 
                            color={pathname === '/gift-shop' ? 'primary' : 'secondary'} 
                            variant={pathname === '/gift-shop' ? 'outlined' : 'text'}
                            sx={{ ...(buttonWhite && { color: 'white', borderColor: 'white' }) }}
                        >
                            CSR
                        </Button>
                    </Stack>}
                    {isSmallScreen && <IconButton onClick={openLinkMenu} aria-controls={linkOpen ? linkMenuId : undefined} aria-haspopup="true" aria-expanded={linkOpen ? 'true' : undefined}><Menu fontSize='large' color='primary' /></IconButton>}
                    {!isSmallScreen && <Stack direction='row' gap={2} alignItems='center'>
                        {!isAuthenticated && <>
                            <Button 
                                color='secondary' 
                                onClick={() => { navigate('/auth/login') }}
                                sx={{ ...(buttonWhite && { color: 'white' }) }}
                            >
                                Login
                            </Button>
                            <Button 
                                variant='contained' 
                                onClick={() => { navigate('/auth/register') }}
                                sx={{ ...(buttonWhite && { color: 'secondary.main', backgroundColor: '#fff' }) }}
                            >
                                Register
                            </Button>
                        </>}
                        {isAuthenticated && <>
                            <Button 
                                variant='contained' 
                                onClick={() => { navigate('/profile') }}
                                sx={{ ...(buttonWhite && { color: 'secondary.main', backgroundColor: '#fff' }) }}
                            >
                                Profile
                            </Button>
                        </>}
                        <IconButton size='small' onClick={() => { navigate('/cart') }}>
                            {cartQuantity > 0 && <Badge
                                badgeContent={cartQuantity}
                                color="primary"
                            >
                                <ShoppingCartOutlined fontSize='small' sx={{ ...(buttonWhite && { color: '#fff' }) }} />
                            </Badge>}
                            {cartQuantity === 0 && <ShoppingCartOutlined fontSize='small' sx={{ ...(buttonWhite && { color: '#fff' }) }} />}
                        </IconButton>
                    </Stack>}
                </Stack>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default TopBar