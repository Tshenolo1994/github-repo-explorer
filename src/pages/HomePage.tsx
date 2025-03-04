import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { GrSearchAdvanced } from "react-icons/gr";
import { IoAnalyticsOutline } from "react-icons/io5";
import { VscDebugAlt } from "react-icons/vsc";
import { PiArrowUpRightLight } from "react-icons/pi";

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const { query } = useSearch();

  const trendingRepos = [
    {
      id: 1,
      name: "microsoft/deepspeed",
      stars: 15423,
      description:
        "DeepSpeed is a deep learning optimization library that makes distributed training efficient, effective, and easy.",
      language: "Python",
    },
    {
      id: 2,
      name: "shadcn/ui",
      stars: 34982,
      description:
        "Beautifully designed components built with Radix UI and Tailwind CSS.",
      language: "TypeScript",
    },
    {
      id: 3,
      name: "dreamgaussian/dreamgaussian",
      stars: 12354,
      description: "Generating 3D Gaussian Splats from images",
      language: "Python",
    },
  ];

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      Go: "#00ADD8",
      Ruby: "#701516",
    };
    return colors[language] || "#6e7681";
  };

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
        width: "100%",
      }}
      className="w-full overflow-x-hidden"
    >
      <div className="gradient-ball"></div>

      <section className="text-center py-8 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto mt-10 sm:mt-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Explore GitHub <span className="gradient-text">Repositories</span>
          </h1>
          <p
            className="text-base sm:text-xl mb-6 sm:mb-8"
            style={{ color: theme.secondaryText }}
          >
            Search and browse through millions of open source projects. Discover
            repositories, view details, and track issues all in one place.
          </p>

          <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <SearchBar defaultQuery={query} />
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div
              className="p-4 sm:p-6 rounded-lg text-center"
              style={{ backgroundColor: theme.surface, border: "none" }}
            >
              <div className="text-xl sm:text-2xl mb-4 flex justify-center">
                <GrSearchAdvanced />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Advanced Search
              </h3>
              <p style={{ color: theme.secondaryText }}>
                Find repositories by name, language, stars, and more using
                GitHub's powerful search API.
              </p>
            </div>

            <div
              className="p-4 sm:p-6 rounded-lg text-center relative z-10"
              style={{ backgroundColor: theme.surface, border: "none" }}
            >
              <div className="text-xl sm:text-2xl mb-4 flex justify-center">
                <IoAnalyticsOutline />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Repository Analytics
              </h3>
              <p style={{ color: theme.secondaryText }}>
                View detailed repository statistics including stars, forks, and
                watcher counts.
              </p>
            </div>

            <div
              className="p-4 sm:p-6 rounded-lg text-center"
              style={{ backgroundColor: theme.surface, border: "none" }}
            >
              <div className="text-xl sm:text-2xl mb-4 flex justify-center">
                <VscDebugAlt />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Issue Tracking
              </h3>
              <p style={{ color: theme.secondaryText }}>
                Browse repository issues, filter by state, and visualize open vs.
                closed ratios.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-6">
            <div className="flex justify-center">
              <h2
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: theme.text }}
              >
                Trending Repository
              </h2>
            </div>

            <Link
              to=""
              className="absolute top-0 right-0 text-sm hover:underline flex items-center gap-4"
              style={{ color: theme.text }}
            >
              View All
              <PiArrowUpRightLight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {trendingRepos.map((repo) => (
              <div
                key={repo.id}
                className="p-4 rounded-lg cursor-pointer transition-transform hover:-translate-y-1 duration-200"
                style={{ backgroundColor: theme.surface, border: "none" }}
              >
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.linkColor }}
                >
                  {repo.name}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: theme.secondaryText }}
                >
                  {repo.description}
                </p>
                <div
                  className="flex justify-between text-xs"
                  style={{ color: theme.secondaryText }}
                >
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-1"
                      style={{
                        backgroundColor: getLanguageColor(repo.language),
                      }}
                    ></span>
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                    </svg>
                    {repo.stars.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;