function TrackList({ tracks, onDelete, onEdit, onPlay }) {
  return (
    <div className="track-list">
      <h2>Track List</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track._id}>
            <p>
              {track.title} by <span>{track.artist}</span>
            </p>
            <div>
              <button onClick={() => onPlay(track)}>Play</button>
              <button onClick={() => onEdit(track)}>Edit</button>
              <button onClick={() => onDelete(track._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;
