import { markDownToHtml } from "./markDownToHTML";
import Rating from "./Rating.component";
import '../styles/Embed.css';

const Embed = ({ learningObject }) => {
    const URL = learningObject.content.link;
        const embedCaption = learningObject.content.text ? markDownToHtml(learningObject.content.text) : "Click here to view the content";
        return (
            <div className="embed-div">
                <h1 className="embed-title">{learningObject.general.title}</h1>

                <div className="embed-text" dangerouslySetInnerHTML={{ __html: embedCaption }} />
                <br/>
                <iframe 
                    allowfullscreen="true" 
                    frameborder="0" 
                    height="300" 
                    src={ URL } 
                    title= {learningObject.general.title}
                    width="100%"
                    className="embed-frame"></iframe>

                <Rating id={learningObject._id}/>
            </div>
        )
};

export default Embed;