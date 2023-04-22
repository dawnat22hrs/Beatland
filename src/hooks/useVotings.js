import { useQuery } from "@tanstack/react-query";
import { Api } from "../api";

export const useVotings = (category) =>
  useQuery(["votings", category], () => Api.voting.getByCategory(category));
  
