
export const getCache = (key: string) => {
    const cachedData = localStorage.getItem(key);
    try {
        return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
        console.error(`Error parsing cache for key ${key}:`, error);
        return null;
    }
};

export const setCache = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error setting cache for key ${key}:`, error);
    }
};

export const clearCache = () => {
    localStorage.clear()
};

export const removeCachedItem = (key: string) => {
    localStorage.removeItem(key);
};
export const setOrGetCache = async (key: string, apiCall: () => Promise<any>) => {
    try {
        let result;
        const cachedData = getCache(key);

        if (!cachedData) {
            result = await apiCall();
            setCache(key, result);
        } else {
            result = cachedData;
        }
        return result;
    } catch (error) {
        throw error;
    }
};

export const removeCachedItemsByPrefix = (prefix: string) => {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(prefix)) {
            localStorage.removeItem(key);
        }
    });
};
