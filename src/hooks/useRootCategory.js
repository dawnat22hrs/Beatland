import { useQuery } from "@tanstack/react-query";
import { Api } from "../api";

export const useRootCategory = (alias) =>
  useQuery(["root", alias], () => Api.category.getRoot(alias));
