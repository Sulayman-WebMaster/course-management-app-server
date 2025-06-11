 const AuthCheck = (req, res, next) => {
    const queryEmail = req.query.email;
  const tokenEmail = req.user?.email;

  if (queryEmail !== tokenEmail) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

    next();
}
export default AuthCheck;
  