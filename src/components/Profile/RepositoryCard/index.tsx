import { Heading, Span } from "@chakra-ui/react";
import { LuStar } from "react-icons/lu";

interface IRepositoryCardProps {
  name: string;
  description: string;
  stars: number;
  updated_at: string;
}

export default function RepositoryCard({
  name,
  description,
  stars,
  updated_at,
}: IRepositoryCardProps) {
  return (
    <div className="flex flex-col gap-3 p-5! items-start text-left ">
      <Heading>{name}</Heading>
      <Span className="text-zinc-600">{description}</Span>
      <div className="flex gap-5 items-center border-b! border-b-zinc-600 pb-5! w-full">
        <div className="flex gap-3">
          <LuStar size={24} />
          <Span>{stars}</Span>
        </div>
        <div className="w-1 h-1 bg-zinc-600 rounded-full" />
        <Span className="text-zinc-600 ">{updated_at}</Span>
      </div>
    </div>
  );
}
