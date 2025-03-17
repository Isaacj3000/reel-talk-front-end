// import { useState } from "react";
// import { Link } from "react-router-dom";
// import * as reelService from "../../services/reelService";

// const ReelList = ({ reels, setReels }) => {
//     if (!reels || reels.length === 0) {
//         return <p>No reels available.</p>;
//     }

//     // ✅ Handle Like Function
//     const handleLike = async (reelId) => {
//         const updatedReel = await reelService.likeReel(reelId);

//         if (updatedReel) {
//             setReels(prevReels =>
//                 prevReels.map(reel => reel._id === updatedReel._id ? updatedReel : reel)
//             );
//         }
//     };

//     // ✅ Handle Add Comment Function
//     const handleAddComment = async (reelId, commentText) => {
//         if (!commentText.trim()) return;  // Prevent empty comments

//         const newComment = await reelService.createComment(reelId, { text: commentText });

//         if (newComment) {
//             setReels(prevReels =>
//                 prevReels.map(reel =>
//                     reel._id === reelId
//                         ? { ...reel, comments: [...(reel.comments || []), newComment] }  // ✅ FIXED SYNTAX ERROR
//                         : reel
//                 )
//             );
//         }
//     };

//     return (
//         <main>
//             {reels.map((reel) => (
//                 <article key={reel._id}>
//                     <header>
//                         <h2>{reel.title}</h2>
//                         <p>
//                             {`${reel.author?.username || "Unknown"} Posted on 
//                             ${new Date(reel.createdAt).toLocaleDateString()}`}
//                         </p>
//                     </header>
//                     <p>{reel.text}</p>

//                     {/* ✅ Like Button */}
//                     <button onClick={() => handleLike(reel._id)}>
//                         ❤️ {reel.likes?.length || 0} Likes
//                     </button>

//                     {/* ✅ Comment Input */}
//                     <input
//                         type="text"
//                         placeholder="Add a comment..."
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 handleAddComment(reel._id, e.target.value);
//                                 e.target.value = ""; // ✅ Clear input after comment
//                             }
//                         }}
//                     />

//                     {/* ✅ Display Comments */}
//                     {reel.comments?.length > 0 ? (
//                         reel.comments.map((comment) => (
//                             <p key={comment._id}>
//                                 <strong>{comment.author?.username || "Anonymous"}:</strong> {comment.text}
//                             </p>
//                         ))
//                     ) : (
//                         <p>No comments yet. Be the first to comment!</p>
//                     )}

//                     {/* ✅ Link to Full Reel Details */}
//                     <Link to={`/reels/${reel._id}`}>
//                         <button>View Details</button>
//                     </Link>
//                 </article>
//             ))}
//         </main>
//     );
// };

// export default ReelList;

import { useState } from "react";
import { Link } from "react-router-dom";
import * as reelService from "../../services/reelService";

const ReelList = ({ reels, setReels }) => {
    if (!reels || reels.length === 0) {
        return <p>No reels available.</p>;
    }

    // ✅ Handle Liking a Reel
    const handleLike = async (reelId) => {
        const updatedReel = await reelService.likeReel(reelId);

        if (updatedReel) {
            setReels(prevReels =>
                prevReels.map(reel => reel._id === updatedReel._id ? updatedReel : reel)
            );
        }
    };

    // ✅ Handle Adding a Comment
    const handleAddComment = async (reelId, commentText) => {
        if (!commentText.trim()) return;  // Prevent empty comments

        const newComment = await reelService.createComment(reelId, { text: commentText });

        if (newComment) {
            setReels(prevReels =>
                prevReels.map(reel =>
                    reel._id === reelId
                        ? { ...reel, comments: [...(reel.comments || []), newComment] }
                        : reel
                )
            );
        }
    };

    return (
        <main>
            {reels.map((reel) => (
                <article key={reel._id}>
                    <header>
                        <h2>{reel.title}</h2>
                        <p>
                            {`${reel.author?.username || "Unknown"} Posted on 
                            ${new Date(reel.createdAt).toLocaleDateString()}`}
                        </p>
                    </header>
                    <p>{reel.text}</p>

                    {/* ✅ Like Button */}
                    <button onClick={() => handleLike(reel._id)}>
                        ❤️ {reel.likes?.length || 0} Likes
                    </button>

                    {/* ✅ Comment Input */}
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddComment(reel._id, e.target.value);
                                e.target.value = ""; // ✅ Clear input after comment
                            }
                        }}
                    />

                    {/* ✅ Display Comments */}
                    {reel.comments?.length > 0 ? (
                        reel.comments.map((comment) => (
                            <p key={comment._id}>
                                <strong>{comment.author?.username || "Anonymous"}:</strong> {comment.text}
                            </p>
                        ))
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}

                    {/* ✅ Link to Full Reel Details */}
                    <Link to={`/reels/${reel._id}`}>
                        <button>View Details</button>
                    </Link>
                </article>
            ))}
        </main>
    );
};

export default ReelList;
