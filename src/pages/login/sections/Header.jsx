import React from "react"
import { Grid2 as Grid, styled } from "@mui/material"
import LogoSigres from "../../../assets/logo.png"

const StyledImg = styled('img')({
  height: '100px',
  marginBottom: '1rem',
  objectFit: 'cover',
  borderRadius: '1rem 0 0 1rem',
})

const StyledH1 = styled('h1')({
  margin: '0',
  fontFamily: '"Press Start 2P", sans-serif',
  color: "#535353",
  textAlign: 'center',
})

const Header = () => {
  return (
    <Grid container>
      <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <StyledImg src={LogoSigres} alt="Imagem" />
      </Grid>
      <Grid size={12}>
        <StyledH1>SIG</StyledH1>
        <StyledH1>Res</StyledH1>
      </Grid>
    </Grid>
  )
}

export default Header