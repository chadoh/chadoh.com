$.fn.extend({
  h: function(){
    return this.outerHeight(true);
  },
  w: function(){
    return this.outerWidth(true);
  }
});

function calculateHeights() {
  var c = $('#columns'), w = $(window), n = $('nav#main');
  $('#height-calculations').html(
    "columns.height: " + c.h() + "px<br>" +
    "columns.width:  " + c.w() + "px<br>" +
    "window.height:  " + w.h() + "px<br>" +
    "nav.height:     " + n.h() + "px<br>" +
    "IDEALS<br>" +
    "columns.height: " + ((w.h() - n.h()) * .9) + "px<br>"
  );
}

$(function(){
  calculateHeights();
  $('#height-calculations').click(function(){ calculateHeights() });
});
