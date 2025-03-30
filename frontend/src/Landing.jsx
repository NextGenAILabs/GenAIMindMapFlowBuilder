import logo from './assets/landing-logo.svg';
import PDFLogo from './assets/pdf.svg';
import SQLLogo from './assets/sql.svg';
import CSVLogo from './assets/csv.svg';
import WEBLogo from './assets/web.svg';
import MDLogo from './assets/markdown.svg';
import TXTLogo from './assets/text.svg';
import VIDEOSLogo from './assets/video.svg';
import PDFEx from './assets/pdf-ex.svg';
import SQLEx from './assets/sql-ex.svg';
import WEBEx from './assets/web-ex.svg';
import GITLogo from './assets/git.svg';
import DOCXLogo from './assets/docx.svg';
import PPTXLogo from './assets/pptx.svg';
import YTUBELogo from './assets/youtube.svg';
import AUDIOLogo from './assets/audio.svg';
import HTMLLogo from './assets/html.svg';
import IMGLogo from './assets/img.svg';
import FLOWEx from './assets/flow.svg';
import SOURCESvg from './assets/playSource.svg';
import QASvg from './assets/qaSvg.svg';
import SUMMSvg from './assets/summ.svg';
import video1 from './assets/video1.mp4';
import video2 from './assets/video2.mp4';
import video3 from './assets/video3.mp4';
import { LandingCards } from './global-components/LandingCards';
import ExampleCards from './global-components/ExampleCards';
import TestimonialCards from './global-components/TestimonialCards';
import { useEffect, useState } from 'react';
export const Landing = () => {
    const [selectedVideo, setSelectedVideo] = useState('Sources')

    const getVideo = () => {
         if (selectedVideo === 'Sources') return video1;
         if (selectedVideo === 'Multiple') return video2;
         if (selectedVideo === 'Summary') return video3;
         return null;
     };

    let video = getVideo();

    return (
        <div className="landing-page">
            <div className="landing-section-1">
                <div className="landing-logo">
                    <img
                        src={logo}
                        id="landing-logo"
                    />
                    <p>GNOSIS</p>
                </div>
                <div className="hero">
                    <h1>AI Mind Map Summarizer</h1>
                    <h2>
                        Summarize YouTube, PDFs/Docs, URLs, Long Emails,Meeting
                        Recordings into Mind Maps in seconds.
                    </h2>
                    <div className="landing-buttons">
                        <a
                            href="http://localhost:5173/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button id="try-now">Try Now</button>
                        </a>
                        <a
                            href="https://github.com/NextGenAILabs/GenAIMindMapFlowBuilder"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button id="github">
                                <img
                                    src={GITLogo}
                                    alt="github"
                                />
                                Open Github
                            </button>
                        </a>
                    </div>
                </div>
                <div className="supported-inputs">
                    <span>
                        <p>SUPPORTED INPUTS</p>
                    </span>
                    <div className="actual-inputs">
                        <div>
                            <LandingCards
                                img={PDFLogo}
                                data="PDF"
                            />
                            <LandingCards
                                img={SQLLogo}
                                data="SQL"
                            />
                            <LandingCards
                                img={CSVLogo}
                                data="CSV"
                            />
                            <LandingCards
                                img={WEBLogo}
                                data="WEB"
                            />
                            <LandingCards
                                img={PPTXLogo}
                                data="PPTX"
                            />
                            <LandingCards
                                img={TXTLogo}
                                data="Text"
                            />
                            <LandingCards
                                img={MDLogo}
                                data="Markdown"
                            />
                            <LandingCards
                                img={AUDIOLogo}
                                data="Audio"
                            />
                        </div>
                        <div>
                            <LandingCards
                                img={VIDEOSLogo}
                                data="Videos"
                            />
                            <LandingCards
                                img={YTUBELogo}
                                data="Youtube"
                            />
                            <LandingCards
                                img={HTMLLogo}
                                data="HTML"
                            />
                            <LandingCards
                                img={IMGLogo}
                                data="IMG"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="example-section">
                <video
                    autoPlay
                    muted
                    playsInline
                    controls
                    className="example-video"
                    type="video/mp4"
                    src={video}
                ></video>
                <div className="example-cards">
                    <ExampleCards
                        svg={SOURCESvg}
                        txt={'Select your source'}
                        isActive={selectedVideo === 'Sources' ? true : false}
                        setSelectedVideo={setSelectedVideo}
                        name={'Sources'}
                    />
                    <ExampleCards
                        svg={QASvg}
                        txt={'Multiple Replies'}
                        isActive={selectedVideo === 'Multiple' ? true : false}
                        setSelectedVideo={setSelectedVideo}
                        name={'Multiple'}
                    />
                    <ExampleCards
                        svg={SUMMSvg}
                        txt={'Summarise'}
                        isActive={selectedVideo === 'Summary' ? true : false}
                        setSelectedVideo={setSelectedVideo}
                        name={'Summary'}
                    />
                </div>
            </div>
            <div className="landing-section-2">
                <h1>
                    <center>User Love Gnosis</center>
                </h1>
                <div className="testimonial-section">
                    <TestimonialCards
                        bgColor={'rgba(255, 106, 60, 0.08)'}
                        heading={'Power study'}
                        content={
                            'Upload your materials, and Gnosis will create a polished presentation outline with key points and evidence.'
                        }
                    />
                    <TestimonialCards
                        bgColor={'rgba(42, 188, 255, 0.08)'}
                        heading={'Organize your thinking'}
                        content={
                            'Share lecture notes, textbook chapters, or research papers to get simple explanations, real-world examples, and better understanding.'
                        }
                    />
                    <TestimonialCards
                        bgColor={'rgba(229, 156, 255, 0.08)'}
                        heading={'Spark New Ideas'}
                        content={
                            'Upload brainstorming ideas or market research to let Gnosis identify trends, suggest new products, and reveal hidden opportunities.'
                        }
                    />
                </div>
            </div>
            <div className="footer">
                <div className="landing-logo">
                    <img
                        src={logo}
                        id="landing-logo"
                    />
                    <p>GNOSIS</p>
                </div>
                <span id="contact">Need help ? nextgenailabs99@gmail.com</span>
            </div>
        </div>
    );
};
