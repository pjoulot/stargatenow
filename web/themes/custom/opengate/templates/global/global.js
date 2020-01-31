(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.hamburgerMenu = {
    attach: function (context, settings) {
      $('.hamburger:not(.processed)').each(function (index) {
        $(this).addClass('processed');

        $(this).click(function (e) {
          e.preventDefault();
          $(this).toggleClass('is-active');
          $('.header__content').toggleClass('is-active');
        });
      });
    }
  };

})(jQuery, Drupal, this, this.document);
