import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/userService";

export const useUsers = (page = 1) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => UserService.getUsers(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUserById(id),
    enabled: !!id,
  });
};
