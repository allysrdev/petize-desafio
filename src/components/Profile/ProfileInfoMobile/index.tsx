import { Avatar, Box, Heading, Link } from "@chakra-ui/react";
import { nullableToUndefined } from "../../../helpers/nullableToUndefined";
import {
  LuBuilding2,
  LuHeart,
  LuLink,
  LuMail,
  LuMapPin,
  LuTwitter,
  LuUsers,
} from "react-icons/lu";
import type { GithubUser } from "../../../schemas/github.schema";
import { normalizeUrl } from "../../../utils/normalizeUrl";
import { useTranslation } from "react-i18next";

export default function ProfileInfoMobile({
  user,
}: {
  user: GithubUser | null;
}) {
  const { t } = useTranslation("profile");
  return (
    <Box
      className="flex flex-col gap-5 p-5! text-zinc-600 lg:hidden"
      bg="var(--profile-backgrund-mobile)"
    >
      {/* Avatar & user Info */}

      <div className="flex gap-3 items-center">
        <Avatar
          size="lg"
          name={nullableToUndefined(user?.name)}
          src={user?.avatar_url}
        />
        <div className="flex flex-col items-start">
          <Heading size="md" color="black">
            {user?.name}
          </Heading>
          <span className="font-light">@{user?.login}</span>
        </div>
      </div>
      {/* Followers / Following */}
      <div className="flex gap-5 ">
        <div className="flex items-center gap-2">
          <LuUsers />
          <span>
            {user?.followers} {t("followers")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LuHeart />
          <span>
            {user?.following} {t("following")}
          </span>
        </div>
      </div>
      {/* User Description */}
      <div className="w-full text-left">
        <span>{user?.bio}</span>
      </div>
      {/* More user info */}
      <div className="flex flex-wrap gap-5 justify-center text-[13px]!">
        {user?.company && (
          <div className="flex gap-3 items-center">
            <LuBuilding2 size={16} />
            <span>{user?.company}</span>
          </div>
        )}

        {user?.location && (
          <div className="flex gap-3 items-center">
            <LuMapPin size={16} />
            <span>{user.location}</span>
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
  );
}
