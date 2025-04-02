"use client";
import { useEffect, useState } from "react";
import { getGithubRepos } from "@/app/actions/github";
import {
  FiStar,
  FiGitBranch,
  FiExternalLink,
  FiClock,
  FiFilter,
  FiGlobe,
} from "react-icons/fi";
import { format } from "date-fns";

interface Repo {
  name: string;
  language: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
  homepage: string;
  updatedAt: string;
  topics: string[];
  visibility: string;
  pinned?: boolean;
}

const languageColors: { [key: string]: string } = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Java: "#B07219",
  HTML: "#E34F26",
  CSS: "#563D7C",
  // Add more languages as needed
};

const GithubInfo = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<"stars" | "updated">("stars");
  const [showAll, setShowAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await getGithubRepos(showAll);
        setRepos(data);
      } catch (error) {
        setError("Failed to fetch GitHub repositories: " + error);
      }
    };

    fetchRepos();
  }, [showAll]);

  const sortedRepos = [...repos].sort((a, b) => {
    if (sortBy === "stars") {
      return b.stars - a.stars;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  if (error) {
    return (
      <div className="p-6 text-red-400 flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-medium mb-3 text-gray-900 dark:text-white">
            {showAll ? "All Projects" : "Featured Projects"}
          </h2>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-gray-600 dark:text-gray-400">
              {showAll
                ? "Explore all my GitHub repositories"
                : "Check out my pinned repositories"}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
                aria-label="Toggle filters"
              >
                <FiFilter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              <button
                onClick={() => setShowAll(!showAll)}
                className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:border-gray-400 hover:bg-gray-100 dark:hover:border-gray-700 dark:hover:bg-gray-900 transition-all"
              >
                {showAll ? "Show Pinned Only" : "See All"}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2 items-center animate-fadeIn">
              <span className="text-sm text-gray-600 dark:text-gray-500">
                Sort by:
              </span>
              <button
                onClick={() => setSortBy("stars")}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  sortBy === "stars"
                    ? "bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                    : "bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-gray-300 hover:bg-gray-100 dark:hover:border-gray-700 dark:hover:bg-gray-900"
                }`}
              >
                Stars
              </button>
              <button
                onClick={() => setSortBy("updated")}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  sortBy === "updated"
                    ? "bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                    : "bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-gray-300 hover:bg-gray-100 dark:hover:border-gray-700 dark:hover:bg-gray-900"
                }`}
              >
                Recently Updated
              </button>
            </div>
          )}
        </div>

        {repos.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-800 opacity-25"></div>
              <div className="absolute inset-0 rounded-full border-2 border-t-gray-600 dark:border-t-gray-400 animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedRepos.map((repo) => (
              <div
                key={repo.name}
                className="group p-6 bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-gray-300/50 dark:hover:border-gray-700/50 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors line-clamp-1 flex items-center gap-1.5"
                    >
                      {repo.name}
                      <FiExternalLink className="inline-block w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-xs text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors flex items-center gap-1"
                      >
                        <FiGlobe className="w-3 h-3" />
                        <span className="line-clamp-1">Live Demo</span>
                      </a>
                    )}
                  </div>
                  {repo.pinned && (
                    <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/50 px-2 py-1 rounded-full border border-gray-200/50 dark:border-gray-800/50">
                      Pinned
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {repo.description || "No description provided"}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 text-xs rounded-full bg-gray-100/80 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-800/50"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{repo.topics.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            languageColors[repo.language] || "#8B949E",
                        }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  {repo.stars > 0 && (
                    <div className="flex items-center gap-1">
                      <FiStar className="w-3.5 h-3.5" />
                      <span>{repo.stars}</span>
                    </div>
                  )}
                  {repo.forks > 0 && (
                    <div className="flex items-center gap-1">
                      <FiGitBranch className="w-3.5 h-3.5" />
                      <span>{repo.forks}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 ml-auto">
                    <FiClock className="w-3.5 h-3.5" />
                    <span>{format(new Date(repo.updatedAt), "MMM d")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubInfo;

// Add to your global CSS file
/* 
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
*/
