export default (tags) => {
  const invalidTags = tags.split(' ').map(tag => tag.trim())
  .filter(tag => (tag.charAt(0) === '#') === false);

  if (invalidTags.length && tags.trim() !== "") {
    return `These tags are invalid: ${invalidTags}`;
  }
};
