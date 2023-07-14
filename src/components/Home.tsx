import React, { useState, useEffect } from "react";
import axios from "axios";
import "./static/css/home.css";
import NavBar from "./NavBar";
import { apiUrl } from './globals/globalEnv'; // Assuming you have an 'apiKey' variable in your globalEnv file
import { useNavigate } from 'react-router-dom';

interface DataItem {
  id: number;
  created: string;
  video_thumbnail: string;
  video_title: string;
  vid: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const navigate = useNavigate();
  const apk = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (apiUrl ) {
          const response = await axios.get<DataItem[]>(apiUrl, {
            headers: {
                Authorization: `$${apk}`,
            }

          });
          setData(response.data);
        } else {
          console.error('REACT_APP_API_URL is not defined');
        }
      } catch (err) {
        // Handle error
      }
    };

    fetchData();
  }, [apk]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };

    const date = new Date(dateString);
    return date.toLocaleString(undefined, options);
  };


    const redirectToDetailsPage = (vid: string) => {
    // Perform any necessary processing or API requests here
    // Redirect to the details page using history.push with the appropriate URL
    navigate(`/watch/v/${vid}`);
  };

  const getVideos = (): JSX.Element[] => {
    let list: JSX.Element[] = [];

    data.forEach((item) => {
      const imageUrl = `${apiUrl}/${item.video_thumbnail}`;
      list.push(
        <a href="" key={item.id} onClick={() => redirectToDetailsPage(item.vid)} >
          <div className="cardh">
            <img className="card-img-toph" src={imageUrl} alt="card image" />
            <div className="card-bodyh">
              <h5 className="card-titleh">{item.video_title}</h5>
              <p className="card-texth">{formatDate(item.created)}</p>
            </div>
          </div>
        </a>
      );
    });

    return list;
  };

  return (
    <div>
      <NavBar />
      <div className="wrapperh">
        {getVideos()}
      </div>
    </div>
  );
};

export default Home;
