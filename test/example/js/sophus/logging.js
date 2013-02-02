/* ============================== sophus3 ==============================
   logging script for                                                               04/02/2011
   
   Peugeot FR
   
   Copyright (c) Sophus Ltd 2010. All rights reserved. Patent Pending.
   http://www.sophus3.com
   =====================================================================*/

//Change the value of tc_logging_active to switch off logging on the site.
if (typeof tc_logging_active == 'undefined') 
	tc_logging_active = true;

// adds the query string to page aliases
if (typeof tc_page_alias != 'undefined') {
	if (location.search != null && location.search.length > 1) {
		if (tc_page_alias.indexOf('?') == -1) {
			tc_page_alias = tc_page_alias + location.search;
		}
		else {
			tc_page_alias = tc_page_alias + "&" + location.search.substring(1);
		}
	}
}

if (typeof tc_site_id == 'undefined') 
tc_site_id = 462;
tc_server_url = "psa.sophus3.com";
tc_log_path = "js/sophus";

document.write("<scr"+"ipt type='text/javascript' src='"+tc_log_path+"/logging-code.js'></scr"+"ipt>");