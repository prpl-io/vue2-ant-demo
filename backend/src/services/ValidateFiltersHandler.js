const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

class ValidateFiltersHandler {
    handle(filters = {}, options = {}) {
        let { validLabels = [], datetimeLabels = [], timezone } = options;

        if (!timezone) {
            timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }

        const appliedFilters = {};

        datetimeLabels = [
            ...new Set([...this._datetimeLabels, ...datetimeLabels])
        ];

        for (const key in filters) {
            const { type, value } = filters[key];

            if (validLabels.includes(key) && this._operators.includes(type)) {
                if (datetimeLabels.includes(key)) {
                    if (['eq', 'not'].includes(type)) {
                        const startDate = dayjs(value)
                            .tz(timezone)
                            .startOf('day')
                            .utc()
                            .format();

                        const endDate = dayjs(value)
                            .tz(timezone)
                            .endOf('day')
                            .utc()
                            .format();

                        filters[key] = {
                            type: type === 'eq' ? 'between' : 'notBetween',
                            value: [startDate, endDate]
                        };
                    } else if (
                        ['between', 'notBetween'].includes(type) &&
                        Array.isArray(value)
                    ) {
                        const [startDate, endDate] = value;

                        value[0] = startDate
                            ? dayjs(startDate)
                                  .tz(timezone)
                                  .startOf('day')
                                  .utc()
                                  .format()
                            : null;
                        value[1] = endDate
                            ? dayjs(endDate)
                                  .tz(timezone)
                                  .endOf('day')
                                  .utc()
                                  .format()
                            : null;
                    }
                }

                const appliedKey = key.includes('.') ? `$${key}$` : key;

                appliedFilters[appliedKey] = filters[key];
            }
        }

        return appliedFilters;
    }

    get _datetimeLabels() {
        return ['createdAt', 'updatedAt', 'deletedAt'];
    }

    get _operators() {
        return [
            'substring',
            'endsWith',
            'startsWith',
            'eq',
            'not',
            'gt',
            'gte',
            'lt',
            'lte',
            'between',
            'notBetween',
            'in'
        ];
    }
}

module.exports = ValidateFiltersHandler;
