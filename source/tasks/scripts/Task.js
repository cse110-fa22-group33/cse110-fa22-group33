class Task extends HTMLElement{
    constructor(){
        super();

        let shadowEle = this.attachShadow({mode:'open'});
        let articleEle = document.createElement('article');
        let styleEle = document.createElement('style');
        /*styleElement.textContent = `
            * {
            margin: 0;
            padding: 0;
            }
            article {
            align-items: center;
            border: 1px solid rgb(223, 225, 229);
            border-radius: 8px;
            display: grid;
            grid-template-rows: 118px 56px 14px 18px 15px 36px;
            height: auto;
            row-gap: 5px;
            padding: 0 16px 16px 16px;
            width: 178px;
            }
            div.rating {
            align-items: center;
            column-gap: 5px;
            display: flex;
            }
            div.rating>img {
            height: auto;
            display: inline-block;
            object-fit: scale-down;
            width: 78px;
            }
            article>img {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            height: 118px;
            object-fit: cover;
            margin-left: -16px;
            width: calc(100% + 32px);
            }
            p.ingredients {
            height: 32px;
            line-height: 16px;
            padding-top: 4px;
            overflow: hidden;
            }
            p.organization {
            color: black !important;
            }
            p.title {
            display: -webkit-box;
            font-size: 16px;
            height: 36px;
            line-height: 18px;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            }
            p:not(.title),
            span,
            time {
            color: #70757A;
            font-size: 12px;
            }`;
        shadowEle.appendChild(styleEle);*/
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
        <p>${data.category}</p>
        <p>${data.duration} hours</p>
        <p>${data.taskddl}</p>
        <p>${data.taskdescription}</p>
        <p>${data.taskddltime}</p>
        <p>${data.datetime}</p>
        <p>${data.minworktime}</p>
        `
    }
}

customElements.define('my-task',Task);
