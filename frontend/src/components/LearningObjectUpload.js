// LearningObjectUpload.js
import React from 'react';
import '../styles/UploadLesson.css';

const LearningObjectUpload = ({ index, handleChange, handleTypeChange, learningObject }) => {
  return (
    <div className='lo-upload-div'>
      <label htmlFor={`subtopic${index}`}>Subtopic {index + 1}</label>
      <input 
        type="text" 
        id={`subtopic${index}`} 
        name="subtopic" 
        className='lo-input'
        value={learningObject.subtopic}
        onChange={(e) => handleChange(e, index)} 
      />

      <label htmlFor={`type${index}`}>Type:</label>
      <select
        id={`type${index}`}
        name="type"
        className='lo-input'
        value={learningObject.type}
        onChange={(e) => handleTypeChange(e, index)}
      >
        <option value="">Select Type</option>
        <option value="narrative">Narrative Text</option>
        <option value="youtube">Lecture YouTube Video</option>
        <option value="slide">Slide</option>
      </select>
      
      {learningObject.type === 'narrative' && (
        <div className='lo-upload-container'>
          <label htmlFor={`narrative${index}`}>Narrative Text</label>
          <textarea
            id={`narrative${index}`}
            name="content"
            className='lo-narrative-textarea'
            value={learningObject.content}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      )}
      {learningObject.type === 'youtube' && (
        <div className='lo-upload-container'>
          <label htmlFor={`youtube${index}`}>YouTube URL</label>
          <input
            type="text"
            id={`youtube${index}`}
            name="content"
            className='lo-input'
            value={learningObject.content}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      )}
      {learningObject.type === 'slide' && (
        <div className='lo-upload-container'>
          <label htmlFor={`slide${index}`}>Slide URL</label>
          <input
            type="text"
            id={`slide${index}`}
            name="content"
            className='lo-input'
            value={learningObject.content}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      )}
    </div>
  );
};

export default LearningObjectUpload;
