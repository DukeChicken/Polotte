import { useEffect, useReducer, useCallback, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { Box, Container, Grid, Typography } from '@mui/material';
import Address from '../components/Address';
import box1 from '../assets/box1.jpeg';
import box2 from '../assets/box2.jpeg';
import contractABI from '../artifact/ABI.json';
import Countdown from '../components/Countdown';
import Sidebar from '../components/Sidebar';
import Loot from '../components/Loot';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

const CONTRACT = '0xA9Cc341A6DA273151d33756601dCe7375b92b002';

const Dashboard = () => {
  const [address, setAddress] = useState('');
  const [connected, setConntected] = useState(false);
  const [balance, setBalance] = useState<number>();
  const [tab, setTab] = useState('0');
  const [group1, setGroup1] = useState(0);
  const [group2, setGroup2] = useState(0);

  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    const web3Modal = new Web3Modal({ cacheProvider: true });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const contract = new ethers.Contract(CONTRACT, contractABI, signer);
    const balance = await contract.getBalance();

    const group1Num = await contract.noOfGroup1();
    const group2Num = await contract.noOfGroup2();

    // noOfGroup1
    // noOfGroup2

    setBalance(parseInt(balance._hex));
    setGroup1(parseInt(group1Num._hex));
    setGroup2(parseInt(group2Num._hex));
    setAddress(address);
    setConntected(true);
  };

  const gamble = async (poolNum: number) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT, contractABI, signer);
    // console.log(contract);

    const price = ethers.utils.parseUnits('0.01', 'ether');
    let transaction;
    if (poolNum === 0) {
      transaction = await contract.enterPool1({ value: price });
    } else {
      transaction = await contract.enterPool2({ value: price });
    }

    setTab('2');

    // console.log(transaction);
  };

  if (!connected) {
    return null;
  }

  return (
    <TabContext value={tab}>
      <Container>
        <Address>
          {address.slice(0, 5) +
            '...' +
            address.slice(address.length - 4, address.length)}
        </Address>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <Sidebar />

          <TabPanel value="0" sx={{ flex: '1 1 100%' }}>
            <Loot total={balance} onClick={() => setTab('1')} />
          </TabPanel>

          <TabPanel value="1" sx={{ flex: '1 1 100%' }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Countdown />
              </Box>

              <Typography
                sx={{
                  padding: '12px 0px 24px',
                  color: 'rgb(255, 255, 193)',
                  textShadow: 'rgb(255 93 0) 0px 0px 10px',
                  fontSize: '46px',
                  fontFamily: '"Geogrotesque Wide", sans-serif',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  mb: 1,
                }}
              >
                Pick your loot
              </Typography>

              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <Box
                    onClick={() => gamble(0)}
                    sx={{
                      padding: '6px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(203, 215, 255, 0.18)',
                      cursor: 'pointer',
                      transition:
                        'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
                      img: { width: '100%', borderRadius: '8px' },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <img src={box1.src} />

                    <Box sx={{ p: {} }}>
                      <p>
                        {group1} user{group1 > 1 ? 's' : ''}
                      </p>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    onClick={() => gamble(1)}
                    sx={{
                      padding: '6px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(203, 215, 255, 0.18)',
                      cursor: 'pointer',
                      transition:
                        'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
                      img: { width: '100%', borderRadius: '8px' },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <img src={box2.src} />
                    <Box sx={{ p: {} }}>
                      <p>
                        {group2} user{group1 === 1 ? '' : 's'}
                      </p>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value="2" sx={{ flex: '1 1 100%' }}>
            <Typography
              sx={{
                fontSize: '36px',
                fontFamily: '"Geogrotesque Wide", sans-serif',
                fontWeight: 600,
              }}
            >
              You have successfully entered the lottery!
            </Typography>
          </TabPanel>
        </Box>
      </Container>
    </TabContext>
  );
};

export default Dashboard;
