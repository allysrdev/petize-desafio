import z from "zod";
import {
  GithubRepoSchema,
  GithubUserSchema,
  type GithubRepo,
  type GithubUser,
} from "../schemas/github.schema";

const BASE_URL = "https://api.github.com";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
};

async function handleResponse(response: Response, defaultError: string) {
  if (response.ok) return response.json();

  switch (response.status) {
    case 404:
      throw new Error("user_not_found");
    case 403:
      throw new Error("rate_limit_exceeded");
    case 500:
    case 503:
      throw new Error("server_error");
    default:
      throw new Error(defaultError);
  }
}

export async function getUser(username: string): Promise<GithubUser> {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      headers,
    });

    const data = await handleResponse(response, "fetch_user_error");

    return GithubUserSchema.parse(data);
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("network_error");
    }
    throw error;
  }
}

export async function getUserRepos(
  username: string,
  page: number,
  sort: string,
  direction: string,
): Promise<GithubRepo[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${username}/repos?per_page=10&page=${page}&sort=${sort}&direction=${direction}`,
      { headers },
    );

    const data = await handleResponse(response, "fetch_repos_error");
    return z.array(GithubRepoSchema).parse(data);
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("network_error");
    }
    throw error;
  }
}
