import axios from "axios";
import { useState, useCallback } from "react";

import { useMessage } from "./message.hook";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const message = useMessage();

  const request = useCallback(
    async (url) => {
      try {
        setLoading(true);

        const response = await axios.get(url);

        if (response.data) {
          setLoading(false);
          return response.data;
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.message);
            message(`Error: ${err.response.data.message}`);
          } else if (err.request) {
            setError(err.request);
            message(`Error: ${err.request}`);
          } else {
            setError(err.message);
            message(`Error: ${err.message}`);
          }
        }
        setLoading(false);
      }
    },
    [message],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};
