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
import { LandingCards } from './global-components/LandingCards';
import ExampleCards from './global-components/ExampleCards';
export const Landing = () => {
    return (
        <div className="landing-page">
            <div className='landing-section-1'>
                <div className='landing-logo'>
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
                        <button id='try-now'>Try Now</button>
                        <button id='github'>
                            <img src={GITLogo} alt="github"/>
                            Open Github
                        </button>
                    </div>
                </div>
                <div className="supported-inputs">
                    <span>
                        <p>SUPPORTED INPUTS</p>
                    </span>
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
                            img={VIDEOSLogo}
                            data="Videos"
                        />
                        <LandingCards
                            img={TXTLogo}
                            data="Text"
                        />
                        <LandingCards
                            img={MDLogo}
                            data="Markdown"
                        />
                    </div>
                </div>
            </div>
            <div className="example-section">
                <video src=""></video>
                <ExampleCards
                    svg={PDFEx}
                    txt={'Get Insigts from PDF'}
                />
                <ExampleCards
                    svg={SQLEx}
                    txt={'Get Insigts from SQL'}
                />
                <ExampleCards
                    svg={WEBEx}
                    txt={'Get Insigts from WEB'}
                />
            </div>
            <div className='landing-section-2'>
                <h1>User Love Gnosis</h1>
                <div>

                </div>
            </div>
            
        </div>
    );
};
