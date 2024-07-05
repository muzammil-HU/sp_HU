const formatDate = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with leading zero if needed
  const year = date.getFullYear(); // Get year

  return `${day}-${month}-${year}`;
};
export default formatDate;
