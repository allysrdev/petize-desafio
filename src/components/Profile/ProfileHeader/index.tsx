import { useTranslation } from "react-i18next";
import { useSearch } from "../../../hooks/useSearch";
import { AppLogo } from "../../shared/AppLogo";
import { SearchInput } from "../../shared/SearchInput";
import { LanguageSwitcher } from "../../shared/LanguageSwitcher";

export default function ProfileHeader() {
  const { search } = useSearch();
  const { t } = useTranslation("profile");

  return (
    <header className="hidden lg:block w-full py-5! px-5!">
      <div className="flex gap-30 w-full items-center justify-between">
        <a href="/" className="flex gap-5">
          <AppLogo size="sm" />
        </a>

        <SearchInput onSearch={search} placeholder={t("search_placeholder")} />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
