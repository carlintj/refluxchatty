var isElementInViewport = function(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

var scrollIntoView = function(el) {
  var scrollTop = false;
  //if element.top is closer to 0 than the bottom of the screen scroll to top
  //else bottom
  var rect = el.getBoundingClientRect();
  scrollTop = (rect.top / (window.innerHeight || document.documentElement.clientHeight)) < 0.5;
  el.scrollIntoView(scrollTop);

  var overScrollAmount = 25;
  if (scrollTop) {
    overScrollAmount *= -1;
  }
  window.scrollBy(0,overScrollAmount);
}

module.exports = {
  isElementInViewport: isElementInViewport,
  scrollIntoView: scrollIntoView
};