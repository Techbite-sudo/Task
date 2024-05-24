import { SnackbarProvider } from "notistack";
import ThemeProvider from "./utils/theme"
import { NextUIProvider } from "@nextui-org/system";
import Router from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AuthContextProvider from "./auth/auth-context";
import "react-phone-input-2/lib/style.css";
import AppContextProvider from "./contexts/app-context";

function App() {

  return (
    <AuthContextProvider>
      <AppContextProvider>
        <ThemeProvider>
          <NextUIProvider>
            <SnackbarProvider autoHideDuration={3000} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Router />
              </LocalizationProvider>
            </SnackbarProvider>
          </NextUIProvider>
        </ThemeProvider>
      </AppContextProvider>
    </AuthContextProvider>
  )
}

export default App
