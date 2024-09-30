function toggleContent() {
    const option1 = document.querySelector('input[name="content"][value="option1"]');
    const content1 = document.getElementById("content1");
    const content2 = document.getElementById("content2");

    if (option1.checked) {
        content1.style.display = "block";
        content2.style.display = "none";
    } else {
        content1.style.display = "none";
        content2.style.display = "block";
    }
}

const CName = document.getElementById('CName');
const Con = document.getElementById('Con');
const Cfrom = document.getElementById('Cfrom');
const CCNo = document.getElementById('CCNo');

const CCNO1 = document.getElementsByClassName('CCNO')[0];
const CourtName1 = document.getElementsByClassName('CourtName')[0];
const CFROM1 = document.getElementsByClassName('CFROM')[0];
const CTO1 = document.getElementsByClassName('CTO')[0];

const CCNO2 = document.getElementsByClassName('CCNO')[1];
const CourtName2 = document.getElementsByClassName('CourtName')[1];
const CFROM2 = document.getElementsByClassName('CFROM')[1];
const CTO2 = document.getElementsByClassName('CTO')[1];

const btn = document.getElementById('btn');

function fun1(e) {
    e.preventDefault();

    const option1 = document.querySelector('input[name="content"][value="option1"]');

    if (option1.checked) {
        CourtName1.innerHTML = CName.value;
        CCNO1.innerHTML = CCNo.value;
        CFROM1.innerHTML = Cfrom.value;
        CTO1.innerHTML = Con.value;      
    } else {
        CourtName2.innerHTML = CName.value;
        CCNO2.innerHTML = CCNo.value;
        CFROM2.innerHTML = Cfrom.value;
        CTO2.innerHTML = Con.value;
    }
}

btn.addEventListener('click', fun1);



$(document).ready(function(){
    $('#downloadPdfBtn').click(function(){
        $('#content1').printThis();         //Print For bailable
    });
});        
$(document).ready(function(){
    $('#downloadPdfBtn').click(function(){
        $('#content2').printThis();        //Print For Non-bailable
    });
});        

console.log("connected")