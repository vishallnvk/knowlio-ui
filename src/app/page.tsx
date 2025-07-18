"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useState, useEffect } from "react";
import { Box, Alert, Snackbar } from "@mui/material";
import LoadingSpinner from "@/components/LoadingSpinner";
import HeaderSection from "@/components/LandingPage/HeaderSection";
import HeroSection from "@/components/LandingPage/HeroSection";
import ProblemSection from "@/components/LandingPage/ProblemSection";
import PublisherSection from "@/components/LandingPage/PublisherSection";
import AICompanySection from "@/components/LandingPage/AICompanySection";
import FinalCTASection from "@/components/LandingPage/FinalCTASection";
import UserTypeDialog from "@/components/LandingPage/UserTypeDialog";
import AICompanyForm from "@/components/LandingPage/AICompanyForm";
import "aws-amplify/auth/enable-oauth-listener";

export default function Home() {
  const router = useRouter();
  const { loading: authLoading, user } = useAuth();
  const [userTypeDialog, setUserTypeDialog] = useState(false);
  const [aiCompanyForm, setAiCompanyForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "AI company",
    dataDescription: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Client-side mounting check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Header scroll animation
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    const handleScroll = () => {
      if (window.scrollY !== undefined) {
        setHeaderScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  const handleGetStarted = () => {
    setUserTypeDialog(true);
  };

  const handleUserTypeSelect = (type: string) => {
    setUserTypeDialog(false);
    if (type === "publisher") router.push("/login");
    else setAiCompanyForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Form submitted successfully!",
          severity: "success",
        });
        setAiCompanyForm(false);
        setFormData({
          name: "",
          email: "",
          userType: "AI company",
          dataDescription: "",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to submit form. Please try again.",
        severity: "error",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Don't render until mounted to avoid SSR issues
  if (!isMounted) {
    return null;
  }

  return authLoading ? (
    <LoadingSpinner fullScreen />
  ) : (
    <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff" }}>
      <HeaderSection
        user={user}
        headerScrolled={headerScrolled}
        handleGetStarted={handleGetStarted}
      />

      <HeroSection handleGetStarted={handleGetStarted} />

      <ProblemSection />

      <PublisherSection />

      <AICompanySection />

      <FinalCTASection handleGetStarted={handleGetStarted} />

      <UserTypeDialog
        userTypeDialog={userTypeDialog}
        setUserTypeDialog={setUserTypeDialog}
        handleUserTypeSelect={handleUserTypeSelect}
      />

      {/* AI Company Form */}
      <AICompanyForm
        aiCompanyForm={aiCompanyForm}
        setAiCompanyForm={setAiCompanyForm}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
