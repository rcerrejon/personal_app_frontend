export function _openInNewTab (url) {
  if (url) {
    if (url.indexOf('http') != -1) {
      window.open(url, '_blank');
    } else {
      window.open(url, '_self');
    }
  }
}
