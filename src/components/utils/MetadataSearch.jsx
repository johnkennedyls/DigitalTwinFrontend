export function getUniqueMetadataNames(tags) {
    const uniqueMetadataNames = new Set()
    tags.forEach((tag) => {
        const metadata = tag.metadata

        if (metadata !== null) {
            Object.keys(metadata).forEach((name) => {
                uniqueMetadataNames.add(name)
            })
        }
    })
    return uniqueMetadataNames
}

export function compareMetadata(metadata, property) {
    if (metadata.hasOwnProperty(property)) {
        return metadata[property]
    } else return ''
}