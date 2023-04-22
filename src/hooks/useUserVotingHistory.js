import { useQuery } from "@tanstack/react-query";
import { Api } from "../api";

export const useUserVotingHistory = () =>
  useQuery(
    ["user-voting-history"],
    () => Api.votingHistory.userVotingHistory(),
    {
      refetchInterval: 1500,
    }
  );
