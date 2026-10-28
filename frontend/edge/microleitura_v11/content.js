(()=>{
let palette=null;
const classes=['ml-gray','ml-green','ml-yellow','ml-red'];
function removePalette(){if(palette){palette.remove();palette=null;}}
function unwrap(el){const p=el.parentNode;while(el.firstChild)p.insertBefore(el.firstChild,el);p.removeChild(el);}
function clearSelected(){const sel=window.getSelection();if(!sel.rangeCount)return;let n=sel.anchorNode;if(n&&n.nodeType===3)n=n.parentElement;while(n){if(classes.some(c=>n.classList?.contains(c))){unwrap(n);break;}n=n.parentElement;}}
function apply(color){
 const sel=window.getSelection(); if(!sel.rangeCount)return;
 clearSelected();
 const range=sel.getRangeAt(0);
 const text=sel.toString(); if(!text)return;
 const span=document.createElement('span'); span.className='ml-'+color;
 span.textContent=text;
 try{range.deleteContents();range.insertNode(span);}catch(e){console.error(e)}
 removePalette();
}
 function showPalette(x,y){
 removePalette();
 palette=document.createElement('div'); palette.className='ml-palette';
 const items=[['gray','🩶 Lido'],['green','🟢 Entendido'],['yellow','🟡 Revisar'],['red','🔴 Importante/Dúvida']];
 items.forEach(([c,t])=>{const b=document.createElement('button');b.textContent=t;['mousedown','mouseup','click'].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();if(ev==='click')apply(c);}));palette.appendChild(b);});
 const hr=document.createElement('hr');palette.appendChild(hr);
 const clear=document.createElement('button');clear.textContent='⚪ Limpar marcação';['mousedown','mouseup','click'].forEach(ev=>clear.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();if(ev==='click'){clearSelected();removePalette();}}));palette.appendChild(clear);

 const closeBtn=document.createElement('button');
 closeBtn.textContent='❌ Fechar paleta';
 ['mousedown','mouseup','click'].forEach(ev=>closeBtn.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();if(ev==='click') removePalette();}));
 palette.appendChild(closeBtn);

 palette.style.left=x+'px'; palette.style.top=y+'px'; document.body.appendChild(palette);
 }
 document.addEventListener('mouseup',e=>{if(palette&&palette.contains(e.target))return;const t=window.getSelection().toString().trim();if(t)showPalette(e.pageX+10,e.pageY+10);});
document.addEventListener('selectionchange',()=>{const t=window.getSelection().toString().trim(); if(!t) removePalette();});
document.addEventListener('keydown',e=>{if(e.key==='Escape') removePalette();});
document.addEventListener('mousedown',e=>{if(palette && !palette.contains(e.target)) removePalette();});
})();
