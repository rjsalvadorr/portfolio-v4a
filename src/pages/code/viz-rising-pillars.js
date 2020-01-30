import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../../components/layout';
import RisingPillars from '../../components/visualizations/three-city';
import vizStyles from '../../styles/visualizations.module.css';

class RisingPillarsFeature extends React.Component {
  render () {
    const {data} = this.props;
    const siteTitle = data.site.siteMetadata.title;
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <div className={vizStyles.featureWrapper}>
          <RisingPillars />
          <div className={vizStyles.featureText}>
            Rising Pillars
          </div>
        </div>
      </Layout>
    );
  }
}

export default RisingPillarsFeature;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
