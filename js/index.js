(function () {

  function PlayBox () {
    this.titleArea = ''
    this.timeArea = ''
    this.listTag = ''

    this.init()
  }
  PlayBox.prototype = {
    init: function() {
      this.titleArea = document.querySelector('.title')
      this.timeArea = document.querySelector('.time')
      this.listTag = document.getElementsByClassName('list')

      this.setPlayBox()
      this.setMusicList()

    },
    setPlayBox: function(id = "0") {
      this.titleArea.innerText = PlayBox.data[id].title
      this.timeArea.innerText = PlayBox.data[id].playtime
    },
    setMusicList: function() {
      var listSetTag = document.querySelector('.list_set')
      var _this = this

      PlayBox.data.forEach(function (list, index) {
        var listItem = `<a href="#" class="link" aria-selected="true">[<span class="time">${list.playtime}</span>] <span class="title">${list.title}</span> (<span class="artist">${list.artist}</span>)</a>`
        var li = document.createElement('li')

        li.classList.add('list')
        li.innerHTML = listItem

        li.onclick = function (event) {
          _this.setPlayBox(index)

          Array.from(_this.listTag).forEach(function (list) {
            list.classList.remove('active')
          })

          this.classList.add('active')
        }

        listSetTag.appendChild(li)
      })
    },
  }

  PlayBox.data = musicListData

  return new PlayBox()
})()