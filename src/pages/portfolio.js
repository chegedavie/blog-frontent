import Head from 'next/head'
import Nav from '../components/Nav'
import Projects from '../components/Home/Projects'
import Container from '../components/Container'
import projects from '../components/Home/projects.json'
const Portfolio = () => {
  return (
    <Container className='relative h-full bg-indigo-50' style={{ zIndex:5 }}>
      <Head>
        <title>My Projects</title>
      </Head>
      <Nav />
      <div className='h-full relative w-full h-full'>
        <Projects
          portfolio={true}
          className='w-full bg-indigo-900 border-t border-indigo-50'
          heading='My projects'
          headingColor='text-indigo-100/80 z-10'
          projects ={projects}
        />
      </div>
    </Container>
  )
}


export default Portfolio
