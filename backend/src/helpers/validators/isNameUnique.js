module.exports = async (value, repository, id) => {
    const item = await repository.findByName(value);

    if (item && id !== item.id) {
        return Promise.reject('Name already exists!');
    }
};
