import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRepository,
  getRepositoryIssues,
  getIssueStats,
} from "../services/githubApi";
import { Repository, Issue, IssueState } from "../types";
import RepositoryDetail from "../components/repository/RepositoryDetails";
import IssuesFilter from "../components/issues/IssuesFilter";
import IssuesList from "../components/issues/IssuesList";
import IssuesChart from "../components/issues/IssuesChart";
import { useTheme } from "../context/ThemeContext";
import PaginationControls from "../components/uiLayout/PaginationControls";

const RepositoryPage: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [issueState, setIssueState] = useState<IssueState>("all");
  const [openCount, setOpenCount] = useState<number>(0);
  const [closedCount, setClosedCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const repoData = await getRepository(owner!, repo!);
        setRepository(repoData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchRepository();
  }, [owner, repo]);

  useEffect(() => {
    const fetchIssuesAndStats = async () => {
      try {
        setLoading(true);

        const issuesResponse = await getRepositoryIssues(
          owner!,
          repo!,
          issueState,
          page,
          perPage
        );
        setIssues(issuesResponse.items);

        const stats = await getIssueStats(owner!, repo!);
        setOpenCount(stats.open);
        setClosedCount(stats.closed);

        if (issueState === "open") {
          setTotalCount(stats.open);
        } else if (issueState === "closed") {
          setTotalCount(stats.closed);
        } else {
          setTotalCount(stats.open + stats.closed);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIssuesAndStats();
  }, [owner, repo, issueState, page, perPage]);

  const handleGoBack = () => {
    navigate("/search");
  };

  if (!repository) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
        width: "100%",
      }}
      className="w-full overflow-x-auto" 
    >
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6"> 
        <button
          onClick={handleGoBack}
          style={{
            marginBottom: "20px",
            padding: "8px 16px",
            backgroundColor: theme.buttonBg,
            color: theme.text,
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px", 
          }}
          className="w-full sm:w-auto" 
        >
          Go Back to Search
        </button>
        <RepositoryDetail repository={repository} />

        <div className="mt-8">
          <IssuesChart openCount={openCount} closedCount={closedCount} />
        </div>

        <div className="mt-8">
          <IssuesFilter currentState={issueState} onChange={setIssueState} />
        </div>

        <div className="mt-8">
          <IssuesList issues={issues} loading={loading} error={error} />
        </div>

        {totalCount > 0 && (
          <div className="mt-8">
            <PaginationControls
              page={page}
              perPage={perPage}
              totalCount={totalCount}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryPage;