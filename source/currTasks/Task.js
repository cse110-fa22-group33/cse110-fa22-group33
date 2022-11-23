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
        
        //shadowEle.appendChild(styleEle);

        // css with popup

        // const linkElem = document.createElement("link");
        // linkElem.setAttribute("rel", "stylesheet");
        // linkElem.setAttribute("href", "./taskObj.css");
        // shadowEle.appendChild(linkElem);

        // css without popup, just block

        const blockElem = document.createElement("link");
        blockElem.setAttribute("rel", "stylesheet");
        blockElem.setAttribute("href", "./taskObj2.css");
        shadowEle.appendChild(blockElem);

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

        `
            <div class="box">
            <a href="#m1-o" class="task-card" id="m1-c">
                <card__title>${data.task_name}, (${data.ddl})<card__title>
            </a>
            
        
            <div class="modal-container" id="m1-o" style="--m-background: transparent;">
                <div class="modal">
                    <h1 class="modal__title">Modal 1 Title</h1>
                    <p class="modal__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis ex dicta maiores libero minus obcaecati iste optio, eius labore repellendus.</p>
                    <button class="modal__btn">Button &rarr;</button>
                    <a href="#m1-c" class="link-2"></a>
                </div>
            </div>
        </div>
        `;
        // `<div class="box">
        //     <a href="#m1-o" class="link-1" id="m1-c">
        //         <div class="task-card">
        //         <p class="card__exit"><i class="fas fa-times"></i></p>
        //         <card__title><taskName>${data.task_name}</taskName> (${data.ddl})<card__title>
        //         <p class="card__apply">
        //             Details <i class="fas fa-arrow-right">→</i>
        //         </p>
        //         </div>
        //     </a>
            
        // <p class="box__info">Without Background</p>

        // <div class="modal-container" id="m1-o" style="--m-background: transparent;">
        //     <div class="modal">
        //     <h1 class="modal__title">Modal 1 Title</h1>
        //     <p class="modal__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis ex dicta maiores libero minus obcaecati iste optio, eius labore repellendus.</p>
        //     <button class="modal__btn">Button &rarr;</button>
        //     <a href="#m1-c" class="link-2"></a>
        //     </div>
        // </div>
        // </div>`;

    }
}

customElements.define('my-task',Task);
