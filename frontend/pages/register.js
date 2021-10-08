import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Register = () => {
  const router = useRouter();
  return (
    <Container align='center' sx={{ pt: 10 }}>
      <Typography>This is Register Page</Typography>
      <Button onClick={() => router.push('/login')}>Back To Login</Button>
    </Container>
  );
};

export default Register;
