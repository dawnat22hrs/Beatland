import React from "react";
import { useVotings } from "../hooks";

import { Voting } from "./Voting";

export const Category = ({ category }) => {
  const { data: votings, status: statusVotings } = useVotings(category._id);

  console.log(votings)

  return (
    <div className="voiting__category">
      <h2 className="voiting__category-title">{category.alias}</h2>
      {statusVotings === "success" &&
      votings.map((voting) => {
        const startDay = new Date(voting.updateDate)
        const endDay = new Date(voting.endDate)
        return (
          <div key={voting._id}>
            <h3 className="voiting__category-date" >{startDay.getDate()} {startDay.toLocaleString('en', {month: "long"} )} - {endDay.getDate()} {endDay.toLocaleString('en', {month: "long"} )}</h3>
            <Voting key={voting._id} voting={voting} category={category} />
          </div>
        )})
      } 
    </div>
  );
};
