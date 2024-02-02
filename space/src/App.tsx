import {useEffect, useState} from 'react';
import { Routes, Route } from "react-router-dom";
import {
  Footer,
  Header,
  Home,
  Feed,
  Search,
  Manage,
  NotFound,
} from "./pages/_index";
import useAxios from "./hooks/useAxios";
import axios from "axios";

type UserInfo = {
  UserId: string;
  City: string;
  Country: string;
  IpAddress: string;
  Latitude: number;
  Logitude: number;
  LogDate: string;
  Message: string;
  PostalCode: string;
  Region: string;
  Timezone: string;
};

function App() {  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    UserId: "ed18a094-0589-47bf-be16-6b2754421aed",
    City: "Jurupa Valley",
    Country: "United States",
    IpAddress: "35.149.28.37",
    Latitude: 34.0062,
    Logitude: -117.4432,
    LogDate: new Date().toISOString(),
    Message: "THIS LOG FROM JEONG HONG MIN",
    PostalCode: "92509",
    Region: "California",
    Timezone: "America/Los_Angeles",
  });

  const apiDevUri = import.meta.env.VITE_REACT_APP_API_URL;
  const apiPostUrl = `${apiDevUri}/userlog`;
  const { fetchData } = useAxios();

  const getData = async (): Promise<void> => {
    const res = await axios.get("https://ipapi.co/json/");
    setUserInfo({
      UserId: "ed18a094-0589-47bf-be16-6b2754421aed",
      City: res.data.city,
      Country: res.data.country,
      IpAddress: res.data.ip,
      Latitude: res.data.latitude,
      Logitude: res.data.longitude,
      LogDate: new Date().toISOString(),
      Message: "유저님이 방문하셨습니다.",
      PostalCode: res.data.postal,
      Region: res.data.region,
      Timezone: res.data.timezone,
    });
  };

  useEffect(() => {   
    const fetchUserDataAndCreateUserLog = async () => {
      await getData();
      await fetchData(apiPostUrl, "POST", userInfo);
    };
  
    fetchUserDataAndCreateUserLog();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/search" element={<Search />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
