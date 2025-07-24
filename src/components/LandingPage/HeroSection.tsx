import { ArrowForward, CheckCircle, Shield, Update } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface HeroSectionProps {
  handleGetStarted: () => void;
}

function HeroSection({ handleGetStarted }: HeroSectionProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 12 } }}
    >
      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                opacity: 0,
                animation: "fadeInUp 0.8s ease 0.2s forwards",
                "@keyframes fadeInUp": {
                  from: {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Chip
                label="🚀 Building the AI Internet"
                sx={{
                  mb: 4,
                  bgcolor: "#eff6ff",
                  color: "#1d4ed8",
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-5px)" },
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                opacity: 0,
                animation: "slideInUp 1s ease 0.4s forwards",
                "@keyframes slideInUp": {
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
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                  fontWeight: 800,
                  color: "#1a1a1a",
                  mb: 3,
                  lineHeight: 1.1,
                }}
              >
                The AI Internet
              </Typography>
            </Box>

            <Box
              sx={{
                opacity: 0,
                animation: "fadeInUp 0.8s ease 0.6s forwards",
                "@keyframes fadeInUp": {
                  from: {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  color: "#6b7280",
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Where every byte is intentional, sourced, and governed
              </Typography>
            </Box>

            <Box
              sx={{
                opacity: 0,
                animation: "fadeInUp 0.8s ease 0.8s forwards",
                "@keyframes fadeInUp": {
                  from: {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#6b7280",
                  mb: 6,
                  lineHeight: 1.6,
                  maxWidth: "500px",
                }}
              >
                For decades, the internet was optimized for humans. Knowlio is
                optimizing it for intelligent systems — rearchitecting knowledge
                access from the ground up.
              </Typography>
            </Box>

            <Box
              sx={{
                opacity: 0,
                animation: "fadeInUp 0.8s ease 1s forwards",
                "@keyframes fadeInUp": {
                  from: {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                sx={{ mb: 6 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: "#6366f1",
                    color: "white",
                    px: 4,
                    py: 2,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: "none",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      bgcolor: "#5855eb",
                      transform: "translateY(-3px) scale(1.02)",
                      boxShadow: "0 12px 35px rgba(99, 102, 241, 0.4)",
                    },
                    "&:hover .arrow": {
                      transform: "translateX(5px)",
                    },
                    "&:active": {
                      transform: "translateY(-1px) scale(0.98)",
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
                    "& .MuiSvgIcon-root": {
                      transition: "transform 0.3s ease",
                    },
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                opacity: 0,
                animation: "fadeInUp 0.8s ease 1.2s forwards",
                "@keyframes fadeInUp": {
                  from: {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 4 }}
                sx={{ flexWrap: "wrap", gap: 2 }}
              >
                {[
                  {
                    icon: CheckCircle,
                    color: "#10b981",
                    text: "Verified Sources",
                  },
                  { icon: Shield, color: "#6366f1", text: "Rights-Cleared" },
                  {
                    icon: Update,
                    color: "#f59e0b",
                    text: "Continuously Updated",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      opacity: 0,
                      animation: `slideInLeft 0.6s ease ${
                        1.4 + index * 0.2
                      }s forwards`,
                      "@keyframes slideInLeft": {
                        from: {
                          opacity: 0,
                          transform: "translateX(-20px)",
                        },
                        to: {
                          opacity: 1,
                          transform: "translateX(0)",
                        },
                      },
                    }}
                  >
                    <item.icon sx={{ color: item.color, fontSize: 20 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "#374151", fontWeight: 500 }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            sx={{
              position: "relative",
              display: { xs: "none", lg: "block" },
              opacity: 0,
              animation: "zoomIn 1.2s ease 0.8s forwards",
              "@keyframes zoomIn": {
                from: {
                  opacity: 0,
                  transform: "scale(0.8)",
                },
                to: {
                  opacity: 1,
                  transform: "scale(1)",
                },
              },
            }}
          >
            <Box
              sx={{
                "&:hover": {
                  transform: "scale(1.02) rotateY(5deg)",
                },
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <img
                src="/hero.png"
                alt="AI Internet Infrastructure"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HeroSection;
