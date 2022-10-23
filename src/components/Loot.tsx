import { Box, Button, Typography } from '@mui/material';
import chest from '../assets/chest.webp';

const Loot = ({ total, onClick }: { total?: number; onClick: any }) => {
  if (total === undefined) {
    return null;
  }

  return (
    <Box sx={{ padding: '26px 30px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            color: 'rgb(255, 255, 193)',
            textShadow: 'rgb(255 93 0) 0px 0px 10px',
            fontSize: '46px',
            fontFamily: '"Geogrotesque Wide", sans-serif',
            fontWeight: 800,
            fontStyle: 'italic',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          MAT {(total / Math.pow(10, 18)).toLocaleString()}
        </Typography>
        <Typography
          sx={{
            color: 'rgb(255, 255, 193)',
            textShadow: 'rgb(255 93 0) 0px 0px 10px',
            fontSize: '20px',
            fontFamily: '"Geogrotesque Wide", sans-serif',
            fontWeight: 600,
            fontStyle: 'italic',
            textTransform: 'uppercase',
            textAlign: 'center',
            pl: 2,
          }}
        >
          For YOU to win!
        </Typography>
      </Box>
      <Box
        sx={{
          my: 4,
          textAlign: 'center',
          img: { maxWidth: 200 },
        }}
      >
        <img src="https://i.pinimg.com/originals/45/2c/62/452c62a7ffdd5124faa568a870ee9ea4.png" />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={onClick}
          sx={{
            textTransform: 'uppercase',
            width: 300,
            height: '48px',
            padding: '0px 24px',
            color: 'rgb(20, 23, 34)',
            background: 'rgb(255, 232, 26)',
            boxShadow:
              'rgb(255 176 25 / 40%) 0px 0px 10px, rgb(255 255 255 / 20%) 0px 1px 0px inset, rgb(0 0 0 / 15%) 0px -3px 0px inset, rgb(255 135 25) 0px 0px 15px inset',
            '&:hover': {
              filter: 'brightness(110%)',
              background: 'rgb(255, 232, 26)',
              color: 'rgb(20, 23, 34)',
              boxShadow:
                'rgb(255 176 25 / 40%) 0px 0px 10px, rgb(255 255 255 / 20%) 0px 1px 0px inset, rgb(0 0 0 / 15%) 0px -3px 0px inset, rgb(255 135 25) 0px 0px 15px inset',
            },
          }}
        >
          Play
        </Button>
      </Box>
    </Box>
  );
};

export default Loot;
