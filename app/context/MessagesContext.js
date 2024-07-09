import { createContext, useEffect, useState } from "react";

export const messagesContext = createContext();

const messagesContextProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/message/${id}`)
        .then((res) => {
          if (res.data.ok) {
            setConversation(res.data.messages);
            console.log(res.data.messages)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  values = { conversation, setId, id };
  return (
    <messagesContext.Provider value={values}>
      {children}
    </messagesContext.Provider>
  );
};

export default messagesContextProvider;
