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
var gCurrCurrency='USD'

function getTrans(transKey){
    const transOptions=G_TRANS[transKey];
    if(!transOptions) return;
    const currLanTrans=transOptions[gCurrLan];
    if(!currLanTrans) return;
    return currLanTrans;
}

function doTrans(){
    const elDoc=document.body;
    elDoc.classList.add('rtl')
    const elTxts=elDoc.querySelectorAll('[data-trans]');
    elTxts.forEach((txt) => txt.innerText=getTrans(txt.dataset.trans));
    
    //converting the price to its value
    var elPrices=elDoc.querySelectorAll('.currency');
    const opt={style:'currency',currency:gCurrCurrency};
    elPrices.forEach((elPrice)=>elPrice.innerText=new Intl.NumberFormat(gCurrLan,opt).format(getConvertedPrice(elPrice.innerText)));
}

//gets the price of a book in ILS and returns it in dollars if needed
function getConvertedPrice(price){
    if(gCurrCurrency==='ILS') return price;
    //assuming 1 ILS = 3 USD
    return ''+(price/3)
}