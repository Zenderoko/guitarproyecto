import React from 'react'
import Head from 'next/head'
import {Header} from './Header'
import {Footer} from './Footer'

export const Layout = ({children, pagina, guitarra}) => {
  return (
    <div>
       <Head>
        <title>{`GuitarLA - ${pagina}`}</title>
        <meta name="description" content="Sitio Web de venta de guitarras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
        <Header
          guitarra={guitarra}
        />
        {children}
        <Footer/>
    </div>  
    
  )
}

Layout.defaultProps = {
    guitarra : null
}
