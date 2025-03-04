# GitHub Repository Explorer

A React-based web application that allows users to search GitHub repositories, view repository details, and explore issues with filtering and visual breakdowns.

---

## Features

- **Search GitHub Repositories**: Search for repositories by keyword and view results with pagination.
- **Repository Details**: View detailed information about a repository, including:
  - URL
  - Description
  - Forks count
  - Stargazers count
  - Open issues count
- **Link to GitHub**: Direct link to the actual GitHub repository page.
- **Issue List**: View a list of all issues for a repository.
- **Issue Filtering**: Filter issues by state (`open` or `closed`).
- **Issue Breakdown**: Visualize the breakdown of issues using a pie chart (open vs. closed).

---

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/github-repo-explorer.git
   cd github-repo-explorer
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory.
   - Add your GitHub API token to the `.env` file:
     ```bash
     VITE_GITHUB_TOKEN=your_github_token_here
     ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open the application**:
   Open your browser and navigate to [http://localhost:5173]
