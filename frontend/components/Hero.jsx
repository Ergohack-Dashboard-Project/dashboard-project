import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Hero = ({ title, subtitle }) => {
    return ( 

        <Grid container spacing={1}>
                <Grid item xs={7}>
                    <Typography
                        variant="h1"
                        sx={{
                        color: "primary.main",
                        fontWeight: 400,
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        component="p"
                        variant="h3"
                        align="center"
                        color="secondary.main"
                        sx={{
                        mb: 10,
                        }}
                    >
                        {subtitle}
                    </Typography>
                </Grid>
                <Grid item xs={5}>

                </Grid>
        </Grid>
    );
}
 
export default Hero;