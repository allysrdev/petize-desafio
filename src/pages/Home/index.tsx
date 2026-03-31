import { Button, Heading, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation("home");

  const handleSearch = (e?: React.KeyboardEvent) => {
    if (e?.key === "Enter" && username.trim()) {
      navigate(`/profile/${username}`);
    } else if (!e && username.trim()) {
      navigate(`/profile/${username}`);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-10 p-10">
      <div className="flex gap-5 w-full items-center justify-center">
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

      <div className="w-full flex items-center justify-center gap-5">
        <InputGroup
          startElement={<LuSearch size={20} />}
          w={{ base: "90%", lg: "592px" }}
        >
          <Input
            placeholder={t("search")}
            css={{ "--focus-color": "var(--purple)" }}
            onKeyDown={(e) => handleSearch(e)}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <Button
          backgroundColor="var(--purple)"
          fontWeight="bold"
          w="176px"
          onClick={() => handleSearch()}
        >
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
