import { useState } from "react";
import { Link } from "react-router-dom";
import * as reelService from "../../services/reelService";
import "./ReelList.css";

const ReelList = ({ reels, setReels, handleDeleteReel }) => {
    const [commentText, setCommentText] = useState({}); // Store comment input per reel
    const [visibleComments, setVisibleComments] = useState({}); // Track which reels' comments are visible

    // Add null check for reels
    if (!reels || !Array.isArray(reels)) {
        return <p className="no-reels">No reels available.</p>;
    }

    // Filter out any null or undefined reels
    const validReels = reels.filter(reel => reel && typeof reel === 'object');

    if (validReels.length === 0) {
        return <p className="no-reels">No reels available.</p>;
    }

    // Toggle comments visibility
    const toggleComments = (reelId) => {
        setVisibleComments(prev => ({
            ...prev,
            [reelId]: !prev[reelId]
        }));
    };

    //  Handle Liking a Reel
    const handleLike = async (reelId) => {
        try {
            const updatedReel = await reelService.likeReel(reelId);
            if (updatedReel) {
                setReels(prevReels =>
                    prevReels.map(reel => (reel?._id === updatedReel._id ? updatedReel : reel))
                );
            }
        } catch (error) {
            console.error('Error liking reel:', error);
        }
    };

    //  Handle Adding a Comment
    const handleAddComment = async (reelId) => {
        if (!commentText[reelId]?.trim()) return;  // Prevent empty comments

        try {
            const newComment = await reelService.createComment(reelId, { text: commentText[reelId] });
            if (newComment) {
                setReels(prevReels =>
                    prevReels.map(reel =>
                        reel?._id === reelId
                            ? { ...reel, comments: [...(reel.comments || []), newComment] }
                            : reel
                    )
                );
                setCommentText({ ...commentText, [reelId]: "" }); // Clear input after posting
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Handle Deleting a Reel
    const handleDelete = async (reelId) => {
        if (!window.confirm("Are you sure you want to delete this reel?")) return;
        try {
            await handleDeleteReel(reelId);
        } catch (error) {
            console.error('Error deleting reel:', error);
            alert('Failed to delete reel. Please try again.');
        }
    };

    return (
        <main className="reel-list-container">
            {validReels.map((reel) => (
                <article key={reel._id} className="reel-card">
                    {/* Reel Header */}
                    <header className="reel-header">
                        <h2>{reel.title || "Untitled Reel"}</h2>
                        <p className="reel-meta">
                            {`${reel.author?.username || "Unknown"} • 
                            ${reel.createdAt ? new Date(reel.createdAt).toLocaleDateString() : "No date"}`}
                        </p>
                    </header>

                    {/* Reel Text */}
                    <p className="reel-text">{reel.text || "No content available"}</p>

                    {/* Like & Comment Section */}
                    <div className="reel-actions">
                        <button className="like-btn" onClick={() => handleLike(reel._id)}>
                            ❤️ {reel.likes?.length || 0} Likes
                        </button>

                        {/* Add a Comment */}
                        <input
                            type="text"
                            className="comment-input"
                            placeholder="Add a comment..."
                            value={commentText[reel._id] || ""}
                            onChange={(e) => setCommentText({ ...commentText, [reel._id]: e.target.value })}
                        />
                        <button className="comment-btn" onClick={() => handleAddComment(reel._id)}>
                            💬 Post Comment
                        </button>
                    </div>

                    {/* View Comments Button */}
                    <button 
                        className="view-comments-btn"
                        onClick={() => toggleComments(reel._id)}
                    >
                        {visibleComments[reel._id] ? 'Hide Comments' : 'View Comments'} ({reel.comments?.length || 0})
                    </button>

                    {/* Display Comments */}
                    <div className={`comments-section ${visibleComments[reel._id] ? 'visible' : ''}`}>
                        {reel.comments?.length > 0 ? (
                            reel.comments.map((comment) => (
                                <p key={comment._id} className="comment">
                                    <strong>{comment.author?.username || "Anonymous"}:</strong> {comment.text}
                                </p>
                            ))
                        ) : (
                            <p className="no-comments">No comments yet. Be the first to comment!</p>
                        )}
                    </div>

                    {/* Edit & Delete Buttons */}
                    <div className="reel-buttons">
                        <Link to={`/reels/${reel._id}/edit`} className="edit-btn">
                            ✏️ Edit
                        </Link>
                        <button className="delete-btn" onClick={() => handleDelete(reel._id)}>
                            ❌ Delete
                        </button>
                    </div>

                    {/* View Full Reel */}
                    <Link to={`/reels/${reel._id}`} className="view-details-btn">
                        View Details
                    </Link>
                </article>
            ))}
        </main>
    );
};

export default ReelList;
