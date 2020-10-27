import React, { useEffect, useRef, useState } from 'react';
import './DragAndDrop.scss';

function DragAndDrop({ dropHandler, children }) {
  const dropRef = useRef();
  const [dragging, setDragging] = useState(false);
  let dragCounter = 0;

  useEffect(() => {
    const dropArea = dropRef.current;
    dropArea.addEventListener('dragenter', handleDragIn);
    dropArea.addEventListener('dragleave', handleDragOut);
    dropArea.addEventListener('dragover', handleDrag);
    dropArea.addEventListener('drop', handleDrop);

    return function removeDragListeners() {
      dropArea.removeEventListener('dragenter', handleDragIn);
      dropArea.removeEventListener('dragleave', handleDragOut);
      dropArea.removeEventListener('dragover', handleDrag);
      dropArea.removeEventListener('drop', handleDrop);
    }
  }, []);

  function handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }
  function handleDragOut(e) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;

    if (dragCounter === 0) setDragging(false);
  }
  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      dropHandler(e.dataTransfer.files)
    }

    e.dataTransfer.clearData()
    dragCounter = 0;
  }

  return (
    <div className="DragAndDrop" ref={dropRef}>
      {dragging && <div className="overlay"></div>}
      {children}
    </div>
  );
}

export default DragAndDrop;