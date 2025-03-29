const TestimonialCards = ({bgColor, heading, content}) => {
    return (
        <div className='testimonial' style={{backgroundColor: bgColor}}>
            <h1>{heading}</h1>
            <p>{content}</p>
        </div>
    )
}

export default TestimonialCards