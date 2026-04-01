import { Button, Heading } from "@chakra-ui/react";

type Props = {
  title: string;
  message: string;
  onRetry?: () => void;
  buttonLabel?: string;
};

export function ErrorState({ title, message, onRetry, buttonLabel }: Props) {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-5">
      <Heading>{title}</Heading>
      <span>{message}</span>

      {onRetry && (
        <Button
          onClick={onRetry}
          backgroundColor="var(--purple)"
          fontWeight="bold"
          color="white"
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
