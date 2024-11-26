import './style.css'

type Email = {
  from: string
  header: string
  content: string
  emailAddress: string
  img: string
  read: boolean
}

type State = {
  emails: Email[],
  selectedEmail: Email | null,
  filter: string
}

const state: State = {
  emails: [
    {
      from: 'Nico',
      header: "Link to today's video and slides is up!",
      content:
        'Link is up and you know where to find it! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'nico@email.com',
      img: 'assets/nico.JPG',
      read: false
    },
    {
      from: 'Ed',
      header:
        "Congratulations! You have received a free beaver! Your name will now be displayed in the classroom's beaver list!",
      content:
        'Beaver beaver beaver beaver beaver beaver beaver beaver ! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'ed@email.com',
      img: 'assets/ed.JPG',
      read: false
    },
    {
      from: 'Government',
      header: 'Time to pay your tax!',
      content:
        'Pay us now! Pay us now! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'government@email.com',
      img: 'assets/gov.jpg',
      read: true
    }
    
  ],
  selectedEmail: null,
  filter: ''
}

function filterEmails(){
  return state.emails.filter(email => email.content.includes(state.filter.toLocaleLowerCase()) || email.header.includes(state.filter.toLocaleLowerCase()) || email.from.includes(state.filter.toLocaleLowerCase()) || email.emailAddress.includes(state.filter.toLocaleLowerCase()))
}

function showFilteredEmails(){
  let inputEl = document.querySelector<HTMLInputElement>('.filter-input')
  if(inputEl) {
    inputEl.addEventListener('keydown', function(event){
      if (inputEl === null) return
      if (event.key !== 'Enter') return
      state.filter = inputEl.value
      filterEmails()
      render()
    })
  }
}

function renderEmailList(){
  let mainEl = document.querySelector('main')
  if(!mainEl) return 
  mainEl.textContent = ''
 
 let h1El = document.createElement('h1')
 h1El.textContent = 'Inbox'

 let ulEl = document.createElement('ul')
 ulEl.className = 'emails-list' 

 for(let email of state.emails){
   
 let liEl = document.createElement('li')
 liEl.className = email.read ? 'emails-list__item read' : 'emails-list__item'

 liEl.addEventListener('click', function(){
   email.read = true
   state.selectedEmail = email
   render()
 })
 
 let spanEl = document.createElement('span')
 spanEl.className = 'emails-list__item__read-icon material-symbols-outlined'
 spanEl.textContent =  email.read ? 'mark_email_read' : 'mark_email_unread'
 
 let imgEl = document.createElement('img')
 imgEl.className = 'emails-list__item__image'
 imgEl.src = email.img
 
 let pEl = document.createElement('p')
 pEl.className = 'emails-list__item__from'
 pEl.textContent = email.from
 
 let pEl2 = document.createElement('p')
 pEl2.className = 'emails-list__item__content'
 pEl2.textContent = email.header

 liEl.addEventListener('click', function(){
   renderEmailDetails()
   render()
 })
 
 liEl.append(spanEl, imgEl, pEl, pEl2)
 ulEl.append(liEl)
 mainEl.append(h1El, ulEl)
}
}

function renderEmailDetails(){
 
 let mainEl = document.querySelector('main')
 if(!mainEl) return
 mainEl.textContent = 'single-email'
 if(state.selectedEmail === null) return
 
 let sectionEl = document.createElement('section')
 sectionEl.className = 'single-email'

 let buttonEl = document.createElement('button')
 buttonEl.className = 'single-email__button'
 buttonEl.textContent = 'Back'

 buttonEl.addEventListener('click', function(){
   state.selectedEmail = null
   render()
 })

 let divEl = document.createElement('div')
 divEl.className = 'single-email__sender-section'
 
 let imgEl = document.createElement('img')
 imgEl.className = 'single-email__image'
 imgEl.src = state.selectedEmail.img

 let spanEl = document.createElement('span')
 spanEl.className = 'single-email__sender'
 spanEl.textContent = state.selectedEmail.from
 
 let h1El = document.createElement('h1')
 h1El.className = 'single-email__header'
 h1El.textContent = state.selectedEmail.header
  
  let pEl = document.createElement('p')
  pEl.className = 'single-email__content'
  pEl.textContent = state.selectedEmail.content

  divEl.append(imgEl, spanEl)
  sectionEl.append(buttonEl, divEl, h1El, pEl)
  mainEl.append(sectionEl)
 
}



function render (){
  if (state.selectedEmail === null) renderEmailList()
    else renderEmailDetails()

  }
render()