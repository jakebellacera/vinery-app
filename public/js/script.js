(function () {
    var path = window.location.pathname.split('/'),
        $tagField = $('#tagSearchField'),
        tag,
        $postsContainer;

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

    $(document).on('toggle.post', '#posts .post-item', function () {
        var $this = $(this);

        if ($this.hasClass('toggled')) {
            $this.removeClass('toggled').html($this.data('vine').poster);
        } else {
            $this.addClass('toggled').html($this.data('vine').embed)
        }
    });

    $(document).on('click.post', '#posts .post-item a', function (e) {
        var $parent = $(this).parent();

        e.preventDefault();

        $parent.add($parent.siblings('.toggled')).each(function () {
            $(this).trigger('toggle.post');
        });
    });

    if (path.length > 1 && path[1] === 'tagged') {
        tag = path[2];
        $postsContainer = $('#posts');

        $.get('/tagged/' + tag + '.json', function (response) {
            var $items = $([]);

            if (response.data.records.length > 0) {
                $.each(response.data.records, function (i, record) {
                    var $item = $('<div class="post-item"/>')
                            .data('vine', {
                                poster: '<a href="#"><img src="' + record.thumbnailUrl + '" alt="Play vine." width="600" height="600"/></a>',
                                embed: '<iframe class="vine-embed" src="' + record.shareUrl + '/embed/simple" width="600" height="600" frameborder="0"></iframe><iframe class="vine-embed" src="' +  + '/embed/postcard" width="600" height="600" frameborder="0"></iframe>'
                            });
                    $item.html($item.data('vine').poster);
                    $items = $items.add($item);
                });
            } else {
                $items = $('<div class="posts-none"><h3>Uh oh!</h3><p>There aren\'t any Vines with that tag. Please try a different one.</p></div>');
            }

            $postsContainer.html($items);
        });
    }
}());
