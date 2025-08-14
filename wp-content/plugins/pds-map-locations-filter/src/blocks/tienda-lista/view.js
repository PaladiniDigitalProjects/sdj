document.addEventListener('DOMContentLoaded', () => {
  const listBlocks = document.querySelectorAll('.pds-tiendas-wrapper');

  listBlocks.forEach(blockWrapper => {

    const attrs = JSON.parse(blockWrapper.dataset.blockInit || '{}');
    const blockId = blockWrapper.id;
    const { ajax_url: ajaxUrl, nonce, i18n: globalI18n } = window.mlf_ajax;
    const initialNumStores = parseInt(attrs.numStores, 10) || 12;
    const initialStyle = attrs.displayStyle || 'list';
    const i18n = {
      loading: globalI18n.loadingLocations || globalI18n.loading,
      noResults: attrs.i18n?.noResults || 'No stores found matching your criteria.',
    };

 
    const resultsContainer = blockWrapper.querySelector('.pds-tiendas-results-container');
    const searchInput = blockWrapper.querySelector(`#${blockId}-mlf-search-input`);
    const taxonomySelects = blockWrapper.querySelectorAll('.mlf-filters-select');
    const viewButtons = blockWrapper.querySelectorAll('.mlf-view-btn');

    let currentSearch = '';
    let currentTaxonomies = {};
    let currentDisplayStyle = initialStyle;
    const numStores = initialNumStores;

   
    const applyDisplayStyle = () => {
      blockWrapper.classList.remove('grid', 'list');
      blockWrapper.classList.add(currentDisplayStyle);
      viewButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.view === currentDisplayStyle));
    };

    applyDisplayStyle();

   
    const fetchStores = debounce(async () => {
      resultsContainer.innerHTML = `<p class="pds-tiendas-loading">${i18n.loading}</p>`;
      blockWrapper.classList.add('is-loading');

      const formData = new FormData();
      formData.append('action', 'mlf_get_tienda_list_html');
      formData.append('nonce', nonce);
      formData.append('search', currentSearch);
      formData.append('taxonomies', JSON.stringify(currentTaxonomies));
      formData.append('numStores', numStores); 
      formData.append('displayStyle', currentDisplayStyle);

      try {
        const res = await fetch(ajaxUrl, { method: 'POST', body: formData });
        const data = await res.json();

        if (data.success) {
          resultsContainer.innerHTML = data.data.html;
        } else {
          resultsContainer.innerHTML = `<p class="pds-tiendas-error">${i18n.noResults}</p>`;
          console.error('AJAX error:', data.data);
        }
      } catch (err) {
        resultsContainer.innerHTML = `<p class="pds-tiendas-error">${i18n.noResults}</p>`;
        console.error('Fetch error:', err);
      } finally {
        blockWrapper.classList.remove('is-loading');
      }
    }, 300);

    // Event listeners

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        currentSearch = e.target.value;
        // numStores NO cambia, siempre es initialNumStores
        fetchStores();
      });
    }

    taxonomySelects.forEach(select => {
      select.addEventListener('change', e => {
        currentTaxonomies[e.target.name] = e.target.value;
        // numStores NO cambia, siempre es initialNumStores
        fetchStores();
      });
    });

    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentDisplayStyle = btn.dataset.view;
        applyDisplayStyle();
        fetchStores();
      });
    });

  
    fetchStores();
  });


  function debounce(fn, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }
});
