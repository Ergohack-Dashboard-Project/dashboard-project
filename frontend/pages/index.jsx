import Features from '@components/Features';
import Hero from '@components/Hero';
import { Typography } from '@mui/material';

const Homepage = () => {
  return (
    <>
      <Hero
        title='Welcome to ErgoPad'
        subtitle='We are a token launch platform for Ergo giving you an opportunity to get in on the ground floor with Ergo token IDOs. We help projects navigate Ergoscript to build safe apps for you to invest in.'
      />

      <Features />

    </>
  );
};

export default Homepage;
