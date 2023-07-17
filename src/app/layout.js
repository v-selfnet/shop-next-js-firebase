import './globals.css'
import { Roboto } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/providers'

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ['latin']
})

export const metadata = {
  title: 'Shop Online',
  description: 'eCommerce Site',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" data-theme="dark" className='transition-all'>
      <body className={roboto.className}>
        <Providers>
          <Navbar></Navbar>
          <main className='p-10'>{children}</main>
          <Footer></Footer>
        </Providers>

      </body>
    </html>
  )
}
export default RootLayout;
