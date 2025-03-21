const server = Bun.serve({
  port: process.env.PORT!,
  fetch(req) {
    return new Response("Hello World!")
  }
})

console.log(`🚀 服务运行在 ${server.url} 🎉`)