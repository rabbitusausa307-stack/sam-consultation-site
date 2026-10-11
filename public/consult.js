'use strict';
function compose(data){return ['SAMへの制作相談','', '事業・サービス：'+data.business,'サイトURL：'+(data.website||'未記入'),'困っているやり取り：'+data.problem,'月の相談件数：'+data.volume,'希望時期・補足：'+(data.timing||'未記入'),'','まず、対応可否と必要な情報を文章で教えてください。'].join('\n');}
function mailURL(body){return 'mailto:rabbitusausa307@gmail.com?subject='+encodeURIComponent('SAM 制作相談')+'&body='+encodeURIComponent(body);}
if(typeof module!=='undefined')module.exports={compose,mailURL};
if(typeof document!=='undefined'){
 const form=document.getElementById('consult'), body=document.getElementById('body'), status=document.getElementById('status');
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;body.value=compose(Object.fromEntries(new FormData(form)));document.getElementById('preview').hidden=false;status.textContent='下書きを作りました。まだ送信されていません。';body.focus();});
 document.getElementById('email').addEventListener('click',()=>{if(!body.value.trim()){status.textContent='相談文を入力してください。';return;}window.location.href=mailURL(body.value);status.textContent='メールアプリを開くよう要求しました。開かない場合はコピーをご利用ください。';});
 document.getElementById('copy').addEventListener('click',async()=>{if(!body.value.trim()){status.textContent='相談文を入力してください。';return;}try{await navigator.clipboard.writeText(body.value);status.textContent='コピーしました。まだ送信されていません。';}catch{body.focus();body.select();status.textContent='自動コピーが使えません。選択した文章をCtrl+Cなどでコピーしてください。';}});
}
