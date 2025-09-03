(function (wp) {
    const {subscribe} = wp.data;
    const {select} = wp.data;

    let previousBlocks = select('core/block-editor').getBlocks();
    const detectDeletedBlock = () => {
        subscribe(() => {
            const currentBlocks = select('core/block-editor').getBlocks();
            // Map block IDs from the previous and current states
            const previousBlockIds = previousBlocks.map(block => block.attributes.uniqueId);
            const currentBlockIds = currentBlocks.map(block => block.attributes.uniqueId);
            // Find deleted block IDs
            const deletedBlockIds = previousBlockIds.filter(
                uniqueId => !currentBlockIds.includes(uniqueId)
            );

            if (deletedBlockIds.length > 0) {
                deletedBlockIds.forEach(deletedId => {
                    // Trigger your custom logic here
                    const cookieName = 'aab-completion-status-group-accordion-' + deletedId;
                    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

                    const cookieNameForChecklist = 'aab-checklist-status-group-accordion-' + deletedId;
                    document.cookie = cookieNameForChecklist + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

                });
            }

            // Update the previous blocks state
            previousBlocks = currentBlocks;
        });
    };


    // Initialize the detection
    detectDeletedBlock();
})(window.wp);