import { useQuery } from "@tanstack/react-query";
import { Api } from "../api";

export const useCandidate = (voting) =>
  useQuery(["candidate", voting], () => Api.candidate.getCandidate(voting), {
    refetchInterval: 5000,
  });