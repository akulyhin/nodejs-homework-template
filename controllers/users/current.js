const current = async (req, res) => {
        const {user} = req.query;
      
      res.status(201).json({
          status: "success",
          code: 201,
          body: {
              user
          }
      })
}

module.exports = current;