// LearningObjectUpload.js
import React from 'react';

const LearningObjectUpload = ({ index, handleChange, handleTypeChange, learningObject }) => {
  return (
    <div>
      <label htmlFor={`subtopic${index}`}>Subtopic {index + 1}</label>
      <input 
        type="text" 
        id={`subtopic${index}`} 
        name="subtopic" 
        value={learningObject.subtopic}
        onChange={(e) => handleChange(e, index)} 
      />

      <label htmlFor={`type${index}`}>Type:</label>
      <select
        id={`type${index}`}
        name="type"
        value={learningObject.type}
        onChange={(e) => handleTypeChange(e, index)}
      >
        <option value="">Select Type</option>
        <option value="narrative">Narrative Text</option>
        <option value="youtube">Lecture YouTube Video</option>
        <option value="slide">Slide</option>
      </select>
      
      {learningObject.type === 'narrative' && (
        <div>
          <label htmlFor={`narrative${index}`}>Narrative Text</label>
          <textarea
            id={`narrative${index}`}
            name="content"
            value={learningObject.content}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      )}
      {learningObject.type === 'youtube' && (
        <div>
          <label htmlFor={`youtube${index}`}>YouTube URL</label>
          <input
            type="text"
            id={`youtube${index}`}
            name="content"
            value={learningObject.content}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      )}
      {learningObject.type === 'slide' && (
        <div>
          <label htmlFor={`slide${index}`}>Slide URL</label>
          <input
            type="text"
            id={`slide${index}`}
            name="content"
            value={learningObject.content}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      )}
    </div>
  );
};

export default LearningObjectUpload;
