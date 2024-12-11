interface PFunctionConstructor extends FunctionConstructor {
	pCall: Function,
	pApply: Function,
}

(Function.prototype as PFunctionConstructor).pCall = function(ctx: Record<string | symbol, any> = window, ...argments: any) {
	if (typeof ctx !== 'object') ctx = Object(ctx);

	const key = Symbol();
	ctx[key] = this; // 将函数作为对象的一个属性

	const result = ctx[key](...argments); // 执行
	delete ctx[key]; // 避免污染对象

	return result;
}

(Function.prototype as PFunctionConstructor).pApply = function(ctx: Record<string | symbol, any> = window, argments: any[]) {
	if (typeof ctx !== 'object') ctx = Object(ctx);

	const key = Symbol();
	ctx[key] = this; // 将函数作为对象的一个属性

	const result = ctx[key](...argments); // 执行
	delete ctx[key]; // 避免污染对象

	return result;
}

Function.prototype.pBind = function(ctx = window, ...argments) {
	const self = this;

	const bind = function(...innerArgments) {
		return self.apply(
			// 如果是构造函数的话，这里的this会指向构造函数，所以是true
			// 如果是普通函数的话，这里this会指向window，所以是false，应该绑定到传递的对象上
			this instanceof bind ? this : ctx,
			argments.concat(innerArgments)
		);
	};

	// 如果是构造函数需要继承原型链
	bind.prototype = Object.create(self.prototype);
	return bind;
}
