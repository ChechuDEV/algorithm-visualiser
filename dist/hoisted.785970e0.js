import{s as u,d as i,b as r,e as n,g as l,i as c,h as d,r as g,f as m,a as f}from"./chunks/Shuffle.3521e298.js";const p=document.getElementById("play");let e=!1;p.onclick=async()=>{e||(e=!0,await u(),await b(),e=!1)};async function b(){for(let t=0;i(t,f);t++){await r();let s=!1;await n();for(let a=0;i(a,f-t-1);a++){await r();let o=l(a),w=l(a+1);c(o,w)&&(d(a,a+1),s=!0),await n(),await g()}if(!s)break}await m()}