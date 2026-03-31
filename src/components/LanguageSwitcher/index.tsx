import { Button, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <HStack bg="gray.100" p="2" borderRadius="full">
      <Button
        size="sm"
        borderRadius="full"
        bg={i18n.language === "pt" ? "purple.500" : "transparent"}
        color={i18n.language === "pt" ? "white" : "gray.600"}
        _hover={{ bg: i18n.language === "pt" ? "purple.600" : "gray.200" }}
        onClick={() => i18n.changeLanguage("pt")}
      >
        PT
      </Button>

      <Button
        size="sm"
        borderRadius="full"
        bg={i18n.language === "en" ? "purple.500" : "transparent"}
        color={i18n.language === "en" ? "white" : "gray.600"}
        _hover={{ bg: i18n.language === "en" ? "purple.600" : "gray.200" }}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </Button>
    </HStack>
  );
};
