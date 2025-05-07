const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reelTalk`;
console.log('BASE_URL:', BASE_URL);

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
};

// Helper function to get auth token
const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found. Please sign in.');
    }
    return token;
};

// Helper function to get user info from token
const getUserFromToken = (token) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token:', decoded);
        
        // Handle the nested payload structure
        const userData = decoded.payload || decoded;
        console.log('Extracted user data:', userData);
        
        // Ensure we have the required fields
        if (!userData._id) {
            console.error('Token missing user ID');
            throw new Error('Invalid token structure');
        }
        
        return userData;
    } catch (error) {
        console.error('Error parsing token:', error);
        throw new Error('Invalid authentication token');
    }
};

/* ==============================
    📌 GET REELS & TRENDING
================================ */
const index = async () => {
    try {
        const token = getAuthToken();
        const res = await fetch(`${BASE_URL}?populate=author`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(res);
    } catch (err) {
        console.error("🔥 Error Fetching All Reels:", err);
        return [];
    }
};

const show = async (reelId) => {
    try {
        const token = getAuthToken();
        const res = await fetch(`${BASE_URL}/${reelId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(res);
    } catch (error) {
        console.error("🔥 Error Fetching Reel:", error);
        return null;
    }
};

const fetchTrendingReels = async () => {
    try {
        const token = getAuthToken();
        const res = await fetch(`${BASE_URL}?populate=author`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await handleResponse(res);
        console.log("Fetched reels data:", data); // Debug log
        
        // Validate and sort reels
        const trendingReels = Array.isArray(data) ? data : [];
        const sortedReels = trendingReels
            .filter(reel => reel && typeof reel === 'object')
            .sort((a, b) => {
                // Calculate engagement score (likes + comments)
                const scoreA = (a.likes?.length || 0) + (a.comments?.length || 0);
                const scoreB = (b.likes?.length || 0) + (b.comments?.length || 0);
                
                // If scores are equal, sort by most recent
                if (scoreA === scoreB) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                
                // Sort by engagement score
                return scoreB - scoreA;
            });
        
        // Ensure each reel has a comments array
        const reelsWithComments = sortedReels.map(reel => ({
            ...reel,
            comments: reel.comments || []
        }));
        
        console.log("Processed reels with comments:", reelsWithComments); // Debug log
        return reelsWithComments.slice(0, 10);
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
        const token = getAuthToken();
        const user = getUserFromToken(token);
        
        console.log('Creating reel with user data:', {
            userId: user._id,
            username: user.username
        });

        // Validate reel data
        if (!reelFormData.title || !reelFormData.text) {
            throw new Error('Title and text are required');
        }

        const requestBody = {
            ...reelFormData,
            author: {
                _id: user._id,
                username: user.username
            }
        };

        console.log('Sending reel creation request with data:', requestBody);

        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        console.log('Reel creation response status:', res.status);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error('Error response:', errorText);
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const responseData = await res.json();
        console.log('Created reel response:', responseData);
        
        // Add author data to the response if it's not included
        const finalReel = {
            ...responseData,
            author: {
                _id: user._id,
                username: user.username
            }
        };
        
        console.log('Final reel data with author:', finalReel);
        return finalReel;
    } catch (err) {
        console.error('🔥 Create Reel Error:', err);
        throw err;
    }
};

const createComment = async (reelId, commentFormData) => {
    try {
        const token = getAuthToken();
        const user = getUserFromToken(token);

        console.log('Creating comment with user data:', {
            userId: user._id,
            username: user.username,
            token: token
        });

        // Validate comment data
        if (!commentFormData.text || !commentFormData.text.trim()) {
            throw new Error('Comment text is required');
        }

        const requestBody = {
            text: commentFormData.text.trim(),
            author: {
                _id: user._id,
                username: user.username
            }
        };

        console.log('Sending comment creation request with data:', requestBody);

        const res = await fetch(`${BASE_URL}/${reelId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        console.log('Comment creation response status:', res.status);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error('Error response:', errorText);
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const responseData = await res.json();
        console.log('Created comment response:', responseData);
        
        // Always ensure the author data is properly structured
        const finalComment = {
            ...responseData,
            author: {
                _id: user._id,
                username: user.username
            }
        };

        console.log('Final comment data with author:', finalComment);
        return finalComment;
    } catch (error) {
        console.error("🔥 Create Comment Error:", error);
        throw error;
    }
};

/* ==============================
    📌 UPDATE (Reels & Comments)
================================ */
const updateReel = async (reelId, reelData) => {
    try {
        const token = getAuthToken();
        
        // Validate reel data
        if (!reelData.title || !reelData.text) {
            throw new Error('Title and text are required');
        }

        const res = await fetch(`${BASE_URL}/${reelId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reelData),
        });
        return handleResponse(res);
    } catch (err) {
        console.error("Update Reel Error:", err);
        throw err;
    }
};

const updateComment = async (reelId, commentId, updatedText) => {
    try {
        const token = getAuthToken();
        
        // Validate comment text
        if (!updatedText) {
            throw new Error('Comment text is required');
        }

        const res = await fetch(`${BASE_URL}/${reelId}/comments/${commentId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: updatedText }),
        });
        return handleResponse(res);
    } catch (err) {
        console.error("Update Comment Error:", err);
        throw err;
    }
};

/* ==============================
    📌 LIKE / UNLIKE (Reels & Comments)
================================ */
const likeReel = async (reelId) => {
    try {
        const token = getAuthToken();
        const res = await fetch(`${BASE_URL}/${reelId}/like`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(res);
    } catch (error) {
        console.error("🔥 Like Reel Error:", error);
        throw error;
    }
};

const likeComment = async (reelId, commentId) => {
    try {
        const token = getAuthToken();
        const res = await fetch(`${BASE_URL}/${reelId}/comments/${commentId}/like`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(res);
    } catch (error) {
        console.error("🔥 Like Comment Error:", error);
        throw error;
    }
};

/* ==============================
    📌 DELETE (Reels & Comments)
================================ */
const deleteReel = async (reelId) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const user = getUserFromToken(token);
        if (!user || !user._id) {
            throw new Error('Invalid user data in token');
        }
        
        console.log('=== Frontend Delete Reel Request ===');
        console.log('Reel ID:', reelId);
        console.log('User from token:', {
            id: user._id,
            username: user.username
        });
        console.log('Token format:', {
            length: token.length,
            startsWith: token.substring(0, 10),
            hasBearer: token.startsWith('Bearer ')
        });

        // Ensure token is in the correct format
        const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}/${reelId}`, {
            method: 'DELETE',
            headers: {
                Authorization: authToken,
                'Content-Type': 'application/json'
            }
        });

        console.log('Delete response status:', res.status);

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Delete error response:', errorText);
            throw new Error(`Failed to delete reel: ${errorText}`);
        }

        return true;
    } catch (error) {
        console.error("🔥 Delete Reel Error:", error);
        throw error;
    }
};

const deleteComment = async (reelId, commentId) => {
    try {
        const token = getAuthToken();
        const res = await fetch(`${BASE_URL}/${reelId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(res);
    } catch (error) {
        console.error("🔥 Delete Comment Error:", error);
        throw error;
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
