// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3570/reelTalk";

// /* ==============================
//     📌 GET REELS & TRENDING
// ================================ */
// const show = async (reelId) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${reelId}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
//         return res.json();
//     } catch (error) {
//         console.error("🔥 Error Fetching Reel:", error);
//         return null;
//     }
// };

// const fetchTrendingReels = async () => {
//     try {
//         const res = await fetch(`${BASE_URL}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
//         return res.json();
//     } catch (error) {
//         console.error("🔥 Trending Reels Fetch Error:", error);
//         return [];
//     }
// };

// const index = async () => {
//     try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             console.error("🚨 No token found. User must sign in.");
//             return [];
//         }

//         const res = await fetch(`${BASE_URL}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

//         return res.json();
//     } catch (err) {
//         console.error("🔥 Error Fetching All Reels:", err);
//         return [];
//     }
// };

// /* ==============================
//     📌 CREATE NEW REEL & COMMENTS
// ================================ */
// const create = async (reelFormData) => {
//     try {
//         const res = await fetch(BASE_URL, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(reelFormData),
//         });
//         if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
//         return res.json();
//     } catch (err) {
//         console.error('🔥 Create Reel Error:', err);
//         return null;
//     }
// };

// const createComment = async (reelId, commentFormData) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${reelId}/comments`, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(commentFormData),
//         });
//         if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
//         return res.json();
//     } catch (error) {
//         console.error("🔥 Create Comment Error:", error);
//         return null;
//     }
// };

// /* ==============================
//     📌 LIKE / UNLIKE (Reels & Comments)
// ================================ */
// const likeReel = async (reelId) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${reelId}/like`, {
//             method: "POST",
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
//         return res.json();
//     } catch (error) {
//         console.error("🔥 Like Reel Error:", error);
//         return null;
//     }
// };

// const likeComment = async (reelId, commentId) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${reelId}/comments/${commentId}/like`, {
//             method: "POST",
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
//         return res.json();
//     } catch (error) {
//         console.error("🔥 Like Comment Error:", error);
//         return null;
//     }
// };

// /* ==============================
//     📌 UPDATE (Reels & Comments)
// ================================ */
// const updateReel = async (reelId, reelData) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${reelId}`, {
//             method: "PUT",
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(reelData),
//         });

//         if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        
//         return res.json();
//     } catch (err) {
//         console.error("Update Reel Error:", err);
//         return null;
//     }
// };

// const updateComment = async (reelId, commentId, updatedText) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${reelId}/comments/${commentId}`, {
//             method: "PUT",
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ text: updatedText }),
//         });

//         if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

//         return res.json();
//     } catch (err) {
//         console.error("Update Comment Error:", err);
//         return null;
//     }
// };

// /* ==============================
//     📌 DELETE (Reels & Comments)
// ================================ */
// const deleteReel = async (reelId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/${reelId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       return res.json();
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
// const deleteComment = async (reelId, commentId) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${reelId}/comments/${commentId}`, {
//             method: 'DELETE',
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });

//         if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
//         return true;
//     } catch (err) {
//         console.error("❌ Delete Comment Error:", err);
//         return false;
//     }
// };

// /* ==============================
//     📌 EXPORT ALL FUNCTIONS
// ================================ */
// export {
//     index,
//     show,
//     create,            
//     fetchTrendingReels,         
//     updateReel, 
//     deleteReel,        
//     likeReel,       
//     createComment,   
//     likeComment,     
//     updateComment,   
//     deleteComment,    
// };



const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3570/reelTalk";

/* ==============================
    📌 GET REELS & TRENDING
================================ */
const index = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("🚨 No token found. User must sign in.");
            return [];
        }

        const res = await fetch(`${BASE_URL}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
    } catch (err) {
        console.error("🔥 Error Fetching All Reels:", err);
        return [];
    }
};

const show = async (reelId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reelId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.error("🔥 Error Fetching Reel:", error);
        return null;
    }
};

const fetchTrendingReels = async () => {
    try {
        const res = await fetch(`${BASE_URL}/trending`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.error("🔥 Trending Reels Fetch Error:", error);
        return [];
    }
};

/* ==============================
    📌 CREATE NEW REEL & COMMENTS
================================ */
const create = async (reelFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reelFormData),
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
    } catch (err) {
        console.error('🔥 Create Reel Error:', err);
        return null;
    }
};

const createComment = async (reelId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${reelId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.error("🔥 Create Comment Error:", error);
        return null;
    }
};

/* ==============================
    📌 UPDATE (Reels & Comments)
================================ */
const updateReel = async (reelId, reelData) => {
    try {
        const res = await fetch(`${BASE_URL}/${reelId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reelData),
        });

        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
    } catch (err) {
        console.error("Update Reel Error:", err);
        return null;
    }
};

const updateComment = async (reelId, commentId, updatedText) => {
    try {
        const res = await fetch(`${BASE_URL}/${reelId}/comments/${commentId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: updatedText }),
        });

        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
    } catch (err) {
        console.error("Update Comment Error:", err);
        return null;
    }
};

/* ==============================
    📌 LIKE / UNLIKE (Reels & Comments)
================================ */
const likeReel = async (reelId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reelId}/like`, {
            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.error("🔥 Like Reel Error:", error);
        return null;
    }
};

const likeComment = async (reelId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reelId}/comments/${commentId}/like`, {
            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.error("🔥 Like Comment Error:", error);
        return null;
    }
};

/* ==============================
    📌 DELETE (Reels & Comments)
================================ */
const deleteReel = async (reelId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reelId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteComment = async (reelId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reelId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return true;
    } catch (err) {
        console.error(" Delete Comment Error:", err);
        return false;
    }
};

/* ==============================
    📌 EXPORT ALL FUNCTIONS
================================ */
export {
    index,
    show,
    fetchTrendingReels,
    create,
    createComment,
    updateReel,
    updateComment,
    likeReel,
    likeComment,
    deleteReel,
    deleteComment,
};
