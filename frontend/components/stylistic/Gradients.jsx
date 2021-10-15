import React from 'react';
import { Box } from '@mui/material';

const Gradients = ({}) => {
    return (
        <>
        <Box sx={{ position: 'absolute', right: '-450px', top: '0' }}>
            <svg width="800" height="502" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.4">
                <circle cx="400" cy="102" r="400" fill="url(#heroglow_paint0_radial)" fillOpacity=".6" />
                <circle cx="209" cy="289" r="170" fill="url(#heroglow_paint1_radial)" fillOpacity=".4" />
                <defs>
                <radialGradient id="heroglow_paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 149 251) scale(315.089)">
                    <stop stopColor="#3ABAB4" />
                    <stop offset="1" stopColor="#3ABAB4" stopOpacity=".01" />
                </radialGradient>
                <radialGradient id="heroglow_paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -40 249) scale(133.913)">
                    <stop stopColor="#667EEA" />
                    <stop offset="1" stopColor="#667EEA" stopOpacity=".01" />
                </radialGradient>
                </defs>
            </svg>
        </Box>
        <Box sx={{ position: 'absolute', right: { xs: '-50px', sm: '-280px' }, top: { xs: '450px', sm: '150px' } }}>
            <svg width="678" height="634" viewBox="0 0 678 634" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.4">
                
                    <circle cx="240" cy="394" r="240" fill="url(#piphoneill_paint0_radial)" fillOpacity=".4" />
                    <circle cx="438" cy="240" r="240" fill="url(#piphoneill_paint1_radial)" fillOpacity=".6" />
                    <defs>
                    <radialGradient id="piphoneill_paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -77 317) scale(189.054)">
                        <stop stopColor="#667EEA" />
                        <stop offset="1" stopColor="#667EEA" stopOpacity=".01" />
                    </radialGradient>
                    <radialGradient id="piphoneill_paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 99 339) scale(189.054)">
                        <stop stopColor="#9F7AEA" />
                        <stop offset="1" stopColor="#9F7AEA" stopOpacity=".01" />
                    </radialGradient>
                    </defs>
            </svg>
        </Box>
        </>
    );
};

export default Gradients;