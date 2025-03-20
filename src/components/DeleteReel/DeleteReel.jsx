import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as reelService from "../../services/reelService";

const DeleteReel = ({ setReels }) => {
    const { reelId } = useParams();
    const navigate = useNavigate();
    const [reel, setReel] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReel = async () => {
            try {
                const reelData = await reelService.show(reelId);
                if (!reelData) {
                    setError("Reel not found.");
                } else {
                    setReel(reelData);
                }
            } catch (err) {
                console.error("❌ Error fetching reel:", err);
                setError("Error loading reel.");
            }
        };

        fetchReel();
    }, [reelId]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this reel?");
        if (!confirmDelete) return;

        try {
            const deletedReel = await reelService.deleteReel(reelId);
            if (deletedReel) {
                setReels(prevReels => prevReels.filter(reel => reel._id !== reelId));
                alert("✅ Reel deleted successfully!");
                navigate("/reeltalk");
            } else {
                setError("❌ Failed to delete reel.");
            }
        } catch (err) {
            console.error("❌ Error deleting reel:", err);
            setError("Error deleting reel.");
        }
    };

    return (
        <main>
            <h1>Delete Reel</h1>
            {error && <p className="error-message">{error}</p>}

            {reel && (
                <section>
                    <h2>{reel.title}</h2>
                    <p>{reel.text}</p>
                    <button onClick={handleDelete} className="delete-btn">
                        ❌ Confirm Delete
                    </button>
                    <button onClick={() => navigate("/reeltalk")} className="cancel-btn">
                        Cancel
                    </button>
                </section>
            )}
        </main>
    );
};

export default DeleteReel;
