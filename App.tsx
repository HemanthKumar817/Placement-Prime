import React from 'react';
import { BackgroundBeamsDemo } from './components/BackgroundBeamsDemo';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <BackgroundBeamsDemo />
    </div>
  );
};

export default App;