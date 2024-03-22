export function getUniqueMetadataNames (tags, tagProperties, newProperties = []) {
  tags.forEach((tag) => {
    if (tag && tag !== null) {
      const metadata = tag.metadata;
      if (metadata && metadata !== null) {
        Object.keys(metadata).forEach((name) => {
          if (!tagProperties.includes(name) && !newProperties.includes(name)) {
            newProperties.push(name);
          }
        });
      }
    }
  });
  return newProperties;
}

export function compareMetadata (metadata, property) {
  if (metadata.hasOwnProperty(property)) {
    return metadata[property];
  } else return '';
}
