import axios from "axios";

export async function getUserData() {
    return axios
      .get("/api/authUser")
      .then((res) => {
        return res.data.authUser
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}
