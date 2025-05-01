import { useState } from 'react';
import './ReelForm.css';

const ReelForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: 'Life Hack 👀💬',
        text: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!formData.text.trim()) {
            setError('Please enter some content for your reel');
            return;
        }

        setLoading(true);
        try {
            await onSubmit(formData);
        } catch (err) {
            setError('Failed to create reel. Please try again.');
            console.error('Error creating reel:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reel-form-container">
            <form className="reel-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title-input">Title</label>
                    <input
                        required
                        type="text"
                        name="title"
                        id="title-input"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="text-input">Content</label>
                    <textarea
                        required
                        name="text"
                        id="text-input"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Share your life hack or interesting story..."
                        disabled={loading}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Reel'}
                </button>
            </form>
        </div>
    );
};

export default ReelForm;
