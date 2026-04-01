import { useNavigate } from "react-router-dom";

export function useSearch() {
  const navigate = useNavigate();

  const search = (username: string) => {
    if (username.trim()) {
      navigate(`/profile/${username}`);
    }
  };

  return { search };
}
