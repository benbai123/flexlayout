<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>

.z-flexlayout-inner{
	display:-moz-box;
	display:-webkit-box;
	display:box;
}
.z-flexchildren {
	display: inline-block;
}

<%-- --------- --%>
<%-- direction --%>
<%-- --------- --%>
.z-flexlayout-dir-normal {
	-moz-box-direction: normal;
	-webkit-box-direction: normal;
	box-direction: normal;
}
.z-flexlayout-dir-reverse {
	-moz-box-direction: reverse;
	-webkit-box-direction: reverse;
	box-direction: reverse;
}
.z-flexlayout-dir-inherit {
	-moz-box-direction: inherit;
	-webkit-box-direction: inherit;
	box-direction: inherit;
}