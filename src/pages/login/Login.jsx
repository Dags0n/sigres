import React from "react";
import { Grid2 as Grid, styled } from "@mui/material";
import Form from "./sections/FormLogin";
import Header from "./sections/Header";
import LogoSigres from "../../assets/login-img.png";

const StyledDivBackground = styled('div')({
  backgroundColor: '#EEEEEE',
  minHeight: '100vh',
})

const StyledDivLogin = styled('div')(({ theme }) => ({
  background: 'linear-gradient(to bottom, #fff 65%, rgba(46, 46, 72, 0.4))',
  padding: '1rem',
  borderRadius: '1rem',
  marginTop: '1rem',
  marginBottom: '1rem',
  minHeight: '80vh',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '85%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '65%',
  },
}))

const DivImagem = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Title = styled('h1')({
  margin: '0',
  fontFamily: '"Press Start 2P", sans-serif',
  color: "white",
  textAlign: 'center',
});

const Acronym = styled('h2')({
  margin: '0',
  maxWidth: '200px',
  fontSize: '12px',
  fontFamily: 'Poppins',
  color: "lightgray",
  opacity: '0.5',
  textAlign: 'center',
});

const SubTitle = styled('Typography')({
  fontFamily: 'Poppins',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: 'white',
  opacity: '0.8',
  textAlign: 'center',
});

const Login = () => {
  return (
    <StyledDivBackground>
      <Grid
        container
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid
          size={5}
          sx={{
            minHeight: '100vh',
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2E2E48'
          }}
        >
          <DivImagem>
            <Title>SIGRes</Title>
            <Acronym>Sistema Integrado de Gerenciamento de Restaurantes</Acronym>
            <img src={LogoSigres} alt="Logo SigRes" style={{ width: '200px', margin: '3rem 0' }} />
            <SubTitle variant='h2' component='div'>De garçom para garçom!</SubTitle>
          </DivImagem>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 7 }}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <StyledDivLogin>
            <Grid container>
              <Grid size={12}>
                <Header />
              </Grid>
              <Grid size={12}>
                <Form />
              </Grid>
            </Grid>
          </StyledDivLogin>
        </Grid>
      </Grid>
    </StyledDivBackground>
  )
}

export default Login