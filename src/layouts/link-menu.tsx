import { Divider, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth/auth-context';

interface LM {
    anchorEl: any,
    id: string,
    open: boolean,
    closeMenu: () => void,
}

const LinkMenu = ({ anchorEl, id, closeMenu, open }: LM) => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext();

    const navigationHandler = (path: string) => {
        closeMenu();
        navigate(path);
    }

  return (
    <Menu
        anchorEl={anchorEl}
        id={id}
        open={open}
        onClose={closeMenu}
        onClick={closeMenu}
        PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
            },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
        <MenuItem onClick={navigationHandler.bind(null, '/')}>Home</MenuItem>
        <MenuItem onClick={navigationHandler.bind(null, '/about')}>About Us</MenuItem>
        <MenuItem onClick={navigationHandler.bind(null, '/book-a-flight')}>Book A Flight</MenuItem>
        <MenuItem onClick={navigationHandler.bind(null, '/book-hotel')}>Book Hotel</MenuItem>
        <MenuItem onClick={navigationHandler.bind(null, '/safari-packages')}>Safari Packages</MenuItem>
        <MenuItem onClick={navigationHandler.bind(null, '/gift-shop')}>Gift Shop</MenuItem>
        <Divider />
        {!isAuthenticated && <>
            <MenuItem onClick={navigationHandler.bind(null, '/auth/login')}>Login</MenuItem>
            <MenuItem onClick={navigationHandler.bind(null, '/auth/register')}>Register</MenuItem>
        </>}
        {isAuthenticated && <>
            <MenuItem onClick={navigationHandler.bind(null, '/profile')}>Profile</MenuItem>
        </>}
        <MenuItem onClick={navigationHandler.bind(null, '/cart')}>View Cart</MenuItem>
    </Menu>
  )
}

export default LinkMenu