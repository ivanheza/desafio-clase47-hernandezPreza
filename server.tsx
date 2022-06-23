// @deno-types="https://denopkg.com/soremwar/deno_types/react/v16.13.1/react.d.ts"
import React from "https://jspm.dev/react@17.0.2"
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server"
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/react-dom.d.ts"
import ReactDOM from "https://jspm.dev/react-dom@17.0.2"

import {createApp} from "https://deno.land/x/servest@v1.3.4/mod.ts"

const app = createApp()

let colores: any[] = []
app.post("/", async (req) => {
   const body = await req.formData()

   const color = body.value("color")

   colores.push(color)
})

app.handle("/", async (req) => {
   console.log(colores)
   await req.respond({
      status: 200,
      headers: new Headers({
         "content-type": "text/html; charset=UTF-8",
      }),

      body: ReactDOMServer.renderToString(
         <html>
            <head>
               <meta charSet="utf-8" />
               <title>Server Deno</title>
            </head>
            <body style={{backgroundColor: "black"}}>
               <h1 style={{color: "white"}}>
                  WELCOME TO A SERVER WORKING WITH DENO & REACT
               </h1>
               <form action="/" method="post">
                  <p style={{color: "white"}}>Choose a color.</p>
                  <input type="text" name="color" />
                  <button>SEND</button>
               </form>
               <ul>
                  {colores.map((c) => {
                     return (
                        <li style={{color: c}}>
                           <b>{c}</b>
                        </li>
                     )
                  })}
               </ul>
            </body>
         </html>
      ),
   })
})

app.listen({port: 9000})
