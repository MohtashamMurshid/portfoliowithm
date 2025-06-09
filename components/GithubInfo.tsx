"use client";
import { useEffect, useState } from "react";
import { getGithubRepos } from "@/actions/github";
import { format } from "date-fns";
import MaxWidthWrapper from "./MaxWidthWrapper";

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

const GithubInfo = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await getGithubRepos(false); // Only show pinned repos
        setRepos(data);
      } catch (error) {
        setError("Failed to fetch GitHub repositories: " + error);
      }
    };

    fetchRepos();
  }, []);

  // Sort by stars in descending order
  const sortedRepos = [...repos].sort((a, b) => b.stars - a.stars);

  if (error) {
    return (
      <div className="p-6 text-red-500 flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="w-full py-20" id="projects">
        <div className="max-w-4xl mx-auto px-6">
          {repos.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-600 opacity-25"></div>
                <div className="absolute inset-0 rounded-full border-2 border-t-gray-800 dark:border-t-gray-400 animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="flex items-center justify-between py-2"
                >
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 hover:opacity-70 transition-opacity"
                  >
                    <div className="text-black dark:text-white text-sm">
                      <span className="font-bold">{repo.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
                        {repo.description
                          ? repo.description.length > 60
                            ? `${repo.description.substring(0, 60)}...`
                            : repo.description
                          : "No description provided"}
                      </span>
                    </div>
                  </a>
                  <div className="flex items-center text-sm ml-8 flex-shrink-0">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-4 px-3 py-1 text-xs font-semibold  text-gray-700 dark:text-gray-300 "
                      >
                        Live
                      </a>
                    )}
                    <div className="text-gray-500 dark:text-gray-400">
                      {format(new Date(repo.updatedAt), "yyyy")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <span className="text-gray-400 dark:text-gray-500 text-sm">
              Projects
            </span>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default GithubInfo;
