module.exports = async (value, repository, id) => {
    const isSlugAvailable = await repository.isSlugAvailable(value, id || null);

    if (!isSlugAvailable) {
        return Promise.reject('Slug already exists!');
    }
};
