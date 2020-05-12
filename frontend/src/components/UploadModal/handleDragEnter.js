const handleDragEnter = (e) => {
  e.preventDefault();
  e.stopPropagation();

  e.dataTransfer.dropEffect = 'copy';
};

export default handleDragEnter;
