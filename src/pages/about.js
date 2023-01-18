import data from '../components/About/about.json'
import Head from 'next/head'
import Nav from '../components/Nav'
import Summary from '../components/About/Summary'
import Resume from '../components/About/Resume'
import Container from '../components/Container'


const About= (props)=> {
  const {data}=props
  const { summary, interests, hobbies, education, github_profile } = data
  return (
    <Container className='bg-white'>
      <Head>
        <title>Learn more about me</title>
      </Head>
      <Nav type='inverted'/>
        <Summary summary={summary} githubProfile={github_profile}/>
        <Resume interests={interests} hobbies={hobbies} education={education}/>
    </Container>
  )
}

About.getInitialProps = () => {
  return { data }
}

export default About


