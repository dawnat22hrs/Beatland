import { useQuery } from "@tanstack/react-query";
import { Api } from "../api";

export const useDate = (createDate) =>
  useQuery(["date", createDate], () => Api.voting.getByDate(createDate));
  
