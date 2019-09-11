const sortBy = (array, sortAsc) => {
    return array.sort((a, b) => {
        if (sortAsc === false) {
            return a.createdAt > b.createdAt
                ? 1
                : a.createdAt === b.createdAt
                ? 0
                : -1;
        } else {
            return a.createdAt < b.createdAt
                ? 1
                : a.createdAt === b.createdAt
                ? 0
                : -1;
        }
    });
};

export default sortBy;
