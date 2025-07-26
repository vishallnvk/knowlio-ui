"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Switch,
  Divider,
} from "@mui/material";
import { useAuth } from "@/components/AuthProvider";
import {
  useAiConsentAttributes,
  saveAiConsentAttributes,
  LicensingConsent,
} from "@/lib/api/license";
import LoadingSpinner from "@/components/LoadingSpinner";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import { useQueryClient } from "@tanstack/react-query";

interface LicensingOption {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function LicensingOptionsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Use React Query hook to fetch consent attributes
  const { data: consentResponse, isLoading, error } = useAiConsentAttributes();

  const [licensingOptions, setLicensingOptions] = useState<LicensingOption[]>([
    {
      id: "ai_training_consent",
      title: "AI Model Training",
      description:
        "Allow your content to be used for training artificial intelligence models",
      details:
        "Your works may be included in datasets used to train AI systems, helping improve their capabilities and understanding.",
      icon: <SmartToyIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
      enabled: false,
    },
    {
      id: "ai_reference_consent",
      title: "Reference & Research (RAG)",
      description:
        "Enable your content for reference purposes and research applications",
      details:
        "Your content can be referenced by AI systems to provide accurate information and context in responses.",
      icon: <SearchIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
      enabled: false,
    },
    {
      id: "ai_marketplace_consent",
      title: "Commercial Applications",
      description:
        "Permit your content to be used in marketplace and commercial applications",
      details:
        "Your works may be used in commercial products, services, and marketplace applications that generate revenue.",
      icon: <BusinessIcon sx={{ fontSize: 40, color: "#4caf50" }} />,
      enabled: false,
    },
  ]);

  // Update licensing options when consent data is loaded
  useEffect(() => {
    if (consentResponse?.success && consentResponse.data) {
      const consentData = consentResponse.data;

      // Update licensing options with current preferences
      setLicensingOptions((prev) =>
        prev.map((option) => ({
          ...option,
          enabled: consentData[option.id as keyof LicensingConsent] || false,
        }))
      );
    }
  }, [consentResponse]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  const handleOptionToggle = (optionId: string) => {
    setLicensingOptions((prev) =>
      prev.map((option) =>
        option.id === optionId
          ? { ...option, enabled: !option.enabled }
          : option
      )
    );
  };

  const handleSubmit = async () => {
    const selectedOptions = licensingOptions.filter((option) => option.enabled);

    // if (selectedOptions.length === 0) {
    //   setSubmitError("Please enable at least one licensing option to continue");
    //   return;
    // }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare consent data for API call
      const consentData: LicensingConsent = {
        ai_training_consent:
          licensingOptions.find((opt) => opt.id === "ai_training_consent")
            ?.enabled || false,
        ai_reference_consent:
          licensingOptions.find((opt) => opt.id === "ai_reference_consent")
            ?.enabled || false,
        ai_marketplace_consent:
          licensingOptions.find((opt) => opt.id === "ai_marketplace_consent")
            ?.enabled || false,
      };

      // Save licensing preferences via API
      const response = await saveAiConsentAttributes(consentData);

      if (response.success) {
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);

        // Invalidate and refetch AI consent attributes to reflect updates
        queryClient.invalidateQueries({ queryKey: ["aiConsentAttributes"] });
      } else {
        setSubmitError("Failed to save licensing preferences");
      }
    } catch (error: any) {
      setSubmitError(error.message || "Failed to save licensing preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  const enabledCount = licensingOptions.filter(
    (option) => option.enabled
  ).length;

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Main Content */}
      <Box
        display="flex"
        sx={{ flex: 1, overflow: "auto", p: 3, placeItems: "center" }}
      >
        <Container maxWidth="lg">
          {/* Page Title and Description */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
              Manage Licensing Options
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose how your content can be used by AI systems. Note: Individual content settings will override these default preferences.
            </Typography>
          </Box>

          {/* Success Message */}
          {submitSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Your licensing preferences have been saved successfully!
            </Alert>
          )}

          {/* Error Message */}
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          {/* Licensing Options Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
              mb: 4,
            }}
          >
            {licensingOptions.map((option) => (
              <Card
                key={option.id}
                sx={{
                  height: "100%",
                  border: option.enabled ? 2 : 1,
                  borderColor: option.enabled ? "primary.main" : "divider",
                  backgroundColor: option.enabled
                    ? "primary.50"
                    : "background.paper",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() => handleOptionToggle(option.id)}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Icon and Switch */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: "background.paper",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {option.icon}
                    </Box>
                    <Switch
                      checked={option.enabled}
                      onChange={() => handleOptionToggle(option.id)}
                      color="primary"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Box>

                  {/* Title and Description */}
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {option.description}
                  </Typography>

                  {/* Details */}
                  <Box sx={{ mt: "auto" }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ lineHeight: 1.4 }}
                    >
                      {option.details}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Summary and Submit Section */}
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Licensing Summary
            </Typography>

            {enabledCount > 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                You have selected <strong>{enabledCount}</strong> licensing
                option{enabledCount !== 1 ? "s" : ""} for your content.
              </Typography>
            ) : (
              // <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              //   No licensing options selected. Please choose at least one option
              //   to proceed.
              // </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                No licensing options selected for your content.
              </Typography>
            )}

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              // disabled={isSubmitting || enabledCount === 0}
              disabled={isSubmitting}
              sx={{ px: 6, py: 1.5, minWidth: 200 }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                  Saving Preferences...
                </>
              ) : (
                "Save Licensing Preferences"
              )}
            </Button>

            {/* {enabledCount === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Select at least one licensing option above to continue.
              </Typography>
            )} */}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
