import { useQuery } from "@tanstack/react-query";
import { Api } from "../api";

export const useChildrenCategory = (parent) => {
  return useQuery({
    queryKey: ["root_children", parent],
    queryFn: () => Api.category.getChildren(parent),
    enabled: Boolean(parent) === true,
  });
};
