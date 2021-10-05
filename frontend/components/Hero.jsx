import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Hero = ({ title, subtitle }) => {
    return ( 

        <Grid container spacing={1} sx={{ pt: 10 }}>
                <Grid item xs={12} sm={7}>
                    <Typography
                        variant="h1"
                        sx={{
                        color: "primary.main",
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        component="p"
                        variant="h6"
                        color="secondary.main"
                        sx={{
                        mb: 10,
                        }}
                    >
                        {subtitle}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>

                </Grid>
        </Grid>
    );
}
 
export default Hero;