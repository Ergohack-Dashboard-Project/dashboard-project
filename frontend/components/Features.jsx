import { Box, Grid, Typography, Container } from '@mui/material';

const Features = ({}) => {
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
        <Box
            sx={{
                textAlign: 'center'
                , maxWidth: '768px'
            }}
        >
            <Typography variant='h2'>
                The next evolution in crypto ecosystem solutions
            </Typography>

            <Typography
                variant='subtitle1'
            >
                We help grassroots projects build the global financial future, creating products 
                that enable ordinary people to take part in commerce, without limitation. We believe 
                in private money.
            </Typography>

            <Typography
                variant='subtitle1'
            >
                Here are just a few of the services we can offer:
            </Typography>
        </Box>

        <Grid container spacing={1} sx={{ pt: 10 }}>
            <Grid item xs={12} sm={7}>
                
            </Grid>
            <Grid item xs={12} sm={5}>
                
            </Grid>
        </Grid>
        </Box>
    </Box>
    </>
  );
};

export default Features;