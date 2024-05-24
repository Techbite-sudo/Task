import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import MainLayout from "../../layouts";
import ProfileSection from "../../sections/profile/profile-section"

const ProfilePage = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <MainLayout>
        <Stack gap={3} sx={{ ...(!isSmallScreen && { p: 2 }) }}>
          <Typography variant='h4' color='secondary' fontWeight='600' textAlign='center'>Profile</Typography>

          <ProfileSection />
        </Stack>
      </MainLayout>
    </>
  )
}

export default ProfilePage