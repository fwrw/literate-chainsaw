import './App.css';

import { ReactNode } from 'react';

const App = ({ children }: { children: ReactNode }) => {
  return <div className="app-container">{children}</div>;
};

export default App;
