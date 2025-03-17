import { useState } from "react";

const CommentForm = ({ handleAddComment }) => {
    const [formData, setFormData] = useState({ text: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddComment(formData); // ✅ Call function passed from `ReelDetails.jsx`
        setFormData({ text: "" });  // ✅ Reset input after submitting
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment">Add a Comment:</label>
            <textarea
                id="comment"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
            />
            <button type="submit">Post Comment</button>
        </form>
    );
};

export default CommentForm;
