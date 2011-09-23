package org.zkoss.addon.flexlayout;

import java.io.IOException;

import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.UiException;
import org.zkoss.zk.ui.sys.ContentRenderer;
import org.zkoss.zul.impl.XulElement;

/**
 * The children of Flexlayout. <br> 
 * Can accept any ZK component as child.
 * 
 * <p>Default {@link #getZclass}: z-flexchildren.
 * @author benbai
 * @since 5.5.0
 */
public class Flexchildren extends XulElement{
	
	/** The box-flex value of this Flexchildren. */
	private int _flex = 0;
	/** The ordinal-group number of this Flexchildren. */
	private int _ordinal = 1;

	/**
	 * Sets the flex value of the Flexchildren
	 * <p>int flex indicates the proportion of size of the Flexchildren, 
	 * the higher the flex value, the larger the Flexchildren size.
	 * <p>The default and minimum value is 0, it denotes keep the original size without the flex value. 
	 * Any value smaller than 0 will be modified to 0.
	 * <p> Note: It has not been fully documented at the current W3C Working Draft (Latest Version: 22 March 2011), 
	 * the browsers support CSS3 natively may be not work as expected.
	 * <p>Default: 0
	 * @param flex the flex value
	 */
	public void setFlex(int flex){
		if(flex < 0)
			flex = 0;
		if(_flex != flex){
			_flex = flex;
			smartUpdate("flex", _flex);
		}
	}

	/**
	 * Return the flex value specified to the Flexchildren.
	 * <p>Default: 0
	 * @return the flex value specified to the Flexchildren.
	 */
	public int getFlex(){
		return _flex;
	}

	/**
	 * Sets the flex-order value of the Flexchildren.
	 * <p>int ordinal indicates the ordinal group the Flexchildren belongs to. 
	 * A flexbox will lay out its children starting from the lowest numbered ordinal group and going up.
	 * <p>The default and minimum value is 1, 
	 * any value smaller than 0 will be modified to 0.
	 * <p>Default: 1
	 * @param ordinal the ordinal group that the Flexchildren is assigned to.
	 */
	public void setOrdinal(int ordinal){
		if(ordinal < 1)
			ordinal = 1;
		if(_ordinal != ordinal){
			_ordinal = ordinal;
			smartUpdate("ordinal", _ordinal);
		}
	}

	/**
	 * Return the ordinal value specified to the Flexchildren.
	 * <p>Default: 1
	 * @return the ordinal value specified to the Flexchildren.
	 */
	public int getOrdinal(){
		return _ordinal;
	}

	public Flexchildren(){}
	
	// super
	public String getZclass() {
		return _zclass == null ? "z-flexchildren" : _zclass;
	}

	public void beforeParentChanged(Component parent) {
		if (parent != null && !(parent instanceof Flexlayout))
			throw new UiException("Wrong parent: " + parent);
		super.beforeParentChanged(parent);
	}

	protected void renderProperties(ContentRenderer renderer) throws IOException{
		super.renderProperties(renderer);
		
		if(_flex != 0)
			renderer.render("flex", _flex);
		
		if(_ordinal != 1)
			renderer.render("ordinal", _ordinal);
		
	}
}
