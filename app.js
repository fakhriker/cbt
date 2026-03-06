let nama=""
let id=""
let answers={}
let shuffledQuestions=[]

function shuffle(a){
for(let i=a.length-1;i>0;i--){
let j=Math.floor(Math.random()*(i+1))
[a[i],a[j]]=[a[j],a[i]]
}
return a
}

function mulai(){

nama=document.getElementById("nama").value

if(!nama) return alert("Isi nama dulu")

id=Date.now()

database.ref("ujian/"+id).set({
nama:nama,
status:"ujian",
progress:0
})

document.getElementById("login").style.display="none"
document.getElementById("quiz").style.display="block"

shuffledQuestions = shuffle([...questions])

render()

}

function render(){

let html=""

shuffledQuestions.forEach((s,i)=>{

let pilihan=shuffle([...s.options])

html+=`
<div class="card">

<p>${i+1}. ${s.question}</p>

${pilihan.map((p,j)=>`

<label>
<input type="radio" name="q${i}" value="${p}" onclick="jawab(${i},'${p}')">
${p}
</label><br>

`).join("")}

</div>
`

})

document.getElementById("soal").innerHTML=html

}

function jawab(i,pilihan){

answers[i]=pilihan

database.ref("ujian/"+id).update({
progress:Object.keys(answers).length
})

}

function submitQuiz(){

if(Object.keys(answers).length < shuffledQuestions.length)
return alert("Semua soal harus dijawab")

let benar=0

shuffledQuestions.forEach((q,i)=>{

if(answers[i]===q.options[q.answer]){
benar++
}

})

let score=Math.round((benar/shuffledQuestions.length)*100)

database.ref("ujian/"+id).update({
status:"selesai",
score:score
})

alert("Nilai kamu: "+score)

}

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

alert("Terdeteksi keluar aplikasi!")

answers={}

database.ref("ujian/"+id).update({
cheat:"Keluar aplikasi"
})

location.reload()

}

})
