
module.exports.formatSuccessResponse = function(result) {
    return {
        success: true,
        response: result
    }
};

module.exports.formatFailResponse = function(error) {
    return {
        success: false,
        error: error
}
};
