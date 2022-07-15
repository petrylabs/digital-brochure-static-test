import TextSection from "../../components/TextSection/index"; 

const data = [ { 
"title" : "Auto Insurance / INTRO", 
"baseType" : "CONTENT", 
"archived" : false, 
"copy" : "<p>Getting insured has never been easier with Canada&rsquo;s first online car insurance company. If you live in <a href=\"/auto-insurance/alberta\" target=\"_self\" class=\"\" title=\"Auto Insurance Ontario\">Alberta</a>, <a href=\"/auto-insurance/ontario\" target=\"_self\" class=\"\" hidden-title=\"\" title=\"Auto Insurance Ontario\">Ontario</a>, <a href=\"/auto-insurance/quebec\" target=\"_self\" class=\"\" hidden-title=\"\" title=\"Auto Insurance Qu&eacute;bec\">Québec</a>, New Brunswick, Nova Scotia or P.E.I., you can get a quick quote and buy car insurance online in just a few clicks. Get customized coverage, in language you can understand, at a competitive price &ndash; and do it all online. We&rsquo;ve changed car insurance for the better, so you can worry less and live more.</p>", 
"headline" : "Get a free car insurance quote and buy online instantly", 
} ]; 

/** 
* This is a TEST PAGE for UI components. 
* To be deleted before release. 
*/ 

export default function TestPage() { 
return ( 
<> 
<TextSection data={data}> 
</TextSection> 
</> 
); 
} 