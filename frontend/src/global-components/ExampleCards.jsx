const ExampleCards = ({ svg, txt }) => {
    return (
        <div className="example-card">
            <img
                src={svg}
                alt={'example-svg'}
            />
            <h4>{txt}</h4>
            <button id="example-btn">View Button</button>
        </div>
    );
};

export default ExampleCards;
