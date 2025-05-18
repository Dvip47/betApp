
import axios from "axios";

export const fetchPopularSportsEvents = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/popular`;
    const res = await axios.get(url);
    if (res && res.data && res.data.length > 0) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchPopularEvents = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/popular`;
    const res = await axios.get(url);
    if (res && res.data && res.data.length > 0) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMKTBK = async (marketIds) => {
  try {
    if (marketIds.length > 20) {
      const midpoint = Math.ceil(marketIds.length / 2);
      const firstHalf = marketIds.slice(0, midpoint);
      const secondHalf = marketIds.slice(midpoint);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const firstHalfRequest = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/mktbk`,
        { mkt: firstHalf.join(",") },
        config
      );
      setTimeout(() => { }, 1000);

      const secondHalfRequest = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/mktbk`,
        { mkt: secondHalf.join(",") },
        config
      );

      await Promise.all([firstHalfRequest, secondHalfRequest]);

      const data_ = await firstHalfRequest;
      const data = await secondHalfRequest;

      const combinedResponse = [...(data_.data || []), ...(data.data || [])];

      return combinedResponse;
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/mktbk`,
        { mkt: marketIds.join(",") },
        config
      );

      return response.data || [];
    }
  } catch (error) {
    console.error("Error while fetching market books:", error);
    return [];
  }
};

export const fetchCompetitions = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/cricket/competitions`
    );
    if (res && res.data) {
      const competitions__ = res.data.data.competitions;
      return competitions__.length > 0 ? competitions__ : [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetcheSportCompetitions = async (eventTypeId) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sport_competitions/${eventTypeId}`
    );
    if (res && res.data && res.data.length > 0) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchSportCompetitionEventsBySportAndCompetitionId = async (
  sportId,
  competitionId
) => {
  try {
    if (sportId && competitionId) {
      const queryParams = new URLSearchParams({
        sportId,
        competitionId,
      }).toString();

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sport_competition_events?${queryParams}`;
      const res = await axios.get(url);

      if (res && res.data) {
        const data = res.data.length > 0 ? res.data : [];
        return data;
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchSportCompetitionEvents = async (sport_id, competitionId) => {
  try {
    if (sport_id) {
      const queryParams = new URLSearchParams({
        sport_id,
      }).toString();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sport_events?${queryParams}`;
      const res = await axios.get(url);
      if (res && res.data && res.data.length > 0) {
        return res.data[0].events;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// export const getEvents = async () => {
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sports`
//     );
//     if (res && res.data && res.data.length > 0) {
//       return res.data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };


export const getEvents = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getActiveEvents`
    );
    if (res && res.data) {
      return res.data.events;
    }
  } catch (error) {
    console.log(error);
    return null
  }
};



export const fetcheEventMarkets = async (event_id, sport_id) => {
  try {
    if (event_id) {
      const queryParams = new URLSearchParams({
        eventId: event_id,
      }).toString();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/event_markets?${queryParams}`,
        {
          sport_id: sport_id,
          match_id: event_id
        }
      );
      if (res && res.data && res.data.length > 0) {
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};



export const getAccountStatements = async (body) => {
  try {
    0
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getAccountStatements`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res && res.status) {
        if (res.data.error != 3) {
          return res.data.account_statements
        }
      }
    }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}

export const fetchEventFancyMarkets = async (event_id) => {
  try {
    if (event_id) {
      const queryParams = new URLSearchParams({
        eventId: event_id,
      }).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/event_fancy?${queryParams}`
      );
      if (res && res.data && !res.data.data) {
        // console.log(res)
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetcheEventScores = async (event_id) => {
  try {
    if (event_id) {
      const queryParams = new URLSearchParams({
        eventId: event_id,
      }).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/e_s?${queryParams}`
      );
      if (res) {
        // console.log(res.data)
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchEventInnings = async (event_id) => {
  try {
    if (event_id) {
      const queryParams = new URLSearchParams({
        eventId: event_id,
      }).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/e_in?${queryParams}`
      );
      if (res) {
        // console.log(res.data)
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchEventIncidents = async (event_id) => {
  try {
    if (event_id) {
      const queryParams = new URLSearchParams({
        eventId: event_id,
      }).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/e_inc?${queryParams}`
      );
      if (res) {
        // console.log(res.data)
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};



export const getInplayMatches = async (sportName, sportId, page) => {
  try {
    if (sportName) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getInplayMatches`
        ,
        {
          sport_name: sportName,
          sport_id: sportId,
          pageno: page,
        }
      );
      if (res && res.status === 200) {
        return res.data;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const settlementTransaction = async (body) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/settlementTransaction`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data
    }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}



export const getSettlements = async (body) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getSettlementReports`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data
    }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}

export const fetcheInplayEventsBySportName = async (sportName, page) => {
  try {
    if (sportName) {
      const queryParams = new URLSearchParams({
        sportName: sportName,
        pg: page
      }).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/inplay?${queryParams}`
      );
      if (res && res.status === 200) {
        return res.data;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userdata`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        if (res.status === 200) {
          const user = res.data.other;
          return user;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserAcStatements = async () => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/ac_sts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        if (res.status === 200) {
          const ac_statements = res.data.accountStatements;
          return ac_statements;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};


export const fetchPL = async () => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/pl`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        if (res.status === 200) {
          const pl = res.data.profitLoss;
          return pl;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};


export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formatedDte =
    date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
  return formatedDte;
};



export const DisplayTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const today_date = today.toDateString().toString();
  const new_date = date.toDateString().toString();
  const options = { hour12: true, hour: "numeric", minute: "2-digit" };
  const formatedTime =
    today_date === new_date
      ? "Today" + " " + date.toLocaleTimeString(undefined, options)
      : "Starts" + " " + date.toLocaleTimeString(undefined, options);
  return formatedTime;
};
