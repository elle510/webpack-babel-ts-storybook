import React from 'react';

import './styles/test.css';
import './styles/test.scss';

type AppProps = {
  test?: string;
}

const App:React.FC<AppProps> = ({test}) => {
  return (
    <div>
      App - Story
      <div className="test-css" style={{height: '30px'}}>{test}</div>
      <div className="test-scss" style={{height: '30px'}}>{test}</div>
    </div>
  );
};

export default App;