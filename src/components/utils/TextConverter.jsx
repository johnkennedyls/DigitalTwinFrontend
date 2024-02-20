export function toCamelCase(input) {
    return input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function toTitleCase(input) {
    return input
        .replace(/([A-Z])/g, ' $1')
        .replace(/^\s/, '')
        .replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        }
    );
}