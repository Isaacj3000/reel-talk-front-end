import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as reelService from "../../services/reelService";
import CommentForm from "../CommentForm/CommentForm";

const ReelDetails = ({ handleDeleteReel }) => {
    const { reelId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [reel, setReel] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState("");

    useEffect(() => {
        const fetchReel = async () => {
            try {
                const reelData = await reelService.show(reelId);
                setReel(reelData);
            } catch (error) {
                console.error("Error fetching reel:", error);
            }
        };
        fetchReel();
    }, [reelId]);

    if (!reel) return <main>Loading...</main>;

    // Handle Adding Comments
    const handleAddComment = async (commentFormData) => {
        console.log("Reel ID before sending comment:", reelId);
        if (!reelId) {
            console.error("Error: reelId is undefined! Cannot post comment.");
            return;
        }

        const newComment = await reelService.createComment(reelId, commentFormData);
        if (newComment) {
            setReel({ ...reel, comments: [...(reel.comments || []), newComment] });
        } else {
            console.error("Failed to create comment");
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
        <main>
            <section>
                <header>
                    <p>{reel?.category?.toUpperCase() || "No Category"}</p>
                    <h1>{reel?.title || "Untitled Reel"}</h1>
                    <p>
                        {reel?.author?.username
                            ? `${reel.author.username} posted on ${new Date(reel.createdAt).toLocaleDateString()}`
                            : "Unknown Author"}
                    </p>
                </header>
                <p>{reel?.text || "No content available"}</p>

                {/* Delete Reel Button */}
                {user?._id === reel?.author?._id && (
                    <button onClick={handleDelete} style={{ background: "red", color: "white", padding: "8px", borderRadius: "5px" }}>
                     Delete Reel
                    </button>
                )}
            </section>

            {/* Comments Section */}
            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {reel.comments?.length > 0 ? (
                    reel.comments.map((comment) => (
                        <article key={comment._id}>
                            <header>
                                <p>
                                    {`${comment.author?.username || "Anonymous"} posted on 
                                    ${new Date(comment.createdAt).toLocaleDateString()}`}
                                </p>
                            </header>
                            {/* Allow Editing a Comment */}
                            {editingCommentId === comment._id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedCommentText}
                                        onChange={(e) => setEditedCommentText(e.target.value)}
                                    />
                                    <button onClick={() => handleUpdateComment(comment._id)}>✅ Save</button>
                                    <button onClick={() => setEditingCommentId(null)}>❌ Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <p>{comment.text}</p>
                                    {user?._id === comment.author?._id && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setEditingCommentId(comment._id);
                                                    setEditedCommentText(comment.text);
                                                }}
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button onClick={() => handleDeleteComment(comment._id)}>❌ Delete</button>
                                        </>
                                    )}
                                </>
                            )}
                        </article>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </section>
        </main>
    );
};

export default ReelDetails;
