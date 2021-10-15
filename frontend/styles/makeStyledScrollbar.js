const makeStyledScrollbar = (theme, barWidth = '10px') => ({
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar': {
    width: barWidth,
    // height: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.secondary.main,
    borderRadius: barWidth,
  },
});

export default makeStyledScrollbar;
