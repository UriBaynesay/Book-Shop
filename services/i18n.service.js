'use strict'

const G_TRANS={
    greet:{
        en:'Welcome Back!',
        he:"ברוכים השבים!"
    },
    id:{
        en:'ID',
        he:"קוד"
    },
    title:{
        en:'Title',
        he:"כותרת"
    },
    price:{
        en:'Price',
        he:'מחיר'
    },
    actions:{
        en:'Actions',
        he:'פעולות'
    },
    add:{
        en:'Add Book',
        he:'הוסף ספר'
    },
    delete:{
        en:'Delete',
        he:'מחיקה'
    },
    update:{
        en:'Update',
        he:'עדכון'
    },
    review:{
        en:'Review',
        he:'תקציר'
    },
};

var gCurrLan='he'

function getTrans(transKey){
    const transOptions=G_TRANS[transKey];
    if(!transOptions) return;
    const currLanTrans=transOptions[gCurrLan];
    if(!currLanTrans) return;
    return currLanTrans;
}

function doTrans(){
    debugger
    const elDoc=document.body;
    elDoc.classList.add('rtl')
    const elTxts=elDoc.querySelectorAll('[data-trans]');
    elTxts.forEach((txt) => txt.innerText=getTrans(txt.dataset.trans));
}