export function isAdmin(req, res, next) {
  if (req.session?.user?.role === 'admin') {
    next();
  } else {
    res.status(403).send('Access Denied: Admins only');
  }
}
