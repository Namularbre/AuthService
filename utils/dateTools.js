/**
 *
 * @returns {Promise<Date>}
 */
async function nowPlusOneHour() {
    const nowPlusOneHour = new Date();
    nowPlusOneHour.setHours(nowPlusOneHour.getHours() + 1);
    return nowPlusOneHour;
}

/**
 *
 * @param expirationDate {Date}
 * @returns {Promise<boolean>}
 */
async function isNotExpired(expirationDate) {
    const now = new Date();
    let expirationDateWithHourOffset = new Date(expirationDate);
    expirationDateWithHourOffset.setHours(expirationDate.getHours() - 1);

    return expirationDate >= now && now >= expirationDateWithHourOffset;
}

module.exports = {
    nowPlusOneHour,
    isNotExpired
}
