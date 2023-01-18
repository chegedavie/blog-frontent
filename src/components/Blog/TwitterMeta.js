const TwitterMeta = ({ description, URL, image, title }) => {
    return (
      <>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Gr8087" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@Gr8087" />
        <meta property="og:url" content={URL} />
        <meta name="twitter:image" content={image} />
      </>
    );
  };
  
  export default TwitterMeta;