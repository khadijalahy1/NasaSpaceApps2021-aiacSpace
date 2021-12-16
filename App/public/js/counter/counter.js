
    const counter= document.getElementById('counter');
    function updateVisitCount(){
        fetch('https://api.countapi.xyz/update/data4everyone/data4everyone/?amount=1')
        .then(res=>res.json())
        .then(res=>{
            counter.innerHTML=res.value;
        })
    }
    updateVisitCount();
