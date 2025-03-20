import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as reelService from "../../services/reelService";

const EditReel = ({ setReels }) => {
    const { reelId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        text: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Reel Data
    useEffect(() => {
        const fetchReel = async () => {
            try {
                const reel = await reelService.show(reelId);
                setFormData({ title: reel.title, text: reel.text });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching reel:", err);
                setError("Failed to fetch reel.");
                setLoading(false);
            }
        };
        fetchReel();
    }, [reelId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedReel = await reelService.updateReel(reelId, formData);
            setReels(prevReels =>
                prevReels.map(reel => (reel._id === reelId ? updatedReel : reel))
            );
            navigate(`/reels/${reelId}`);
        } catch (err) {
            console.error("Error updating reel:", err);
            setError("Failed to update reel.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main>
            <h1>Edit Reel</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="text">Text:</label>
                <textarea
                    name="text"
                    id="text"
                    value={formData.text}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Update Reel</button>
                <button type="button" onClick={() => navigate(`/reels/${reelId}`)}>Cancel</button>
            </form>
        </main>
    );
};

export default EditReel;
