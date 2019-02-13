(function () {

  function PlayBox () {
    this.titleArea = ''
    this.timeArea = ''
    this.listTag = ''

    this.init()
  }
  PlayBox.prototype = {
    init: function() {
      this.index = 0
      this.playStatus = false
      this.playSetInterval = null
      this.currentTime = "00:00"

      this.titleArea = document.querySelector('.title')
      this.timeArea = document.querySelector('.time')
      this.playButton = document.querySelector('.play')
      this.stopButton = document.querySelector('.stop')
      this.prevButton = document.querySelector('.prev')
      this.nextButton = document.querySelector('.next')
      this.listTag = document.getElementsByClassName('list')

      this.playButton.addEventListener("click",this.clickPlayButton.bind(this))
      this.stopButton.addEventListener("click",this.clickStopButton.bind(this))
      this.prevButton.addEventListener("click",this.clickPrevButton.bind(this))
      this.nextButton.addEventListener("click",this.clickNextButton.bind(this))

      this.setPlayBox(0, PlayBox.data[0].playtime)
      this.setMusicList()

    },
    setPlayBox: function(id, playTime) {
      this.index = id
      this.titleArea.innerText = PlayBox.data[this.index].title

      if (playTime) {
        this.timeArea.innerText = playTime
      } else {
        this.timeArea.innerText = "00:00"
      }
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
          _this.setPlayBox(index, PlayBox.data[index].playtime)

          Array.from(_this.listTag).forEach(function (list) {
            list.classList.remove('active')
          })

          this.classList.add('active')
        }
        listSetTag.appendChild(li)
      })
    },
    playFunction: function () {
      this.setPlayBox(this.index, this.currentTime)
      clearInterval(this.playSetInterval)
      if (this.playStatus) {
        var time = this.currentTime.split(":")

        this.playSetInterval = setInterval(() => {
          if (parseInt(time.join('')) > parseInt(PlayBox.data[this.index].playtime.replace(':', ''))-2) {
            clearInterval(this.playSetInterval)
            this.clickNextButton()
          }

          if (time[1] > 58) {
            time[1] = pad(0, 2)
            time[0] = pad(parseInt(time[0]) + 1, 2)
          } else {
            time[1] = pad(parseInt(time[1]) + 1, 2)
          }

          this.currentTime = time.join(':')
          this.setPlayBox(this.index, this.currentTime)
        }, 500)
      } else {
        clearInterval(this.playSetInterval)
      }
    },
    clickPlayButton: function () {
      this.playStatus = !this.playStatus
     this.playButton.innerText = this.playStatus ? "일시중지" : "재생"

      this.playFunction()
    },
    clickStopButton: function () {
      this.currentTime = "00:00"
      this.playStatus = !this.playStatus
      this.playButton.innerText = "재생"

      clearInterval(this.playSetInterval)
      this.setPlayBox(this.index, this.currentTime)
    },
    clickPrevButton: function () {
      this.currentTime = "00:00"

      if(this.index <= 0) {
        this.index = PlayBox.data.length - 1;
      } else {
        this.index--
      }

      this.playFunction()
    },
    clickNextButton: function () {
      this.currentTime = "00:00"

      if(this.index > PlayBox.data.length -2) {
        this.index = 0;
      } else {
        this.index++
      }

      this.playFunction()
    }
  }

  PlayBox.data = musicListData

  return new PlayBox()
})()

// todo: 1초씩 더 가는거 해결
// todo: 활성화 됐을 때 빨간색 포인트
