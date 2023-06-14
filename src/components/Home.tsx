import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './static/css/home.css';
import NavBar from './NavBar';



interface DataItem {
  id: number;
  created: string;
  video_thumbnail: string;
  video_title: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:8000/');
        setData(response.data);
      } catch (err) {
        // Handle error
      }
    };

    fetchData();
  }, []);
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



  const getVideos = (): JSX.Element[] => {
    let list: JSX.Element[] = [];

    data.forEach((item) => {
    const imageUrl = `http://localhost:8000/${item.video_thumbnail}`;
      list.push(
        <a href="#" key={item.id}>
          <div className="card">
            <img className="card-img-top" src={imageUrl} alt="card image" />
            <div className="card-body">
              <h5 className="card-title">{item.video_title}</h5>
              <p className="card-text">{formatDate(item.created)}</p>
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
      <div className="wrapper">
        {getVideos()}
      </div>
    </div>
  );
};

export default Home;

