import { Button, Heading, Spinner, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useGithubUser } from "../../hooks/useGithubUser";
import { useTranslation } from "react-i18next";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import RepositoriesList from "../../components/Profile/RepositorysList";
import { useEffect } from "react";
import ProfileInfoDesktop from "../../components/Profile/ProfileInfoDesktop";
import ProfileInfoMobile from "../../components/Profile/ProfileInfoMobile";

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation(["profile", "errors"]);
  const { user, loadingUser, error, fetchInitialData, contacts, repos } =
    useGithubUser();
  const { username } = useParams();

  useEffect(() => {
    if (!username) return;

    fetchInitialData(username);
  }, [username, fetchInitialData]);

  if (loadingUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <VStack gap={4}>
          <Spinner size="xl" color="var(--purple)" />
          <span className="text-lg">{t("profile:loading_user")}</span>
        </VStack>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col gap-5">
        <Heading>{t("errors:error")}</Heading>
        <span>{t(`errors:${error}`)}</span>
        <Button
          onClick={() => navigate("/")}
          backgroundColor="var(--purple)"
          fontWeight="bold"
          color="white"
        >
          {t("errors:new_search")}
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col gap-5!">
      {/* Desktop-only header */}
      <ProfileHeader />
      {/* Mobile Profile Header */}
      <ProfileInfoMobile user={user} />

      <div className="w-full flex items-start justify-start">
        <aside className="hidden lg:flex max-w-[20%]">
          {/* Desktop Profile Header */}
          <ProfileInfoDesktop user={user} contacts={contacts} />
        </aside>
        {/* Repositories */}
        <RepositoriesList repos={repos} />
      </div>
    </div>
  );
}
