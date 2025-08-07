document.addEventListener('DOMContentLoaded', () => {
  const listBlocks = document.querySelectorAll('.pds-tiendas-wrapper');

  listBlocks.forEach(blockWrapper => {
    
    const attrs = JSON.parse(blockWrapper.dataset.blockInit || '{}');
    const blockId   = blockWrapper.id;                      
    const { ajax_url: ajaxUrl, nonce, i18n: globalI18n } = window.mlf_ajax;
    const initialNumStores = attrs.numStores;
    const initialStyle     = attrs.displayStyle;
    const i18n = {
      loading: globalI18n.loadingLocations || globalI18n.loading,
      noResults: attrs.i18n?.noResults || 'No stores found matching your criteria.',
    };


    const applyDisplayStyle = () => {
      blockWrapper.classList.remove('grid', 'list');
      blockWrapper.classList.add(currentDisplayStyle);
      viewButtons.forEach(b => b.classList.toggle('active', b.dataset.view === currentDisplayStyle));
    };

    const resultsContainer = blockWrapper.querySelector('.pds-tiendas-results-container');
    const searchInput      = blockWrapper.querySelector(`#${blockId}-mlf-search-input`);
    const taxonomySelects  = blockWrapper.querySelectorAll('.mlf-filters-select');
    const viewButtons      = blockWrapper.querySelectorAll('.mlf-view-btn');

    let currentSearch        = '';
    let currentTaxonomies    = {};
    let currentDisplayStyle  = initialStyle;
    let numStores = parseInt(initialNumStores) || -1;

    blockWrapper.classList.remove('grid', 'list');
    blockWrapper.classList.add(currentDisplayStyle);
    viewButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.view === currentDisplayStyle));

    applyDisplayStyle();

    const fetchStores = debounce(async () => {
      resultsContainer.innerHTML = `<p class="pds-tiendas-loading">${i18n.loading}</p>`;
      blockWrapper.classList.add('is-loading');

      const formData = new FormData();
      formData.append('action',      'mlf_get_tienda_list_html');
      formData.append('nonce',       nonce);
      formData.append('search',      currentSearch);
      formData.append('taxonomies',  JSON.stringify(currentTaxonomies));
      formData.append('numStores', Number.isInteger(numStores) ? numStores : -1);
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
        applyDisplayStyle();
      }
    }, 300);

   
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        currentSearch = e.target.value;
        fetchStores();
        applyDisplayStyle();
      });
    }

    taxonomySelects.forEach(select => {
      select.addEventListener('change', e => {
        currentTaxonomies[e.target.name] = e.target.value;
        fetchStores();
      });
      currentTaxonomies[select.name] = select.value;
    });

  
   viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentDisplayStyle = btn.dataset.view;
        fetchStores();      
        applyDisplayStyle(); 
      });
    });

    
    // fetchStores();
  });

  function debounce(fn, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }
});
