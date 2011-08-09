package org.zkoss.addon.flexlayout;

import java.io.IOException;

import org.zkoss.lang.Objects;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.UiException;
import org.zkoss.zk.ui.sys.ContentRenderer;
import org.zkoss.zul.impl.XulElement;

/**
 * The children of Anchorlayout. <br> 
 * Can accept any ZK component as child.
 * <p>Available in ZK addon
 * 
 * <p>Default {@link #getZclass}: z-anchorchildren.
 * @author peterkuo
 * @since 5.0.7
 */
public class Flexchildren extends XulElement{
	
	private final static int DEFAULT_FLEX = 0;
	private final static int DEFAULT_ORDINAL = 0;
	private int _flex = DEFAULT_FLEX;
	private int _ordinal = DEFAULT_ORDINAL;
	
	public void setFlex(int flex){
		if(flex < 0)
			flex = 0;
		if(_flex != flex){
			_flex = flex;
			smartUpdate("flex", _flex);
		}
	}
	
	public int getFlex(){
		return _flex;
	}

	public void setOrdinal(int ordinal){
		if(ordinal < 0)
			ordinal = 0;
		if(_ordinal != ordinal){
			_ordinal = ordinal;
			smartUpdate("ordinal", _ordinal);
		}
	}
	
	public int getOrdinal(){
		return _ordinal;
	}

	public Flexchildren(){}
	
	public Flexchildren(String anchor){
		super();
	}
	
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
		
		if(_flex != DEFAULT_FLEX)
			renderer.render("flex", _flex);
		
		if(_ordinal != DEFAULT_ORDINAL)
			renderer.render("ordinal", _ordinal);
		
	}
}
