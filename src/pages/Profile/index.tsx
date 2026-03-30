import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  Span,
} from "@chakra-ui/react";
import {
  LuBuilding2,
  LuHeart,
  LuLink,
  LuMail,
  LuMapPin,
  LuSearch,
  LuTwitter,
  LuUsers,
} from "react-icons/lu";
import RepositoryCard from "../../components/Profile/RepositoryCard";

export default function Profile() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Desktop-only header */}
      <header className="hidden sm:block w-full py-5!">
        <div className="flex gap-30 w-full items-start ">
          <div className="flex gap-5">
            <Heading
              className="text-4xl!"
              fontWeight="normal"
              color="var(--blue) "
            >
              Search
            </Heading>
            <Heading
              className="text-4xl!"
              fontWeight="normal"
              color="var(--purple)"
            >
              d_evs
            </Heading>
          </div>
          <InputGroup
            startElement={<LuSearch size={20} />}
            className="w-full max-w-3xl"
          >
            <Input
              placeholder="John Doe"
              className="sm:w-148 sm:h-12"
              css={{ "--focus-color": " var(--purple)" }}
            />
          </InputGroup>
        </div>
      </header>
      {/* Mobile Profile Header */}
      <Box
        className="flex flex-col gap-5 p-5! text-zinc-600 sm:hidden"
        bg="var(--profile-backgrund-mobile)"
      >
        {/* Avatar & user Info */}

        <div className="flex gap-3 items-center">
          <Avatar.Root size="lg">
            <Avatar.Fallback name="John Doe" />
            <Avatar.Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/960px-John_Doe%2C_born_John_Nommensen_Duchac.jpg" />
          </Avatar.Root>
          <div className="flex flex-col items-start">
            <Heading color="black">John Doe</Heading>
            <Span fontWeight="light">@johndoe</Span>
          </div>
        </div>
        {/* Followers / Following */}
        <div className="flex gap-5 ">
          <div className="flex items-center gap-2">
            <LuUsers />
            <Span>250 seguidores</Span>
          </div>
          <div className="flex items-center gap-2">
            <LuHeart />
            <Span>25 seguindo</Span>
          </div>
        </div>
        {/* User Description */}
        <div className="w-full text-left">
          <Span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </Span>
        </div>
        {/* More user info */}
        <div className="flex flex-wrap gap-5 justify-center text-[13px]!">
          <div className="flex gap-3 items-center">
            <LuBuilding2 size={16} />
            <Span>Petize</Span>
          </div>
          <div className="flex gap-3 items-center">
            <LuMapPin size={16} />
            <Span>São Paulo</Span>
          </div>
          <div className="flex gap-3 items-center">
            <LuMail size={16} />
            <Span>john.doe@petize.com.br</Span>
          </div>
          <div className="flex gap-3 items-center">
            <LuLink size={16} />
            <Span>www.johndoe.com</Span>
          </div>
          <div className="flex gap-3 items-center">
            <LuTwitter size={16} />
            <Span>@johndoe</Span>
          </div>
        </div>
      </Box>

      <div className="w-full flex items-start justify-start">
        <aside className="hidden sm:flex ">
          {/* Desktop Profile Header */}
          <Box className="flex flex-col gap-5 p-5! text-zinc-600">
            {/* Avatar & user Info */}

            <div className="flex gap-3 items-center">
              <Avatar.Root size="lg">
                <Avatar.Fallback name="John Doe" />
                <Avatar.Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/960px-John_Doe%2C_born_John_Nommensen_Duchac.jpg" />
              </Avatar.Root>
              <div className="flex flex-col items-start">
                <Heading color="black">John Doe</Heading>
                <Span fontWeight="light">@johndoe</Span>
              </div>
            </div>
            {/* User Description */}
            <div className="w-full text-left">
              <Span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </Span>
            </div>
            {/* Followers / Following */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <LuUsers />
                <Span>250 seguidores</Span>
              </div>
              <div className="flex items-center gap-2">
                <LuHeart />
                <Span>25 seguindo</Span>
              </div>
            </div>

            {/* More user info */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <LuBuilding2 size={16} />
                <Span>Petize</Span>
              </div>
              <div className="flex gap-3 items-center">
                <LuMapPin size={16} />
                <Span>São Paulo</Span>
              </div>
              <div className="flex gap-3 items-center">
                <LuMail size={16} />
                <Span>john.doe@petize.com.br</Span>
              </div>
              <div className="flex gap-3 items-center">
                <LuLink size={16} />
                <Span>www.johndoe.com</Span>
              </div>
              <div className="flex gap-3 items-center">
                <LuTwitter size={16} />
                <Span>@johndoe</Span>
              </div>
            </div>

            <Button
              className="mt-8!"
              backgroundColor="var(--purple)"
              fontWeight="bold"
            >
              Contato
            </Button>
          </Box>
        </aside>
        {/* Repositories */}

        <Box className="flex flex-col overflow-auto">
          <RepositoryCard
            name="Nome do Repositorio"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus."
            stars={100}
            updated_at="Atualizado há 2 dias"
          />
          <RepositoryCard
            name="Nome do Repositorio"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus."
            stars={100}
            updated_at="Atualizado há 2 dias"
          />
          <RepositoryCard
            name="Nome do Repositorio"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus."
            stars={100}
            updated_at="Atualizado há 2 dias"
          />
          <RepositoryCard
            name="Nome do Repositorio"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus."
            stars={100}
            updated_at="Atualizado há 2 dias"
          />
          <RepositoryCard
            name="Nome do Repositorio"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus."
            stars={100}
            updated_at="Atualizado há 2 dias"
          />
        </Box>
      </div>
    </div>
  );
}
