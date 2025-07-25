"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  ListItemIcon,
  SelectChangeEvent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { SupportRequestFormProps, supportOptions } from "./types";

export default function SupportRequestForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: SupportRequestFormProps) {
  const [selectedOption, setSelectedOption] = useState("general");
  const [message, setMessage] = useState("");

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit({
        selectedOption,
        message,
      });
    }
  };

  const isFormValid = selectedOption !== "";

  return (
    <Box sx={{ py: 2 }}>
      {/* Dropdown Field */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            mb: 1.5,
          }}
        >
          What can we help you with?
        </Typography>
        <FormControl fullWidth size="medium">
          <InputLabel>Select an option</InputLabel>
          <Select
            value={selectedOption}
            label="Select an option"
            onChange={handleOptionChange}
          >
            {supportOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <Typography sx={{ flex: 1, fontWeight: 500 }}>{option.label}</Typography>
                  {option.isDefault && selectedOption === option.value && (
                    <ListItemIcon sx={{ minWidth: "auto", ml: 1 }}>
                      <CheckIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                  )}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Message Field */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            mb: 1.5,
          }}
        >
          Any details you'd like to add?
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={message}
          onChange={handleMessageChange}
          placeholder="Message (optional)"
          variant="outlined"
        />
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          pt: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          color="primary"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </Box>
    </Box>
  );
}
