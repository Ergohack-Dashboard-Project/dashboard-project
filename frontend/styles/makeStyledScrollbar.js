const makeStyledScrollbar = (theme, barWidth = '10px') => ({
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.paper,
  },
  '&::-webkit-scrollbar': {
    width: barWidth,
    // height: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: barWidth,
  },
});

export default makeStyledScrollbar;
