import { useState } from "react";
import { Link } from "react-router-dom";
import * as reelService from "../../services/reelService";
import "./ReelList.css";

const ReelList = ({ reels, setReels }) => {
    const [commentText, setCommentText] = useState({}); // Store comment input per reel

    if (!reels || reels.length === 0) {
        return <p className="no-reels">No reels available.</p>;
    }

    //  Handle Liking a Reel
    const handleLike = async (reelId) => {
        const updatedReel = await reelService.likeReel(reelId);
        if (updatedReel) {
            setReels(prevReels =>
                prevReels.map(reel => (reel._id === updatedReel._id ? updatedReel : reel))
            );
        }
    };

    //  Handle Adding a Comment
    const handleAddComment = async (reelId) => {
        if (!commentText[reelId]?.trim()) return;  // Prevent empty comments

        const newComment = await reelService.createComment(reelId, { text: commentText[reelId] });
        if (newComment) {
            setReels(prevReels =>
                prevReels.map(reel =>
                    reel._id === reelId
                        ? { ...reel, comments: [...(reel.comments || []), newComment] }
                        : reel
                )
            );
            setCommentText({ ...commentText, [reelId]: "" }); // Clear input after posting
        }
    };

    // Handle Deleting a Reel
    const handleDelete = async (reelId) => {
        if (!window.confirm("Are you sure you want to delete this reel?")) return;
    
        const success = await reelService.deleteReel(reelId);
        if (success) {
            setReels(prevReels => prevReels.filter(reel => reel._id !== reelId));
            alert("✅ Reel deleted successfully!");
        } else {
            alert("Failed to delete reel.");
        }
    };

    return (
        <main className="reel-list-container">
            {reels.map((reel) => (
                <article key={reel._id} className="reel-card">
                    {/* Reel Header */}
                    <header className="reel-header">
                        <h2>{reel.title}</h2>
                        <p className="reel-meta">
                            {`${reel.author?.username || "Unknown"} • 
                            ${new Date(reel.createdAt).toLocaleDateString()}`}
                        </p>
                    </header>

                    {/* Reel Text */}
                    <p className="reel-text">{reel.text}</p>

                    {/* Like & Comment Section */}
                    <div className="reel-actions">
                        <button className="like-btn" onClick={() => handleLike(reel._id)}>
                            ❤️ {reel.likes?.length || 0} Likes
                        </button>

                        {/*  Add a Comment */}
                        <input
                            type="text"
                            className="comment-input"
                            placeholder="Add a comment..."
                            value={commentText[reel._id] || ""} // Track comment per reel
                            onChange={(e) => setCommentText({ ...commentText, [reel._id]: e.target.value })}
                        />
                        <button className="comment-btn" onClick={() => handleAddComment(reel._id)}>
                            💬 Post Comment
                        </button>
                    </div>

                    {/* Display Comments */}
                    <div className="comments-section">
                        {reel.comments?.length > 0 ? (
                                 reel.comments.map((comment) => (
                            <p key={comment._id} className="comment">
                                  <strong>{comment.author ? comment.author.username : "Anonymous"}:</strong> {comment.text}
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

                    {/*View Full Reel */}
                    <Link to={`/reels/${reel._id}`} className="view-details-btn">
                        View Details
                    </Link>
                </article>
            ))}
        </main>
    );
};

export default ReelList;
