import { MenuBook, Security, TrendingUp } from "@mui/icons-material";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";

function PublisherSection() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
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
            For Publishers
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
            Turn proprietary knowledge into AI-ready infrastructure
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {[
          {
            icon: MenuBook,
            title: "Your Content",
            description:
              "License your books, journals, research, and archives directly to the AI frontier.",
            tagline: "Your content. Your rules. Your revenue.",
            color: "#6366f1",
          },
          {
            icon: Security,
            title: "Complete Control",
            description:
              "Structured formatting, access control, usage dashboards, and monetization — everything you need.",
            tagline: "We make publishers AI-ready.",
            color: "#ec4899",
          },
          {
            icon: TrendingUp,
            title: "Enduring Value",
            description:
              "We turn your data into enduring value — without scraping, stealing, or shortcuts.",
            tagline: "Unlock archives for the AI age.",
            color: "#10b981",
          },
        ].map((item, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Box
              sx={{
                height: "100%",
                opacity: 0,
                animation: `slideInUp 0.8s ease ${
                  0.6 + index * 0.15
                }s forwards`,
                animationTimeline: "view()",
                animationRange: "entry 50% cover 50%",
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
              <Card
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  border: "1px solid #e5e7eb",
                  "&:hover": {
                    boxShadow: 3,
                    transform: "translateY(-8px) scale(1.02)",
                    borderColor: item.color,
                    "& .icon-container": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  },
                  transition: "all 0.3s ease",
                }}
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
                    animation: `float${index} 3s ease-in-out infinite`,
                    "@keyframes float0": {
                      "0%, 100%": { transform: "translateY(0)" },
                      "50%": { transform: "translateY(-8px)" },
                    },
                    "@keyframes float1": {
                      "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
                      "50%": { transform: "translateY(-6px) rotate(5deg)" },
                    },
                    "@keyframes float2": {
                      "0%, 100%": { transform: "translateY(0) scale(1)" },
                      "50%": { transform: "translateY(-10px) scale(1.05)" },
                    },
                  }}
                >
                  <item.icon 
                    sx={{ 
                      color: "white", 
                      fontSize: 32,
                      animation: `iconRotate${index} 4s ease-in-out infinite`,
                      "@keyframes iconRotate0": {
                        "0%, 100%": { transform: "rotate(0deg)" },
                        "25%": { transform: "rotate(3deg)" },
                        "75%": { transform: "rotate(-3deg)" },
                      },
                      "@keyframes iconRotate1": {
                        "0%, 100%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.1)" },
                      },
                      "@keyframes iconRotate2": {
                        "0%, 100%": { transform: "rotate(0deg) scale(1)" },
                        "50%": { transform: "rotate(10deg) scale(1.1)" },
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#1a1a1a", mb: 2 }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "#6b7280", mb: 3 }}>
                  {item.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: item.color, 
                    fontWeight: 600,
                    animation: `typewriter${index} 0.8s ease ${1.2 + index * 0.2}s forwards`,
                    opacity: 0,
                    "@keyframes typewriter0": {
                      "0%": { opacity: 0, width: "0%" },
                      "100%": { opacity: 1, width: "100%" },
                    },
                    "@keyframes typewriter1": {
                      "0%": { opacity: 0, transform: "translateX(-10px)" },
                      "100%": { opacity: 1, transform: "translateX(0)" },
                    },
                    "@keyframes typewriter2": {
                      "0%": { opacity: 0, transform: "scale(0.8)" },
                      "100%": { opacity: 1, transform: "scale(1)" },
                    },
                    ...(item.tagline.includes("revenue") && {
                      "&:hover": {
                        animation: "revenuePulse 0.6s ease infinite",
                        "@keyframes revenuePulse": {
                          "0%, 100%": { transform: "scale(1)" },
                          "50%": { transform: "scale(1.05)" },
                        },
                      },
                    }),
                  }}
                >
                  {item.tagline}
                </Typography>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          opacity: 0,
          animation: "fadeInUp 0.8s ease 1.1s forwards",
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
        <Card
          sx={{
            mt: 6,
            p: 4,
            border: "1px solid #e5e7eb",
            textAlign: "center",
            "&:hover": {
              transform: "translateY(-4px) scale(1.01)",
              boxShadow: "0 20px 40px rgba(229, 231, 235, 0.5)",
              borderColor: "#6366f1",
            },
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            animation: "cardGlow 4s ease-in-out infinite",
            "@keyframes cardGlow": {
              "0%, 100%": { boxShadow: "0 0 0 rgba(99, 102, 241, 0)" },
              "50%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)" },
            },
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600, 
              mb: 2,
              "& .highlight": {
                color: "#6366f1",
                animation: "textPulse 2s ease-in-out infinite",
                "@keyframes textPulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.7 },
                },
              },
            }}
          >
            Publishers are not <span className="highlight">AI-ready</span>. We make them <span className="highlight">AI-ready</span>.
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "700px", mx: "auto" }}>
            Most content creators — from book publishers to academic journals —
            are locked out of the AI economy. Their data is unstructured,
            siloed, and unlicensed. Knowlio gives publishers a turnkey solution.
          </Typography>
        </Card>
      </Box>
    </Container>
  );
}

export default PublisherSection;
