export const serializeFilters = (params) => {
    const query = new URLSearchParams();
    if (params.search)
        query.append('search', params.search);
    if (params.location)
        query.append('location', params.location);
    if (params.minFee !== undefined)
        query.append('minFee', params.minFee.toString());
    if (params.maxFee !== undefined)
        query.append('maxFee', params.maxFee.toString());
    if (params.rating !== undefined)
        query.append('rating', params.rating.toString());
    if (params.page !== undefined)
        query.append('page', params.page.toString());
    return query.toString();
};
export const deserializeFilters = (queryString) => {
    const params = new URLSearchParams(queryString);
    return {
        search: params.get('search') || undefined,
        location: params.get('location') || undefined,
        minFee: params.get('minFee') ? parseFloat(params.get('minFee')) : undefined,
        maxFee: params.get('maxFee') ? parseFloat(params.get('maxFee')) : undefined,
        rating: params.get('rating') ? parseFloat(params.get('rating')) : undefined,
        page: params.get('page') ? parseInt(params.get('page')) : undefined,
    };
};
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
};
export const formatPackage = (lpa) => {
    return `INR ${lpa.toFixed(2)} LPA`;
};
export const debounce = (func, wait) => {
    let timeout = null;
    return (...args) => {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
export const getStarArray = (rating) => {
    const stars = [false, false, false, false, false];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars && i < 5; i++) {
        stars[i] = true;
    }
    return stars;
};
