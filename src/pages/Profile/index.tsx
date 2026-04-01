import { useNavigate, useParams } from "react-router-dom";
import { useGithubUser } from "../../hooks/useGithubUser";
import { useTranslation } from "react-i18next";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import RepositoriesList from "../../components/Profile/RepositorysList";
import { useEffect } from "react";
import ProfileInfoDesktop from "../../components/Profile/ProfileInfoDesktop";
import ProfileInfoMobile from "../../components/Profile/ProfileInfoMobile";
import { Loader } from "../../components/shared/Loader";
import { ErrorState } from "../../components/shared/ErrorState";

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
    return <Loader message={t("profile:loading_user")} />;
  }

  if (error) {
    return (
      <ErrorState
        title={t("errors:error")}
        message={t(`errors:${error}`)}
        onRetry={() => navigate("/")}
        buttonLabel={t("errors:new_search")}
      />
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
