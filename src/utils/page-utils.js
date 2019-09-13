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

const pageData404 = {
  id: 5,
  name: '404',
  section: '404',
  path: '/',
};

export const getPageDataFromLocation = (location) => {
  const section = getSection(location);
  const pageResult = pages.find(page => page.section === section);

  if(pageResult) {
    return pageResult;
  } else {
    return pageData404;
  }
}

export const getPageDataFromSection = (section) => {
  const pageResult = pages.find(page => page.section === section);

  if(pageResult) {
    return pageResult;
  } else {
    return pageData404;
  }
}
