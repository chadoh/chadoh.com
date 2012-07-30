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
  return ($(window).h() - $('nav#main').h()) * .8;
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

$(function(){
  if(! $('body').hasClass('no-columns') ){
    setColCountProp();
    adjustHeight();
  }
});
