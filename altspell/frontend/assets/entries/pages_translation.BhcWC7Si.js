import{r as h,j as e,f as u,d as x,n as o,R as j,a as l,i as c,P as f,b as w,c as y}from"../chunks/chunk-Bu8lzMWy.js";import{a as d,d as p,n,A as b}from"../chunks/chunk-Cu5-9e2N.js";/* empty css                      */const m=h.forwardRef(({children:a,...t},s)=>e.jsx("p",{...t,ref:s,children:a}));m.displayName="Paragraph";const g="IRP",v=[{id:"lOJ_pO1PuTjOI94xkeOKY"},{id:"yVNwdCa4Y3IVGFF8m4INs",maxWidth:991},{id:"3JL3jbbagtQuNR5UglLUR",maxWidth:767},{id:"wGQ4Zvstpcod-5OYY6jFN",maxWidth:479}],S="without_text-cropped_9BB3tFo3MYnxtI_yGoint.svg",T=[],P=["logo_make_11_06_2023_22_NmxtwkM29Foa3TBJP8QtT.jpg"],k=a=>e.jsxs(u,{className:"w-body cxcztle ckrcluh c6cl0eb c1d0vpdb cxo252l chw7hj7 c1yke7en c1x3gp9",children:[e.jsx(x,{id:"",tag:"h2",className:"w-heading ccqlxya",children:e.jsx(m,{className:"w-paragraph cosuwxj c1ujwkib",children:"Fetch Translation"})}),e.jsxs(o,{className:"w-box c1lrnam1 cspis3z c17rl77y capwq5e c14f8t2p c133lt2q c16tvvh2",children:[e.jsx(d,{htmlFor:"tradspell",className:"w-label c1cippd c1hhm1lu c4fnq9h cbr6uc9 c66b3eg c8d1j7v com6jtn c2go2il c184ymiz c103qdxd c11olp70 cxyrwmw c14u0bbv c12mc6lz c1c3r235 cos9kjl c4n6xqb c9dwxyh",children:"Traditional English"}),e.jsx(p,{name:"",disabled:!0,id:"tradspellOut",placeholder:"",className:"w-text-area c1lrnam1 c7d5nka c2go2il c1ia571f cx2lpcr c4fnq9h c17rl77y capwq5e c1er55yw c1kk32re clskzv7 c1cmfv5y c15z1fte c18g62fq c7t5jyg c1gqbcw3 cpqnboj cdhkz47 c107j88e"})]}),e.jsxs(o,{className:"w-box c1lrnam1 cspis3z c17rl77y c1elw6nd c11e5b31 c14f8t2p c16tvvh2",children:[e.jsx(d,{htmlFor:"tradspell",id:"alternativeEnglishLabel",className:"w-label c1cippd c1hhm1lu c4fnq9h cbr6uc9 c66b3eg c8d1j7v com6jtn c2go2il c4n6xqb c1c3r235 c12mc6lz cos9kjl c184ymiz c103qdxd c11olp70 c9dwxyh cxyrwmw c14u0bbv c1pjr6a1 c1e8duiz",children:"Alternative English"}),e.jsx(p,{disabled:!0,id:"altspellOut",value:"",placeholder:"",className:"w-text-area c1152tsc c2go2il c1ia571f c4fnq9h cx2lpcr c1lrnam1 c18g62fq c7t5jyg c1gqbcw3 cpqnboj cdhkz47 c107j88e"})]}),e.jsx(n,{id:"translationDate",className:"w-text c14u0bbv cg6wnx5 cx2lpcr c4fnq9h c1esrwj5 c3gbn51",children:e.jsx(n,{tag:"span",id:"translationDate",className:"w-text c1esrwj5 cx2lpcr c4fnq9h",children:""})}),e.jsx(n,{id:"",className:"w-text c14u0bbv cg6wnx5 c1esrwj5 cx2lpcr c4fnq9h c3gbn51",children:e.jsx(n,{tag:"span",id:"translationDirection",className:"w-text",children:""})}),e.jsx(b,{code:`<script>
  let altspellMapping = {
    "lytspel": "Lytspel",
    "soundspel": "Soundspel",
    "portul": "Portul",
    "refaurmd_lojikl_inglish": "Alan's Refaurmd Lojikl Inglish",
    "universal_lojikl_inglish": "Rollo Reid Lojikl Inglish"
  };
  
  function getTranslationIdUrlParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const translationId = urlParams.get("id");
    return translationId;
  }

  function getTranslation() {
    translationId = getTranslationIdUrlParam();
    fetch("https://api.inglish.revlearn.org/api/v1/translations/" + translationId, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
     .then(data => {
       document.getElementById("alternativeEnglishLabel").textContent = altspellMapping[data.spellingSystem];
       if(data.forward) {
         translationDirection = "Traditional English Spelling => " + altspellMapping[data.spellingSystem];
       } else {
         translationDirection = altspellMapping[data.spellingSystem] + " => Traditional English Spelling";
       }
       document.getElementById("tradspellOut").value = data.traditionalText;
       document.getElementById("altspellOut").value = data.respelledText;
       document.getElementById("translationDate").textContent = "Translation Date: " + (new Date(data.creationDate)).toString();
       document.getElementById("translationDirection").textContent = "Translation Direction: " + (data.forward ? "forward" : "backward");
     });
  }

  getTranslation();
  
<\/script>`,clientOnly:!0,executeScriptOnCanvas:!1,className:"w-html-embed"})]}),_=({data:a})=>{const{system:t,resources:s,url:r,pageMeta:i}=a;return e.jsxs(j.Provider,{value:{imageLoader:c,assetBaseUrl:l,resources:s,breakpoints:v,onError:console.error},children:[e.jsx(k,{system:t},r),e.jsx(f,{url:r,pageMeta:i,siteName:g,imageLoader:c,assetBaseUrl:l}),e.jsx(w,{children:i.title})]})},z=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"})),N=({})=>{const a={"@context":"https://schema.org","@type":"WebSite",name:g};return e.jsxs(e.Fragment,{children:[e.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(a,null,2)}}),e.jsx("link",{rel:"icon",href:c({src:`${l}${S}`})}),T.map(t=>e.jsx("link",{rel:"preload",href:`${l}${t}`,as:"font",crossOrigin:"anonymous"},t)),P.map(t=>e.jsx("link",{rel:"preload",href:`${l}${t}`,as:"image"},t))]})},q=Object.freeze(Object.defineProperty({__proto__:null,Head:N},Symbol.toStringTag,{value:"Module"})),O={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"/renderer/+onRenderClient.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:y}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/translation/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:z}},Head:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/translation/+Head.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:q}}};export{O as configValuesSerialized};
