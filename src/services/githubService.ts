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

export async function getUser(username: string): Promise<GithubUser> {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Usuário não encontrado");
  }

  const data = await response.json();

  return GithubUserSchema.parse(data);
}

export async function getUserRepos(
  username: string,
  page: number,
  sort: string,
  direction: string,
): Promise<GithubRepo[]> {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=10&page=${page}&sort=${sort}&direction=${direction}`,
    { headers },
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar repositórios");
  }

  const data = await response.json();

  return z.array(GithubRepoSchema).parse(data);
}
