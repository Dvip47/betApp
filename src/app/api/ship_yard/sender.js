import axios from "axios";

// tunnel
/**
 *
 * @param {String} url
 * @param {String} method
 * @param {Object} data
 * @returns
 */
export const sendHttpRequest = async (url, method, data) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      let response;
      switch (method.toLowerCase()) {
        case "post":
          response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          break;
        case "get":
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          break;
        case "patch":
          response = await axios.patch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          break;
        default:
          throw new Error("Unsupported method.");
      }
      return response;
    }
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export const editExposureLimitSender = async (formData) => {
  try {
    const response = await sendHttpRequest(
      "/users/exposure_limit_patch",
      "post",
      formData
    );
    return response;
  } catch (error) {
    console.error("Failed to handle exposure:", error);
    throw error;
  }
};
export const transact = async (formData, transaction_type) => {
  try {
    const response = await sendHttpRequest(
      `/ctr/${transaction_type === "deposit" ? "deposit" : "withdraw"}`,
      "post",
      formData
    );
    return response;
  } catch (error) {
    console.error("Failed to handle exposure:", error);
    throw error;
  }
};

export const editCreditRefSender = async (formData) => {
  try {
    const response = await sendHttpRequest(
      "/users/credit_ref_patch",
      "post",
      formData
    );
    return response;
  } catch (error) {
    console.error("Failed to handle credit_ref:", error);
    throw error;
  }
};

export const getCasinoProviders = async () => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/getProviders`
    );

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching providers:`, error);
    return null;
  }
};

export const getGames = async ({ limit, page, provider, gameName }) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/getGames/?limit=${limit}&page=${page}&pname=${provider}&gname=${gameName}`
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching providers:`, error);
    return null;
  }
};

export const getMatchesForScores = async ({ limit, page, sport_id }) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getMatches2/`,
      {
        sport_id: sport_id,
      }
    );

    return response.data.matches;
  } catch (error) {
    console.error(`Error fetching providers:`, error);
    return null;
  }
};
export const getScoresLake = async ({ limit, page, sport_id, matchNames }) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getScoresLake`,
      {
        sport_id: "4",
        match_name: matchNames,
      }
    );

    return response.data.scores;
  } catch (error) {
    console.error(`Error fetching providers:`, error);
    return null;
  }
};

export const getPopularGames = async () => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/getPopularGames`
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching providers:`, error);
    return null;
  }
};
