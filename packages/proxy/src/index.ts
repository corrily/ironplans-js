import Koa from 'koa'
import StubManager from './stub'

const app = new Koa()
const stubs = new StubManager()
const matcher = stubs.matcher()

app.use(async (ctx) => {
  try {
    const { status, data } = await matcher(ctx.req)
    ctx.status = status ?? 200
    ctx.body = data
  } catch (e) {
    console.error(e)
    ctx.status = 500
  }
})

export default app

if (typeof require !== 'undefined' && require.main === module) {
  app.listen(3000)
  console.warn('Listening on :3000')
}
