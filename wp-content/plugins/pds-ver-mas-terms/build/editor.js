(() => {
  "use strict";

  const blockJson = JSON.parse(
    '{"apiVersion":2,"name":"pds/terms","title":"PDS: List Terms (Ver más)","category":"widgets","icon":"category","description":"Lista términos con límite y opción Ver más / Ver menos.","supports":{"html":false},"attributes":{"taxonomy":{"type":"string","default":"ambito"},"limit":{"type":"number","default":5},"show_more":{"type":"boolean","default":true},"show_count":{"type":"boolean","default":false},"show_description":{"type":"boolean","default":false},"selection_mode":{"type":"string","default":"all"},"term_ids":{"type":"array","default":[],"items":{"type":"integer"}},"excluded_ids":{"type":"array","default":[],"items":{"type":"integer"}}},"editorScript":"file:./build/editor.js","script":"file:./build/frontend.js","editorStyle":"file:./build/style-style.css","style":"file:./build/style-style.css","textdomain":"pds-ver-mas-terms"}'
  );

  const el = wp.element;
  const { registerBlockType } = wp.blocks;
  const { InspectorControls } = wp.blockEditor || wp.editor;
  const { PanelBody, ToggleControl, RangeControl, SelectControl, CheckboxControl, Button, Spinner } = wp.components;
  const { __ } = wp.i18n;
  const ServerSideRender = ("undefined" != typeof wp && wp.serverSideRender) ? wp.serverSideRender : null;
  const apiFetch = wp.apiFetch;

  const TAXONOMY_OPTIONS = [
    { label: __("Selecciona una taxonomía", "pds-ver-mas-terms"), value: "" },
    { label: "category", value: "category" },
    { label: "post_tag", value: "post_tag" },
    { label: __("Ámbitos", "pds-ver-mas-terms"), value: "ambito" },
    { label: __("Comunidad Autónoma", "pds-ver-mas-terms"), value: "comunidad_autonoma" },
    { label: __("Provincia", "pds-ver-mas-terms"), value: "provincia" },
  ];

  registerBlockType(blockJson.name, {
    ...blockJson,
    edit: function (props) {
      const { attributes, setAttributes, className } = props;
      const {
        taxonomy,
        limit,
        show_more,
        show_count,
        show_description,
        selection_mode,
        term_ids,
        excluded_ids,
      } = attributes;

      const [availableTerms, setAvailableTerms] = el.useState([]);
      const [loadingTerms, setLoadingTerms] = el.useState(false);

      el.useEffect(function () {
        if (!taxonomy) {
          setAvailableTerms([]);
          return;
        }
        setLoadingTerms(true);
        apiFetch({ path: "/pds/v1/terms?taxonomy=" + encodeURIComponent(taxonomy) + "&per_page=100" })
          .then(function (res) {
            setAvailableTerms((res && res.terms) || []);
          })
          .catch(function () {
            setAvailableTerms([]);
          })
          .finally(function () {
            setLoadingTerms(false);
          });
      }, [taxonomy]);

      function setSelected(termId, checked) {
        const next = checked ? term_ids.concat([termId]) : term_ids.filter((id) => id !== termId);
        setAttributes({ term_ids: next });
      }

      function setIncluded(termId, checked) {
        // checked = el término se muestra (no está en la lista de exclusión)
        const next = checked ? excluded_ids.filter((id) => id !== termId) : excluded_ids.concat([termId]);
        setAttributes({ excluded_ids: next });
      }

      let pickerBody;
      if (!taxonomy) {
        pickerBody = el.createElement("p", null, __("Elige antes una taxonomía.", "pds-ver-mas-terms"));
      } else if (loadingTerms) {
        pickerBody = el.createElement(Spinner, null);
      } else if (!availableTerms.length) {
        pickerBody = el.createElement("p", null, __("Esta taxonomía no tiene términos.", "pds-ver-mas-terms"));
      } else if (selection_mode === "selected") {
        pickerBody = el.createElement(
          "div",
          null,
          el.createElement(
            "div",
            { style: { display: "flex", gap: "8px", marginBottom: "8px" } },
            el.createElement(
              Button,
              {
                variant: "secondary",
                size: "small",
                onClick: () => setAttributes({ term_ids: availableTerms.map((t) => t.term_id) }),
              },
              __("Seleccionar todos", "pds-ver-mas-terms")
            ),
            el.createElement(
              Button,
              { variant: "secondary", size: "small", onClick: () => setAttributes({ term_ids: [] }) },
              __("Ninguno", "pds-ver-mas-terms")
            )
          ),
          availableTerms.map((t) =>
            el.createElement(CheckboxControl, {
              key: t.term_id,
              label: t.name,
              checked: term_ids.indexOf(t.term_id) !== -1,
              onChange: (checked) => setSelected(t.term_id, checked),
            })
          )
        );
      } else {
        pickerBody = el.createElement(
          "div",
          null,
          el.createElement(
            "div",
            { style: { display: "flex", gap: "8px", marginBottom: "8px" } },
            el.createElement(
              Button,
              { variant: "secondary", size: "small", onClick: () => setAttributes({ excluded_ids: [] }) },
              __("Incluir todos", "pds-ver-mas-terms")
            ),
            el.createElement(
              Button,
              {
                variant: "secondary",
                size: "small",
                onClick: () => setAttributes({ excluded_ids: availableTerms.map((t) => t.term_id) }),
              },
              __("Excluir todos", "pds-ver-mas-terms")
            )
          ),
          availableTerms.map((t) =>
            el.createElement(CheckboxControl, {
              key: t.term_id,
              label: t.name,
              checked: excluded_ids.indexOf(t.term_id) === -1,
              onChange: (checked) => setIncluded(t.term_id, checked),
            })
          )
        );
      }

      return el.createElement(
        el.Fragment,
        null,
        el.createElement(
          InspectorControls,
          null,
          el.createElement(
            PanelBody,
            { title: __("Ajustes de Términos", "pds-ver-mas-terms"), initialOpen: true },
            el.createElement(SelectControl, {
              label: __("Taxonomía", "pds-ver-mas-terms"),
              value: taxonomy,
              options: TAXONOMY_OPTIONS,
              onChange: (value) => setAttributes({ taxonomy: value, term_ids: [], excluded_ids: [] }),
              help: __("Ej: category, post_tag, tu_taxonomia_personalizada", "pds-ver-mas-terms"),
            }),
            el.createElement(RangeControl, {
              label: __('Límite visible (antes de "Ver más")', "pds-ver-mas-terms"),
              value: limit,
              onChange: (value) => {
                let n = parseInt(value, 10);
                if (Number.isNaN(n) || n < 0) n = 0;
                setAttributes({ limit: n });
              },
              min: 0,
              max: 50,
              help: __("0 = sin límite (se muestran todos, sin botón)", "pds-ver-mas-terms"),
            }),
            el.createElement(ToggleControl, {
              label: __("Mostrar botón Ver más", "pds-ver-mas-terms"),
              checked: show_more,
              onChange: (value) => setAttributes({ show_more: !!value }),
            }),
            el.createElement(ToggleControl, {
              label: __("Mostrar conteo", "pds-ver-mas-terms"),
              checked: show_count,
              onChange: (value) => setAttributes({ show_count: !!value }),
            }),
            el.createElement(ToggleControl, {
              label: __("Mostrar descripción", "pds-ver-mas-terms"),
              checked: show_description,
              onChange: (value) => setAttributes({ show_description: !!value }),
            })
          ),
          el.createElement(
            PanelBody,
            { title: __("Qué términos mostrar", "pds-ver-mas-terms"), initialOpen: true },
            el.createElement(SelectControl, {
              label: __("Selección", "pds-ver-mas-terms"),
              value: selection_mode,
              options: [
                { label: __("Todos los términos", "pds-ver-mas-terms"), value: "all" },
                { label: __("Términos específicos", "pds-ver-mas-terms"), value: "selected" },
              ],
              help:
                selection_mode === "selected"
                  ? __("Marca solo los términos que quieres mostrar.", "pds-ver-mas-terms")
                  : __("Se muestran todos; puedes desmarcar los que quieras excluir.", "pds-ver-mas-terms"),
              onChange: (value) => setAttributes({ selection_mode: value }),
            }),
            pickerBody
          )
        ),
        el.createElement(
          "div",
          { className: className },
          ServerSideRender
            ? el.createElement(ServerSideRender, { block: blockJson.name, attributes: attributes })
            : el.createElement("p", null, __("Vista previa no disponible: ServerSideRender no encontrado.", "pds-ver-mas-terms"))
        )
      );
    },
    save: () => null,
  });
})();
