import { useMutation } from "@tanstack/react-query";
import { Api } from "../api";

export const useVote = (onSuccess) => {
  const { mutate } = useMutation(
    ({ voting, candidate }) => {
      return Api.votingHistory.vote({ voting, candidate });
    },
    {
      onSuccess: () => {
        onSuccess();
      },
    }
  );

  return mutate;
};
