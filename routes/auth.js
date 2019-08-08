const express = require('express')
const { authenticationClient } = require('../Auth0')
const ApiRequest = require('../models/apiRequest')

const router = express.Router()

const CALLBACK_URL = process.env.PORT
  ? `${process.env.SERVER_ADDRESS}/${process.env.CALLBACK_PATH}`
  : `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/${process.env.CALLBACK_PATH}`
const RETURN_URL = process.env.PORT
  ? `${process.env.SERVER_ADDRESS}/${process.env.CALLBACK_PATH}`
  : `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/${process.env.CALLBACK_PATH}`

const buildLoginUrl = requestId => {
  const url = new URL(`https://${process.env.AUTH0_DOMAIN}/authorize`)
  url.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID)
  url.searchParams.set('audience', process.env.AUTH0_AUDIENCE)
  url.searchParams.set('scope', 'openid email profile')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('response_mode', 'query')
  url.searchParams.set('code_challenge_method', 'S256')
  url.searchParams.set('redirect_uri', CALLBACK_URL)
  url.searchParams.set('state', requestId)
  return url.href
}

const buildLogoutUrl = state => {
  const url = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`)
  url.searchParams.set('returnTo', RETURN_URL)
  url.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID)
  if (state) {
    url.searchParams.set('state', state)
  }
  return url.href
}

router.get('/login', async (req, res) => {
  try {
    // TODO: Add client authentication
    // TODO: Add data validations

    const apiRequest = new ApiRequest({
      nonce: req.query.nonce,
      callback: req.query.callback,
      state: req.query.state
    })

    const result = await apiRequest.save()

    const redirect = buildLoginUrl(result.id)
    res.redirect(redirect)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
})

router.post('/login', (req, res) => {
  res.statusCode = 501
  res.end()
})

router.get('/logout', (req, res) => {
  try {
    const logoutUrl = buildLogoutUrl(req.query.returnTo)
    res.redirect(logoutUrl.href)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
})

router.get('/callback', async (req, res) => {
  try {
    if (req.query.code && req.query.state) {
      const code = req.query.code
      const requestId = req.query.state

      const apiRequest = await ApiRequest.findById(requestId)
      apiRequest.code = code
      await apiRequest.save()

      const callback = new URL(apiRequest._doc.callback)
      if (apiRequest._doc.state) {
        callback.searchParams.set('state', apiRequest._doc.state)
      }
      res.redirect(callback.href)
    } else {
      res.status(400)
      res.send('Missing code or state')
    }
  } catch (err) {
    res.status(500)
    res.send(err)
  }
})

router.get('/return', async (req, res) => {
  try {
    if (req.query.state) {
      const url = new URL(req.query.state)
      res.redirect(url.href)
    } else {
      res.status(400)
      res.send('Missing state')
    }
  } catch (err) {
    res.status(500)
    res.send(err)
  }
})

router.post('/get_token', async (req, res) => {
  // TODO: Add client authentication

  try {
    if (req.body.nonce) {
      const apiRequest = await ApiRequest.findOne({ nonce: req.body.nonce })

      if (apiRequest && !apiRequest._doc.completed) {
        apiRequest.completed = true
        await apiRequest.save()

        const result = await authenticationClient.oauth.authorizationCodeGrant({
          audience: process.env.AUTH0_AUDIENCE,
          code: apiRequest._doc.code,
          redirect_uri: CALLBACK_URL
        })
    
        res.send(result)
      } else {
        res.status(404)
        res.send('No requests are associated with this nonce')
      }
    } else {
      res.status(400)
      res.send('Missing nonce')
    }
  } catch (err) {
    res.status(500)
    res.send(err)
  }
})

module.exports = router
