/**
 * @author whkuo
 */
flexlayout.Flexlayout = zk.$extends(zul.Widget, {
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-flexlayout";
	},
	
	bind_: function () {//after compose
	},
	unbind_: function () {
	}
});