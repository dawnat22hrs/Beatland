import React, { useEffect, useRef, useContext, useState } from "react";
import { useCandidate } from "../hooks";
import { createPortal } from "react-dom";
import { useDate } from "../hooks/useDate"


import * as DialogBase from "@radix-ui/react-dialog";

import { Candidate } from "./Candidate";

export const Voting = ({ voting, category }) => {
  const { data: candidates, status: statusCandidates } = useCandidate(
    voting._id
  );
  const { data: date, status: statusDate } = useDate();

  console.log(date)

  const [youCanVote, setYouCanVote] = useState(false);

  const elementRef = useRef();

  useEffect(() => {
    if (!elementRef.current) return;
    const scrollElement = localStorage.getItem("scrollTo");
    if (scrollElement === elementRef.current.id) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
      localStorage.removeItem("scrollTo");
      setYouCanVote(true);
    }
  }, [elementRef.current]);

  if (candidates?.length < 2) {
    return null;
  }

  return (
    <>
      {createPortal(
        <DialogBase.Root open={youCanVote} onOpenChange={setYouCanVote}>
          <DialogBase.Trigger asChild></DialogBase.Trigger>
          <DialogBase.Portal>
            <DialogBase.Overlay className="DialogOverlay" />
            <DialogBase.Content className="DialogContent">
              <DialogBase.Title className="DialogTitle">
                U CAN VOTE
              </DialogBase.Title>
              <DialogBase.Description className="DialogDescription">
                YEAAH
              </DialogBase.Description>

              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "center",
                }}
              ></div>
              <DialogBase.Close asChild>
                <button className="IconButton" aria-label="Close"></button>
              </DialogBase.Close>
            </DialogBase.Content>
          </DialogBase.Portal>
        </DialogBase.Root>,
        document.getElementById("dialog-root-success")
      )}
      <div
        ref={elementRef}
        id={voting._id}
        className="voiting__cards-participants"
      >
        {statusDate === "success" &&
        date.map((date) => (
          <div>
            <h3 className="voiting__category-data">{date.createDate} - {date.endDate}</h3>
            {statusCandidates === "success" &&
            candidates.map((candidate) => (
              <Candidate
                key={candidate._id}
                candidate={candidate}
                category={category}
                voting={voting}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
