fetch('/components/navBar.html')
  .then(res => res.text())
  .then(html => {
    const temp = document.createElement('div')
    temp.innerHTML = html

    const nav = temp.querySelector('nav')
    const placeholder = document.getElementById('navBar')

    placeholder.replaceWith(nav)
  })

document.querySelector('body').classList.add('min-h-dvh', 'pt-14')