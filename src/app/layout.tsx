"use client";

import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AuthProvider, useAuth } from "../components/AuthProvider";
import Footer from "../components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Box } from "@mui/material";
import { AppNavBar } from "@/components/AppNavBar/AppNavBar";
import { usePathname } from "next/navigation";
import SupportModalProvider from "../components/Support/SupportModalProvider";
import SupportModal from "../components/Support/SupportModal";
import { useSupportModal } from "../hooks/useSupportModal";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body lang="en" className={roboto.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <QueryProvider>
              <AuthProvider>
                <SupportModalProvider>
                  <LayoutWithAuth>{children}</LayoutWithAuth>
                  <SupportModalRenderer />
                </SupportModalProvider>
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

function SupportModalRenderer() {
  const { isOpen, closeModal } = useSupportModal();
  
  return (
    <SupportModal isOpen={isOpen} onClose={closeModal} />
  );
}

function LayoutWithAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  // Paths where AppNavBar should be hidden
  const HIDE_NAVBAR_PATHS = ["/"];

  const hideNavBar = HIDE_NAVBAR_PATHS.includes(pathname);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {!hideNavBar && <AppNavBar />}
      <Box
        sx={{
          flex: 1,
          marginLeft: user && !hideNavBar ? { xs: "0px", md: "64px" } : {},
          marginTop: user && !hideNavBar ? { xs: "48px", md: "0px" } : {},
          background: "#f1f5f9",
        }}
      >
        {children}
      </Box>
      <Footer isNavHidden={hideNavBar} />
    </Box>
  );
}
