"use client";
import { useEffect, useState } from "react";

const GithubInfo = () => {
  const [repos, setRepos] = useState<{ name: string; language: string }[]>([]); // State to store repo data
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    // Fetch the repo data from your Next.js API route
    const fetchRepos = async () => {
      try {
        const res = await fetch("/api/github"); // The path to your API route
        if (!res.ok) throw new Error("Failed to fetch data from GitHub");

        const data = await res.json();
        setRepos(data); // Store the fetched data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message); // Catch any errors
      }
    };

    fetchRepos(); // Call the function to fetch the data
  }, []); // Empty dependency array to run only once on mount

  if (error) {
    return <p>Error: {error}</p>; // Show error message if any
  }

  return (
    <div>
      <h1>My GitHub Repositories</h1>
      {repos.length === 0 ? (
        <p>Loading...</p> // Show loading message if repos are still being fetched
      ) : (
        <ul>
          {repos.map((repo, index) => (
            <li key={index}>
              <strong>{repo.name}</strong> - {repo.language}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GithubInfo;
