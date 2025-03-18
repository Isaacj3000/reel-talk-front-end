import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as reelService from "../../services/reelService";
import CommentForm from "../CommentForm/CommentForm";

const ReelDetails = () => {
    const { reelId } = useParams();
    const [reel, setReel] = useState(null);

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

    // Fixed handleAddComment function
    const handleAddComment = async (commentFormData) => {
        console.log("Reel ID before sending comment:", reelId);
    
        if (!reelId) {
            console.error("Error: reelId is undefined! Cannot post comment.");
            return;
        }
    
        const newComment = await reelService.createComment(reelId, commentFormData);
    
        if (newComment) {
            setReel({ ...reel, comments: [...(reel.comments || []), newComment] }); // ✅ Ensure `comments` exists
        } else {
            console.error("Failed to create comment");
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
            </section>

            {/* ✅ Comments Section */}
            <section>
                <h2>Comments</h2>
                
                {/* ✅ Pass handleAddComment to CommentForm */}
                <CommentForm handleAddComment={handleAddComment} />

                {!reel.comments?.length && <p>There are no comments.</p>}

                {reel.comments?.length > 0 ? (
                    reel.comments.map((comment) => (
                        <article key={comment._id}>
                            <header>
                                <p>
                                    {`${comment.author?.username || "Anonymous"} posted on 
                                    ${new Date(comment.createdAt).toLocaleDateString()}`}
                                </p>
                            </header>
                            <p>{comment.text}</p>
                        </article>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>  // ✅ Shows this instead of crashing
                )}
            </section>
        </main>
    );
};

export default ReelDetails;
