// src/components/PageBackground/index.tsx
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface PageBackgroundProps {
  children: React.ReactNode;
  variant?: 'admin' | 'adminLight' | 'adminDark' | 'adminGradient' | 'adminMesh';
  sx?: SxProps<Theme>;
}

const getBackgroundStyles = (variant: string, theme: Theme) => {
  const styles: { [key: string]: any } = {
    admin: {
      backgroundColor: theme.palette.mode === 'light' ? '#f5f6fa' : '#1a1c27',
      backgroundImage: `linear-gradient(${theme.palette.primary.main}15 1px, transparent 1px),
        linear-gradient(to right, ${theme.palette.primary.main}15 1px, ${theme.palette.mode === 'light' ? '#f5f6fa' : '#1a1c27'} 1px)`,
      backgroundSize: '20px 20px',
    },
    adminLight: {
      background: theme.palette.mode === 'light' ? '#ffffff' : '#1a1c27',
      backgroundImage: `
        radial-gradient(at 90% 10%, ${theme.palette.primary.light}20 0px, transparent 50%),
        radial-gradient(at 10% 90%, ${theme.palette.secondary.light}20 0px, transparent 50%)
      `,
    },
    adminDark: {
      backgroundColor: theme.palette.mode === 'light' ? '#f0f2f5' : '#111827',
      backgroundImage: `
        linear-gradient(60deg, ${theme.palette.primary.main}08 25%, transparent 25.5%, transparent 75%, ${theme.palette.primary.main}08 75%, ${theme.palette.primary.main}08),
        linear-gradient(120deg, ${theme.palette.primary.main}08 25%, transparent 25.5%, transparent 75%, ${theme.palette.primary.main}08 75%, ${theme.palette.primary.main}08)
      `,
      backgroundSize: '40px 40px',
    },
    adminGradient: {
      background: theme.palette.mode === 'light'
        ? `linear-gradient(135deg, #f5f7fa 0%, #f7f9fc 100%)`
        : `linear-gradient(135deg, #1a1c27 0%, #232635 100%)`,
      backgroundImage: `
        linear-gradient(${theme.palette.primary.main}05 2px, transparent 2px),
        linear-gradient(90deg, ${theme.palette.primary.main}05 2px, transparent 2px)
      `,
      backgroundSize: '40px 40px',
    },
    adminMesh: {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1a1c27',
      backgroundImage: `
        linear-gradient(${theme.palette.primary.main}10 1.5px, transparent 1.5px),
        linear-gradient(to right, ${theme.palette.primary.main}10 1.5px, ${theme.palette.mode === 'light' ? '#ffffff' : '#1a1c27'} 1.5px)
      `,
      backgroundSize: '30px 30px',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(at 100% 0%, ${theme.palette.primary.main}15 0px, transparent 50%),
          radial-gradient(at 0% 100%, ${theme.palette.secondary.main}15 0px, transparent 50%)
        `,
        pointerEvents: 'none',
      },
    },
  };

  return styles[variant] || styles.admin;
};

export const PageBackground: React.FC<PageBackgroundProps> = ({
  children,
  variant = 'admin',
  sx = {},
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background-color 0.3s ease',
        ...getBackgroundStyles(variant, theme),
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'transparent',
          zIndex: 0,
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageBackground;