import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as reelService from "../../services/reelService";
import "./EditReel.css";

const EditReel = ({ setReels, handleDeleteReel }) => {
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

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this reel? This action cannot be undone.")) return;
        try {
            await handleDeleteReel(reelId);
            navigate('/reeltalk');
        } catch (err) {
            console.error("Error deleting reel:", err);
            setError("Failed to delete reel.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <main className="edit-reel-container">
            <h1>Edit Reel</h1>
            <form onSubmit={handleSubmit} className="edit-reel-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="text">Text:</label>
                    <textarea
                        name="text"
                        id="text"
                        value={formData.text}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="save-btn">Update Reel</button>
                    <button type="button" onClick={() => navigate(`/reels/${reelId}`)} className="cancel-btn">Cancel</button>
                    <button type="button" onClick={handleDelete} className="delete-btn">Delete Reel</button>
                </div>
            </form>
        </main>
    );
};

export default EditReel;
