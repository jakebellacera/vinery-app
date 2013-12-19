(function () {
    var path = window.location.pathname.split('/'),
        $tagField = $('#tagSearchField'),
        tag,
        $posts = $('.post-item');

    $tagField.focus();

    $('#tagSearchForm').on('submit', function (e) {
        var $form = $(this),
            tagRegex = $tagField.val().match(/(\w+)/);

        e.preventDefault();

        if (tagRegex == null) {
            $form.prepend('<div class="page-header-alert alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Oh snap!</strong> That tag didn\'t look right.</div>');
            $tagField.val('');
        } else {
            window.location.href = '/tagged/' + tagRegex[0];
        }
    });

    $('.post-json pre').addClass('pre-scrollable')

    $(document).on('toggle.post', '.post-item', function () {
        var $this = $(this);

        if ($this.hasClass('toggled')) {
            $this.find('img').fadeIn(300, function () {
                $this.removeClass('toggled').find('iframe').remove();
            });
        } else {
            $this.addClass('toggled').append(
                $($this.data('embed')).on('load.post', function () {
                    $this.find('img').fadeOut();
                })
            );
        }
    });

    $(document).on('click.post', '.post-item a', function (e) {
        e.preventDefault();

        $(this).add($posts.filter('.toggled')).each(function (i, post) {
            $(post).trigger('toggle.post');
        });
    });

    $posts.each(function () {
        $(this).data('embed', '<iframe class="vine-embed" src="' + $(this).attr('data-embed-url') + '/embed/simple" width="600" height="600" frameborder="0"></iframe>');
    });
}());
