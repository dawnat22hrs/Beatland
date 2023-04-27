import React from "react";
import { useVotings } from "../hooks";
import { useDate } from "../hooks/useDate"

import { Voting } from "./Voting";

export const Category = ({ category }) => {
  const { data: votings, status: statusVotings } = useVotings(category._id);
  const { data: date, status: statusDate } = useDate(category.createDate);

  return (
    <div className="voiting__category">
      <h2 className="voiting__category-title">{category.alias}</h2>
      {statusDate === "success" &&
        date.map((date) => {
          const startDay = new Date(date.createDate)
          const endDay = new Date(date.endDate)
          return (
            <div>
              <h3 className="voiting__category-data" key={date._id}>{startDay.getDate()} {startDay.toLocaleString('en', {month: "long"} )} - {endDay.getDate()} {endDay.toLocaleString('en', {month: "long"} )}</h3>
              {statusVotings === "success" &&
              votings.map((voting) => (
                <Voting key={voting._id} voting={voting} category={category} />
              ))}
            </div>
          )
        })
      }   
      </div>
  );
};
