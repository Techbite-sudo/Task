import { styled } from "@mui/material";
import { ReactNode } from "react";

const ContentContainer = styled('div')(({ theme }) => ({
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    [theme.breakpoints.down('md')]: {
       padding: '12px'
    }
}));

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ContentContainer>
        {children}
    </ContentContainer>
  )
}

export default MainLayout