class Task extends HTMLElement{
    constructor(){
        super();
        let shadowEle = this.attachShadow({mode:'open'});
        let articleEle = document.createElement('article');
        let styleEle = document.createElement('style');
        // styleEle.textContent = `
        //     * {
        //         padding: 0.2rem;
        //         padding-left: 1rem;
        //         position: relative;
        //     }
        //     taskName {
        //         font-weight:bold;
        //     }`;
        styleEle.textContent = `
        /* defaults */
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  --light: hsl(220, 50%, 90%);
  --primary: hsl(255, 30%, 55%);
  --focus: hsl(210, 90%, 50%);
  --border-color: hsla(0, 0%, 100%, .2);
  --global-background: hsl(220, 25%, 10%);
  --background: linear-gradient(to right, hsl(210, 30%, 20%), hsl(255, 30%, 25%));
  --shadow-1: hsla(236, 50%, 50%, .3);
  --shadow-2: hsla(236, 50%, 50%, .4);

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Open Sans', sans-serif;
  color: var(--light);
  background: var(--global-background);
}

a,
a:link {
  font-family: inherit;
  text-decoration: none;
}

a:focus {
  outline: none;
}

button::-moz-focus-inner {
  border: 0;
}




/* modal */
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  display: none;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  /* --m-background is set as inline style */
  background: var(--m-background);
}

/* using :target */
/*
when users will click/enter button(link) browser will add a #id in a url and when that happens we'll show our users the modal that contains that id.
*/
.modal-container:target {
  display: flex;
}

.modal {
  width: 60rem;
  padding: 4rem 2rem;
  border-radius: .8rem;

  color: var(--light);
  background: var(--background);
  box-shadow: var(--m-shadow, .4rem .4rem 10.2rem .2rem) var(--shadow-1);
  position: relative;

  overflow: hidden;
}

.modal__title {
  font-size: 3.2rem;
}

.modal__text {
  padding: 0 4rem;
  margin-top: 4rem;

  font-size: 1.6rem;
  line-height: 2;
}

.modal__btn {
  margin-top: 4rem;
  padding: 1rem 1.6rem;
  border: 1px solid var(--border-color);
  border-radius: 100rem;

  color: inherit;
  background: transparent;
  font-size: 1.4rem;
  font-family: inherit;
  letter-spacing: .2rem;

  transition: .2s;
  cursor: pointer;
}

.modal__btn:nth-of-type(1) {
  margin-right: 1rem;
}

.modal__btn:hover,
.modal__btn:focus {
  background: var(--focus);
  border-color: var(--focus);
  transform: translateY(-.2rem);
}


/* link-... */
.link-1 {
  font-size: 1.8rem;

  color: var(--light);
  background: var(--background);
  box-shadow: .4rem .4rem 2.4rem .2rem var(--shadow-1);
  border-radius: 100rem;
  padding: 1.4rem 3.2rem;

  transition: .2s;
}

.link-1:hover,
.link-1:focus {
  transform: translateY(-.2rem);
  box-shadow: 0 0 4.4rem .2rem var(--shadow-2);
}

.link-1:focus {
  box-shadow:
    0 0 4.4rem .2rem var(--shadow-2),
    0 0 0 .4rem var(--global-background),
    0 0 0 .5rem var(--focus);
}

.link-2 {
  width: 4rem;
  height: 4rem;
  border: 1px solid var(--border-color);
  border-radius: 100rem;

  color: inherit;
  font-size: 2.2rem;

  position: absolute;
  top: 2rem;
  right: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: .2s;
}

.link-2::before {
  content: '×';

  transform: translateY(-.1rem);
}

.link-2:hover,
.link-2:focus {
  background: var(--focus);
  border-color: var(--focus);
  transform: translateY(-.2rem);
}

.abs-site-link {
  position: fixed;
  bottom: 20px;
  left: 20px;
  color: hsla(0, 0%, 1000%, .6);
  font-size: 1.6rem;
}



.task-card {
    margin: 20px;
    padding: 20px;
    width: 200px;
    min-height: 25px;
    display: grid;
    grid-template-rows: 10px 20px 0.5fr 20px;
    border-radius: 10px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.2s;
    background: radial-gradient(#1fe4f5, #3fbafe);
  }

  .task-card:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.01);
  }

  .card__link,
.card__exit,
.card__icon {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
}

.card__link::after {
  position: absolute;
  top: 25px;
  left: 0;
  content: "";
  width: 0%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.5s;
}

.card__link:hover::after {
  width: 100%;
}

.card__exit {
  grid-row: 1/2;
  justify-self: end;
}

.card__icon {
  grid-row: 2/3;
  font-size: 30px;
}

.card__title {
  grid-row: 3/4;
  font-weight: 400;
  color: #ffffff;
}

.card__apply {
  grid-row: 4/5;
  align-self: center;
}
        
        
        `;
        
        
        shadowEle.appendChild(styleEle);
        shadowEle.appendChild(articleEle);
    }
    /**
     * @param {Object} data
     */
    set data(data) {
        if (!data){
            return;
        }

        let article = this.shadowRoot.querySelector('article');
        // article.innerHTML = `
        // <details>
        // <summary>
        //     <taskName>${data.task_name}</taskName> (${data.ddl})
        // </summary>
        // <p>Category: ${data.category}</p>
        // <p>Priority: ${data.priority}</p>
        // <p>Duration: ${data.duration} hours</p>
        // <p>Difficulty: ${data.difficulty}/5</p>
        // <p>Description: ${data.description}</p>
        // <p>DDL Time: ${data.taskddltime}</p>
        // <p>Specified DateTime: ${data.datetime}</p>
        // <p>Min Work Time: ${data.mintime}</p>
        // <p>Max Work Time: ${data.maxtime}</p>
        // <p>Extra Notes: ${data.notes}</p>
        // </details>
        // `
        // article.innerHTML = 
        // `<div class="task-card">
        // <p class="card__exit"><i class="fas fa-times"></i></p>
        // <card__title><taskName>${data.task_name}</taskName> (${data.ddl})<card__title>
        // <p class="card__apply">
        //     Details <i class="fas fa-arrow-right">→</i>
        // </p>
        // </div>`

        article.innerHTML = 
        `<div class="box">
            <a href="#m1-o" class="link-1" id="m1-c">
                <div class="task-card">
                <p class="card__exit"><i class="fas fa-times"></i></p>
                <card__title><taskName>${data.task_name}</taskName> (${data.ddl})<card__title>
                <p class="card__apply">
                    Details <i class="fas fa-arrow-right">→</i>
                </p>
                </div>
            </a>
            
        <p class="box__info">Without Background</p>

        <div class="modal-container" id="m1-o" style="--m-background: transparent;">
            <div class="modal">
            <h1 class="modal__title">Modal 1 Title</h1>
            <p class="modal__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis ex dicta maiores libero minus obcaecati iste optio, eius labore repellendus.</p>
            <button class="modal__btn">Button &rarr;</button>
            <a href="#m1-c" class="link-2"></a>
            </div>
        </div>
        </div>`;

    }
}

customElements.define('my-task',Task);
