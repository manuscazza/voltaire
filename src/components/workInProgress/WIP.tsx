import React from 'react';
import donut from '../../assets/donut2.png';
import clash from '../../assets/clash.jpeg';

const WIP: React.FunctionComponent<{}> = () => {
  return (
    <div style={center}>
      <h2 style={workInProgress}>
        Work in progress
        <img src={donut} alt="ciambellina" style={spin} />
      </h2>
    </div>
  );
};

export default WIP;

const spin: React.CSSProperties = {
  animation: 'spin 20s linear infinite',
  transformOrigin: 'center center',
  width: 150, //'162px',
  height: 150, //'162px',
  position: 'absolute',
  top: 122, //-18,
  left: 245 //165,
};

const center: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

const workInProgress: React.CSSProperties = {
  fontFamily: 'OpenSans, sans-serif',
  fontSize: '180px',
  fontWeight: 900,
  letterSpacing: '-0.6rem',
  textTransform: 'uppercase',
  lineHeight: '125px',
  backgroundImage: `url(${clash})`,
  backgroundSize: 'contain',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  display: 'inline-block',
  height: 350,
  position: 'relative'
};
