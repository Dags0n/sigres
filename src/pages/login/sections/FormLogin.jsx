import { styled, Box, TextField } from "@mui/material";
import React from "react";

function FormTextField({ label, type }) {
  return (
    <Box sx={{ width: { xs: '90%', md: '80%' }, marginBottom: 2 }}>
      <StyledTextField fullWidth type={type} size='small' label={label} id={label} required />
    </Box>
  );
}

const StyledButton = styled('button')(({ theme }) => ({
  fontFamily: 'Poppins',
  padding: '0.5rem',
  marginTop: '1rem',
  backgroundColor: '#2E2E48',
  color: 'white',
  border: 'none',
  borderRadius: '0.4rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#2E2E65',
    transform: 'scale(1.04)',
    transition: 'all 0.5s',
  },
  [theme.breakpoints.down('lg')]: {
    width: '90%',
  },
  [theme.breakpoints.up('md')]: {
    width: '80%',
  },
}))

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: 'gray',
    fontFamily: 'Poppins',
    '&.Mui-focused': {
      color: '#2E2E48',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid light',
      borderRadius: '0.4rem',
    },
    '&:hover fieldset': {
      borderColor: '#2E2E65',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2E2E65',
    },
  },
});

const DivInput = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
})

const FormLogin = () => {
  return (
    <form method="post" action="/login" style={{ marginTop: 20 }}>
      <DivInput>
        <FormTextField label="Email" type="email" />
      </DivInput>
      <DivInput>
        <FormTextField label="Senha" type="password" />
      </DivInput>
      <DivInput>
        <StyledButton type="submit">ENTRAR</StyledButton>
      </DivInput>
    </form>
  )
}

export default FormLogin