import dayjs from 'dayjs';

export default value => {
    if (value) {
        return dayjs(value).format('DD/MM/YYYY HH:mm:ss');
    }

    return '-';
};
