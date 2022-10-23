import { Box } from '@mui/material';

const Address = (props: any) => {
  return (
    <Box
      sx={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-end' }}
    >
      <Box
        sx={{
          // background: 'rgba(203, 215, 255, 0.075)',
          padding: '6px 10px',
          borderRadius: '50px',
          fontWeight: 800,
          fontSize: 14,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Address;
