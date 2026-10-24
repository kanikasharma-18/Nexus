import { useState } from 'react';

function Files() {
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  const [error, setError] = useState('');

  async function handleSelectFile() {
    if (isSelecting) {
      return;
    }

    setIsSelecting(true);
    setError('');

    try {
      const result = await window.nexus.selectFile();

      if (!result.success) {
        setError(result.error);
      } else if (!result.canceled) {
        setSelectedFileName(result.fileName);
      }
    } catch (selectionError) {
      setError(selectionError.message);
    } finally {
      setIsSelecting(false);
    }
  }

  return (
    <section className="files" aria-labelledby="files-heading">
      <div className="files-header">
        <p className="welcome-label">Files</p>
        <h1 id="files-heading">Files</h1>
        <p>Select a file from your computer to view its name.</p>
      </div>

      <div className="file-selector">
        <button
          type="button"
          onClick={handleSelectFile}
          disabled={isSelecting}
        >
          {isSelecting ? 'Selecting...' : 'Select File'}
        </button>

        {error ? (
          <p className="file-error" role="alert">
            {error}
          </p>
        ) : selectedFileName ? (
          <p className="selected-file">
            Selected file: <strong>{selectedFileName}</strong>
          </p>
        ) : (
          <p className="files-empty">No file selected.</p>
        )}
      </div>
    </section>
  );
}

export default Files;
