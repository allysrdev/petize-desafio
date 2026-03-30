import { useCallback, useState } from "react";
import { getUser, getUserRepos } from "../services/githubService";
import type { GithubRepo, GithubUser } from "../types/github";

export function useGithubUser() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGithubData = useCallback(async (username: string) => {
    try {
      setLoading(true);
      setError(null);

      const [userData, reposData] = await Promise.all([
        getUser(username),
        getUserRepos(username),
      ]);

      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      setError((err as Error).message);
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    repos,
    loading,
    error,
    fetchGithubData,
  };
}
