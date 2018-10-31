(function($) {

    $('#signup').submit(function(e) {

        var $form = $(this);
        var url = $form.attr('action');

        $.ajax({
               type: "POST",
               url: url,
               data: $form.serialize(),
               success: function(data)
               {
                   $form.hide().html('<h3>Thank you for signing up!</h3>').slideToggle(100);
               }
             });

        e.preventDefault();

    });


})(jQuery);