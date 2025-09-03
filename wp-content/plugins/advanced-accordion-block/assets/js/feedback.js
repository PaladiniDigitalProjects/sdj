(function ($) {
    'use strict';
    $(document).ready(function () {
        $('.feedback-btn-wrap').each(function () {
            const $feedbackWrap = $(this);
            const feedbackId = $feedbackWrap.data('id');
            $.ajax({
                url: aab_feedbackAjax.ajaxurl,
                type: 'POST',
                data: {
                    action: 'get_votes',
                    feedbackId: feedbackId,
                    nonce: aab_feedbackAjax.nonce
                },
                success: function (response) {
                    if (response.success) {
                        $feedbackWrap.find('button[data-value="yes"] .count').text(response.data.yes);
                        $feedbackWrap.find('button[data-value="no"] .count').text(response.data.no);

                        // Update button states if user has voted
                        if (response.data.userVote) {
                            $feedbackWrap.find('.feedback-btn').removeClass('active');
                            $feedbackWrap.find(`button[data-value="${response.data.userVote}"]`).addClass('active');
                        }
                    }
                },
                error: function (xhr, status, error) {
                    console.log('AJAX test failed:', {
                        status: status,
                        error: error,
                        response: xhr.responseText
                    });
                }
            });
        });
        // Handle feedback button click
        $('.feedback-btn').on('click', function () {
            const $button = $(this);
            const $feedbackWrap = $button.closest('.feedback-btn-wrap');
            const feedbackId = $feedbackWrap.data('id');
            const voteValue = $button.data('value');
            // Get the vote identifier (either user ID or the cookie-based identifier)
            var voteIdentifier = getVoteIdentifier(); // Function to get the identifier

            $.ajax({
                url: aab_feedbackAjax.ajaxurl,
                type: 'POST',
                data: {
                    action: 'handle_vote',
                    feedbackId: feedbackId,
                    voteValue: voteValue,
                    uniqueIdentifier: voteIdentifier, // Send the unique identifier
                    nonce: aab_feedbackAjax.nonce
                },
                success: function (response) {
                    if (response.success) {

                        // Update vote counts
                        $('body').append(
                            '<div class="aab-feedback-thankyou">Thank you for your feedback!</div>'
                        );
                        setTimeout(function () {
                            $('.aab-feedback-thankyou').hide();
                        }, 1000);

                        $feedbackWrap.find('button[data-value="yes"] .count').text(response.data.counts.yes);
                        $feedbackWrap.find('button[data-value="no"] .count').text(response.data.counts.no);

                        // Update button states
                        $feedbackWrap.find('.feedback-btn').removeClass('active');
                        $button.addClass('active');
                    } else {
                        $('body').append(
                            '<div class="aab-feedback-thankyou">You have already voted.</div>'
                        );
                        setTimeout(function () {
                            $('.aab-feedback-thankyou').hide();
                        }, 1000);
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                },
                complete: function () {
                    // Re-enable buttons
                    $feedbackWrap.find('.feedback-btn').prop('disabled', false);
                }
            });
        });

        // Helper function to get the vote identifier
        function getVoteIdentifier() {
            // If the user is logged in, the identifier could be the user ID (set it in PHP and localized in js)
            if (typeof aab_feedbackAjax.user_id !== 'undefined' && aab_feedbackAjax.user_id !== 0) {
                return aab_feedbackAjax.user_id;
            }
            // Otherwise, if not logged in, use the cookie value
            var voteIdentifier = getCookie('aab_vote_identifier');
            return voteIdentifier;

        }

        // Function to get cookie value
        function getCookie(name) {
            var value = '; ' + document.cookie;
            var parts = value.split('; ' + name + '=');
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        }
    });
})(jQuery);