import {
  AutoAwesome,
  CheckCircle,
  DataObject,
  Update,
  Verified,
} from "@mui/icons-material";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";

function AICompanySection() {
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              opacity: 0,
              animation: "fadeInUp 0.8s ease 0.2s forwards",
              animationTimeline: "view()",
              animationRange: "entry 50% cover 50%",
              "@keyframes fadeInUp": {
                from: {
                  opacity: 0,
                  transform: "translateY(30px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 3,
              }}
            >
              For AI Companies
            </Typography>
          </Box>
          <Box
            sx={{
              opacity: 0,
              animation: "fadeInUp 0.8s ease 0.4s forwards",
              animationTimeline: "view()",
              animationRange: "entry 50% cover 50%",
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
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Train on the world's best data — licensed, structured, and updated
              daily
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                opacity: 0,
                animation: "slideInLeft 0.8s ease 0.6s forwards",
                animationTimeline: "view()",
                animationRange: "entry 50% cover 50%",
                "@keyframes slideInLeft": {
                  from: {
                    opacity: 0,
                    transform: "translateX(-40px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                },
              }}
            >
              <Card
                sx={{
                  p: 4,
                  height: "100%",
                  border: "1px solid #e5e7eb",
                  "&:hover": {
                    boxShadow: 3,
                    transform: "translateY(-4px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#1a1a1a", mb: 3 }}
                >
                  Say goodbye to scraped noise
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#6b7280", mb: 4, lineHeight: 1.7 }}
                >
                  Say hello to verified signal. Build AI you can defend with
                  audit-ready, legally sourced intelligence.
                </Typography>
                <Stack spacing={2}>
                  {[
                    "Audit-ready data provenance",
                    "Legally sourced intelligence",
                    "Defensible AI systems",
                  ].map((text, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        opacity: 0,
                        animation: `slideInRight 0.6s ease ${
                          0.8 + index * 0.2
                        }s forwards`,
                        "@keyframes slideInRight": {
                          from: {
                            opacity: 0,
                            transform: "translateX(20px)",
                          },
                          to: {
                            opacity: 1,
                            transform: "translateX(0)",
                          },
                        },
                      }}
                    >
                      <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "#374151" }}>
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                opacity: 0,
                animation: "slideInRight 0.8s ease 0.8s forwards",
                animationTimeline: "view()",
                animationRange: "entry 50% cover 50%",
                "@keyframes slideInRight": {
                  from: {
                    opacity: 0,
                    transform: "translateX(40px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                },
              }}
            >
              <Card
                sx={{
                  p: 4,
                  height: "100%",
                  border: "1px solid #e5e7eb",
                  "&:hover": {
                    boxShadow: 3,
                    transform: "translateY(-4px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#1a1a1a", mb: 3 }}
                >
                  Mission-critical domains
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#6b7280", mb: 4, lineHeight: 1.7 }}
                >
                  Medicine, law, and science require verified, rights-owned, and
                  continuously updated knowledge.
                </Typography>
                <Stack spacing={2}>
                  {[
                    {
                      icon: DataObject,
                      text: "Structured, clean data formats",
                    },
                    { icon: Verified, text: "Expert-curated content" },
                    { icon: Update, text: "Regular content updates" },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        opacity: 0,
                        animation: `slideInLeft 0.6s ease ${
                          1 + index * 0.2
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
                      <item.icon sx={{ color: "#6366f1", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "#374151" }}>
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            opacity: 0,
            animation: "zoomIn 1s ease 1.2s forwards",
            animationTimeline: "view()",
            animationRange: "entry 50% cover 50%",
            "@keyframes zoomIn": {
              from: {
                opacity: 0,
                transform: "scale(0.9)",
              },
              to: {
                opacity: 1,
                transform: "scale(1)",
              },
            },
          }}
        >
          <Card
            sx={{
              mt: 6,
              p: 6,
              textAlign: "center",
              bgcolor: "#6366f1",
              color: "white",
              border: "none",
              "&:hover": {
                transform: "translateY(-8px) scale(1.02)",
                boxShadow: "0 25px 50px rgba(99, 102, 241, 0.3)",
              },
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <AutoAwesome
              sx={{
                fontSize: 60,
                mb: 3,
                opacity: 0.9,
                animation: "sparkle 2s ease-in-out infinite",
                "@keyframes sparkle": {
                  "0%, 100%": { transform: "rotate(0deg) scale(1)" },
                  "50%": { transform: "rotate(180deg) scale(1.1)" },
                },
              }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 3, color: "inherit" }}
            >
              Let's power the miracles we've been waiting for
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.125rem",
                opacity: 0.9,
                maxWidth: "600px",
                mx: "auto",
                color: "inherit",
              }}
            >
              The breakthroughs in medicine, science, education, and climate
              can't wait. But they demand more than just algorithms — they
              demand trustworthy knowledge. Knowlio gives AI the truth it needs
              to change the world.
            </Typography>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

export default AICompanySection;
