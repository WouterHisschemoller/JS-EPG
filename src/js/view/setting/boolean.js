import { dispatch, getActions, STATE_CHANGE, } from '../../state/store.js';
import createBaseSettingView from './base.js';

/**
 * Processor setting view for a Boolean type parameter,
 * which has a checkbox input.
 */
export default function createBooleanSettingView(specs, my) {
	let that,
		checkEl;
		
	const init = function() {
			let id = getTemporaryInputAndLabelId();
			
			checkEl = my.el.querySelector('.setting__check');
			checkEl.value = my.data.default;
			checkEl.setAttribute('id', id);
			checkEl.addEventListener('change', onChange);
			
			let labelEl = my.el.querySelector('.toggle__label');
			labelEl.setAttribute('for', id);
			
			initData();
			setValue(my.data.value);
		},

		initData = function() {
		},
		
		/**
		 * A quick ID to tie label to input elements.
		 * @return {Number} Unique ID.
		 */
		getTemporaryInputAndLabelId = function() {
			return 'id' + Math.random() + performance.now();
		},
		
		onChange = function(e) {
			dispatch(getActions().changeParameter(
				my.processorId, 
				my.key, 
				e.target.checked));
		},
		
		setValue = function(value) {
			checkEl.checked = value;
		};
	
	my = my || {};
	my.setValue = setValue;
	
	that = createBaseSettingView(specs, my);
	
	init();
	
	return that;
}
