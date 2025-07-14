class Mlf {
  markers = []
  locations = []
  map = null
  filters = {
    taxonomies: {},
  }
  infoWindow = new google.maps.InfoWindow()

  constructor() {
    this.map = new google.maps.Map(
      document.querySelector('.mlf-map'),
      {
        center: { lat: 40.1909526, lng: -5.9609863 },
        zoom: 6,
      }
    )
    const _this = this
    jQuery('.mlf-container nav .filters').on('change', function (e) {
      _this.filters['taxonomies'][e.target.name] = e.target.value
      _this.getLocations()
    })

    jQuery('.mlf-container nav .mlf-search').on('keyup', function (e) {
      if (_this.timeoutSearch) {
        clearTimeout(_this.timeoutSearch)
      }
      _this.timeoutSearch = setTimeout(() => {
        _this.filters['search'] = e.target.value
        _this.getLocations()
      }, 400);
    })

    this.getLocations()

    this.map.addListener('bounds_changed', () => {
      this.showLocationsInBounds()
    })
  }

  setZoomAndPositionMap() {
    const bounds = new google.maps.LatLngBounds()

    this.markers.forEach(
      marker => {
        bounds.extend(marker.getPosition())
      }
    )

    this.map.fitBounds(bounds)
  }

  resetZoomAndPositionMap () {
    this.map.position = {lat: -40.1909526, lng: -5.9609863}
  }

  
  showLocationsInBounds() {
    jQuery('.mlf-location').hide()
    this.markers.forEach(
      marker => {
        if (this.map.getBounds().contains(marker.getPosition())) {
          jQuery('.mlf-location#location-' + marker.id).show()
        }
      }
    )
  }

  setFiltersMinMaxPositions() {
    const latNEValue = map.getBounds().getNorthEast().lat()
    const longNEValue = map.getBounds().getNorthEast().lng()
    const latSWValue = map.getBounds().getSouthWest().lat()
    const longSWValue = map.getBounds().getSouthWest().lng()

    // this.filters[]
  }

  setMarkers() {
    const map = this.map
    this.markers.forEach(
      marker => marker.setMap(null),
    )
    this.markers = this.locations.map(
      location => {
        const position = location.position

        return new google.maps.Marker({
          position,
          map,
          infoWindow: location.infoWindow,
          id: location.id,
          title: location.title,
          ...location,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6,
            strokeWeight: 1,
            fillColor: '#F00',
            fillOpacity: 1,
            ...location.icon,
          },
        })
      }
    )

    this.markers.forEach(
      marker => {
        const _this = this
        google.maps.event.addListener(marker, 'click', function () {
          _this.infoWindow.setContent(marker.infoWindow)
          _this.infoWindow.open(map, marker)
        });
      }
    )
    if (this.markers.length > 0) {
      this.setZoomAndPositionMap()
    } else {
      this.resetZoomAndPositionMap()
    }
  }

  getLocations() {
    var data = {
      'action': 'get_locations',
      ...this.filters,
    }
    var dataMarkers = {
      ...data,
      'action': 'get_locations_markers',
    }
    jQuery('.mlf-locations-container .mlf-locations-placeholder').show()

    jQuery.post({
      url: mlfData.ajaxUrl,
      data,
      success: response => {
        jQuery('.mlf-locations-container .mlf-locations-placeholder').hide()
        jQuery('.mlf-locations-container .mlf-locations').html(response)
      },
    })

    jQuery.post({
      url: mlfData.ajaxUrl,
      data: dataMarkers,
      dataType: 'JSON',
      success: response => {
        this.locations = response
        this.setMarkers()
      }
    })

  }
}

(function ($) {
  $(document).ready(function() {
    new Mlf($)
  })
})(jQuery)
