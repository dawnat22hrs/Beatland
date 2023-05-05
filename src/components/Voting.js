import React, { useEffect, useRef, useContext, useState } from "react";
import { useCandidate } from "../hooks";
import { useVotings } from "../hooks";
import { createPortal } from "react-dom";


import * as DialogBase from "@radix-ui/react-dialog";

import { Candidate } from "./Candidate";

export const Voting = ({ voting, category }) => {
  const { data: candidates, status: statusCandidates } = useCandidate(
    voting._id
  );
  const { data: votings, status: statusVotings } = useVotings(category._id);
  
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
              <DialogBase.Close asChild>
              <button
                    onClick={() => {
                      localStorage.setItem("scrollTo", voting);
                      window?.auth?.redirectToLoginPage();
                    }}
                    className="Button ButtonModal"
                  >
                    OK
                  </button>
              </DialogBase.Close>
            </DialogBase.Content>
          </DialogBase.Portal>
        </DialogBase.Root>,
        document.getElementById("dialog-root-success")
      )}
      {statusVotings === "success" &&
        votings.map((voting) => {
          const startDay = new Date(voting.createDate)
          const endDay = new Date(voting.endDate)
          return (
            <div key={voting._id}>
              <h3 className="voiting__category-date" >{startDay.getDate()} {startDay.toLocaleString('en', {month: "long"} )} - {endDay.getDate()} {endDay.toLocaleString('en', {month: "long"} )}</h3>
              <div
                ref={elementRef}
                id={voting._id}
                className="voiting__cards-participants"
              >
        
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
            </div>
          )
        })
      } 
    </>
  );
};
