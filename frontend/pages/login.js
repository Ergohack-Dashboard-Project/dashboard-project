import Link from '@components/MuiNextLink';
import { Button, Container, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, styled } from '@mui/system';
import React, { useState } from "react";
import { connect } from "react-redux";
import { Actions as authActions, FETCHING_USER_FROM_TOKEN_SUCCESS } from "../redux/auth";
import validation from "../utils/validation";
import makeGlassBg from 'styles/makeGlassStyle';

const LoginForm = ({ user, authError, isLoading, isAuthenticated, requestUserLogin }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }))
  }

  const handleInputChange = (label, value) => {
    validateInput(label, value)

    setForm((form) => ({ ...form, [label]: value }))
  }

/*   const navigate = useNavigate()

  // if the user is already authenticated, redirect them to the "/profile" page
  React.useEffect(() => {
    if (user?.email && isAuthenticated) {
      navigate("/profile")
    }
  }, [user, navigate, isAuthenticated])
 */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]))
    // if any input hasn't been entered in, return early
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({ ...errors, form: `You must fill out all fields.` }))
      return
    }

    setHasSubmitted(true)

    const action = await requestUserLogin({ email: form.email, password: form.password })
    // reset the password form state if the login attempt is not successful
    if (action?.type !== FETCHING_USER_FROM_TOKEN_SUCCESS) {
      setForm(form => ({ ...form, password: "" }))
    }
  }

  const getFormErrors = () => {
    const formErrors = []
    if (authError && hasSubmitted) {
      formErrors.push(`Invalid credentials. Please try again.`)
    }
    if (errors.form) {
      formErrors.push(errors.form)
    }
    return formErrors
  }

  return (
    <Container maxWidth='md' sx={rootStyles}>
      <Box 
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <GlassContainer>
          <Typography align='center' variant='h5' sx={titleStyles}>
            Log in to your <span>dashboard</span> account
          </Typography>
          {/* Email INPUT */}
          <TextField
            id='email'
            label='Email'
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            name='email'
            fullWidth
            sx={{ mb: 2, }}
          />
          {/* PASSWORD INPUT */}
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id='password'
              type={values.showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
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
      </Box>
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

/* // react-hook-form + mui
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
}; */

const mapStateToProps = (state) => ({
  authError: state.auth.error,
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch) => ({
  requestUserLogin: ({ email, password }) => dispatch(authActions.requestUserLogin({ email, password }))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)