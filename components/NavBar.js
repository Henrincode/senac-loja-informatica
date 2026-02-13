fetch('/components/navBar.html')
  .then(res => res.text())
  .then(html => {
    const temp = document.createElement('div')
    temp.innerHTML = html

    const nav = temp.querySelector('nav')
    const placeholder = document.getElementById('navBar')

    placeholder.replaceWith(nav)
  })

//   try {

//     const response = await fetch('/components/NavBar.html')
//     const  html = ''
    
//   }catch(error){
//     console.log(error)
//   }