"use client";

import { useAuth } from "@/components/AuthProvider";
import {
  useUserAgreementAttributes,
  saveUserAgreementAttributes,
  UserAgreementConsent,
} from "@/lib/api/license";
import LoadingSpinner, { InlineSpinner } from "@/components/LoadingSpinner";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Button,
  Link as MuiLink,
  Divider,
  Alert,
  Card,
  CardContent,
  Chip,
  Stack,
  Modal,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import ArticleIcon from "@mui/icons-material/Article";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryClient } from "@tanstack/react-query";

export default function UserAgreementPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: userAgreementResponse,
    isLoading: isStatusLoading,
    error: statusError,
  } = useUserAgreementAttributes();

  const [hasViewedFullAgreement, setHasViewedFullAgreement] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Check if user has already signed the agreement
  const isAgreementSigned =
    userAgreementResponse?.success &&
    userAgreementResponse.data?.ai_user_agreement_consent;

  if (!user) {
    return null;
  }

  const handleViewFullAgreement = () => {
    setIsModalOpen(true);
    setHasViewedFullAgreement(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAgreementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgreedToTerms(event.target.checked);
  };

  const handleSignAgreement = async () => {
    if (!agreedToTerms || !hasViewedFullAgreement) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Save user agreement with current version
      const agreementData: UserAgreementConsent = {
        ai_user_agreement_consent: true,
        ai_user_agreement_version: "v2.1",
      };

      await saveUserAgreementAttributes(agreementData);

      // Invalidate and refetch user agreement status
      queryClient.invalidateQueries({ queryKey: ["userAgreementAttributes"] });
    } catch (error: any) {
      setSubmitError(error.message || "Failed to sign user agreement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Extract key sections from the PDF content for preview
  const agreementPreview = `
1. Overview of Licensing Through Knowlio

Knowlio is developing advanced technology and delivering services that empower creative industries with control over, and compensation for, the use of their work by AI companies. For rightsholders like you, this means access to our licensing platform—offering customizable license terms, royalty payments for granted licenses, and the ability to opt out of any deal where terms are unsatisfactory.

2. Core Concept: AI Rights

Knowlio has created and introduced a concept we call AI Rights, which describes a new set of rights and licenses born out of the technological methods used to build and improve AI systems using existing, human-created creative works.

3. Licensing Available AI Rights

Once Available AI Rights have been established, they may be made available in our Platform marketplace, or in a custom offering we may create, in combination with other works.

[Additional terms and conditions apply - View full agreement for complete details]
  `;

  if (isStatusLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (statusError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          <Typography variant="h6">
            Error Loading User Agreement Information
          </Typography>
          <Typography variant="body2">
            {statusError &&
            typeof statusError === "object" &&
            "message" in statusError
              ? (statusError as Error).message
              : "An error occurred while loading user agreement information"}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Main Content */}
      <Box
        display="flex"
        sx={{ flex: 1, overflow: "auto", p: 3, placeItems: "center" }}
      >
        <Paper sx={{ maxWidth: 900, mx: "auto", overflow: "hidden" }}>
          {isAgreementSigned ? (
            // Signed Agreement View
            <Box>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "#f0fdf4",
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CheckCircleIcon color="success" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "medium", color: "#166534" }}
                  >
                    User Agreement Signed
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your user agreement is active and valid.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Agreement Details
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Version:{" "}
                          {userAgreementResponse?.data
                            ?.ai_user_agreement_version || "v2.1"}
                        </Typography>
                      </Box>
                      <Chip
                        icon={<VerifiedIcon />}
                        label="Active"
                        color="success"
                        variant="outlined"
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Agreement Type
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          User Agreement
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                        <Typography variant="body2">Accepted</Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Version
                        </Typography>
                        <Typography variant="body2">
                          {userAgreementResponse?.data
                            ?.ai_user_agreement_version || "v2.1"}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={handleViewFullAgreement}
                    startIcon={<ArticleIcon />}
                    variant="outlined"
                    color="primary"
                  >
                    View Full Agreement
                  </Button>

                  <Typography variant="body2" color="text.secondary">
                    Need help?{" "}
                    <MuiLink href="#" underline="hover">
                      Contact Support
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            // Unsigned Agreement View
            <Box>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "#fff7ed",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "medium", color: "#9a3412" }}
                >
                  User Agreement Required
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please review and accept the user agreement to continue using
                  all features.
                </Typography>
              </Box>

              <Box sx={{ p: 3 }}>
                {submitError && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {submitError}
                  </Alert>
                )}

                <Typography variant="h6" gutterBottom>
                  User Agreement Summary
                </Typography>

                <Typography variant="body2" paragraph>
                  Before using our platform, please review the key terms of our
                  user agreement:
                </Typography>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 3,
                    maxHeight: 300,
                    overflow: "auto",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                    {agreementPreview}
                  </Typography>
                </Paper>

                <Button
                  onClick={handleViewFullAgreement}
                  startIcon={<ArticleIcon />}
                  variant="outlined"
                  sx={{ mb: 3 }}
                >
                  View Full Agreement
                </Button>

                <Typography variant="h6" gutterBottom>
                  Acceptance
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreedToTerms}
                        onChange={handleAgreementChange}
                        name="agreedToTerms"
                        disabled={!hasViewedFullAgreement}
                      />
                    }
                    label="I agree to the terms and conditions"
                  />

                  {!hasViewedFullAgreement && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, ml: 4 }}
                    >
                      Please view the full agreement first to enable this
                      option.
                    </Typography>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      !agreedToTerms || !hasViewedFullAgreement || isSubmitting
                    }
                    onClick={handleSignAgreement}
                    sx={{ px: 4 }}
                  >
                    {isSubmitting ? (
                      <>
                        <InlineSpinner className="mr-2" />
                        Signing...
                      </>
                    ) : (
                      "Agree and Sign"
                    )}
                  </Button>

                  <Typography variant="body2" color="text.secondary">
                    Need help?{" "}
                    <MuiLink href="#" underline="hover">
                      Contact Support
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Full Agreement Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="full-agreement-modal"
        aria-describedby="full-agreement-content"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "90%", md: "85%", lg: "80%" },
            maxWidth: 1200,
            height: "95vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              Full User Agreement
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Modal Content - PDF Viewer */}
          <Box
            sx={{
              flex: 1,
              overflow: "hidden",
            }}
          >
            <iframe
              src="/knowlio-user-agreement.pdf"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="User Agreement PDF"
            />
          </Box>

          {/* Modal Footer */}
          <Box
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleCloseModal} variant="contained">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
