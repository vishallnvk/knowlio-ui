import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  userType: string;
  dataDescription: string;
}

interface AICompanyFormProps {
  aiCompanyForm: boolean;
  setAiCompanyForm: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function AICompanyForm({
  aiCompanyForm,
  setAiCompanyForm,
  formData,
  handleInputChange,
  handleFormSubmit,
}: AICompanyFormProps) {
  return (
    <Dialog
      open={aiCompanyForm}
      onClose={() => setAiCompanyForm(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent sx={{ p: { xs: 4, sm: 6 } }}>
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setAiCompanyForm(false)}
            sx={{
              position: "absolute",
              right: { xs: -16, sm: -16 },
              top: { xs: -16, sm: -16 },
              "&:hover": {
                transform: "scale(1.1) rotate(90deg)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Close />
          </IconButton>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "#1a1a1a", mb: 2 }}
            >
              Join the fair AI ecosystem
            </Typography>
            <Typography variant="body1" sx={{ color: "#6b7280" }}>
              Share your details to get started
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  },
                  transition: "all 0.2s ease",
                },
              }}
            />
            <TextField
              fullWidth
              label="Work email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  },
                  transition: "all 0.2s ease",
                },
              }}
            />
            <FormControl sx={{ mb: 3, width: "100%" }}>
              <RadioGroup
                row
                value={formData.userType}
                onChange={(e) => handleInputChange("userType", e.target.value)}
                sx={{ justifyContent: "center" }}
              >
                <FormControlLabel
                  value="Rights holder"
                  control={<Radio />}
                  label="Rights holder"
                />
                <FormControlLabel
                  value="AI company"
                  control={<Radio />}
                  label="AI company"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              label="Data description - data type, volume etc."
              multiline
              rows={4}
              value={formData.dataDescription}
              onChange={(e) =>
                handleInputChange("dataDescription", e.target.value)
              }
              required
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  },
                  transition: "all 0.2s ease",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#6366f1",
                color: "white",
                py: 2,
                fontSize: "1.125rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#5855eb",
                  transform: "translateY(-2px) scale(1.02)",
                  boxShadow: "0 12px 24px rgba(99, 102, 241, 0.4)",
                },
                mb: 3,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Get started
            </Button>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                textAlign: "center",
                fontSize: "0.875rem",
              }}
            >
              We need to contact you about our products and services. You may
              unsubscribe from these communications at any time. For information
              please review our Privacy Policy.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AICompanyForm;
