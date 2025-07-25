"use client";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportIcon from "@mui/icons-material/Support";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useAuth } from "../AuthProvider";
import { useState } from "react";
import { Backdrop, Tooltip } from "@mui/material";
import { usePathname } from "next/navigation";
import { useSupportModal } from "../../hooks/useSupportModal";
import { SupportModal } from "../Support";
import "./app-nav-bar.css";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: <DashboardOutlinedIcon /> },
  {
    label: "User Agreement",
    href: "/user-agreement",
    icon: <AdminPanelSettingsOutlinedIcon />,
  },
  {
    label: "Licensing Options",
    href: "/licensing-options",
    icon: <ArticleOutlinedIcon />,
  },
  { label: "Support", href: "#", icon: <SupportIcon />, isModal: true },
];

const logoIcon = "/Knowlio_Logo_Icon.jpg";

const logoIconText = "/Knowlio_Logo_Text.jpg";

export function AppNavBar() {
  const { user, signOutUser } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const { isOpen, openModal, closeModal } = useSupportModal();

  const handleNavItemClick = (item: any) => {
    if (item.isModal) {
      openModal();
    }
  };

  return (
    user && (
      <>
        <div
          className="nav-header-mobile"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img src={logoIconText} alt="" />
          {!isExpanded ? <MenuIcon /> : <CloseIcon />}
        </div>

        <nav className={`vertical-nav-bar ${isExpanded ? "expanded" : ""}`}>
          <button
            className="nav-collapse-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </button>

          <div className="nav-header">
            <Link href="/">
              <img src={logoIconText} alt="" style={{ cursor: 'pointer' }} />
            </Link>
            <div>{isExpanded ? <></> : <Link href="/"><img src={logoIcon} alt="" style={{ cursor: 'pointer' }} /></Link>}</div>
          </div>

          <ul className="nav-items">
            {navLinks.map((item) => (
              <Tooltip
                key={item.label}
                title={item.label}
                placement="right"
                disableHoverListener={isExpanded}
                disableTouchListener={isExpanded}
                classes={{ tooltip: "nav-tooltip" }}
              >
                <li key={item.label}>
                  {item.isModal ? (
                    <div
                      className="item"
                      onClick={() => handleNavItemClick(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`item ${
                        pathname.startsWith(item.href) ? "active" : ""
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              </Tooltip>
            ))}
          </ul>

          <div className="nav-footer">
            <div className="user-info">
              <Tooltip
                key={user?.email}
                title={user?.email}
                placement="right"
                disableHoverListener={isExpanded}
                disableTouchListener={isExpanded}
                classes={{ tooltip: "nav-tooltip" }}
              >
                <label className="user-status-toggle">
                  <input type="checkbox" defaultChecked />
                  <div data-text={user?.email?.[0]?.toUpperCase() ?? ""}></div>
                </label>
              </Tooltip>

              <div className="user-details">
                <p>{user?.name || user?.email}</p>
                <p>{user?.email}</p>
              </div>
            </div>

            <div className="user-actions">
              {
                <Tooltip
                  title="Profile Settings"
                  placement="right"
                  disableHoverListener={isExpanded}
                  disableTouchListener={isExpanded}
                  classes={{ tooltip: "nav-tooltip" }}
                >
                  <Link href={"/profile"}>
                    <button>
                      <span>
                        <SettingsOutlinedIcon />
                      </span>
                      <span>Profile Settings</span>
                    </button>
                  </Link>
                </Tooltip>
              }
              {
                <Tooltip
                  title="Log Out"
                  placement="right"
                  disableHoverListener={isExpanded}
                  disableTouchListener={isExpanded}
                  classes={{ tooltip: "nav-tooltip" }}
                >
                  <button onClick={signOutUser}>
                    <span>
                      <LogoutOutlinedIcon />
                    </span>
                    <span>Log Out</span>
                  </button>
                </Tooltip>
              }
            </div>
          </div>
        </nav>

        <Backdrop
          open={isExpanded}
          onClick={() => setIsExpanded(false)}
          sx={{ zIndex: 100 }}
        />
        
        <SupportModal isOpen={isOpen} onClose={closeModal} />
      </>
    )
  );
}
