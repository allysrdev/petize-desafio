import type { GithubRepo, GithubUser } from "../types/github";

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

  return response.json();
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

  return response.json();
}
