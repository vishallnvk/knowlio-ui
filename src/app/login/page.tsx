"use client";

import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signInWithRedirect } from "aws-amplify/auth";
import { useAuth } from "@/components/AuthProvider";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn({
        username: email,
        password: password,
      });
    } catch (error: any) {
      console.log(error);
      setError(error.message || "An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithRedirect({ provider: "Google" });
    } catch (error: any) {
      console.error("Google sign in error:", error);
      setError(error.message || "An error occurred during Google sign in");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  if (authLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (user) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Login Form */}
      <Container maxWidth="sm" className="pt-16">
        <Paper elevation={3} className="p-8">
          <Box className="text-center mb-6">
            <Typography
              variant="h4"
              component="h1"
              className="font-bold text-gray-900 mb-2"
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Sign in to your Knowlio account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
              className="mb-4"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            <Box className="text-center mb-4">
              <Typography variant="body2" className="text-gray-500 mb-4">
                or
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mb-4"
              sx={{
                borderColor: "#db4437",
                color: "#db4437",
                "&:hover": {
                  borderColor: "#c23321",
                  backgroundColor: "#fdf2f2",
                },
              }}
            >
              Continue with Google
            </Button>

            <Box className="text-center">
              <Typography variant="body2" className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
