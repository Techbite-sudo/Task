import { Stack, Typography, styled, useMediaQuery, useTheme } from "@mui/material"

const OverallContainer = styled('div')(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    borderRadius: '12px',
    [theme.breakpoints.down('md')]: {
      padding: '24px 16px'
    }
}))

const TextSection = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (isSmallScreen) return (
    <Stack>
      <OverallContainer>
          <Typography color='white' fontWeight='600' lineHeight={1} variant="h5" textAlign='center'>Get A Discount On Your First Booking</Typography>
      </OverallContainer>

      <OverallContainer sx={{ backgroundColor: 'primary.main' }}>
        <Typography color='white' fontWeight='600' lineHeight={1} variant="h5" textAlign='center'>Discover Some Fun Safaris</Typography>
      </OverallContainer>
    </Stack>
  )

  return (
    <OverallContainer>
        <Stack sx={{ px: 4, flex: 2 }} alignItems='center'>
            <Typography color='white' fontWeight='600' lineHeight={1} variant="h4">Get A Discount On Your First Booking</Typography>
        </Stack>
        <Stack alignItems='center' sx={{ backgroundColor: 'primary.main', flex: 1, height: '100%', p: 5 }}>
            <Typography color='white' fontWeight='600' variant="h6">Discover Some Fun Safaris</Typography>
        </Stack>
        <div style={{ flex: 0.5 }} />
    </OverallContainer>
  )
}

export default TextSection