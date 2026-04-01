import { useCallback, useState } from "react";
import type { GithubRepo, GithubUser } from "../schemas/github.schema";
import { getUser, getUserRepos } from "../services/githubService";
import {
  getPrimaryContact,
  type ContactLink,
} from "../utils/getPrimaryContact";
import { type RepoDirection, type RepoSort } from "../types/repo";

export function useGithubUser() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [contacts, setContacts] = useState<ContactLink[] | undefined>();
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [page, setPage] = useState(1);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<RepoSort>("updated");
  const [direction, setDirection] = useState<RepoDirection>("desc");

  const fetchInitialData = useCallback(
    async (username: string) => {
      try {
        setLoadingUser(true);
        setLoadingMore(true);
        setError(null);
        setPage(1);

        const userData = await getUser(username);
        const reposData = await getUserRepos(username, 1, sort, direction);

        setUser(userData);
        setContacts(
          getPrimaryContact(
            userData.email,
            userData.blog,
            userData.twitter_username,
          ),
        );
        setRepos(reposData);
        setHasMore(reposData.length === 10);
      } catch (err) {
        setError((err as Error).message);
        setUser(null);
        setRepos([]);
        setContacts([]);
      } finally {
        setLoadingUser(false);
        setLoadingMore(false);
      }
    },
    [sort, direction],
  );

  const loadMoreRepos = useCallback(
    async (username: string) => {
      if (loadingMore || !hasMore) return;

      try {
        setLoadingMore(true);
        const nextPage = page + 1;

        const newRepos = await getUserRepos(
          username,
          nextPage,
          sort,
          direction,
        );

        setRepos((prev) => [...prev, ...newRepos]);
        setPage(nextPage);
        setHasMore(newRepos.length === 10);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoadingMore(false);
      }
    },
    [page, loadingMore, hasMore, sort, direction],
  );

  return {
    user,
    repos,
    loadingUser,
    loadingMore,
    error,
    hasMore,
    fetchInitialData,
    loadMoreRepos,
    sort,
    direction,
    setSort,
    setDirection,
    contacts,
  };
}
