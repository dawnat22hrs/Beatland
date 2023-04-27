import { useQuery } from "@tanstack/react-query";
import { Api } from "../api";

export const useDate = (date) => 
  useQuery(["date", date], () => Api.voting.getByDate(date),  console.log(date));
