import React from 'react'
type Props = {
  progress: string;
};

const ProgressBar: React.FC<Props> = ({progress}) => {
  
    const containerStyles = {
      height: 5,
      width: '70%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: '#0B57D0',
      borderRadius: 'inherit',
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          {/* <span style={labelStyles}>{`${completed}%`}</span> */}
        </div>
      </div>
    );
  };
  
  export default ProgressBar;