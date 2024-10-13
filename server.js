require('dotenv').config();
const express = require('express')
const authRoutes=require('./src/book/routes/authroute')
const profileroute=require('./src//book/routes/profileroute')
const shelfroute=require('./src/book/routes/shelfroute')
const booksroute=require('./src/book/routes/bookroute')
const reviewroute=require('./src/book/routes/reviewroute')

const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/auth',authRoutes)

app.use('/user',profileroute)
app.use('/shelf',shelfroute)
app.use('/book',booksroute)
app.use('/book',reviewroute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))