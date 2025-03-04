import React from "react";
import { Issue } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { dateFormatter } from "../../utils/dateFormatter";

interface IssuesListProps {
  issues: Issue[];
  loading: boolean;
  error: string | null;
}

const IssuesList: React.FC<IssuesListProps> = ({ issues, loading, error }) => {
  const { theme } = useTheme();

  const useMediaQuery = (query: string) => {
    const [matches, setMatches] = React.useState(false);

    React.useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
  };

  const isMobile = useMediaQuery("(max-width: 640px)");

  const getTextColor = (bgColor: string): string => {
    const color = parseInt(bgColor, 16);
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return brightness > 128 ? "#000" : "#fff";
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 0",
          color: theme.secondaryText,
          width: "100%",
        }}
        aria-live="polite"
        aria-busy="true"
      >
        <div
          style={{
            height: "3rem",
            width: "3rem",
            borderRadius: "9999px",
            borderBottom: `2px solid ${theme.buttonAccent}`,
            animation: "spin 1s linear infinite",
          }}
          role="status"
        ></div>
        <span style={{ marginTop: "1rem", color: theme.secondaryText }}>
          Loading issues...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: theme.errorBackground,
          borderLeft: `4px solid ${theme.errorText}`,
          padding: "1rem",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          width: "100%",
        }}
        role="alert"
        aria-live="assertive"
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "nowrap",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <svg
              style={{
                height: "1.25rem",
                width: "1.25rem",
                color: theme.errorText,
              }}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div style={{ marginLeft: "0.75rem", flexGrow: 1 }}>
            <p style={{ fontSize: "0.875rem", color: theme.errorText }}>
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: isMobile ? "2rem 0.5rem" : "3rem 1rem",
          borderRadius: "0.5rem",
          backgroundColor: theme.emptyStateBackground,
          width: "100%",
        }}
        aria-live="polite"
      >
        <svg
          style={{
            margin: "0 auto",
            height: isMobile ? "3rem" : "4rem",
            width: isMobile ? "3rem" : "4rem",
            color: theme.secondaryText,
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3
          style={{
            marginTop: "1rem",
            fontSize: isMobile ? "1rem" : "1.125rem",
            fontWeight: 500,
            color: theme.text,
          }}
        >
          No issues found
        </h3>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: theme.secondaryText,
            maxWidth: "100%",
            margin: "0.5rem auto 0",
            padding: "0 0.5rem",
          }}
        >
          There are no issues matching your current filters. Try adjusting your
          search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        width: "100%",
      }}
      role="list"
      aria-label="Repository issues"
    >
      {issues.map((issue) => {
        const formattedDate = dateFormatter(issue.created_at);
        const commentsCount = issue.comments_count ?? issue.comments ?? 0;

        return (
          <div
            key={issue.id}
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
              borderRadius: "0.75rem",
              padding: isMobile ? "0.75rem" : "1rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              transition: "box-shadow 0.2s, transform 0.2s",
              border: `1px solid ${theme.border}`,
              color: theme.text,
              width: "100%",
            }}
            className="hover:shadow-md"
            data-issue-id={issue.id}
          >
            <div
              style={{
                display: "flex",
                gap: isMobile ? "0.5rem" : "0.75rem",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
              }}
            >
              {!isMobile && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "9999px",
                    flexShrink: 0,
                    backgroundColor: theme.buttonBg,
                  }}
                >
                  {issue.state === "open" ? (
                    <svg
                      style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        color: "#3fb950",
                      }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        color: "#8957e5",
                      }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: isMobile ? "flex-start" : "space-between",
                    gap: "0.5rem",
                  }}
                >
                  {isMobile && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "1.5rem",
                          height: "1.5rem",
                          borderRadius: "9999px",
                          flexShrink: 0,
                          backgroundColor: theme.buttonBg,
                        }}
                      >
                        {issue.state === "open" ? (
                          <svg
                            style={{
                              width: "1rem",
                              height: "1rem",
                              color: "#3fb950",
                            }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            style={{
                              width: "1rem",
                              height: "1rem",
                              color: "#8957e5",
                            }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          backgroundColor: theme.buttonBg,
                          color: theme.secondaryText,
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          borderRadius: "0.375rem",
                        }}
                      >
                        #{issue.number}
                      </span>
                    </div>
                  )}

                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: isMobile ? "1rem" : "1.125rem",
                      fontWeight: 600,
                      color: theme.text,
                      wordBreak: "break-word",
                      transition: "color 0.15s",
                      flexGrow: 1,
                      width: isMobile ? "100%" : "auto",
                    }}
                    className="hover:text-blue-600"
                    aria-label={`Issue ${issue.number}: ${issue.title}`}
                  >
                    {issue.title}
                  </a>

                  {!isMobile && (
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: theme.buttonBg,
                        color: theme.secondaryText,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        borderRadius: "0.375rem",
                        flexShrink: 0,
                      }}
                    >
                      #{issue.number}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    marginTop: "0.5rem",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    fontSize: "0.875rem",
                    color: theme.secondaryText,
                    gap: isMobile ? "0.5rem" : 0,
                  }}
                >
                  <div
                    style={{
                      marginRight: isMobile ? 0 : "1rem",
                      marginBottom: isMobile ? "0.25rem" : 0,
                      display: "flex",
                      alignItems: "center",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    <svg
                      style={{
                        marginRight: "0.25rem",
                        height: "1rem",
                        width: "1rem",
                      }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {formattedDate}
                  </div>

                  <div
                    style={{
                      marginRight: isMobile ? 0 : "1rem",
                      marginBottom: isMobile ? "0.25rem" : 0,
                      display: "flex",
                      alignItems: "center",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    <svg
                      style={{
                        marginRight: "0.25rem",
                        height: "1rem",
                        width: "1rem",
                      }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <a
                      href={issue.user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: theme.linkColor }}
                      className="hover:underline"
                    >
                      {issue.user.login}
                    </a>
                  </div>

                  {commentsCount > 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: isMobile ? "100%" : "auto",
                      }}
                    >
                      <svg
                        style={{
                          marginRight: "0.25rem",
                          height: "1rem",
                          width: "1rem",
                        }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {commentsCount}
                    </div>
                  )}
                </div>
                {issue.labels.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginTop: "0.75rem",
                      width: "100%",
                    }}
                  >
                    {issue.labels.map((label) => (
                      <span
                        key={label.id}
                        className="px-2 py-1 text-xs font-medium rounded-full inline-block"
                        style={{
                          backgroundColor: `#${label.color}`,
                          color: getTextColor(label.color),
                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "9999px",
                          maxWidth: isMobile ? "100%" : "auto",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={label.description || label.name}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IssuesList;
