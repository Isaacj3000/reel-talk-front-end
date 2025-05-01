import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as reelService from "../../services/reelService";
import "./TrendingReels.css";

const TrendingReels = () => {
    const [trendingReels, setTrendingReels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedComments, setExpandedComments] = useState({});

    useEffect(() => {
        const loadTrendingReels = async () => {
            try {
                const reels = await reelService.fetchTrendingReels();
                console.log("Loaded reels:", reels);
                setTrendingReels(reels || []);
                setLoading(false);
            } catch (err) {
                console.error("Error loading trending reels:", err);
                setError("Failed to load trending reels. Please try again later.");
                setLoading(false);
            }
        };
        loadTrendingReels();
    }, []);

    const handleLike = async (reelId) => {
        try {
            const updatedReel = await reelService.likeReel(reelId);
            if (updatedReel) {
                setTrendingReels(prevReels =>
                    prevReels.map(reel => (reel._id === updatedReel._id ? updatedReel : reel))
                );
            }
        } catch (err) {
            console.error("Error liking reel:", err);
        }
    };

    const toggleComments = (reelId) => {
        console.log("Toggling comments for reel:", reelId);
        console.log("Current expanded state:", expandedComments[reelId]);
        setExpandedComments(prev => {
            const newState = {
                ...prev,
                [reelId]: !prev[reelId]
            };
            console.log("New expanded state:", newState);
            return newState;
        });
    };

    if (loading) return <div className="loading">Loading trending reels...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <main className="trending-container">
            <div className="trending-header">
                <h1>Trending Reels</h1>
                <Link to="/reels/new" className="create-reel-prompt">
                    <span>Share your thoughts! Create a new reel</span>
                    <span className="arrow">→</span>
                </Link>
            </div>
            
            {trendingReels.length === 0 ? (
                <div className="no-reels">
                    <p>No trending reels yet. Be the first to create one!</p>
                    <Link to="/reels/new" className="create-first-reel-btn">
                        Create Your First Reel
                    </Link>
                </div>
            ) : (
                <div className="trending-grid">
                    {trendingReels.map((reel) => {
                        console.log("Rendering reel:", reel._id, "Comments:", reel.comments);
                        const isExpanded = expandedComments[reel._id];
                        console.log("Is expanded:", isExpanded);
                        
                        return (
                            <article key={reel._id} className="trending-reel">
                                <header className="reel-header">
                                    <h2>{reel.title}</h2>
                                    <p className="author">
                                        By {reel.author?.username || "Unknown"}
                                    </p>
                                    <p className="date">
                                        {new Date(reel.createdAt).toLocaleDateString()}
                                    </p>
                                </header>

                                <div className="reel-content">
                                    <p>{reel.text}</p>
                                </div>

                                <div className="reel-stats">
                                    <button 
                                        className="like-btn"
                                        onClick={() => handleLike(reel._id)}
                                    >
                                        ❤️ {reel.likes?.length || 0} Likes
                                    </button>
                                    <button 
                                        className={`comments-toggle-btn ${isExpanded ? 'active' : ''}`}
                                        onClick={() => toggleComments(reel._id)}
                                    >
                                        💬 {reel.comments?.length || 0} Comments
                                    </button>
                                </div>

                                {isExpanded && (
                                    <div className="comments-section" style={{ display: 'block' }}>
                                        <h3>Comments</h3>
                                        {reel.comments && reel.comments.length > 0 ? (
                                            <div className="comments-list">
                                                {reel.comments.map((comment) => {
                                                    console.log("Rendering comment:", comment);
                                                    return (
                                                        <div key={comment._id} className="comment">
                                                            <div className="comment-header">
                                                                <span className="comment-author">
                                                                    {comment.author?.username || "Unknown"}
                                                                </span>
                                                                <span className="comment-date">
                                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <p className="comment-text">{comment.text}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <p className="no-comments">No comments yet. Be the first to comment!</p>
                                        )}
                                    </div>
                                )}

                                <div className="reel-actions">
                                    <Link to={`/reels/${reel._id}`} className="view-btn">
                                        View Details
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </main>
    );
};

export default TrendingReels;
