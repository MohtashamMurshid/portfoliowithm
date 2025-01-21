import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/mohtashammurshid/repos"
    );

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error("Failed to fetch data from GitHub");
    }

    const data = await response.json(); // Parse the response to JSON

    // Extract the name and language of each repository
    const repoInfo = data.map((repo: { name: string; language: string }) => ({
      name: repo.name,
      language: repo.language,
    }));

    return new NextResponse(JSON.stringify(repoInfo), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("ERROR: " + error.message, { status: 500 });
  }
};
