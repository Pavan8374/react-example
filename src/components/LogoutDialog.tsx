import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const LogoutDialog = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '400px',
          backgroundColor: theme.palette.background.paper,
          borderRadius: '16px',
          boxShadow: `0px 4px 20px ${theme.palette.grey[500]}`,
        },
      }}
    >
      {/* Custom Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <WarningIcon sx={{ marginRight: 1 }} />
          Confirm Logout
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'inherit' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent
        sx={{
          textAlign: 'center',
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LogoutIcon
          sx={{
            fontSize: '4rem',
            color: theme.palette.warning.main,
            mb: 2,
          }}
        />
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to logout? <br />
          You will need to log in again to access your account.
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          justifyContent: 'space-around',
          pb: 3,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={onClose}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            width: '120px',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            width: '120px',
            boxShadow: `0px 4px 10px ${theme.palette.error.main}`,
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
