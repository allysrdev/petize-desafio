import { Heading } from "@chakra-ui/react";

export function AppLogo({ size = "lg" }: { size?: "lg" | "sm" }) {
  const fontSize = size === "lg" ? "text-5xl! sm:text-7xl!" : "text-4xl!";

  return (
    <div className="flex gap-5 items-center">
      <Heading className={fontSize} fontWeight="normal" color="var(--blue)">
        Search
      </Heading>
      <Heading className={fontSize} fontWeight="normal" color="var(--purple)">
        d_evs
      </Heading>
    </div>
  );
}
