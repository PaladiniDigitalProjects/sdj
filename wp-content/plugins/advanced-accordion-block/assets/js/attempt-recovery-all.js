// Function to recover accordion blocks
function recoverAccordionBlocks() {
    const accordionBlocks = document.querySelectorAll(
        '.wp-block-aab-group-accordion.has-warning, .wp-block-aab-accordion-block.has-warning,.wp-block-aab-accordion-item.has-warning'
    );

    accordionBlocks.forEach(block => {
        const recoveryButton = block.querySelector('.block-editor-warning__actions button');
        if (recoveryButton) {
            recoveryButton.click();
        }
    });
}
// Function to check if there are any accordion blocks with warnings
function checkForRecoverableBlocks() {
    const recoverableBlocks = document.querySelectorAll(
        '.wp-block-aab-group-accordion.has-warning, .wp-block-aab-accordion-block.has-warning,.wp-block-aab-accordion-item.has-warning'
    );
    return recoverableBlocks.length > 0;

}



// Function to add or update the recovery button in editor settings
function addRecoveryButtonToSettings() {
    // Check if button already exists
    let button = document.getElementById('accordion-recovery-btn');

    if (!checkForRecoverableBlocks()) {
        // Remove button if no recoverable blocks exist
        if (button) {
            button.remove();
        }
        return;
    }

    // Find the editor settings section
    const settingsSection = document.querySelector('.editor-header__settings');
    if (!settingsSection) return;

    // Create the button if it doesn't exist
    if (!button) {
        button = document.createElement('button');
        button.id = 'accordion-recovery-btn';
        button.className = 'components-button is-primary'; // Match WP UI style
        button.style.marginRight = '8px'; // Add spacing
        button.innerHTML = 'Recover Accordion Blocks';
        button.onclick = recoverAccordionBlocks;

        // Insert button at the beginning of settings section
        settingsSection.insertBefore(button, settingsSection.firstChild);
    }
}

// Try to add button periodically until the settings section is found
function initRecoveryButton() {
    const interval = setInterval(() => {
        if (document.querySelector('.editor-header__settings')) {
            // addRecoveryButtonToSettings();
            if (checkForRecoverableBlocks()) {
                recoverAccordionBlocks();
            }
            clearInterval(interval);
        }
    }, 500);
}

// Function to monitor blocks and update the recovery button dynamically
function observeBlocksForChanges() {
    const editorArea = document.querySelector('.block-editor-writing-flow');
    if (!editorArea) return;

    const observer = new MutationObserver(() => {
        addRecoveryButtonToSettings();
    });

    observer.observe(editorArea, {
        childList: true,
        subtree: true,
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initRecoveryButton();
});

// Also try on editor load
wp.domReady(() => {
    initRecoveryButton();
});
