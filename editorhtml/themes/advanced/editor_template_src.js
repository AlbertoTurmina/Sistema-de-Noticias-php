/**
 * editor_template_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function(tinymce) {
	var DOM = tinymce.DOM, Event = tinymce.dom.Event, extend = tinymce.extend, each = tinymce.each, Cookie = tinymce.util.Cookie, lastExtID, explode = tinymce.explode;

	// Generates a preview for a format
	function getPreviewCss(ed, fmt) {
		var name, previewElm, dom = ed.dom, previewCss = '', parentFontSize, previewStylesName;

		previewStyles = ed.settings.preview_styles;

		// No preview forced
		if (previewStyles === false)
			return '';

		// Default preview
		if (!previewStyles)
			previewStyles = 'font-family font-size font-weight text-decoration text-transform color background-color';

		// Removes any variables since these can't be previewed
		function removeVars(val) {
			return val.replace(/%(\w+)/g, '');
		};

		// Create block/inline element to use for preview
		name = fmt.block || fmt.inline || 'span';
		previewElm = dom.create(name);

		// Add format styles to preview element
		each(fmt.styles, function(value, name) {
			value = removeVars(value);

			if (value)
				dom.setStyle(previewElm, name, value);
		});

		// Add attributes to preview element
		each(fmt.attributes, function(value, name) {
			value = removeVars(value);

			if (value)
				dom.setAttrib(previewElm, name, value);
		});

		// Add classes to preview element
		each(fmt.classes, function(value) {
			value = removeVars(value);

			if (!dom.hasClass(previewElm, value))
				dom.addClass(previewElm, value);
		});

		// Add the previewElm outside the visual area
		dom.setStyles(previewElm, {position: 'absolute', left: -0xFFFF});
		ed.getBody().appendChild(previewElm);

		// Get parent container font size so we can compute px values out of em/% for older IE:s
		parentFontSize = dom.getStyle(ed.getBody(), 'fontSize', true);
		parentFontSize = /px$/.test(parentFontSize) ? parseInt(parentFontSize, 10) : 0;

		each(previewStyles.split(' '), function(name) {
			var value = dom.getStyle(previewElm, name, true);

			// If background is transparent then check if the body has a background color we can use
			if (name == 'background-color' && /transparent|rgba\s*\([^)]+,\s*0\)/.test(value)) {
				value = dom.getStyle(ed.getBody(), name, true);

				// Ignore white since it's the default color, not the nicest fix
				if (dom.toHex(value).toLowerCase() == '#ffffff') {
					return;
				}
			}

			// Old IE won't calculate the font size so we need to do that manually
			if (name == 'font-size') {
				if (/em|%$/.test(value)) {
					if (parentFontSize === 0) {
						return;
					}

					// Convert font size from em/% to px
					value = parseFloat(value, 10) / (/%$/.test(value) ? 100 : 1);
					value = (value * parentFontSize) + 'px';
				}
			}

			previewCss += name + ':' + value + ';';
		});

		dom.remove(previewElm);

		return previewCss;
	};

	// Tell it to load theme specific language pack(s)
	tinymce.ThemeManager.requireLangPack('advanced');

	tinymce.create('tinymce.themes.AdvancedTheme', {
		sizes : [8, 10, 12, 14, 18, 24, 36],

		// Control name lookup, format: title, command
		controls : {
			bold : ['bold_desc', 'Bold'],
			italic : ['italic_desc', 'Italic'],
			underline : ['underline_desc', 'Underline'],
			strikethrough : ['striketrough_desc', 'Strikethrough'],
			justifyleft : ['justifyleft_desc', 'JustifyLeft'],
			justifycenter : ['justifycenter_desc', 'JustifyCenter'],
			justifyright : ['justifyright_desc', 'JustifyRight'],
			justifyfull : ['justifyfull_desc', 'JustifyFull'],
			bullist : ['bullist_desc', 'InsertUnorderedList'],
			numlist : ['numlist_desc', 'InsertOrderedList'],
			outdent : ['outdent_desc', 'Outdent'],
			indent : ['indent_desc', 'Indent'],
			cut : ['cut_desc', 'Cut'],
			copy : ['copy_desc', 'Copy'],
			paste : ['paste_desc', 'Paste'],
			undo : ['undo_desc', 'Undo'],
			redo : ['redo_desc', 'Redo'],
			link : ['link_desc', 'mceLink'],
			unlink : ['unlink_desc', 'unlink'],
			image : ['image_desc', 'mceImage'],
			cleanup : ['cleanup_desc', 'mceCleanup'],
			help : ['help_desc', 'mceHelp'],
			code : ['code_desc', 'mceCodeEditor'],
			hr : ['hr_desc', 'InsertHorizontalRule'],
			removeformat : ['removeformat_desc', 'RemoveFormat'],
			sub : ['sub_desc', 'subscript'],
			sup : ['sup_desc', 'superscript'],
			forecolor : ['forecolor_desc', 'ForeColor'],
			forecolorpicker : ['forecolor_desc', 'mceForeColor'],
			backcolor : ['backcolor_desc', 'HiliteColor'],
			backcolorpicker : ['backcolor_desc', 'mceBackColor'],
			charmap : ['charmap_desc', 'mceCharMap'],
			visualaid : ['visualaid_desc', 'mceToggleVisualAid'],
			anchor : ['anchor_desc', 'mceInsertAnchor'],
			newdocument : ['newdocument_desc', 'mceNewDocument'],
			blockquote : ['blockquote_desc', 'mceBlockQuote']
		},

		stateControls : ['bold', 'italic', 'underline', 'strikethrough', 'bullist', 'numlist', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'sub', 'sup', 'blockquote'],

		init : function(ed, url) {
			var t = this, s, v, o;

			t.editor = ed;
			t.url = url;
			t.onResolveName = new tinymce.util.Dispatcher(this);
			s = ed.settings;

			ed.forcedHighContrastMode = ed.settings.detect_highcontrast && t._isHighContrast();
			ed.settings.skin = ed.forcedHighContrastMode ? 'highcontrast' : ed.settings.skin;

			// Setup default buttons
			if (!s.theme_advanced_buttons1) {
				s = extend({
					theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect",
					theme_advanced_buttons2 : "bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code",
					theme_advanced_buttons3 : "hr,removeformat,visualaid,|,sub,sup,|,charmap"
				}, s);
			}

			// Default settings
			t.settings = s = extend({
				theme_advanced_path : true,
				theme_advanced_toolbar_location : 'top',
				theme_advanced_blockformats : "p,address,pre,h1,h2,h3,h4,h5,h6",
				theme_advanced_toolbar_align : "left",
				theme_advanced_statusbar_location : "bottom",
				theme_advanced_fonts : "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
				theme_advanced_more_colors : 1,
				theme_advanced_row_height : 23,
				theme_advanced_resize_horizontal : 1,
				theme_advanced_resizing_use_cookie : 1,
				theme_advanced_font_sizes : "1,2,3,4,5,6,7",
				theme_advanced_font_selector : "span",
				theme_advanced_show_current_color: 0,
				readonly : ed.settings.readonly
			}, s);

			// Setup default font_size_style_values
			if (!s.font_size_style_values)
				s.font_size_style_values = "8pt,10pt,12pt,14pt,18pt,24pt,36pt";

			if (tinymce.is(s.theme_advanced_font_sizes, 'string')) {
				s.font_size_style_values = tinymce.explode(s.font_size_style_values);
				s.font_size_classes = tinymce.explode(s.font_size_classes || '');

				// Parse string value
				o = {};
				ed.settings.theme_advanced_font_sizes = s.theme_advanced_font_sizes;
				each(ed.getParam('theme_advanced_font_sizes', '', 'hash'), function(v, k) {
					var cl;

					if (k == v && v >= 1 && v <= 7) {
						k = v + ' (' + t.sizes[v - 1] + 'pt)';
						cl = s.font_size_classes[v - 1];
						v = s.font_size_style_values[v - 1] || (t.sizes[v - 1] + 'pt');
					}

					if (/^\s*\./.test(v))
						cl = v.replace(/\./g, '');

					o[k] = cl ? {'class' : cl} : {fontSize : v};
				});

				s.theme_advanced_font_sizes = o;
			}

			if ((v = s.theme_advanced_path_location) && v != 'none')
				s.theme_advanced_statusbar_location = s.theme_advanced_path_location;

			if (s.theme_advanced_statusbar_location == 'none')
				s.theme_advanced_statusbar_location = 0;

			if (ed.settings.content_css !== false)
				ed.contentCSS.push(ed.baseURI.toAbsolute(url + "/skins/" + ed.settings.skin + "/content.css"));

			// Init editor
			ed.onInit.add(function() {
				if (!ed.settings.readonly) {
					ed.onNodeChange.add(t._nodeChanged, t);
					ed.onKeyUp.add(t._updateUndoStatus, t);
					ed.onMouseUp.add(t._updateUndoStatus, t);
					ed.dom.bind(ed.dom.getRoot(), 'dragend', function() {
						t._updateUndoStatus(ed);
					});
				}
			});

			ed.onSetProgressState.add(function(ed, b, ti) {
				var co, id = ed.id, tb;

				if (b) {
					t.progressTimer = setTimeout(function() {
						co = ed.getContainer();
						co = co.insertBefore(DOM.create('DIV', {style : 'position:relative'}), co.firstChild);
						tb = DOM.get(ed.id + '_tbl');

						DOM.add(co, 'div', {id : id + '_blocker', 'class' : 'mceBlocker', style : {width : tb.clientWidth + 2, height : tb.clientHeight + 2}});
						DOM.add(co, 'div', {id : id + '_progress', 'class' : 'mceProgress', style : {left : tb.clientWidth / 2, top : tb.clientHeight / 2}});
					}, ti || 0);
				} else {
					DOM.remove(id + '_blocker');
					DOM.remove(id + '_progress');
					clearTimeout(t.progressTimer);
				}
			});

			DOM.loadCSS(s.editor_css ? ed.documentBaseURI.toAbsolute(s.editor_css) : url + "/skins/" + ed.settings.skin + "/ui.css");

			if (s.skin_variant)
				DOM.loadCSS(url + "/skins/" + ed.settings.skin + "/ui_" + s.skin_variant + ".css");
		},

		_isHighContrast : function() {
			var actualColor, div = DOM.add(DOM.getRoot(), 'div', {'style': 'background-color: rgb(171,239,86);'});

			actualColor = (DOM.getStyle(div, 'background-color', true) + '').toLowerCase().replace(/ /g, '');
			DOM.remove(div);

			return actualColor != 'rgb(171,239,86)' && actualColor != '#abef56';
		},

		createControl : function(n, cf) {
			var cd, c;

			if (c = cf.createControl(n))
				return c;

			switch (n) {
				case "styleselect":
					return this._createStyleSelect();

				case "formatselect":
					return this._createBlockFormats();

				case "fontselect":
					return this._createFontSelect();

				case "fontsizeselect":
					return this._createFontSizeSelect();

				case "forecolor":
					return this._createForeColorMenu();

				case "backcolor":
					return this._createBackColorMenu();
			}

			if ((cd = this.controls[n]))
				return cf.createButton(n, {title : "advanced." + cd[0], cmd : cd[1], ui : cd[2], value : cd[3]});
		},

		execCommand : function(cmd, ui, val) {
			var f = this['_' + cmd];

			if (f) {
				f.call(this, ui, val);
				return true;
			}

			return false;
		},

		_importClasses : function(e) {
			var ed = this.editor, ctrl = ed.controlManager.get('styleselect');

			if (ctrl.getLength() == 0) {
				each(ed.dom.getClasses(), function(o, idx) {
					var name = 'style_' + idx, fmt;

					fmt = {
						inline : 'span',
						attributes : {'class' : o['class']},
						selector : '*'
					};

					ed.formatter.register(name, fmt);

					ctrl.add(o['class'], name, {
						style: function() {
							return getPreviewCss(ed, fmt);
						}
					});
				});
			}
		},

		_createStyleSelect : function(n) {
			var t = this, ed = t.editor, ctrlMan = ed.controlManager, ctrl;

			// Setup style select box
			ctrl = ctrlMan.createListBox('styleselect', {
				title : 'advanced.style_select',
				onselect : function(name) {
					var matches, formatNames = [], removedFormat;

					each(ctrl.items, function(item) {
						formatNames.push(item.value);
					});

					ed.focus();
					ed.undoManager.add();

					// Toggle off the current format(s)
					matches = ed.formatter.matchAll(formatNames);
					tinymce.each(matches, function(match) {
						if (!name || match == name) {
							if (match)
								ed.formatter.remove(match);

							removedFormat = true;
						}
					});

					if (!removedFormat)
						ed.formatter.apply(name);

					ed.undoManager.add();
					ed.nodeChanged();

					return false; // No auto select
				}
			});

			// Handle specified format
			ed.onPreInit.add(function() {
				v