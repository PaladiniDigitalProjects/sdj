var $ = jQuery;

var $horizontalAccordions = $(`.wp-block-aab-horizontal-accordion`);

$horizontalAccordions.each(function() {
  const $horizontalAccordion = $(this);
  const event = $horizontalAccordion.data('activator-event') === 'hover' ? 'mouseenter' : 'click';

  const $accordionItems = $horizontalAccordion.find('> .wp-block-aab-horizontal-accordion-item');
  const $activeAccordions = $accordionItems.filter('.active');
  const $firstActiveAccordion = $activeAccordions.first();

  if ($firstActiveAccordion.length) {
    $accordionItems.removeClass('active');
    $firstActiveAccordion.addClass('active');
  } else {
    $accordionItems.first().addClass('active');
  }

  $accordionItems.on(event, function () {
    const $accordionItem = $(this);
    $accordionItems.removeClass('active');
    $accordionItem.addClass('active');
  });
});
