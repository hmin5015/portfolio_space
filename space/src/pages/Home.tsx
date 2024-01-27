/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";

export const Home = () => {
  const apiDevUri = import.meta.env.VITE_REACT_APP_API_URL;
  const apiUrl = `${apiDevUri}/user?UserId=ed18a094-0589-47bf-be16-6b2754421aed`;
  const { data, error, loading, fetchData } = useAxios();

  // Fetch data using GET method
  useEffect(() => {
    fetchData(apiUrl, 'GET');
  }, [apiUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
};
