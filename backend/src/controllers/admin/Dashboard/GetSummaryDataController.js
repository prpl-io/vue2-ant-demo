const { Op } = require('sequelize');
const dayjs = require('dayjs');

class GetSummaryDataController {
    constructor(containerRepository, cache) {
        this.containerRepository = containerRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        let { startDate, endDate } = request.query;
        const { userId = null } = request.query;

        startDate = dayjs(startDate)
            .startOf('day')
            .format('YYYY-MM-DD HH:mm:ss');
        endDate = dayjs(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');

        const options = {
            distinct: true,
            include: {
                association: 'users',
                attributes: [],
                through: { attributes: [] },
                where: userId ? { id: userId } : {}
            }
        };
        const whereDates = {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        };

        const { ON_THE_WAY, ARRIVED, DONE } = this.containerRepository.model;

        const amountTracked = await this.containerRepository.count({
            ...options,
            where: whereDates
        });

        const currentlyTracked = await this.containerRepository.count({
            ...options,
            where: {
                ...whereDates,
                status: {
                    [Op.or]: [ON_THE_WAY, ARRIVED]
                }
            }
        });

        const done = await this.containerRepository.count({
            ...options,
            where: {
                ...whereDates,
                status: DONE
            }
        });

        return response.send({
            amountTracked,
            currentlyTracked,
            done
        });
    }
}

module.exports = GetSummaryDataController;
