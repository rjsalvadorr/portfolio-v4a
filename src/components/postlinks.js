import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import mainStyles from '../styles/main.module.css';

const PostLinks = ({ posts }) => {
  return (
    <div className="post-links">
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
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
