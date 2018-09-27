export function delay(delayMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, delayMs);
    });
}

export async function mapSequentially(array, mapper) {
    const result = [];
    for (const element of array) {
        result.push(await mapper(element));
    }
    return result;
}
