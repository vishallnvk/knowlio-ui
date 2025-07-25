import {
  AutoAwesome,
  CheckCircle,
  DataObject,
  Update,
  Verified,
  Speed,
  GpsFixed,
  TrendingUp,
} from "@mui/icons-material";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";

function AICompanySection() {
  return (
    <Box 
      sx={{ 
        bgcolor: "#f9fafb", 
        py: { xs: 8, md: 12 },
        animation: "sectionBreathe 6s ease-in-out infinite",
        "@keyframes sectionBreathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.005)" },
        },
      }}
    >
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
              Get access to the world's best data — licensed, structured, and updated daily
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
                    transform: "translateY(-4px) scale(1.01)",
                    borderColor: "#10b981",
                  },
                  transition: "all 0.3s ease",
                  animation: "cardGlowLeft 4s ease-in-out infinite",
                  "@keyframes cardGlowLeft": {
                    "0%, 100%": { boxShadow: "0 0 0 rgba(16, 185, 129, 0)" },
                    "50%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.1)" },
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ 
                    fontWeight: 600, 
                    color: "#1a1a1a", 
                    mb: 3,
                    "& .highlight": {
                      color: "#10b981",
                      animation: "titlePulse 2s ease-in-out infinite",
                      "@keyframes titlePulse": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0.8 },
                      },
                    },
                  }}
                >
                  🚀 <span className="highlight">10x Performance</span> with Truth-Grounded AI
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#6b7280", mb: 4, lineHeight: 1.7 }}
                >
                  Clean data = superior AI. Experience lightning-fast inference, 
                  zero hallucinations, and precision that scales with verified intelligence.
                </Typography>
                <Stack spacing={2}>
                  {[
                    "⚡ 10x faster training on clean data",
                    "🎯 99.9% accuracy with verified sources", 
                    "🛡️ Zero hallucination guarantee",
                    "📊 Instant citations for every response",
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
                      <CheckCircle 
                        sx={{ 
                          color: "#10b981", 
                          fontSize: 20,
                          animation: `floatLeft${index} 3s ease-in-out infinite`,
                          "@keyframes floatLeft0": {
                            "0%, 100%": { transform: "translateY(0)" },
                            "50%": { transform: "translateY(-4px)" },
                          },
                          "@keyframes floatLeft1": {
                            "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
                            "50%": { transform: "translateY(-3px) rotate(2deg)" },
                          },
                          "@keyframes floatLeft2": {
                            "0%, 100%": { transform: "translateY(0) scale(1)" },
                            "50%": { transform: "translateY(-5px) scale(1.05)" },
                          },
                          "@keyframes floatLeft3": {
                            "0%, 100%": { transform: "scale(1)" },
                            "50%": { transform: "scale(1.1)" },
                          },
                        }}
                      />
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
                    transform: "translateY(-4px) scale(1.01)",
                    borderColor: "#6366f1",
                  },
                  transition: "all 0.3s ease",
                  animation: "cardGlowRight 4s ease-in-out infinite",
                  "@keyframes cardGlowRight": {
                    "0%, 100%": { boxShadow: "0 0 0 rgba(99, 102, 241, 0)" },
                    "50%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)" },
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ 
                    fontWeight: 600, 
                    color: "#1a1a1a", 
                    mb: 3,
                    "& .highlight": {
                      color: "#6366f1",
                      animation: "titlePulse 2s ease-in-out infinite",
                      "@keyframes titlePulse": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0.8 },
                      },
                    },
                  }}
                >
                  💎 <span className="highlight">Quality Data</span> = Superior AI Performance
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#6b7280", mb: 4, lineHeight: 1.7 }}
                >
                  Expert-vetted content delivers consistent, high-precision results. 
                  Experience the difference when AI learns from the best sources.
                </Typography>
                <Stack spacing={2}>
                  {[
                    {
                      icon: Speed,
                      text: "🚀 Lightning-fast inference with structured data",
                    },
                    { icon: GpsFixed, text: "🎯 Higher precision with expert-vetted content" },
                    { icon: TrendingUp, text: "📈 Consistent performance across all domains" },
                    { icon: Update, text: "⚡ Real-time updates keep AI current" },
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
                      <item.icon 
                        sx={{ 
                          color: "#6366f1", 
                          fontSize: 20,
                          animation: `floatRight${index} 3s ease-in-out infinite`,
                          "@keyframes floatRight0": {
                            "0%, 100%": { transform: "translateY(0)" },
                            "50%": { transform: "translateY(-6px)" },
                          },
                          "@keyframes floatRight1": {
                            "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
                            "50%": { transform: "translateY(-4px) rotate(-3deg)" },
                          },
                          "@keyframes floatRight2": {
                            "0%, 100%": { transform: "translateY(0) scale(1)" },
                            "50%": { transform: "translateY(-7px) scale(1.08)" },
                          },
                          "@keyframes floatRight3": {
                            "0%, 100%": { transform: "rotate(0deg) scale(1)" },
                            "50%": { transform: "rotate(8deg) scale(1.12)" },
                          },
                        }}
                      />
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
              animation: "cardGlowCTA 4s ease-in-out infinite",
              "@keyframes cardGlowCTA": {
                "0%, 100%": { boxShadow: "0 0 0 rgba(99, 102, 241, 0)" },
                "50%": { boxShadow: "0 0 30px rgba(99, 102, 241, 0.15)" },
              },
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
              Let's power the AI miracles we've been waiting for
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
