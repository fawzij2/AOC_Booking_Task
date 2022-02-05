const {UserType} = require("../../db/models/userType");


const authorization = (string) => {
	return (req, res, next) => {
		UserType
			.findById(req.token.userType)
			.then((result) => {
				if (!result.permissions.includes(string))
					return res.status(403).json({ message: 'forbidden' });

				next();
			})
			.catch((error) => {
				res.status(403).json({ message: 'forbidden' });
			});
	};
};

module.exports = authorization;
