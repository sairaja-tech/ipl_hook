import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import LatestMatch from "../LatestMatch";
import "./index.css";
import { useLocation, useParams } from "react-router-dom";

// const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'


const TeamMatches = () => {
  const [teamMatchesData, setTeamMatchesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
      console.log(location);

      const param= useParams();
      console.log(param);

  useEffect(() => {

    axios
      .get(`https://apis.ccbp.in/ipl/${param.id}` )
      .then((res) => {
        console.log(res.data);
        const formattedData = {
      teamBannerURL: res.data.team_banner_url,
      latestMatch: getFormattedData(res.data.latest_match_details),
      recentMatches: res.data.recent_matches.map(eachMatch =>
        getFormattedData(eachMatch),
      ),
    }
        setTeamMatchesData(formattedData);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });

      
  }, [param.id]);

  const getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })




  console.log(teamMatchesData)

  const renderTeamMatches = () => {
    console.log(teamMatchesData)

    return (
      <div className="responsive-container">
        <img src={teamMatchesData.teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={teamMatchesData.latestMatch} />
        
      </div>
    )
  }

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
        {isLoading ? renderTeamMatches() : renderLoader()}
      </div>
    </div>
  );
};

export default TeamMatches;
