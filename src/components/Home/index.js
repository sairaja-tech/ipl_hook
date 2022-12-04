import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import TeamCard from "../TeamCard";
import "./index.css";


const Home = () => {
  const [teamsData, setteamsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://apis.ccbp.in/ipl")
      .then((res) => {
        console.log(res.data);
        const formattedData = res.data.teams.map((team) => ({
          name: team.name,
          id: team.id,
          teamImageURL: team.team_image_url,
        }));
        setteamsData(formattedData);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderTeamsList = () => {
    return (
      <ul className="teams-list">
        {teamsData.map((team) => (
          <TeamCard teamDetails={team} key={team.id} />
        ))}
      </ul>
    );
  };

  const renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Rings
        height="80"
        width="80"
        color="#4fa94d"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );

  return (
    <div className="home-route-container">
    <div className="teams-list-container">
        <div className="ipl-dashboard-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
        </div>
        {isLoading ? renderTeamsList() : renderLoader()}
      </div>
    </div>
  );
};

export default Home;
