class Task extends HTMLElement{
    constructor(){
        super();
        let shadowEle = this.attachShadow({mode:'open'});
        let articleEle = document.createElement('article');
        let styleEle = document.createElement('style');
        styleEle.textContent = `
            * {
                padding: 0.2rem;
                padding-left: 1rem;
                position: relative;
            }
            taskName {
                font-weight:bold;
            }`;
        shadowEle.appendChild(styleEle);
        /*styleEle.textContent = `
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
        <details>
        <summary>
            <taskName>${data.task_name}</taskName> (${data.ddl})
        </summary>
        <p>Category: ${data.category}</p>
        <p>Priority: ${data.priority}</p>
        <p>Duration: ${data.duration} hours</p>
        <p>Difficulty: ${data.difficulty}/5</p>
        <p>Description: ${data.description}</p>
        <p>DDL Time: ${data.taskddltime}</p>
        <p>Specified DateTime: ${data.datetime}</p>
        <p>Min Work Time: ${data.mintime}</p>
        <p>Max Work Time: ${data.maxtime}</p>
        <p>Extra Notes: ${data.notes}</p>
        </details>
        `
    }
}

customElements.define('my-task',Task);