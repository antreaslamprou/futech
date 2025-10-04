export function formatKey(key) {
    if (typeof key !== 'string') return ''; 
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
}

export function formatStringToDashCase(string) {
    if (typeof string !== 'string') return ''; 
    return string
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .toLowerCase();
}

export function formatDate(date) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return ''; 

    return parsedDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatTime(date) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return ''; 

    return parsedDate.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
}