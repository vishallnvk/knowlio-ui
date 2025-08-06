"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SupportRequestForm from "./SupportRequestForm";
import { SupportModalProps, SupportFormData } from "./types";

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (data: SupportFormData) => {
    // Placeholder for future API integration
    console.log("Support request submitted:", data);
    
    // Show success message or handle submission
    // For now, just close the modal
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      fullScreen={isMobile}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: isMobile ? 0 : 2,
          maxWidth: "450px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h6" component="span" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
          <SupportAgentIcon sx={{ fontSize: 24, color: "text.secondary" }} />
          Contact our support
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0 }}>
        <SupportRequestForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={false}
        />
      </DialogContent>
    </Dialog>
  );
}
