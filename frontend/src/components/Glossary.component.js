
const Glossary = ({ glossary }) => {
    return (
        <div className="glossary-div">
            {glossary.map((item, index) => (
                <div key={index} className="glossary-item">
                    <div className="glossary-term">{item.term}</div>
                    <div className="glossary-definition">{item.definition}</div>
                </div>
            ))}
        </div>
    );
}

export default Glossary; 