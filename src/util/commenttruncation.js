export function fixComment(comment) {
  var div = document.createElement('div');
  div.innerHTML = comment;
  return div.innerHTML;
}

export function getVisibleLength(comment) {
  var div = document.createElement('div');
  div.innerHTML = comment;
  return div.textContent.length;
}

