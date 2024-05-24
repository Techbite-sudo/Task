import { Alert, Box, IconButton, InputAdornment, Link, Stack, styled, Typography, useTheme } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup'
import { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/auth-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import GuestGuard from "../../auth/GuestGuard";
import AuthLayout from "../../layouts/auth";
import RHFDatePicker from "../../components/hook-form/RHFDatePicker";

const PasswordValidatorContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: '10px',
  gap: 12,
}))

const RegisterPage = () => {

    const { register } = useAuthContext();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<number>(1);
    const theme = useTheme();
    const COLORS = [theme.palette.error.main, theme.palette.warning.main, theme.palette.success.main];

    const atLeastOneUppercase = /[A-Z]/g;
    const atLeastOneLowercase = /[a-z]/g;
    const atLeastOneNumeric = /[0-9]/g;
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
    const eightCharsOrMore= /.{8,}/g;

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().required('Email Address is required').email('Please enter a valid email address'),
        dateOfBirth: Yup.date().required('Date of birth is required'),
        role: Yup.string().required('Role is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = { firstName: '', lastName: '', email: '', password: '', dateOfBirth: new Date(), role: '' };

    const methods = useForm({ resolver: yupResolver(RegisterSchema), defaultValues });

    const { setError, handleSubmit, watch, getValues, formState: { errors, isSubmitting } } = methods;

    const watchPassword = watch('password');

    const onSubmit = async (data: { email: string, password: string }) => {
        try {
          if (data.password.match(atLeastOneSpecialChar)) {
            setError('password', { message: 'The password should not contain a special character' });
            return
          }
          if (passwordStrength < 3) {
            setError('root', { message: 'Please enter a strong password consisting of minimum 8 characters with uppercase and lowercase letters included' })
          }
          await register(data);
        } catch (error: any) {
          setError('root', { ...error, message: error.message || error, });
        }
    }

    useEffect(() => {
      const passwordValue = getValues('password');
      if (!passwordValue.match(eightCharsOrMore)) {
          setPasswordStrength(1);
      } else if (passwordValue.match(eightCharsOrMore) && (!passwordValue.match(atLeastOneUppercase) || !passwordValue.match(atLeastOneLowercase) || !passwordValue.match(atLeastOneNumeric))) {
          setPasswordStrength(2);
      } else if (passwordValue.match(eightCharsOrMore) && passwordValue.match(atLeastOneUppercase) && passwordValue.match(atLeastOneLowercase) && passwordValue.match(atLeastOneNumeric)) {
          setPasswordStrength(3);
      }
  }, [watchPassword])
    
  return (
    <GuestGuard>
      <AuthLayout>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
                <Typography textAlign='center'>Get Started!</Typography>
                {!!errors.root && <Alert severity="error">{errors.root.message}</Alert>}
                <RHFTextField required name='firstName' label="First Name" placeholder="First Name" />
                <RHFTextField required name='lastName' label="Last Name" placeholder="Last Name" />
                <RHFTextField required name='email' label="Email Address" placeholder="Email Address" type='email' />
                <RHFDatePicker required name='dateOfBirth' disableFuture label="Date Of Birth" />
                <RHFTextField required name='role' label="Role" placeholder="Role" />
                <RHFTextField
                    required
                    name="password"
                    label="Password"
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />

                <PasswordValidatorContainer>
                    {COLORS.filter((_, index) => index + 1 <= passwordStrength).map((_, ind) => (
                        <Box key={ind} sx={{ height: '100%', flex: 1, backgroundColor: COLORS[passwordStrength - 1], borderRadius: 100 }}></Box>
                    ))}
                </PasswordValidatorContainer>

                <LoadingButton loading={isSubmitting} startIcon={<Login />} type="submit" variant='contained'>Create Account</LoadingButton>
                <Typography variant='body2'>Already have an account? <Link component={RouterLink} to='/auth/login'>Login</Link></Typography>
            </Stack>
        </FormProvider>
      </AuthLayout>
    </GuestGuard>
        
  )
}

export default RegisterPage