class GetValidationErrorMessageHandler {
    handle(validation, serverErrors, key, index) {
        const item = this._getItem(validation, key, index);
        const serverError = this._getServerError(serverErrors, key, index);

        if (serverError) {
            return serverError;
        }

        if (!item || !item.$error) {
            return '';
        }

        const { $params } = item;

        for (const key in $params) {
            if (!item[key]) {
                return this.errors[key] || 'Something is wrong... 🤔';
            }
        }

        return 'Something is wrong... 🤔';
    }

    _getItem(validation, key, index) {
        if (isNaN(index)) {
            return validation[key];
        }

        return validation.$each[index][key];
    }

    _getServerError(serverErrors, key, index) {
        if (!isNaN(index)) {
            // @TODO
            return '';
        }

        if (serverErrors.length) {
            const errorItem = serverErrors.find(error => error.param === key);

            if (errorItem) {
                return errorItem.message;
            }
        }

        return '';
    }

    get errors() {
        return {
            required: 'Should not be empty!',
            minLength: 'It is too short!',
            maxLength: 'It is too long!',
            numeric: 'It has to be a number!',
            email: 'Email address is not valid!',
            url: 'Url is not valid!',
            // custom:
            isFormatValid: 'Wrong format!',
            isYearValid: 'Wrong value!',
            hasToBePositiveNumber: 'It has to be a number above 0!',
            canNotBeNegative: 'It can not be negative number!',
            percentage: 'Should be between 0 and 100!',
            atLeastOneItem: 'Please add at least one item!',
            maxElements: 'You have chosen too many elements!',
            containDigit: 'Must contain a digit!',
            sameAsPassword: 'Must be the same as password!'
        };
    }
}

export default GetValidationErrorMessageHandler;
