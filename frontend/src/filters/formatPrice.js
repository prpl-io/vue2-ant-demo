export default value => {
    if (!value) {
        return 0;
    }

    return `₪${(value / 100).toFixed(2)}`;
};
