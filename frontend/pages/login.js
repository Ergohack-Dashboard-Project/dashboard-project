import Link from '@components/MuiNextLink';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { motion } from 'framer-motion';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import makeGlassBg from 'styles/makeGlassStyle';

const LoginPage = () => {
  // React Hook Form Setup
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // HANDLE FORM SUBMISSION HERE
  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth='md' sx={rootStyles}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <GlassContainer>
          <Typography align='center' variant='h5' sx={titleStyles}>
            Log in to your <span>ERGODASH</span> account
          </Typography>
          {/* USER NAME INPUT */}
          <ControlledField
            label='USERNAME'
            value=''
            control={control}
            name='userID'
            fullWidth
            error={errors['userID']}
            fieldRules={{
              required: 'You must provide a user ID.',
            }}
          />
          {/* PASSWORD INPUT */}
          <ControlledField
            label='PASSWORD'
            value=''
            control={control}
            type='password'
            name='password'
            fieldRules={{
              required: 'You must provide a password.',
            }}
            error={errors['password']}
          />

          {/* ACTIONS */}
          <ActionsContainer>
            <Button type='submit' disableRipple>
              LOGIN
            </Button>

            <Link href='/register' sx={{ textDecoration: 'none' }}>
              <Button size='sm' color='secondary' disableRipple>
                I need to make an account
              </Button>
            </Link>
          </ActionsContainer>
        </GlassContainer>
      </form>
    </Container>
  );
};

// *****************************
// COMPONENTS & STYLES
// *****************************

const rootStyles = {
  height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const titleStyles = {
  '& span': {
    color: (theme) => theme.palette.primary.main,
  },
  fontWeight: 'bold',
  marginBottom: (theme) => theme.spacing(4),
};

// container for login form
const GlassContainer = styled('div')(({ theme }) => ({
  ...makeGlassBg(theme),
  padding: 20,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

// Actions (Buttons)
const ActionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  '& .MuiButton-root': {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: 'transparent',
    },
  },
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

// react-hook-form + mui
const ControlledField = ({
  label,
  value,
  control,
  name,
  fieldType,
  fieldRules,
  isMultiline,
  isDisabled = null,
  error,
}) => {
  return (
    <Box component={'div'} sx={{ width: '100%', p: 1 }}>
      <Controller
        render={({ field }) => (
          <TextField
            disabled={isDisabled}
            fullWidth
            multiline={isMultiline}
            variant='outlined'
            label={label}
            value={value}
            type={fieldType}
            {...field}
          />
        )}
        control={control}
        name={name}
        defaultValue={value}
        rules={fieldRules}
      />
      {error && (
        <Typography
          //   style={{ paddingLeft: '2rem' }}
          align='left'
          variant='body2'
          color='error'
        >
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default LoginPage;
