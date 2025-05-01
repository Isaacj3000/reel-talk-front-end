import { useState } from "react";
import "./CommentForm.css";

const CommentForm = ({ handleAddComment }) => {
    const [formData, setFormData] = useState({ text: "" });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear any previous errors when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            if (!formData.text.trim()) {
                setError("Comment cannot be empty");
                return;
            }
            await handleAddComment(formData);
            setFormData({ text: "" });
        } catch (err) {
            setError(err.message || "Failed to post comment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <div className="form-group">
                <label htmlFor="comment">Add a Comment</label>
                <textarea
                    id="comment"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="Share your thoughts..."
                    required
                    disabled={isSubmitting}
                />
                {error && <p className="error-message">{error}</p>}
            </div>
            <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || !formData.text.trim()}
            >
                {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
        </form>
    );
};

export default CommentForm;
