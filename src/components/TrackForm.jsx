import { useState, useEffect } from 'react';

function TrackForm({ track, handleOnSubmit, setIsFormOpen }) {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
  });

  useEffect(() => {
    if (track) {
      setFormData({
        title: track.title,
        artist: track.artist,
      });
    }
  }, [track]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOnSubmit(formData);
    setIsFormOpen(false);
    setFormData({ title: '', artist: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setIsFormOpen(false)}>
        Cancel
      </button>
    </form>
  );
}

export default TrackForm;
