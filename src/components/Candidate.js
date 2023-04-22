import React from "react";
import { ButtonVote } from "./ButtonVote";

export const Candidate = ({ candidate, category, voting }) => {
  const youtubeLink = candidate.candidate.links
    .find((link) => link.name === "youtube")
    ?.value?.replace("watch?v=", "embed/");

  return (
    <div className="card-participant">
      <div className="card-participant__video">
        <iframe
          width="560"
          height="315"
          src={youtubeLink?.value ?? null}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div className="video__play-btn">
          <img
            src="https://static.tildacdn.com/tild6563-6463-4631-a563-646331336139/play-min.svg"
            alt="play"
          />
        </div>
      </div>
      <div className="participant__info">
        <p className="participant__info__country">Indonesia</p>
        <p className="participant__info__name">Konstantin petrov</p>
        <div className="participant__info__voiting">
          <div className="votes">
            <span className="votes__number">{candidate.score}</span>
            <span className="votes__text">Votes</span>
          </div>
          <ButtonVote
            voting={voting._id}
            category={voting._id}
            candidate={candidate.candidate._id}
          />
        </div>
      </div>
    </div>
  );
};
