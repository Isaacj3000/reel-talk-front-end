import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as reelService from "../../services/reelService";
import CommentForm from "../CommentForm/CommentForm";
import './ReelDetails.css';

const ReelDetails = ({ handleDeleteReel }) => {
    const { reelId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [reel, setReel] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReel = async () => {
            try {
                const data = await reelService.show(reelId);
                console.log('Fetched reel data:', data); // Debug log
                setReel(data);
            } catch (err) {
                setError('Failed to load reel');
                console.error('Error fetching reel:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReel();
    }, [reelId]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!reel) return <div className="error">Reel not found</div>;

    // Handle Adding Comments
    const handleAddComment = async (commentFormData) => {
        try {
            const newComment = await reelService.createComment(reelId, commentFormData);
            setReel(prevReel => ({
                ...prevReel,
                comments: [...(prevReel.comments || []), newComment]
            }));
        } catch (err) {
            console.error('Error creating comment:', err);
            setError('Failed to add comment');
        }
    };

    //Handle Updating a Comment
    const handleUpdateComment = async (commentId) => {
        if (!editedCommentText.trim()) return;
        try {
            const response = await reelService.updateComment(reelId, commentId, editedCommentText);
            if (response) {
                setReel((prevReel) => ({
                    ...prevReel,
                    comments: prevReel.comments.map((comment) =>
                        comment._id === commentId ? { ...comment, text: editedCommentText } : comment
                    ),
                }));
                setEditingCommentId(null);
                setEditedCommentText("");
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    // Handle Deleting a Comment
    const handleDeleteComment = async (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;
        try {
            const response = await reelService.deleteComment(reelId, commentId);
            if (response) {
                setReel((prevReel) => ({
                    ...prevReel,
                    comments: prevReel.comments.filter((comment) => comment._id !== commentId),
                }));
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    // Handle Deleting the Reel
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this reel?")) return;
        try {
            await handleDeleteReel(reelId);
            navigate("/reeltalk"); // Redirect after deleting
        } catch (error) {
            console.error("Error deleting reel:", error);
        }
    };

    return (
        <div className="reel-details">
            <h1 className="reel-title">{reel.title}</h1>
            <div className="reel-content">
                <p>{reel.text}</p>
            </div>
            <div className="reel-meta">
                <span className="author">
                    By {reel.author?.username || user?.username || 'Unknown'}
                </span>
                <span className="date">
                    {new Date(reel.createdAt).toLocaleDateString()}
                </span>
            </div>
            <div className="comments-section">
                <h2>Comments</h2>
                <CommentForm onSubmit={handleAddComment} />
                <div className="comments-list">
                    {reel.comments?.map(comment => (
                        <div key={comment._id} className="comment">
                            <p className="comment-text">{comment.text}</p>
                            <div className="comment-meta">
                                <span className="comment-author">
                                    {comment.author?.username || 'Unknown'}
                                </span>
                                <span className="comment-date">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Delete Reel Button */}
            {user?._id === reel?.author?._id && (
                <button onClick={handleDelete} style={{ background: "red", color: "white", padding: "8px", borderRadius: "5px" }}>
                 Delete Reel
                </button>
            )}
        </div>
    );
};

export default ReelDetails;
