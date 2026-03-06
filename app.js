let nama=""
let id=""
let answers={}

function shuffle(a){

for(let i=a.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))
[a[i],a[j]]=[a[j],a[i]]

}

return a
}

function mulai(){

nama=document.getElementById("nama").value

if(!nama) return alert("isi nama")

id=Date.now()

database.ref("ujian/"+id).set({

nama:nama,
status:"ujian",
progress:0

})

document.getElementById("login").style.display="none"
document.getElementById("quiz").style.display="block"

render()

}

function render(){

let q=shuffle([...questions])

let html=""

q.forEach((s,i)=>{

let pilihan=shuffle([...s.pilihan])

html+=`
<div class="card">

<p>${i+1}. ${s.soal}</p>

${pilihan.map((p,j)=>`

<label>
<input type="radio" name="q${i}" onclick="jawab(${i})">
${p}
</label>

`).join("")}

</div>
`

})

document.getElementById("soal").innerHTML=html

}

function jawab(i){

answers[i]=true

database.ref("ujian/"+id).update({

progress:Object.keys(answers).length

})

}

function submitQuiz(){

if(Object.keys(answers).length<questions.length)
return alert("Semua soal harus dijawab")

let score=Math.floor(Math.random()*100)

database.ref("ujian/"+id).update({

status:"selesai",
score:score

})

alert("Nilai: "+score)

}

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

alert("Terdeteksi keluar aplikasi")

answers={}

database.ref("ujian/"+id).update({

cheat:"Keluar aplikasi"

})

location.reload()

}

})
