import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";

import { UserVotingHistoryContext } from "../context";

import { useVote } from "../hooks";

import * as DialogBase from "@radix-ui/react-dialog";

import { Api } from "../api";

export const ButtonVote = ({ voting, candidate }) => {
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(true);
  const [isSuccessVoted, setIsSuccessVoted] = useState(false);

  const userVotingHistory = useContext(UserVotingHistoryContext);

  const vote = useVote(() => setIsSuccessVoted(true));

  const userIsAlreadyVoted = Boolean(
    userVotingHistory.find(
      (votingHistory) => votingHistory.voting._id === voting
    )
  );

  if (userIsAlreadyVoted) {
    return (
      <button
        style={{ opacity: 0.5 }}
        disabled={true}
        className="Button violet"
      >
        Vote
      </button>
    );
  }

  if (isSuccessVoted) {
    return (
      <>
        <button disabled={true} className="Button violet">
          Vote
        </button>
        {createPortal(
          <DialogBase.Root open={openSuccess} onOpenChange={setOpenSuccess}>
            <DialogBase.Trigger asChild></DialogBase.Trigger>
            <DialogBase.Portal>
              <DialogBase.Overlay className="DialogOverlay" />
              <DialogBase.Content className="DialogContent">
                <DialogBase.Title className="DialogTitle">
                ESHH
                </DialogBase.Title>
                <DialogBase.Description className="DialogDescription">
                Your vote has been successfully recieved!
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
      </>
    );
  }

  return (
    <>
      <button
        onClick={() =>
          window.auth?.user ? vote({ candidate, voting }) : setOpen(true)
        }
        className="Button violet"
      >
        Vote
      </button>
      {createPortal(
        <DialogBase.Root open={open} onOpenChange={setOpen}>
          <DialogBase.Trigger asChild></DialogBase.Trigger>
          <DialogBase.Portal>
            <DialogBase.Overlay className="DialogOverlay" />
            <DialogBase.Content className="DialogContent">
              <DialogBase.Title className="DialogTitle">
              ONE MORE STEP
              </DialogBase.Title>
              <DialogBase.Description className="DialogDescription">
              Log in or create Mineplex account to vote for artists. Then you will be automatically returned to the battles! 
              </DialogBase.Description>

              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "center",
                }}
              >
                <DialogBase.Close asChild>
                  <button
                    onClick={() => {
                      localStorage.setItem("scrollTo", voting);
                      window?.auth?.redirectToLoginPage();
                    }}
                    className="Button ButtonModal"
                  >
                    LOG IN / CREATE 
                  </button>
                </DialogBase.Close>
              </div>
              <DialogBase.Close asChild>
                <button className="IconButton" aria-label="Close"></button>
              </DialogBase.Close>
            </DialogBase.Content>
          </DialogBase.Portal>
        </DialogBase.Root>,
        document.getElementById("dialog-root")
      )}
    </>
  );
};
