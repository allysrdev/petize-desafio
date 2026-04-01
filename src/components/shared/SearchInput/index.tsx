import { useState } from "react";
import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useTranslation } from "react-i18next";

type Props = {
  placeholder: string;
  onSearch: (value: string) => void;
  useButton?: boolean;
};

export function SearchInput({ placeholder, onSearch, useButton }: Props) {
  const [value, setValue] = useState("");
  const { t } = useTranslation("home");

  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value);
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-5">
      <InputGroup w={{ base: "90%", md: "90%", lg: "592px" }}>
        <InputLeftElement pointerEvents="none">
          <LuSearch size={20} />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          css={{ "--focus-color": "var(--purple)" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </InputGroup>
      {useButton && (
        <Button
          backgroundColor="var(--purple)"
          fontWeight="bold"
          color="white"
          w="176px"
          onClick={() => handleSearch()}
          display={{ base: "none", lg: "flex" }}
        >
          {t("search")}
        </Button>
      )}
    </div>
  );
}
