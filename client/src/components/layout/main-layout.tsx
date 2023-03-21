import { Box } from '@mui/material';
import React from 'react';
import { Footer } from '../footer/Footer';
import { Navbar } from '../navbar/Navbar';

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <Box display='flex' flexDirection='column' sx={{ minHeight: '100vh' }}>
      <Box flex='1 0 auto'>
        <Navbar />
      </Box>
      <Box>{props.children}</Box>
      <Box flexShrink='0'>
        <Footer />
      </Box>
    </Box>
  );
}
