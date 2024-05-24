import axios from "axios";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const youtubeToMP3 = async (id, retries = 5) => {
  const url = 'https://youtube-mp36.p.rapidapi.com/dl';
  const options = {
    params: { id },
    headers: {
      'X-RapidAPI-Key': 'ea5533f125msh7381b88297d175fp1bdaf6jsn100496398d91',
      'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
    }
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'] ? parseInt(error.response.headers['retry-after'], 10) * 1000 : (2 ** i) * 1000;
        console.log(`Rate limit exceeded. Retrying after ${retryAfter}ms...`);
        await sleep(retryAfter);
      } else {
        console.log(error); 
      }
    }
  }

//   throw new Error('Max retries exceeded');
};

export { youtubeToMP3 };