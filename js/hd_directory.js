(function($) {
    Drupal.behaviors.hd_directory = {
        attach: function(context, settings) {
            if (window.location.hash) {
                var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
                //$('.'+hash).append("<p>This is a paragraph</p>");
                var nid = hash.split('id').join('')
                build_ajax_content('/directory-person-feed/' + nid, "." + hash);
            } else {
                // Do Nothing
            }
/*
      $('.paragraphs-item-video-callout').each(function(){
        var $height=$(this).height();
        $(this).find('.field-name-field-source-url a').css('height',$height); } );
      */
            $('#directory-link li a').click(function() {
                var id = $(this).attr("id");
                console.log(id);
                //$(".id" + id).append("<p>This is a paragraph</p>");
                build_ajax_content('/directory-person-feed/' + id, ".id" + id);
            });
            // Function to format content when pulled from ajax call

            function build_ajax_content(url, container) {
                var request = $.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log('Sorry, Something went wrong while getting the feed');
                    },
                    success: function(data) {
                        if (data.nodes.length != 0) {
                            // Clear the list.
                            $(container).html("");
                            // For each node result, add it to the list.
                            var results_array = [];
                            i = 0;
                            $.each(data.nodes, function(index, obj) {
                                results_array.push([obj.node.title, obj.node.field_position, obj.node.field_school_college, obj.node.body, obj.node.image.src, obj.node.academic_history, obj.node.phone, obj.node.path]);
                                // Build the different output styles
                                var html = "<div class='directory-popup-content'><div class='image-container'><img src='" + obj.node.image.src + "'></div><div class='info-wrapper'><div class='popup-title'>" + obj.node.title + "</div><div class='popup-position'>" + obj.node.field_position + "</div><div class='popup-office'>" + obj.node.office + "</div><div class='popup-phone'>" + obj.node.phone + "</div><div class='popup-email'>" + obj.node.email + "</div><div class='popup-bio'>" + obj.node.body + "</div></div><div class='button-wrapper'><a class='button' href='" + obj.node.path + "'>More Information</a></div></div>";
                                $(container).append($("<div></div>", {
                                    "html": html
                                }));
                            });
                        } else {
                            $(container).html('<div class="location-no-results">No Results... Try changing your search criteria</div>');
                        }
                    }
                });
            }
        }
    }
})(jQuery);