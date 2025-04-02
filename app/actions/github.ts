"use server";

interface GithubRepo {
  name: string;
  language: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string;
  updated_at: string;
  topics: string[];
  visibility: string;
  pinned?: boolean;
}

interface GithubGraphQLRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
  } | null;
  updatedAt: string;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  visibility: string;
}

interface GithubGraphQLResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: GithubGraphQLRepo[];
      };
    };
  };
}

async function getPinnedRepos() {
  try {
    // Using the GraphQL API to get pinned repositories
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          query {
            user(login: "mohtashammurshid") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    homepageUrl
                    stargazerCount
                    forkCount
                    primaryLanguage {
                      name
                    }
                    updatedAt
                    repositoryTopics(first: 10) {
                      nodes {
                        topic {
                          name
                        }
                      }
                    }
                    visibility
                  }
                }
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch pinned repositories");
    }

    const data = (await response.json()) as GithubGraphQLResponse;
    const pinnedRepos = data.data?.user?.pinnedItems?.nodes || [];

    return pinnedRepos.map((repo) => ({
      name: repo.name,
      language: repo.primaryLanguage?.name ?? "Unknown",
      description: repo.description ?? "",
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      url: repo.url,
      homepage: repo.homepageUrl ?? "",
      updatedAt: repo.updatedAt,
      topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
      visibility: repo.visibility,
      pinned: true,
    }));
  } catch (error) {
    console.error("Error fetching pinned repos:", error);
    return [];
  }
}

export async function getGithubRepos(showAll: boolean = false) {
  try {
    if (!showAll) {
      return await getPinnedRepos();
    }

    const response = await fetch(
      "https://api.github.com/users/mohtashammurshid/repos",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from GitHub");
    }

    const data = await response.json();

    return data.map((repo: GithubRepo) => ({
      name: repo.name,
      language: repo.language ?? "Unknown",
      description: repo.description ?? "",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      homepage: repo.homepage ?? "",
      updatedAt: repo.updated_at,
      topics: repo.topics,
      visibility: repo.visibility,
      pinned: false,
    }));
  } catch (error) {
    throw new Error("Failed to fetch GitHub repositories: " + error);
  }
}
