import { useEffect, useState } from 'react';
import { youtubeToMP3 } from './youtubeToMP3';

// Function to extract YouTube video ID
const extractYouTubeID = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

async function convertLectureVideos(learningObjects){

    for (let learningObject of learningObjects) {
    //   console.log(learningObject)
      try {
        if (learningObject.educational.learningResourceType === "lecture") {
            const videoID = extractYouTubeID(learningObject.content.link);
            if (videoID) {
              const mp3Url = await youtubeToMP3(videoID);
              console.log(mp3Url);
            }
        }
      } catch (error) {
        console.error('Error converting lecture:', error);
      }
    }
  }

export { convertLectureVideos };