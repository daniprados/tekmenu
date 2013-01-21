<h1>TekMenu, Menu html with JQuery</h1>
	<div class="txt-contingut"><p><strong>Objective:</strong> To create a plugin to generate dynamic menus, really easy to use.</p>
<p>&nbsp;</p>
<p><strong>Plugin:</strong></p>
<p>The basic call</p>
<p>$ ("a.menu). TekMenu ();</p>
<p>The link with the menu style must have the rel tag with the id of html to be shown by the menu plugin.</p>
<p>&nbsp;</p>
<pre>&lt;a href="" class="menu" rel="#menu1"&gt;Entrada menu&lt;/a&gt;
&lt;div id="menu" class="second " &gt;
 &lt;ul class="second"&gt;
  &lt;li&gt; Item 1&lt;/li&gt;
  &lt;li&gt; Item 2&lt;/li&gt;
  &lt;li&gt; Item 3&lt;/li&gt;
 &lt;/ul&gt;
&lt;/div&gt;
</pre>
<p><strong>The CSS:</strong></p>
<pre>div.second {
	width:300px; // need to set a wide
	position:absolute; / / position must be absolute
	z-index:1300; / / z-index indicates that it should be over other items
	display:none;.

}
</pre>
<p>&nbsp;</p>
<p><strong>Parameters:</strong>&nbsp;</p>
<p>fullAnimation (boolean) if true allows to finish the animation but the mouse is already outside. With false hides directly.</p>
<p>timeout (integer) time to wait before hiding the menu.</p>

