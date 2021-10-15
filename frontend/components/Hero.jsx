import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Hero = ({ title, subtitle }) => {
  return (
    <Grid container spacing={2} sx={{ pt: 10 }}>
      <Grid item xs={12} sm={7} sx={{ mb: 8 }}>
        <Typography variant='h1'>{title}</Typography>
        <Typography
          variant='subtitle1'
        >
          {subtitle}
        </Typography>
        <Typography
          variant='subtitle1'
        >
          Sign up to receive updates and be the first to invest in the ErgoPad token IDO and new projects.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={5}></Grid>
    </Grid>
  );
};

export default Hero;
