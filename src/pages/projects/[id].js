import projects from '../../components/Home/projects.json'
import Nav from '../../components/Nav'
import Head from 'next/head'
import ProjectDescription from '../../components/Projects/ProjectDescription'
import ProjectFeatures from '../../components/Projects/ProjectFeatures'
import Implementation from '../../components/Projects/Implementation'
import TechStack from '../../components/Projects/TechStack'
import Container from '../../components/Container'

const Project = props => {
    const { project } = props
    let title = project ? `Project: ${project.title}` : ''
    return (
        <Container>
            <Head>
                <title>{title}</title>
            </Head>
            <Nav/>
            <ProjectDescription project={project} key={'description'} />
            <ProjectFeatures project={project} key={'features'} />
            <Implementation
                implementation={project && project.implementation}
                key={'implementation'}
            />
            <TechStack
                techStack={project && project.techStack}
                key={'techStack'}
            />
        </Container>
    )
}

Project.getInitialProps = ({ query }) => {
    const id = query.id
    const project = projects[id]
    return { project: project }
}

export default Project
