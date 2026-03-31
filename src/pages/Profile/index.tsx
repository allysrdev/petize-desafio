import {
  Avatar,
  Box,
  Button,
  createListCollection,
  Heading,
  Input,
  InputGroup,
  Link,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Span,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import {
  LuBuilding2,
  LuHeart,
  LuLink,
  LuMail,
  LuMapPin,
  LuSearch,
  LuTwitter,
  LuUsers,
} from "react-icons/lu";
import RepositoryCard from "../../components/Profile/RepositoryCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGithubUser } from "../../hooks/useGithubUser";
import { getRelativeDate } from "../../utils/getRelativeDate";
import { nullableToUndefined } from "../../helpers/nullableToUndefined";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { normalizeUrl } from "../../utils/normalizeUrl";

export default function Profile() {
  const { username } = useParams();
  const [newUsernameSearch, setNewUsernameSearch] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();
  const { t } = useTranslation(["profile", "errors"]);
  const {
    user,
    repos,
    loadingUser,
    loadingMore,
    loadMoreRepos,
    fetchInitialData,
    error,
    sort,
    direction,
    setSort,
    setDirection,
    contacts,
  } = useGithubUser();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newUsernameSearch?.trim()) {
      navigate(`/profile/${newUsernameSearch}`);
    }
  };
  const sortCollection = createListCollection({
    items: [
      { label: t("profile:sort.updated"), value: "updated" },
      { label: t("profile:sort.created"), value: "created" },
      { label: t("profile:sort.pushed"), value: "pushed" },
      { label: t("profile:sort.full_name"), value: "full_name" },
    ],
  });

  const directionCollection = createListCollection({
    items: [
      { label: t("profile:direction_options.desc"), value: "desc" },
      { label: t("profile:direction_options.asc"), value: "asc" },
    ],
  });

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

  useEffect(() => {
    if (!username) return;

    fetchInitialData(username);
  }, [username, fetchInitialData]);

  if (loadingUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <VStack gap={4}>
          <Spinner size="xl" color="var(--purple)" />
          <Span fontSize="lg">{t("profile:loading_user")}</Span>
        </VStack>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col gap-5">
        <Heading>{t("errors:error")}</Heading>
        <Span>{t(`errors:${error}`)}</Span>
        <Button
          onClick={() => navigate("/")}
          backgroundColor="var(--purple)"
          fontWeight="bold"
        >
          {t("errors:new_search")}
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col gap-5!">
      {/* Desktop-only header */}
      <header className="hidden lg:block w-full py-5! px-5!">
        <div className="flex gap-30 w-full items-center justify-center">
          <Link href="/" className="flex gap-5">
            <Heading
              className="text-4xl!"
              fontWeight="normal"
              color="var(--blue) "
            >
              Search
            </Heading>
            <Heading
              className="text-4xl!"
              fontWeight="normal"
              color="var(--purple)"
            >
              d_evs
            </Heading>
          </Link>
          <InputGroup
            startElement={<LuSearch size={20} />}
            className="w-full max-w-3xl"
          >
            <Input
              placeholder={t("profile:search_placeholder")}
              className="sm:w-148 sm:h-12"
              css={{ "--focus-color": " var(--purple)" }}
              onKeyDown={(e) => handleSearch(e)}
              onChange={(e) => setNewUsernameSearch(e.target.value)}
            />
          </InputGroup>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Mobile Profile Header */}
      <Box
        className="flex flex-col gap-5 p-5! text-zinc-600 lg:hidden"
        bg="var(--profile-backgrund-mobile)"
      >
        {/* Avatar & user Info */}

        <div className="flex gap-3 items-center">
          <Avatar.Root size="lg">
            <Avatar.Fallback name={nullableToUndefined(user?.name)} />
            <Avatar.Image src={user?.avatar_url} />
          </Avatar.Root>
          <div className="flex flex-col items-start">
            <Heading color="black">{user?.name}</Heading>
            <Span fontWeight="light">@{user?.login}</Span>
          </div>
        </div>
        {/* Followers / Following */}
        <div className="flex gap-5 ">
          <div className="flex items-center gap-2">
            <LuUsers />
            <Span>
              {user?.followers} {t("profile:followers")}
            </Span>
          </div>
          <div className="flex items-center gap-2">
            <LuHeart />
            <Span>
              {user?.following} {t("profile:following")}
            </Span>
          </div>
        </div>
        {/* User Description */}
        <div className="w-full text-left">
          <Span>{user?.bio}</Span>
        </div>
        {/* More user info */}
        <div className="flex flex-wrap gap-5 justify-center text-[13px]!">
          {user?.company && (
            <div className="flex gap-3 items-center">
              <LuBuilding2 size={16} />
              <Span>{user?.company}</Span>
            </div>
          )}

          {user?.location && (
            <div className="flex gap-3 items-center">
              <LuMapPin size={16} />
              <Span>{user.location}</Span>
            </div>
          )}
          {user?.email && (
            <div className="flex gap-3 items-center">
              <LuMail size={16} />
              <Link href={`mailto:${user.email}`}>{user.email}</Link>
            </div>
          )}
          {user?.blog && (
            <div className="flex gap-3 items-center">
              <LuLink size={16} />
              <Link href={normalizeUrl(user.blog)} target="_blank">
                {user.blog}
              </Link>
            </div>
          )}

          {user?.twitter_username && (
            <div className="flex gap-3 items-center">
              <LuTwitter size={16} />
              <Link
                href={`https://x.com/${user.twitter_username}`}
                target="_blank"
              >
                @{user.twitter_username}
              </Link>
            </div>
          )}
        </div>
      </Box>

      <div className="w-full flex items-start justify-start">
        <aside className="hidden lg:flex w-[30%]">
          {/* Desktop Profile Header */}
          <Box className="flex flex-col gap-5 p-5! text-zinc-600">
            {/* Avatar & user Info */}

            <div className="flex gap-3 items-center">
              <Avatar.Root size="lg">
                <Avatar.Fallback name={nullableToUndefined(user?.name)} />
                <Avatar.Image src={user?.avatar_url} />
              </Avatar.Root>
              <div className="flex flex-col items-start">
                <Heading color="black">{user?.name}</Heading>
                <Span fontWeight="light">@{user?.login}</Span>
              </div>
            </div>
            {/* User Description */}
            <div className="w-full text-left">
              <Span>{user?.bio}</Span>
            </div>
            {/* Followers / Following */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <LuUsers />
                <Span>
                  {user?.followers} {t("profile:followers")}
                </Span>
              </div>
              <div className="flex items-center gap-2">
                <LuHeart />
                <Span>
                  {user?.following} {t("profile:following")}
                </Span>
              </div>
            </div>

            {/* More user info */}
            <div className="flex flex-col gap-2 w-[70%]">
              {user?.company && (
                <div className="flex gap-3 items-center">
                  <LuBuilding2 size={16} />
                  <Span>{user?.company}</Span>
                </div>
              )}

              {user?.location && (
                <div className="flex gap-3 items-center">
                  <LuMapPin size={16} />
                  <Span>{user.location}</Span>
                </div>
              )}
              {user?.email && (
                <div className="flex gap-3 items-center">
                  <LuMail size={16} />
                  <Link href={`mailto:${user.email}`}>{user.email}</Link>
                </div>
              )}
              {user?.blog && (
                <div className="flex gap-3 items-center">
                  <LuLink size={16} />
                  <Link href={normalizeUrl(user.blog)} target="_blank">
                    {user.blog}
                  </Link>
                </div>
              )}

              {user?.twitter_username && (
                <div className="flex gap-3 items-center">
                  <LuTwitter size={16} />
                  <Link
                    href={`https://x.com/${user.twitter_username}`}
                    target="_blank"
                  >
                    @{user.twitter_username}
                  </Link>
                </div>
              )}
            </div>

            {contacts ? (
              contacts.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{ width: "280px" }}
                >
                  <Button
                    backgroundColor="var(--purple)"
                    fontWeight="bold"
                    w="full"
                  >
                    {t(`profile:${link.label}`)}
                  </Button>
                </a>
              ))
            ) : (
              <></>
            )}
          </Box>
        </aside>

        {/* Repositories */}
        <Box
          ref={containerRef}
          className="flex flex-col overflow-auto h-200 w-full"
        >
          <div className="flex gap-3 items-center justify-center">
            {/* SORT */}
            <SelectRoot
              collection={sortCollection}
              value={[sort]}
              onValueChange={(e) => setSort(e.value[0])}
              width="200px"
            >
              <SelectTrigger className="border border-zinc-300 rounded-md shadow-sm hover:border-zinc-400">
                <SelectValueText placeholder={t("profile:sort_by")} />
              </SelectTrigger>

              <SelectContent position="fixed">
                {sortCollection.items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            {/* DIRECTION */}
            <SelectRoot
              collection={directionCollection}
              value={[direction]}
              onValueChange={(e) => setDirection(e.value[0])}
              width="140px"
            >
              <SelectTrigger className="border border-zinc-300 rounded-md shadow-sm hover:border-zinc-400">
                <SelectValueText placeholder={t("profile:direction")} />
              </SelectTrigger>

              <SelectContent position="fixed">
                {directionCollection.items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </div>
          {repos.map((repo) => (
            <RepositoryCard
              key={repo.id}
              name={repo.name}
              description={repo.description ?? t("profile:no_description")}
              stars={repo.stargazers_count}
              updated_at={getRelativeDate(repo.updated_at, t)}
              url={repo.html_url}
            />
          ))}

          {loadingMore && <p>{t("profile:loading_more")}</p>}
        </Box>
      </div>
    </div>
  );
}
