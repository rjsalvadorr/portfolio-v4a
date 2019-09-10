import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import mainStyles from '../styles/main.module.css';

const PostLinks = ({ posts }) => {
  return (
    <div className="post-links">
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        let thumb;
        
        if(node.frontmatter.thumbnail) {
          const thumbFluid = node.frontmatter.thumbnail.childImageSharp.fluid
          thumb = (<Img style={{ borderRadius: '4px' }}fluid={thumbFluid} />);
        }

        if(node.frontmatter.type === 'link') {
          return (
            <article key={node.fields.slug} className={mainStyles.postArticle}>
              <a href={node.frontmatter.target_url} target="_blank">
                <header>
                  <h2 className={mainStyles.postHeading} >
                    {title}
                  </h2>
                </header>
                {thumb}
              </a>
            </article>
          )
        }

        return (
          <article key={node.fields.slug} className={mainStyles.postArticle}>
            <header>
              <h2 className={mainStyles.postHeading} >
                <Link className={mainStyles.postHeadingLink} to={node.fields.slug}>
                  {title}
                </Link>
              </h2>
              <small style={{
                display: 'block',
              }}>{node.frontmatter.date}</small>
            </header>
            <Link to={node.fields.slug}>
              {thumb}
            </Link>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </div>
  )
}

export default PostLinks
