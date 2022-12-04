
import {useNavigate} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageURL} = teamDetails
  let navigate = useNavigate();

  return (
   
    <li className="team-item">
        <img src={teamImageURL} alt={name} className="team-logo" onClick={()=>navigate(`/team-matches/${id}`)} />
        <p className="team-name">{name}</p>
    </li>
  )
}

export default TeamCard