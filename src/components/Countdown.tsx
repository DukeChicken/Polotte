import Count from 'react-countdown';
import { Box } from '@mui/material';
import ClockIcon from './ClockIcon';

const d = new Date();
d.setDate(d.getDate() + 1);
d.setHours(0, 0, 0);
d.setMilliseconds(0);

const Countdown = () => {
  return (
    <Box
      sx={{
        background: 'rgba(203, 215, 255, 0.05)',
        padding: '6px 10px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        svg: {
          width: 18,
          fill: '#fff',
          mr: 1,
        },
      }}
    >
      <ClockIcon />
      <Count date={d} />
    </Box>
  );
};

export default Countdown;
