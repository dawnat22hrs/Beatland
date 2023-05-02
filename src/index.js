import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./style/index.css";

import { Category } from "./components";
import {
  useRootCategory,
  useChildrenCategory,
  useUserVotingHistory,
} from "./hooks";
import { UserVotingHistoryContext } from "./context";

const queryClient = new QueryClient();

const Main = () => {
  const { data: rootCategory, status } = useRootCategory("beatland");

  const { data: categories, status: statusCategories } = useChildrenCategory(
    rootCategory?._id ?? null
  );

  const { data: userVotingHistory } = useUserVotingHistory();

  return (
    <>
      <main className="main">
        <section className="section__voiting">
        <img className="background-graffity" src="https://static.tildacdn.com/tild3139-3030-4336-b236-323539356539/Big.png" alt="background" />
        <div className="circle-blur circle-blur_left"></div>
        <div className="circle-blur circle-blur_right"></div>
          <div className="_container">
            <UserVotingHistoryContext.Provider
              value={userVotingHistory?.data?.docs ?? []}
            >
              {statusCategories === "success" &&
                categories.map((category) => (
                  <Category key={category._id} category={category} />
                ))}
            </UserVotingHistoryContext.Provider>
          </div>
        </section>
      </main>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main></Main>
    </QueryClientProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
