export function toCamelCase(inputString: string): string {
    return inputString
        .replace(/^\w|[A-Z]|\b\w|\s+/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, ''); // Removes spaces
}

export function toKebabCase(inputString: string): string {
    return inputString
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}

export function pluralizeWord(word: string): string {
    if (word.endsWith('y')) {
        return word.slice(0, -1) + 'ies'; // e.g., city -> cities
    } else if (word.endsWith('s') || word.endsWith('x') || word.endsWith('z') ||
        word.endsWith('sh') || word.endsWith('ch')) {
        return word + 'es'; // e.g., bus -> buses, box -> boxes
    } else {
        return word + 's'; // e.g., gem -> gems
    }
}

export function singularizeWord(word: string): string {
    if (word.endsWith('ies')) {
        return word.slice(0, -3) + 'y'; // e.g., cities -> city
    } else if (word.endsWith('es')) {
        if (word.endsWith('ches') || word.endsWith('shes')) {
            return word.slice(0, -2); // e.g., boxes -> box, brushes -> brush
        }
        return word.slice(0, -2); // e.g., buses -> bus
    } else if (word.endsWith('s')) {
        return word.slice(0, -1); // e.g., gems -> gem
    } else {
        return word; // No change needed if none of the above rules match
    }
}

export function convertStringToPascalCase(inputString: string): string {
    return (inputString.match(/[a-zA-Z0-9]+/g) || [])
        .map((word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join('');
}

export function convertCaseToSpaces(inputString: string): string {
    return inputString.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function trimSlashes(value: string) {
    return value.replace(/^\/+|\/+$/g, '');
}