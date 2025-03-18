import "./Landing.css";

import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="landing-container">
            <section className="hero">
                <h1>Welcome to ReelTalk💬🤩</h1>
                <p>Join the conversation, share your stories, and engage with the community.</p>
                <div className="cta-buttons">
                    <Link to="/sign-up">
                        <button className="sign-up-btn">Get Started 🚀</button>
                    </Link>
                    <Link to="/sign-in">
                        <button className="sign-in-btn">Sign In 🔑</button>
                    </Link>
                </div>
            </section>
            
            <section className="features">
                <div className="feature">
                    <h2>🤯Share Life Hacks</h2>
                    <p>Create and share reels with the world. Let your voice be heard!</p>
                </div>
                <div className="feature">
                    <h2>💬 Engage in Conversations</h2>
                    <p>Like, comment, and interact with posts from other users.</p>
                </div>
                <div className="feature">
                    <h2>🔥 Trending Reels</h2>
                    <p>Discover the hottest and most viral reels in real-time.</p>
                </div>
            </section>
        </div>
    );
};

export default Landing;
