const handleDragOver = (e, setInDropZone) => {
  e.preventDefault();
  e.stopPropagation();

  setInDropZone(true);
};

export default handleDragOver;
