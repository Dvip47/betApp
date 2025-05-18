import axios from "axios";

export const placeBet = async (toSend) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bets/placebet/ex`,
        toSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        // console.log("EXCHANGE DATA", res)
        if (res.status === 200) {
          if (res.data.statusCode === 200) {
            alert("Bet successfully placed");
            return true;
          }
        } else {
          alert("Bet not placed");
          return false;
        }
      }
    } else {
      alert("Oops insufficient privileges");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCasinoBets = async (toSend) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getCasinoBetHistory`,
        toSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        console.log("EXCHANGE DATA", res)
        if (res.status === 200) {
          return res.data
        } 
      }
    } 
  } catch (error) {
    console.log(error);
    return false;
  }
};
