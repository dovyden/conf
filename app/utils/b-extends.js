import b_ from 'b_';


/**
 * add to class names our string
 *
 * @param {string} [mixedClass] mixed classes
 * @param {string|Object} [element] element class name or block modifiers
 * @param {Object} [modifiers] element modifiers
 * @return {string}
 */
function mix(mixedClass, element, modifiers) {
    const b = this(element, modifiers);

    return mixedClass ? `${b} ${mixedClass}` : b;
}

/**
 * injects mix method to instance of `b_.lock`
 *
 * @param {Array} args
 * @return {function}
 */
function lock(...args) {
    const b = withMixin.apply(this, args);  // eslint-disable-line no-use-before-define
    b.mix = mix;

    return b;
}

/**
 * returns partially applied `b_` (internal method of `b_`)
 * @type function
 */
const withMixin = b_.lock;
b_['with'] = b_.lock = lock;
