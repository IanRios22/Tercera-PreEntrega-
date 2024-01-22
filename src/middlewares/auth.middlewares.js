export const checkSessions = (req, res, next) => {
    req.session.user ? next() : res.redirect('/login')
}

export const checkAdmin = (req, res, next) => {
    req.session.user.role === 'admin' ? next() : res.status(401).send({ error: 'No autorizado para usuarios' })
}

export const checkUser = (req, res, next) => {
    req.session.user.role === 'user' ? next() : res.status(401).send({ error: 'No autorizado para ADMIS' })
}