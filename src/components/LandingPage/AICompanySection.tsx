import {
  AutoAwesome,
  CheckCircle,
  Speed,
  GpsFixed,
  TrendingUp,
  Update,
} from "@mui/icons-material";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { 
  AnimatedSection, 
  AnimatedIcon,
  createCardAnimation,
  createEmojiAnimation,
  createAccessibleAnimation,
  ANIMATION_PRESETS,
  emojiPulse,
  emojiWiggle,
  emojiFloat,
  emojiScale,
  sparkle,
} from "../../utils/animations";

function AICompanySection() {
  const emojiAnimations = [
    emojiPulse,
    emojiWiggle,
    emojiFloat,
    emojiScale,
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <AnimatedSection animation="FADE_UP" staggerIndex={0}>
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
          </AnimatedSection>
          
          <AnimatedSection animation="FADE_UP" staggerIndex={1}>
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
          </AnimatedSection>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedSection animation="SLIDE_LEFT" staggerIndex={2}>
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
                  sx={{ 
                    fontWeight: 600, 
                    color: "#1a1a1a", 
                    mb: 3,
                    "& .emoji": {
                      display: 'inline-block',
                      animation: `${emojiPulse} 2000ms ease-in-out infinite`,
                      '@media (prefers-reduced-motion: reduce)': {
                        animation: 'none',
                      },
                    },
                  }}
                >
                  <span className="emoji">🚀</span> 10x Performance with Truth-Grounded AI
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
                    { emoji: "⚡", text: "10x faster training on clean data" },
                    { emoji: "🎯", text: "99.9% accuracy with verified sources" },
                    { emoji: "🛡️", text: "Zero hallucination guarantee" },
                    { emoji: "📊", text: "Instant citations for every response" },
                  ].map((item, index) => (
                    <AnimatedSection 
                      key={index}
                      animation="SLIDE_RIGHT" 
                      staggerIndex={3 + index}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: "#374151",
                            "& .emoji": {
                              display: "inline-block",
                              animation: `${emojiAnimations[index]} 1500ms ease-in-out infinite`,
                              '@media (prefers-reduced-motion: reduce)': {
                                animation: 'none',
                              },
                            },
                          }}
                        >
                          <span className="emoji">{item.emoji}</span> {item.text}
                        </Typography>
                      </Box>
                    </AnimatedSection>
                  ))}
                </Stack>
              </Card>
            </AnimatedSection>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedSection animation="SLIDE_RIGHT" staggerIndex={7}>
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
                  💎 Quality Data = Superior AI Performance
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
                      animation: "BREATHE" as const,
                    },
                    { 
                      icon: GpsFixed, 
                      text: "🎯 Higher precision with expert-vetted content",
                      animation: "WIGGLE" as const,
                    },
                    { 
                      icon: TrendingUp, 
                      text: "📈 Consistent performance across all domains",
                      animation: "FLOAT" as const,
                    },
                    { 
                      icon: Update, 
                      text: "⚡ Real-time updates keep AI current",
                      animation: "PULSE" as const,
                    },
                  ].map((item, index) => (
                    <AnimatedSection 
                      key={index}
                      animation="SLIDE_LEFT" 
                      staggerIndex={8 + index}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <AnimatedIcon animation={item.animation}>
                          <item.icon 
                            sx={{ 
                              color: "#6366f1", 
                              fontSize: 20,
                            }}
                          />
                        </AnimatedIcon>
                        <Typography variant="body2" sx={{ color: "#374151" }}>
                          {item.text}
                        </Typography>
                      </Box>
                    </AnimatedSection>
                  ))}
                </Stack>
              </Card>
            </AnimatedSection>
          </Grid>
        </Grid>

        <AnimatedSection animation="ZOOM_IN" staggerIndex={12}>
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
            <Box
              sx={{
                ...createAccessibleAnimation({
                  animation: `${sparkle} 2000ms ease-in-out infinite`,
                }),
              }}
            >
              <AutoAwesome
                sx={{
                  fontSize: 60,
                  mb: 3,
                  opacity: 0.9,
                }}
              />
            </Box>
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
        </AnimatedSection>
      </Container>
    </Box>
  );
}

export default AICompanySection;
