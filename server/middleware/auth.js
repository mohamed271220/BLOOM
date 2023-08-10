import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      return next(error);
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken);
    } catch (err) {
      err.statusCode = 500;
      return next(err);
    }
    if (!decodedToken) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      return next(error);
    }

    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    next(err);
  }
};
