import { useEffect, useState } from "react";
import * as reelService from "../../services/reelService"; // ✅ Ensure import
import "./TrendingReels.css";

const TrendingReels = () => {
    const [trendingReels, setTrendingReels] = useState([]);

    useEffect(() => {
        const loadTrendingReels = async () => {
            const reels = await reelService.fetchTrendingReels(); // ✅ Fixed function call
            setTrendingReels(reels || []);
        };
        loadTrendingReels();
    }, []);

    return (
        <div>
            <h2>🔥 Trending Reels</h2>
            {trendingReels.length === 0 ? (
                <p>No trending reels yet.</p>
            ) : (
                trendingReels.map((reel) => (
                    <div key={reel._id} className="trending-reel">
                        <h3>{reel.title}</h3>
                        <p>{reel.text}</p>
                        <p>❤️ {reel.likes?.length || 0} Likes | 💬 {reel.comments?.length || 0} Comments</p>
                        <p>Posted by {reel.author?.username || "Unknown"}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default TrendingReels;
