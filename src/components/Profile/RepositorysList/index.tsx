import { Box, Spinner, VStack } from "@chakra-ui/react";
import RepositoryCard from "../RepositoryCard";
import RepositoryFilters from "../RepositoryFilters";
import { useGithubUser } from "../../../hooks/useGithubUser";
import { getRelativeDate } from "../../../utils/getRelativeDate";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { GithubRepo } from "../../../schemas/github.schema";

export default function RepositoriesList({ repos }: { repos: GithubRepo[] }) {
  const { loadingMore, sort, direction, setSort, setDirection, loadMoreRepos } =
    useGithubUser();
  const { username } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("profile");

  useEffect(() => {
    const el = containerRef.current;

    const handleScroll = () => {
      if (!el) return;

      const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

      if (isBottom) {
        loadMoreRepos(username!);
      }
    };

    el?.addEventListener("scroll", handleScroll);

    return () => el?.removeEventListener("scroll", handleScroll);
  }, [loadMoreRepos, username]);

  return (
    <Box
      ref={containerRef}
      className="flex flex-col overflow-auto h-200 w-full"
    >
      <RepositoryFilters
        direction={direction}
        setDirection={setDirection}
        setSort={setSort}
        sort={sort}
        t={t}
      />
      {repos.map((repo) => (
        <RepositoryCard
          key={repo.id}
          name={repo.name}
          description={repo.description ?? t("no_description")}
          stars={repo.stargazers_count}
          updated_at={getRelativeDate(repo.updated_at, t)}
          url={repo.html_url}
        />
      ))}

      {loadingMore && (
        <div className="h-screen flex items-center justify-center">
          <VStack gap={4}>
            <Spinner size="xl" color="var(--purple)" />
            <span className="text-lg">{t("loading_more")}</span>
          </VStack>
        </div>
      )}
    </Box>
  );
}
