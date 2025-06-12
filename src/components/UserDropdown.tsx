'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Avatar,
  Typography,
  MenuList,
  MenuItem,
  ClickAwayListener
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export function UserDropdown({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => setOpen(prev => !prev);
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current?.contains(event.target as Node)) return;
    setOpen(false);
  };

  // Close on scroll (good UX on mobile)
  useEffect(() => {
    const handleScroll = () => setOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        variant="text"
        endIcon={<PersonIcon sx={{ color: '#d1d5db' }} />}
        sx={{
          textTransform: 'none',
          fontWeight: 500,
          color: '#d1d5db',
          px: 2,
          py: 1,
          borderRadius: 2,
          '&:hover': {
            backgroundColor: '#374151',
            color: 'white',
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          },
        }}
      >
        {user.username}
      </Button>

      {open && (
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            elevation={4}
            sx={{
              position: 'absolute',
              top: '100%',
              right: 0,
              mt: 1,
              minWidth: 240,
              maxWidth: '90vw',
              zIndex: 1300,
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              <Avatar 
                alt={user.username} 
                src={user.avatarUrl || ''} 
                sx={{ 
                  width: 40, 
                  height: 40,
                  backgroundColor: '#6366f1',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <MenuList>
              <MenuItem
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                sx={{
                  py: 1.5,
                  px: 2,
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
