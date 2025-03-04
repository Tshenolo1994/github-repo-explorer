import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { CiHeart } from "react-icons/ci";

interface FooterProps {
  developerName?: string;
}

const Footer: React.FC<FooterProps> = ({ developerName = "Tshenolo" }) => {
  const { theme } = useTheme();

  return (
    <footer
      className="py-8 text-center"
      style={{
        backgroundColor: theme.background,
        borderColor: theme.border,

        borderTop: `1px solid ${theme.border}`,
      }}
    >
      <p className="text-sm" style={{ color: theme.secondaryText }}>
        GitHub Repository Explorer © 2023
      </p>
      <p className="text-sm mt-2" style={{ color: theme.secondaryText }}>
        Designed and developed by {developerName}{" "}
        <CiHeart className="inline-block" />
      </p>
    </footer>
  );
};

export default Footer;
