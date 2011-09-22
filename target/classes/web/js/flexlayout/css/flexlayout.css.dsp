<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>

.z-flexlayout-inner {
	/* Display Box */
	display: -moz-box;
	display: -webkit-box;
	display: -ms-box;
	display: box;
	
	/* Firefox requires these */
	width: 100%;
	height: 100%;
}
.z-flexchildren {
	-moz-box-flex: 0;
	-webkit-box-flex: 0;
	-ms-box-flex: 0;
	box-flex: 0;
	
	-moz-box-ordinal-group: 1;
	-webkit-box-ordinal-group: 1;
	-ms-box-ordinal-group: 1;
	box-ordinal-group: 1;
}

.z-flexchildren-for-flex {
	width: 1px;
	height: 1px;
}

<%-- --------- --%>
<%-- direction --%>
<%-- --------- --%>
.z-flexlayout-inner-dir-normal {
	-moz-box-direction: normal;
	-webkit-box-direction: normal;
	box-direction: normal;
}
.z-flexlayout-inner-dir-reverse {
	-moz-box-direction: reverse;
	-webkit-box-direction: reverse;
	box-direction: reverse;
}

<%-- --------- --%>
<%---- pack -----%>
<%-- --------- --%>
.z-flexlayout-inner-pak-start {
	-webkit-box-pack: start;
	-moz-box-pack: start;
	box-pack: start;
}
.z-flexlayout-inner-pak-end {
	-webkit-box-pack: end;
	-moz-box-pack: end;
	box-pack: end;
}
.z-flexlayout-inner-pak-center {
	-webkit-box-pack: center;
	-moz-box-pack: center;
	box-pack: center;
}
.z-flexlayout-inner-pak-justify {
	-webkit-box-pack: justify;
	-moz-box-pack: justify;
	box-pack: justify;
}

<%-- --------- --%>
<%--- orient ----%>
<%-- --------- --%>
.z-flexlayout-inner-ore-horizontal {
	-webkit-box-orient: horizontal;
	-moz-box-orient: horizontal;
	box-orient: horizontal;
}
.z-flexlayout-inner-ore-vertical {
	-webkit-box-orient: vertical;
	-moz-box-orient: vertical;
	box-orient: vertical;
}
<%-- --------- --%>
<%---- align ----%>
<%-- --------- --%>
.z-flexlayout-inner-alg-start {
	-webkit-box-align: start;
	-moz-box-align: start;
	box-align: start;
}

.z-flexlayout-inner-alg-end {
	-webkit-box-align: end;
	-moz-box-align: end;
	box-align: end;
}

.z-flexlayout-inner-alg-center {
	-webkit-box-align: center;
	-moz-box-align: center;
	box-align: center;
}

.z-flexlayout-inner-alg-stretch {
	-webkit-box-align: stretch;
	-moz-box-align: stretch;
	box-align: stretch;
}