"use strict";

Ext.define('SppAppClassic.view.main.MultiHighlight', {
    extend: 'Ext.slider.Multi',

    setHighlightMargins: function() {
        var values = this.getValue();

        // set the margins of the highlight based on the first and last value
        this.highlightEl.setStyle({
            marginLeft: (values[0]) + '%',
            marginRight: (100 - values[values.length-1]) + '%'
        });

        this.highlightEl.parent().select('.x-slider-thumb').setStyle('z-index', 10000);
    },

    listeners: {
        render: function(slider) {
            var innerEl = slider.getEl().down('.x-slider-inner');

            // append a new element used for highlighting
            slider.highlightEl = innerEl.appendChild({
                tag: 'div',
                cls: 'slider-highlightEl',
                style: {
                    backgroundColor: 'yellow',
                    height: '7px',
                    position: 'relative',
                    top: '4px'
                }
            });

            this.setHighlightMargins();
        },
        beforechange: function(slider, newValue, oldValue) {
            // adjust the highlight margin as the thumbs are moved
            this.setHighlightMargins();
        }
    }
});

Ext.create('Fiddle.slider.MultiHighlight', {
    width: 200,
    values: [25, 50, 75],
    increment: 5,
    minValue: 0,
    maxValue: 100,

    renderTo: Ext.getBody()
});
