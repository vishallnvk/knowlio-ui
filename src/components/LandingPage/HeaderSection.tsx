import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

interface HeaderSectionProps {
  headerScrolled: boolean;
  user: any;
  handleGetStarted: () => void;
}

function HeaderSection({
  headerScrolled,
  user,
  handleGetStarted,
}: HeaderSectionProps) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: headerScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        color: "#1a1a1a",
        backdropFilter: headerScrolled ? "blur(20px)" : "none",
        borderBottom: headerScrolled ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 2,
            px: { xs: 0, sm: 2 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1976d2",
              transform: headerScrolled ? "scale(1)" : "scale(1.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Knowlio
          </Typography>
          <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
            <Button
              variant="contained"
              onClick={handleGetStarted}
              size="small"
              sx={{
                bgcolor: "#6366f1",
                color: "white",
                p: "4px 12px",
                textTransform: "none",
                fontWeight: 500,
                borderRadius: "6px",
                "&:hover": {
                  bgcolor: "#5855eb",
                  transform: "translateY(-2px) scale(1.05)",
                  boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
                },
                "&:active": {
                  transform: "translateY(0) scale(0.98)",
                },
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderSection;
