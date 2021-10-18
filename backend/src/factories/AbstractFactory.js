/**
 * @typedef {import('faker').default}
 *
 **/

class AbstractFactory {
    /**
     *
     * @param {Faker.FakerStatic} faker
     */
    constructor(db, faker) {
        this.db = db;
        this.faker = faker;
    }

    get model() {
        return null;
    }

    get defaultProps() {
        return {};
    }

    async execute(method = 'create', props = {}, count = 1) {
        if (typeof props === 'number') {
            count = props;
            props = {};
        }

        const promises = [];

        for (let i = 1; i <= count; i++) {
            const propItems = Array.isArray(props) ? props : [props];
            const promiseGroup = propItems.map(async propItem => {
                const resolvedProps = await this._resolveProps(propItem);

                return this.model[method]({
                    ...this.defaultProps,
                    ...resolvedProps
                });
            });

            promises.push(...promiseGroup);
        }

        return promises.length === 1 ? promises[0] : Promise.all(promises);
    }

    make(props = {}, count = 1) {
        return this.execute('build', props, count);
    }

    build(props = {}, count = 1) {
        return this.execute('build', props, count);
    }

    create(props = {}, count = 1) {
        return this.execute('create', props, count);
    }

    async _resolveProps(props) {
        const _props = {};

        for (const [key, value] of Object.entries(props)) {
            _props[key] = typeof value === 'function' ? await value() : value;
        }

        return _props;
    }
}

module.exports = AbstractFactory;
