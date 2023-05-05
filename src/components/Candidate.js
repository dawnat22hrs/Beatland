import React, { useState } from "react";
import { ButtonVote } from "./ButtonVote";

import { useVote } from "../hooks";

import * as DialogBase from "@radix-ui/react-dialog"
import { createPortal } from "react-dom";

export const Candidate = ({ candidate, category, voting }) => {
  const youtubeLink = candidate.candidate.links
    .find((link) => link.name === "youtube")
    ?.value?.replace("watch?v=", "embed/");

    console.log(candidate.candidate.links[0].value)

    const nameCandidate = candidate.candidate.links[0].name

    const linkYoutubeCandidate = candidate.candidate.links[0].value

  const [openVideo, setOpenVideo] = useState(false);

  const vote = useVote(() => setOpenVideo(true));

  return (
    <>
    {createPortal(
        <DialogBase.Root open={openVideo} onOpenChange={setOpenVideo}>
          <DialogBase.Trigger asChild></DialogBase.Trigger>
          <DialogBase.Portal>
            <DialogBase.Overlay className="DialogOverlay" >
              <DialogBase.Close asChild>
                <button className="IconButton" aria-label="Close"></button>
              </DialogBase.Close>
            </DialogBase.Overlay>
            <DialogBase.Content className="VideoContent">
            <iframe  src={linkYoutubeCandidate ?? null} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className="video-block"></iframe>
            </DialogBase.Content>
          </DialogBase.Portal>
        </DialogBase.Root>,
        document.getElementById("dialog-root-success")
      )}
    <div className="card-participant">
      <div className="card-participant__video">
        <iframe
          width="560"
          height="315"
          src={linkYoutubeCandidate ?? null}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div
          onClick={() =>
            window.auth?.user ? vote({ candidate, voting }) : setOpenVideo(true)
          }
          className="video__play-btn"
        >
          <img
            src="https://static.tildacdn.com/tild6563-6463-4631-a563-646331336139/play-min.svg"
            alt="play"
          />
        </div>
      </div>
      <div className="participant__info">
        <p className="participant__info__name">{nameCandidate}</p>
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
    </>
  );
};
