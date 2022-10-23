import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import doggo from '../assets/doggo.png';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const web3Modal = new Web3Modal();

    if (web3Modal.cachedProvider !== '') {
      connect();
    }
  }, []);

  const connect = async () => {
    const web3Modal = new Web3Modal({ cacheProvider: true });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const { chainId } = await provider.getNetwork();
    if (chainId !== 80001) {
      console.error(
        'Unable to connect to the wallet. Make sure you are on the Mumbai Testnet'
      );
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <Box sx={{ padding: '120px 0' }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'rgb(31, 35, 48)',
            backgroundPosition: 'bottom right',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            // backgroundImage:
            //   'url(http://gigaland.on3-step.com/img/background/2.jpg)',
            borderRadius: '8px',
            padding: '48px',
            position: 'relative',
          }}
        >
          <Box>
            <Typography
              sx={{
                textTransform: 'uppercase',
                color: 'rgb(255, 255, 255)',
                fontSize: '32px',
                fontFamily: '"Geogrotesque Wide", sans-serif',
                fontWeight: 800,
                fontStyle: 'italic',
              }}
            >
              Welcome To Polotte
            </Typography>
            <Typography
              sx={{
                padding: '12px 0px 24px',
                color: 'rgb(177, 182, 198)',
                fontSize: '14px',
                fontFamily: '"Geogrotesque Wide", sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                maxWidth: 560,
              }}
            >
              The ideal gambling platform for those who prefer to bet with
              Bitcoin and other crypto currencies. Our players can take
              advantage of all the perks enabled by crypto gambling and enjoy
              the features that make an online casino worth joining. Our users
              can be sure that their information is safe and secure. To get
              started, connect your MetaMask wallet.
            </Typography>
            <Box>
              <Button
                onClick={connect}
                sx={{
                  textTransform: 'uppercase',
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
                Connect Wallet
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              img: { width: '280px' },
            }}
          >
            <img src={doggo.src} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
