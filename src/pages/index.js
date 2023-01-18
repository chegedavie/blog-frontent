import Head from 'next/head'
import Nav from '@/components/Nav'
import Banner from '@/components/Home/Banner'
import Skills from '@/components/Home/Skills'
import Projects from '@/components/Home/Projects'
import Container from '@/components/Container'
import TwitterMeta from '@/components/Blog/TwitterMeta'
export default function Home () {
    return (
        <Container className='relative bg-transparent text-gray-800 text-justify'>
            <Head>
                <title>Personal website: David Chege</title>
                <link rel='icon' href='/favicon.ico' />
                <TwitterMeta description={`Welcome to ${'my site'} where I share my work and knowledge with recruiters and developers. I hope you enjoy my work. Either way, contact me. Let's have that conversation!`} URL={'http:/localhost:3000'} title='Personal website: David Chege'/>
            </Head>
            <Nav />
            <Banner />
            <Skills />
            <Projects
                heading='Featured Projects'
                portfolio={false}
                className='bg-slate-100'
                headingColor='text-slate-700'
            />
        </Container>
    )
}
