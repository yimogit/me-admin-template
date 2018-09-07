<template>
  <div :id="editorId" class="custom-editor-content"></div>
</template>

<script>
/* eslint-disable */

// v2.1.23
import xss from 'xss'
// import E from 'wangeditor'
export default {
  name: 'editor',
  props: {
    value: {
      type: String
    },
    category: {
      type: String,
      default: 'editor'
    },
    filterStyle: {
      type: Boolean,
      default: true
    },
    isRender: {
      type: Boolean,
      default: true
    },
    xssFilter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editorId: 'editor_' + Date.now() + ~~(Math.random() * 1000),
      _editor: null,
      currentValue: '',
      formName: 'file',
      editContent: null,
      hasInit: false,
      hasChange: false
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.currentValue = val
      }
    },
    currentValue(val) {
      val = this.xssFilter ? xss(val) : val // 显示的时候防止有xss注入
      this.$nextTick(() => {
        this._editor.$txt.html(val)
      })
    }
  },
  mounted() {
    if (this.isRender === true) {
      this.init()
    }
  },
  methods: {
    init() {
      const _this = this
      if (_this.hasInit) {
        console.log('编辑器已初始化')
        return
      }
      var E = require('wangeditor')
      _this.pluginConfig(E)
      var editor = new E(this.editorId)
      _this.editorConfig(editor)
      _this.imageConfig(editor)
      _this.hasInit = true
      editor.onchange = e => {
        console.log(e)
        _this.hasChange = true
        this.$emit('input', _this._editor.$txt.html())
      }
      editor.create()
      var _xhrUploadImg = editor.xhrUploadImg
      editor.xhrUploadImg = function(opt) {
        window.__currentEditor = editor
        _xhrUploadImg(opt)
      }
      _this.currentValue = _this.value
      this._editor = editor
    },
    getEditor() {
      return this._editor
    },
    setContent(html, sync) {
      if (!this.hasInit) {
        console.log('请先初始化编辑器')
        return
      }
      this.currentValue = html
      if (sync !== false) {
        this.$emit('input', html)
      }
    },
    editorConfig(editor) {
      //  editor.customConfig.debug = process.env.NODE_ENV === 'development'
      // 自定义菜单配置
      editor.config.menus = [
        'source',
        '|',
        'bold',
        'underline',
        'italic',
        'strikethrough',
        'eraser',
        'forecolor',
        'bgcolor',
        '|',
        'quote',
        'fontfamily',
        'fontsize',
        'head',
        'unorderlist',
        'orderlist',
        'alignleft',
        'aligncenter',
        'alignright',
        '|',
        'link',
        'unlink',
        // 'table',//不能和选区混用
        // 'emotion',
        '|',
        'img',
        'video',
        // 'location',
        // 'insertcode',
        '|',
        'undo',
        'redo'
        // 'fullscreen'
      ]
      editor.config.zIndex = 100
      // 关闭粘贴样式的过滤
      editor.config.pasteFilter = this.filterStyle
    },
    imageConfig: function(editor) {
      const _this = this
      editor.config.uploadImgUrl = this.$api.common.getUploadUrl()
      // editor.config.withCredentials = true
      editor.config.uploadImgFileName = 'file'
      // 配置自定义参数（举例）
      editor.config.uploadParams = {
        category: _this.category || 'Common'
      }
      // 设置 headers（举例）
      editor.config.uploadHeaders = {
        Authorization: localStorage.token
      }
      // 自定义load事件
      editor.config.uploadImgFns.onload = (resultText, xhr) => {
        var originalName = editor.uploadImgOriginalName || ''
        console.log(xhr)
        if (xhr.status !== 200) {
          return _this.$ui.pages.warn(resultText)
        }
        var res = JSON.parse(resultText)
        if (res.status !== 1) {
          return _this.$ui.pages.warn(res.msg)
        }
        window.__currentEditor.command(
          null,
          'insertHtml',
          '<img src="' + res.data.fileUrl + '" alt="' + originalName + '" />'
        )
      }

      // 自定义timeout事件
      editor.config.uploadImgFns.ontimeout = function(xhr) {
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        _this.$ui.pages.warn('上传超时')
      }

      // 自定义error事件
      editor.config.uploadImgFns.onerror = function(xhr) {
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        _this.$ui.pages.warn('上传错误')
      }
    },
    pluginConfig(E) {
      const _this = this
      if (window.EditorInitPlugin === true) {
        return
      }
      window.EditorInitPlugin = false
      // 获取 wangEditor 构造函数和 jquery
      // var E = require('wangeditor')
      var $ = require('jquery')

      window.$ = $
      window.jQuery = $
      // 通过 E.plugin 注入插件代码
      E.plugin(function() {
        window.EditorInitPlugin = true
        // console.log('init', this)
        // 此处的 this 指向 editor 对象本身
        var editor = this
        var $txt = editor.$txt
        var isRendered = false
        var $currentImg = null
        var $imgMap = $(
          '<a href="#" class="editor-area-picker"><i class="wangeditor-menu-img-location"></i></a>'
        )
        function render() {
          setTimeout(function() {
            if (isRendered || $('.editor-area-picker', editor).length > 0) {
              return
            }
            $imgMap.click(function(e) {
              showMapDialog()
              e.preventDefault()
              e.stopPropagation()
            })
            console.log(editor.$txt.nextAll('.txt-toolbar').children()[1])
            var toolbar = editor.$txt.nextAll('.txt-toolbar').children()[1]
            if (toolbar) $(toolbar).append($imgMap)
            isRendered = true
          }, 100)
        }
        $txt.on('click', 'map', function(e) {
          // console.log('map', e)
          if (e.currentTarget.id) {
            $('img[usemap="#' + e.currentTarget.id + '"]').click()
          }
          return false
        })
        $txt.on('click', 'img', function(e) {
          render()
          $currentImg = $(e.currentTarget)
          return false
        })
        function showMapDialog() {
          $(document.body).addClass('edit-img-overflow')
          // var imgSrc = $currentImg.attr('src')
          var $imgMapMask = $('<div id="custom-editor-imgmap-mask"></div>')
          var $buttonContainer = $('<div id="editor-button-container"></div>')
          var $editContainer = $('<div id="editor-edit-container"></div>')
          var $okButton = $(
            '<button class="el-button el-button--parmary el-button--small">保存</button>'
          )
          var $clearButton = $(
            '<button class="el-button el-button--danger el-button--small">重置</button>'
          )
          var $cancelButton = $(
            '<button <button class="el-button el-button--default el-button--small">取消</button>'
          )
          $buttonContainer.append($okButton)
          $buttonContainer.append($clearButton)
          $buttonContainer.append($cancelButton)
          // 图片容器
          var $imgContainer = $('<div  id="editor-image-container"></div>')
          // 图片对象
          var $newImg = $currentImg.clone() // $('<img src="' + imgSrc + '" id="editor-image" />')

          // 添加图片容器
          $imgContainer.append($newImg)
          // 弹层中
          $imgMapMask.append($imgContainer)
          // 编辑区域
          $editContainer.append($buttonContainer)
          // 添加编辑区域
          $imgMapMask.append($editContainer)
          bindEvent()
          $(document.body).append($imgMapMask)
          if ($newImg.areaSelect) {
            initArea()
          } else {
            _this.$ui.pages.dynamicLoadJs(
              '/static/js/jquery.areaSelect.js',
              function() {
                $(function() {
                  initArea()
                })
              }
            )
          }
          function initArea() {
            var mapId = $currentImg.attr('usemap')
            var convas_w_h = {
              width: parseInt($currentImg.attr('data-width')),
              height: parseInt($currentImg.attr('data-height'))
            }
            console.log(convas_w_h)
            var defAreas = []
            for (let index = 0; index < $(mapId).children().length; index++) {
              const element = $(mapId).children()[index]
              var coords = $(element)
                .attr('coords')
                .split(',')
                .map(s => parseInt(s))
              console.log(coords)
              if (convas_w_h.width > 0 && convas_w_h.height > 0) {
                var imageWidth =
                  parseInt($currentImg.css('width')) / convas_w_h.width
                var imageHeight =
                  parseInt($currentImg.css('height')) / convas_w_h.height
                console.log(imageWidth, imageHeight)
                coords = [
                  parseInt(coords[0] * imageWidth),
                  parseInt(coords[1] * imageHeight),
                  parseInt(coords[2] * imageWidth),
                  parseInt(coords[3] * imageHeight)
                ]
                coords = coords.map(e => parseFloat(e.toFixed(1)))
                console.log(coords)
              }

              // 默认坐标
              defAreas.push({
                x: coords[0],
                y: coords[1],
                width: coords[2] - coords[0],
                height: coords[3] - coords[1],
                id: 'np_' + Date.now() + '_' + index,
                range: coords,
                href: $(element).attr('href')
              })
              changeInput(defAreas)
            }
            var options = {
              deleteMethod: 'doubleClick',
              initAreas: defAreas,
              padding: 3,
              area: {
                strokeStyle: '#21a9bd',
                rectStyle: '#21a9bd36',
                lineWidth: 1
              },
              point: { size: 3, fillStyle: '#21a9bd' }
            }
            $newImg.areaSelect(options)
            var arrData = []
            $newImg.areaSelect('bindChangeEvent', function(event, data) {
              console.log(data)
              if (
                data &&
                data.action === 'delete' &&
                arrData.length > data.index
              ) {
                $('#editor_editor_' + arrData[data.index].id).remove()
                // todo 删除
                arrData.splice(data.index, 1)
                return
              }
              // console.log(data)
              data.areas.forEach(item => {
                var areaInfo = arrData.find(s => s.id === item.id)
                if (areaInfo) {
                  areaInfo.range = [item.x, item.y, item.width, item.height]
                } else {
                  areaInfo = {
                    id: item.id
                  }
                  areaInfo.range = [item.x, item.y, item.width, item.height]
                  arrData.push(areaInfo)
                }
              })
              changeInput(arrData)
            })
          }
          function changeInput(arr) {
            // console.log(arr)
            arr.forEach(e => {
              var txt =
                'x:' +
                e.range[0] +
                ',y:' +
                e.range[1] +
                ',width:' +
                e.range[2] +
                ',height:' +
                e.range[3]
              if ($('#hotspot_' + e.id).length === 1) {
                $('#hotspot_' + e.id).text(txt)
              } else {
                var $input = $(
                  `<p class="editor-edit-hotspot" id="editor_editor_${
                    e.id
                  }"><span>热点区域：</span><span id="hotspot_${
                    e.id
                  }">${txt}</span><br/><span>链接地址：</span><input type="text" style="width:60%" id="val_${
                    e.id
                  }" value="${e.href || ''}"/></p>`
                )
                // console.log($input)
                $('#editor-edit-container').append($input)
              }
            })
          }
          function closeDialog() {
            $imgMapMask.remove()
            $(document.body).removeClass('edit-img-overflow')
          }
          function bindEvent() {
            $cancelButton.click(function(e) {
              closeDialog()
            })
            $okButton.click(function(e) {
              var area = $newImg.areaSelect('get')
              var oldMap = $newImg.attr('usemap')
              $(oldMap).remove()
              if (area.length === 0) {
                closeDialog()
                return
              }
              var convas_w_h = $newImg.areaSelect('convas_w_h')
              // console.log(area)
              var mapId = 'editor_map_' + Date.now()
              $currentImg.attr('usemap', '#' + mapId)
              $currentImg.addClass('custom-area-map-image')
              $currentImg.attr('data-width', convas_w_h.width)
              $currentImg.attr('data-height', convas_w_h.height)

              var $imgNextMap = $(
                '<map name="' + mapId + '" id="' + mapId + '" />'
              )
              $imgNextMap.addClass('custom-editor-map-tag')
              area.forEach(item => {
                var href = $('#val_' + item.id).val()
                if (href) {
                  href = ' href ="' + href + '"' // title="' + href + '"'
                }
                var bl = convas_w_h.width + ',' + convas_w_h.height
                // console.log(href)
                $imgNextMap.append(
                  $(
                    '<area shape="rect" coords="' +
                      [
                        item.x,
                        item.y,
                        item.x + item.width,
                        item.y + item.height
                      ].join(',') +
                      '" bl="' +
                      bl +
                      '" ' +
                      href +
                      ' />'
                  )
                )
              })
              $imgNextMap.insertAfter($currentImg)
              console.log(editor.$txt.html())
              _this.$emit('input', editor.$txt.html())
              closeDialog()
            })
            $clearButton.click(function(e) {
              $newImg.areaSelect('reset')
            })
          }
        }
      })
    }
  }
}
</script>
<style>
/* .w-e-toolbar {
  flex-wrap: wrap;
} */
.custom-editor-content {
  width: 100% !important;
  height: auto !important;
  min-height: 400px;
}

#custom-editor-imgmap-mask {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  display: block;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.56);
  user-select: none;
  -webkit-user-select: none;
}
#editor-button-container {
  height: 50px;
  line-height: 50px;
  text-align: center;
  min-width: 300px;
}
#editor-button-container button {
  margin-right: 10px;
}
#editor-image-container {
  position: absolute;
  text-align: center;
  padding: 50px;
  left: 0;
  width: 75%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
#custom-editor-imgmap-mask img {
}
#editor-edit-container {
  position: absolute;
  width: 25%;
  height: 100%;
  right: 0;
  overflow: auto;
  border-left: 1px solid #78cad6;
}
.editor-edit-hotspot {
  margin: 5px;
  color: white;
  line-height: 35px;
  min-width: 300px;
}
.edit-img-overflow {
  overflow: hidden;
}
</style>
