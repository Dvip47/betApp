import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["400", "700"],
  display: "swap"
})

export const metadata = {
  title: 'Admin',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-white`}>
        {children}
      </body>
    </html>
  )
}
