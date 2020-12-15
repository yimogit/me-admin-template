/**
 * Created by gongshw on 14/12/9.
 *
 * Updated by gongshw on 16/7/30.
 */
(function($, undefined) {
  console.log(
    'jquery.areaSelect.js by Gongshw https://github.com/gongshw/jquery.areaSelect.js'
  )

  var AreaSelectStatus = {
    CREATE: 'create',
    MOVE: 'move',
    RESIZE: 'resize',
    NEAR: 'near'
  }
  var Direction = {
    NE: { name: 'NE', x: 1, y: -1, cursor: 'nesw-resize' },
    NW: { name: 'NW', x: -1, y: -1, cursor: 'nwse-resize' },
    SE: { name: 'SE', x: 1, y: 1, cursor: 'nwse-resize' },
    SW: { name: 'SW', x: -1, y: 1, cursor: 'nesw-resize' }
  }
  var DeleteMethod = { CLICK: 'click', DOUBLE_CLICK: 'doubleClick' }

  function AreaSelect($ele, options) {
    this.$ele = $ele
    this.init()
    this.areas = options.initAreas
    this.options = options
    this.status = AreaSelectStatus.CREATE
    this.dragging = false
    this.resizeDirection = null
    this.dragAreaOffset = {}
    this.draw()
  }

  AreaSelect.prototype.get = function() {
    return this.areas
  }

  AreaSelect.prototype.bindChangeEvent = function(handle) {
    this.$canvas.on('areasChange', handle[0])
  }

  AreaSelect.prototype.uninstall = function() {
    this.$canvas.remove()
    this.$ele.data('AreaSelect', null)
  }

  AreaSelect.prototype.reset = function() {
    // console.log('reset')
    var i = 0
    this.areas.forEach(area => {
      setTimeout(() => {
        this.deleteArea(area)
      }, 10 * i++)
    })
    setTimeout(() => {
      this.draw()
    }, 10 * i)
  }
  AreaSelect.prototype.convas_w_h = function() {
    return {
      width: this.$canvas.attr('width'),
      height: this.$canvas.attr('height')
    }
  }
  AreaSelect.prototype.init = function() {
    var $canvas = $('<canvas/>')
    $canvas
      .attr('width', this.$ele.width())
      .attr('height', this.$ele.height())
      .offset(this.$ele.position())
      .css({
        position: 'absolute',
        zIndex: 999
      })
      .appendTo(this.$ele.parent())
    this.$canvas = $canvas
    this.g2d = $canvas[0].getContext('2d')
    var as = this
    var moveDownPoint = {}
    $canvas
      .mousemove(function(event) {
        var offsetX = get_offset_X(event)
        var offsetY = get_offset_Y(event)
        if (as.dragging) {
          as.onDragging(offsetX, offsetY)
        } else {
          as.onMouseMoving(offsetX, offsetY)
        }
      })
      .mousedown(function(event) {
        moveDownPoint = { x: get_offset_X(event), y: get_offset_Y(event) }
        as.onDragStart(get_offset_X(event), get_offset_Y(event))
      })
      .mouseup(function(event) {
        if (
          get_offset_X(event) == moveDownPoint.x &&
          get_offset_Y(event) == moveDownPoint.y
        ) {
          as.onClick(get_offset_X(event), get_offset_Y(event))
        }
        as.onDragStop()
      })
      .dblclick(function(event) {
        as.onDoubleClick(get_offset_X(event), get_offset_Y(event))
      })
  }

  AreaSelect.prototype.onDragStart = function(x, y) {
    this.dragging = true
    switch (this.status) {
      case AreaSelectStatus.RESIZE:
        !this.currentArea ||
          setAreaDirection(this.currentArea, this.resizeDirection)
        break
      case AreaSelectStatus.MOVE:
        this.dragAreaOffset = {
          x: this.currentArea.x - x,
          y: this.currentArea.y - y
        }
        break
      case AreaSelectStatus.CREATE:
        var newArea = {
          x: x,
          y: y,
          width: 0,
          height: 0,
          id: 'p_' + Date.now()
        }
        this.areas.push(newArea)
        this.currentArea = newArea
        this.status = AreaSelectStatus.RESIZE
        break
    }
  }

  AreaSelect.prototype.onDragStop = function() {
    this.dragging = false
    switch (this.status) {
      case AreaSelectStatus.RESIZE:
        if (this.currentArea != undefined) {
          if (this.currentArea.width == 0 && this.currentArea.height == 0) {
            this.deleteArea(this.currentArea)
            this.currentArea = undefined
            this.status = AreaSelectStatus.CREATE
          } else {
            setAreaDirection(this.currentArea, Direction.SE)
            this.triggerChange()
          }
        }
        break
      case AreaSelectStatus.MOVE:
        this.triggerChange()
        break
    }
  }

  AreaSelect.prototype.onMouseMoving = function(x, y) {
    var area = this.getArea(x, y, this.options.padding)
    var $canvas = this.$canvas
    if (area != undefined) {
      this.currentArea = area
      var nearDrag = false
      var dragDirection = null
      var dragPoints = getPositionPoints(area)
      for (var d in dragPoints) {
        if (near({ x: x, y: y }, dragPoints[d], this.options.padding)) {
          nearDrag = true
          dragDirection = Direction[d]
          break
        }
      }
      if (nearDrag) {
        $canvas.css({ cursor: dragDirection.cursor })
        this.status = AreaSelectStatus.RESIZE
        this.resizeDirection = dragDirection
      } else if (this.getArea(x, y, -this.options.padding) != undefined) {
        $canvas.css({ cursor: 'move' })
        this.status = AreaSelectStatus.MOVE
      } else {
        $canvas.css({ cursor: 'auto' })
        this.status = AreaSelectStatus.NEAR
      }
    } else {
      this.currentArea = undefined
      $canvas.css({ cursor: 'crosshair' })
      this.status = AreaSelectStatus.CREATE
    }
    this.draw()
  }

  AreaSelect.prototype.onDragging = function(x, y) {
    var area = this.currentArea
    switch (this.status) {
      case AreaSelectStatus.RESIZE:
        area.width = x - area.x
        area.height = y - area.y
        break
      case AreaSelectStatus.MOVE:
        area.x = x + this.dragAreaOffset.x
        area.y = y + this.dragAreaOffset.y
        break
      case AreaSelectStatus.CREATE:
        break
    }
    area.x = Math.max(0, area.x)
    area.x = Math.min(area.x, this.$canvas[0].width - area.width)
    area.y = Math.max(0, area.y)
    area.y = Math.min(area.y, this.$canvas[0].height - area.height)

    this.draw()
  }

  AreaSelect.prototype.onDoubleClick = function(x, y) {
    var area = this.getArea(x, y, this.options.padding)
    console.log(area, x, y)
    if (
      area != undefined &&
      this.options.deleteMethod == DeleteMethod.DOUBLE_CLICK
    ) {
      this.deleteArea(area)
      this.draw()
    }
  }

  AreaSelect.prototype.onClick = function(x, y) {
    var area = this.getArea(x, y, this.options.padding)
    // console.log('click', area)
    // this.currentArea = area
    // window.currentId = area.data.id
    if (area != undefined && this.options.deleteMethod == DeleteMethod.CLICK) {
      this.deleteArea(area)
      this.draw()
    }
  }

  AreaSelect.prototype.draw = function() {
    var g2d = this.g2d
    /* clear canvas */
    g2d.clearRect(0, 0, this.$canvas[0].width, this.$canvas[0].height)
    /* draw areas */
    g2d.strokeStyle = this.options.area.strokeStyle
    if (this.options.area.rectStyle) {
      g2d.fillStyle = this.options.area.rectStyle
    }
    g2d.lineWidth = this.options.area.lineWidth
    for (var index in this.areas) {
      var area = this.areas[index]
      this.g2d.strokeRect(area.x, area.y, area.width, area.height)
      if (this.options.area.rectStyle) {
        g2d.fillRect(area.x, area.y, area.width, area.height)
      }
    }
    /* draw current area */
    var area = this.currentArea
    // console.log(area)
    g2d.fillStyle = this.options.point.fillStyle
    if (area != undefined) {
      var positionPoints = getPositionPoints(area)
      // console.log(area)
      /* draw position point */
      // g2d.fillStyle = 'red'
      // g2d.beginPath()
      // g2d.fillRect(area.x, area.y, area.width, area.height)
      // g2d.closePath()
      // g2d.fill()

      for (var index in positionPoints) {
        var point = positionPoints[index]
        // point.x = Math.max(0, point.x)
        // point.x = Math.min(point.x, this.$canvas[0].width)
        // point.y = Math.max(0, point.y)
        // point.y = Math.min(point.y, this.$canvas[0].height)

        g2d.beginPath()
        g2d.arc(point.x, point.y, this.options.point.size, 0, Math.PI * 2, true)
        g2d.closePath()
        g2d.fill()
      }
    }
  }
  AreaSelect.prototype.deleteArea = function(area) {
    console.log(area)
    var areas = this.areas
    var index = areas.indexOf(area)
    if (index >= 0) {
      areas.splice(areas.indexOf(area), 1)
      this.currentArea = undefined
      this.triggerChange({ action: 'delete', index: index })
      this.status = AreaSelectStatus.CREATE
    }
  }

  AreaSelect.prototype.getArea = function(x, y, padding) {
    padding = padding === undefined ? 0 : padding
    for (var index in this.areas) {
      var area = this.areas[index]
      var abs = Math.abs
      var x1 = area.x
      var x2 = area.x + area.width
      var y1 = area.y
      var y2 = area.y + area.height
      if (
        padding >= 0 &&
        abs(x1 - x) + abs(x2 - x) - abs(area.width) <= padding * 2 &&
        abs(y1 - y) + abs(y2 - y) - abs(area.height) <= padding * 2
      ) {
        return area
      }
      if (
        padding < 0 &&
        abs(x1 - x) + abs(x2 - x) - abs(area.width) == 0 &&
        abs(y1 - y) + abs(y2 - y) - abs(area.height) == 0 &&
        abs(abs(x1 - x) - abs(x2 - x)) <= abs(area.width) + 2 * padding &&
        abs(abs(y1 - y) - abs(y2 - y)) <= abs(area.height) + 2 * padding
      ) {
        return area
      }
    }
    return undefined
  }

  AreaSelect.prototype.triggerChange = function(data) {
    this.$canvas.trigger('areasChange', {
      areas: this.areas,
      current: this.currentArea,
      action: data && data.action,
      index: data && data.index
    })
  }

  var getPositionPoints = function(area) {
    var points = {}
    for (var d in Direction) {
      points[d] = {
        x: area.x + (area.width * (Direction[d].x + 1)) / 2,
        y: area.y + (area.height * (Direction[d].y + 1)) / 2
      }
    }
    return points
  }

  var setAreaDirection = function(area, direction) {
    if (area != undefined && direction != undefined) {
      var x1 = area.x
      var x2 = area.x + area.width
      var y1 = area.y
      var y2 = area.y + area.height
      var width = Math.abs(area.width)
      var height = Math.abs(area.height)
      var minOrMax = { '1': Math.min, '-1': Math.max }
      area.x = minOrMax[direction.x](x1, x2)
      area.y = minOrMax[direction.y](y1, y2)
      area.width = direction.x * width
      area.height = direction.y * height
    }
  }

  var near = function(point1, point2, s) {
    return (
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) <=
      Math.pow(s, 2)
    )
  }

  var get_offset_X = function(event) {
    return event.offsetX ? event.offsetX : event.originalEvent.layerX
  }

  var get_offset_Y = function(event) {
    return event.offsetY ? event.offsetY : event.originalEvent.layerY
  }

  $.fn.areaSelect = function(method) {
    var as
    var defaultOptions = {
      initAreas: [],
      deleteMethod: 'click', // or doubleClick
      padding: 3,
      area: { strokeStyle: '#21a9bd', rectStyle: '', lineWidth: 1 },
      point: { size: 3, fillStyle: 'black' }
    }
    as = this.data('AreaSelect')
    if (as == undefined && (method === undefined || $.isPlainObject(method))) {
      var options = $.extend({}, defaultOptions, method)
      as = new AreaSelect(this, options)
      this.data('AreaSelect', as)
    } else {
      if (as == undefined) {
        console.error('pls invoke areaSelect() on this element first!')
      } else if (as[method] != undefined) {
        return as[method](Array.prototype.slice.call(arguments, 1))
      } else {
        console.error('no function ' + method)
      }
    }
  }
})(jQuery)
