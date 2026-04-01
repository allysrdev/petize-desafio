import { Select } from "@chakra-ui/react";
import type { RepoDirection, RepoSort } from "../../../types/repo";

type RepositoryFiltersProps = {
  sort: RepoSort;
  direction: RepoDirection;
  setSort: (value: RepoSort) => void;
  setDirection: (value: RepoDirection) => void;
  t: (key: string) => string;
};

export default function RepositoryFilters({
  sort,
  direction,
  setSort,
  setDirection,
  t,
}: RepositoryFiltersProps) {
  return (
    <div className="flex gap-3 px-5">
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value as RepoSort)}
      >
        <option value="updated">{t("profile:sort.updated")}</option>
        <option value="created">{t("profile:sort.created")}</option>
        <option value="pushed">{t("profile:sort.pushed")}</option>
        <option value="full_name">{t("profile:sort.full_name")}</option>
      </Select>

      <Select
        value={direction}
        onChange={(e) => setDirection(e.target.value as RepoDirection)}
      >
        <option value="desc">{t("profile:direction_options.desc")}</option>
        <option value="asc">{t("profile:direction_options.asc")}</option>
      </Select>
    </div>
  );
}
