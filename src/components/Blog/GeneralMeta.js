const GeneralMeta = ({ description, URL, image, title }) => {
    return (
      <>
        <meta property="og:url" content={URL} key="ogurl" />
        <meta property="og:image" content={image} key="ogimage" />
        <meta property="og:site_name" content="David Chege" key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </>
    );
  };
  
  export default GeneralMeta;