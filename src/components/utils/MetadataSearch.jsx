export function getUniqueMetadataNames(tags, tagProperties) {
    const uniqueMetadataNames = new Set()
    tags.forEach((tag) => {
        if (tag && tag !== null) {
            const metadata = tag.metadata
            if (metadata && metadata !== null) {
                Object.keys(metadata).forEach((name) => {
                    if (!tagProperties.includes(name)) {
                        uniqueMetadataNames.add(name)
                    }
                })
            }
        }

    })
    return uniqueMetadataNames
}

export function compareMetadata (metadata, property) {
  if (metadata.hasOwnProperty(property)) {
    return metadata[property];
  } else return '';
}
