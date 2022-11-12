class Task extends HTMLElement{
    constructor(){
        super();

        let shadowEle = this.attachShadow({mode:'open'});
        let articleEle = document.createElement('article');

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
        article.innerHTML = `
        <h3 class='title'>${data.content}</h3>
        <p>${data.duration}</p>
        <p>${data.date}</p>
        `
    }
}

customElements.define('my-task',Task);
