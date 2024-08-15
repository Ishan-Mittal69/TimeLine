import React, { useState } from 'react';
import { Input } from './input';

function EditableContentBox({ index, initialText, onChange, style, placeholder }) {
  const [text, setText] = useState(initialText);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onChange(index, newText);
  };

  return (
    <>
      {/* Content input */}
      <div className="p-2 mb-2 border rounded">
        <Input
          value={text}
          placeholder={placeholder ||`content for given time period`}
          onChange={handleTextChange}
          
          className='bg-gray-400 bg-opacity-10 text-center' 
          style={style || { padding: 4, width: '100%', height: '50px', resize: 'none', borderRadius: 2 }}
          />
      </div>
      </>
    
  );
}

export default EditableContentBox;
