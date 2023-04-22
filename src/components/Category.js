import React from "react";
import { useVotings } from "../hooks";

import { Voting } from "./Voting";

export const Category = ({ category }) => {
  const { data: votings, status: statusVotings } = useVotings(category._id);

  return (
    <div className="voiting__category">
      <h2 className="voiting__category-title">{category.alias}</h2>
      {statusVotings === "success" &&
      votings.map((voting) => (
        <Voting key={voting._id} voting={voting} category={category} />
      ))}
      </div>
  );
};
