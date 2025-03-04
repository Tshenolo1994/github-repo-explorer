import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Repository } from "../../types";
import { PiArrowUpRightLight } from "react-icons/pi";

interface RepositoryDetailProps {
  repository: Repository;
}

const RepositoryDetail: React.FC<RepositoryDetailProps> = ({ repository }) => {
  const { theme } = useTheme();

  return (
    <div
      className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: theme.background,
        borderColor: theme.border,
        border: "1px solid",
      }}
    >
      <div className="relative p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <img
              src={repository.owner.avatar_url}
              alt={`${repository.owner.login}'s avatar`}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white mr-4 shadow-md"
            />
            <div>
              <h1
                className="text-xl sm:text-2xl md:text-3xl font-bold"
                style={{ color: theme.text }}
              >
                {repository.name}
              </h1>
              <p className="text-white/80">
                by{" "}
                <a
                  href={repository.owner.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-medium"
                  style={{ color: theme.text }}
                >
                  {repository.owner.login}
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-2 md:mt-0 w-full md:w-auto justify-center items-center">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-50 transition-colors duration-200 flex-grow md:flex-grow-0 text-center"
              style={{ color: theme.text }}
            >
              View on GitHub
            </a>
            <PiArrowUpRightLight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="mb-6 sm:mb-8">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: theme.text }}
          >
            About
          </h2>
          <p className="text-base" style={{ color: theme.text }}>
            {repository.description || "No description available"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <div
            className="p-3 sm:p-4 rounded-lg text-center transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: theme.surface }}
          >
            <div
              className="text-xl sm:text-2xl font-bold"
              style={{ color: theme.secondaryText }}
            >
              {repository.stargazers_count.toLocaleString()}
            </div>
            <div style={{ color: theme.secondaryText }}>Stars</div>
          </div>
          <div
            className="p-3 sm:p-4 rounded-lg text-center transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: theme.surface }}
          >
            <div
              className="text-xl sm:text-2xl font-bold"
              style={{ color: theme.secondaryText }}
            >
              {repository.forks_count.toLocaleString()}
            </div>
            <div style={{ color: theme.secondaryText }}>Forks</div>
          </div>
          <div
            className="p-3 sm:p-4 rounded-lg text-center transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: theme.surface }}
          >
            <div
              className="text-xl sm:text-2xl font-bold"
              style={{ color: theme.secondaryText }}
            >
              {repository.open_issues_count.toLocaleString()}
            </div>
            <div style={{ color: theme.secondaryText }}>Issues</div>
          </div>
          <div
            className="p-3 sm:p-4 rounded-lg text-center transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: theme.surface }}
          >
            <div
              className="text-xl sm:text-2xl font-bold"
              style={{ color: theme.secondaryText }}
            >
              {repository.watchers_count.toLocaleString()}
            </div>
            <div style={{ color: theme.secondaryText }}>Watchers</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div
            className="flex items-center p-3 rounded-lg"
            style={{ backgroundColor: theme.surface }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              fill="currentColor"
              style={{ color: theme.secondaryText }}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span style={{ color: theme.secondaryText }}>
              Created: {new Date(repository.created_at).toLocaleDateString()}
            </span>
          </div>
          <div
            className="flex items-center p-3 rounded-lg"
            style={{ backgroundColor: theme.surface }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              fill="currentColor"
              style={{ color: theme.secondaryText }}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span style={{ color: theme.secondaryText }}>
              Updated: {new Date(repository.updated_at).toLocaleDateString()}
            </span>
          </div>
          {repository.language && (
            <div
              className="flex items-center p-3 rounded-lg"
              style={{ backgroundColor: theme.surface }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                fill="currentColor"
                style={{ color: theme.secondaryText }}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span style={{ color: theme.secondaryText }}>
                {repository.language}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetail;