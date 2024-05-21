export const getGenerateStartData = async (limit = 10) => {
    const response = await fetch(`/api/data/create-data`);
    if (!response.ok) {
        throw new Error('Failed to create data');
    }
    const result = await response.json();
    return result;
}