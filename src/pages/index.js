import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Homepage" />
        <Link to="/software">
          <div class="home-link">
            <h1>Software</h1>
          </div>
        </Link>
        <Link to="/music">
          <div class="home-link">
            <h1>Music</h1>
          </div>
        </Link>
        <Link to="/artblog">
          <div class="home-link">
            <h1>Art/Blog</h1>
          </div>
        </Link>
      </Layout>
    )
  }
}

export default BlogIndex


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
