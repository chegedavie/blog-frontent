
import Container from '../components/Container'
import Nav from '../components/Nav'
import ContactSection from '../components/Contact/ContactSection'
import Head from 'next/head'


let Contact = () => {
  return (
    <Container style={{ backgroundImage:"url('/bg1.jpg')",backgroundSize:'cover' }} className=' h-screeen'>
      <Head>
        <title>Get in touch. Send me a message.</title>
      </Head>
      <Nav type='inverted'/>
      <ContactSection/>
    </Container>
  )
}

export default Contact
