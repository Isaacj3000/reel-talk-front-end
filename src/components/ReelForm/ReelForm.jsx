import { useState } from 'react';

const ReelForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: 'Life Hack 👀💬',
        text: '',
        comment: '',  // Added comment field
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(formData);  //  Send data to parent (e.g., API)
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title-input'>Title:</label>
            <input
                required
                type='text'
                name='title'
                id='title-input'
                value={formData.title}
                onChange={handleChange}
            />

            <label htmlFor='text-input'>Text:</label>
            <textarea
                required
                name='text'
                id='text-input'
                value={formData.text}
                onChange={handleChange}
            />

            {/* Added Initial Comment Field */}
            <label htmlFor='comment-input'>Add a Comment:</label>
            <textarea
                name='comment'
                id='comment-input'
                value={formData.comment}
                onChange={handleChange}
            />

            <button type='submit'>Submit</button>
        </form>
    );
};

export default ReelForm;
