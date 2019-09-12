import pages from '../data/pages'

export const getSection = (location) => {
  const pathArr = location.pathname.split ('/').filter (function (el) {
    return el;
  });
  
  let section = '';
  if (pathArr.length > 0) {
    section = pathArr[0];
  }

  return section;
}

export const getPageData = (location) => {
  const section = getSection(location);
  return pages.find(page => page.section === section);
}
