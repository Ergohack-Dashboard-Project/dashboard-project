import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import React from 'react';

const Blur = styled('svg')(({ theme }) => ({
  //   paddingTop: '2000px',
  position: 'absolute',
  right: '-45vw',
  top: '-15vh',
  zIndex: -1,
}));

const Aurora = () => {
  const auroraVariants = {
    hidden: {
      x: 500,
      transition: {
        //   duration: 0.7,
        //   type: 'spring',
        type: 'tween',
        when: 'afterChildren',
        staggerChildren: 0.1,
      },
    },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
        when: 'beforeChildren',
        staggerChildren: 0.15,
      },
    },
  };

  const sphereVariants = {
    hidden: {
      x: '25vw',
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Blur
      variants={auroraVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      as={motion.svg}
      width='100vw'
      height='80vh'
      viewBox='0 0 372 483'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <motion.g variants={sphereVariants} filter='url(#filter0_f)'>
        <ellipse cx='256' cy='156' rx='116' ry='103' fill='url(#paint0_radial)' />
      </motion.g>
      <motion.g variants={sphereVariants} filter='url(#filter1_f)'>
        <ellipse cx='140.5' cy='349.5' rx='60.5' ry='53.5' fill='url(#paint1_radial)' />
      </motion.g>
      <motion.g variants={sphereVariants} filter='url(#filter2_f)'>
        <ellipse cx='172' cy='237.5' rx='75' ry='66.5' fill='url(#paint2_radial)' />
      </motion.g>
      <motion.g variants={sphereVariants} filter='url(#filter3_f)'>
        <ellipse cx='283' cy='321.5' rx='111' ry='98.5' fill='url(#paint3_radial)' />
      </motion.g>
      <defs>
        <filter
          id='filter0_f'
          x='69'
          y='-18'
          width='374'
          height='348'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='35.5' result='effect1_foregroundBlur' />
        </filter>
        <filter
          id='filter1_f'
          x='0'
          y='216'
          width='281'
          height='267'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='40' result='effect1_foregroundBlur' />
        </filter>
        <filter
          id='filter2_f'
          x='26'
          y='100'
          width='292'
          height='275'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='35.5' result='effect1_foregroundBlur' />
        </filter>
        <filter
          id='filter3_f'
          x='123'
          y='174'
          width='320'
          height='295'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='24.5' result='effect1_foregroundBlur' />
        </filter>
        <radialGradient
          id='paint0_radial'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(256 156) rotate(108.667) scale(312.436 351.869)'
        >
          <stop stopColor='#234244' />
          <stop offset='0.790936' stopColor='#378489' stopOpacity='0' />
        </radialGradient>
        <radialGradient
          id='paint1_radial'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(140.5 349.5) rotate(108.738) scale(162.353 183.441)'
        >
          <stop stopColor='#234244' />
          <stop offset='0.790936' stopColor='#378489' stopOpacity='0' />
        </radialGradient>
        <radialGradient
          id='paint2_radial'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(172 237.5) rotate(100.423) scale(259.787 292.907)'
        >
          <stop stopColor='#282F42' />
          <stop offset='0.790936' stopColor='#378489' stopOpacity='0' />
        </radialGradient>
        <radialGradient
          id='paint3_radial'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(283 321.5) rotate(100.415) scale(384.787 433.514)'
        >
          <stop stopColor='#3A3450' />
          <stop offset='0.790936' stopColor='#378489' stopOpacity='0' />
        </radialGradient>
      </defs>
    </Blur>
  );
};

export default Aurora;
