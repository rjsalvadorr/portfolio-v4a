import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostLinks from "../components/postlinks";
import mainStyles from '../styles/main.module.css';

class MusicPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Music posts" />
        <p className={mainStyles.categoryIntro}>
          My main instruments are the classical guitar and bass guitar. After dabbling with violin, piano, and cello, I've stuck with classical/flamenco guitar (clips coming soon...)
        </p>
        <PostLinks posts={posts} />
        <Bio />
      </Layout>
    )
  }
}

export default MusicPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: {category: {eq: "music"}} }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            type
            target_url
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
