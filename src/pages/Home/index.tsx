import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../components/shared/LanguageSwitcher";
import { SearchInput } from "../../components/shared/SearchInput";
import { AppLogo } from "../../components/shared/AppLogo";
import { useSearch } from "../../hooks/useSearch";

export default function Home() {
  const { t } = useTranslation("home");
  const { search } = useSearch();

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-10 p-10">
      <AppLogo size="lg" />
      <LanguageSwitcher />
      <SearchInput onSearch={search} placeholder={t("search")} useButton />
    </div>
  );
}
