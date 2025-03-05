import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#4000ff', py: 2, color: 'white', display: 'flex', justifyContent: 'center' }}>
      <Typography variant="caption" sx={{ color: 'white', textAlign: 'center' }}>
        Created By Shishir Thakur <br />
        Under the Guidance of <br />
        <a
          href="https://www.agarkarmedia.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', color: 'white' }}
        >
          AgarkarMedia Pvt. Ltd.
        </a>{' '}
        <br />
        &copy; 2023 - 2024, All rights reserved.
      </Typography>
    </Box>
  );
}
