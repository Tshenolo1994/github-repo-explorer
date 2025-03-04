import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Repository } from "../../types";
import { PiArrowUpRightLight } from "react-icons/pi";

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleClick = () => {
    navigate(`/repository/${repository.owner.login}/${repository.name}`);
  };

  const formatNumber = (num: number): string => {
    return num > 999 ? (num / 1000).toFixed(1) + "k" : num.toString();
  };

  const getLanguageColor = (language: string | null): string => {
    if (!language) return "#6e7681";

    const colors: { [key: string]: string } = {
      HTML: "#e34c26",
      CSS: "#563d7c",
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      Go: "#00ADD8",
      Ruby: "#701516",
      "C++": "#f34b7d",
      "C#": "#178600",
      PHP: "#4F5D95",
    };
    return colors[language] || "#6e7681";
  };

  return (
    <div
      className="p-4 sm:p-6 md:p-8 rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
        border: "1px solid",
      }}
      onClick={handleClick}
    >
      <div className="flex items-start">
        <img
          src={repository.owner.avatar_url}
          alt={`${repository.owner.login}'s avatar`}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-4"
        />
        <div className="flex-1">
          <h3
            className="text-base sm:text-lg font-semibold"
            style={{ color: theme.linkColor }}
          >
            {repository.full_name}
          </h3>
          <p className="mt-1 text-xs sm:text-sm">
            {repository.description || "No description available"}
          </p>

          <div
            className="flex flex-wrap mt-3 text-xs"
            style={{ color: theme.secondaryText }}
          >
            <div className="flex items-center mr-4 sm:mr-6">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              <span>{formatNumber(repository.stargazers_count)}</span>
            </div>

            <div className="flex items-center mr-4 sm:mr-6">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 10-6 0zm6.75 3.75h-7.5a.75.75 0 00-.75.75v.878a2.25 2.25 0 106 0v-.878a.75.75 0 00-.75-.75z" />
              </svg>
              <span>{formatNumber(repository.forks_count)}</span>
            </div>

            <div className="flex items-center mr-4 sm:mr-6">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" />
              </svg>
              <span>{formatNumber(repository.open_issues_count)}</span>
            </div>

            {repository.language && (
              <div className="flex items-center">
                <span
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1"
                  style={{
                    backgroundColor: getLanguageColor(repository.language),
                  }}
                ></span>
                <span>{repository.language}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <PiArrowUpRightLight className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;