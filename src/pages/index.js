import React from "react"
import { Link, graphql } from "gatsby"

import HomeLayout from "../components/home-layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <HomeLayout location={this.props.location} title={siteTitle}>
        <SEO title="Homepage" />
        <Link to="/code">
          <div className="home-link">
            <h1>Code</h1>
          </div>
        </Link>
        <Link to="/music">
          <div className="home-link">
            <h1>Music</h1>
          </div>
        </Link>
        <Link to="/artblog">
          <div className="home-link">
            <h1>Art/Blog</h1>
          </div>
        </Link>
      </HomeLayout>
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
