var colCountProp = '';
var cols;

jQuery.fn.extend({
  h: function(){ return this.outerHeight(true); },
  w: function(){ return this.outerWidth(true); }
});

function setColCountProp() {
  cols = $('#columns');
  if(cols.css('column-count') == 2)
    colCountProp = 'column-count';
  else if(cols.css('-webkit-column-count') == 2)
    colCountProp = '-webkit-column-count';
  else if(cols.css('-moz-column-count') == 2)
    colCountProp = '-moz-column-count';
  else if(cols.css('-o-column-count') == 2)
    colCountProp = '-o-column-count';
}

function height() {
  return $('#columns').h();
}
function idealHeight() {
  return ($(window).h() - $('nav#main').h()) * .9;
}

function adjustHeight() {
  while(height() > idealHeight()) {
    addColumn();
  }
}

function addColumn() {
  var viewingWidth = $('#column-wrap').w();
  var colsPermittedInView = Math.floor(viewingWidth / 300);
  var nextColCount = +cols.css(colCountProp) + 1;
  if(colsPermittedInView < nextColCount) {
    cols.css('width', nextColCount / colsPermittedInView * viewingWidth);
  }
  cols.css(colCountProp, '' + (nextColCount));
}

function scrollToColumn(index) {
  if (isNaN(index))
    index = 0;
  var totalWidth = cols.w();
  var colCount = cols.css(colCountProp);
  var colWidth = totalWidth / colCount;
  var desiredOffset = colWidth * index;
  var currentOffset =  cols.css('left');

  cols.animate({ 'left': -desiredOffset });
}

addScrollButtons = function() {
  var wrap = $('#column-wrap');
  wrap.css({'overflow': 'hidden'});
  wrap.append($('<a title="Scroll left"  href="#-1" class="icon-chevron-left"  style="float: left;  width: 50%;">'));
  wrap.append($('<a title="Scroll right" href="#1"  class="icon-chevron-right" style="float: right; width: 50%; text-align: right;">'));
}

hideRightChevronMaybe = function(currentColumn){
  var viewingWidth = $('#column-wrap').w();
  var colsPermittedInView = Math.floor(viewingWidth / 300);
  if (currentColumn + colsPermittedInView == cols.css(colCountProp))
    $('a.icon-chevron-right').hide()
  else
    $('a.icon-chevron-right').show()
}

updateScrollButtons = function(currentColumn){
  if (isNaN(currentColumn))
    currentColumn = 0;
  $('a.icon-chevron-left').attr('href', '#' + (currentColumn - 1));
  $('a.icon-chevron-right').attr('href', '#' + (currentColumn + 1));
  hideRightChevronMaybe(currentColumn);
}

$(function(){
  hljs.initHighlightingOnLoad();

  if(! $('body').hasClass('no-columns') && ($(window).w() > 625)){
    setColCountProp();
    adjustHeight();
    addScrollButtons();
  }

  $(window).hashchange(function(){
    var desiredCol = +window.location.hash.replace('#', '');
    scrollToColumn(desiredCol);
    updateScrollButtons(desiredCol);
  });
  $(window).hashchange();

  /* fire a `resizeEnd` function when window resizing pauses for >=500ms
   * from http://stackoverflow.com/a/2996465/249801 */
  $(window).resize(function() {
    if(this.resizeTo) clearTimeout(this.resizeTo);
    this.resizeTo = setTimeout(function() {
      $(this).trigger('resizeEnd');
    }, 500);
  });

  $(window).on('resizeEnd', function(){
    /* reset to how it was at page load... */
    cols.css(colCountProp, '2');
    cols.css( 'width', cols.parent().css('width') );

    /* and readjust the height! */
    adjustHeight();
  });

});

$(document).keypress(function(e){
  if (e.keyCode == 104) { // left arrow
    var newCol = $('a.icon-chevron-left:visible').attr('href');
    if (newCol) window.location = newCol;
    console.log(newCol);
  }
  else if (e.keyCode == 108) { // right arrow
    $('a.icon-chevron-right:visible').attr('href');
    var newCol = $('a.icon-chevron-right:visible').attr('href');
    if (newCol) window.location = newCol;
  }
});

