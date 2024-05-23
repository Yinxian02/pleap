import axios from "axios";

const lectureToMP3 = async ( link ) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = link.match(regex);
    const id = matches ? matches[1] : null;
    
    try {
        const res = await axios.get('https://youtube-mp36.p.rapidapi.com/dl', {
        params: { id },
        headers: {
            'X-RapidAPI-Key': 'ea5533f125msh7381b88297d175fp1bdaf6jsn100496398d91',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
        });
        return res.data; 
    } catch (error) {
        console.error('Error converting lecture to MP3:', error);
    }
};

export { lectureToMP3 };
