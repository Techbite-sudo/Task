import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { useAuthContext } from '../../auth/auth-context';
import { Logout } from '@mui/icons-material';


const ProfileSection = () => {
    const { user, logout } = useAuthContext();

  return (
    <>  
        <Card>
            <CardContent>
                <Stack gap={1}>
                    <Typography>Name: {user?.firstName} {user?.lastName}</Typography>
                    <Typography>Email Address: {user?.email}</Typography>
                    <Typography>Date Of Birth: {new Date(user?.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Typography>
                    <Typography>Role: {user?.role}</Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Button sx={{ width: 'fit-content' }} variant='outlined' startIcon={<Logout />} onClick={logout}>Logout</Button>
            </CardActions>
        </Card>
    </>
  )
}

export default ProfileSection