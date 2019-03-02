

/**
 * @param {*} req - request to the server
 * @param {*} res - response of the server
 * @param {*} next - next function to be called
 */
async function addNewRating(req, res, next) {
  res.send({addNewRating: 'addNewRating'});
}

module.exports = {
  addNewRating,
};

