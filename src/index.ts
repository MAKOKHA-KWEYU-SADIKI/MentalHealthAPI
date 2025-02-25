import  {Hono }from 'hono'
import "dotenv/config"
import {logger} from 'hono/logger'
import {userRouter} from '../src/users/users.router'
import { sessionRouter } from './session/session.router'
import {authRouter} from '../src/authentication/auth.router'
import { therapistRouter } from './therapists/therapists.router'
import { bookingRouter } from './bookings/booking.router'
import { serve } from '@hono/node-server'
import {cors} from 'hono/cors'
import{prometheus} from '@hono/prometheus'
import{csrf} from 'hono/csrf'
import{trimTrailingSlash} from 'hono/trailing-slash'
// import AIrouter from './chatbot/chatbot.router'
import { diagnosisRouter } from './diagnostic/diagnostic.router'
// import tokenization from './mpesa/token'
// import chatbot from './chatbot/chatbot.router'
const app = new Hono();
app.use(logger())
app.use(csrf())
const{registerMetrics,printMetrics}=prometheus()
app.use('*',registerMetrics)
// app.use(printMetrics)
app.use(trimTrailingSlash())
app.get('/', (c) => {
    return c.text('the code is okay')
  })
app.get('/metrics',printMetrics)
//middleware
  app.use('*', cors())
  console.log("server is running ")
//routes
// app.route("/api",AIrouter)
app.route("/api",userRouter)
app.route("/api",authRouter)
app.route("/api",therapistRouter)
app.route('/api',sessionRouter)
app.route('/api',bookingRouter)
// app.route("/api",chatbot)
app.route("/api",diagnosisRouter)

serve({
    fetch: app.fetch,
    port:Number(process.env.PORT)
  })
