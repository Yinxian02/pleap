import React, { useState } from 'react';
import LearningObjectUpload from '../components/LearningObjectUpload';
import { LearningObject } from '../components/learningObject';
import GenerateAIContent from '../components/GenerateAIContent';
import LessonComponent from '../components/LessonComponent';
import '../styles/UploadLesson.css';

const UploadLesson = () => {
    const [learningObjects, setLearningObjects] = useState([]);
    const [lessonData, setLessonData] = useState({
      title: '',
      author: '',
      description: '',
      thumbnail: '',
    });
    const [generateContent, setGenerateContent] = useState(false);
    const [lessonUploaded, setLessonUploaded] = useState(false);
  
    const addLearningObject = () => {
      setLearningObjects([
        ...learningObjects,
        { subtopic: '', type: '', content: '' },
      ]);
    };
  
    const handleLessonChange = (e) => {
      setLessonData({
        ...lessonData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleChange = (e, index) => {
      const { name, value } = e.target;
      const newLearningObjects = learningObjects.map((obj, idx) => {
        if (index === idx) {
          return { ...obj, [name]: value };
        }
        return obj;
      });
      setLearningObjects(newLearningObjects);
    };
  
    const handleTypeChange = (e, index) => {
      const { value } = e.target;
      const newLearningObjects = learningObjects.map((obj, idx) => {
        if (index === idx) {
          return { ...obj, type: value, content: '' };
        }
        return obj;
      });
      setLearningObjects(newLearningObjects);
    };
  
    const handleSubmit = () => {
        const finalLessonData = {
          ...lessonData,
          learningObjects: learningObjects.map(obj => {
                let learningObject;
                if (obj.type === 'narrative') {
                    learningObject = new LearningObject(obj.subtopic, 'text/plain', 'expositive', "narrative text", 'low');
                    learningObject.setText(obj.content);
                } else if (obj.type === 'youtube') {
                    learningObject = new LearningObject(obj.subtopic, 'video/html', 'expositive', "lecture", 'low');
                    learningObject.setVideo(obj.content);
                } else if (obj.type === 'slide') {
                    learningObject = new LearningObject(obj.subtopic, 'image/png', 'expositive', "slide", 'low');
                    learningObject.setImage(obj.content);
                }
            return learningObject.getJSON();
          }),
        };
        // Submit the finalLessonData to your server or API
        console.log('Final lesson data:', finalLessonData);
        <LessonComponent title={finalLessonData.title} 
            author={finalLessonData.author}
            description={finalLessonData.description}
            thumbnail={finalLessonData.thumbnail}
            learningObjects={finalLessonData.learningObjects} />     

        setLessonUploaded(true);
      };
    
    const handleAIButtonSubmit = () => {
        setGenerateContent(true);
    };
  
    return (
      <div>
        <h1 className='upload-lesson-title'>Create Lesson</h1>
        <div className='lesson-content'>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            className='lo-input'
            value={lessonData.title}
            onChange={handleLessonChange} 
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            name="description" 
            className='lo-textarea'
            value={lessonData.description}
            onChange={handleLessonChange} 
            required
          />
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input 
            type="text" 
            id="thumbnail" 
            name="thumbnail" 
            className='lo-input'
            value={lessonData.thumbnail}
            onChange={handleLessonChange}
            required
          />
        </div>
        
        {learningObjects.map((learningObject, index) => (
          <LearningObjectUpload 
            key={index} 
            index={index} 
            learningObject={learningObject}
            handleChange={handleChange} 
            handleTypeChange={handleTypeChange}
          />
        ))}
        

        { generateContent && <GenerateAIContent/>}
        { !lessonUploaded ? 
            <div className="lesson-upload-button-container">
                <button type="button" onClick={addLearningObject}>
                    Add Learning Object
                </button>
                <button type="button" onClick={handleSubmit}>
                    Create Lesson
                </button>  
            </div>
            : 
            <button type="button" onClick={handleAIButtonSubmit}>
               Generate AI Content
            </button> }
      </div>
    );
};

export default UploadLesson;
