import { Heading, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation("home");

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username.trim()) {
      navigate(`/profile/${username}`);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-10 p-10">
      <div className="flex gap-5">
        <Heading
          className="text-5xl! sm:text-7xl!"
          fontWeight="normal"
          color="var(--blue) "
        >
          Search
        </Heading>
        <Heading
          className="text-5xl! sm:text-7xl!"
          fontWeight="normal"
          color="var(--purple)"
        >
          d_evs
        </Heading>
      </div>
      <LanguageSwitcher />

      <InputGroup
        startElement={<LuSearch size={20} />}
        className="w-full max-w-sm"
      >
        <Input
          placeholder={t("search")}
          className="sm:w-148 sm:h-12"
          css={{ "--focus-color": " var(--purple)" }}
          onKeyDown={(e) => handleSearch(e)}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>
    </div>
  );
}
