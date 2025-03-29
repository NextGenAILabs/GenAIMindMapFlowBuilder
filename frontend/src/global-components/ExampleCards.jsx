const ExampleCards = ({ svg, txt, isActive, name, setSelectedVideo }) => {
    const backgroundColor = isActive ? 'black' : 'rgba(246, 246, 246, 1)'
    const color = isActive ? 'white' : 'black'
    return (
        <div className="example-card" style={{display: 'flex', gap: '0.5rem', backgroundColor: backgroundColor, color: color}}
            onClick={(e) => setSelectedVideo(name)} 
        >
            <img
            width={'44px'}
            height={'44px'}
                src={svg}
                alt={'example-svg'}
            />
                <h4>{txt}</h4>
        </div>
    );
};

export default ExampleCards;
