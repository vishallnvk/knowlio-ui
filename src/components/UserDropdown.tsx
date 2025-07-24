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
  ClickAwayListener,
  Divider
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

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
      <Box
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 3 },
          py: 2,
          cursor: 'pointer',
          borderRadius: 0,
          border: 'none',
          backgroundColor: 'transparent',
          transition: 'all 0.2s ease',
          minWidth: 0,
          maxWidth: { xs: '200px', sm: 'none' },
          '&:hover': {
            backgroundColor: '#f9fafb',
          },
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 500, 
            color: '#374151',
            fontSize: '0.95rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          {user.name || user.email}
        </Typography>
        <Avatar 
          alt={user.name || user.email} 
          src={user.avatarUrl || ''} 
          sx={{ 
            width: 36, 
            height: 36,
            backgroundColor: '#3b82f6',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            flexShrink: 0
          }}
        >
          {user.firstName && user.lastName 
            ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
            : user.name 
            ? user.name.charAt(0).toUpperCase() 
            : user.email?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
        <KeyboardArrowDownIcon sx={{ fontSize: 18, color: '#6b7280', flexShrink: 0 }} />
      </Box>

      {open && (
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            elevation={8}
            sx={{
              position: 'absolute',
              top: '100%',
              right: 0,
              mt: 1,
              width: 280,
              maxWidth: 'calc(100vw - 32px)',
              zIndex: 1300,
              border: '1px solid #e5e7eb',
              borderRadius: 0,
              transform: 'translateX(0)',
              '@media (max-width: 320px)': {
                width: 'calc(100vw - 32px)',
                right: '50%',
                transform: 'translateX(50%)',
              },
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 3,
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar 
                alt={user.name || user.email} 
                src={user.avatarUrl || ''} 
                sx={{ 
                  width: 48, 
                  height: 48,
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.25rem'
                }}
              >
                {user.firstName && user.lastName 
                  ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
                  : user.name 
                  ? user.name.charAt(0).toUpperCase() 
                  : user.email?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#111827' }}>
                  {user.name || user.email}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', wordBreak: 'break-word' }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <MenuList sx={{ py: 1 }}>
              <MenuItem
                sx={{
                  py: 2,
                  px: 3,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                  },
                }}
              >
                <PersonIcon sx={{ mr: 2, fontSize: 20, color: '#6b7280' }} />
                Profile Settings
              </MenuItem>
              <Divider sx={{ my: 1 }} />
              <MenuItem
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                sx={{
                  py: 2,
                  px: 3,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#dc2626',
                  '&:hover': {
                    backgroundColor: '#fef2f2',
                  },
                }}
              >
                <LogoutIcon sx={{ mr: 2, fontSize: 20, color: '#dc2626' }} />
                Sign Out
              </MenuItem>
            </MenuList>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
