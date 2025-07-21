"use client";

import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import { useAuth } from "./AuthProvider";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        mt: "auto",
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        marginLeft: user ? { xs: "0px", md: "64px" } : {},
      }}
    >
      <Container maxWidth="lg" sx={{ px: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Left side - Copyright */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.875rem" }}
          >
            © {currentYear} Knowlio. All rights reserved.
          </Typography>

          {/* Right side - Terms and Privacy */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <MuiLink
              component={Link}
              href="/terms"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  textDecoration: "underline",
                  color: "primary.main",
                },
              }}
            >
              Terms of Service
            </MuiLink>
            <MuiLink
              component={Link}
              href="/privacy"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  textDecoration: "underline",
                  color: "primary.main",
                },
              }}
            >
              Privacy Policy
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
