const handleDragLeave = (e, setInDropZone) => {
  e.preventDefault();
  e.stopPropagation();

  setInDropZone(false);
};

export default handleDragLeave;
