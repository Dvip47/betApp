import axios from "axios";

export const getGlobalSetings = async () => {
    try {
      
      const token = localStorage.getItem("tk")
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_UPLINE_BACKEND}/api/v1/getGlobalSettings`,
        {
          key: `${process.env.NEXT_PUBLIC_KEY}`
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };