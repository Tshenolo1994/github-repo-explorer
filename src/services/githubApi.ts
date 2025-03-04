import { Repository, Issue, SearchResult, IssueState } from "../types";

const BASE_URL = "https://api.github.com";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error("GitHub token is missing. Please check your .env file.");
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 403) {
    const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");
    if (rateLimitRemaining === "0") {
      throw new Error(
        "GitHub API rate limit exceeded. Please try again later."
      );
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || response.statusText;
    throw new Error(`GitHub API error: ${response.status} - ${errorMessage}`);
  }

  return response.json() as Promise<T>;
};

export const searchRepositories = async (
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<SearchResult> => {
  const url = `${BASE_URL}/search/repositories?q=${encodeURIComponent(
    query
  )}&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };
  const response = await fetch(url, { headers });
  return handleResponse<SearchResult>(response);
};

export const getRepository = async (
  owner: string,
  repo: string
): Promise<Repository> => {
  const url = `${BASE_URL}/repos/${owner}/${repo}`;
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };
  const response = await fetch(url, { headers });
  return handleResponse<Repository>(response);
};

export const getRepositoryIssues = async (
  owner: string,
  repo: string,
  state: IssueState = "all",
  page: number = 1,
  perPage: number = 10
): Promise<{ items: Issue[]; totalCount: number }> => {
  const stateParam = state === "all" ? "" : `&state=${state}`;
  const url = `${BASE_URL}/repos/${owner}/${repo}/issues?page=${page}&per_page=${perPage}${stateParam}`;

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

  const response = await fetch(url, { headers });
  const items = await handleResponse<Issue[]>(response);

  return { items, totalCount: 0 };
};

export const searchIssues = async (
  owner: string,
  repo: string,
  state?: IssueState
): Promise<{
  total_count: number;
  incomplete_results: boolean;
  items: Issue[];
}> => {
  let query = `repo:${owner}/${repo}`;
  if (state && state !== "all") {
    query += `+state:${state}`;
  }

  const url = `${BASE_URL}/search/issues?q=${encodeURIComponent(query)}`;
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };
  const response = await fetch(url, { headers });
  return handleResponse<{
    total_count: number;
    incomplete_results: boolean;
    items: Issue[];
  }>(response);
};

export const getIssueStats = async (
  owner: string,
  repo: string
): Promise<{ open: number; closed: number }> => {
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

  const [openResponse, closedResponse] = await Promise.all([
    fetch(
      `${BASE_URL}/search/issues?q=repo:${owner}/${repo}+state:open+is:issue`,
      {
        headers,
      }
    ),
    fetch(
      `${BASE_URL}/search/issues?q=repo:${owner}/${repo}+state:closed+is:issue`,
      {
        headers,
      }
    ),
  ]);

  const [openData, closedData] = await Promise.all([
    handleResponse<{ total_count: number }>(openResponse),
    handleResponse<{ total_count: number }>(closedResponse),
  ]);

  return {
    open: openData.total_count || 0,
    closed: closedData.total_count || 0,
  };
};
