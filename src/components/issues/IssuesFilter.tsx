import React from "react";
import { IssueState } from "../../types";
import { useTheme } from "../../context/ThemeContext";

interface IssuesFilterProps {
  currentState: IssueState;
  onChange: (state: IssueState) => void;
}

const IssuesFilter: React.FC<IssuesFilterProps> = ({
  currentState,
  onChange,
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      <div
        className="font-medium text-sm sm:text-base"
        style={{ color: theme.text }}
      >
        Filter:
      </div>
      <div
        className="flex bg-gray-100 rounded-md shadow-sm w-full sm:w-auto"
        style={{ backgroundColor: theme.buttonBg }}
      >
        {(["all", "open", "closed"] as IssueState[]).map((state) => (
          <button
            key={state}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              state === "all" ? "rounded-l-md" : ""
            } ${state === "closed" ? "rounded-r-md" : ""} ${
              currentState === state
                ? "text-white"
                : `hover:bg-opacity-50 ${theme.buttonBg}`
            }`}
            style={{
              backgroundColor:
                currentState === state ? theme.buttonAccent : "transparent",
              color: currentState === state ? theme.text : theme.secondaryText,
            }}
            onClick={() => onChange(state)}
            aria-label={`Show ${state} issues`}
            aria-pressed={currentState === state}
          >
            {state.charAt(0).toUpperCase() + state.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IssuesFilter;
