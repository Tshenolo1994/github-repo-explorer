import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIssueStats } from "../../services/githubApi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface IssuesChartProps {
  openCount?: number;
  closedCount?: number;
}

const IssuesChart: React.FC<IssuesChartProps> = ({
  openCount,
  closedCount,
}) => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [stats, setStats] = useState<{ open: number; closed: number }>({
    open: openCount || 0,
    closed: closedCount || 0,
  });
  const [isLoading, setIsLoading] = useState(!openCount && !closedCount);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (openCount !== undefined && closedCount !== undefined) {
      setStats({ open: openCount, closed: closedCount });
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const statsData = await getIssueStats(owner!, repo!);
        setStats(statsData);
      } catch (err) {
        setError("Failed to fetch issue statistics. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [owner, repo, openCount, closedCount]);

  useEffect(() => {
    if (openCount !== undefined && closedCount !== undefined) {
      setStats({ open: openCount, closed: closedCount });
    }
  }, [openCount, closedCount]);

  const data: ChartData[] = [
    { name: "Open Issues", value: stats.open, color: "#38bdf8" },
    { name: "Closed Issues", value: stats.closed, color: "#a855f7" },
  ];

  const totalIssues = stats.open + stats.closed;
  const openPercentage =
    totalIssues > 0 ? ((stats.open / totalIssues) * 100).toFixed(1) : "0";
  const closedPercentage =
    totalIssues > 0 ? ((stats.closed / totalIssues) * 100).toFixed(1) : "0";

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const StatsCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <div
      className="p-4 rounded-lg transition-all duration-200 hover:translate-y-[-2px]"
      style={{ backgroundColor: theme.surface }}
    >
      <div className="flex items-center">
        <div
          className="p-3 rounded-full mr-4"
          style={{ backgroundColor: `${color}1a` }}
        >
          {icon}
        </div>
        <div>
          <div
            className="text-sm font-medium"
            style={{ color: theme.secondaryText }}
          >
            {title}
          </div>
          <div className="text-2xl font-bold" style={{ color }}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="p-4 sm:p-6 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: theme.background,
        borderColor: theme.border,
        border: "1px solid",
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2
          className="text-lg sm:text-xl font-bold mb-4 sm:mb-0"
          style={{ color: theme.text }}
        >
          Issues Breakdown
        </h2>

        <div className="flex items-center">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              color: "#38bdf8",
            }}
          >
            {openPercentage}% open
          </span>
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              color: "#a855f7",
            }}
          >
            {closedPercentage}% closed
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="h-48 sm:h-64 flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12 sm:h-16 sm:w-16"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="h-48 sm:h-64 flex items-center justify-center text-center">
          <div style={{ color: theme.secondaryText }}>
            <svg
              className="mx-auto h-8 w-8 sm:h-12 sm:w-12 mb-4 opacity-50"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="text-lg font-medium">Error</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      ) : totalIssues === 0 ? (
        <div className="h-48 sm:h-64 flex items-center justify-center text-center">
          <div style={{ color: theme.secondaryText }}>
            <svg
              className="mx-auto h-8 w-8 sm:h-12 sm:w-12 mb-4 opacity-50"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="text-lg font-medium">No issues found</p>
            <p className="mt-1">
              This repository doesn't have any open or closed issues yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
                paddingAngle={5}
                animationDuration={750}
                animationBegin={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} issues`, null]}
                contentStyle={{
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  color: theme.text,
                  borderRadius: "8px",
                  padding: "8px 12px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                labelStyle={{
                  color: theme.text,
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                formatter={(value) => (
                  <span style={{ color: theme.text }}>{value}</span>
                )}
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <StatsCard
          title="Open Issues"
          value={stats.open}
          icon={
            <svg
              className="h-6 w-6"
              fill="#38bdf8"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          }
          color="#38bdf8"
        />
        <StatsCard
          title="Closed Issues"
          value={stats.closed}
          icon={
            <svg
              className="h-6 w-6"
              fill="#a855f7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          }
          color="#a855f7"
        />
      </div>
    </div>
  );
};

export default IssuesChart;
