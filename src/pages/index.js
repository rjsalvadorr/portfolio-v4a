import React from "react"
import { Link, graphql } from "gatsby"

import HomeLayout from "../components/home-layout"
import SEO from "../components/seo"
import homeStyles from "../styles/home.module.css"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <HomeLayout location={this.props.location} title={siteTitle}>
        <SEO title="Homepage" />
        <Link to="/code">
          <div className="home-link-wrapper">
            <h2 className={homeStyles.link}>Code</h2>
          </div>
        </Link>
        <Link to="/music">
          <div className="home-link-wrapper">
            <h2 className={homeStyles.link}>Music</h2>
          </div>
        </Link>
        <Link to="/artblog">
          <div className="home-link-wrapper">
            <h2 className={homeStyles.link}>Art/Blog</h2>
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
