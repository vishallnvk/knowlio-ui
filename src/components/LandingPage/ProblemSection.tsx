import { Gavel, School, Science, FormatQuote } from "@mui/icons-material";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";

function ProblemSection() {
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
                mb: 4,
              }}
            >
              The Internet Wasn't Built for AI
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
              Current AI systems rely on scraped, unverified data. This creates
              massive risks for critical applications.
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={4}>
          {[
            {
              icon: Science,
              title: "Medicine Requires Verified Data",
              description:
                "Life-critical decisions demand peer-reviewed, authoritative medical sources — not random health blogs or outdated information.",
              color: "#dc2626",
              gradientBg: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
              borderColor: "rgba(236, 72, 153, 0.2)",
              shadowColor: "rgba(236, 72, 153, 0.1)",
              hoverBorderColor: "rgba(236, 72, 153, 0.3)",
              hoverShadowColor: "rgba(236, 72, 153, 0.2)",
            },
            {
              icon: Gavel,
              title: "Legal Systems Need Accuracy",
              description:
                "Justice depends on reliable legal precedents and statutes — not scraped content that may contain errors or bias.",
              color: "#ea580c",
              gradientBg: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)",
              borderColor: "rgba(234, 88, 12, 0.2)",
              shadowColor: "rgba(234, 88, 12, 0.1)",
              hoverBorderColor: "rgba(234, 88, 12, 0.3)",
              hoverShadowColor: "rgba(234, 88, 12, 0.2)",
            },
            {
              icon: School,
              title: "Education Demands Truth",
              description:
                "Learning requires fact-checked, expert-reviewed content — not misinformation or clickbait that pollutes knowledge.",
              color: "#2563eb",
              gradientBg: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)",
              borderColor: "rgba(37, 99, 235, 0.2)",
              shadowColor: "rgba(37, 99, 235, 0.1)",
              hoverBorderColor: "rgba(37, 99, 235, 0.3)",
              hoverShadowColor: "rgba(37, 99, 235, 0.2)",
            },
          ].map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  height: "100%",
                  opacity: 0,
                  animation: `slideInUp 0.8s ease ${
                    0.6 + index * 0.2
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
                    p: 5,
                    height: "100%",
                    background: item.gradientBg,
                    border: `2px solid ${item.borderColor}`,
                    borderRadius: 4,
                    boxShadow: `0 10px 30px ${item.shadowColor}`,
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 25px 50px ${item.hoverShadowColor}`,
                      border: `2px solid ${item.hoverBorderColor}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: item.color,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        animation: "iconFloat 3s ease-in-out infinite",
                        animationDelay: `${index * 0.5}s`,
                        "@keyframes iconFloat": {
                          "0%, 100%": {
                            transform: "translateY(0px) rotate(0deg)",
                          },
                          "50%": {
                            transform: "translateY(-3px) rotate(2deg)",
                          },
                        },
                      }}
                    >
                      <item.icon sx={{ color: "white", fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            opacity: 0,
            animation: "fadeInUp 0.8s ease 1.2s forwards",
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
              p: 5,
              position: "relative",
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
              border: "2px solid rgba(59, 130, 246, 0.2)",
              borderRadius: 4,
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.1)",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)",
                border: "2px solid rgba(59, 130, 246, 0.3)",
              },
              transition: "all 0.3s ease",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 16,
                left: 24,
                width: 40,
                height: 40,
                background: "rgba(59, 130, 246, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: 16,
                right: 24,
                width: 40,
                height: 40,
                background: "rgba(59, 130, 246, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(180deg)",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 32,
                color: "#3b82f6",
                opacity: 0.7,
              }}
            >
              <FormatQuote sx={{ fontSize: 24 }} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                right: 32,
                color: "#3b82f6",
                opacity: 0.7,
                transform: "rotate(180deg)",
              }}
            >
              <FormatQuote sx={{ fontSize: 24 }} />
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                color: "#1e40af",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                px: 4,
              }}
            >
              "You can't cure cancer with scraped internet data"
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: "800px", 
                mx: "auto",
                color: "#374151",
                lineHeight: 1.7,
                px: 2,
              }}
            >
              AI is only as good as the data it's trained on. The internet,
              filled with outdated blogs, misinformation, and clickbait, is not
              a foundation for truth. Mission-critical domains require verified,
              rights-owned, and continuously updated knowledge.
            </Typography>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

export default ProblemSection;
