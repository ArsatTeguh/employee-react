import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UseFetch = () => {
  const [data, setData] = useState<any | []>([]);
  const [message, setMesage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const onFetch = async ({
    url,
    method,
    payload,
  }: {
    url: string;
    method: string;
    payload?: any;
  }) => {
    setLoading(true);
    try {
      let response;
      switch (method) {
        case "GET":
          response = await axios.get(url);
          break;
        case "POST":
          response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`,
            payload
          );
          break;
        case "PATCH":
          response = await axios.patch(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`,
            payload
          );
          break;
        case "DELETE":
          response = await axios.delete(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`
          );
          break;
        case "PARAMS":
          response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`,
            {
              params: payload,
            }
          );
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      if (method == "GET" || method == "PARAMS") {
        setData(response.data.data);
      }
      setMesage(response.data.message)
      return response.data.data;
    } catch (error: any) {
      if (Object.keys(error).length === 0) {
        navigate("/error-server");
      }
      switch (error?.response?.status) {
        case 400:
          setIsError(true);
          const isMesage = error?.response?.data?.error
            ? error?.response?.data.error
            : error?.response?.data?.message;
          setMesage(isMesage);
          throw new Error(error?.response?.status);
        case 500:
          setIsError(true);
          setMesage("Internal server error");
          setMesage(isMesage);
          throw new Error(error?.response?.status);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, isError, onFetch, message, setMesage, setIsError };
};
