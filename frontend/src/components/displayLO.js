export function displayLO(learningObject) {
    const LRT = learningObject.educational.learningResourceType; 
    
    const URL = learningObject.content.link;
    
    if (LRT === "lecture"){
        const videoIdMatch = URL.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        return (
            <div style={{ textAlign: 'center' }}>
              <iframe
                width="560"
                height="315"
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
          );
        } else if (LRT === "slide") {
            return (
                <div style={{ textAlign: 'center' }}>
                  <img
                  src={URL}
                  alt="Slide"
                  style={{ width: '600px', maxWidth: '100%', height: 'auto' }}
                  />
                </div>
            );
        }
    
    if (learningObject.content.text === "mentimeter") {
        return (
            <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
                <iframe 
                    allowfullscreen="true" 
                    allowtransparency="true" 
                    frameborder="0" 
                    height="300" 
                    sandbox="allow-scripts allow-same-origin allow-presentation" 
                    src={URL} 
                    width="600"></iframe>
            </div>
        )
    }
    
    if (learningObject.technical.format === "text/plain"){
        return (
            <div>
                {learningObject.content.text}
            </div>
        );
    }
}