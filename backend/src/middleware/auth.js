function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next(); // Usuário autenticado, prossiga para a próxima função
  } else {
    res.redirect('/login'); // Redirecione para a página de login se não estiver autenticado
  }
}

module.exports = isAuthenticated;