import { useState, useEffect } from 'react';
import './App.css';

import * as trackService from './services/trackService';
import NowPlaying from './components/NowPlaying';
import TrackForm from './components/TrackForm';
import TrackList from './components/TrackList';

function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await trackService.index();

        if (fetchedTracks.error) {
          throw new Error(fetchedTracks.error);
        }

        setTracks(fetchedTracks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTracks();
  }, []);

  const handlePlayTrack = (track) => {
    setCurrentlyPlaying(track);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      if (newTrack.error) {
        throw new Error(newTrack.error);
      }
      setTracks([...tracks, newTrack]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTrack = async (formData) => {
    try {
      const updatedTrack = await trackService.update(
        formData,
        selectedTrack._id
      );
      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }
      setTracks(
        tracks.map((track) =>
          track._id === updatedTrack._id ? updatedTrack : track
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.remove(trackId);
      if (deletedTrack.error) {
        throw new Error(deletedTrack.error);
      }
      setTracks((prevTracks) =>
        prevTracks.filter((track) => track._id !== trackId)
      );

      if (currentlyPlaying && currentlyPlaying._id === trackId) {
        setCurrentlyPlaying(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = async (formData) => {
    if (editMode) {
      await handleUpdateTrack(formData);
    } else {
      await handleAddTrack(formData);
    }
    setIsFormOpen(false);
    setEditMode(false);
  };

  return (
    <div className="app">
      {isFormOpen ? (
        <TrackForm
          track={editMode ? selectedTrack : null}
          handleOnSubmit={handleOnSubmit}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <>
          <button
            onClick={() => {
              setIsFormOpen(true);
              setEditMode(false);
              setSelectedTrack(null);
            }}
          >
            Add New Track
          </button>
          <TrackList
            tracks={tracks}
            onPlay={handlePlayTrack}
            onEdit={(track) => {
              setIsFormOpen(true);
              setEditMode(true);
              setSelectedTrack(track);
            }}
            onDelete={handleDeleteTrack}
          />
          {currentlyPlaying && <NowPlaying track={currentlyPlaying} />}
        </>
      )}
    </div>
  );
}

export default App;
