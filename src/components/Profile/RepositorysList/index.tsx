import { Box, Spinner, VStack } from "@chakra-ui/react";
import RepositoryCard from "../RepositoryCard";
import RepositoryFilters from "../RepositoryFilters";
import { getRelativeDate } from "../../../utils/getRelativeDate";
import { useTranslation } from "react-i18next";
import type { GithubRepo } from "../../../schemas/github.schema";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import type { RepoDirection, RepoSort } from "../../../types/repo";

export interface IRepositoryProps {
  repos: GithubRepo[];
  loadingMore: boolean;
  loadMoreRepos: () => void;
  hasMore: boolean;
  sort: RepoSort;
  direction: RepoDirection;
  setSort: (value: RepoSort) => void;
  setDirection: (value: RepoDirection) => void;
}

export default function RepositoriesList({
  repos,
  loadingMore,
  loadMoreRepos,
  hasMore,
  sort,
  direction,
  setSort,
  setDirection,
}: IRepositoryProps) {
  const { t } = useTranslation("profile");

  const sentinelRef = useIntersectionObserver(
    loadMoreRepos,

    !loadingMore && hasMore,
  );

  return (
    <Box w="full">
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

      {hasMore && (
        <Box ref={sentinelRef} py={6} textAlign="center">
          {loadingMore && (
            <VStack gap={2}>
              <Spinner size="md" color="var(--purple)" />
              <span>{t("loading_more")}</span>
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
}
