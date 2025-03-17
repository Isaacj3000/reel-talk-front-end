import { useEffect, useState } from "react";
import * as reelService from "../../services/reelService";
import { Link } from "react-router-dom";

const TrendingReels = () => {
    const [trendingReels, setTrendingReels] = useState([]);

    useEffect(() => {
        const fetchTrendingReels = async () => {
            const reelsData = await reelService.getTrendingReels();
            setTrendingReels(reelsData || []);
        };

        fetchTrendingReels();
    }, []);

    return (
        <main>
            <h1>🔥 Trending Reels</h1>
            {trendingReels.length > 0 ? (
                trendingReels.map((reel) => (
                    <article key={reel._id}>
                        <header>
                            <h2>{reel.title}</h2>
                            <p>
                                {`${reel.author?.username || "Unknown"} Posted on 
                                ${new Date(reel.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{reel.text}</p>

                        {/* ✅ Show Likes & Comments Count */}
                        <p>❤️ {reel.likes?.length || 0} Likes | 💬 {reel.comments?.length || 0} Comments</p>

                        {/* ✅ Link to Full Reel */}
                        <Link to={`/reels/${reel._id}`}>
                            <button>View Reel</button>
                        </Link>
                    </article>
                ))
            ) : (
                <p>No trending reels available.</p>
            )}
        </main>
    );
};

export default TrendingReels;
