const boards = document.querySelectorAll('.boards__item')
const lists = document.querySelectorAll('.list')




boards.forEach((board, index)=> {
    board.addEventListener('click', (e)=> {
        console.log(e.target)
    })
})

function addTask(){
    const btn = document.querySelector('.add__btn');
    const addBtn = document.querySelector('.add__item-btn');
    const cancelBtn = document.querySelector('.cancel__item-btn');
    const textarea = document.querySelector('.textarea');
    const form = document.querySelector('.form');


    let value

    btn.addEventListener('click', ()=> {
        form.style.display = 'block';
        console.log(form)
        btn.style.display = 'none';
        addBtn.style.display = 'none';

        textarea.addEventListener('input', (e) => {
            value = e.target.value

            if(value) {
                addBtn.style.display = 'block'
            } else {
                addBtn.style.display = 'none'
            }
        })
    })

    cancelBtn.addEventListener('click', ()=> {
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'
    })

    addBtn.addEventListener('click', ()=> {
        const newItem = document.createElement('div')
        newItem.classList.add('list__item')
        newItem.draggable = true
        newItem.textContent = value
        lists[0].appendChild(newItem)

        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'
    })
}

addTask()