import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

// team logos
import fakersLogo from '../../assets/images/fakers_logo.png';
import ragequitsLogo from '../../assets/images/ragequits_logo.png';
import scrubsLogo from '../../assets/images/scrubs_logo.png';
import tryhardsLogo from '../../assets/images/tryhards_logo.png';
import addictsLogo from '../../assets/images/addicts_logo.png';
import optimizersLogo from '../../assets/images/optimizers_logo.png';

// logo mapping
const logoMap = {
  Fakers: fakersLogo,
  Ragequits: ragequitsLogo,
  Scrubs: scrubsLogo,
  Tryhards: tryhardsLogo,
  Addicts: addictsLogo,
  Optimizers: optimizersLogo
};

// generate rows for Teams table
function TeamRow({ team, id }) {
  // popover content
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>
        <img 
          src={logoMap[team.teamName]} 
          alt={`${team.teamName} Logo`} 
          className='img-fluid w-25 mb-2'
        /><br />
        <strong>Team:</strong> {team.teamName}<br />
        <strong>Coach:</strong> {team.coachName}<br />
        <strong>Phone:</strong> {team.coachPhone}<br />
        <strong>Email:</strong> {team.coachEmail}<br />
        <strong>League:</strong> {team.leagueName}<br />
        <strong>Wins:</strong> {team.teamWins} <br />
        <strong>Losses:</strong> {team.teamLosses}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement='auto'
      overlay={popover}
      delay={{ show: 300, hide: 200 }}
    >
      <tr key={id}>
        <td>{team.teamName}</td>
        <td>{team.coachName}</td>
        <td>{team.coachPhone}</td>
        <td>{team.coachEmail}</td>
        <td>{team.leagueName}</td>
        <td>{team.teamWins}</td>
        <td>{team.teamLosses}</td>
      </tr>
    </OverlayTrigger>
  );
}

export default TeamRow;
