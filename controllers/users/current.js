const current = async (req, res, next) => {

    console.log(req.query);

    try {
        const {user} = req;
      
      res.status(201).json({
          status: "success",
          code: 201,
          body: {
              user
          }
      })
    }

    catch(error) {
        error.status(401);
        throw error;
    }
}

module.exports = current;