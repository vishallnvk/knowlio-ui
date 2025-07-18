"use client";

import { useAuth } from "@/components/AuthProvider";
import ContentBrowser from "./ContentBrowser";
import { Box } from "@mui/material";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Content Browser */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <ContentBrowser />
      </Box>
    </Box>
  );
}
