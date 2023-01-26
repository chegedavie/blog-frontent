import Head from 'next/head'
import Nav from '../components/Nav'
import Container from '../components/Container'
import { MDEPreview } from '@/components/Blog/MDEditor'
import MarkdownPreview from '@/components/Blog/MarkdownPreview'



export default ()=>{
    const source=`## Terms and Conditions\n\nWelcome to CodeWithChege, a blog dedicated to providing informative and engaging content on [topic(s)]. By accessing or using our website, you agree to be bound by the following terms and conditions. If you do not agree to these terms, please do not use our website.\n\nContent: The content on our website is for general information purposes only and is not intended as a substitute for professional advice. We make every effort to ensure the accuracy and completeness of the information on our website, but we do not guarantee that it is error-free.\n\nIntellectual Property: All content on our website, including text, images, and videos, is protected by copyright and trademark laws. You may not use any content from our website without our express written permission.\n\nUser Contributions: By submitting any content to our website, including comments, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and display your content. You warrant that you have the right to grant us this license for any content you submit.\n\nLinks to Third-Party Websites: Our website may contain links to third-party websites. We have no control over the content or practices of these websites and are not responsible for their privacy policies or terms of use.\n\nDisclaimer: Our website and its content are provided "as is" without any warranties of any kind, either express or implied. We do not guarantee that our website will be available at all times or that it will be free from errors or viruses.\n\nLimitation of Liability: In no event shall we be liable for any damages, including but not limited to direct, indirect, incidental, consequential, or punitive damages, arising out of or in connection with the use of our website.\n\nGoverning Law: These terms and conditions shall be governed by and construed in accordance with the laws of [country or state].\nChanges to the Terms: We reserve the right to make changes to these terms and conditions at any time without notice. Your continued use of our website following any changes indicates your acceptance of the new terms.`
    return (
        <Container>
            <Head>
                <title>CodeWithChege: Terms and conditions</title>
            </Head>
        <Nav/>
            <div className='py-6 px-8 bg-indigo-50'>
                <MarkdownPreview source={source}/>
            </div>
        </Container>
    )
}