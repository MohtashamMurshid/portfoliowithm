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
          {/* Header */}
          <div className="ornate-border parchment-texture p-8 mb-12 relative">
            <div className="manuscript-corner"></div>

            {/* Decorative line */}
            <div className="decorative-line mb-6"></div>

            <div className="text-center">
              <h2 className="manuscript-heading text-3xl font-semibold mb-4 ink-shadow">
                GitHub Repository
              </h2>
              <p className="manuscript-text text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A collection of my open source contributions and personal
                projects.
              </p>
            </div>

            {/* Decorative line */}
            <div className="decorative-line mt-6"></div>
          </div>

          {repos.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 rounded-full border-2 border-muted opacity-25"></div>
                <div className="absolute inset-0 rounded-full border-2 border-t-accent animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="ornate-border parchment-texture p-6 relative hover:border-accent transition-colors duration-300"
                >
                  <div className="manuscript-corner"></div>

                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="manuscript-heading text-lg font-semibold mb-2 ink-shadow">
                          {repo.name}
                        </h3>
                        <p className="manuscript-text text-muted-foreground text-sm leading-relaxed">
                          {repo.description
                            ? repo.description.length > 80
                              ? `${repo.description.substring(0, 80)}...`
                              : repo.description
                            : "No description provided"}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 ml-8 flex-shrink-0">
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-xs font-semibold bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition-colors"
                          >
                            Live
                          </a>
                        )}
                        <div className="manuscript-text text-muted-foreground text-sm">
                          {format(new Date(repo.updatedAt), "yyyy")}
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Decorative dot */}
                  <div className="w-1 h-1 bg-accent rounded-full mt-4 opacity-60"></div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <span className="manuscript-text text-muted-foreground text-sm">
              Projects
            </span>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default GithubInfo;
