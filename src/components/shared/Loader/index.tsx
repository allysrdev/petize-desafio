import { Spinner, VStack } from "@chakra-ui/react";

type Props = {
  message: string;
};

export function Loader({ message }: Props) {
  return (
    <div className="h-screen flex items-center justify-center">
      <VStack gap={4}>
        <Spinner size="xl" color="var(--purple)" />
        <span className="text-lg">{message}</span>
      </VStack>
    </div>
  );
}
