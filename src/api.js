import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://communications.mineplex.io/api/2.0",
  timeout: 3000,
});

export const Api = {
  category: {
    getRoot: async (root) => {
      const result = await httpClient.get(`/category?alias=${root}`);

      const rootCategory = result.data.docs[0];

      return rootCategory;
    },
    getChildren: async (parent) => {
      const result = await httpClient.get(`/category?parent=${parent}`);

      return result.data.docs;
    },
  },
  voting: {
    getByCategory: async (category) => {
      const result = await httpClient.get(`/voting?category=${category}`);

      return result.data.docs.filter((voting) => voting.active);
    },
    getByDate: async (date) => {
      const result = await httpClient.get(`/voting?sort=${date}`)

      return result.data.docs.filter((voting) => voting.active)
    }
  },
  votingHistory: {
    vote: async (body) => {
      return httpClient.post("/voting-history", body, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });
    },
    userVotingHistory: async () => {
      const result = await httpClient.get("/voting-history", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      return { data: result.data, status: result.status };
    },
  },
  candidate: {
    getCandidate: async (voting) => {
      const result = await httpClient.get(
        `/voting-candidate?voting=${voting}`,
        {
          headers: {
            "x-language": "en",
          },
        }
      );

      return result.data.docs;
    },
  },
};
