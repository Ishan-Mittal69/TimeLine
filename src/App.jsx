import React from 'react';
import Timeline from './Timeline';

function App() {
  return (
    <div className="App bg-slate-200">
      <header className='text-black text-4xl text-center p-4 bg-slate-300 shadow-slate-500 shadow-lg mb-5'>
        The Time Line Creator
      </header>
      <Timeline />
    </div>
  );
}

export default App;