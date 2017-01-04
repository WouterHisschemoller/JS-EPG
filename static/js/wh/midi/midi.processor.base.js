/**
 * Base functionality for all MIDI processors.
 * @namespace WH
 */

window.WH = window.WH || {};

(function (ns) {
    
    function createMIDIProcessorBase(specs, my) {
        var that,
            settingsView = ns.createMidiProcessorSettingsView,
            
            /**
             * Create parameters from an object of parameter specifications.
             * @param  {Object} paramSpecs Definitions of all the processor's parameters. 
             */
            defineParams = function(paramSpecs) {
                for (var key in paramSpecs) {
                    paramSpecs[key].key = key;
                    paramSpecs[key].callback = paramCallback;
                    my.params[key] = ns.createParameter(paramSpecs[key]);
                }
                // setPreset(my.defaultPreset);
            },
            
            /**
             * Called by the processor's parameters if their value is changed.
             */
            paramCallback = function(key, value, timestamp) {
                // call the plugin's handler for this parameter
                my['$' + key](value, timestamp);
                // update the plugin's view with the new parameter value
                pubSub.trigger(getId(), {
                    key: key,
                    param: params[key]
                });
            },
            
            getParamValue = function(key) {
                if (my.params.hasOwnProperty(key)) {
                    return my.params[key].getValue();
                }
            },
            
            setProperty = function(key, value) {
                if (my.props.hasOwnProperty(key)) {
                    my.props[key] = value;
                } else {
                    console.warn('Property "' + name + '" doesn\'t exist, unable to set value "' + value + '".');
                }
            },
            
            getParameters = function() {
                return my.params;
            },
            
            getProperty = function(key) {
                return my.props[key];
            };
       
        my = my || {};
        my.params = my.param || {};
        my.props = my.props || {};
        my.props.id = specs.id;
        my.props.isSelected = specs.isSelected || false;
        my.defineParams = defineParams;
        
        that = specs.that || {};
        
        that.getParamValue = getParamValue;
        that.setProperty = setProperty;
        that.getProperty = getProperty;
        that.getParameters = getParameters;
        return that;
    };
    
    ns.createMIDIProcessorBase = createMIDIProcessorBase;

})(WH);
