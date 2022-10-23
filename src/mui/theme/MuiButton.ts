declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export const MuiButton = {
  defaultProps: {
    color: 'secondary',
    disableElevation: true,
    variant: 'contained',
  },
  styleOverrides: {
    root: {
      borderRadius: '8px',
      '&.Mui-disabled': {
        opacity: 0.5,
      },
      '&:hover': {
        background: 'unset',
        color: 'unset',
        boxShadow: 'unset',
      },
      fontFamily: '"Geogrotesque Wide", sans-serif',
      fontWeight: 800,
      fontStyle: 'normal',
      fontSize: '14px',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      userSelect: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.1s ease 0s',
      appearance: 'none',
      border: 'none',
    },
  },
};
