const next = require('next')
const express = require('express')
const cookieParser = require('cookie-parser')
const router = require('./router')
const errorHandler = require('./errorHandler')
const oauthHandler = require('./oauthHandler')

const dev = process.env.NODE_ENV !== 'production'

module.exports = function (getRoutes, config) {
	const app = next({ dev, conf: config })
	const handle = app.getRequestHandler()
	const nextConfig = app.nextConfig

	const initNext = (app) => {
		return app
			.prepare()
			.then((...args) => {
				const server = express()
				const routes = router(app, getRoutes)
				server.use(cookieParser())
				server.nextConfig = app.nextConfig

				return server
			})
	}

	const attachNextRoutes = (server) => {
		const routes = router(app, getRoutes)

		server.use('/', routes)

		server.get('/oauth', (req, res) => oauthHandler(req, res))
		server.get('*', (req, res) => handle(req, res))

		return server
	}

	const startServer = (server) => {
		const { port } = config

		server.listen(port, (err) => {
			if (err) throw err
			console.log(`> Ready on http://0.0.0.0:${port}`)
		})
	}

	return Promise.resolve(app)
		.then(initNext)
		.then(attachNextRoutes)
		.then(startServer)
		.catch(errorHandler)
}
