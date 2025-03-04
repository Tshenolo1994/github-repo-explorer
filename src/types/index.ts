export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface SearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export interface Label {
  id: number;
  name: string;
  color: string;
  description?: string; // Optional description
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  body: string | null;
  labels: Label[];
  comments?: number;
  comments_count?: number;
}

export type IssueState = "open" | "closed" | "all";
