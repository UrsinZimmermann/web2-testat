let contextModel = {
    style: {
        currentStyle: "light",
        nextStyle: "dark"
    },
    showFinished: true,
    selectedSort: "creationDate",
    ascending: 1,
    sortModes: [
        {
            name: "erstellungs Datum",
            value: "creationDate",
        },
        {
            name: "erledigen bis",
            value: "dueDate",
        },
        {
            name: "Wichtigkeit",
            value: "importance",
        }
    ]
}


export function updateSession(req) {
    if(req.body){
        if (req.body.updateTheme !== undefined) {
            let temp = contextModel.style.currentStyle
            contextModel.style.currentStyle = contextModel.style.nextStyle
            contextModel.style.nextStyle = temp
        } else if (req.body.showFinished !== undefined) {
            contextModel.showFinished = !contextModel.showFinished
            req.session.showFinished = contextModel.showFinished
        } else if (req.body.sortedBy !== undefined) {
            if(contextModel.selectedSort === req.body.sortedBy){
                contextModel.ascending *= -1
            } else{
                contextModel.selectedSort = req.body.sortedBy
                contextModel.ascending = 1
            }
            req.session.sortModes = contextModel.sortModes
            req.session.ascending = contextModel.ascending
            req.session.sortedBy = contextModel.selectedSort
        }
    }
}

export function initSession(req) {
    if(req.session.showFinished === undefined){
        req.session.showFinished = contextModel.showFinished
    }
    if(req.session.sortModes === undefined) {
        req.session.sortModes = contextModel.sortModes
        req.session.ascending = contextModel.ascending
        req.session.sortedBy = contextModel.selectedSort
    }
}

export function getTheme(){
    return contextModel.style;
}