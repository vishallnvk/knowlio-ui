import { Business, Close, MenuBook } from "@mui/icons-material";
import {
  Box,
  Card,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

interface FinalCTASectionProps {
  userTypeDialog: boolean;
  setUserTypeDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleUserTypeSelect: (type: string) => void;
}

function UserTypeDialog({
  userTypeDialog,
  setUserTypeDialog,
  handleUserTypeSelect,
}: FinalCTASectionProps) {
  return (
    <Dialog
      open={userTypeDialog}
      onClose={() => setUserTypeDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogContent sx={{ p: { xs: 4, sm: 6 } }}>
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setUserTypeDialog(false)}
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
          <Box textAlign="center" sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "#1a1a1a", mb: 2 }}
            >
              Select the option that best describes you
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              {
                type: "ai-company",
                icon: Business,
                title: "AI Company",
                description:
                  "Looking for high-quality, licensed data to train your AI models",
                color: "#6366f1",
              },
              {
                type: "publisher",
                icon: MenuBook,
                title: "Content Creator/Publisher",
                description:
                  "Want to monetize your content and knowledge through AI licensing",
                color: "#ec4899",
              },
            ].map((item, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Card
                  sx={{
                    p: 4,
                    textAlign: "center",
                    cursor: "pointer",
                    border: "2px solid #e5e7eb",
                    "&:hover": {
                      borderColor: item.color,
                      boxShadow: 2,
                      transform: "translateY(-8px) scale(1.02)",
                      "& .icon-container": {
                        transform: "scale(1.1) rotate(5deg)",
                      },
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleUserTypeSelect(item.type)}
                >
                  <Box
                    className="icon-container"
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: item.color,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <item.icon sx={{ color: "white", fontSize: 32 }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "#1a1a1a", mb: 2 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#6b7280" }}>
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default UserTypeDialog;
