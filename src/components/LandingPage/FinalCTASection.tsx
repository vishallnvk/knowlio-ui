import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import React from "react";

interface FinalCTASectionProps {
  handleGetStarted: () => void;
}

function FinalCTASection({ handleGetStarted }: FinalCTASectionProps) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <Box
        sx={{
          opacity: 0,
          animation: "fadeInUp 0.8s ease 0.2s forwards",
          animationTimeline: "view()",
          animationRange: "entry 50% cover 50%",
          "@keyframes fadeInUp": {
            from: {
              opacity: 0,
              transform: "translateY(40px)",
            },
            to: {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Card
          sx={{
            p: { xs: 4, md: 8 },
            textAlign: "center",
            bgcolor: "#1a1a1a",
            color: "white",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
            },
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 4,
              color: "inherit",
            }}
          >
            Ready to Join the AI Internet?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.125rem",
              mb: 6,
              maxWidth: "600px",
              mx: "auto",
              opacity: 0.9,
              color: "inherit",
            }}
          >
            The breakthroughs in medicine, science, education, and climate can't
            wait. They demand trustworthy knowledge.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "#1877f2",
                color: "white",
                px: 6,
                py: 2,
                fontSize: "1.125rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  bgcolor: "#1158c7",
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: "0 16px 32px rgba(24, 119, 242, 0.5)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "left 0.5s",
                },
                "&:hover::before": {
                  left: "100%",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Get Started Today
            </Button>
          </Stack>
        </Card>
      </Box>
    </Container>
  );
}

export default FinalCTASection;
