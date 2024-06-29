document.addEventListener("DOMContentLoaded", () => { 

  const counter = document.querySelector('.timer__counter'),
        currentCount = document.querySelector('.widget__title__count'),
        totalCount = document.querySelector('.widget__title__total'),
        text = document.querySelector('.widget__text'),
        tasksArray = [
          'Созвониться с клиентом до 23.05.24 12:00',
          'Созвониться с клиентом после 23.05.24 12:00',
          'Созвониться с клиентом до 23.05.24 12:00',
          'Созвониться с клиентом после 23.05.24 12:00',
          'Созвониться с клиентом до 23.05.24 12:00',
          'Созвониться с клиентом после 23.05.24 12:00',
          'Созвониться с клиентом до 23.05.24 12:00',
        ],

        inner = (node, children) => {

          const errMessage = 'selector not exist'

          if (node !== null && node !== undefined) {
            new Promise((resolve, reject) => {
              node.innerHTML = ''
              resolve(node)
              reject(err => console.warn(err))
            })
            .then(() => {
              node.innerHTML = children
            })            
          } else {
            console.warn(errMessage)
            return
          }

        },

        insert = (node, children) => {

          const errMessage = 'selector not exist'

          if (node !== null && node !== undefined) {
            new Promise((resolve, reject) => {
              node.innerHTML = ''
              resolve(node)
              reject(err => console.warn(err))
            })
            .then(() => {
              node.insertAdjacentHTML('beforeend', children)
            })            
          } else {
            console.warn(errMessage)
            return
          }

        },

        render = (count, arr) => {

          if (arr instanceof Array && arr.length > 0) {

            insert(counter, `<span>${count}/${arr.length}</span>`)

            if (count === arr.length) {
              insert(text, `Следующее действие: ${arr[0]}`)
            } else {
              insert(text, `Следующее действие: ${arr[count]}`)
            }

            inner(currentCount, count)

            inner(totalCount, arr.length)

          }
        
        }

  let count = 0
  render(count, tasksArray)



  const svgAnimate = (...args) => {

    const [target, ...config] = args
    const elements = document.querySelectorAll(target)      
    const {attribute, duration, count, from, to, fill} = config[0]
    let _attr, _dur, _count, _from, _to, _fill

    attribute ? _attr = `attributeName=${attribute}` :  _attr = null
    duration ? _dur = `dur=${duration.replace(/\s/g, '')}` :  _dur = null
    count ? _count = `repeatCount=${count}` :  _count = null
    from ? _from = `from=${from.replace(/\s/g, '')}` :  _from = null
    to ? _to = `to=${to.replace(/\s/g, '')}` :  _to = null
    fill ? _fill = `fill=${fill}` :  _fill = null
    
    const animate = `
      <animate ${_attr} ${_dur} ${_count} ${_from} ${_to} ${_fill}>
      </animate>
    `

    try {
      if (elements.length > 0) {
        elements.forEach( el => {
          const anim = el.querySelector('animate')
          if (anim) anim.remove()
          if (el !== null || el !== undefined && el.nodeType == 1) {
            el.insertAdjacentHTML('beforeEnd', animate)
          }              
        })          
      } 
    } catch (e) {
      console.log(e) 
    }
  }  


  const config = {
    start: 0,
    end: 0,
    total: 100,
    step: 7,
  }

  let { start, end, total, step } = config
  const progress = total / step

  svgAnimate('#path', {
    attribute: 'stroke-dasharray',
    duration: '1s',
    count: '1',
    from: `${start}, 100`,
    to: `${end}, 100`,
    fill: 'freeze'
  })   


  window.addEventListener('click', e => {
    try {

      if (e.target.closest('.widget')) {

        count++
        if (count > 7) count = 0 
        render(count, tasksArray)


        let state = end
        end += progress

        if (end >= total + progress) end = 0

        if (state !== end) {
          state += progress
          svgAnimate('#path', {
            attribute: 'stroke-dasharray',
            duration: '2s',
            count: '1',
            from: `${start}, 100`,
            to: `${end}, 100`,
            fill: 'freeze'
          })
        }

      }

    } catch (e) {
      console.warn(e)
    }

  })

});