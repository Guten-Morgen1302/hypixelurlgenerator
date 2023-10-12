/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@sugardev/ecommerce-streams/dist/bg/message-managers/message.types.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@sugardev/ecommerce-streams/dist/bg/message-managers/message.types.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

    "use strict";

    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.InternalMessageBgType = exports.MessageBgType = void 0;
    var MessageBgType;
    (function (MessageBgType) {
        MessageBgType["INIT"] = "INIT";
        MessageBgType["REQUEST_HANDLE"] = "REQUEST_HANDLE";
        MessageBgType["IFRAME_LOADED"] = "IFRAME_LOADED";
    })(MessageBgType = exports.MessageBgType || (exports.MessageBgType = {}));
    var InternalMessageBgType;
    (function (InternalMessageBgType) {
        InternalMessageBgType["TRACK"] = "ECOMMERCE_INTERNAL_TRACK";
    })(InternalMessageBgType = exports.InternalMessageBgType || (exports.InternalMessageBgType = {}));
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js":
    /*!******************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js ***!
      \******************************************************************************/
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.debounce = exports.DEFAULT_DEBOUNCE_TIME = exports.pipe = exports.uuid = exports.isIframe = void 0;
    function isIframe() {
        try {
            return window.self !== window.top;
        }
        catch {
            return true;
        }
    }
    exports.isIframe = isIframe;
    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    exports.uuid = uuid;
    const pipe = (...composition) => (initialValue) => composition.reduce((value, composer) => composer(value), initialValue);
    exports.pipe = pipe;
    exports.DEFAULT_DEBOUNCE_TIME = 150;
    const debounce = (callback, wait = exports.DEFAULT_DEBOUNCE_TIME) => {
        let timerId = 0;
        const callable = (...args) => {
            clearTimeout(timerId);
            // @ts-expect-error
            timerId = setTimeout(() => callback(...args), wait);
        };
        return callable;
    };
    exports.debounce = debounce;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/ecommerce-streams/dist/common/observer/Observer.js":
    /*!***********************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/common/observer/Observer.js ***!
      \***********************************************************************************/
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Observer = void 0;
    class Observer {
        constructor() {
            this.listeners = {};
        }
        emit(event, payload) {
            if (!this.listeners[event]) {
                return;
            }
            const subscribers = this.listeners[event];
            subscribers.forEach((sub) => sub(payload));
        }
        subscribe(event, subscriber) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(subscriber);
        }
    }
    exports.Observer = Observer;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/extractor/ExtractorManager.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/extractor/ExtractorManager.js ***!
      \*********************************************************************************************/
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ExtractorManager = void 0;
    const extract_1 = __webpack_require__(/*! @sugardev/json-extractor/dist/extract */ "./node_modules/@sugardev/json-extractor/dist/extract.js");
    var ExtractorEvents;
    (function (ExtractorEvents) {
        ExtractorEvents["RUNTIME_STORAGE_SAVE"] = "@runtime.storage.save";
    })(ExtractorEvents || (ExtractorEvents = {}));
    class ExtractorManager {
        constructor(templateVersion, marketplace, outMessageManager, logging, storage, sharedMethods) {
            this.templateVersion = templateVersion;
            this.marketplace = marketplace;
            this.outMessageManager = outMessageManager;
            this.logging = logging;
            this.storage = storage;
            this.sharedMethods = sharedMethods;
        }
        run(config, scope = {}) {
            const extractor = this.makeExtractor(config.operations, document, scope);
            setTimeout(() => {
                void extractor
                    .run()
                    .then(data => {
                    if (data.success) {
                        this.outMessageManager.trackMessage(config.event, this.templateVersion, this.marketplace, data.response, config.customEvent);
                    }
                });
            }, config.waitMs ?? 0);
        }
        get config() {
            return {
                log: this.logging
            };
        }
        makeExtractor(operations, elScope, varScope) {
            const clonedVars = { ...this.storage.getStorage(), ...varScope };
            const extractor = new extract_1.Extractor(this.config, operations, elScope, clonedVars, this.sharedMethods);
            extractor.on(ExtractorEvents.RUNTIME_STORAGE_SAVE, this.onRuntimeStorageSaveExtractorEvent.bind(this));
            return extractor;
        }
        onRuntimeStorageSaveExtractorEvent([name, value]) {
            this.storage.save(name, value);
            this.outMessageManager.runtimeStorageSaveMessage(name, value);
        }
    }
    exports.ExtractorManager = ExtractorManager;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/history/HistoryManager.js":
    /*!*****************************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/history/HistoryManager.js ***!
      \*****************************************************************************************/
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.HistoryManager = void 0;
    var Events;
    (function (Events) {
        Events["URL_CHANGED"] = "URL_CHANGED";
    })(Events || (Events = {}));
    class HistoryManager {
        constructor(observer) {
            this.observer = observer;
            this.scriptAttribute = 'extend-native-history-api';
            this.scriptPath = 'libs/extend-native-history-api.js';
            window.addEventListener('message', (event) => {
                if (event.data._custom_type_ === 'CUSTOM_ON_URL_CHANGED') {
                    this.observer.emit(Events.URL_CHANGED, location.href);
                }
            });
        }
        replaceNativeApi() {
            this.waitDomReady();
        }
        onUrlChanged(func) {
            this.observer.subscribe(Events.URL_CHANGED, func);
        }
        waitDomReady() {
            setTimeout(() => {
                this.injectScript();
            }, 0);
        }
        injectScript() {
            if (this.isHistoryScriptInjected()) {
                return;
            }
            const script = document.createElement('script');
            script.setAttribute('ecommerce-type', this.scriptAttribute);
            const inject = () => {
                const nativePushState = history.pushState;
                const nativeReplaceState = history.replaceState;
                const nativeBack = history.back;
                const nativeForward = history.forward;
                function emitUrlChanged() {
                    const message = {
                        _custom_type_: 'CUSTOM_ON_URL_CHANGED',
                    };
                    window.postMessage(message);
                }
                history.pushState = function () {
                    nativePushState.apply(history, arguments);
                    emitUrlChanged();
                };
                history.replaceState = function () {
                    nativeReplaceState.apply(history, arguments);
                    emitUrlChanged();
                };
                history.back = function () {
                    nativeBack.apply(history, arguments);
                    emitUrlChanged();
                };
                history.forward = function () {
                    nativeForward.apply(history, arguments);
                    emitUrlChanged();
                };
            };
            script.innerHTML = `(${inject.toString()})()`;
            if (document.contentType === 'text/html') {
                (document.head || document.documentElement).append(script);
            }
        }
        isHistoryScriptInjected() {
            const v2Injected = Boolean(document.querySelector(`script[ecommerce-type="${this.scriptAttribute}"]`));
            const v3Injected = Boolean(document.querySelector(`script[src*="${this.scriptPath}"]`));
            return v2Injected || v3Injected;
        }
    }
    exports.HistoryManager = HistoryManager;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/InContentMessageManager.js":
    /*!***********************************************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/InContentMessageManager.js ***!
      \***********************************************************************************************************/
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.InContentMessageManager = void 0;
    const message_types_1 = __webpack_require__(/*! ../../bg/message-managers/message.types */ "./node_modules/@sugardev/ecommerce-streams/dist/bg/message-managers/message.types.js");
    const helpers_1 = __webpack_require__(/*! ../../common/libs/helpers */ "./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js");
    const ExtractorManager_1 = __webpack_require__(/*! ../extractor/ExtractorManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/extractor/ExtractorManager.js");
    const ContentStorage_1 = __webpack_require__(/*! ../storage/ContentStorage */ "./node_modules/@sugardev/ecommerce-streams/dist/content/storage/ContentStorage.js");
    class InContentMessageManager {
        constructor(id, outMessageManager, history, requestsManager) {
            this.id = id;
            this.outMessageManager = outMessageManager;
            this.history = history;
            this.requestsManager = requestsManager;
            chrome.runtime.onMessage.addListener(this.bindListeners.bind(this));
            this.history.onUrlChanged(this.onUrlChanged.bind(this));
            this.requestsManager.onHttpDataSave(this.onHttpDataSave.bind(this));
        }
        onInit(message) {
            const { payload } = message;
            const { logging, templateVersion, config, varScope, marketplace } = payload;
            this.config = config;
            this.logging = logging;
            this.storage = new ContentStorage_1.ContentStorage(this.logging);
            this.extractor = new ExtractorManager_1.ExtractorManager(templateVersion, marketplace, this.outMessageManager, this.logging, this.storage, this.config.func);
            try {
                if (document.body.getAttribute(this.processedFlagAttribute)) {
                    // already initialized
                    return;
                }
            }
            catch (e) {
                // probably it's iframe that temporally does not have body
                setTimeout(() => this.onInit(message), 100);
                return;
            }
            document.body.setAttribute(this.processedFlagAttribute, 'true');
            this.storage.initStorage(varScope);
            this.initClickHandlers();
            this.initLoadHandlers();
        }
        onRequestHandle({ payload }) {
            const { onHttpRequest = [], onHttpResponse = [] } = payload.config;
            if ((onHttpRequest.length > 0) || (onHttpResponse.length > 0)) {
                this.requestsManager.injectInterceptors(onHttpRequest, onHttpResponse);
            }
        }
        onIframeLoaded({ payload }) {
            if ((0, helpers_1.isIframe)()) {
                return;
            }
            const { url } = payload;
            this.config?.onIframeLoaded?.forEach((config) => {
                if (InContentMessageManager.isConfigMatchesUrl(config, url)) {
                    this.extractor?.run?.(config);
                }
            });
        }
        initLoadHandlers() {
            if ((0, helpers_1.isIframe)()) {
                return;
            }
            this.config?.onLoad?.forEach((config) => this.extractor?.run?.(config));
        }
        initClickHandlers() {
            const clickHandler = (event) => {
                const $eventId = (0, helpers_1.uuid)();
                this.config?.onClick?.forEach((config) => {
                    if (event.target.matches(config.selector)) {
                        const scope = {
                            $element: event.target,
                            $event: event,
                            $eventId
                        };
                        this.extractor?.run?.(config, scope);
                    }
                });
            };
            const options = {
                capture: true
            };
            document.addEventListener('click', clickHandler, options);
        }
        onHttpDataSave(data) {
            this.storage.upsert(data.variable, data.payload);
        }
        onUrlChanged(url) {
            this.config?.onUrlChanged?.forEach((config) => {
                if (InContentMessageManager.isConfigMatchesUrl(config, url)) {
                    this.extractor?.run?.(config);
                }
            });
        }
        bindListeners(message) {
            const handler = {
                [message_types_1.MessageBgType.INIT]: this.onInit.bind(this),
                [message_types_1.MessageBgType.REQUEST_HANDLE]: this.onRequestHandle.bind(this),
                [message_types_1.MessageBgType.IFRAME_LOADED]: this.onIframeLoaded.bind(this)
            };
            if (!handler[message.type]) {
                if (this.logging) {
                    console.log('Ignored message', message);
                }
                return;
            }
            handler[message.type](message);
        }
        static isConfigMatchesUrl({ regex }, url) {
            return (new RegExp(regex, 'i')).test(url);
        }
        get processedFlagAttribute() {
            return `__processed_${this.id}__`;
        }
    }
    exports.InContentMessageManager = InContentMessageManager;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/OutContentMessageManager.js":
    /*!************************************************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/OutContentMessageManager.js ***!
      \************************************************************************************************************/
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.OutContentMessageManager = void 0;
    const message_types_1 = __webpack_require__(/*! ./message.types */ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/message.types.js");
    const helpers_1 = __webpack_require__(/*! ../../common/libs/helpers */ "./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js");
    class OutContentMessageManager {
        constructor(id) {
            this.id = id;
        }
        trackMessage(eventType, templateVersion, marketplace, data = {}, customEvent = false) {
            const message = {
                id: this.id,
                type: message_types_1.MessageContentType.ECOMMERCE_TRACK,
                customEvent,
                payload: {
                    templateVersion,
                    marketplace,
                    event: eventType,
                    clientTs: Date.now(),
                    url: location.href,
                    title: document.title,
                    lang: document.documentElement.lang,
                    data,
                },
            };
            this.sendMessage(message);
        }
        initMessage() {
            const message = {
                id: this.id,
                type: message_types_1.MessageContentType.ECOMMERCE_INIT,
                payload: {
                    url: document.location.href,
                    isIframe: (0, helpers_1.isIframe)()
                }
            };
            this.sendMessage(message);
        }
        sendMessage(message) {
            void chrome.runtime.sendMessage(message);
        }
        runtimeStorageSaveMessage(name, data) {
            const message = {
                id: this.id,
                type: message_types_1.MessageContentType.ECOMMERCE_RUNTIME_STORAGE_SAVE,
                payload: {
                    name,
                    data
                }
            };
            this.sendMessage(message);
        }
    }
    exports.OutContentMessageManager = OutContentMessageManager;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/message.types.js":
    /*!*************************************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/message.types.js ***!
      \*************************************************************************************************/
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.MessageContentType = void 0;
    var MessageContentType;
    (function (MessageContentType) {
        MessageContentType["ECOMMERCE_INIT"] = "ECOMMERCE_INIT";
        MessageContentType["ECOMMERCE_TRACK"] = "ECOMMERCE_TRACK";
        MessageContentType["ECOMMERCE_RUNTIME_STORAGE_SAVE"] = "ECOMMERCE_RUNTIME_STORAGE_SAVE";
    })(MessageContentType = exports.MessageContentType || (exports.MessageContentType = {}));
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/requests/RequestsManager.js":
    /*!*******************************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/requests/RequestsManager.js ***!
      \*******************************************************************************************/
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.RequestsManager = void 0;
    var Events;
    (function (Events) {
        Events["SAVE_HTTP_DATA"] = "SAVE_HTTP_DATA";
        Events["INIT_HTTP_SCRIPT"] = "INIT_HTTP_SCRIPT";
    })(Events || (Events = {}));
    class RequestsManager {
        constructor(observer) {
            this.observer = observer;
            this.scriptAttribute = 'requests';
            this.scriptPath = 'requests.js';
            this.isInitiated = false;
            window.addEventListener('message', (event) => {
                if (event.data._custom_type_ === 'SAVE_HTTP_DATA') {
                    this.observer.emit(Events.SAVE_HTTP_DATA, JSON.parse(JSON.stringify(event.data.payload)));
                }
                if (event.data._custom_type_ === 'HTTP_SCRIPT_INITIATED') {
                    this.observer.emit(Events.INIT_HTTP_SCRIPT);
                }
            });
        }
        injectInterceptors(onHttpRequest, onHttpResponse = []) {
            if (this.isInitiated) {
                return;
            }
            this.injectScript();
            const callback = () => {
                const message = {
                    _custom_type_: 'INIT_HTTP_CONFIG',
                    payload: { onHttpRequest, onHttpResponse }
                };
                window.postMessage(message);
            };
            this.sendHttpConfig(callback);
        }
        onHttpDataSave(callback) {
            this.observer.subscribe(Events.SAVE_HTTP_DATA, callback);
        }
        sendHttpConfig(callback) {
            this.observer.subscribe(Events.INIT_HTTP_SCRIPT, callback);
        }
        injectScript() {
            if (this.isRequestsScriptInjected()) {
                return;
            }
            const script = document.createElement('script');
            script.setAttribute('ecommerce-type', this.scriptAttribute);
            const inject = () => {
                class RequestValidator {
                }
                class InterceptorAdapter {
                }
                class InterceptorCommunicator {
                    constructor() {
                        this.dispatchInitEvent();
                    }
                    dispatchEvent(messageEvent) {
                        const message = {
                            _custom_type_: 'SAVE_HTTP_DATA',
                            payload: messageEvent
                        };
                        window.postMessage(message);
                    }
                    dispatchInitEvent() {
                        const message = {
                            _custom_type_: 'HTTP_SCRIPT_INITIATED'
                        };
                        window.postMessage(message);
                    }
                }
                class InterceptorValidator extends RequestValidator {
                    validateRequest(url, method = 'GET') {
                        if (!this.onHttpRequest?.length) {
                            return false;
                        }
                        return this.onHttpRequest.find(this.httpMatherPredicate(url, method)) ?? false;
                    }
                    validateResponse(url, method = 'GET') {
                        if (!this.onHttpResponse?.length) {
                            return false;
                        }
                        return this.onHttpResponse.find(this.httpMatherPredicate(url, method)) ?? false;
                    }
                    setConfig(onHttpRequest, onHttpResponse) {
                        this.onHttpRequest = onHttpRequest;
                        this.onHttpResponse = onHttpResponse;
                    }
                    httpMatherPredicate(url, method) {
                        return ({ regex, methods }) => {
                            const regexMather = new RegExp(regex, 'i');
                            return methods.includes(method) && regexMather.test(url);
                        };
                    }
                }
                class FetchInterceptorAdapter extends InterceptorAdapter {
                    constructor(validator, communicator) {
                        super();
                        this.validator = validator;
                        this.communicator = communicator;
                        this.initInterceptor();
                    }
                    static init(validator, communicator) {
                        if (this.instance) {
                            return;
                        }
                        this.instance = new FetchInterceptorAdapter(validator, communicator);
                    }
                    async interceptRequest(url, params) {
                        const method = params?.method;
                        const body = params?.body;
                        const requestMatches = this.validator.validateRequest(url, method);
                        if (requestMatches) {
                            this.communicator.dispatchEvent({ variable: requestMatches.var, payload: body });
                        }
                    }
                    async interceptResponse(response, [url, params]) {
                        const method = params?.method;
                        const responseMatches = this.validator.validateResponse(url, method);
                        if (responseMatches) {
                            await this.proceedResponse(response, responseMatches.var);
                        }
                    }
                    async proceedResponse(response, variable) {
                        const clonedResponse = await response.clone();
                        const type = response.headers.get('content-type');
                        if (!type) {
                            return;
                        }
                        if (type.includes('json')) {
                            this.communicator.dispatchEvent({ variable, payload: await clonedResponse.json() });
                        }
                        else if (type.includes('text')) {
                            this.communicator.dispatchEvent({ variable, payload: await clonedResponse.text() });
                        }
                    }
                    initInterceptor() {
                        const originalFetch = window.fetch;
                        window.fetch = async (...params) => {
                            // @ts-expect-error
                            void this.interceptRequest(...params);
                            const response = await originalFetch(...params);
                            // @ts-expect-error
                            void this.interceptResponse(response, params);
                            return response;
                        };
                    }
                }
                class HHRInterceptorAdapter extends InterceptorAdapter {
                    constructor(validator, communicator) {
                        super();
                        this.validator = validator;
                        this.communicator = communicator;
                        this.initInterceptor();
                    }
                    static init(validator, communicator) {
                        if (this.instance) {
                            return;
                        }
                        this.instance = new HHRInterceptorAdapter(validator, communicator);
                    }
                    async interceptRequest({ method, url, body }) {
                        const requestMatches = this.validator.validateRequest(url, method);
                        if (requestMatches) {
                            this.communicator.dispatchEvent({ variable: requestMatches.var, payload: body });
                        }
                    }
                    async interceptResponse({ status, response, responseType, method, url }) {
                        const responseMatches = this.validator.validateResponse(url, method);
                        if (`${status}`.startsWith('20') && responseMatches) {
                            this.proceedResponse(response, responseType, responseMatches.var);
                        }
                    }
                    proceedResponse(response, responseType, variable) {
                        if (responseType === 'json') {
                            this.communicator.dispatchEvent({ variable, payload: response });
                        }
                        else if (responseType === 'text' || responseType === '') {
                            try {
                                this.communicator.dispatchEvent({ variable, payload: JSON.parse(response) });
                            }
                            catch {
                                this.communicator.dispatchEvent({ variable, payload: response });
                            }
                        }
                    }
                    initInterceptor() {
                        const open = XMLHttpRequest.prototype.open;
                        const send = XMLHttpRequest.prototype.send;
                        const $this = this;
                        window.XMLHttpRequest.prototype.open = function (...params) {
                            this.__METHOD__ = params[0];
                            this.__URL__ = params[1];
                            this.addEventListener('load', function ({ target }) {
                                void $this.interceptResponse({
                                    status: target.status,
                                    response: target.response,
                                    responseType: target.responseType,
                                    method: params[0],
                                    url: params[1]
                                });
                            });
                            return open.apply(this, params);
                        };
                        window.XMLHttpRequest.prototype.send = function (...params) {
                            void $this.interceptRequest({
                                method: this.__METHOD__,
                                url: this.__URL__,
                                body: params[0]
                            });
                            return send.apply(this, params);
                        };
                    }
                }
                const communicator = new InterceptorCommunicator();
                const validator = new InterceptorValidator();
                FetchInterceptorAdapter.init(validator, communicator);
                HHRInterceptorAdapter.init(validator, communicator);
                window.addEventListener('message', (event) => {
                    if (event.data?._custom_type_ !== 'INIT_HTTP_CONFIG') {
                        return;
                    }
                    const { onHttpRequest, onHttpResponse } = event.data.payload;
                    validator.setConfig(onHttpRequest, onHttpResponse);
                });
            };
            script.innerHTML = `(${inject.toString()})()`;
            if (document.contentType === 'text/html') {
                (document.head || document.documentElement).append(script);
            }
            this.isInitiated = true;
        }
        isRequestsScriptInjected() {
            const v2Injected = Boolean(document.querySelector(`script[ecommerce-type="${this.scriptAttribute}"]`));
            const v3Injected = Boolean(document.querySelector(`script[src*="${this.scriptPath}"]`));
            return v2Injected || v3Injected;
        }
    }
    exports.RequestsManager = RequestsManager;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/ecommerce-streams/dist/content/storage/ContentStorage.js":
    /*!*****************************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/storage/ContentStorage.js ***!
      \*****************************************************************************************/
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ContentStorage = void 0;
    class ContentStorage {
        constructor(logging) {
            this.logging = logging;
            this.runtimeStorage = new Map();
        }
        initStorage(varScope) {
            this.runtimeStorage = new Map(Object.entries(varScope));
        }
        save(name, data) {
            if (this.logging) {
                console.log(`Runtime storage save: key=${name}, value=`, data);
            }
            this.runtimeStorage.set(name, data);
        }
        getStorage() {
            return Object.fromEntries(this.runtimeStorage);
        }
        getItem(name) {
            return this.runtimeStorage.get(name);
        }
        upsert(name, data) {
            const savedData = this.runtimeStorage.has(name) ? [...this.getItem(name), data] : [data];
            if (this.logging) {
                console.log('Runtime storage save intercepted data: ', [name, savedData]);
            }
            this.runtimeStorage.set(name, savedData);
        }
    }
    exports.ContentStorage = ContentStorage;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js":
    /*!**********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js ***!
      \**********************************************************************************/
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.requiredFields = void 0;
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const missedFieldResult = async function* (field) {
        return (0, utils_1.failed)(undefined, `Argument "${field}" is not defined`, extract_types_1.NativeOperationType.MISSING_ARGUMENT_ERROR);
    };
    function requiredFields(...fields) {
        return function (target, propertyKey, descriptor) {
            const originalEntry = descriptor.value;
            descriptor.value = function (operation, ...restArgs) {
                const notFoundField = fields.find(requiredField => !(requiredField in operation));
                if (notFoundField) {
                    return missedFieldResult(notFoundField);
                }
                return originalEntry.call(this, operation, ...restArgs);
            };
        };
    }
    exports.requiredFields = requiredFields;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/extract.js":
    /*!***************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/extract.js ***!
      \***************************************************************/
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Extractor = void 0;
    const observer_1 = __webpack_require__(/*! ./utils/observer */ "./node_modules/@sugardev/json-extractor/dist/utils/observer.js");
    const program_factory_1 = __webpack_require__(/*! ./program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ./utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    class Extractor {
        constructor(config, program, elScope, varScope, funcs) {
            this.config = config;
            this.program = program;
            this.elScope = elScope;
            this.varScope = varScope;
            this.funcs = funcs;
            this.observer = new observer_1.Observer();
        }
        async run() {
            const factory = new program_factory_1.ProgramFactory();
            const main = factory.create(this.config, this.observer, this.elScope, this.varScope, this.funcs);
            main.initTrace();
            if (this.program.length === 0) {
                return {
                    success: false,
                    response: main.getTrace('No operations were provided')
                };
            }
            for (const [index, operation] of Object.entries(this.program)) {
                const result = await main
                    .handle({ operation, index });
                if ((0, utils_1.isFailed)(result, operation)) {
                    return {
                        success: false,
                        response: main.getTrace(result.message)
                    };
                }
                if (result.return) {
                    return {
                        success: true,
                        response: result.value.value
                    };
                }
            }
            return {
                success: false,
                response: main.getTrace('No "return" operation was provided')
            };
        }
        on(event, subscriber) {
            this.observer.subscribe(event, subscriber);
        }
    }
    exports.Extractor = Extractor;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/extract.types.js":
    /*!*********************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/extract.types.js ***!
      \*********************************************************************/
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.FlowList = exports.SINGLE_GET_TYPE = exports.NativeOperationType = exports.OperationType = exports.OperationScope = void 0;
    var OperationScope;
    (function (OperationScope) {
        OperationScope["LOCAL"] = "LOCAL";
        OperationScope["BLOCK"] = "BLOCK";
    })(OperationScope = exports.OperationScope || (exports.OperationScope = {}));
    var OperationType;
    (function (OperationType) {
        OperationType["SINGLE"] = "single";
        OperationType["PLURAL"] = "plural";
        OperationType["SPLIT_SCOPE"] = "splitScope";
        OperationType["OR"] = "or";
        OperationType["AND"] = "and";
        OperationType["COMPUTED"] = "computed";
        OperationType["EXIST"] = "exist";
        OperationType["LOG"] = "log";
        OperationType["IS_NOT_HIDDEN_ELEMENT"] = "isNotHiddenElement";
        OperationType["MARK_PROCESSED_ELEMENT"] = "markProcessedElement";
        OperationType["WAIT_FOR_NOT_PROCESSED_ELEMENT"] = "waitForNotProcessedElement";
        OperationType["FUNC"] = "func";
        OperationType["SELECT"] = "select";
        OperationType["CALL_METHOD"] = "callMethod";
        OperationType["GET_PROPERTY"] = "property";
        OperationType["LITERAL"] = "literal";
        OperationType["VAR"] = "var";
        OperationType["FOR_EACH"] = "forEach";
        OperationType["RETURN"] = "return";
        OperationType["MAP"] = "map";
        OperationType["CLOSEST"] = "closest";
        OperationType["PRICE_PARSER"] = "priceParser";
        OperationType["JSON_PARSER"] = "jsonParser";
        OperationType["EMIT"] = "emit";
        OperationType["FLOW"] = "flow";
        OperationType["CONDITION"] = "condition";
        OperationType["REPLACE"] = "replace";
        OperationType["REPLACE_BETWEEN"] = "replaceBetween";
        OperationType["MATH"] = "math";
        OperationType["CONSTRUCTOR"] = "constructor";
    })(OperationType = exports.OperationType || (exports.OperationType = {}));
    var NativeOperationType;
    (function (NativeOperationType) {
        NativeOperationType["NATIVE_ERROR"] = "nativeError";
        NativeOperationType["MISSING_ARGUMENT_ERROR"] = "missingArgumentError";
    })(NativeOperationType = exports.NativeOperationType || (exports.NativeOperationType = {}));
    var SINGLE_GET_TYPE;
    (function (SINGLE_GET_TYPE) {
        SINGLE_GET_TYPE["TEXT"] = "text";
        SINGLE_GET_TYPE["VALUE"] = "value";
        SINGLE_GET_TYPE["ATTRIBUTE"] = "attribute";
    })(SINGLE_GET_TYPE = exports.SINGLE_GET_TYPE || (exports.SINGLE_GET_TYPE = {}));
    var FlowList;
    (function (FlowList) {
        FlowList["NONE"] = "none";
        FlowList["THEN"] = "then";
        FlowList["ELSE"] = "else";
    })(FlowList = exports.FlowList || (exports.FlowList = {}));
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/computed.js":
    /*!***************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/computed.js ***!
      \***************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Computed = void 0;
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Computed = class Computed {
        constructor(main) {
            this.main = main;
        }
        type() {
            return extract_types_1.OperationType.COMPUTED;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const path = [];
            for (const subject of operation.subjects) {
                const varNameResult = (await this.main
                    .handle({ operation: subject, isChild: true }));
                if (!varNameResult.success) {
                    return (0, utils_1.failed)(undefined, varNameResult.message);
                }
                path.push(varNameResult.value.value);
            }
            let value;
            if (Array.isArray(operation.value)) {
                value = [];
                for (const operationValue of operation.value) {
                    value.push((await this.main
                        .handle({ operation: operationValue, isChild: true })).value.value);
                }
            }
            else {
                value = (await this.main
                    .handle({ operation: operation.value, isChild: true })).value.value;
            }
            const setVarOperation = {
                var: path.join('.'),
                type: extract_types_1.OperationType.LITERAL,
                value,
                accumulate: operation.accumulate
            };
            await this.main
                .handle({ operation: setVarOperation, isChild: true });
            return (0, utils_1.succeeded)(value);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('subjects', 'value'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Computed.prototype, "handle", null);
    Computed = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], Computed);
    exports.Computed = Computed;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/element/closest.js":
    /*!**********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/element/closest.js ***!
      \**********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Closest = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Closest = class Closest {
        constructor(main) {
            this.main = main;
        }
        type() {
            return extract_types_1.OperationType.CLOSEST;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const res = await this.main
                .handle({ operation: operation.subject, isChild: true });
            if (!res.success) {
                return (0, utils_1.failed)(undefined, res.message);
            }
            const subject = res.value.value;
            const selector = await this.main
                .handle({ operation: operation.selector, isChild: true });
            if (!selector.success) {
                return (0, utils_1.failed)(undefined, selector.message);
            }
            try {
                const el = subject.closest(selector.value.value);
                return (0, utils_1.succeeded)(el);
            }
            catch (error) {
                return (0, utils_1.failed)(undefined, error.message, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('subject', 'selector'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Closest.prototype, "handle", null);
    Closest = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], Closest);
    exports.Closest = Closest;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/element/existElement.js":
    /*!***************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/element/existElement.js ***!
      \***************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ExistElement = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let ExistElement = class ExistElement {
        constructor(elScope) {
            this.elScope = elScope;
        }
        type() {
            return extract_types_1.OperationType.EXIST;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            try {
                for (const selector of operation.selectors) {
                    const target = this.elScope.querySelector(selector);
                    if (target != null) {
                        return (0, utils_1.succeeded)(true);
                    }
                }
            }
            catch (e) {
                return (0, utils_1.failed)(undefined, e.message, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            return (0, utils_1.failed)(false, 'No selectors found to exist');
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('selectors'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], ExistElement.prototype, "handle", null);
    ExistElement = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.elScope)),
        __metadata("design:paramtypes", [Object])
    ], ExistElement);
    exports.ExistElement = ExistElement;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/element/isNotHiddenElement.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/element/isNotHiddenElement.js ***!
      \*********************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.IsNotHiddenElement = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const logger_1 = __webpack_require__(/*! ../../utils/logger/logger */ "./node_modules/@sugardev/json-extractor/dist/utils/logger/logger.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let IsNotHiddenElement = class IsNotHiddenElement {
        constructor(elScope, logger) {
            this.elScope = elScope;
            this.logger = logger;
        }
        type() {
            return extract_types_1.OperationType.IS_NOT_HIDDEN_ELEMENT;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            for (const selector of operation.selectors) {
                let target;
                try {
                    target = this.elScope.querySelector(selector);
                }
                catch (error) {
                    this.logger.error('IsNotHiddenElement:', error);
                    // probably not a valid selector is used
                    continue;
                }
                if (target == null) {
                    continue;
                }
                const isVisible = !!(target.offsetWidth || target.offsetHeight || target.getClientRects().length);
                if (!isVisible) {
                    continue;
                }
                return (0, utils_1.succeeded)(true);
            }
            return (0, utils_1.failed)(false, 'No selectors found to be visible');
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('selectors'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], IsNotHiddenElement.prototype, "handle", null);
    IsNotHiddenElement = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.elScope)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.logger)),
        __metadata("design:paramtypes", [Object, logger_1.MyLogger])
    ], IsNotHiddenElement);
    exports.IsNotHiddenElement = IsNotHiddenElement;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/element/select.js":
    /*!*********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/element/select.js ***!
      \*********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Select = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Select = class Select {
        constructor(main, elScope) {
            this.main = main;
            this.elScope = elScope;
        }
        type() {
            return extract_types_1.OperationType.SELECT;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const res = await this.main
                .handle({ operation: operation.selector, isChild: true });
            if (!res.success) {
                return (0, utils_1.failed)(undefined, res.message);
            }
            try {
                const target = this.elScope.querySelector(res.value.value);
                return (0, utils_1.succeeded)(target);
            }
            catch (error) {
                return (0, utils_1.failed)(undefined, error.message, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('selector'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Select.prototype, "handle", null);
    Select = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.elScope)),
        __metadata("design:paramtypes", [program_1.Program, Object])
    ], Select);
    exports.Select = Select;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/emit.js":
    /*!***********************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/emit.js ***!
      \***********************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Emit = void 0;
    const program_1 = __webpack_require__(/*! ../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const observer_1 = __webpack_require__(/*! ../utils/observer */ "./node_modules/@sugardev/json-extractor/dist/utils/observer.js");
    const program_factory_1 = __webpack_require__(/*! ../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Emit = class Emit {
        constructor(main, observer, factory) {
            this.main = main;
            this.observer = observer;
            this.factory = factory;
        }
        type() {
            return extract_types_1.OperationType.EMIT;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const event = await this.main
                .handle({ operation: operation.event, isChild: true });
            if ((0, utils_1.isFailed)(event, operation.event)) {
                return (0, utils_1.failed)(undefined, event.message);
            }
            if (typeof event.value.value !== 'string') {
                return (0, utils_1.failed)(undefined, 'Event name was not provided properly. It should be a string', extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            const result = (0, utils_1.succeeded)([]);
            if ((operation.args != null) && Array.isArray(operation.args)) {
                const program = this.factory.prototype(this.main);
                for (const arg of operation.args) {
                    const payloadResult = await this.main
                        .handle({ operation: arg, isChild: true });
                    if ((0, utils_1.isFailed)(payloadResult, arg)) {
                        return (0, utils_1.failed)(undefined, payloadResult.message);
                    }
                    const payloadValue = payloadResult.value.value;
                    const value = (0, utils_1.isObject)(payloadValue)
                        ? (0, utils_1.clone)(payloadValue)
                        : payloadValue;
                    result.value.value.push(value);
                }
                this.main.mergeVarScope(program.getVarScopeRef());
            }
            this.observer.emit(event.value.value, result ? result.value.value : undefined);
            return (0, utils_1.succeeded)(true);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('event'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Emit.prototype, "handle", null);
    Emit = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.observer)),
        __param(2, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __metadata("design:paramtypes", [program_1.Program,
            observer_1.Observer,
            program_factory_1.ProgramFactory])
    ], Emit);
    exports.Emit = Emit;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/func.js":
    /*!***********************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/func.js ***!
      \***********************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Func = void 0;
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const program_factory_1 = __webpack_require__(/*! ../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Func = class Func {
        constructor(main, factory, funcs) {
            this.main = main;
            this.factory = factory;
            this.funcs = funcs;
        }
        type() {
            return extract_types_1.OperationType.FUNC;
        }
        scope() {
            return extract_types_1.OperationScope.BLOCK;
        }
        async *handle(operation) {
            const res = await this.main
                .handle({
                operation: operation.name,
                isChild: true
            });
            if (!res.success) {
                return (0, utils_1.failed)(undefined, res.message);
            }
            const functionName = res.value.value;
            if (typeof functionName !== 'string' || !this.funcs[functionName]) {
                return (0, utils_1.failed)(undefined, `Operation "${functionName}" can not be found`, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            const func = this.funcs[functionName];
            const localVarScope = {};
            const args = (operation.args != null) ? operation.args : [];
            for (let i = 0; i < args.length; i++) {
                const result = await this.main
                    .handle({ operation: args[i], isChild: true });
                if (!result.success) {
                    return (0, utils_1.failed)(undefined, result.message);
                }
                if (func.params[i]) {
                    const varName = func.params[i];
                    localVarScope[varName] = result.value.value;
                }
            }
            const program = this.factory.create(this.main.getConfig(), this.main.getObserver(), this.main.getElScopeRef(), localVarScope, this.funcs);
            if (func.operations.length === 0) {
                return (0, utils_1.failed)(undefined, 'Function operation list is empty');
            }
            for (const [index, operation] of Object.entries(func.operations)) {
                const result = await program
                    .handle({ operation, index });
                if ((0, utils_1.isFailed)(result, operation)) {
                    return (0, utils_1.failed)(undefined, result.message);
                }
                if (operation.type === extract_types_1.OperationType.RETURN) {
                    return (0, utils_1.succeeded)(result.value.value);
                }
            }
            return (0, utils_1.succeeded)(undefined);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('name'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Func.prototype, "handle", null);
    Func = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __param(2, (0, inversify_1.inject)(program_types_1.Injections.funcs)),
        __metadata("design:paramtypes", [program_1.Program,
            program_factory_1.ProgramFactory, Object])
    ], Func);
    exports.Func = Func;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/literal.js":
    /*!**************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/literal.js ***!
      \**************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Literal = void 0;
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const required_fields_1 = __webpack_require__(/*! ../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Literal = class Literal {
        type() {
            return extract_types_1.OperationType.LITERAL;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            return (0, utils_1.succeeded)(operation.value);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('value'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Literal.prototype, "handle", null);
    Literal = __decorate([
        (0, inversify_1.injectable)()
    ], Literal);
    exports.Literal = Literal;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/log.js":
    /*!**********************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/log.js ***!
      \**********************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Log = void 0;
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const logger_tracer_1 = __webpack_require__(/*! ../utils/trace/logger.tracer */ "./node_modules/@sugardev/json-extractor/dist/utils/trace/logger.tracer.js");
    const required_fields_1 = __webpack_require__(/*! ../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    const logger_1 = __webpack_require__(/*! ../utils/logger/logger */ "./node_modules/@sugardev/json-extractor/dist/utils/logger/logger.js");
    let Log = class Log {
        constructor(varScope, loggerTracer, logger) {
            this.varScope = varScope;
            this.loggerTracer = loggerTracer;
            this.logger = logger;
        }
        type() {
            return extract_types_1.OperationType.LOG;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle({ args, msg }) {
            let params;
            if (args) {
                const argsAsArray = Array.isArray(args) ? args : [args];
                params = Object.values(argsAsArray).reduce((acc, key) => ({
                    ...acc,
                    [key]: this.varScope[key]
                }), {});
                this.loggerTracer.log(msg, params);
            }
            else {
                this.loggerTracer.log(msg);
            }
            if (params != null) {
                this.logger.log(msg, params);
            }
            else {
                this.logger.log(msg);
            }
            return (0, utils_1.succeeded)(true);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('msg'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Log.prototype, "handle", null);
    Log = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.varScope)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.loggerTracer)),
        __param(2, (0, inversify_1.inject)(program_types_1.Injections.logger)),
        __metadata("design:paramtypes", [Object, logger_tracer_1.LoggerTracer,
            logger_1.MyLogger])
    ], Log);
    exports.Log = Log;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/logical/and.js":
    /*!******************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/logical/and.js ***!
      \******************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.And = void 0;
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const program_factory_1 = __webpack_require__(/*! ../../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let And = class And {
        constructor(main, factory) {
            this.main = main;
            this.factory = factory;
        }
        type() {
            return extract_types_1.OperationType.AND;
        }
        scope() {
            return extract_types_1.OperationScope.BLOCK;
        }
        async *handle(and) {
            const program = this.factory.prototype(this.main);
            for (const [index, operation] of Object.entries(and.operations ?? [])) {
                const result = await program
                    .handle({ operation, index });
                if ((0, utils_1.isFailed)(result, operation) || !result.value.value) {
                    return (0, utils_1.failed)(false, result.message);
                }
            }
            this.main.mergeVarScope(program.getVarScopeRef());
            return (0, utils_1.succeeded)(true);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('operations'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], And.prototype, "handle", null);
    And = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __metadata("design:paramtypes", [program_1.Program,
            program_factory_1.ProgramFactory])
    ], And);
    exports.And = And;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/logical/condition.js":
    /*!************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/logical/condition.js ***!
      \************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Condition = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const program_factory_1 = __webpack_require__(/*! ../../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Condition = class Condition {
        constructor(main, factory) {
            this.main = main;
            this.factory = factory;
        }
        type() {
            return extract_types_1.OperationType.CONDITION;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(condition) {
            const program = this.factory.prototype(this.main);
            const left = await program
                .handle({ operation: condition.left, isChild: true });
            if (!left.success) {
                return (0, utils_1.failed)(false, left.message);
            }
            const right = await program
                .handle({ operation: condition.right, isChild: true });
            if (!right.success) {
                return (0, utils_1.failed)(false, right.message);
            }
            const handlers = {
                '!=': () => left.value.value != right.value.value,
                '!==': () => left.value.value !== right.value.value,
                '>': () => left.value.value > right.value.value,
                '<': () => left.value.value < right.value.value,
                '<=': () => left.value.value <= right.value.value,
                '>=': () => left.value.value >= right.value.value,
                '==': () => left.value.value == right.value.value,
                '===': () => left.value.value === right.value.value
            };
            if (!handlers[condition.operator]) {
                return (0, utils_1.failed)(undefined, `Unsupportable condition operator "${condition.operator}"`, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            const result = handlers[condition.operator]();
            if (result) {
                this.main.mergeVarScope(program.getVarScopeRef());
                return (0, utils_1.succeeded)(true);
            }
            return (0, utils_1.failed)(false, `Condition ${left.value.value} ${condition.operator} ${right.value.value} => false`);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('operator', 'left', 'right'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Condition.prototype, "handle", null);
    Condition = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __metadata("design:paramtypes", [program_1.Program,
            program_factory_1.ProgramFactory])
    ], Condition);
    exports.Condition = Condition;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/logical/flow.js":
    /*!*******************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/logical/flow.js ***!
      \*******************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Flow = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const program_factory_1 = __webpack_require__(/*! ../../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Flow = class Flow {
        constructor(main, factory) {
            this.main = main;
            this.factory = factory;
        }
        type() {
            return extract_types_1.OperationType.FLOW;
        }
        scope() {
            return extract_types_1.OperationScope.BLOCK;
        }
        async *handle(flow) {
            const conditionResult = {
                condition: true,
                flow: {
                    name: extract_types_1.FlowList.NONE,
                    result: true
                }
            };
            const program = this.factory.prototype(this.main);
            const conditionProgram = this.factory.prototype(this.main);
            for (const operation of flow.condition) {
                const result = await conditionProgram
                    .handle({ operation, isChild: true });
                if (!result.success || !result.value.value) {
                    conditionResult.condition = false;
                    break;
                }
            }
            if (conditionResult.condition) {
                program.mergeVarScope(conditionProgram.getVarScopeRef());
            }
            const currFlowName = conditionResult.condition ? extract_types_1.FlowList.THEN : extract_types_1.FlowList.ELSE;
            if (currFlowName === extract_types_1.FlowList.ELSE && typeof flow[currFlowName] === 'undefined') {
                return (0, utils_1.failed)(conditionResult, `condition is "FALSE". "${currFlowName}" is not defined`, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            if (typeof flow[currFlowName] !== 'undefined') {
                let block;
                let subProgram;
                conditionResult.flow.name = currFlowName;
                try {
                    block = this.mapFlowBlockToFullFormat(flow[currFlowName], currFlowName);
                    subProgram = this.factory.prototype(program);
                }
                catch (error) {
                    return (0, utils_1.failed)(undefined, error.message, extract_types_1.NativeOperationType.NATIVE_ERROR);
                }
                yield {
                    condition: conditionResult.condition,
                    flow: {
                        result: true,
                        name: currFlowName
                    }
                };
                for (const [index, operation] of Object.entries(block.operations ?? [])) {
                    let failStatus = false;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    let result = {};
                    result = await subProgram
                        .handle({ operation, index });
                    failStatus = (0, utils_1.isFailed)(result, operation);
                    if (failStatus) {
                        conditionResult.flow.result = false;
                        return block.optional ? (0, utils_1.succeeded)(conditionResult) : (0, utils_1.failed)(conditionResult, result.message);
                    }
                }
                program.mergeVarScope(subProgram.getVarScopeRef());
            }
            this.main.mergeVarScope(program.getVarScopeRef());
            return (0, utils_1.succeeded)(conditionResult);
        }
        mapFlowBlockToFullFormat(block, currFlowName) {
            if (Array.isArray(block)) {
                return {
                    optional: false,
                    operations: block
                };
            }
            if ((0, utils_1.isObject)(block)) {
                return block;
            }
            throw new Error(`Could not map a block "${currFlowName}", cause it's "${block}"`);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('condition'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Flow.prototype, "handle", null);
    Flow = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __metadata("design:paramtypes", [program_1.Program,
            program_factory_1.ProgramFactory])
    ], Flow);
    exports.Flow = Flow;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/logical/or.js":
    /*!*****************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/logical/or.js ***!
      \*****************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Or = void 0;
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const program_factory_1 = __webpack_require__(/*! ../../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Or = class Or {
        constructor(main, factory) {
            this.main = main;
            this.factory = factory;
        }
        type() {
            return extract_types_1.OperationType.OR;
        }
        scope() {
            return extract_types_1.OperationScope.BLOCK;
        }
        async *handle(or) {
            for (const [index, operation] of Object.entries(or.operations)) {
                const program = this.factory.prototype(this.main);
                const result = await program
                    .handle({ operation, index });
                if (result.success && result.value.value) {
                    this.main.mergeVarScope(program.getVarScopeRef());
                    return (0, utils_1.succeeded)(true);
                }
            }
            return (0, utils_1.failed)(false, 'All of the "or" operations are falsy');
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('operations'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Or.prototype, "handle", null);
    Or = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __metadata("design:paramtypes", [program_1.Program,
            program_factory_1.ProgramFactory])
    ], Or);
    exports.Or = Or;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/loop/forEach.js":
    /*!*******************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/loop/forEach.js ***!
      \*******************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ForEach = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const program_factory_1 = __webpack_require__(/*! ../../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let ForEach = class ForEach {
        constructor(main, factory) {
            this.main = main;
            this.factory = factory;
        }
        type() {
            return extract_types_1.OperationType.FOR_EACH;
        }
        scope() {
            return extract_types_1.OperationScope.BLOCK;
        }
        async *handle(operation) {
            const res = await this.main
                .handle({ operation: operation.subject, isChild: true });
            if (!res.success) {
                return (0, utils_1.failed)(undefined, res.message);
            }
            const subject = res.value.value;
            const subProgram = this.factory.prototype(this.main);
            for (let i = 0; i < subject.length; i++) {
                const setIndex = {
                    type: extract_types_1.OperationType.LITERAL,
                    var: operation.index ?? '$index',
                    value: i
                };
                const setItem = {
                    type: extract_types_1.OperationType.LITERAL,
                    var: operation.item ?? '$item',
                    value: subject[i]
                };
                await subProgram
                    .handle({ operation: setIndex, isChild: true });
                await subProgram
                    .handle({ operation: setItem, isChild: true });
                for (const [index, command] of Object.entries(operation.forEach)) {
                    const res = await subProgram
                        .handle({ operation: command, index });
                    if ((0, utils_1.isFailed)(res, command)) {
                        return (0, utils_1.failed)(undefined, res.message);
                    }
                }
            }
            this.main.mergeVarScope(subProgram.getVarScopeRef());
            return (0, utils_1.succeeded)(true);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('subject', 'forEach'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], ForEach.prototype, "handle", null);
    ForEach = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __metadata("design:paramtypes", [program_1.Program,
            program_factory_1.ProgramFactory])
    ], ForEach);
    exports.ForEach = ForEach;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/map.js":
    /*!**********************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/map.js ***!
      \**********************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Map = void 0;
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Map = class Map {
        constructor(main) {
            this.main = main;
        }
        type() {
            return extract_types_1.OperationType.MAP;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const subjectResult = (await this.main
                .handle({ operation: operation.subject, isChild: true }));
            if (!subjectResult.success) {
                return (0, utils_1.failed)(undefined, subjectResult.message);
            }
            const subject = subjectResult.value.value;
            const dictionaries = (await this.main
                .handle({ operation: operation.dictionary, isChild: true })).value.value ?? [];
            let search = operation.trim === false ? subject : subject.trim();
            const caseSensitiveDisabled = operation.caseSensitive === undefined ? true : !operation.caseSensitive;
            search = caseSensitiveDisabled ? search.toLowerCase() : search;
            for (const dictionary of dictionaries) {
                const keys = caseSensitiveDisabled ? dictionary.key.map((k) => k.toLowerCase()) : dictionary.key;
                if (keys.includes(search)) {
                    return (0, utils_1.succeeded)(dictionary.value);
                }
            }
            return (0, utils_1.failed)(undefined, `Subject "${subject}" was not found in any dictionary to map`);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('subject', 'dictionary'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Map.prototype, "handle", null);
    Map = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], Map);
    exports.Map = Map;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/math/math-action.js":
    /*!***********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/math/math-action.js ***!
      \***********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.MathAction = void 0;
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const program_factory_1 = __webpack_require__(/*! ../../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let MathAction = class MathAction {
        constructor(main, factory) {
            this.main = main;
            this.factory = factory;
        }
        type() {
            return extract_types_1.OperationType.MATH;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const program = this.factory.prototype(this.main);
            const left = await program
                .handle({ operation: operation.left, isChild: true });
            if (!left.success) {
                return (0, utils_1.failed)(undefined, left.message);
            }
            const right = await program
                .handle({ operation: operation.right, isChild: true });
            if (!right.success) {
                return (0, utils_1.failed)(undefined, right.message);
            }
            const leftValue = Number(left.value.value);
            const rightValue = Number(right.value.value);
            if (Number.isNaN(leftValue)) {
                return (0, utils_1.failed)(undefined, `Value "${left.value.value}" could not be parsed as number`);
            }
            if (Number.isNaN(rightValue)) {
                return (0, utils_1.failed)(undefined, `Value "${right.value.value}" could not be parsed as number`);
            }
            const handler = this.mathHandlers[operation.sign];
            if (!handler) {
                return (0, utils_1.failed)(undefined, `Unsupportable math sign "${operation.sign}"`);
            }
            const result = handler(leftValue, rightValue);
            if (Number.isNaN(result)) {
                return (0, utils_1.failed)(undefined, `Result is not a number. Left: "${leftValue}". Right: "${rightValue}". Sign: "${operation.sign}"`);
            }
            return (0, utils_1.succeeded)(result);
        }
        get mathHandlers() {
            return {
                '+': (left, right) => left + right,
                '-': (left, right) => left - right,
                '*': (left, right) => left * right,
                '/': (left, right) => left / right,
                '%': (left, right) => left % right
            };
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('left', 'right', 'sign'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], MathAction.prototype, "handle", null);
    MathAction = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __metadata("design:paramtypes", [program_1.Program,
            program_factory_1.ProgramFactory])
    ], MathAction);
    exports.MathAction = MathAction;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/object/callMethod.js":
    /*!************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/object/callMethod.js ***!
      \************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.CallMethod = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let CallMethod = class CallMethod {
        constructor(main) {
            this.main = main;
        }
        type() {
            return extract_types_1.OperationType.CALL_METHOD;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const subjectResult = await this.main
                .handle({ operation: operation.subject, isChild: true });
            if (!subjectResult.success) {
                return (0, utils_1.failed)(undefined, subjectResult.message);
            }
            const subject = subjectResult.value.value;
            const args = [];
            for (const argument of operation.args ?? []) {
                const result = await this.main
                    .handle({ operation: argument, isChild: true });
                args.push(result.value.value);
            }
            // eslint-disable-next-line prefer-spread
            const result = subject[operation.method].apply(subject, args);
            return (0, utils_1.succeeded)(result);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('subject', 'method'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], CallMethod.prototype, "handle", null);
    CallMethod = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], CallMethod);
    exports.CallMethod = CallMethod;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/object/constructor.js":
    /*!*************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/object/constructor.js ***!
      \*************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Constructor = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Constructor = class Constructor {
        constructor(main) {
            this.main = main;
        }
        type() {
            return extract_types_1.OperationType.CONSTRUCTOR;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const { constructor } = operation;
            const constructorExists = globalThis.hasOwnProperty(constructor) &&
                typeof globalThis[constructor] === 'function';
            if (!constructorExists) {
                return (0, utils_1.failed)(undefined, `Constructor "${constructor}" does not exist`, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            const Subject = globalThis[constructor];
            if (operation.static) {
                return (0, utils_1.succeeded)(Subject);
            }
            const args = [];
            for (const argument of operation.args ?? []) {
                const result = await this.main
                    .handle({ operation: argument, isChild: true });
                args.push(result.value.value);
            }
            try {
                const result = new Subject(...args);
                return (0, utils_1.succeeded)(result);
            }
            catch (error) {
                return (0, utils_1.failed)(undefined, error.message, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('constructor'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Constructor.prototype, "handle", null);
    Constructor = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], Constructor);
    exports.Constructor = Constructor;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/object/getProperty.js":
    /*!*************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/object/getProperty.js ***!
      \*************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.GetProperty = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let GetProperty = class GetProperty {
        constructor(main) {
            this.main = main;
        }
        type() {
            return extract_types_1.OperationType.GET_PROPERTY;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const subjectResult = (await this.main
                .handle({ operation: operation.subject, isChild: true }));
            const subject = subjectResult.value.value;
            if (!subjectResult.success || !(0, utils_1.isObject)(subject)) {
                return (0, utils_1.failed)(undefined, subjectResult.message);
            }
            const prop = (await this.main
                .handle({ operation: operation.prop, isChild: true })).value.value;
            const result = subject[prop];
            return (0, utils_1.succeeded)(result);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('subject', 'prop'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], GetProperty.prototype, "handle", null);
    GetProperty = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], GetProperty);
    exports.GetProperty = GetProperty;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/parser/jsonParser.js":
    /*!************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/parser/jsonParser.js ***!
      \************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.JsonParser = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let JsonParser = class JsonParser {
        constructor(main) {
            this.main = main;
        }
        type() {
            return extract_types_1.OperationType.JSON_PARSER;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const value = (await this.main
                .handle({ operation: operation.value, isChild: true })).value.value;
            try {
                const result = JSON.parse(value);
                return (0, utils_1.succeeded)(result);
            }
            catch (error) {
                return (0, utils_1.failed)(undefined, `${error.message}. Parsed value - ${value}`, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('value'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], JsonParser.prototype, "handle", null);
    JsonParser = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], JsonParser);
    exports.JsonParser = JsonParser;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/parser/priceParser.js":
    /*!*************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/parser/priceParser.js ***!
      \*************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.PriceParser = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    const CURRENCY = {
        $: {
            name: 'U.S. Dollar',
            currency: 'USD'
        },
        US$: {
            name: 'U.S. Dollar',
            currency: 'USD'
        },
        USD: {
            name: 'U.S. Dollar',
            currency: 'USD'
        },
        AED: {
            name: 'Arab Emirates Dirham',
            currency: 'AED'
        },
        درهم: {
            name: 'Arab Emirates Dirham',
            currency: 'AED'
        },
        ARS: {
            name: 'Argentine Peso',
            currency: 'ARS'
        },
        AMD: {
            name: 'Armenian Dram',
            currency: 'AMD'
        },
        AWG: {
            name: 'Aruban Florin',
            currency: 'AWG'
        },
        A$: {
            name: 'Australian Dollar',
            currency: 'AUD'
        },
        AU$: {
            name: 'Australian Dollar',
            currency: 'AUD'
        },
        AUD: {
            name: 'Australian Dollar',
            currency: 'AUD'
        },
        AZN: {
            name: 'Azerbaijan New Manat',
            currency: 'AZN'
        },
        BSD: {
            name: 'Bahamas Dollar',
            currency: 'BSD'
        },
        BZD: {
            name: 'Belize Dollar',
            currency: 'BZD'
        },
        BOB: {
            name: 'Bolivian Boliviano',
            currency: 'BOB'
        },
        R$: {
            name: 'Brazilian Real',
            currency: 'BRL'
        },
        BRL: {
            name: 'Brazilian Real',
            currency: 'BRL'
        },
        BND: {
            name: 'Bruneian Dollar',
            currency: 'BND'
        },
        BGN: {
            name: 'Bulgaria Lev',
            currency: 'BGN'
        },
        KHR: {
            name: 'Cambodian Riel',
            currency: 'KHR'
        },
        KYD: {
            name: 'Caymanian Dollar',
            currency: 'KYD'
        },
        KYD$: {
            name: 'Caymanian Dollar',
            currency: 'KYD'
        },
        CI$: {
            name: 'Caymanian Dollar',
            currency: 'KYD'
        },
        CLP: {
            name: 'Chilean Peso',
            currency: 'CLP'
        },
        'CN¥': {
            name: 'Chinese Yuan Renminbi',
            currency: 'CNY'
        },
        CNY: {
            name: 'Chinese Yuan Renminbi',
            currency: 'CNY'
        },
        COP: {
            name: ' Colombian Peso',
            currency: 'COP'
        },
        CRC: {
            name: 'Costa Rican Colon',
            currency: 'CRC'
        },
        DOP: {
            name: 'Dominican Republic Peso',
            currency: 'DOP'
        },
        EC$: {
            name: 'East Caribbean Dollar',
            currency: 'XCD'
        },
        XCD: {
            name: 'East Caribbean Dollar',
            currency: 'XCD'
        },
        EGP: {
            name: 'Egyptian Pound',
            currency: 'EGP'
        },
        '€': {
            name: 'Euro',
            currency: 'EUR'
        },
        EUR: {
            name: 'Euro',
            currency: 'EUR'
        },
        GHS: {
            name: 'Ghanaian Cedi',
            currency: 'GHS'
        },
        GTQ: {
            name: 'Guatemalan Quetzal',
            currency: 'GTQ'
        },
        HNL: {
            name: 'Honduran Lempira',
            currency: 'HNL'
        },
        HK$: {
            name: 'Honduran Lempira',
            currency: 'HKD'
        },
        HKD: {
            name: 'Honduran Lempira',
            currency: 'HKD'
        },
        HUF: {
            name: 'Hungarian Forint',
            currency: 'HUF'
        },
        '₹': {
            name: 'Indian Rupee',
            currency: 'INR'
        },
        INR: {
            name: 'Indian Rupee',
            currency: 'INR'
        },
        IDR: {
            name: 'Indonesian Rupiah',
            currency: 'IDR'
        },
        '₪': {
            name: 'Israeli Shekel',
            currency: 'ILS'
        },
        ILS: {
            name: 'Israeli Shekel',
            currency: 'ILS'
        },
        JMD: {
            name: 'Jamaican Dollar',
            currency: 'JMD'
        },
        '¥': {
            name: 'Japanese Yen',
            currency: 'JPY'
        },
        JPY: {
            name: 'Japanese Yen',
            currency: 'JPY'
        },
        'JP¥': {
            name: 'Japanese Yen',
            currency: 'JPY'
        },
        '￥': {
            name: 'Japanese Yen',
            currency: 'JPY'
        },
        KZT: {
            name: 'Kazakhstan Tenge',
            currency: 'KZT'
        },
        KES: {
            name: 'Kenyan Shilling',
            currency: 'KES'
        },
        LBP: {
            name: 'Lebanese Pound',
            currency: 'LBP'
        },
        MOP: {
            name: 'Macanese Pataca',
            currency: 'MOP'
        },
        MOP$: {
            name: 'Macanese Pataca',
            currency: 'MOP'
        },
        MYR: {
            name: 'Malaysian Ringgit',
            currency: 'MYR'
        },
        MUR: {
            name: 'Mauritian Rupee',
            currency: 'MUR'
        },
        MX$: {
            name: 'Mexico Peso',
            currency: 'MXN'
        },
        MXN: {
            name: 'Mexico Peso',
            currency: 'MXN'
        },
        MNT: {
            name: 'Mongolian Tugrik',
            currency: 'MNT'
        },
        MAD: {
            name: 'Moroccan Dirham',
            currency: 'MAD'
        },
        NAD: {
            name: 'Namibia Dollar',
            currency: 'NAD'
        },
        NZ$: {
            name: 'New Zealand Dollar',
            currency: 'NZD'
        },
        NZD: {
            name: 'New Zealand Dollar',
            currency: 'NZD'
        },
        NGN: {
            name: 'Nigerian Naira',
            currency: 'NGN'
        },
        NOK: {
            name: 'Norwegian Krone',
            currency: 'NOK'
        },
        PAB: {
            name: 'Panamanian Balboa',
            currency: 'PAB'
        },
        PYG: {
            name: 'Paraguayan Guarani',
            currency: 'PYG'
        },
        PEN: {
            name: 'Peruvian Sol',
            currency: 'PEN'
        },
        PHP: {
            name: 'Philippine Peso',
            currency: 'PHP'
        },
        '£': {
            name: 'Pounds',
            currency: 'GBP'
        },
        GBP: {
            name: 'Pounds',
            currency: 'GBP'
        },
        QAR: {
            name: 'Qatari Riyal',
            currency: 'QAR'
        },
        RUB: {
            name: 'Russian Ruble',
            currency: 'RUB'
        },
        SAR: {
            name: 'Saudi Arabian Riyal',
            currency: 'SAR'
        },
        ريال: {
            name: 'Saudi Arabian Riyal',
            currency: 'SAR'
        },
        SGD: {
            name: 'Singapore Dollar',
            currency: 'SGD'
        },
        ZAR: {
            name: 'South African Rand',
            currency: 'ZAR'
        },
        '₩': {
            name: 'South Korean Won',
            currency: 'KRW'
        },
        KRW: {
            name: 'South Korean Won',
            currency: 'KRW'
        },
        NT$: {
            name: 'Taiwan New Dollar',
            currency: 'TWD'
        },
        TWD: {
            name: 'Taiwan New Dollar',
            currency: 'TWD'
        },
        TZS: {
            name: 'Tanzania Shilling',
            currency: 'TZS'
        },
        THB: {
            name: 'Thai Baht',
            currency: 'THB'
        },
        TTD: {
            name: 'Trinidadian Dollar',
            currency: 'TTD'
        },
        TRY: {
            name: 'Turkish Lira',
            currency: 'TRY'
        },
        UYU: {
            name: 'Uruguayan Peso',
            currency: 'TRY'
        },
        '֏': {
            name: 'Armenian Dram',
            currency: 'AMD'
        },
        '₼': {
            name: 'Azerbaijani Manat',
            currency: 'AZN'
        },
        BAM: {
            name: 'Bosnia and Herzegovina Convertible Mark',
            currency: 'BAM'
        },
        KM: {
            name: 'Bosnia and Herzegovina Convertible Mark',
            currency: 'BAM'
        },
        лв: {
            name: 'Bulgarian lev',
            currency: 'BGN'
        },
        BHD: {
            name: 'Bahraini Dinar',
            currency: 'BHD'
        },
        'ب.د': {
            name: 'Bahraini Dinar',
            currency: 'BHD'
        },
        BD: {
            name: 'Bahraini Dinar',
            currency: 'BHD'
        },
        B$: {
            name: 'Brunei Dollar',
            currency: 'BND'
        },
        BYN: {
            name: 'Belarusian Ruble',
            currency: 'BYN'
        },
        Br: {
            name: 'Belarusian Ruble',
            currency: 'BYN'
        },
        CAD: {
            name: 'Canadian Dollar',
            currency: 'CAD'
        },
        C$: {
            name: 'Canadian Dollar',
            currency: 'CAD'
        },
        CA$: {
            name: 'Canadian Dollar',
            currency: 'CAD'
        },
        CHF: {
            name: 'Swiss Franc',
            currency: 'CHF'
        },
        Fr: {
            name: 'Swiss Franc',
            currency: 'CHF'
        },
        Col$: {
            name: ' Colombian Peso',
            currency: 'COP'
        },
        CZK: {
            name: 'Czech Koruna',
            currency: 'CZK'
        },
        Kč: {
            name: 'Czech Koruna',
            currency: 'CZK'
        },
        DJF: {
            name: 'Djiboutian Franc',
            currency: 'DJF'
        },
        Fdj: {
            name: 'Djiboutian Franc',
            currency: 'DJF'
        },
        DKK: {
            name: 'Danish Krone',
            currency: 'DKK'
        },
        kr: {
            name: 'Swedish Krona',
            currency: 'SEK'
        },
        DZD: {
            name: 'Algerian Dinar ',
            currency: 'DZD'
        },
        دج: {
            name: 'Algerian Dinar ',
            currency: 'DZD'
        },
        DA: {
            name: 'Algerian Dinar ',
            currency: 'DZD'
        },
        GEL: {
            name: 'Georgian Lari',
            currency: 'GEL'
        },
        ლ: {
            name: 'Georgian Lari',
            currency: 'GEL'
        },
        'GH₵': {
            name: 'Ghanaian Cedi ',
            currency: 'GHS'
        },
        GNF: {
            name: 'Guinean Franc',
            currency: 'GNF'
        },
        FG: {
            name: 'Guinean Franc',
            currency: 'GNF'
        },
        Ft: {
            name: 'Hungarian Forint',
            currency: 'HUF'
        },
        Rp: {
            name: 'Indonesian Rupiah',
            currency: 'IDR'
        },
        ISK: {
            name: 'Icelandic Króna',
            currency: 'ISK'
        },
        Íkr: {
            name: 'Icelandic Króna',
            currency: 'ISK'
        },
        JOD: {
            name: 'Jordanian Dinar',
            currency: 'JOD'
        },
        JD: {
            name: 'Jordanian Dinar',
            currency: 'JOD'
        },
        KGS: {
            name: 'Kyrgyzstani Som',
            currency: 'KGS'
        },
        с: {
            name: 'Kyrgyzstani Som',
            currency: 'KGS'
        },
        '៛': {
            name: 'Cambodian Riel',
            currency: 'KHR'
        },
        KWD: {
            name: 'Kuwaiti Dinar',
            currency: 'KWD'
        },
        'K.D.': {
            name: 'Kuwaiti Dinar',
            currency: 'KWD'
        },
        '₸': {
            name: 'Kazakhstani Tenge',
            currency: 'KZT'
        },
        LVL: {
            name: 'Latvian Lats',
            currency: 'LVL'
        },
        Ls: {
            name: 'Latvian Lats',
            currency: 'LVL'
        },
        DH: {
            name: 'Moroccan Dirham',
            currency: 'MAD'
        },
        MDL: {
            name: 'Moldovan Leu ',
            currency: 'MDL'
        },
        L: {
            name: 'Romanian Leu',
            currency: 'RON'
        },
        MKD: {
            name: 'Macedonian Denar',
            currency: 'MKD'
        },
        ден: {
            name: 'Macedonian Denar',
            currency: 'MKD'
        },
        MVR: {
            name: 'Maldivian Rufiyaa',
            currency: 'MVR'
        },
        ރ: {
            name: 'Maldivian Rufiyaa',
            currency: 'MVR'
        },
        MWK: {
            name: 'Malawian Kwacha',
            currency: 'MWK'
        },
        MK: {
            name: 'Malawian Kwacha',
            currency: 'MWK'
        },
        Mex$: {
            name: 'Mexican Peso',
            currency: 'MXN'
        },
        RM: {
            name: 'Malaysian Ringgit',
            currency: 'MYR'
        },
        N: {
            name: 'Nigerian Naira',
            currency: 'NGN'
        },
        '₦': {
            name: 'Nigerian Naira',
            currency: 'NGN'
        },
        NPR: {
            name: 'Nepalese Rupee ',
            currency: 'NPR'
        },
        रू: {
            name: 'Nepalese Rupee ',
            currency: 'NPR'
        },
        OMR: {
            name: 'Omani Rial',
            currency: 'OMR'
        },
        'S/': {
            name: 'Peruvian Nuevo Sol',
            currency: 'PEN'
        },
        '₱': {
            name: 'Philippine Peso',
            currency: 'PHP'
        },
        PKR: {
            name: 'Pakistani Rupee',
            currency: 'PKR'
        },
        '₨': {
            name: 'Pakistani Rupee',
            currency: 'PKR'
        },
        PLN: {
            name: 'Polish Zloty',
            currency: 'PLN'
        },
        zł: {
            name: 'Polish Zloty',
            currency: 'PLN'
        },
        QR: {
            name: 'Qatari Riyal',
            currency: 'QAR'
        },
        RON: {
            name: 'Romanian Leu',
            currency: 'RON'
        },
        lei: {
            name: 'Romanian Leu',
            currency: 'RON'
        },
        RSD: {
            name: 'Serbian Dinar ',
            currency: 'RSD'
        },
        РСД: {
            name: 'Serbian Dinar ',
            currency: 'RSD'
        },
        '₽': {
            name: 'Russian Ruble',
            currency: 'RUB'
        },
        RWF: {
            name: 'Rwandan Franc',
            currency: 'RWF'
        },
        FRw: {
            name: 'Rwandan Franc',
            currency: 'RWF'
        },
        'ر.س': {
            name: 'Saudi Riyal',
            currency: 'SAR'
        },
        SEK: {
            name: 'Swedish Krona',
            currency: 'SEK'
        },
        SG$: {
            name: 'Singapore Dollar',
            currency: 'SGD'
        },
        STN: {
            name: 'Sao Tome and Principe Dobra',
            currency: 'STN'
        },
        Db: {
            name: 'Sao Tome and Principe Dobra',
            currency: 'STN'
        },
        SZL: {
            name: 'Swazi Lilangeni',
            currency: 'SZL'
        },
        E: {
            name: 'Swazi Lilangeni',
            currency: 'SZL'
        },
        '฿': {
            name: 'Thai Baht',
            currency: 'THB'
        },
        TOP: {
            name: 'Tongan Paʻanga',
            currency: 'TOP'
        },
        T$: {
            name: 'Tongan Paʻanga',
            currency: 'TOP'
        },
        TL: {
            name: 'Turkish Lira',
            currency: 'TRY'
        },
        '₺': {
            name: 'Turkish Lira',
            currency: 'TRY'
        },
        UAH: {
            name: 'Ukrainian Hryvnia',
            currency: 'UAH'
        },
        '₴': {
            name: 'Ukrainian Hryvnia',
            currency: 'UAH'
        },
        UGX: {
            name: 'Ugandan Shilling',
            currency: 'UGX'
        },
        USh: {
            name: 'Ugandan Shilling',
            currency: 'UGX'
        },
        UZS: {
            name: 'Uzbekistan Som',
            currency: 'UZS'
        },
        soʻm: {
            name: 'Uzbekistan Som',
            currency: 'UZS'
        },
        VEF: {
            name: 'Venezuelan Bolívar Fuerte',
            currency: 'VEF'
        },
        'Bs.F.': {
            name: 'Venezuelan Bolívar Fuerte',
            currency: 'VEF'
        },
        vef: {
            name: 'Venezuelan Bolívar Fuerte',
            currency: 'VEF'
        },
        VND: {
            name: 'Vietnamese Dong',
            currency: 'VND'
        },
        '₫': {
            name: 'Vietnamese Dong',
            currency: 'VND'
        },
        XAF: {
            name: 'Central African CFA Franc',
            currency: 'XAF'
        },
        'F.CFA': {
            name: 'Central African CFA Franc',
            currency: 'XAF'
        },
        CFA: {
            name: 'Central African CFA Franc',
            currency: 'XAF'
        },
        YER: {
            name: 'Yemeni Rial',
            currency: 'YER'
        },
        '﷼': {
            name: 'Yemeni Rial',
            currency: 'YER'
        },
        R: {
            name: 'South African Rand',
            currency: 'ZAR'
        }
    };
    Object.freeze(CURRENCY);
    const SEPARATOR_EXCLUDED_CURRENCIES = ['BHD', 'JOD', 'KWD', 'OMR'];
    let PriceParser = class PriceParser {
        constructor(main) {
            this.main = main;
            this.separators = [',', '.'];
        }
        type() {
            return extract_types_1.OperationType.PRICE_PARSER;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            let price = '';
            let currPos;
            let currencyLength = 0;
            const inputStringResult = await this.main
                .handle({ operation: operation.price, isChild: true });
            if (!inputStringResult.success) {
                return (0, utils_1.failed)(undefined, inputStringResult.message);
            }
            const inputString = inputStringResult.value.value;
            if (typeof inputString !== 'string') {
                return (0, utils_1.failed)(undefined, `Input value is not a string. Type: ${typeof inputString}. Value - ${JSON.stringify(inputString)}`, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            const escapedString = inputString.replace(/(\s|&nbsp;)/g, '');
            const trimmedStr = escapedString.trim().split(' ').join('');
            const isNegative = escapedString.includes('-');
            const str = isNegative ? trimmedStr.replace('-', '') : trimmedStr;
            if (str.length === 0) {
                return (0, utils_1.failed)(undefined, 'Input string is empty');
            }
            for (let i = 0; i < str.length; i++) {
                const char = str[i];
                if (this.separators.includes(char)) {
                    price += '.';
                }
                else if (!Number.isNaN(+char)) {
                    price += char;
                }
                else {
                    if (currPos === undefined) {
                        currPos = i;
                    }
                    currencyLength += 1;
                }
            }
            let trimmedPrice = price.trim();
            const currencyKey = str.substring(currPos, currPos + currencyLength).trim();
            const currency = CURRENCY.hasOwnProperty(currencyKey) ? CURRENCY[currencyKey].currency : null;
            const parts = trimmedPrice.split('.');
            const isSubdivided = this.checkSubDivided(trimmedPrice, currency);
            if (parts.length > 1) {
                if (isSubdivided) {
                    const lastNumber = parts.pop();
                    trimmedPrice = `${parts.join('')}.${lastNumber}`;
                }
                else {
                    trimmedPrice = `${parts.join('')}`;
                }
            }
            const finalPrice = parseFloat(trimmedPrice);
            if (Number.isNaN(finalPrice)) {
                return (0, utils_1.failed)(undefined, `Final price "${trimmedPrice}" could not be parsed from initial value "${inputString}"`);
            }
            const result = {
                price: operation.modulus ? Math.abs(finalPrice) : (isNegative ? -finalPrice : finalPrice),
                currency
            };
            return (0, utils_1.succeeded)(result);
        }
        checkSubDivided(str, currency) {
            const index = SEPARATOR_EXCLUDED_CURRENCIES.includes(currency) ? -4 : -3;
            return this.separators.includes(Array.prototype.at.call(str, index));
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('price'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], PriceParser.prototype, "handle", null);
    PriceParser = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], PriceParser);
    exports.PriceParser = PriceParser;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/returnOperation.js":
    /*!**********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/returnOperation.js ***!
      \**********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ReturnOperationHandler = void 0;
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const program_1 = __webpack_require__(/*! ../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const required_fields_1 = __webpack_require__(/*! ../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let ReturnOperationHandler = class ReturnOperationHandler {
        constructor(main) {
            this.main = main;
        }
        type() {
            return extract_types_1.OperationType.RETURN;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const result = await this.main
                .handle({ operation: operation.value, isChild: true });
            if (result.success) {
                return {
                    ...(0, utils_1.succeeded)(result.value.value),
                    return: true
                };
            }
            return (0, utils_1.failed)(result.value.value, result.message);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('value'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], ReturnOperationHandler.prototype, "handle", null);
    ReturnOperationHandler = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], ReturnOperationHandler);
    exports.ReturnOperationHandler = ReturnOperationHandler;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/select/plural.js":
    /*!********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/select/plural.js ***!
      \********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Plural = void 0;
    const baseHandler_1 = __webpack_require__(/*! ../../utils/baseHandler */ "./node_modules/@sugardev/json-extractor/dist/utils/baseHandler.js");
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const htmlElementSolver_1 = __webpack_require__(/*! ../../resolvers/htmlElementSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/htmlElementSolver.js");
    const selectorsSolver_1 = __webpack_require__(/*! ../../resolvers/selectorsSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const getter_1 = __webpack_require__(/*! ../../utils/getter */ "./node_modules/@sugardev/json-extractor/dist/utils/getter.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Plural = class Plural extends baseHandler_1.BaseHandler {
        constructor(selectorsSolver, elementSolver, elScope) {
            super();
            this.selectorsSolver = selectorsSolver;
            this.elementSolver = elementSolver;
            this.elScope = elScope;
        }
        type() {
            return extract_types_1.OperationType.PLURAL;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            let localElementScope = this.elScope;
            if (operation.scope != null) {
                const res = await this.elementSolver.solve(operation.scope);
                if (!res.success) {
                    return (0, utils_1.failed)(undefined, res.message);
                }
                localElementScope = res.value.value;
            }
            const selectorsRes = await this.selectorsSolver.solve(operation.selectors);
            if (!selectorsRes.success) {
                return (0, utils_1.failed)(undefined, selectorsRes.message);
            }
            const selectors = selectorsRes.value.value;
            for (const selector of selectors) {
                let targets;
                try {
                    targets = localElementScope.querySelectorAll(selector);
                    if (targets.length === 0) {
                        continue;
                    }
                }
                catch (e) {
                    return (0, utils_1.failed)(undefined, e.message, extract_types_1.NativeOperationType.NATIVE_ERROR);
                }
                const result = [];
                targets.forEach((target) => result.push((0, getter_1.getter)(operation, target)));
                return (0, utils_1.succeeded)(result);
            }
            return (0, utils_1.failed)(undefined, `No elements by selectors "${JSON.stringify(selectors)}" were found`);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('selectors'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Plural.prototype, "handle", null);
    Plural = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.selectorsSolver)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.htmlElementSolver)),
        __param(2, (0, inversify_1.inject)(program_types_1.Injections.elScope)),
        __metadata("design:paramtypes", [selectorsSolver_1.SelectorsSolver,
            htmlElementSolver_1.HtmlElementSolver, Object])
    ], Plural);
    exports.Plural = Plural;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/select/single.js":
    /*!********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/select/single.js ***!
      \********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Single = void 0;
    const baseHandler_1 = __webpack_require__(/*! ../../utils/baseHandler */ "./node_modules/@sugardev/json-extractor/dist/utils/baseHandler.js");
    const htmlElementSolver_1 = __webpack_require__(/*! ../../resolvers/htmlElementSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/htmlElementSolver.js");
    const selectorsSolver_1 = __webpack_require__(/*! ../../resolvers/selectorsSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const getter_1 = __webpack_require__(/*! ../../utils/getter */ "./node_modules/@sugardev/json-extractor/dist/utils/getter.js");
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Single = class Single extends baseHandler_1.BaseHandler {
        constructor(selectorsSolver, elementSolver, elScope) {
            super();
            this.selectorsSolver = selectorsSolver;
            this.elementSolver = elementSolver;
            this.elScope = elScope;
        }
        type() {
            return extract_types_1.OperationType.SINGLE;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            let elementScope = this.elScope;
            if (operation.scope != null) {
                const res = await this.elementSolver.solve(operation.scope);
                if (!res.success) {
                    return (0, utils_1.failed)(undefined, res.message);
                }
                elementScope = res.value.value;
            }
            const selectorsRes = await this.selectorsSolver.solve(operation.selectors);
            if (!selectorsRes.success) {
                return (0, utils_1.failed)(undefined, selectorsRes.message);
            }
            const selectors = selectorsRes.value.value;
            try {
                for (const selector of selectors) {
                    const target = elementScope.querySelector(selector);
                    if (target == null) {
                        continue;
                    }
                    const result = (0, getter_1.getter)(operation, target);
                    return (0, utils_1.succeeded)(result);
                }
            }
            catch (e) {
                return (0, utils_1.failed)(undefined, e.message, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            return (0, utils_1.failed)(undefined, `No element with selectors "${JSON.stringify(selectors)}" were found`);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('selectors'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Single.prototype, "handle", null);
    Single = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.selectorsSolver)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.htmlElementSolver)),
        __param(2, (0, inversify_1.inject)(program_types_1.Injections.elScope)),
        __metadata("design:paramtypes", [selectorsSolver_1.SelectorsSolver,
            htmlElementSolver_1.HtmlElementSolver, Object])
    ], Single);
    exports.Single = Single;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/select/splitScope.js":
    /*!************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/select/splitScope.js ***!
      \************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.SplitScope = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const selectorsSolver_1 = __webpack_require__(/*! ../../resolvers/selectorsSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js");
    const program_factory_1 = __webpack_require__(/*! ../../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const observer_1 = __webpack_require__(/*! ../../utils/observer */ "./node_modules/@sugardev/json-extractor/dist/utils/observer.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let SplitScope = class SplitScope {
        constructor(selectorsSolver, elScope, observer, factory, config, funcs, main) {
            this.selectorsSolver = selectorsSolver;
            this.elScope = elScope;
            this.observer = observer;
            this.factory = factory;
            this.config = config;
            this.funcs = funcs;
            this.main = main;
        }
        type() {
            return extract_types_1.OperationType.SPLIT_SCOPE;
        }
        scope() {
            return extract_types_1.OperationScope.BLOCK;
        }
        async *handle(operation) {
            const selectorsRes = await this.selectorsSolver.solve(operation.selectors);
            if (!selectorsRes.success) {
                return (0, utils_1.failed)(undefined, selectorsRes.message);
            }
            const selectors = selectorsRes.value.value;
            for (const selector of selectors) {
                const scopes = this.elScope.querySelectorAll(selector);
                if (scopes.length === 0) {
                    continue;
                }
                const result = [];
                for (const scope of scopes) {
                    const tempVarScope = {};
                    let success = true;
                    const subProgram = this.factory.create(this.config, this.observer, scope, tempVarScope, this.funcs);
                    for (const [index, subOperation] of Object.entries(operation.operations)) {
                        const setScopeVar = {
                            var: '$scope',
                            type: extract_types_1.OperationType.LITERAL,
                            value: scope
                        };
                        await subProgram
                            .handle({ operation: setScopeVar, isChild: true });
                        subProgram.mergeVarScope(this.main.cloneVarScope());
                        const res = await subProgram
                            .handle({ operation: subOperation, index });
                        if (!res.success && !subOperation.optional) {
                            success = false;
                            break;
                        }
                        this.clearUnnecessaryScope(tempVarScope, [...Object.keys(this.main.cloneVarScope()), '$scope']);
                    }
                    if (success) {
                        result.push(tempVarScope);
                    }
                }
                return (0, utils_1.succeeded)(result);
            }
            return (0, utils_1.failed)(undefined, 'No scopes were found');
        }
        clearUnnecessaryScope(entity, keys) {
            keys.forEach((key) => {
                delete entity[key];
            });
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('operations', 'selectors'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], SplitScope.prototype, "handle", null);
    SplitScope = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.selectorsSolver)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.elScope)),
        __param(2, (0, inversify_1.inject)(program_types_1.Injections.observer)),
        __param(3, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __param(4, (0, inversify_1.inject)(program_types_1.Injections.config)),
        __param(5, (0, inversify_1.inject)(program_types_1.Injections.funcs)),
        __param(6, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [selectorsSolver_1.SelectorsSolver, Object, observer_1.Observer,
            program_factory_1.ProgramFactory, Object, Object, program_1.Program])
    ], SplitScope);
    exports.SplitScope = SplitScope;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/string/replace.js":
    /*!*********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/string/replace.js ***!
      \*********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Replace = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_factory_1 = __webpack_require__(/*! ../../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Replace = class Replace {
        constructor(main, factory) {
            this.main = main;
            this.factory = factory;
        }
        type() {
            return extract_types_1.OperationType.REPLACE;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(replace) {
            const program = this.factory.prototype(this.main);
            const subject = await program
                .handle({ operation: replace.subject, isChild: true });
            if (!subject.success) {
                return (0, utils_1.failed)(undefined, subject.message);
            }
            const needle = await program
                .handle({ operation: replace.needle, isChild: true });
            if (!needle.success) {
                return (0, utils_1.failed)(undefined, needle.message);
            }
            const replacementResult = await program
                .handle({ operation: replace.replacement, isChild: true });
            if (!replacementResult.success) {
                return (0, utils_1.failed)(undefined, replacementResult.message);
            }
            const mode = replace.mode ? replace.mode : 'first';
            const handler = this.handler(mode);
            if (!handler) {
                return (0, utils_1.failed)(undefined, 'Unsupportable replacementResult mode', extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            let result = subject.value.value;
            const replacement = replacementResult.value.value;
            const keys = Array.isArray(needle.value.value) ? needle.value.value : [needle.value.value];
            keys.forEach((key) => {
                result = handler(result, key, replacement);
            });
            this.main.mergeVarScope(program.getVarScopeRef());
            return (0, utils_1.succeeded)(result);
        }
        handler(mode) {
            const handlers = {
                first: (subject, needle, replacement) => subject.replace(needle, replacement),
                all: (subject, needle, replacement) => subject.replace(new RegExp(needle, 'g'), replacement)
            };
            return handlers[mode];
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('subject', 'needle', 'replacement'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Replace.prototype, "handle", null);
    Replace = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __metadata("design:paramtypes", [program_1.Program,
            program_factory_1.ProgramFactory])
    ], Replace);
    exports.Replace = Replace;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/string/replaceBetween.js":
    /*!****************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/string/replaceBetween.js ***!
      \****************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ReplaceBetween = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_factory_1 = __webpack_require__(/*! ../../program/program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let ReplaceBetween = class ReplaceBetween {
        constructor(main, factory) {
            this.main = main;
            this.factory = factory;
        }
        type() {
            return extract_types_1.OperationType.REPLACE_BETWEEN;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(replace) {
            const program = this.factory.prototype(this.main);
            const subject = await program
                .handle({ operation: replace.subject, isChild: true });
            if (!subject.success) {
                return (0, utils_1.failed)(undefined, subject.message);
            }
            const start = await program
                .handle({ operation: replace.start, isChild: true });
            if (!start.success) {
                return (0, utils_1.failed)(undefined, start.message);
            }
            const end = await program
                .handle({ operation: replace.end, isChild: true });
            if (!end.success) {
                return (0, utils_1.failed)(undefined, end.message);
            }
            const replacement = await program
                .handle({ operation: replace.replacement, isChild: true });
            if (!replacement.success) {
                return (0, utils_1.failed)(undefined, replacement.message);
            }
            const result = this.replaceBetween(subject.value.value, replacement.value.value, start.value.value, end.value.value);
            this.main.mergeVarScope(program.getVarScopeRef());
            return (0, utils_1.succeeded)(result);
        }
        replaceBetween(str, replacement, start, end) {
            const startPos = str.indexOf(start);
            if (startPos === -1) {
                return str;
            }
            const endPos = str.lastIndexOf(end);
            if (endPos === -1) {
                return str;
            }
            const left = str.substring(0, startPos);
            const right = str.substring(endPos + end.length);
            return left + replacement + right;
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('subject', 'start', 'end', 'replacement'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], ReplaceBetween.prototype, "handle", null);
    ReplaceBetween = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.factory)),
        __metadata("design:paramtypes", [program_1.Program,
            program_factory_1.ProgramFactory])
    ], ReplaceBetween);
    exports.ReplaceBetween = ReplaceBetween;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/variable.js":
    /*!***************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/variable.js ***!
      \***************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Variable = void 0;
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const required_fields_1 = __webpack_require__(/*! ../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let Variable = class Variable {
        constructor(varScope) {
            this.varScope = varScope;
        }
        type() {
            return extract_types_1.OperationType.VAR;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            const parts = operation.value.split('.');
            let ref = this.varScope;
            for (let i = 0; i < parts.length - 1; i++) {
                const middlewareValue = ref[parts[i]];
                if ((0, utils_1.isObject)(middlewareValue)) {
                    ref = ref[parts[i]];
                }
            }
            const prop = parts.at(-1);
            const value = ref[prop];
            if (value == null) {
                return (0, utils_1.failed)(undefined, `Variable "${operation.value}" is not defined`);
            }
            return (0, utils_1.succeeded)(value);
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('value'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], Variable.prototype, "handle", null);
    Variable = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.varScope)),
        __metadata("design:paramtypes", [Object])
    ], Variable);
    exports.Variable = Variable;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/wait/markProcessedElement.js":
    /*!********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/wait/markProcessedElement.js ***!
      \********************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.MarkProcessedElement = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    let MarkProcessedElement = class MarkProcessedElement {
        constructor(elScope) {
            this.elScope = elScope;
        }
        type() {
            return extract_types_1.OperationType.MARK_PROCESSED_ELEMENT;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            for (const selector of operation.selectors) {
                let target;
                try {
                    target = this.elScope.querySelector(selector);
                }
                catch (e) {
                    // probably not a valid selector is used
                    continue;
                }
                if (target == null) {
                    continue;
                }
                target.setAttribute('data-lib-processed', 'true');
                return (0, utils_1.succeeded)(true);
            }
            return (0, utils_1.failed)(false, 'No element was found to process');
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('selectors'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], MarkProcessedElement.prototype, "handle", null);
    MarkProcessedElement = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.elScope)),
        __metadata("design:paramtypes", [Object])
    ], MarkProcessedElement);
    exports.MarkProcessedElement = MarkProcessedElement;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/operations/wait/waitForNotProcessedElementHandler.js":
    /*!*********************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/operations/wait/waitForNotProcessedElementHandler.js ***!
      \*********************************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.WaitForNotProcessedElementHandler = void 0;
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const utils_1 = __webpack_require__(/*! ../../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const required_fields_1 = __webpack_require__(/*! ../../decorators/required-fields */ "./node_modules/@sugardev/json-extractor/dist/decorators/required-fields.js");
    const LIB_PROCESSED_OBSERVER_TIMER_MS = 500;
    let WaitForNotProcessedElementHandler = class WaitForNotProcessedElementHandler {
        constructor(elScope) {
            this.elScope = elScope;
        }
        type() {
            return extract_types_1.OperationType.WAIT_FOR_NOT_PROCESSED_ELEMENT;
        }
        scope() {
            return extract_types_1.OperationScope.LOCAL;
        }
        async *handle(operation) {
            return await new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    for (const selector of operation.selectors) {
                        let target;
                        try {
                            target = this.elScope.querySelector(selector);
                        }
                        catch (e) {
                            // probably not a valid selector is used
                            continue;
                        }
                        if (target == null) {
                            continue;
                        }
                        if (!target.hasAttribute('data-lib-processed')) {
                            clearInterval(intervalId);
                            clearTimeout(timeoutId);
                            resolve((0, utils_1.succeeded)(true));
                        }
                    }
                }, LIB_PROCESSED_OBSERVER_TIMER_MS);
                const timeoutId = setTimeout(() => {
                    clearInterval(intervalId);
                    resolve((0, utils_1.failed)(false, 'Some element was already processed, or selectors was not found'));
                }, operation.timeout);
            });
        }
    };
    __decorate([
        (0, required_fields_1.requiredFields)('selectors', 'timeout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], WaitForNotProcessedElementHandler.prototype, "handle", null);
    WaitForNotProcessedElementHandler = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.elScope)),
        __metadata("design:paramtypes", [Object])
    ], WaitForNotProcessedElementHandler);
    exports.WaitForNotProcessedElementHandler = WaitForNotProcessedElementHandler;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js":
    /*!*******************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/program/program.factory.js ***!
      \*******************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ProgramFactory = void 0;
    const program_1 = __webpack_require__(/*! ./program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const and_1 = __webpack_require__(/*! ../operations/logical/and */ "./node_modules/@sugardev/json-extractor/dist/operations/logical/and.js");
    const callMethod_1 = __webpack_require__(/*! ../operations/object/callMethod */ "./node_modules/@sugardev/json-extractor/dist/operations/object/callMethod.js");
    const closest_1 = __webpack_require__(/*! ../operations/element/closest */ "./node_modules/@sugardev/json-extractor/dist/operations/element/closest.js");
    const computed_1 = __webpack_require__(/*! ../operations/computed */ "./node_modules/@sugardev/json-extractor/dist/operations/computed.js");
    const existElement_1 = __webpack_require__(/*! ../operations/element/existElement */ "./node_modules/@sugardev/json-extractor/dist/operations/element/existElement.js");
    const forEach_1 = __webpack_require__(/*! ../operations/loop/forEach */ "./node_modules/@sugardev/json-extractor/dist/operations/loop/forEach.js");
    const func_1 = __webpack_require__(/*! ../operations/func */ "./node_modules/@sugardev/json-extractor/dist/operations/func.js");
    const isNotHiddenElement_1 = __webpack_require__(/*! ../operations/element/isNotHiddenElement */ "./node_modules/@sugardev/json-extractor/dist/operations/element/isNotHiddenElement.js");
    const jsonParser_1 = __webpack_require__(/*! ../operations/parser/jsonParser */ "./node_modules/@sugardev/json-extractor/dist/operations/parser/jsonParser.js");
    const literal_1 = __webpack_require__(/*! ../operations/literal */ "./node_modules/@sugardev/json-extractor/dist/operations/literal.js");
    const log_1 = __webpack_require__(/*! ../operations/log */ "./node_modules/@sugardev/json-extractor/dist/operations/log.js");
    const map_1 = __webpack_require__(/*! ../operations/map */ "./node_modules/@sugardev/json-extractor/dist/operations/map.js");
    const markProcessedElement_1 = __webpack_require__(/*! ../operations/wait/markProcessedElement */ "./node_modules/@sugardev/json-extractor/dist/operations/wait/markProcessedElement.js");
    const or_1 = __webpack_require__(/*! ../operations/logical/or */ "./node_modules/@sugardev/json-extractor/dist/operations/logical/or.js");
    const plural_1 = __webpack_require__(/*! ../operations/select/plural */ "./node_modules/@sugardev/json-extractor/dist/operations/select/plural.js");
    const priceParser_1 = __webpack_require__(/*! ../operations/parser/priceParser */ "./node_modules/@sugardev/json-extractor/dist/operations/parser/priceParser.js");
    const returnOperation_1 = __webpack_require__(/*! ../operations/returnOperation */ "./node_modules/@sugardev/json-extractor/dist/operations/returnOperation.js");
    const select_1 = __webpack_require__(/*! ../operations/element/select */ "./node_modules/@sugardev/json-extractor/dist/operations/element/select.js");
    const single_1 = __webpack_require__(/*! ../operations/select/single */ "./node_modules/@sugardev/json-extractor/dist/operations/select/single.js");
    const splitScope_1 = __webpack_require__(/*! ../operations/select/splitScope */ "./node_modules/@sugardev/json-extractor/dist/operations/select/splitScope.js");
    const variable_1 = __webpack_require__(/*! ../operations/variable */ "./node_modules/@sugardev/json-extractor/dist/operations/variable.js");
    const waitForNotProcessedElementHandler_1 = __webpack_require__(/*! ../operations/wait/waitForNotProcessedElementHandler */ "./node_modules/@sugardev/json-extractor/dist/operations/wait/waitForNotProcessedElementHandler.js");
    const getProperty_1 = __webpack_require__(/*! ../operations/object/getProperty */ "./node_modules/@sugardev/json-extractor/dist/operations/object/getProperty.js");
    const emit_1 = __webpack_require__(/*! ../operations/emit */ "./node_modules/@sugardev/json-extractor/dist/operations/emit.js");
    const flow_1 = __webpack_require__(/*! ../operations/logical/flow */ "./node_modules/@sugardev/json-extractor/dist/operations/logical/flow.js");
    const condition_1 = __webpack_require__(/*! ../operations/logical/condition */ "./node_modules/@sugardev/json-extractor/dist/operations/logical/condition.js");
    const replace_1 = __webpack_require__(/*! ../operations/string/replace */ "./node_modules/@sugardev/json-extractor/dist/operations/string/replace.js");
    const replaceBetween_1 = __webpack_require__(/*! ../operations/string/replaceBetween */ "./node_modules/@sugardev/json-extractor/dist/operations/string/replaceBetween.js");
    const math_action_1 = __webpack_require__(/*! ../operations/math/math-action */ "./node_modules/@sugardev/json-extractor/dist/operations/math/math-action.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const constructor_1 = __webpack_require__(/*! ../operations/object/constructor */ "./node_modules/@sugardev/json-extractor/dist/operations/object/constructor.js");
    let ProgramFactory = class ProgramFactory {
        create(config, observer, elScope, varScope, funcs) {
            return new program_1.Program(config, observer, elScope, varScope, funcs, this, {
                CLOSEST: closest_1.Closest,
                EXIST: existElement_1.ExistElement,
                IS_NOT_HIDDEN_ELEMENT: isNotHiddenElement_1.IsNotHiddenElement,
                SELECT: select_1.Select,
                AND: and_1.And,
                CONDITION: condition_1.Condition,
                OR: or_1.Or,
                FLOW: flow_1.Flow,
                FOR_EACH: forEach_1.ForEach,
                MATH: math_action_1.MathAction,
                CALL_METHOD: callMethod_1.CallMethod,
                GET_PROPERTY: getProperty_1.GetProperty,
                JSON_PARSER: jsonParser_1.JsonParser,
                PRICE_PARSER: priceParser_1.PriceParser,
                PLURAL: plural_1.Plural,
                SINGLE: single_1.Single,
                SPLIT_SCOPE: splitScope_1.SplitScope,
                REPLACE: replace_1.Replace,
                REPLACE_BETWEEN: replaceBetween_1.ReplaceBetween,
                MARK_PROCESSED_ELEMENT: markProcessedElement_1.MarkProcessedElement,
                WAIT_FOR_NOT_PROCESSED_ELEMENT: waitForNotProcessedElementHandler_1.WaitForNotProcessedElementHandler,
                COMPUTED: computed_1.Computed,
                EMIT: emit_1.Emit,
                FUNC: func_1.Func,
                LITERAL: literal_1.Literal,
                LOG: log_1.Log,
                MAP: map_1.Map,
                RETURN: returnOperation_1.ReturnOperationHandler,
                VAR: variable_1.Variable,
                CONSTRUCTOR: constructor_1.Constructor
            });
        }
        prototype(program) {
            return this.create(program.getConfig(), program.getObserver(), program.getElScopeRef(), program.cloneVarScope(), program.getFuncsRef());
        }
    };
    ProgramFactory = __decorate([
        (0, inversify_1.injectable)()
    ], ProgramFactory);
    exports.ProgramFactory = ProgramFactory;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/program/program.js":
    /*!***********************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/program/program.js ***!
      \***********************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Program_1;
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Program = void 0;
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const observer_1 = __webpack_require__(/*! ../utils/observer */ "./node_modules/@sugardev/json-extractor/dist/utils/observer.js");
    const program_factory_1 = __webpack_require__(/*! ./program.factory */ "./node_modules/@sugardev/json-extractor/dist/program/program.factory.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const logger_1 = __webpack_require__(/*! ../utils/logger/logger */ "./node_modules/@sugardev/json-extractor/dist/utils/logger/logger.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const htmlElementSolver_1 = __webpack_require__(/*! ../resolvers/htmlElementSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/htmlElementSolver.js");
    const selectorsSolver_1 = __webpack_require__(/*! ../resolvers/selectorsSolver */ "./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js");
    const program_types_1 = __webpack_require__(/*! ./program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const logger_tracer_1 = __webpack_require__(/*! ../utils/trace/logger.tracer */ "./node_modules/@sugardev/json-extractor/dist/utils/trace/logger.tracer.js");
    const operation_tracer_1 = __webpack_require__(/*! ../utils/trace/operation.tracer */ "./node_modules/@sugardev/json-extractor/dist/utils/trace/operation.tracer.js");
    const tracer_1 = __webpack_require__(/*! ../utils/trace/tracer */ "./node_modules/@sugardev/json-extractor/dist/utils/trace/tracer.js");
    let Program = Program_1 = class Program {
        constructor(config, observer, elScope, varScope, funcs, factory, operationHandlers) {
            this.config = config;
            this.observer = observer;
            this.elScope = elScope;
            this.varScope = varScope;
            this.funcs = funcs;
            this.operations = {};
            this.di = new inversify_1.Container();
            this.injectDependencies(factory, operationHandlers);
        }
        getConfig() {
            return this.config;
        }
        getElScopeRef() {
            return this.elScope;
        }
        getVarScopeRef() {
            return this.varScope;
        }
        cloneVarScope() {
            return (0, utils_1.clone)(this.getVarScopeRef());
        }
        mergeVarScope(varScope) {
            Object.assign(this.getVarScopeRef(), varScope);
            return this.getVarScopeRef();
        }
        getFuncsRef() {
            return this.funcs;
        }
        getObserver() {
            return this.observer;
        }
        getOperationsList() {
            return this.operations;
        }
        getTrace(message) {
            return Program_1.tracer.trace(message);
        }
        initTrace() {
            Program_1.tracer.init();
        }
        async handle({ operation, isChild = false, index = '0' }) {
            if (operation?.type == null) {
                return (0, utils_1.failed)(undefined, 'Operation type is not provided', extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            if (!this.operations[operation?.type]) {
                return (0, utils_1.failed)(undefined, `Unsupportable operation type "${operation?.type}"`, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            const varScope = this.getVarScopeRef();
            if (operation.debug) {
                this.logger.forceLog('DEBUG: operation', operation);
                this.logger.forceLog('DEBUG: varScope', varScope);
                debugger;
            }
            if (!isChild) {
                Program_1.operationTracer.push(operation, index, varScope);
            }
            const operationResult = await this.handleOperation(operation);
            const accumulate = await this.handleAccumulated(operation);
            const response = await this
                .handleResult(operation, varScope, operationResult, accumulate);
            if (isChild || !response.success) {
                return response;
            }
            Program_1.operationTracer.pop(operation);
            return response;
        }
        async handleResult(operation, varScope, result, accumulate) {
            try {
                if (operation.var) {
                    const parts = operation.var.split('.');
                    let ref = varScope;
                    for (let i = 0; i < parts.length - 1; i++) {
                        if (ref.hasOwnProperty(parts[i])) {
                            ref = ref[parts[i]];
                        }
                        else {
                            ref[parts[i]] = {};
                            ref = ref[parts[i]];
                        }
                    }
                    const prop = parts[parts.length - 1];
                    if (!accumulate) {
                        ref[prop] = result.value.value;
                    }
                    else {
                        const valueExists = ref[prop] != null;
                        const filteredValue = [ref[prop], result.value.value];
                        const onlyValue = [result.value.value];
                        ref[prop] = Array.isArray(ref[prop]) ? [...ref[prop], result.value.value] : (valueExists ? filteredValue : onlyValue);
                    }
                }
                return result;
            }
            catch (error) {
                return (0, utils_1.failed)(undefined, error.message, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
        }
        async handleOperation(operation) {
            const handler = this.operations[operation.type];
            const generator = handler.handle(operation);
            let operationResult;
            let iteratorResult;
            do {
                iteratorResult = await generator.next();
                operationResult = iteratorResult.value;
                if (!iteratorResult.done) {
                    Program_1.operationTracer.replaceFirst(operationResult);
                }
            } while (!iteratorResult.done);
            return operationResult;
        }
        async handleAccumulated(operation) {
            if (operation.accumulate != null) {
                let accumulateResult;
                let accumulateIteratorResult;
                const accumulateHandler = this.operations[operation.accumulate.type];
                const accumulateGenerator = accumulateHandler.handle(operation.accumulate);
                do {
                    accumulateIteratorResult = await accumulateGenerator.next();
                    accumulateResult = accumulateIteratorResult.value;
                } while (!accumulateIteratorResult.done);
                return accumulateResult.value.value;
            }
            return false;
        }
        injectDependencies(factory, operationHandlers) {
            this.di.bind(program_types_1.Injections.program)
                .toConstantValue(this);
            this.injectServices(factory);
            this.injectTracer();
            this.injectOperations(operationHandlers);
            this.logger = this.di.get(program_types_1.Injections.logger);
        }
        injectServices(factory) {
            this.di.bind(program_types_1.Injections.htmlElementSolver)
                .to(htmlElementSolver_1.HtmlElementSolver)
                .inSingletonScope();
            this.di.bind(program_types_1.Injections.selectorsSolver)
                .to(selectorsSolver_1.SelectorsSolver)
                .inSingletonScope();
            this.di.bind(program_types_1.Injections.logger)
                .to(logger_1.MyLogger)
                .inSingletonScope();
            this.di.bind(program_types_1.Injections.observer)
                .toConstantValue(this.observer);
            this.di.bind(program_types_1.Injections.factory)
                .toConstantValue(factory);
            this.di.bind(program_types_1.Injections.config)
                .toConstantValue(this.config);
            this.di.bind(program_types_1.Injections.elScope)
                .toConstantValue(this.elScope);
            this.di.bind(program_types_1.Injections.varScope)
                .toConstantValue(this.varScope);
            this.di.bind(program_types_1.Injections.funcs)
                .toConstantValue(this.funcs);
        }
        injectOperations(operationHandlers) {
            Object
                .values(operationHandlers)
                .forEach((HandlerClass) => {
                const key = HandlerClass.prototype.type();
                this.di.bind(key)
                    .to(HandlerClass)
                    .inSingletonScope();
                const handler = this.di.get(key);
                this.operations[handler.type()] = handler;
            });
        }
        injectTracer() {
            if (!Program_1.loggerTracer) {
                this.di.bind(program_types_1.Injections.loggerTracer)
                    .to(logger_tracer_1.LoggerTracer)
                    .inSingletonScope();
                Program_1.loggerTracer = this.di.get(program_types_1.Injections.loggerTracer);
            }
            else {
                this.di.bind(program_types_1.Injections.loggerTracer)
                    .toConstantValue(Program_1.loggerTracer);
            }
            if (!Program_1.operationTracer) {
                this.di.bind(program_types_1.Injections.operationTracer)
                    .to(operation_tracer_1.OperationTracer)
                    .inSingletonScope();
                Program_1.operationTracer = this.di.get(program_types_1.Injections.operationTracer);
            }
            else {
                this.di.bind(program_types_1.Injections.operationTracer)
                    .toConstantValue(Program_1.operationTracer);
            }
            if (!Program_1.tracer) {
                this.di.bind(program_types_1.Injections.tracer)
                    .to(tracer_1.Tracer)
                    .inSingletonScope();
                Program_1.tracer = this.di.get(program_types_1.Injections.tracer);
            }
            else {
                this.di.bind(program_types_1.Injections.tracer)
                    .toConstantValue(Program_1.tracer);
            }
        }
    };
    Program = Program_1 = __decorate([
        (0, inversify_1.injectable)(),
        __metadata("design:paramtypes", [Object, observer_1.Observer, Object, Object, Object, program_factory_1.ProgramFactory, Object])
    ], Program);
    exports.Program = Program;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js":
    /*!*****************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/program/program.types.js ***!
      \*****************************************************************************/
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Injections = void 0;
    var Injections;
    (function (Injections) {
        Injections["logger"] = "LOGGER";
        Injections["observer"] = "OBSERVER";
        Injections["program"] = "PROGRAM";
        Injections["factory"] = "FACTORY";
        Injections["config"] = "CONFIG";
        Injections["elScope"] = "ELEMENT_SCOPE";
        Injections["varScope"] = "VARIABLE_SCOPE";
        Injections["funcs"] = "FUNCTIONS";
        Injections["htmlElementSolver"] = "HTML_ELEMENT_SOLVER";
        Injections["selectorsSolver"] = "SELECTORS_SOLVER";
        Injections["loggerTracer"] = "LOGGER_TRACER";
        Injections["operationTracer"] = "OPERATION_TRACER";
        Injections["tracer"] = "TRACER";
    })(Injections = exports.Injections || (exports.Injections = {}));
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/resolvers/htmlElementSolver.js":
    /*!***********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/resolvers/htmlElementSolver.js ***!
      \***********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.HtmlElementSolver = void 0;
    const program_1 = __webpack_require__(/*! ../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    let HtmlElementSolver = class HtmlElementSolver {
        constructor(main) {
            this.main = main;
        }
        async solve(operation) {
            try {
                const res = await this.main
                    .handle({ operation, isChild: true });
                if (!res.success) {
                    return (0, utils_1.failed)(undefined, res.message);
                }
                if (!(res.value.value instanceof HTMLElement)) {
                    return (0, utils_1.failed)(undefined, 'Argument for "scope" must be an instance of "HTMLElement"');
                }
                return (0, utils_1.succeeded)(res.value.value);
            }
            catch (error) {
                return (0, utils_1.failed)(undefined, error.message, extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
        }
    };
    HtmlElementSolver = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], HtmlElementSolver);
    exports.HtmlElementSolver = HtmlElementSolver;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js":
    /*!*********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/resolvers/selectorsSolver.js ***!
      \*********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.SelectorsSolver = void 0;
    const program_1 = __webpack_require__(/*! ../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../utils/utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    let SelectorsSolver = class SelectorsSolver {
        constructor(main) {
            this.main = main;
        }
        async solve(selectors) {
            if (!Array.isArray(selectors) || selectors.length === 0) {
                return (0, utils_1.failed)(undefined, 'Argument for "selectors" must be non-empty an array', extract_types_1.NativeOperationType.NATIVE_ERROR);
            }
            const resultList = [];
            for (const selector of selectors) {
                const result = await this.main
                    .handle({ operation: selector, isChild: true });
                if ((0, utils_1.isFailed)(result, selector)) {
                    return (0, utils_1.failed)(undefined, result.message);
                }
                resultList.push(result.value.value);
            }
            return (0, utils_1.succeeded)(resultList);
        }
    };
    SelectorsSolver = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], SelectorsSolver);
    exports.SelectorsSolver = SelectorsSolver;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/utils/baseHandler.js":
    /*!*************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/utils/baseHandler.js ***!
      \*************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.BaseHandler = void 0;
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    let BaseHandler = class BaseHandler {
    };
    BaseHandler = __decorate([
        (0, inversify_1.injectable)()
    ], BaseHandler);
    exports.BaseHandler = BaseHandler;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/utils/getter.js":
    /*!********************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/utils/getter.js ***!
      \********************************************************************/
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.getter = void 0;
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    function getter(operation, element) {
        const handler = {
            [extract_types_1.SINGLE_GET_TYPE.TEXT]: () => {
                const el = element;
                // textContent is used in tests because innerText is not implemented in jsdom
                const text = (el.innerText || el.textContent);
                return text.trim();
            },
            [extract_types_1.SINGLE_GET_TYPE.VALUE]: () => {
                const el = element;
                return el.value;
            },
            [extract_types_1.SINGLE_GET_TYPE.ATTRIBUTE]: () => {
                const el = element;
                return el.getAttribute(operation.attr);
            }
        };
        return handler[operation.get]
            ? handler[operation.get]()
            : handler[extract_types_1.SINGLE_GET_TYPE.TEXT]();
    }
    exports.getter = getter;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/utils/logger/logger.js":
    /*!***************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/utils/logger/logger.js ***!
      \***************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.MyLogger = void 0;
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    let MyLogger = class MyLogger {
        constructor(config) {
            this.config = config;
            this.loggerLabel = '%c[JSON-EXTRACTOR]';
            this.loggerLabelStyle = 'background-color: greenyellow; font-weight: bold; padding: 2px;';
        }
        log(msg, ...rest) {
            if (this.config.log) {
                console.log(this.loggerLabel, this.loggerLabelStyle, msg, ...rest);
            }
        }
        error(msg, ...rest) {
            if (this.config.log) {
                console.error(this.loggerLabel, this.loggerLabelStyle, msg, ...rest);
            }
        }
        forceLog(msg, ...rest) {
            console.log(this.loggerLabel, this.loggerLabelStyle, msg, ...rest);
        }
    };
    MyLogger = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.config)),
        __metadata("design:paramtypes", [Object])
    ], MyLogger);
    exports.MyLogger = MyLogger;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/utils/observer.js":
    /*!**********************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/utils/observer.js ***!
      \**********************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Observer = void 0;
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    let Observer = class Observer {
        constructor() {
            this.listeners = {};
        }
        emit(event, payload) {
            if (!this.listeners[event]) {
                return;
            }
            this.listeners[event].forEach((sub) => { sub(payload); });
        }
        subscribe(event, subscriber) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(subscriber);
        }
    };
    Observer = __decorate([
        (0, inversify_1.injectable)()
    ], Observer);
    exports.Observer = Observer;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/utils/trace/logger.tracer.js":
    /*!*********************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/utils/trace/logger.tracer.js ***!
      \*********************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.LoggerTracer = void 0;
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    let LoggerTracer = class LoggerTracer {
        constructor() {
            this.logTrace = [];
        }
        log(message, args = {}) {
            const logTrace = {
                message,
                args: this.clonedArguments(args)
            };
            this.logTrace.push(logTrace);
        }
        trace() {
            return this.logTrace.map(log => log);
        }
        clear() {
            this.logTrace = [];
        }
        clonedArguments(args = {}) {
            return Object.entries(args).reduce((acc, [key, value]) => [
                ...acc,
                {
                    var: key,
                    value: (0, utils_1.isObject)(value)
                        ? ((0, utils_1.isElement)(value) ? value.outerHTML : (0, utils_1.clone)(value))
                        : value
                }
            ], []);
        }
    };
    LoggerTracer = __decorate([
        (0, inversify_1.injectable)()
    ], LoggerTracer);
    exports.LoggerTracer = LoggerTracer;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/utils/trace/operation.tracer.js":
    /*!************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/utils/trace/operation.tracer.js ***!
      \************************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.OperationTracer = void 0;
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const extract_types_1 = __webpack_require__(/*! ../../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const program_1 = __webpack_require__(/*! ../../program/program */ "./node_modules/@sugardev/json-extractor/dist/program/program.js");
    const utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js");
    let OperationTracer = class OperationTracer {
        constructor(main) {
            this.main = main;
            this.operationTracer = [];
            this.localScope = {};
            this.globalScope = {};
        }
        pop({ type }) {
            const scopeType = this.operationHandler(type)
                .scope();
            const strategy = {
                [extract_types_1.OperationScope.BLOCK]: this.popBlock.bind(this),
                [extract_types_1.OperationScope.LOCAL]: this.popLocal.bind(this)
            };
            strategy[scopeType]?.();
            this.localScope = {};
        }
        push(operation, operationIndex, scope) {
            this.localScope = scope;
            const current = {
                ...this.mapOperation(operation),
                position: +operationIndex
            };
            const [last, ...restOperations] = this.operationTracer;
            if (!last) {
                this.operationTracer = [current];
                return;
            }
            const isLocalLast = !(0, utils_1.isBlockedScope)(this.operationHandler(last?.type));
            if (isLocalLast) {
                this.operationTracer = [current, ...restOperations];
            }
            else {
                this.operationTracer = [current, last, ...restOperations];
            }
        }
        replaceFirst(operation) {
            if (this.operationTracer.length === 0) {
                return;
            }
            const [{ position, type, var: _var }, ...rest] = this.operationTracer;
            this.operationTracer = [
                {
                    ...operation,
                    position,
                    var: _var,
                    type
                },
                ...rest
            ];
        }
        trace() {
            return {
                scope: {
                    local: this.clonedScope(this.localScope),
                    ...((Object.keys(this.globalScope).length > 0) && { global: this.globalScope })
                },
                trace: this.operationTracer
            };
        }
        clear() {
            this.localScope = {};
            this.globalScope = {};
            this.operationTracer = [];
        }
        clonedScope(scope) {
            return Object.entries(scope)
                .reduce((acc, [key, value]) => ({
                ...acc,
                [key]: (0, utils_1.isObject)(value)
                    ? ((0, utils_1.isElement)(value) ? value.outerHTML : (0, utils_1.clone)(value))
                    : value
            }), {});
        }
        popBlock() {
            const index = this.operationTracer
                .findIndex(({ type }) => (0, utils_1.isBlockedScope)(this.operationHandler(type)));
            if (index === -1) {
                return;
            }
            this.operationTracer = this.operationTracer.slice(index + 1);
        }
        popLocal() {
            this.operationTracer = this.operationTracer.slice(1);
        }
        operationHandler(type) {
            return this.main.getOperationsList()[type];
        }
        mapOperation(operation) {
            const mapper = {
                [extract_types_1.OperationType.AND]: ({ operations, ...rest }) => ({ ...rest }),
                [extract_types_1.OperationType.OR]: ({ operations, ...rest }) => ({ ...rest }),
                [extract_types_1.OperationType.FOR_EACH]: ({ forEach, ...rest }) => ({ ...rest }),
                [extract_types_1.OperationType.SPLIT_SCOPE]: ({ operations, ...rest }) => ({ ...rest })
            };
            const handler = mapper[operation.type];
            return handler ? handler(operation) : operation;
        }
    };
    OperationTracer = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.program)),
        __metadata("design:paramtypes", [program_1.Program])
    ], OperationTracer);
    exports.OperationTracer = OperationTracer;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/utils/trace/tracer.js":
    /*!**************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/utils/trace/tracer.js ***!
      \**************************************************************************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    "use strict";
    
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Tracer = void 0;
    const inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js");
    const program_types_1 = __webpack_require__(/*! ../../program/program.types */ "./node_modules/@sugardev/json-extractor/dist/program/program.types.js");
    const logger_tracer_1 = __webpack_require__(/*! ./logger.tracer */ "./node_modules/@sugardev/json-extractor/dist/utils/trace/logger.tracer.js");
    const operation_tracer_1 = __webpack_require__(/*! ./operation.tracer */ "./node_modules/@sugardev/json-extractor/dist/utils/trace/operation.tracer.js");
    let Tracer = class Tracer {
        constructor(loggerTracer, operationTracer) {
            this.loggerTracer = loggerTracer;
            this.operationTracer = operationTracer;
        }
        init() {
            this.operationTracer.clear();
            this.loggerTracer.clear();
        }
        trace(message) {
            return {
                version: this.version(),
                error: this.operationTracer.trace(),
                logs: this.loggerTracer.trace(),
                ...(message && { message })
            };
        }
        version() {
            return '1.0.0';
        }
    };
    Tracer = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(program_types_1.Injections.loggerTracer)),
        __param(1, (0, inversify_1.inject)(program_types_1.Injections.operationTracer)),
        __metadata("design:paramtypes", [logger_tracer_1.LoggerTracer,
            operation_tracer_1.OperationTracer])
    ], Tracer);
    exports.Tracer = Tracer;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/dist/utils/utils.js":
    /*!*******************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/dist/utils/utils.js ***!
      \*******************************************************************/
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.isBlockedScope = exports.isObject = exports.isElement = exports.isFailed = exports.clone = exports.succeeded = exports.failed = void 0;
    const extract_types_1 = __webpack_require__(/*! ../extract.types */ "./node_modules/@sugardev/json-extractor/dist/extract.types.js");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const failed = (value = undefined, message = 'Something went wrong', type = extract_types_1.OperationType.LITERAL) => ({
        success: false,
        value: {
            type,
            value
        },
        message
    });
    exports.failed = failed;
    const succeeded = (value) => ({
        success: true,
        value: {
            type: extract_types_1.OperationType.LITERAL,
            value
        }
    });
    exports.succeeded = succeeded;
    function clone(source) {
        const isArray = Array.isArray(source);
        if (isArray) {
            return source.map(item => (0, exports.isObject)(item) ? clone(item) : item);
        }
        const target = {};
        const keys = Object.keys(source);
        const valueGetter = (val) => {
            if (Array.isArray(val)) {
                const arr = [];
                for (let i = 0; i < val.length; i++) {
                    arr.push(valueGetter(val[i]));
                }
                return arr;
            }
            else if ((0, exports.isElement)(val)) {
                if (val instanceof Element || val instanceof Document) {
                    return val;
                }
                const keys = Object.keys(val);
                const obj = {};
                for (const key of keys) {
                    obj[key] = valueGetter(val[key]);
                }
                return obj;
            }
            else {
                return val;
            }
        };
        for (const key of keys) {
            target[key] = valueGetter(source[key]);
        }
        return target;
    }
    exports.clone = clone;
    function isFailed(res, operation) {
        return !res.success && !operation?.optional;
    }
    exports.isFailed = isFailed;
    const isElement = (source) => {
        return source instanceof Element || source instanceof Document;
    };
    exports.isElement = isElement;
    const isObject = (source) => {
        return typeof source === 'object' && source !== null;
    };
    exports.isObject = isObject;
    const isBlockedScope = (operation) => operation.scope() === extract_types_1.OperationScope.BLOCK;
    exports.isBlockedScope = isBlockedScope;
    
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/decorator_utils.js":
    /*!*******************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/decorator_utils.js ***!
      \*******************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   createTaggedDecorator: () => (/* binding */ createTaggedDecorator),
    /* harmony export */   decorate: () => (/* binding */ decorate),
    /* harmony export */   tagParameter: () => (/* binding */ tagParameter),
    /* harmony export */   tagProperty: () => (/* binding */ tagProperty)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/js */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/js.js");
    
    
    
    function targetIsConstructorFunction(target) {
        return target.prototype !== undefined;
    }
    function _throwIfMethodParameter(parameterName) {
        if (parameterName !== undefined) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.INVALID_DECORATOR_OPERATION);
        }
    }
    function tagParameter(annotationTarget, parameterName, parameterIndex, metadata) {
        _throwIfMethodParameter(parameterName);
        _tagParameterOrProperty(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.TAGGED, annotationTarget, parameterIndex.toString(), metadata);
    }
    function tagProperty(annotationTarget, propertyName, metadata) {
        if (targetIsConstructorFunction(annotationTarget)) {
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.INVALID_DECORATOR_OPERATION);
        }
        _tagParameterOrProperty(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.TAGGED_PROP, annotationTarget.constructor, propertyName, metadata);
    }
    function _ensureNoMetadataKeyDuplicates(metadata) {
        var metadatas = [];
        if (Array.isArray(metadata)) {
            metadatas = metadata;
            var duplicate = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getFirstArrayDuplicate)(metadatas.map(function (md) { return md.key; }));
            if (duplicate !== undefined) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.DUPLICATED_METADATA + " " + duplicate.toString());
            }
        }
        else {
            metadatas = [metadata];
        }
        return metadatas;
    }
    function _tagParameterOrProperty(metadataKey, annotationTarget, key, metadata) {
        var metadatas = _ensureNoMetadataKeyDuplicates(metadata);
        var paramsOrPropertiesMetadata = {};
        if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
            paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
        }
        var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
        if (paramOrPropertyMetadata === undefined) {
            paramOrPropertyMetadata = [];
        }
        else {
            var _loop_1 = function (m) {
                if (metadatas.some(function (md) { return md.key === m.key; })) {
                    throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.DUPLICATED_METADATA + " " + m.key.toString());
                }
            };
            for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
                var m = paramOrPropertyMetadata_1[_i];
                _loop_1(m);
            }
        }
        paramOrPropertyMetadata.push.apply(paramOrPropertyMetadata, metadatas);
        paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
        Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
    }
    function createTaggedDecorator(metadata) {
        return function (target, targetKey, indexOrPropertyDescriptor) {
            if (typeof indexOrPropertyDescriptor === "number") {
                tagParameter(target, targetKey, indexOrPropertyDescriptor, metadata);
            }
            else {
                tagProperty(target, targetKey, metadata);
            }
        };
    }
    function _decorate(decorators, target) {
        Reflect.decorate(decorators, target);
    }
    function _param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function decorate(decorator, target, parameterIndexOrProperty) {
        if (typeof parameterIndexOrProperty === "number") {
            _decorate([_param(parameterIndexOrProperty, decorator)], target);
        }
        else if (typeof parameterIndexOrProperty === "string") {
            Reflect.decorate([decorator], target, parameterIndexOrProperty);
        }
        else {
            _decorate([decorator], target);
        }
    }
    
    //# sourceMappingURL=decorator_utils.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/inject.js":
    /*!**********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/inject.js ***!
      \**********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   inject: () => (/* binding */ inject)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _inject_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inject_base */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/inject_base.js");
    
    
    var inject = (0,_inject_base__WEBPACK_IMPORTED_MODULE_0__.injectBase)(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.INJECT_TAG);
    
    //# sourceMappingURL=inject.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/inject_base.js":
    /*!***************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/inject_base.js ***!
      \***************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   injectBase: () => (/* binding */ injectBase)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    /* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/decorator_utils.js");
    
    
    
    function injectBase(metadataKey) {
        return function (serviceIdentifier) {
            return function (target, targetKey, indexOrPropertyDescriptor) {
                if (serviceIdentifier === undefined) {
                    var className = typeof target === "function" ? target.name : target.constructor.name;
                    throw new Error((0,_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.UNDEFINED_INJECT_ANNOTATION)(className));
                }
                return (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_1__.createTaggedDecorator)(new _planning_metadata__WEBPACK_IMPORTED_MODULE_2__.Metadata(metadataKey, serviceIdentifier))(target, targetKey, indexOrPropertyDescriptor);
            };
        };
    }
    //# sourceMappingURL=inject_base.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/injectable.js":
    /*!**************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/injectable.js ***!
      \**************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   injectable: () => (/* binding */ injectable)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    
    
    function injectable() {
        return function (target) {
            if (Reflect.hasOwnMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.PARAM_TYPES, target)) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__.DUPLICATED_INJECTABLE_DECORATOR);
            }
            var types = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.DESIGN_PARAM_TYPES, target) || [];
            Reflect.defineMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.PARAM_TYPES, types, target);
            return target;
        };
    }
    
    //# sourceMappingURL=injectable.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/lazy_service_identifier.js":
    /*!***************************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/lazy_service_identifier.js ***!
      \***************************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   LazyServiceIdentifer: () => (/* binding */ LazyServiceIdentifer)
    /* harmony export */ });
    var LazyServiceIdentifer = (function () {
        function LazyServiceIdentifer(cb) {
            this._cb = cb;
        }
        LazyServiceIdentifer.prototype.unwrap = function () {
            return this._cb();
        };
        return LazyServiceIdentifer;
    }());
    
    //# sourceMappingURL=lazy_service_identifier.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/multi_inject.js":
    /*!****************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/multi_inject.js ***!
      \****************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   multiInject: () => (/* binding */ multiInject)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _inject_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inject_base */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/inject_base.js");
    
    
    var multiInject = (0,_inject_base__WEBPACK_IMPORTED_MODULE_0__.injectBase)(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.MULTI_INJECT_TAG);
    
    //# sourceMappingURL=multi_inject.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/named.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/named.js ***!
      \*********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   named: () => (/* binding */ named)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    /* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/decorator_utils.js");
    
    
    
    function named(name) {
        return (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_0__.createTaggedDecorator)(new _planning_metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.NAMED_TAG, name));
    }
    
    //# sourceMappingURL=named.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/optional.js":
    /*!************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/optional.js ***!
      \************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   optional: () => (/* binding */ optional)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    /* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/decorator_utils.js");
    
    
    
    function optional() {
        return (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_0__.createTaggedDecorator)(new _planning_metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.OPTIONAL_TAG, true));
    }
    
    //# sourceMappingURL=optional.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/post_construct.js":
    /*!******************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/post_construct.js ***!
      \******************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   postConstruct: () => (/* binding */ postConstruct)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _property_event_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./property_event_decorator */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/property_event_decorator.js");
    
    
    
    var postConstruct = (0,_property_event_decorator__WEBPACK_IMPORTED_MODULE_0__.propertyEventDecorator)(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.POST_CONSTRUCT, _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.MULTIPLE_POST_CONSTRUCT_METHODS);
    
    //# sourceMappingURL=post_construct.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/pre_destroy.js":
    /*!***************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/pre_destroy.js ***!
      \***************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   preDestroy: () => (/* binding */ preDestroy)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _property_event_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./property_event_decorator */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/property_event_decorator.js");
    
    
    
    var preDestroy = (0,_property_event_decorator__WEBPACK_IMPORTED_MODULE_0__.propertyEventDecorator)(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.PRE_DESTROY, _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.MULTIPLE_PRE_DESTROY_METHODS);
    
    //# sourceMappingURL=pre_destroy.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/property_event_decorator.js":
    /*!****************************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/property_event_decorator.js ***!
      \****************************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   propertyEventDecorator: () => (/* binding */ propertyEventDecorator)
    /* harmony export */ });
    /* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    
    function propertyEventDecorator(eventKey, errorMessage) {
        return function () {
            return function (target, propertyKey) {
                var metadata = new _planning_metadata__WEBPACK_IMPORTED_MODULE_0__.Metadata(eventKey, propertyKey);
                if (Reflect.hasOwnMetadata(eventKey, target.constructor)) {
                    throw new Error(errorMessage);
                }
                Reflect.defineMetadata(eventKey, metadata, target.constructor);
            };
        };
    }
    
    //# sourceMappingURL=property_event_decorator.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/tagged.js":
    /*!**********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/tagged.js ***!
      \**********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   tagged: () => (/* binding */ tagged)
    /* harmony export */ });
    /* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    /* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/decorator_utils.js");
    
    
    function tagged(metadataKey, metadataValue) {
        return (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_0__.createTaggedDecorator)(new _planning_metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(metadataKey, metadataValue));
    }
    
    //# sourceMappingURL=tagged.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/target_name.js":
    /*!***************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/target_name.js ***!
      \***************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   targetName: () => (/* binding */ targetName)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    /* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/decorator_utils.js");
    
    
    
    function targetName(name) {
        return function (target, targetKey, index) {
            var metadata = new _planning_metadata__WEBPACK_IMPORTED_MODULE_0__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.NAME_TAG, name);
            (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_2__.tagParameter)(target, targetKey, index, metadata);
        };
    }
    
    //# sourceMappingURL=target_name.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/unmanaged.js":
    /*!*************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/unmanaged.js ***!
      \*************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   unmanaged: () => (/* binding */ unmanaged)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    /* harmony import */ var _decorator_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./decorator_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/decorator_utils.js");
    
    
    
    function unmanaged() {
        return function (target, targetKey, index) {
            var metadata = new _planning_metadata__WEBPACK_IMPORTED_MODULE_0__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.UNMANAGED_TAG, true);
            (0,_decorator_utils__WEBPACK_IMPORTED_MODULE_2__.tagParameter)(target, targetKey, index, metadata);
        };
    }
    
    //# sourceMappingURL=unmanaged.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/bindings/binding.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/bindings/binding.js ***!
      \*********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   Binding: () => (/* binding */ Binding)
    /* harmony export */ });
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/id.js");
    
    
    var Binding = (function () {
        function Binding(serviceIdentifier, scope) {
            this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
            this.activated = false;
            this.serviceIdentifier = serviceIdentifier;
            this.scope = scope;
            this.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingTypeEnum.Invalid;
            this.constraint = function (request) { return true; };
            this.implementationType = null;
            this.cache = null;
            this.factory = null;
            this.provider = null;
            this.onActivation = null;
            this.onDeactivation = null;
            this.dynamicValue = null;
        }
        Binding.prototype.clone = function () {
            var clone = new Binding(this.serviceIdentifier, this.scope);
            clone.activated = (clone.scope === _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Singleton) ? this.activated : false;
            clone.implementationType = this.implementationType;
            clone.dynamicValue = this.dynamicValue;
            clone.scope = this.scope;
            clone.type = this.type;
            clone.factory = this.factory;
            clone.provider = this.provider;
            clone.constraint = this.constraint;
            clone.onActivation = this.onActivation;
            clone.onDeactivation = this.onDeactivation;
            clone.cache = this.cache;
            return clone;
        };
        return Binding;
    }());
    
    //# sourceMappingURL=binding.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/bindings/binding_count.js":
    /*!***************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/bindings/binding_count.js ***!
      \***************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   BindingCount: () => (/* binding */ BindingCount)
    /* harmony export */ });
    var BindingCount = {
        MultipleBindingsAvailable: 2,
        NoBindingsAvailable: 0,
        OnlyOneBindingAvailable: 1
    };
    
    //# sourceMappingURL=binding_count.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js":
    /*!*************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js ***!
      \*************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   AMBIGUOUS_MATCH: () => (/* binding */ AMBIGUOUS_MATCH),
    /* harmony export */   ARGUMENTS_LENGTH_MISMATCH: () => (/* binding */ ARGUMENTS_LENGTH_MISMATCH),
    /* harmony export */   ASYNC_UNBIND_REQUIRED: () => (/* binding */ ASYNC_UNBIND_REQUIRED),
    /* harmony export */   CANNOT_UNBIND: () => (/* binding */ CANNOT_UNBIND),
    /* harmony export */   CIRCULAR_DEPENDENCY: () => (/* binding */ CIRCULAR_DEPENDENCY),
    /* harmony export */   CIRCULAR_DEPENDENCY_IN_FACTORY: () => (/* binding */ CIRCULAR_DEPENDENCY_IN_FACTORY),
    /* harmony export */   CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE: () => (/* binding */ CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE),
    /* harmony export */   CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE: () => (/* binding */ CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE),
    /* harmony export */   CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK: () => (/* binding */ CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK),
    /* harmony export */   CONTAINER_OPTIONS_MUST_BE_AN_OBJECT: () => (/* binding */ CONTAINER_OPTIONS_MUST_BE_AN_OBJECT),
    /* harmony export */   DUPLICATED_INJECTABLE_DECORATOR: () => (/* binding */ DUPLICATED_INJECTABLE_DECORATOR),
    /* harmony export */   DUPLICATED_METADATA: () => (/* binding */ DUPLICATED_METADATA),
    /* harmony export */   INVALID_BINDING_TYPE: () => (/* binding */ INVALID_BINDING_TYPE),
    /* harmony export */   INVALID_DECORATOR_OPERATION: () => (/* binding */ INVALID_DECORATOR_OPERATION),
    /* harmony export */   INVALID_FUNCTION_BINDING: () => (/* binding */ INVALID_FUNCTION_BINDING),
    /* harmony export */   INVALID_MIDDLEWARE_RETURN: () => (/* binding */ INVALID_MIDDLEWARE_RETURN),
    /* harmony export */   INVALID_TO_SELF_VALUE: () => (/* binding */ INVALID_TO_SELF_VALUE),
    /* harmony export */   KEY_NOT_FOUND: () => (/* binding */ KEY_NOT_FOUND),
    /* harmony export */   LAZY_IN_SYNC: () => (/* binding */ LAZY_IN_SYNC),
    /* harmony export */   MISSING_INJECTABLE_ANNOTATION: () => (/* binding */ MISSING_INJECTABLE_ANNOTATION),
    /* harmony export */   MISSING_INJECT_ANNOTATION: () => (/* binding */ MISSING_INJECT_ANNOTATION),
    /* harmony export */   MULTIPLE_POST_CONSTRUCT_METHODS: () => (/* binding */ MULTIPLE_POST_CONSTRUCT_METHODS),
    /* harmony export */   MULTIPLE_PRE_DESTROY_METHODS: () => (/* binding */ MULTIPLE_PRE_DESTROY_METHODS),
    /* harmony export */   NOT_IMPLEMENTED: () => (/* binding */ NOT_IMPLEMENTED),
    /* harmony export */   NOT_REGISTERED: () => (/* binding */ NOT_REGISTERED),
    /* harmony export */   NO_MORE_SNAPSHOTS_AVAILABLE: () => (/* binding */ NO_MORE_SNAPSHOTS_AVAILABLE),
    /* harmony export */   NULL_ARGUMENT: () => (/* binding */ NULL_ARGUMENT),
    /* harmony export */   ON_DEACTIVATION_ERROR: () => (/* binding */ ON_DEACTIVATION_ERROR),
    /* harmony export */   POST_CONSTRUCT_ERROR: () => (/* binding */ POST_CONSTRUCT_ERROR),
    /* harmony export */   PRE_DESTROY_ERROR: () => (/* binding */ PRE_DESTROY_ERROR),
    /* harmony export */   STACK_OVERFLOW: () => (/* binding */ STACK_OVERFLOW),
    /* harmony export */   UNDEFINED_INJECT_ANNOTATION: () => (/* binding */ UNDEFINED_INJECT_ANNOTATION)
    /* harmony export */ });
    var DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
    var DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
    var NULL_ARGUMENT = "NULL argument";
    var KEY_NOT_FOUND = "Key Not Found";
    var AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
    var CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
    var NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
    var MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
    var MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
    var UNDEFINED_INJECT_ANNOTATION = function (name) {
        return "@inject called with undefined this could mean that the class " + name + " has " +
            "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
            "overcome this limitation.";
    };
    var CIRCULAR_DEPENDENCY = "Circular dependency found:";
    var NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
    var INVALID_BINDING_TYPE = "Invalid binding type:";
    var NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
    var INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
    var INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
    var LAZY_IN_SYNC = function (key) { return "You are attempting to construct '" + key + "' in a synchronous way\n but it has asynchronous dependencies."; };
    var INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
        "used as service identifier";
    var INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
        "must be applied to the parameters of a class constructor or a class property.";
    var ARGUMENTS_LENGTH_MISMATCH = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return "The number of constructor arguments in the derived class " +
            (values[0] + " must be >= than the number of constructor arguments of its base class.");
    };
    var CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
        "must be an object.";
    var CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
        "be a string ('singleton' or 'transient').";
    var CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
        "be a boolean";
    var CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
        "be a boolean";
    var MULTIPLE_PRE_DESTROY_METHODS = "Cannot apply @preDestroy decorator multiple times in the same class";
    var MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
    var ASYNC_UNBIND_REQUIRED = "Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)";
    var POST_CONSTRUCT_ERROR = function (clazz, errorMessage) { return "@postConstruct error in class " + clazz + ": " + errorMessage; };
    var PRE_DESTROY_ERROR = function (clazz, errorMessage) { return "@preDestroy error in class " + clazz + ": " + errorMessage; };
    var ON_DEACTIVATION_ERROR = function (clazz, errorMessage) { return "onDeactivation() error in class " + clazz + ": " + errorMessage; };
    var CIRCULAR_DEPENDENCY_IN_FACTORY = function (factoryType, serviceIdentifier) {
        return "It looks like there is a circular dependency in one of the '" + factoryType + "' bindings. Please investigate bindings with" +
            ("service identifier '" + serviceIdentifier + "'.");
    };
    var STACK_OVERFLOW = "Maximum call stack size exceeded";
    //# sourceMappingURL=error_msgs.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js":
    /*!****************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js ***!
      \****************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   BindingScopeEnum: () => (/* binding */ BindingScopeEnum),
    /* harmony export */   BindingTypeEnum: () => (/* binding */ BindingTypeEnum),
    /* harmony export */   TargetTypeEnum: () => (/* binding */ TargetTypeEnum)
    /* harmony export */ });
    var BindingScopeEnum = {
        Request: "Request",
        Singleton: "Singleton",
        Transient: "Transient"
    };
    var BindingTypeEnum = {
        ConstantValue: "ConstantValue",
        Constructor: "Constructor",
        DynamicValue: "DynamicValue",
        Factory: "Factory",
        Function: "Function",
        Instance: "Instance",
        Invalid: "Invalid",
        Provider: "Provider"
    };
    var TargetTypeEnum = {
        ClassProperty: "ClassProperty",
        ConstructorArgument: "ConstructorArgument",
        Variable: "Variable"
    };
    
    //# sourceMappingURL=literal_types.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js":
    /*!****************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js ***!
      \****************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   DESIGN_PARAM_TYPES: () => (/* binding */ DESIGN_PARAM_TYPES),
    /* harmony export */   INJECT_TAG: () => (/* binding */ INJECT_TAG),
    /* harmony export */   MULTI_INJECT_TAG: () => (/* binding */ MULTI_INJECT_TAG),
    /* harmony export */   NAMED_TAG: () => (/* binding */ NAMED_TAG),
    /* harmony export */   NAME_TAG: () => (/* binding */ NAME_TAG),
    /* harmony export */   NON_CUSTOM_TAG_KEYS: () => (/* binding */ NON_CUSTOM_TAG_KEYS),
    /* harmony export */   OPTIONAL_TAG: () => (/* binding */ OPTIONAL_TAG),
    /* harmony export */   PARAM_TYPES: () => (/* binding */ PARAM_TYPES),
    /* harmony export */   POST_CONSTRUCT: () => (/* binding */ POST_CONSTRUCT),
    /* harmony export */   PRE_DESTROY: () => (/* binding */ PRE_DESTROY),
    /* harmony export */   TAGGED: () => (/* binding */ TAGGED),
    /* harmony export */   TAGGED_PROP: () => (/* binding */ TAGGED_PROP),
    /* harmony export */   UNMANAGED_TAG: () => (/* binding */ UNMANAGED_TAG)
    /* harmony export */ });
    var NAMED_TAG = "named";
    var NAME_TAG = "name";
    var UNMANAGED_TAG = "unmanaged";
    var OPTIONAL_TAG = "optional";
    var INJECT_TAG = "inject";
    var MULTI_INJECT_TAG = "multi_inject";
    var TAGGED = "inversify:tagged";
    var TAGGED_PROP = "inversify:tagged_props";
    var PARAM_TYPES = "inversify:paramtypes";
    var DESIGN_PARAM_TYPES = "design:paramtypes";
    var POST_CONSTRUCT = "post_construct";
    var PRE_DESTROY = "pre_destroy";
    function getNonCustomTagKeys() {
        return [
            INJECT_TAG,
            MULTI_INJECT_TAG,
            NAME_TAG,
            UNMANAGED_TAG,
            NAMED_TAG,
            OPTIONAL_TAG,
        ];
    }
    var NON_CUSTOM_TAG_KEYS = getNonCustomTagKeys();
    //# sourceMappingURL=metadata_keys.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/container.js":
    /*!************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/container.js ***!
      \************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   Container: () => (/* binding */ Container)
    /* harmony export */ });
    /* harmony import */ var _bindings_binding__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../bindings/binding */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/bindings/binding.js");
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _planning_metadata_reader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../planning/metadata_reader */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata_reader.js");
    /* harmony import */ var _planning_planner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../planning/planner */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/planner.js");
    /* harmony import */ var _resolution_resolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../resolution/resolver */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/resolution/resolver.js");
    /* harmony import */ var _syntax_binding_to_syntax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../syntax/binding_to_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_to_syntax.js");
    /* harmony import */ var _utils_async__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/async */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/async.js");
    /* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/id */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/id.js");
    /* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/serialization */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/serialization.js");
    /* harmony import */ var _container_snapshot__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./container_snapshot */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/container_snapshot.js");
    /* harmony import */ var _lookup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lookup */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/lookup.js");
    /* harmony import */ var _module_activation_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module_activation_store */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/module_activation_store.js");
    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var Container = (function () {
        function Container(containerOptions) {
            var options = containerOptions || {};
            if (typeof options !== "object") {
                throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
            }
            if (options.defaultScope === undefined) {
                options.defaultScope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Transient;
            }
            else if (options.defaultScope !== _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Singleton &&
                options.defaultScope !== _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Transient &&
                options.defaultScope !== _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Request) {
                throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
            }
            if (options.autoBindInjectable === undefined) {
                options.autoBindInjectable = false;
            }
            else if (typeof options.autoBindInjectable !== "boolean") {
                throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
            }
            if (options.skipBaseClassChecks === undefined) {
                options.skipBaseClassChecks = false;
            }
            else if (typeof options.skipBaseClassChecks !== "boolean") {
                throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
            }
            this.options = {
                autoBindInjectable: options.autoBindInjectable,
                defaultScope: options.defaultScope,
                skipBaseClassChecks: options.skipBaseClassChecks
            };
            this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_2__.id)();
            this._bindingDictionary = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
            this._snapshots = [];
            this._middleware = null;
            this._activations = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
            this._deactivations = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
            this.parent = null;
            this._metadataReader = new _planning_metadata_reader__WEBPACK_IMPORTED_MODULE_4__.MetadataReader();
            this._moduleActivationStore = new _module_activation_store__WEBPACK_IMPORTED_MODULE_5__.ModuleActivationStore();
        }
        Container.merge = function (container1, container2) {
            var containers = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                containers[_i - 2] = arguments[_i];
            }
            var container = new Container();
            var targetContainers = __spreadArray([container1, container2], containers, true).map(function (targetContainer) { return (0,_planning_planner__WEBPACK_IMPORTED_MODULE_6__.getBindingDictionary)(targetContainer); });
            var bindingDictionary = (0,_planning_planner__WEBPACK_IMPORTED_MODULE_6__.getBindingDictionary)(container);
            function copyDictionary(origin, destination) {
                origin.traverse(function (_key, value) {
                    value.forEach(function (binding) {
                        destination.add(binding.serviceIdentifier, binding.clone());
                    });
                });
            }
            targetContainers.forEach(function (targetBindingDictionary) {
                copyDictionary(targetBindingDictionary, bindingDictionary);
            });
            return container;
        };
        Container.prototype.load = function () {
            var modules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modules[_i] = arguments[_i];
            }
            var getHelpers = this._getContainerModuleHelpersFactory();
            for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
                var currentModule = modules_1[_a];
                var containerModuleHelpers = getHelpers(currentModule.id);
                currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction, containerModuleHelpers.unbindAsyncFunction, containerModuleHelpers.onActivationFunction, containerModuleHelpers.onDeactivationFunction);
            }
        };
        Container.prototype.loadAsync = function () {
            var modules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modules[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            getHelpers = this._getContainerModuleHelpersFactory();
                            _a = 0, modules_2 = modules;
                            _b.label = 1;
                        case 1:
                            if (!(_a < modules_2.length)) return [3, 4];
                            currentModule = modules_2[_a];
                            containerModuleHelpers = getHelpers(currentModule.id);
                            return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction, containerModuleHelpers.unbindAsyncFunction, containerModuleHelpers.onActivationFunction, containerModuleHelpers.onDeactivationFunction)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _a++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        Container.prototype.unload = function () {
            var _this = this;
            var modules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modules[_i] = arguments[_i];
            }
            modules.forEach(function (module) {
                var deactivations = _this._removeModuleBindings(module.id);
                _this._deactivateSingletons(deactivations);
                _this._removeModuleHandlers(module.id);
            });
        };
        Container.prototype.unloadAsync = function () {
            var modules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modules[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _a, modules_3, module_1, deactivations;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = 0, modules_3 = modules;
                            _b.label = 1;
                        case 1:
                            if (!(_a < modules_3.length)) return [3, 4];
                            module_1 = modules_3[_a];
                            deactivations = this._removeModuleBindings(module_1.id);
                            return [4, this._deactivateSingletonsAsync(deactivations)];
                        case 2:
                            _b.sent();
                            this._removeModuleHandlers(module_1.id);
                            _b.label = 3;
                        case 3:
                            _a++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        Container.prototype.bind = function (serviceIdentifier) {
            var scope = this.options.defaultScope || _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.BindingScopeEnum.Transient;
            var binding = new _bindings_binding__WEBPACK_IMPORTED_MODULE_7__.Binding(serviceIdentifier, scope);
            this._bindingDictionary.add(serviceIdentifier, binding);
            return new _syntax_binding_to_syntax__WEBPACK_IMPORTED_MODULE_8__.BindingToSyntax(binding);
        };
        Container.prototype.rebind = function (serviceIdentifier) {
            this.unbind(serviceIdentifier);
            return this.bind(serviceIdentifier);
        };
        Container.prototype.rebindAsync = function (serviceIdentifier) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.unbindAsync(serviceIdentifier)];
                        case 1:
                            _a.sent();
                            return [2, this.bind(serviceIdentifier)];
                    }
                });
            });
        };
        Container.prototype.unbind = function (serviceIdentifier) {
            if (this._bindingDictionary.hasKey(serviceIdentifier)) {
                var bindings = this._bindingDictionary.get(serviceIdentifier);
                this._deactivateSingletons(bindings);
            }
            this._removeServiceFromDictionary(serviceIdentifier);
        };
        Container.prototype.unbindAsync = function (serviceIdentifier) {
            return __awaiter(this, void 0, void 0, function () {
                var bindings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._bindingDictionary.hasKey(serviceIdentifier)) return [3, 2];
                            bindings = this._bindingDictionary.get(serviceIdentifier);
                            return [4, this._deactivateSingletonsAsync(bindings)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this._removeServiceFromDictionary(serviceIdentifier);
                            return [2];
                    }
                });
            });
        };
        Container.prototype.unbindAll = function () {
            var _this = this;
            this._bindingDictionary.traverse(function (_key, value) {
                _this._deactivateSingletons(value);
            });
            this._bindingDictionary = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
        };
        Container.prototype.unbindAllAsync = function () {
            return __awaiter(this, void 0, void 0, function () {
                var promises;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            promises = [];
                            this._bindingDictionary.traverse(function (_key, value) {
                                promises.push(_this._deactivateSingletonsAsync(value));
                            });
                            return [4, Promise.all(promises)];
                        case 1:
                            _a.sent();
                            this._bindingDictionary = new _lookup__WEBPACK_IMPORTED_MODULE_3__.Lookup();
                            return [2];
                    }
                });
            });
        };
        Container.prototype.onActivation = function (serviceIdentifier, onActivation) {
            this._activations.add(serviceIdentifier, onActivation);
        };
        Container.prototype.onDeactivation = function (serviceIdentifier, onDeactivation) {
            this._deactivations.add(serviceIdentifier, onDeactivation);
        };
        Container.prototype.isBound = function (serviceIdentifier) {
            var bound = this._bindingDictionary.hasKey(serviceIdentifier);
            if (!bound && this.parent) {
                bound = this.parent.isBound(serviceIdentifier);
            }
            return bound;
        };
        Container.prototype.isCurrentBound = function (serviceIdentifier) {
            return this._bindingDictionary.hasKey(serviceIdentifier);
        };
        Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
            return this.isBoundTagged(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
        };
        Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
            var bound = false;
            if (this._bindingDictionary.hasKey(serviceIdentifier)) {
                var bindings = this._bindingDictionary.get(serviceIdentifier);
                var request_1 = (0,_planning_planner__WEBPACK_IMPORTED_MODULE_6__.createMockRequest)(this, serviceIdentifier, key, value);
                bound = bindings.some(function (b) { return b.constraint(request_1); });
            }
            if (!bound && this.parent) {
                bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
            }
            return bound;
        };
        Container.prototype.snapshot = function () {
            this._snapshots.push(_container_snapshot__WEBPACK_IMPORTED_MODULE_10__.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware, this._activations.clone(), this._deactivations.clone(), this._moduleActivationStore.clone()));
        };
        Container.prototype.restore = function () {
            var snapshot = this._snapshots.pop();
            if (snapshot === undefined) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NO_MORE_SNAPSHOTS_AVAILABLE);
            }
            this._bindingDictionary = snapshot.bindings;
            this._activations = snapshot.activations;
            this._deactivations = snapshot.deactivations;
            this._middleware = snapshot.middleware;
            this._moduleActivationStore = snapshot.moduleActivationStore;
        };
        Container.prototype.createChild = function (containerOptions) {
            var child = new Container(containerOptions || this.options);
            child.parent = this;
            return child;
        };
        Container.prototype.applyMiddleware = function () {
            var middlewares = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                middlewares[_i] = arguments[_i];
            }
            var initial = (this._middleware) ? this._middleware : this._planAndResolve();
            this._middleware = middlewares.reduce(function (prev, curr) { return curr(prev); }, initial);
        };
        Container.prototype.applyCustomMetadataReader = function (metadataReader) {
            this._metadataReader = metadataReader;
        };
        Container.prototype.get = function (serviceIdentifier) {
            var getArgs = this._getNotAllArgs(serviceIdentifier, false);
            return this._getButThrowIfAsync(getArgs);
        };
        Container.prototype.getAsync = function (serviceIdentifier) {
            return __awaiter(this, void 0, void 0, function () {
                var getArgs;
                return __generator(this, function (_a) {
                    getArgs = this._getNotAllArgs(serviceIdentifier, false);
                    return [2, this._get(getArgs)];
                });
            });
        };
        Container.prototype.getTagged = function (serviceIdentifier, key, value) {
            var getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value);
            return this._getButThrowIfAsync(getArgs);
        };
        Container.prototype.getTaggedAsync = function (serviceIdentifier, key, value) {
            return __awaiter(this, void 0, void 0, function () {
                var getArgs;
                return __generator(this, function (_a) {
                    getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value);
                    return [2, this._get(getArgs)];
                });
            });
        };
        Container.prototype.getNamed = function (serviceIdentifier, named) {
            return this.getTagged(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
        };
        Container.prototype.getNamedAsync = function (serviceIdentifier, named) {
            return this.getTaggedAsync(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
        };
        Container.prototype.getAll = function (serviceIdentifier) {
            var getArgs = this._getAllArgs(serviceIdentifier);
            return this._getButThrowIfAsync(getArgs);
        };
        Container.prototype.getAllAsync = function (serviceIdentifier) {
            var getArgs = this._getAllArgs(serviceIdentifier);
            return this._getAll(getArgs);
        };
        Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
            var getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value);
            return this._getButThrowIfAsync(getArgs);
        };
        Container.prototype.getAllTaggedAsync = function (serviceIdentifier, key, value) {
            var getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value);
            return this._getAll(getArgs);
        };
        Container.prototype.getAllNamed = function (serviceIdentifier, named) {
            return this.getAllTagged(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
        };
        Container.prototype.getAllNamedAsync = function (serviceIdentifier, named) {
            return this.getAllTaggedAsync(serviceIdentifier, _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.NAMED_TAG, named);
        };
        Container.prototype.resolve = function (constructorFunction) {
            var isBound = this.isBound(constructorFunction);
            if (!isBound) {
                this.bind(constructorFunction).toSelf();
            }
            var resolved = this.get(constructorFunction);
            if (!isBound) {
                this.unbind(constructorFunction);
            }
            return resolved;
        };
        Container.prototype._preDestroy = function (constructor, instance) {
            if (Reflect.hasMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.PRE_DESTROY, constructor)) {
                var data = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_9__.PRE_DESTROY, constructor);
                return instance[data.value]();
            }
        };
        Container.prototype._removeModuleHandlers = function (moduleId) {
            var moduleActivationsHandlers = this._moduleActivationStore.remove(moduleId);
            this._activations.removeIntersection(moduleActivationsHandlers.onActivations);
            this._deactivations.removeIntersection(moduleActivationsHandlers.onDeactivations);
        };
        Container.prototype._removeModuleBindings = function (moduleId) {
            return this._bindingDictionary.removeByCondition(function (binding) { return binding.moduleId === moduleId; });
        };
        Container.prototype._deactivate = function (binding, instance) {
            var _this = this;
            var constructor = Object.getPrototypeOf(instance).constructor;
            try {
                if (this._deactivations.hasKey(binding.serviceIdentifier)) {
                    var result = this._deactivateContainer(instance, this._deactivations.get(binding.serviceIdentifier).values());
                    if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(result)) {
                        return this._handleDeactivationError(result.then(function () { return _this._propagateContainerDeactivationThenBindingAndPreDestroyAsync(binding, instance, constructor); }), constructor);
                    }
                }
                var propagateDeactivationResult = this._propagateContainerDeactivationThenBindingAndPreDestroy(binding, instance, constructor);
                if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(propagateDeactivationResult)) {
                    return this._handleDeactivationError(propagateDeactivationResult, constructor);
                }
            }
            catch (ex) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.ON_DEACTIVATION_ERROR(constructor.name, ex.message));
            }
        };
        Container.prototype._handleDeactivationError = function (asyncResult, constructor) {
            return __awaiter(this, void 0, void 0, function () {
                var ex_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, asyncResult];
                        case 1:
                            _a.sent();
                            return [3, 3];
                        case 2:
                            ex_1 = _a.sent();
                            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.ON_DEACTIVATION_ERROR(constructor.name, ex_1.message));
                        case 3: return [2];
                    }
                });
            });
        };
        Container.prototype._deactivateContainer = function (instance, deactivationsIterator) {
            var _this = this;
            var deactivation = deactivationsIterator.next();
            while (deactivation.value) {
                var result = deactivation.value(instance);
                if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(result)) {
                    return result.then(function () {
                        return _this._deactivateContainerAsync(instance, deactivationsIterator);
                    });
                }
                deactivation = deactivationsIterator.next();
            }
        };
        Container.prototype._deactivateContainerAsync = function (instance, deactivationsIterator) {
            return __awaiter(this, void 0, void 0, function () {
                var deactivation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            deactivation = deactivationsIterator.next();
                            _a.label = 1;
                        case 1:
                            if (!deactivation.value) return [3, 3];
                            return [4, deactivation.value(instance)];
                        case 2:
                            _a.sent();
                            deactivation = deactivationsIterator.next();
                            return [3, 1];
                        case 3: return [2];
                    }
                });
            });
        };
        Container.prototype._getContainerModuleHelpersFactory = function () {
            var _this = this;
            var setModuleId = function (bindingToSyntax, moduleId) {
                bindingToSyntax._binding.moduleId = moduleId;
            };
            var getBindFunction = function (moduleId) {
                return function (serviceIdentifier) {
                    var bindingToSyntax = _this.bind(serviceIdentifier);
                    setModuleId(bindingToSyntax, moduleId);
                    return bindingToSyntax;
                };
            };
            var getUnbindFunction = function () {
                return function (serviceIdentifier) {
                    return _this.unbind(serviceIdentifier);
                };
            };
            var getUnbindAsyncFunction = function () {
                return function (serviceIdentifier) {
                    return _this.unbindAsync(serviceIdentifier);
                };
            };
            var getIsboundFunction = function () {
                return function (serviceIdentifier) {
                    return _this.isBound(serviceIdentifier);
                };
            };
            var getRebindFunction = function (moduleId) {
                return function (serviceIdentifier) {
                    var bindingToSyntax = _this.rebind(serviceIdentifier);
                    setModuleId(bindingToSyntax, moduleId);
                    return bindingToSyntax;
                };
            };
            var getOnActivationFunction = function (moduleId) {
                return function (serviceIdentifier, onActivation) {
                    _this._moduleActivationStore.addActivation(moduleId, serviceIdentifier, onActivation);
                    _this.onActivation(serviceIdentifier, onActivation);
                };
            };
            var getOnDeactivationFunction = function (moduleId) {
                return function (serviceIdentifier, onDeactivation) {
                    _this._moduleActivationStore.addDeactivation(moduleId, serviceIdentifier, onDeactivation);
                    _this.onDeactivation(serviceIdentifier, onDeactivation);
                };
            };
            return function (mId) { return ({
                bindFunction: getBindFunction(mId),
                isboundFunction: getIsboundFunction(),
                onActivationFunction: getOnActivationFunction(mId),
                onDeactivationFunction: getOnDeactivationFunction(mId),
                rebindFunction: getRebindFunction(mId),
                unbindFunction: getUnbindFunction(),
                unbindAsyncFunction: getUnbindAsyncFunction()
            }); };
        };
        Container.prototype._getAll = function (getArgs) {
            return Promise.all(this._get(getArgs));
        };
        Container.prototype._get = function (getArgs) {
            var planAndResolveArgs = __assign(__assign({}, getArgs), { contextInterceptor: function (context) { return context; }, targetType: _constants_literal_types__WEBPACK_IMPORTED_MODULE_1__.TargetTypeEnum.Variable });
            if (this._middleware) {
                var middlewareResult = this._middleware(planAndResolveArgs);
                if (middlewareResult === undefined || middlewareResult === null) {
                    throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.INVALID_MIDDLEWARE_RETURN);
                }
                return middlewareResult;
            }
            return this._planAndResolve()(planAndResolveArgs);
        };
        Container.prototype._getButThrowIfAsync = function (getArgs) {
            var result = this._get(getArgs);
            if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromiseOrContainsPromise)(result)) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.LAZY_IN_SYNC(getArgs.serviceIdentifier));
            }
            return result;
        };
        Container.prototype._getAllArgs = function (serviceIdentifier) {
            var getAllArgs = {
                avoidConstraints: true,
                isMultiInject: true,
                serviceIdentifier: serviceIdentifier,
            };
            return getAllArgs;
        };
        Container.prototype._getNotAllArgs = function (serviceIdentifier, isMultiInject, key, value) {
            var getNotAllArgs = {
                avoidConstraints: false,
                isMultiInject: isMultiInject,
                serviceIdentifier: serviceIdentifier,
                key: key,
                value: value,
            };
            return getNotAllArgs;
        };
        Container.prototype._planAndResolve = function () {
            var _this = this;
            return function (args) {
                var context = (0,_planning_planner__WEBPACK_IMPORTED_MODULE_6__.plan)(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
                context = args.contextInterceptor(context);
                var result = (0,_resolution_resolver__WEBPACK_IMPORTED_MODULE_12__.resolve)(context);
                return result;
            };
        };
        Container.prototype._deactivateIfSingleton = function (binding) {
            var _this = this;
            if (!binding.activated) {
                return;
            }
            if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(binding.cache)) {
                return binding.cache.then(function (resolved) { return _this._deactivate(binding, resolved); });
            }
            return this._deactivate(binding, binding.cache);
        };
        Container.prototype._deactivateSingletons = function (bindings) {
            for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
                var binding = bindings_1[_i];
                var result = this._deactivateIfSingleton(binding);
                if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(result)) {
                    throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.ASYNC_UNBIND_REQUIRED);
                }
            }
        };
        Container.prototype._deactivateSingletonsAsync = function (bindings) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, Promise.all(bindings.map(function (b) { return _this._deactivateIfSingleton(b); }))];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Container.prototype._propagateContainerDeactivationThenBindingAndPreDestroy = function (binding, instance, constructor) {
            if (this.parent) {
                return this._deactivate.bind(this.parent)(binding, instance);
            }
            else {
                return this._bindingDeactivationAndPreDestroy(binding, instance, constructor);
            }
        };
        Container.prototype._propagateContainerDeactivationThenBindingAndPreDestroyAsync = function (binding, instance, constructor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.parent) return [3, 2];
                            return [4, this._deactivate.bind(this.parent)(binding, instance)];
                        case 1:
                            _a.sent();
                            return [3, 4];
                        case 2: return [4, this._bindingDeactivationAndPreDestroyAsync(binding, instance, constructor)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2];
                    }
                });
            });
        };
        Container.prototype._removeServiceFromDictionary = function (serviceIdentifier) {
            try {
                this._bindingDictionary.remove(serviceIdentifier);
            }
            catch (e) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CANNOT_UNBIND + " " + (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_13__.getServiceIdentifierAsString)(serviceIdentifier));
            }
        };
        Container.prototype._bindingDeactivationAndPreDestroy = function (binding, instance, constructor) {
            var _this = this;
            if (typeof binding.onDeactivation === "function") {
                var result = binding.onDeactivation(instance);
                if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_11__.isPromise)(result)) {
                    return result.then(function () { return _this._preDestroy(constructor, instance); });
                }
            }
            return this._preDestroy(constructor, instance);
        };
        Container.prototype._bindingDeactivationAndPreDestroyAsync = function (binding, instance, constructor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof binding.onDeactivation === "function")) return [3, 2];
                            return [4, binding.onDeactivation(instance)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4, this._preDestroy(constructor, instance)];
                        case 3:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        return Container;
    }());
    
    //# sourceMappingURL=container.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/container_module.js":
    /*!*******************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/container_module.js ***!
      \*******************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   AsyncContainerModule: () => (/* binding */ AsyncContainerModule),
    /* harmony export */   ContainerModule: () => (/* binding */ ContainerModule)
    /* harmony export */ });
    /* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/id.js");
    
    var ContainerModule = (function () {
        function ContainerModule(registry) {
            this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
            this.registry = registry;
        }
        return ContainerModule;
    }());
    
    var AsyncContainerModule = (function () {
        function AsyncContainerModule(registry) {
            this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
            this.registry = registry;
        }
        return AsyncContainerModule;
    }());
    
    //# sourceMappingURL=container_module.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/container_snapshot.js":
    /*!*********************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/container_snapshot.js ***!
      \*********************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   ContainerSnapshot: () => (/* binding */ ContainerSnapshot)
    /* harmony export */ });
    var ContainerSnapshot = (function () {
        function ContainerSnapshot() {
        }
        ContainerSnapshot.of = function (bindings, middleware, activations, deactivations, moduleActivationStore) {
            var snapshot = new ContainerSnapshot();
            snapshot.bindings = bindings;
            snapshot.middleware = middleware;
            snapshot.deactivations = deactivations;
            snapshot.activations = activations;
            snapshot.moduleActivationStore = moduleActivationStore;
            return snapshot;
        };
        return ContainerSnapshot;
    }());
    
    //# sourceMappingURL=container_snapshot.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/lookup.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/lookup.js ***!
      \*********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   Lookup: () => (/* binding */ Lookup)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _utils_clonable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/clonable */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/clonable.js");
    
    
    var Lookup = (function () {
        function Lookup() {
            this._map = new Map();
        }
        Lookup.prototype.getMap = function () {
            return this._map;
        };
        Lookup.prototype.add = function (serviceIdentifier, value) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
            }
            if (value === null || value === undefined) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
            }
            var entry = this._map.get(serviceIdentifier);
            if (entry !== undefined) {
                entry.push(value);
            }
            else {
                this._map.set(serviceIdentifier, [value]);
            }
        };
        Lookup.prototype.get = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
            }
            var entry = this._map.get(serviceIdentifier);
            if (entry !== undefined) {
                return entry;
            }
            else {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.KEY_NOT_FOUND);
            }
        };
        Lookup.prototype.remove = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
            }
            if (!this._map.delete(serviceIdentifier)) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.KEY_NOT_FOUND);
            }
        };
        Lookup.prototype.removeIntersection = function (lookup) {
            var _this = this;
            this.traverse(function (serviceIdentifier, value) {
                var lookupActivations = lookup.hasKey(serviceIdentifier) ? lookup.get(serviceIdentifier) : undefined;
                if (lookupActivations !== undefined) {
                    var filteredValues = value.filter(function (lookupValue) {
                        return !lookupActivations.some(function (moduleActivation) { return lookupValue === moduleActivation; });
                    });
                    _this._setValue(serviceIdentifier, filteredValues);
                }
            });
        };
        Lookup.prototype.removeByCondition = function (condition) {
            var _this = this;
            var removals = [];
            this._map.forEach(function (entries, key) {
                var updatedEntries = [];
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entry = entries_1[_i];
                    var remove = condition(entry);
                    if (remove) {
                        removals.push(entry);
                    }
                    else {
                        updatedEntries.push(entry);
                    }
                }
                _this._setValue(key, updatedEntries);
            });
            return removals;
        };
        Lookup.prototype.hasKey = function (serviceIdentifier) {
            if (serviceIdentifier === null || serviceIdentifier === undefined) {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.NULL_ARGUMENT);
            }
            return this._map.has(serviceIdentifier);
        };
        Lookup.prototype.clone = function () {
            var copy = new Lookup();
            this._map.forEach(function (value, key) {
                value.forEach(function (b) { return copy.add(key, (0,_utils_clonable__WEBPACK_IMPORTED_MODULE_1__.isClonable)(b) ? b.clone() : b); });
            });
            return copy;
        };
        Lookup.prototype.traverse = function (func) {
            this._map.forEach(function (value, key) {
                func(key, value);
            });
        };
        Lookup.prototype._setValue = function (serviceIdentifier, value) {
            if (value.length > 0) {
                this._map.set(serviceIdentifier, value);
            }
            else {
                this._map.delete(serviceIdentifier);
            }
        };
        return Lookup;
    }());
    
    //# sourceMappingURL=lookup.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/module_activation_store.js":
    /*!**************************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/module_activation_store.js ***!
      \**************************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   ModuleActivationStore: () => (/* binding */ ModuleActivationStore)
    /* harmony export */ });
    /* harmony import */ var _lookup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lookup */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/lookup.js");
    
    var ModuleActivationStore = (function () {
        function ModuleActivationStore() {
            this._map = new Map();
        }
        ModuleActivationStore.prototype.remove = function (moduleId) {
            if (this._map.has(moduleId)) {
                var handlers = this._map.get(moduleId);
                this._map.delete(moduleId);
                return handlers;
            }
            return this._getEmptyHandlersStore();
        };
        ModuleActivationStore.prototype.addDeactivation = function (moduleId, serviceIdentifier, onDeactivation) {
            this._getModuleActivationHandlers(moduleId)
                .onDeactivations.add(serviceIdentifier, onDeactivation);
        };
        ModuleActivationStore.prototype.addActivation = function (moduleId, serviceIdentifier, onActivation) {
            this._getModuleActivationHandlers(moduleId)
                .onActivations.add(serviceIdentifier, onActivation);
        };
        ModuleActivationStore.prototype.clone = function () {
            var clone = new ModuleActivationStore();
            this._map.forEach(function (handlersStore, moduleId) {
                clone._map.set(moduleId, {
                    onActivations: handlersStore.onActivations.clone(),
                    onDeactivations: handlersStore.onDeactivations.clone(),
                });
            });
            return clone;
        };
        ModuleActivationStore.prototype._getModuleActivationHandlers = function (moduleId) {
            var moduleActivationHandlers = this._map.get(moduleId);
            if (moduleActivationHandlers === undefined) {
                moduleActivationHandlers = this._getEmptyHandlersStore();
                this._map.set(moduleId, moduleActivationHandlers);
            }
            return moduleActivationHandlers;
        };
        ModuleActivationStore.prototype._getEmptyHandlersStore = function () {
            var handlersStore = {
                onActivations: new _lookup__WEBPACK_IMPORTED_MODULE_0__.Lookup(),
                onDeactivations: new _lookup__WEBPACK_IMPORTED_MODULE_0__.Lookup()
            };
            return handlersStore;
        };
        return ModuleActivationStore;
    }());
    
    //# sourceMappingURL=module_activation_store.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/interfaces/interfaces.js":
    /*!**************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/interfaces/interfaces.js ***!
      \**************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   interfaces: () => (/* binding */ interfaces)
    /* harmony export */ });
    var interfaces;
    (function (interfaces) {
        ;
    })(interfaces || (interfaces = {}));
    
    //# sourceMappingURL=interfaces.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js":
    /*!**************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/inversify.js ***!
      \**************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   AsyncContainerModule: () => (/* reexport safe */ _container_container_module__WEBPACK_IMPORTED_MODULE_3__.AsyncContainerModule),
    /* harmony export */   BindingScopeEnum: () => (/* reexport safe */ _constants_literal_types__WEBPACK_IMPORTED_MODULE_2__.BindingScopeEnum),
    /* harmony export */   BindingTypeEnum: () => (/* reexport safe */ _constants_literal_types__WEBPACK_IMPORTED_MODULE_2__.BindingTypeEnum),
    /* harmony export */   Container: () => (/* reexport safe */ _container_container__WEBPACK_IMPORTED_MODULE_1__.Container),
    /* harmony export */   ContainerModule: () => (/* reexport safe */ _container_container_module__WEBPACK_IMPORTED_MODULE_3__.ContainerModule),
    /* harmony export */   LazyServiceIdentifer: () => (/* reexport safe */ _annotation_lazy_service_identifier__WEBPACK_IMPORTED_MODULE_9__.LazyServiceIdentifer),
    /* harmony export */   METADATA_KEY: () => (/* binding */ METADATA_KEY),
    /* harmony export */   MetadataReader: () => (/* reexport safe */ _planning_metadata_reader__WEBPACK_IMPORTED_MODULE_16__.MetadataReader),
    /* harmony export */   TargetTypeEnum: () => (/* reexport safe */ _constants_literal_types__WEBPACK_IMPORTED_MODULE_2__.TargetTypeEnum),
    /* harmony export */   createTaggedDecorator: () => (/* reexport safe */ _annotation_decorator_utils__WEBPACK_IMPORTED_MODULE_4__.createTaggedDecorator),
    /* harmony export */   decorate: () => (/* reexport safe */ _annotation_decorator_utils__WEBPACK_IMPORTED_MODULE_4__.decorate),
    /* harmony export */   getServiceIdentifierAsString: () => (/* reexport safe */ _utils_serialization__WEBPACK_IMPORTED_MODULE_20__.getServiceIdentifierAsString),
    /* harmony export */   id: () => (/* reexport safe */ _utils_id__WEBPACK_IMPORTED_MODULE_17__.id),
    /* harmony export */   inject: () => (/* reexport safe */ _annotation_inject__WEBPACK_IMPORTED_MODULE_8__.inject),
    /* harmony export */   injectable: () => (/* reexport safe */ _annotation_injectable__WEBPACK_IMPORTED_MODULE_5__.injectable),
    /* harmony export */   interfaces: () => (/* reexport safe */ _interfaces_interfaces__WEBPACK_IMPORTED_MODULE_18__.interfaces),
    /* harmony export */   multiBindToService: () => (/* reexport safe */ _utils_binding_utils__WEBPACK_IMPORTED_MODULE_21__.multiBindToService),
    /* harmony export */   multiInject: () => (/* reexport safe */ _annotation_multi_inject__WEBPACK_IMPORTED_MODULE_12__.multiInject),
    /* harmony export */   named: () => (/* reexport safe */ _annotation_named__WEBPACK_IMPORTED_MODULE_7__.named),
    /* harmony export */   namedConstraint: () => (/* reexport safe */ _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__.namedConstraint),
    /* harmony export */   optional: () => (/* reexport safe */ _annotation_optional__WEBPACK_IMPORTED_MODULE_10__.optional),
    /* harmony export */   postConstruct: () => (/* reexport safe */ _annotation_post_construct__WEBPACK_IMPORTED_MODULE_14__.postConstruct),
    /* harmony export */   preDestroy: () => (/* reexport safe */ _annotation_pre_destroy__WEBPACK_IMPORTED_MODULE_15__.preDestroy),
    /* harmony export */   tagged: () => (/* reexport safe */ _annotation_tagged__WEBPACK_IMPORTED_MODULE_6__.tagged),
    /* harmony export */   taggedConstraint: () => (/* reexport safe */ _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__.taggedConstraint),
    /* harmony export */   targetName: () => (/* reexport safe */ _annotation_target_name__WEBPACK_IMPORTED_MODULE_13__.targetName),
    /* harmony export */   traverseAncerstors: () => (/* reexport safe */ _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__.traverseAncerstors),
    /* harmony export */   typeConstraint: () => (/* reexport safe */ _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__.typeConstraint),
    /* harmony export */   unmanaged: () => (/* reexport safe */ _annotation_unmanaged__WEBPACK_IMPORTED_MODULE_11__.unmanaged)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _container_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./container/container */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/container.js");
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _container_container_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./container/container_module */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/container/container_module.js");
    /* harmony import */ var _annotation_decorator_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./annotation/decorator_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/decorator_utils.js");
    /* harmony import */ var _annotation_injectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./annotation/injectable */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/injectable.js");
    /* harmony import */ var _annotation_tagged__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./annotation/tagged */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/tagged.js");
    /* harmony import */ var _annotation_named__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./annotation/named */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/named.js");
    /* harmony import */ var _annotation_inject__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./annotation/inject */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/inject.js");
    /* harmony import */ var _annotation_lazy_service_identifier__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./annotation/lazy_service_identifier */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/lazy_service_identifier.js");
    /* harmony import */ var _annotation_optional__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./annotation/optional */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/optional.js");
    /* harmony import */ var _annotation_unmanaged__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./annotation/unmanaged */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/unmanaged.js");
    /* harmony import */ var _annotation_multi_inject__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./annotation/multi_inject */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/multi_inject.js");
    /* harmony import */ var _annotation_target_name__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./annotation/target_name */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/target_name.js");
    /* harmony import */ var _annotation_post_construct__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./annotation/post_construct */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/post_construct.js");
    /* harmony import */ var _annotation_pre_destroy__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./annotation/pre_destroy */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/pre_destroy.js");
    /* harmony import */ var _planning_metadata_reader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./planning/metadata_reader */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata_reader.js");
    /* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/id */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/id.js");
    /* harmony import */ var _interfaces_interfaces__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./interfaces/interfaces */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/interfaces/interfaces.js");
    /* harmony import */ var _syntax_constraint_helpers__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./syntax/constraint_helpers */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/constraint_helpers.js");
    /* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils/serialization */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/serialization.js");
    /* harmony import */ var _utils_binding_utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./utils/binding_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/binding_utils.js");
    
    var METADATA_KEY = _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //# sourceMappingURL=inversify.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/context.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/context.js ***!
      \*********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   Context: () => (/* binding */ Context)
    /* harmony export */ });
    /* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/id.js");
    
    var Context = (function () {
        function Context(container) {
            this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
            this.container = container;
        }
        Context.prototype.addPlan = function (plan) {
            this.plan = plan;
        };
        Context.prototype.setCurrentRequest = function (currentRequest) {
            this.currentRequest = currentRequest;
        };
        return Context;
    }());
    
    //# sourceMappingURL=context.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js":
    /*!**********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js ***!
      \**********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   Metadata: () => (/* binding */ Metadata)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    
    var Metadata = (function () {
        function Metadata(key, value) {
            this.key = key;
            this.value = value;
        }
        Metadata.prototype.toString = function () {
            if (this.key === _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.NAMED_TAG) {
                return "named: " + String(this.value).toString() + " ";
            }
            else {
                return "tagged: { key:" + this.key.toString() + ", value: " + String(this.value) + " }";
            }
        };
        return Metadata;
    }());
    
    //# sourceMappingURL=metadata.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata_reader.js":
    /*!*****************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata_reader.js ***!
      \*****************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   MetadataReader: () => (/* binding */ MetadataReader)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    
    var MetadataReader = (function () {
        function MetadataReader() {
        }
        MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
            var compilerGeneratedMetadata = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.PARAM_TYPES, constructorFunc);
            var userGeneratedMetadata = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.TAGGED, constructorFunc);
            return {
                compilerGeneratedMetadata: compilerGeneratedMetadata,
                userGeneratedMetadata: userGeneratedMetadata || {}
            };
        };
        MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
            var userGeneratedMetadata = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.TAGGED_PROP, constructorFunc) || [];
            return userGeneratedMetadata;
        };
        return MetadataReader;
    }());
    
    //# sourceMappingURL=metadata_reader.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/plan.js":
    /*!******************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/plan.js ***!
      \******************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   Plan: () => (/* binding */ Plan)
    /* harmony export */ });
    var Plan = (function () {
        function Plan(parentContext, rootRequest) {
            this.parentContext = parentContext;
            this.rootRequest = rootRequest;
        }
        return Plan;
    }());
    
    //# sourceMappingURL=plan.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/planner.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/planner.js ***!
      \*********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   createMockRequest: () => (/* binding */ createMockRequest),
    /* harmony export */   getBindingDictionary: () => (/* binding */ getBindingDictionary),
    /* harmony export */   plan: () => (/* binding */ plan)
    /* harmony export */ });
    /* harmony import */ var _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../bindings/binding_count */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/bindings/binding_count.js");
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _utils_exceptions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/exceptions.js");
    /* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reflection_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/serialization.js");
    /* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./context */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/context.js");
    /* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    /* harmony import */ var _plan__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plan */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/plan.js");
    /* harmony import */ var _reflection_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./reflection_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/reflection_utils.js");
    /* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./request */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/request.js");
    /* harmony import */ var _target__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./target */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/target.js");
    
    
    
    
    
    
    
    
    
    
    
    
    function getBindingDictionary(cntnr) {
        return cntnr._bindingDictionary;
    }
    function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
        var metadataKey = isMultiInject ? _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.MULTI_INJECT_TAG : _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_0__.INJECT_TAG;
        var injectMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(metadataKey, serviceIdentifier);
        var target = new _target__WEBPACK_IMPORTED_MODULE_2__.Target(targetType, name, serviceIdentifier, injectMetadata);
        if (key !== undefined) {
            var tagMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(key, value);
            target.metadata.push(tagMetadata);
        }
        return target;
    }
    function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
        var bindings = getBindings(context.container, target.serviceIdentifier);
        var activeBindings = [];
        if (bindings.length === _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__.BindingCount.NoBindingsAvailable &&
            context.container.options.autoBindInjectable &&
            typeof target.serviceIdentifier === "function" &&
            metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
            context.container.bind(target.serviceIdentifier).toSelf();
            bindings = getBindings(context.container, target.serviceIdentifier);
        }
        if (!avoidConstraints) {
            activeBindings = bindings.filter(function (binding) {
                var request = new _request__WEBPACK_IMPORTED_MODULE_4__.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
                return binding.constraint(request);
            });
        }
        else {
            activeBindings = bindings;
        }
        _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
        return activeBindings;
    }
    function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
        switch (bindings.length) {
            case _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__.BindingCount.NoBindingsAvailable:
                if (target.isOptional()) {
                    return bindings;
                }
                else {
                    var serviceIdentifierString = (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.getServiceIdentifierAsString)(serviceIdentifier);
                    var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_6__.NOT_REGISTERED;
                    msg += (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.listMetadataForTarget)(serviceIdentifierString, target);
                    msg += (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.listRegisteredBindingsForServiceIdentifier)(container, serviceIdentifierString, getBindings);
                    throw new Error(msg);
                }
            case _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__.BindingCount.OnlyOneBindingAvailable:
                return bindings;
            case _bindings_binding_count__WEBPACK_IMPORTED_MODULE_3__.BindingCount.MultipleBindingsAvailable:
            default:
                if (!target.isArray()) {
                    var serviceIdentifierString = (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.getServiceIdentifierAsString)(serviceIdentifier);
                    var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_6__.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
                    msg += (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.listRegisteredBindingsForServiceIdentifier)(container, serviceIdentifierString, getBindings);
                    throw new Error(msg);
                }
                else {
                    return bindings;
                }
        }
    }
    function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
        var activeBindings;
        var childRequest;
        if (parentRequest === null) {
            activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
            childRequest = new _request__WEBPACK_IMPORTED_MODULE_4__.Request(serviceIdentifier, context, null, activeBindings, target);
            var thePlan = new _plan__WEBPACK_IMPORTED_MODULE_7__.Plan(context, childRequest);
            context.addPlan(thePlan);
        }
        else {
            activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
            childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
        }
        activeBindings.forEach(function (binding) {
            var subChildRequest = null;
            if (target.isArray()) {
                subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
            }
            else {
                if (binding.cache) {
                    return;
                }
                subChildRequest = childRequest;
            }
            if (binding.type === _constants_literal_types__WEBPACK_IMPORTED_MODULE_8__.BindingTypeEnum.Instance && binding.implementationType !== null) {
                var dependencies = (0,_reflection_utils__WEBPACK_IMPORTED_MODULE_9__.getDependencies)(metadataReader, binding.implementationType);
                if (!context.container.options.skipBaseClassChecks) {
                    var baseClassDependencyCount = (0,_reflection_utils__WEBPACK_IMPORTED_MODULE_9__.getBaseClassDependencyCount)(metadataReader, binding.implementationType);
                    if (dependencies.length < baseClassDependencyCount) {
                        var error = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_6__.ARGUMENTS_LENGTH_MISMATCH((0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.getFunctionName)(binding.implementationType));
                        throw new Error(error);
                    }
                }
                dependencies.forEach(function (dependency) {
                    _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
                });
            }
        });
    }
    function getBindings(container, serviceIdentifier) {
        var bindings = [];
        var bindingDictionary = getBindingDictionary(container);
        if (bindingDictionary.hasKey(serviceIdentifier)) {
            bindings = bindingDictionary.get(serviceIdentifier);
        }
        else if (container.parent !== null) {
            bindings = getBindings(container.parent, serviceIdentifier);
        }
        return bindings;
    }
    function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
        if (avoidConstraints === void 0) { avoidConstraints = false; }
        var context = new _context__WEBPACK_IMPORTED_MODULE_10__.Context(container);
        var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
        try {
            _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
            return context;
        }
        catch (error) {
            if ((0,_utils_exceptions__WEBPACK_IMPORTED_MODULE_11__.isStackOverflowExeption)(error)) {
                (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_5__.circularDependencyToException)(context.plan.rootRequest);
            }
            throw error;
        }
    }
    function createMockRequest(container, serviceIdentifier, key, value) {
        var target = new _target__WEBPACK_IMPORTED_MODULE_2__.Target(_constants_literal_types__WEBPACK_IMPORTED_MODULE_8__.TargetTypeEnum.Variable, "", serviceIdentifier, new _metadata__WEBPACK_IMPORTED_MODULE_1__.Metadata(key, value));
        var context = new _context__WEBPACK_IMPORTED_MODULE_10__.Context(container);
        var request = new _request__WEBPACK_IMPORTED_MODULE_4__.Request(serviceIdentifier, context, null, [], target);
        return request;
    }
    
    //# sourceMappingURL=planner.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/queryable_string.js":
    /*!******************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/queryable_string.js ***!
      \******************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   QueryableString: () => (/* binding */ QueryableString)
    /* harmony export */ });
    var QueryableString = (function () {
        function QueryableString(str) {
            this.str = str;
        }
        QueryableString.prototype.startsWith = function (searchString) {
            return this.str.indexOf(searchString) === 0;
        };
        QueryableString.prototype.endsWith = function (searchString) {
            var reverseString = "";
            var reverseSearchString = searchString.split("").reverse().join("");
            reverseString = this.str.split("").reverse().join("");
            return this.startsWith.call({ str: reverseString }, reverseSearchString);
        };
        QueryableString.prototype.contains = function (searchString) {
            return (this.str.indexOf(searchString) !== -1);
        };
        QueryableString.prototype.equals = function (compareString) {
            return this.str === compareString;
        };
        QueryableString.prototype.value = function () {
            return this.str;
        };
        return QueryableString;
    }());
    
    //# sourceMappingURL=queryable_string.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/reflection_utils.js":
    /*!******************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/reflection_utils.js ***!
      \******************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   getBaseClassDependencyCount: () => (/* binding */ getBaseClassDependencyCount),
    /* harmony export */   getDependencies: () => (/* binding */ getDependencies),
    /* harmony export */   getFunctionName: () => (/* reexport safe */ _utils_serialization__WEBPACK_IMPORTED_MODULE_0__.getFunctionName)
    /* harmony export */ });
    /* harmony import */ var _annotation_lazy_service_identifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../annotation/lazy_service_identifier */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/annotation/lazy_service_identifier.js");
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/serialization */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/serialization.js");
    /* harmony import */ var _target__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./target */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/target.js");
    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    
    
    
    
    
    
    function getDependencies(metadataReader, func) {
        var constructorName = (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_0__.getFunctionName)(func);
        return getTargets(metadataReader, constructorName, func, false);
    }
    function getTargets(metadataReader, constructorName, func, isBaseClass) {
        var metadata = metadataReader.getConstructorMetadata(func);
        var serviceIdentifiers = metadata.compilerGeneratedMetadata;
        if (serviceIdentifiers === undefined) {
            var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
            throw new Error(msg);
        }
        var constructorArgsMetadata = metadata.userGeneratedMetadata;
        var keys = Object.keys(constructorArgsMetadata);
        var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
        var hasOptionalParameters = keys.length > func.length;
        var iterations = (hasUserDeclaredUnknownInjections || hasOptionalParameters) ? keys.length : func.length;
        var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
        var propertyTargets = getClassPropsAsTargets(metadataReader, func, constructorName);
        var targets = __spreadArray(__spreadArray([], constructorTargets, true), propertyTargets, true);
        return targets;
    }
    function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
        var targetMetadata = constructorArgsMetadata[index.toString()] || [];
        var metadata = formatTargetMetadata(targetMetadata);
        var isManaged = metadata.unmanaged !== true;
        var serviceIdentifier = serviceIdentifiers[index];
        var injectIdentifier = (metadata.inject || metadata.multiInject);
        serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
        if (serviceIdentifier instanceof _annotation_lazy_service_identifier__WEBPACK_IMPORTED_MODULE_2__.LazyServiceIdentifer) {
            serviceIdentifier = serviceIdentifier.unwrap();
        }
        if (isManaged) {
            var isObject = serviceIdentifier === Object;
            var isFunction = serviceIdentifier === Function;
            var isUndefined = serviceIdentifier === undefined;
            var isUnknownType = (isObject || isFunction || isUndefined);
            if (!isBaseClass && isUnknownType) {
                var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
                throw new Error(msg);
            }
            var target = new _target__WEBPACK_IMPORTED_MODULE_3__.Target(_constants_literal_types__WEBPACK_IMPORTED_MODULE_4__.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
            target.metadata = targetMetadata;
            return target;
        }
        return null;
    }
    function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
        var targets = [];
        for (var i = 0; i < iterations; i++) {
            var index = i;
            var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
            if (target !== null) {
                targets.push(target);
            }
        }
        return targets;
    }
    function _getServiceIdentifierForProperty(inject, multiInject, propertyName, className) {
        var serviceIdentifier = (inject || multiInject);
        if (serviceIdentifier === undefined) {
            var msg = _constants_error_msgs__WEBPACK_IMPORTED_MODULE_1__.MISSING_INJECTABLE_ANNOTATION + " for property " + String(propertyName) + " in class " + className + ".";
            throw new Error(msg);
        }
        return serviceIdentifier;
    }
    function getClassPropsAsTargets(metadataReader, constructorFunc, constructorName) {
        var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
        var targets = [];
        var symbolKeys = Object.getOwnPropertySymbols(classPropsMetadata);
        var stringKeys = Object.keys(classPropsMetadata);
        var keys = stringKeys.concat(symbolKeys);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var targetMetadata = classPropsMetadata[key];
            var metadata = formatTargetMetadata(targetMetadata);
            var identifier = metadata.targetName || key;
            var serviceIdentifier = _getServiceIdentifierForProperty(metadata.inject, metadata.multiInject, key, constructorName);
            var target = new _target__WEBPACK_IMPORTED_MODULE_3__.Target(_constants_literal_types__WEBPACK_IMPORTED_MODULE_4__.TargetTypeEnum.ClassProperty, identifier, serviceIdentifier);
            target.metadata = targetMetadata;
            targets.push(target);
        }
        var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
        if (baseConstructor !== Object) {
            var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor, constructorName);
            targets = __spreadArray(__spreadArray([], targets, true), baseTargets, true);
        }
        return targets;
    }
    function getBaseClassDependencyCount(metadataReader, func) {
        var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
        if (baseConstructor !== Object) {
            var baseConstructorName = (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_0__.getFunctionName)(baseConstructor);
            var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
            var metadata = targets.map(function (t) { return t.metadata.filter(function (m) { return m.key === _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.UNMANAGED_TAG; }); });
            var unmanagedCount = [].concat.apply([], metadata).length;
            var dependencyCount = targets.length - unmanagedCount;
            if (dependencyCount > 0) {
                return dependencyCount;
            }
            else {
                return getBaseClassDependencyCount(metadataReader, baseConstructor);
            }
        }
        else {
            return 0;
        }
    }
    function formatTargetMetadata(targetMetadata) {
        var targetMetadataMap = {};
        targetMetadata.forEach(function (m) {
            targetMetadataMap[m.key.toString()] = m.value;
        });
        return {
            inject: targetMetadataMap[_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.INJECT_TAG],
            multiInject: targetMetadataMap[_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.MULTI_INJECT_TAG],
            targetName: targetMetadataMap[_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.NAME_TAG],
            unmanaged: targetMetadataMap[_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_5__.UNMANAGED_TAG]
        };
    }
    
    //# sourceMappingURL=reflection_utils.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/request.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/request.js ***!
      \*********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   Request: () => (/* binding */ Request)
    /* harmony export */ });
    /* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/id.js");
    
    var Request = (function () {
        function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
            this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
            this.serviceIdentifier = serviceIdentifier;
            this.parentContext = parentContext;
            this.parentRequest = parentRequest;
            this.target = target;
            this.childRequests = [];
            this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
            this.requestScope = parentRequest === null
                ? new Map()
                : null;
        }
        Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
            var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
            this.childRequests.push(child);
            return child;
        };
        return Request;
    }());
    
    //# sourceMappingURL=request.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/target.js":
    /*!********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/target.js ***!
      \********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   Target: () => (/* binding */ Target)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/id.js");
    /* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/serialization */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/serialization.js");
    /* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    /* harmony import */ var _queryable_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryable_string */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/queryable_string.js");
    
    
    
    
    
    var Target = (function () {
        function Target(type, identifier, serviceIdentifier, namedOrTagged) {
            this.id = (0,_utils_id__WEBPACK_IMPORTED_MODULE_0__.id)();
            this.type = type;
            this.serviceIdentifier = serviceIdentifier;
            var queryableName = typeof identifier === 'symbol' ? (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_1__.getSymbolDescription)(identifier) : identifier;
            this.name = new _queryable_string__WEBPACK_IMPORTED_MODULE_2__.QueryableString(queryableName || "");
            this.identifier = identifier;
            this.metadata = new Array();
            var metadataItem = null;
            if (typeof namedOrTagged === 'string') {
                metadataItem = new _metadata__WEBPACK_IMPORTED_MODULE_3__.Metadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NAMED_TAG, namedOrTagged);
            }
            else if (namedOrTagged instanceof _metadata__WEBPACK_IMPORTED_MODULE_3__.Metadata) {
                metadataItem = namedOrTagged;
            }
            if (metadataItem !== null) {
                this.metadata.push(metadataItem);
            }
        }
        Target.prototype.hasTag = function (key) {
            for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.key === key) {
                    return true;
                }
            }
            return false;
        };
        Target.prototype.isArray = function () {
            return this.hasTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.MULTI_INJECT_TAG);
        };
        Target.prototype.matchesArray = function (name) {
            return this.matchesTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.MULTI_INJECT_TAG)(name);
        };
        Target.prototype.isNamed = function () {
            return this.hasTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NAMED_TAG);
        };
        Target.prototype.isTagged = function () {
            return this.metadata.some(function (metadata) { return _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
        };
        Target.prototype.isOptional = function () {
            return this.matchesTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.OPTIONAL_TAG)(true);
        };
        Target.prototype.getNamedTag = function () {
            if (this.isNamed()) {
                return this.metadata.filter(function (m) { return m.key === _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NAMED_TAG; })[0];
            }
            return null;
        };
        Target.prototype.getCustomTags = function () {
            if (this.isTagged()) {
                return this.metadata.filter(function (metadata) { return _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
            }
            else {
                return null;
            }
        };
        Target.prototype.matchesNamedTag = function (name) {
            return this.matchesTag(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_4__.NAMED_TAG)(name);
        };
        Target.prototype.matchesTag = function (key) {
            var _this = this;
            return function (value) {
                for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
                    var m = _a[_i];
                    if (m.key === key && m.value === value) {
                        return true;
                    }
                }
                return false;
            };
        };
        return Target;
    }());
    
    //# sourceMappingURL=target.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/resolution/instantiation.js":
    /*!*****************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/resolution/instantiation.js ***!
      \*****************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   resolveInstance: () => (/* binding */ resolveInstance)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _utils_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/async */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/async.js");
    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    
    
    
    
    function _resolveRequests(childRequests, resolveRequest) {
        return childRequests.reduce(function (resolvedRequests, childRequest) {
            var injection = resolveRequest(childRequest);
            var targetType = childRequest.target.type;
            if (targetType === _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.TargetTypeEnum.ConstructorArgument) {
                resolvedRequests.constructorInjections.push(injection);
            }
            else {
                resolvedRequests.propertyRequests.push(childRequest);
                resolvedRequests.propertyInjections.push(injection);
            }
            if (!resolvedRequests.isAsync) {
                resolvedRequests.isAsync = (0,_utils_async__WEBPACK_IMPORTED_MODULE_1__.isPromiseOrContainsPromise)(injection);
            }
            return resolvedRequests;
        }, { constructorInjections: [], propertyInjections: [], propertyRequests: [], isAsync: false });
    }
    function _createInstance(constr, childRequests, resolveRequest) {
        var result;
        if (childRequests.length > 0) {
            var resolved = _resolveRequests(childRequests, resolveRequest);
            var createInstanceWithInjectionsArg = __assign(__assign({}, resolved), { constr: constr });
            if (resolved.isAsync) {
                result = createInstanceWithInjectionsAsync(createInstanceWithInjectionsArg);
            }
            else {
                result = createInstanceWithInjections(createInstanceWithInjectionsArg);
            }
        }
        else {
            result = new constr();
        }
        return result;
    }
    function createInstanceWithInjections(args) {
        var _a;
        var instance = new ((_a = args.constr).bind.apply(_a, __spreadArray([void 0], args.constructorInjections, false)))();
        args.propertyRequests.forEach(function (r, index) {
            var property = r.target.identifier;
            var injection = args.propertyInjections[index];
            instance[property] = injection;
        });
        return instance;
    }
    function createInstanceWithInjectionsAsync(args) {
        return __awaiter(this, void 0, void 0, function () {
            var constructorInjections, propertyInjections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, possiblyWaitInjections(args.constructorInjections)];
                    case 1:
                        constructorInjections = _a.sent();
                        return [4, possiblyWaitInjections(args.propertyInjections)];
                    case 2:
                        propertyInjections = _a.sent();
                        return [2, createInstanceWithInjections(__assign(__assign({}, args), { constructorInjections: constructorInjections, propertyInjections: propertyInjections }))];
                }
            });
        });
    }
    function possiblyWaitInjections(possiblePromiseinjections) {
        return __awaiter(this, void 0, void 0, function () {
            var injections, _i, possiblePromiseinjections_1, injection;
            return __generator(this, function (_a) {
                injections = [];
                for (_i = 0, possiblePromiseinjections_1 = possiblePromiseinjections; _i < possiblePromiseinjections_1.length; _i++) {
                    injection = possiblePromiseinjections_1[_i];
                    if (Array.isArray(injection)) {
                        injections.push(Promise.all(injection));
                    }
                    else {
                        injections.push(injection);
                    }
                }
                return [2, Promise.all(injections)];
            });
        });
    }
    function _getInstanceAfterPostConstruct(constr, result) {
        var postConstructResult = _postConstruct(constr, result);
        if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_1__.isPromise)(postConstructResult)) {
            return postConstructResult.then(function () { return result; });
        }
        else {
            return result;
        }
    }
    function _postConstruct(constr, instance) {
        var _a, _b;
        if (Reflect.hasMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.POST_CONSTRUCT, constr)) {
            var data = Reflect.getMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.POST_CONSTRUCT, constr);
            try {
                return (_b = (_a = instance)[data.value]) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
            catch (e) {
                throw new Error((0,_constants_error_msgs__WEBPACK_IMPORTED_MODULE_3__.POST_CONSTRUCT_ERROR)(constr.name, e.message));
            }
        }
    }
    function _validateInstanceResolution(binding, constr) {
        if (binding.scope !== _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton) {
            _throwIfHandlingDeactivation(binding, constr);
        }
    }
    function _throwIfHandlingDeactivation(binding, constr) {
        var scopeErrorMessage = "Class cannot be instantiated in " + (binding.scope === _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Request ?
            "request" :
            "transient") + " scope.";
        if (typeof binding.onDeactivation === "function") {
            throw new Error((0,_constants_error_msgs__WEBPACK_IMPORTED_MODULE_3__.ON_DEACTIVATION_ERROR)(constr.name, scopeErrorMessage));
        }
        if (Reflect.hasMetadata(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_2__.PRE_DESTROY, constr)) {
            throw new Error((0,_constants_error_msgs__WEBPACK_IMPORTED_MODULE_3__.PRE_DESTROY_ERROR)(constr.name, scopeErrorMessage));
        }
    }
    function resolveInstance(binding, constr, childRequests, resolveRequest) {
        _validateInstanceResolution(binding, constr);
        var result = _createInstance(constr, childRequests, resolveRequest);
        if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_1__.isPromise)(result)) {
            return result.then(function (resolvedResult) { return _getInstanceAfterPostConstruct(constr, resolvedResult); });
        }
        else {
            return _getInstanceAfterPostConstruct(constr, result);
        }
    }
    
    //# sourceMappingURL=instantiation.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/resolution/resolver.js":
    /*!************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/resolution/resolver.js ***!
      \************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   resolve: () => (/* binding */ resolve)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _planning_planner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../planning/planner */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/planner.js");
    /* harmony import */ var _scope_scope__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../scope/scope */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/scope/scope.js");
    /* harmony import */ var _utils_async__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/async */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/async.js");
    /* harmony import */ var _utils_binding_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/binding_utils */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/binding_utils.js");
    /* harmony import */ var _utils_exceptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/exceptions.js");
    /* harmony import */ var _instantiation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instantiation */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/resolution/instantiation.js");
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    
    
    
    
    
    
    
    
    var _resolveRequest = function (requestScope) {
        return function (request) {
            request.parentContext.setCurrentRequest(request);
            var bindings = request.bindings;
            var childRequests = request.childRequests;
            var targetIsAnArray = request.target && request.target.isArray();
            var targetParentIsNotAnArray = !request.parentRequest ||
                !request.parentRequest.target ||
                !request.target ||
                !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
            if (targetIsAnArray && targetParentIsNotAnArray) {
                return childRequests.map(function (childRequest) {
                    var _f = _resolveRequest(requestScope);
                    return _f(childRequest);
                });
            }
            else {
                if (request.target.isOptional() && bindings.length === 0) {
                    return undefined;
                }
                var binding = bindings[0];
                return _resolveBinding(requestScope, request, binding);
            }
        };
    };
    var _resolveFactoryFromBinding = function (binding, context) {
        var factoryDetails = (0,_utils_binding_utils__WEBPACK_IMPORTED_MODULE_0__.getFactoryDetails)(binding);
        return (0,_utils_exceptions__WEBPACK_IMPORTED_MODULE_1__.tryAndThrowErrorIfStackOverflow)(function () { return factoryDetails.factory.bind(binding)(context); }, function () { return new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryDetails.factoryType, context.currentRequest.serviceIdentifier.toString())); });
    };
    var _getResolvedFromBinding = function (requestScope, request, binding) {
        var result;
        var childRequests = request.childRequests;
        (0,_utils_binding_utils__WEBPACK_IMPORTED_MODULE_0__.ensureFullyBound)(binding);
        switch (binding.type) {
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__.BindingTypeEnum.ConstantValue:
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__.BindingTypeEnum.Function:
                result = binding.cache;
                break;
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__.BindingTypeEnum.Constructor:
                result = binding.implementationType;
                break;
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_3__.BindingTypeEnum.Instance:
                result = (0,_instantiation__WEBPACK_IMPORTED_MODULE_4__.resolveInstance)(binding, binding.implementationType, childRequests, _resolveRequest(requestScope));
                break;
            default:
                result = _resolveFactoryFromBinding(binding, request.parentContext);
        }
        return result;
    };
    var _resolveInScope = function (requestScope, binding, resolveFromBinding) {
        var result = (0,_scope_scope__WEBPACK_IMPORTED_MODULE_5__.tryGetFromScope)(requestScope, binding);
        if (result !== null) {
            return result;
        }
        result = resolveFromBinding();
        (0,_scope_scope__WEBPACK_IMPORTED_MODULE_5__.saveToScope)(requestScope, binding, result);
        return result;
    };
    var _resolveBinding = function (requestScope, request, binding) {
        return _resolveInScope(requestScope, binding, function () {
            var result = _getResolvedFromBinding(requestScope, request, binding);
            if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_6__.isPromise)(result)) {
                result = result.then(function (resolved) { return _onActivation(request, binding, resolved); });
            }
            else {
                result = _onActivation(request, binding, result);
            }
            return result;
        });
    };
    function _onActivation(request, binding, resolved) {
        var result = _bindingActivation(request.parentContext, binding, resolved);
        var containersIterator = _getContainersIterator(request.parentContext.container);
        var container;
        var containersIteratorResult = containersIterator.next();
        do {
            container = containersIteratorResult.value;
            var context_1 = request.parentContext;
            var serviceIdentifier = request.serviceIdentifier;
            var activationsIterator = _getContainerActivationsForService(container, serviceIdentifier);
            if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_6__.isPromise)(result)) {
                result = _activateContainerAsync(activationsIterator, context_1, result);
            }
            else {
                result = _activateContainer(activationsIterator, context_1, result);
            }
            containersIteratorResult = containersIterator.next();
        } while (containersIteratorResult.done !== true && !(0,_planning_planner__WEBPACK_IMPORTED_MODULE_7__.getBindingDictionary)(container).hasKey(request.serviceIdentifier));
        return result;
    }
    var _bindingActivation = function (context, binding, previousResult) {
        var result;
        if (typeof binding.onActivation === "function") {
            result = binding.onActivation(context, previousResult);
        }
        else {
            result = previousResult;
        }
        return result;
    };
    var _activateContainer = function (activationsIterator, context, result) {
        var activation = activationsIterator.next();
        while (!activation.done) {
            result = activation.value(context, result);
            if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_6__.isPromise)(result)) {
                return _activateContainerAsync(activationsIterator, context, result);
            }
            activation = activationsIterator.next();
        }
        return result;
    };
    var _activateContainerAsync = function (activationsIterator, context, resultPromise) { return __awaiter(void 0, void 0, void 0, function () {
        var result, activation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, resultPromise];
                case 1:
                    result = _a.sent();
                    activation = activationsIterator.next();
                    _a.label = 2;
                case 2:
                    if (!!activation.done) return [3, 4];
                    return [4, activation.value(context, result)];
                case 3:
                    result = _a.sent();
                    activation = activationsIterator.next();
                    return [3, 2];
                case 4: return [2, result];
            }
        });
    }); };
    var _getContainerActivationsForService = function (container, serviceIdentifier) {
        var activations = container._activations;
        return activations.hasKey(serviceIdentifier) ? activations.get(serviceIdentifier).values() : [].values();
    };
    var _getContainersIterator = function (container) {
        var containersStack = [container];
        var parent = container.parent;
        while (parent !== null) {
            containersStack.push(parent);
            parent = parent.parent;
        }
        var getNextContainer = function () {
            var nextContainer = containersStack.pop();
            if (nextContainer !== undefined) {
                return { done: false, value: nextContainer };
            }
            else {
                return { done: true, value: undefined };
            }
        };
        var containersIterator = {
            next: getNextContainer,
        };
        return containersIterator;
    };
    function resolve(context) {
        var _f = _resolveRequest(context.plan.rootRequest.requestScope);
        return _f(context.plan.rootRequest);
    }
    
    //# sourceMappingURL=resolver.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/scope/scope.js":
    /*!****************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/scope/scope.js ***!
      \****************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   saveToScope: () => (/* binding */ saveToScope),
    /* harmony export */   tryGetFromScope: () => (/* binding */ tryGetFromScope)
    /* harmony export */ });
    /* harmony import */ var _inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _utils_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/async */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/async.js");
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    
    
    var tryGetFromScope = function (requestScope, binding) {
        if ((binding.scope === _inversify__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton) && binding.activated) {
            return binding.cache;
        }
        if (binding.scope === _inversify__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Request &&
            requestScope.has(binding.id)) {
            return requestScope.get(binding.id);
        }
        return null;
    };
    var saveToScope = function (requestScope, binding, result) {
        if (binding.scope === _inversify__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton) {
            _saveToSingletonScope(binding, result);
        }
        if (binding.scope === _inversify__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Request) {
            _saveToRequestScope(requestScope, binding, result);
        }
    };
    var _saveToRequestScope = function (requestScope, binding, result) {
        if (!requestScope.has(binding.id)) {
            requestScope.set(binding.id, result);
        }
    };
    var _saveToSingletonScope = function (binding, result) {
        binding.cache = result;
        binding.activated = true;
        if ((0,_utils_async__WEBPACK_IMPORTED_MODULE_1__.isPromise)(result)) {
            void _saveAsyncResultToSingletonScope(binding, result);
        }
    };
    var _saveAsyncResultToSingletonScope = function (binding, asyncResult) { return __awaiter(void 0, void 0, void 0, function () {
        var result, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, asyncResult];
                case 1:
                    result = _a.sent();
                    binding.cache = result;
                    return [3, 3];
                case 2:
                    ex_1 = _a.sent();
                    binding.cache = null;
                    binding.activated = false;
                    throw ex_1;
                case 3: return [2];
            }
        });
    }); };
    //# sourceMappingURL=scope.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_in_syntax.js":
    /*!*****************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_in_syntax.js ***!
      \*****************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   BindingInSyntax: () => (/* binding */ BindingInSyntax)
    /* harmony export */ });
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_when_on_syntax.js");
    
    
    var BindingInSyntax = (function () {
        function BindingInSyntax(binding) {
            this._binding = binding;
        }
        BindingInSyntax.prototype.inRequestScope = function () {
            this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Request;
            return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingWhenOnSyntax(this._binding);
        };
        BindingInSyntax.prototype.inSingletonScope = function () {
            this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
            return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingWhenOnSyntax(this._binding);
        };
        BindingInSyntax.prototype.inTransientScope = function () {
            this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Transient;
            return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingWhenOnSyntax(this._binding);
        };
        return BindingInSyntax;
    }());
    
    //# sourceMappingURL=binding_in_syntax.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_in_when_on_syntax.js":
    /*!*************************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_in_when_on_syntax.js ***!
      \*************************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   BindingInWhenOnSyntax: () => (/* binding */ BindingInWhenOnSyntax)
    /* harmony export */ });
    /* harmony import */ var _binding_in_syntax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./binding_in_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_in_syntax.js");
    /* harmony import */ var _binding_on_syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_on_syntax.js");
    /* harmony import */ var _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_when_syntax.js");
    
    
    
    var BindingInWhenOnSyntax = (function () {
        function BindingInWhenOnSyntax(binding) {
            this._binding = binding;
            this._bindingWhenSyntax = new _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingWhenSyntax(this._binding);
            this._bindingOnSyntax = new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingOnSyntax(this._binding);
            this._bindingInSyntax = new _binding_in_syntax__WEBPACK_IMPORTED_MODULE_2__.BindingInSyntax(binding);
        }
        BindingInWhenOnSyntax.prototype.inRequestScope = function () {
            return this._bindingInSyntax.inRequestScope();
        };
        BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
            return this._bindingInSyntax.inSingletonScope();
        };
        BindingInWhenOnSyntax.prototype.inTransientScope = function () {
            return this._bindingInSyntax.inTransientScope();
        };
        BindingInWhenOnSyntax.prototype.when = function (constraint) {
            return this._bindingWhenSyntax.when(constraint);
        };
        BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
            return this._bindingWhenSyntax.whenTargetNamed(name);
        };
        BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
            return this._bindingWhenSyntax.whenTargetIsDefault();
        };
        BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenTargetTagged(tag, value);
        };
        BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
            return this._bindingWhenSyntax.whenInjectedInto(parent);
        };
        BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
            return this._bindingWhenSyntax.whenParentNamed(name);
        };
        BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenParentTagged(tag, value);
        };
        BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
            return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
        };
        BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
            return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
        };
        BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
            return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
        };
        BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
        };
        BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
            return this._bindingWhenSyntax.whenNoAncestorNamed(name);
        };
        BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
        };
        BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
            return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
        };
        BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
            return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
        };
        BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
            return this._bindingOnSyntax.onActivation(handler);
        };
        BindingInWhenOnSyntax.prototype.onDeactivation = function (handler) {
            return this._bindingOnSyntax.onDeactivation(handler);
        };
        return BindingInWhenOnSyntax;
    }());
    
    //# sourceMappingURL=binding_in_when_on_syntax.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_on_syntax.js":
    /*!*****************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_on_syntax.js ***!
      \*****************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   BindingOnSyntax: () => (/* binding */ BindingOnSyntax)
    /* harmony export */ });
    /* harmony import */ var _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_when_syntax.js");
    
    var BindingOnSyntax = (function () {
        function BindingOnSyntax(binding) {
            this._binding = binding;
        }
        BindingOnSyntax.prototype.onActivation = function (handler) {
            this._binding.onActivation = handler;
            return new _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingWhenSyntax(this._binding);
        };
        BindingOnSyntax.prototype.onDeactivation = function (handler) {
            this._binding.onDeactivation = handler;
            return new _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingWhenSyntax(this._binding);
        };
        return BindingOnSyntax;
    }());
    
    //# sourceMappingURL=binding_on_syntax.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_to_syntax.js":
    /*!*****************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_to_syntax.js ***!
      \*****************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   BindingToSyntax: () => (/* binding */ BindingToSyntax)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _binding_in_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding_in_when_on_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_in_when_on_syntax.js");
    /* harmony import */ var _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_when_on_syntax.js");
    
    
    
    
    var BindingToSyntax = (function () {
        function BindingToSyntax(binding) {
            this._binding = binding;
        }
        BindingToSyntax.prototype.to = function (constructor) {
            this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Instance;
            this._binding.implementationType = constructor;
            return new _binding_in_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingInWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toSelf = function () {
            if (typeof this._binding.serviceIdentifier !== "function") {
                throw new Error("" + _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.INVALID_TO_SELF_VALUE);
            }
            var self = this._binding.serviceIdentifier;
            return this.to(self);
        };
        BindingToSyntax.prototype.toConstantValue = function (value) {
            this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.ConstantValue;
            this._binding.cache = value;
            this._binding.dynamicValue = null;
            this._binding.implementationType = null;
            this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
            return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toDynamicValue = function (func) {
            this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.DynamicValue;
            this._binding.cache = null;
            this._binding.dynamicValue = func;
            this._binding.implementationType = null;
            return new _binding_in_when_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingInWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toConstructor = function (constructor) {
            this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Constructor;
            this._binding.implementationType = constructor;
            this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
            return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toFactory = function (factory) {
            this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory;
            this._binding.factory = factory;
            this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
            return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toFunction = function (func) {
            if (typeof func !== "function") {
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.INVALID_FUNCTION_BINDING);
            }
            var bindingWhenOnSyntax = this.toConstantValue(func);
            this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Function;
            this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
            return bindingWhenOnSyntax;
        };
        BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
            this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory;
            this._binding.factory = function (context) {
                var autofactory = function () { return context.container.get(serviceIdentifier); };
                return autofactory;
            };
            this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
            return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toAutoNamedFactory = function (serviceIdentifier) {
            this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory;
            this._binding.factory = function (context) {
                return function (named) { return context.container.getNamed(serviceIdentifier, named); };
            };
            return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toProvider = function (provider) {
            this._binding.type = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Provider;
            this._binding.provider = provider;
            this._binding.scope = _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingScopeEnum.Singleton;
            return new _binding_when_on_syntax__WEBPACK_IMPORTED_MODULE_3__.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax.prototype.toService = function (service) {
            this.toDynamicValue(function (context) { return context.container.get(service); });
        };
        return BindingToSyntax;
    }());
    
    //# sourceMappingURL=binding_to_syntax.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_when_on_syntax.js":
    /*!**********************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_when_on_syntax.js ***!
      \**********************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   BindingWhenOnSyntax: () => (/* binding */ BindingWhenOnSyntax)
    /* harmony export */ });
    /* harmony import */ var _binding_on_syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_on_syntax.js");
    /* harmony import */ var _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_when_syntax.js");
    
    
    var BindingWhenOnSyntax = (function () {
        function BindingWhenOnSyntax(binding) {
            this._binding = binding;
            this._bindingWhenSyntax = new _binding_when_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingWhenSyntax(this._binding);
            this._bindingOnSyntax = new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_1__.BindingOnSyntax(this._binding);
        }
        BindingWhenOnSyntax.prototype.when = function (constraint) {
            return this._bindingWhenSyntax.when(constraint);
        };
        BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
            return this._bindingWhenSyntax.whenTargetNamed(name);
        };
        BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
            return this._bindingWhenSyntax.whenTargetIsDefault();
        };
        BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenTargetTagged(tag, value);
        };
        BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
            return this._bindingWhenSyntax.whenInjectedInto(parent);
        };
        BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
            return this._bindingWhenSyntax.whenParentNamed(name);
        };
        BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenParentTagged(tag, value);
        };
        BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
            return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
        };
        BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
            return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
        };
        BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
            return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
        };
        BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
        };
        BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
            return this._bindingWhenSyntax.whenNoAncestorNamed(name);
        };
        BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
            return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
        };
        BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
            return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
        };
        BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
            return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
        };
        BindingWhenOnSyntax.prototype.onActivation = function (handler) {
            return this._bindingOnSyntax.onActivation(handler);
        };
        BindingWhenOnSyntax.prototype.onDeactivation = function (handler) {
            return this._bindingOnSyntax.onDeactivation(handler);
        };
        return BindingWhenOnSyntax;
    }());
    
    //# sourceMappingURL=binding_when_on_syntax.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_when_syntax.js":
    /*!*******************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_when_syntax.js ***!
      \*******************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   BindingWhenSyntax: () => (/* binding */ BindingWhenSyntax)
    /* harmony export */ });
    /* harmony import */ var _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/binding_on_syntax.js");
    /* harmony import */ var _constraint_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constraint_helpers */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/constraint_helpers.js");
    
    
    var BindingWhenSyntax = (function () {
        function BindingWhenSyntax(binding) {
            this._binding = binding;
        }
        BindingWhenSyntax.prototype.when = function (constraint) {
            this._binding.constraint = constraint;
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
            this._binding.constraint = (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.namedConstraint)(name);
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
            this._binding.constraint = function (request) {
                if (request === null) {
                    return false;
                }
                var targetIsDefault = (request.target !== null) &&
                    (!request.target.isNamed()) &&
                    (!request.target.isTagged());
                return targetIsDefault;
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
            this._binding.constraint = (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.taggedConstraint)(tag)(value);
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
            this._binding.constraint = function (request) {
                return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.typeConstraint)(parent)(request.parentRequest);
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenParentNamed = function (name) {
            this._binding.constraint = function (request) {
                return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.namedConstraint)(name)(request.parentRequest);
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
            this._binding.constraint = function (request) {
                return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.taggedConstraint)(tag)(value)(request.parentRequest);
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
            this._binding.constraint = function (request) {
                return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.typeConstraint)(ancestor));
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
            this._binding.constraint = function (request) {
                return request !== null && !(0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.typeConstraint)(ancestor));
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
            this._binding.constraint = function (request) {
                return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.namedConstraint)(name));
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
            this._binding.constraint = function (request) {
                return request !== null && !(0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.namedConstraint)(name));
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
            this._binding.constraint = function (request) {
                return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.taggedConstraint)(tag)(value));
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
            this._binding.constraint = function (request) {
                return request !== null && !(0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.taggedConstraint)(tag)(value));
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
            this._binding.constraint = function (request) {
                return request !== null && (0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, constraint);
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
            this._binding.constraint = function (request) {
                return request !== null && !(0,_constraint_helpers__WEBPACK_IMPORTED_MODULE_1__.traverseAncerstors)(request, constraint);
            };
            return new _binding_on_syntax__WEBPACK_IMPORTED_MODULE_0__.BindingOnSyntax(this._binding);
        };
        return BindingWhenSyntax;
    }());
    
    //# sourceMappingURL=binding_when_syntax.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/constraint_helpers.js":
    /*!******************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/syntax/constraint_helpers.js ***!
      \******************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   namedConstraint: () => (/* binding */ namedConstraint),
    /* harmony export */   taggedConstraint: () => (/* binding */ taggedConstraint),
    /* harmony export */   traverseAncerstors: () => (/* binding */ traverseAncerstors),
    /* harmony export */   typeConstraint: () => (/* binding */ typeConstraint)
    /* harmony export */ });
    /* harmony import */ var _constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/metadata_keys.js");
    /* harmony import */ var _planning_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../planning/metadata */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/planning/metadata.js");
    
    
    var traverseAncerstors = function (request, constraint) {
        var parent = request.parentRequest;
        if (parent !== null) {
            return constraint(parent) ? true : traverseAncerstors(parent, constraint);
        }
        else {
            return false;
        }
    };
    var taggedConstraint = function (key) { return function (value) {
        var constraint = function (request) {
            return request !== null && request.target !== null && request.target.matchesTag(key)(value);
        };
        constraint.metaData = new _planning_metadata__WEBPACK_IMPORTED_MODULE_0__.Metadata(key, value);
        return constraint;
    }; };
    var namedConstraint = taggedConstraint(_constants_metadata_keys__WEBPACK_IMPORTED_MODULE_1__.NAMED_TAG);
    var typeConstraint = function (type) { return function (request) {
        var binding = null;
        if (request !== null) {
            binding = request.bindings[0];
            if (typeof type === "string") {
                var serviceIdentifier = binding.serviceIdentifier;
                return serviceIdentifier === type;
            }
            else {
                var constructor = request.bindings[0].implementationType;
                return type === constructor;
            }
        }
        return false;
    }; };
    
    //# sourceMappingURL=constraint_helpers.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/async.js":
    /*!****************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/async.js ***!
      \****************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   isPromise: () => (/* binding */ isPromise),
    /* harmony export */   isPromiseOrContainsPromise: () => (/* binding */ isPromiseOrContainsPromise)
    /* harmony export */ });
    function isPromise(object) {
        var isObjectOrFunction = (typeof object === 'object' && object !== null) || typeof object === 'function';
        return isObjectOrFunction && typeof object.then === "function";
    }
    function isPromiseOrContainsPromise(object) {
        if (isPromise(object)) {
            return true;
        }
        return Array.isArray(object) && object.some(isPromise);
    }
    
    //# sourceMappingURL=async.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/binding_utils.js":
    /*!************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/binding_utils.js ***!
      \************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   ensureFullyBound: () => (/* binding */ ensureFullyBound),
    /* harmony export */   getFactoryDetails: () => (/* binding */ getFactoryDetails),
    /* harmony export */   multiBindToService: () => (/* binding */ multiBindToService)
    /* harmony export */ });
    /* harmony import */ var _inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../inversify */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/serialization.js");
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    /* harmony import */ var _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/literal_types.js");
    /* harmony import */ var _factory_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factory_type */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/factory_type.js");
    
    
    
    
    var multiBindToService = function (container) {
        return function (service) {
            return function () {
                var types = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    types[_i] = arguments[_i];
                }
                return types.forEach(function (t) { return container.bind(t).toService(service); });
            };
        };
    };
    var ensureFullyBound = function (binding) {
        var boundValue = null;
        switch (binding.type) {
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.ConstantValue:
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Function:
                boundValue = binding.cache;
                break;
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Constructor:
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Instance:
                boundValue = binding.implementationType;
                break;
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.DynamicValue:
                boundValue = binding.dynamicValue;
                break;
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Provider:
                boundValue = binding.provider;
                break;
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory:
                boundValue = binding.factory;
                break;
        }
        if (boundValue === null) {
            var serviceIdentifierAsString = (0,_inversify__WEBPACK_IMPORTED_MODULE_1__.getServiceIdentifierAsString)(binding.serviceIdentifier);
            throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_2__.INVALID_BINDING_TYPE + " " + serviceIdentifierAsString);
        }
    };
    var getFactoryDetails = function (binding) {
        switch (binding.type) {
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Factory:
                return { factory: binding.factory, factoryType: _factory_type__WEBPACK_IMPORTED_MODULE_3__.FactoryType.Factory };
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.Provider:
                return { factory: binding.provider, factoryType: _factory_type__WEBPACK_IMPORTED_MODULE_3__.FactoryType.Provider };
            case _constants_literal_types__WEBPACK_IMPORTED_MODULE_0__.BindingTypeEnum.DynamicValue:
                return { factory: binding.dynamicValue, factoryType: _factory_type__WEBPACK_IMPORTED_MODULE_3__.FactoryType.DynamicValue };
            default:
                throw new Error("Unexpected factory type " + binding.type);
        }
    };
    //# sourceMappingURL=binding_utils.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/clonable.js":
    /*!*******************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/clonable.js ***!
      \*******************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   isClonable: () => (/* binding */ isClonable)
    /* harmony export */ });
    function isClonable(obj) {
        return (typeof obj === 'object')
            && (obj !== null)
            && ('clone' in obj)
            && typeof obj.clone === 'function';
    }
    
    //# sourceMappingURL=clonable.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/exceptions.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/exceptions.js ***!
      \*********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   isStackOverflowExeption: () => (/* binding */ isStackOverflowExeption),
    /* harmony export */   tryAndThrowErrorIfStackOverflow: () => (/* binding */ tryAndThrowErrorIfStackOverflow)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    
    function isStackOverflowExeption(error) {
        return (error instanceof RangeError ||
            error.message === _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.STACK_OVERFLOW);
    }
    var tryAndThrowErrorIfStackOverflow = function (fn, errorCallback) {
        try {
            return fn();
        }
        catch (error) {
            if (isStackOverflowExeption(error)) {
                error = errorCallback();
            }
            throw error;
        }
    };
    //# sourceMappingURL=exceptions.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/factory_type.js":
    /*!***********************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/factory_type.js ***!
      \***********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   FactoryType: () => (/* binding */ FactoryType)
    /* harmony export */ });
    var FactoryType;
    (function (FactoryType) {
        FactoryType["DynamicValue"] = "toDynamicValue";
        FactoryType["Factory"] = "toFactory";
        FactoryType["Provider"] = "toProvider";
    })(FactoryType || (FactoryType = {}));
    //# sourceMappingURL=factory_type.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/id.js":
    /*!*************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/id.js ***!
      \*************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   id: () => (/* binding */ id)
    /* harmony export */ });
    var idCounter = 0;
    function id() {
        return idCounter++;
    }
    
    //# sourceMappingURL=id.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/js.js":
    /*!*************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/js.js ***!
      \*************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   getFirstArrayDuplicate: () => (/* binding */ getFirstArrayDuplicate)
    /* harmony export */ });
    function getFirstArrayDuplicate(array) {
        var seenValues = new Set();
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var entry = array_1[_i];
            if (seenValues.has(entry)) {
                return entry;
            }
            else {
                seenValues.add(entry);
            }
        }
        return undefined;
    }
    //# sourceMappingURL=js.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/serialization.js":
    /*!************************************************************************************************!*\
      !*** ./node_modules/@sugardev/json-extractor/node_modules/inversify/es/utils/serialization.js ***!
      \************************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   circularDependencyToException: () => (/* binding */ circularDependencyToException),
    /* harmony export */   getFunctionName: () => (/* binding */ getFunctionName),
    /* harmony export */   getServiceIdentifierAsString: () => (/* binding */ getServiceIdentifierAsString),
    /* harmony export */   getSymbolDescription: () => (/* binding */ getSymbolDescription),
    /* harmony export */   listMetadataForTarget: () => (/* binding */ listMetadataForTarget),
    /* harmony export */   listRegisteredBindingsForServiceIdentifier: () => (/* binding */ listRegisteredBindingsForServiceIdentifier)
    /* harmony export */ });
    /* harmony import */ var _constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/@sugardev/json-extractor/node_modules/inversify/es/constants/error_msgs.js");
    
    function getServiceIdentifierAsString(serviceIdentifier) {
        if (typeof serviceIdentifier === "function") {
            var _serviceIdentifier = serviceIdentifier;
            return _serviceIdentifier.name;
        }
        else if (typeof serviceIdentifier === "symbol") {
            return serviceIdentifier.toString();
        }
        else {
            var _serviceIdentifier = serviceIdentifier;
            return _serviceIdentifier;
        }
    }
    function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
        var registeredBindingsList = "";
        var registeredBindings = getBindings(container, serviceIdentifier);
        if (registeredBindings.length !== 0) {
            registeredBindingsList = "\nRegistered bindings:";
            registeredBindings.forEach(function (binding) {
                var name = "Object";
                if (binding.implementationType !== null) {
                    name = getFunctionName(binding.implementationType);
                }
                registeredBindingsList = registeredBindingsList + "\n " + name;
                if (binding.constraint.metaData) {
                    registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
                }
            });
        }
        return registeredBindingsList;
    }
    function alreadyDependencyChain(request, serviceIdentifier) {
        if (request.parentRequest === null) {
            return false;
        }
        else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
            return true;
        }
        else {
            return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
        }
    }
    function dependencyChainToString(request) {
        function _createStringArr(req, result) {
            if (result === void 0) { result = []; }
            var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
            result.push(serviceIdentifier);
            if (req.parentRequest !== null) {
                return _createStringArr(req.parentRequest, result);
            }
            return result;
        }
        var stringArr = _createStringArr(request);
        return stringArr.reverse().join(" --> ");
    }
    function circularDependencyToException(request) {
        request.childRequests.forEach(function (childRequest) {
            if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
                var services = dependencyChainToString(childRequest);
                throw new Error(_constants_error_msgs__WEBPACK_IMPORTED_MODULE_0__.CIRCULAR_DEPENDENCY + " " + services);
            }
            else {
                circularDependencyToException(childRequest);
            }
        });
    }
    function listMetadataForTarget(serviceIdentifierString, target) {
        if (target.isTagged() || target.isNamed()) {
            var m_1 = "";
            var namedTag = target.getNamedTag();
            var otherTags = target.getCustomTags();
            if (namedTag !== null) {
                m_1 += namedTag.toString() + "\n";
            }
            if (otherTags !== null) {
                otherTags.forEach(function (tag) {
                    m_1 += tag.toString() + "\n";
                });
            }
            return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
        }
        else {
            return " " + serviceIdentifierString;
        }
    }
    function getFunctionName(func) {
        if (func.name) {
            return func.name;
        }
        else {
            var name_1 = func.toString();
            var match = name_1.match(/^function\s*([^\s(]+)/);
            return match ? match[1] : "Anonymous function: " + name_1;
        }
    }
    function getSymbolDescription(symbol) {
        return symbol.toString().slice(7, -1);
    }
    
    //# sourceMappingURL=serialization.js.map
    
    /***/ }),
    
    /***/ "./node_modules/reflect-metadata/Reflect.js":
    /*!**************************************************!*\
      !*** ./node_modules/reflect-metadata/Reflect.js ***!
      \**************************************************/
    /***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
    
    /*! *****************************************************************************
    Copyright (C) Microsoft. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
    
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
    
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var Reflect;
    (function (Reflect) {
        // Metadata Proposal
        // https://rbuckton.github.io/reflect-metadata/
        (function (factory) {
            var root = typeof __webpack_require__.g === "object" ? __webpack_require__.g :
                typeof self === "object" ? self :
                    typeof this === "object" ? this :
                        Function("return this;")();
            var exporter = makeExporter(Reflect);
            if (typeof root.Reflect === "undefined") {
                root.Reflect = Reflect;
            }
            else {
                exporter = makeExporter(root.Reflect, exporter);
            }
            factory(exporter);
            function makeExporter(target, previous) {
                return function (key, value) {
                    if (typeof target[key] !== "function") {
                        Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                    }
                    if (previous)
                        previous(key, value);
                };
            }
        })(function (exporter) {
            var hasOwn = Object.prototype.hasOwnProperty;
            // feature test for Symbol support
            var supportsSymbol = typeof Symbol === "function";
            var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
            var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
            var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
            var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
            var downLevel = !supportsCreate && !supportsProto;
            var HashMap = {
                // create an object in dictionary mode (a.k.a. "slow" mode in v8)
                create: supportsCreate
                    ? function () { return MakeDictionary(Object.create(null)); }
                    : supportsProto
                        ? function () { return MakeDictionary({ __proto__: null }); }
                        : function () { return MakeDictionary({}); },
                has: downLevel
                    ? function (map, key) { return hasOwn.call(map, key); }
                    : function (map, key) { return key in map; },
                get: downLevel
                    ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                    : function (map, key) { return map[key]; },
            };
            // Load global or shim versions of Map, Set, and WeakMap
            var functionPrototype = Object.getPrototypeOf(Function);
            var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
            var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
            var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
            var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
            // [[Metadata]] internal slot
            // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
            var Metadata = new _WeakMap();
            /**
             * Applies a set of decorators to a property of a target object.
             * @param decorators An array of decorators.
             * @param target The target object.
             * @param propertyKey (Optional) The property key to decorate.
             * @param attributes (Optional) The property descriptor for the target key.
             * @remarks Decorators are applied in reverse order.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     Example = Reflect.decorate(decoratorsArray, Example);
             *
             *     // property (on constructor)
             *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
             *
             *     // property (on prototype)
             *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
             *
             *     // method (on constructor)
             *     Object.defineProperty(Example, "staticMethod",
             *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
             *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
             *
             *     // method (on prototype)
             *     Object.defineProperty(Example.prototype, "method",
             *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
             *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
             *
             */
            function decorate(decorators, target, propertyKey, attributes) {
                if (!IsUndefined(propertyKey)) {
                    if (!IsArray(decorators))
                        throw new TypeError();
                    if (!IsObject(target))
                        throw new TypeError();
                    if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                        throw new TypeError();
                    if (IsNull(attributes))
                        attributes = undefined;
                    propertyKey = ToPropertyKey(propertyKey);
                    return DecorateProperty(decorators, target, propertyKey, attributes);
                }
                else {
                    if (!IsArray(decorators))
                        throw new TypeError();
                    if (!IsConstructor(target))
                        throw new TypeError();
                    return DecorateConstructor(decorators, target);
                }
            }
            exporter("decorate", decorate);
            // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
            // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
            /**
             * A default metadata decorator factory that can be used on a class, class member, or parameter.
             * @param metadataKey The key for the metadata entry.
             * @param metadataValue The value for the metadata entry.
             * @returns A decorator function.
             * @remarks
             * If `metadataKey` is already defined for the target and target key, the
             * metadataValue for that key will be overwritten.
             * @example
             *
             *     // constructor
             *     @Reflect.metadata(key, value)
             *     class Example {
             *     }
             *
             *     // property (on constructor, TypeScript only)
             *     class Example {
             *         @Reflect.metadata(key, value)
             *         static staticProperty;
             *     }
             *
             *     // property (on prototype, TypeScript only)
             *     class Example {
             *         @Reflect.metadata(key, value)
             *         property;
             *     }
             *
             *     // method (on constructor)
             *     class Example {
             *         @Reflect.metadata(key, value)
             *         static staticMethod() { }
             *     }
             *
             *     // method (on prototype)
             *     class Example {
             *         @Reflect.metadata(key, value)
             *         method() { }
             *     }
             *
             */
            function metadata(metadataKey, metadataValue) {
                function decorator(target, propertyKey) {
                    if (!IsObject(target))
                        throw new TypeError();
                    if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                        throw new TypeError();
                    OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
                }
                return decorator;
            }
            exporter("metadata", metadata);
            /**
             * Define a unique metadata entry on the target.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param metadataValue A value that contains attached metadata.
             * @param target The target object on which to define metadata.
             * @param propertyKey (Optional) The property key for the target.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     Reflect.defineMetadata("custom:annotation", options, Example);
             *
             *     // property (on constructor)
             *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
             *
             *     // property (on prototype)
             *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
             *
             *     // method (on constructor)
             *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
             *
             *     // method (on prototype)
             *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
             *
             *     // decorator factory as metadata-producing annotation.
             *     function MyAnnotation(options): Decorator {
             *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
             *     }
             *
             */
            function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            exporter("defineMetadata", defineMetadata);
            /**
             * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.hasMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function hasMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryHasMetadata(metadataKey, target, propertyKey);
            }
            exporter("hasMetadata", hasMetadata);
            /**
             * Gets a value indicating whether the target object has the provided metadata key defined.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function hasOwnMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
            }
            exporter("hasOwnMetadata", hasOwnMetadata);
            /**
             * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.getMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function getMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryGetMetadata(metadataKey, target, propertyKey);
            }
            exporter("getMetadata", getMetadata);
            /**
             * Gets the metadata value for the provided metadata key on the target object.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.getOwnMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function getOwnMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
            }
            exporter("getOwnMetadata", getOwnMetadata);
            /**
             * Gets the metadata keys defined on the target object or its prototype chain.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns An array of unique metadata keys.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.getMetadataKeys(Example);
             *
             *     // property (on constructor)
             *     result = Reflect.getMetadataKeys(Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.getMetadataKeys(Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.getMetadataKeys(Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.getMetadataKeys(Example.prototype, "method");
             *
             */
            function getMetadataKeys(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryMetadataKeys(target, propertyKey);
            }
            exporter("getMetadataKeys", getMetadataKeys);
            /**
             * Gets the unique metadata keys defined on the target object.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns An array of unique metadata keys.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.getOwnMetadataKeys(Example);
             *
             *     // property (on constructor)
             *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
             *
             */
            function getOwnMetadataKeys(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryOwnMetadataKeys(target, propertyKey);
            }
            exporter("getOwnMetadataKeys", getOwnMetadataKeys);
            /**
             * Deletes the metadata entry from the target object with the provided key.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns `true` if the metadata entry was found and deleted; otherwise, false.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.deleteMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function deleteMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
                if (IsUndefined(metadataMap))
                    return false;
                if (!metadataMap.delete(metadataKey))
                    return false;
                if (metadataMap.size > 0)
                    return true;
                var targetMetadata = Metadata.get(target);
                targetMetadata.delete(propertyKey);
                if (targetMetadata.size > 0)
                    return true;
                Metadata.delete(target);
                return true;
            }
            exporter("deleteMetadata", deleteMetadata);
            function DecorateConstructor(decorators, target) {
                for (var i = decorators.length - 1; i >= 0; --i) {
                    var decorator = decorators[i];
                    var decorated = decorator(target);
                    if (!IsUndefined(decorated) && !IsNull(decorated)) {
                        if (!IsConstructor(decorated))
                            throw new TypeError();
                        target = decorated;
                    }
                }
                return target;
            }
            function DecorateProperty(decorators, target, propertyKey, descriptor) {
                for (var i = decorators.length - 1; i >= 0; --i) {
                    var decorator = decorators[i];
                    var decorated = decorator(target, propertyKey, descriptor);
                    if (!IsUndefined(decorated) && !IsNull(decorated)) {
                        if (!IsObject(decorated))
                            throw new TypeError();
                        descriptor = decorated;
                    }
                }
                return descriptor;
            }
            function GetOrCreateMetadataMap(O, P, Create) {
                var targetMetadata = Metadata.get(O);
                if (IsUndefined(targetMetadata)) {
                    if (!Create)
                        return undefined;
                    targetMetadata = new _Map();
                    Metadata.set(O, targetMetadata);
                }
                var metadataMap = targetMetadata.get(P);
                if (IsUndefined(metadataMap)) {
                    if (!Create)
                        return undefined;
                    metadataMap = new _Map();
                    targetMetadata.set(P, metadataMap);
                }
                return metadataMap;
            }
            // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
            function OrdinaryHasMetadata(MetadataKey, O, P) {
                var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
                if (hasOwn)
                    return true;
                var parent = OrdinaryGetPrototypeOf(O);
                if (!IsNull(parent))
                    return OrdinaryHasMetadata(MetadataKey, parent, P);
                return false;
            }
            // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
            function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap))
                    return false;
                return ToBoolean(metadataMap.has(MetadataKey));
            }
            // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
            function OrdinaryGetMetadata(MetadataKey, O, P) {
                var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
                if (hasOwn)
                    return OrdinaryGetOwnMetadata(MetadataKey, O, P);
                var parent = OrdinaryGetPrototypeOf(O);
                if (!IsNull(parent))
                    return OrdinaryGetMetadata(MetadataKey, parent, P);
                return undefined;
            }
            // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
            function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap))
                    return undefined;
                return metadataMap.get(MetadataKey);
            }
            // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
            function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
                metadataMap.set(MetadataKey, MetadataValue);
            }
            // 3.1.6.1 OrdinaryMetadataKeys(O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
            function OrdinaryMetadataKeys(O, P) {
                var ownKeys = OrdinaryOwnMetadataKeys(O, P);
                var parent = OrdinaryGetPrototypeOf(O);
                if (parent === null)
                    return ownKeys;
                var parentKeys = OrdinaryMetadataKeys(parent, P);
                if (parentKeys.length <= 0)
                    return ownKeys;
                if (ownKeys.length <= 0)
                    return parentKeys;
                var set = new _Set();
                var keys = [];
                for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                    var key = ownKeys_1[_i];
                    var hasKey = set.has(key);
                    if (!hasKey) {
                        set.add(key);
                        keys.push(key);
                    }
                }
                for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                    var key = parentKeys_1[_a];
                    var hasKey = set.has(key);
                    if (!hasKey) {
                        set.add(key);
                        keys.push(key);
                    }
                }
                return keys;
            }
            // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
            function OrdinaryOwnMetadataKeys(O, P) {
                var keys = [];
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap))
                    return keys;
                var keysObj = metadataMap.keys();
                var iterator = GetIterator(keysObj);
                var k = 0;
                while (true) {
                    var next = IteratorStep(iterator);
                    if (!next) {
                        keys.length = k;
                        return keys;
                    }
                    var nextValue = IteratorValue(next);
                    try {
                        keys[k] = nextValue;
                    }
                    catch (e) {
                        try {
                            IteratorClose(iterator);
                        }
                        finally {
                            throw e;
                        }
                    }
                    k++;
                }
            }
            // 6 ECMAScript Data Typ0es and Values
            // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
            function Type(x) {
                if (x === null)
                    return 1 /* Null */;
                switch (typeof x) {
                    case "undefined": return 0 /* Undefined */;
                    case "boolean": return 2 /* Boolean */;
                    case "string": return 3 /* String */;
                    case "symbol": return 4 /* Symbol */;
                    case "number": return 5 /* Number */;
                    case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                    default: return 6 /* Object */;
                }
            }
            // 6.1.1 The Undefined Type
            // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
            function IsUndefined(x) {
                return x === undefined;
            }
            // 6.1.2 The Null Type
            // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
            function IsNull(x) {
                return x === null;
            }
            // 6.1.5 The Symbol Type
            // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
            function IsSymbol(x) {
                return typeof x === "symbol";
            }
            // 6.1.7 The Object Type
            // https://tc39.github.io/ecma262/#sec-object-type
            function IsObject(x) {
                return typeof x === "object" ? x !== null : typeof x === "function";
            }
            // 7.1 Type Conversion
            // https://tc39.github.io/ecma262/#sec-type-conversion
            // 7.1.1 ToPrimitive(input [, PreferredType])
            // https://tc39.github.io/ecma262/#sec-toprimitive
            function ToPrimitive(input, PreferredType) {
                switch (Type(input)) {
                    case 0 /* Undefined */: return input;
                    case 1 /* Null */: return input;
                    case 2 /* Boolean */: return input;
                    case 3 /* String */: return input;
                    case 4 /* Symbol */: return input;
                    case 5 /* Number */: return input;
                }
                var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
                var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
                if (exoticToPrim !== undefined) {
                    var result = exoticToPrim.call(input, hint);
                    if (IsObject(result))
                        throw new TypeError();
                    return result;
                }
                return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
            }
            // 7.1.1.1 OrdinaryToPrimitive(O, hint)
            // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
            function OrdinaryToPrimitive(O, hint) {
                if (hint === "string") {
                    var toString_1 = O.toString;
                    if (IsCallable(toString_1)) {
                        var result = toString_1.call(O);
                        if (!IsObject(result))
                            return result;
                    }
                    var valueOf = O.valueOf;
                    if (IsCallable(valueOf)) {
                        var result = valueOf.call(O);
                        if (!IsObject(result))
                            return result;
                    }
                }
                else {
                    var valueOf = O.valueOf;
                    if (IsCallable(valueOf)) {
                        var result = valueOf.call(O);
                        if (!IsObject(result))
                            return result;
                    }
                    var toString_2 = O.toString;
                    if (IsCallable(toString_2)) {
                        var result = toString_2.call(O);
                        if (!IsObject(result))
                            return result;
                    }
                }
                throw new TypeError();
            }
            // 7.1.2 ToBoolean(argument)
            // https://tc39.github.io/ecma262/2016/#sec-toboolean
            function ToBoolean(argument) {
                return !!argument;
            }
            // 7.1.12 ToString(argument)
            // https://tc39.github.io/ecma262/#sec-tostring
            function ToString(argument) {
                return "" + argument;
            }
            // 7.1.14 ToPropertyKey(argument)
            // https://tc39.github.io/ecma262/#sec-topropertykey
            function ToPropertyKey(argument) {
                var key = ToPrimitive(argument, 3 /* String */);
                if (IsSymbol(key))
                    return key;
                return ToString(key);
            }
            // 7.2 Testing and Comparison Operations
            // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
            // 7.2.2 IsArray(argument)
            // https://tc39.github.io/ecma262/#sec-isarray
            function IsArray(argument) {
                return Array.isArray
                    ? Array.isArray(argument)
                    : argument instanceof Object
                        ? argument instanceof Array
                        : Object.prototype.toString.call(argument) === "[object Array]";
            }
            // 7.2.3 IsCallable(argument)
            // https://tc39.github.io/ecma262/#sec-iscallable
            function IsCallable(argument) {
                // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
                return typeof argument === "function";
            }
            // 7.2.4 IsConstructor(argument)
            // https://tc39.github.io/ecma262/#sec-isconstructor
            function IsConstructor(argument) {
                // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
                return typeof argument === "function";
            }
            // 7.2.7 IsPropertyKey(argument)
            // https://tc39.github.io/ecma262/#sec-ispropertykey
            function IsPropertyKey(argument) {
                switch (Type(argument)) {
                    case 3 /* String */: return true;
                    case 4 /* Symbol */: return true;
                    default: return false;
                }
            }
            // 7.3 Operations on Objects
            // https://tc39.github.io/ecma262/#sec-operations-on-objects
            // 7.3.9 GetMethod(V, P)
            // https://tc39.github.io/ecma262/#sec-getmethod
            function GetMethod(V, P) {
                var func = V[P];
                if (func === undefined || func === null)
                    return undefined;
                if (!IsCallable(func))
                    throw new TypeError();
                return func;
            }
            // 7.4 Operations on Iterator Objects
            // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
            function GetIterator(obj) {
                var method = GetMethod(obj, iteratorSymbol);
                if (!IsCallable(method))
                    throw new TypeError(); // from Call
                var iterator = method.call(obj);
                if (!IsObject(iterator))
                    throw new TypeError();
                return iterator;
            }
            // 7.4.4 IteratorValue(iterResult)
            // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
            function IteratorValue(iterResult) {
                return iterResult.value;
            }
            // 7.4.5 IteratorStep(iterator)
            // https://tc39.github.io/ecma262/#sec-iteratorstep
            function IteratorStep(iterator) {
                var result = iterator.next();
                return result.done ? false : result;
            }
            // 7.4.6 IteratorClose(iterator, completion)
            // https://tc39.github.io/ecma262/#sec-iteratorclose
            function IteratorClose(iterator) {
                var f = iterator["return"];
                if (f)
                    f.call(iterator);
            }
            // 9.1 Ordinary Object Internal Methods and Internal Slots
            // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
            // 9.1.1.1 OrdinaryGetPrototypeOf(O)
            // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
            function OrdinaryGetPrototypeOf(O) {
                var proto = Object.getPrototypeOf(O);
                if (typeof O !== "function" || O === functionPrototype)
                    return proto;
                // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
                // Try to determine the superclass constructor. Compatible implementations
                // must either set __proto__ on a subclass constructor to the superclass constructor,
                // or ensure each class has a valid `constructor` property on its prototype that
                // points back to the constructor.
                // If this is not the same as Function.[[Prototype]], then this is definately inherited.
                // This is the case when in ES6 or when using __proto__ in a compatible browser.
                if (proto !== functionPrototype)
                    return proto;
                // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
                var prototype = O.prototype;
                var prototypeProto = prototype && Object.getPrototypeOf(prototype);
                if (prototypeProto == null || prototypeProto === Object.prototype)
                    return proto;
                // If the constructor was not a function, then we cannot determine the heritage.
                var constructor = prototypeProto.constructor;
                if (typeof constructor !== "function")
                    return proto;
                // If we have some kind of self-reference, then we cannot determine the heritage.
                if (constructor === O)
                    return proto;
                // we have a pretty good guess at the heritage.
                return constructor;
            }
            // naive Map shim
            function CreateMapPolyfill() {
                var cacheSentinel = {};
                var arraySentinel = [];
                var MapIterator = /** @class */ (function () {
                    function MapIterator(keys, values, selector) {
                        this._index = 0;
                        this._keys = keys;
                        this._values = values;
                        this._selector = selector;
                    }
                    MapIterator.prototype["@@iterator"] = function () { return this; };
                    MapIterator.prototype[iteratorSymbol] = function () { return this; };
                    MapIterator.prototype.next = function () {
                        var index = this._index;
                        if (index >= 0 && index < this._keys.length) {
                            var result = this._selector(this._keys[index], this._values[index]);
                            if (index + 1 >= this._keys.length) {
                                this._index = -1;
                                this._keys = arraySentinel;
                                this._values = arraySentinel;
                            }
                            else {
                                this._index++;
                            }
                            return { value: result, done: false };
                        }
                        return { value: undefined, done: true };
                    };
                    MapIterator.prototype.throw = function (error) {
                        if (this._index >= 0) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        throw error;
                    };
                    MapIterator.prototype.return = function (value) {
                        if (this._index >= 0) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        return { value: value, done: true };
                    };
                    return MapIterator;
                }());
                return /** @class */ (function () {
                    function Map() {
                        this._keys = [];
                        this._values = [];
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    }
                    Object.defineProperty(Map.prototype, "size", {
                        get: function () { return this._keys.length; },
                        enumerable: true,
                        configurable: true
                    });
                    Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                    Map.prototype.get = function (key) {
                        var index = this._find(key, /*insert*/ false);
                        return index >= 0 ? this._values[index] : undefined;
                    };
                    Map.prototype.set = function (key, value) {
                        var index = this._find(key, /*insert*/ true);
                        this._values[index] = value;
                        return this;
                    };
                    Map.prototype.delete = function (key) {
                        var index = this._find(key, /*insert*/ false);
                        if (index >= 0) {
                            var size = this._keys.length;
                            for (var i = index + 1; i < size; i++) {
                                this._keys[i - 1] = this._keys[i];
                                this._values[i - 1] = this._values[i];
                            }
                            this._keys.length--;
                            this._values.length--;
                            if (key === this._cacheKey) {
                                this._cacheKey = cacheSentinel;
                                this._cacheIndex = -2;
                            }
                            return true;
                        }
                        return false;
                    };
                    Map.prototype.clear = function () {
                        this._keys.length = 0;
                        this._values.length = 0;
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    };
                    Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                    Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                    Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                    Map.prototype["@@iterator"] = function () { return this.entries(); };
                    Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                    Map.prototype._find = function (key, insert) {
                        if (this._cacheKey !== key) {
                            this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                        }
                        if (this._cacheIndex < 0 && insert) {
                            this._cacheIndex = this._keys.length;
                            this._keys.push(key);
                            this._values.push(undefined);
                        }
                        return this._cacheIndex;
                    };
                    return Map;
                }());
                function getKey(key, _) {
                    return key;
                }
                function getValue(_, value) {
                    return value;
                }
                function getEntry(key, value) {
                    return [key, value];
                }
            }
            // naive Set shim
            function CreateSetPolyfill() {
                return /** @class */ (function () {
                    function Set() {
                        this._map = new _Map();
                    }
                    Object.defineProperty(Set.prototype, "size", {
                        get: function () { return this._map.size; },
                        enumerable: true,
                        configurable: true
                    });
                    Set.prototype.has = function (value) { return this._map.has(value); };
                    Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                    Set.prototype.delete = function (value) { return this._map.delete(value); };
                    Set.prototype.clear = function () { this._map.clear(); };
                    Set.prototype.keys = function () { return this._map.keys(); };
                    Set.prototype.values = function () { return this._map.values(); };
                    Set.prototype.entries = function () { return this._map.entries(); };
                    Set.prototype["@@iterator"] = function () { return this.keys(); };
                    Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                    return Set;
                }());
            }
            // naive WeakMap shim
            function CreateWeakMapPolyfill() {
                var UUID_SIZE = 16;
                var keys = HashMap.create();
                var rootKey = CreateUniqueKey();
                return /** @class */ (function () {
                    function WeakMap() {
                        this._key = CreateUniqueKey();
                    }
                    WeakMap.prototype.has = function (target) {
                        var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                        return table !== undefined ? HashMap.has(table, this._key) : false;
                    };
                    WeakMap.prototype.get = function (target) {
                        var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                        return table !== undefined ? HashMap.get(table, this._key) : undefined;
                    };
                    WeakMap.prototype.set = function (target, value) {
                        var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                        table[this._key] = value;
                        return this;
                    };
                    WeakMap.prototype.delete = function (target) {
                        var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                        return table !== undefined ? delete table[this._key] : false;
                    };
                    WeakMap.prototype.clear = function () {
                        // NOTE: not a real clear, just makes the previous data unreachable
                        this._key = CreateUniqueKey();
                    };
                    return WeakMap;
                }());
                function CreateUniqueKey() {
                    var key;
                    do
                        key = "@@WeakMap@@" + CreateUUID();
                    while (HashMap.has(keys, key));
                    keys[key] = true;
                    return key;
                }
                function GetOrCreateWeakMapTable(target, create) {
                    if (!hasOwn.call(target, rootKey)) {
                        if (!create)
                            return undefined;
                        Object.defineProperty(target, rootKey, { value: HashMap.create() });
                    }
                    return target[rootKey];
                }
                function FillRandomBytes(buffer, size) {
                    for (var i = 0; i < size; ++i)
                        buffer[i] = Math.random() * 0xff | 0;
                    return buffer;
                }
                function GenRandomBytes(size) {
                    if (typeof Uint8Array === "function") {
                        if (typeof crypto !== "undefined")
                            return crypto.getRandomValues(new Uint8Array(size));
                        if (typeof msCrypto !== "undefined")
                            return msCrypto.getRandomValues(new Uint8Array(size));
                        return FillRandomBytes(new Uint8Array(size), size);
                    }
                    return FillRandomBytes(new Array(size), size);
                }
                function CreateUUID() {
                    var data = GenRandomBytes(UUID_SIZE);
                    // mark as random - RFC 4122 § 4.4
                    data[6] = data[6] & 0x4f | 0x40;
                    data[8] = data[8] & 0xbf | 0x80;
                    var result = "";
                    for (var offset = 0; offset < UUID_SIZE; ++offset) {
                        var byte = data[offset];
                        if (offset === 4 || offset === 6 || offset === 8)
                            result += "-";
                        if (byte < 16)
                            result += "0";
                        result += byte.toString(16).toLowerCase();
                    }
                    return result;
                }
            }
            // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
            function MakeDictionary(obj) {
                obj.__ = undefined;
                delete obj.__;
                return obj;
            }
        });
    })(Reflect || (Reflect = {}));
    
    
    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
    /******/ 			return cachedModule.exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			// no module.id needed
    /******/ 			// no module.loaded needed
    /******/ 			exports: {}
    /******/ 		};
    /******/ 	
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/ 	
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = (exports, definition) => {
    /******/ 			for(var key in definition) {
    /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    /******/ 				}
    /******/ 			}
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/global */
    /******/ 	(() => {
    /******/ 		__webpack_require__.g = (function() {
    /******/ 			if (typeof globalThis === 'object') return globalThis;
    /******/ 			try {
    /******/ 				return this || new Function('return this')();
    /******/ 			} catch (e) {
    /******/ 				if (typeof window === 'object') return window;
    /******/ 			}
    /******/ 		})();
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	(() => {
    /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
    /******/ 		// define __esModule on exports
    /******/ 		__webpack_require__.r = (exports) => {
    /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 			}
    /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be in strict mode.
    (() => {
    "use strict";
    var exports = __webpack_exports__;
    /*!**************************************************************************!*\
      !*** ./node_modules/@sugardev/ecommerce-streams/dist/content/content.js ***!
      \**************************************************************************/
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    __webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
    const helpers_1 = __webpack_require__(/*! ../common/libs/helpers */ "./node_modules/@sugardev/ecommerce-streams/dist/common/libs/helpers.js");
    const OutContentMessageManager_1 = __webpack_require__(/*! ./message-managers/OutContentMessageManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/OutContentMessageManager.js");
    const InContentMessageManager_1 = __webpack_require__(/*! ./message-managers/InContentMessageManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/message-managers/InContentMessageManager.js");
    const HistoryManager_1 = __webpack_require__(/*! ./history/HistoryManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/history/HistoryManager.js");
    const Observer_1 = __webpack_require__(/*! ../common/observer/Observer */ "./node_modules/@sugardev/ecommerce-streams/dist/common/observer/Observer.js");
    const RequestsManager_1 = __webpack_require__(/*! ./requests/RequestsManager */ "./node_modules/@sugardev/ecommerce-streams/dist/content/requests/RequestsManager.js");
    const ID = (0, helpers_1.uuid)();
    const observer = new Observer_1.Observer();
    const history = new HistoryManager_1.HistoryManager(observer);
    const requestManager = new RequestsManager_1.RequestsManager(observer);
    history.replaceNativeApi();
    const outManager = new OutContentMessageManager_1.OutContentMessageManager(ID);
    const inManager = new InContentMessageManager_1.InContentMessageManager(ID, outManager, history, requestManager);
    outManager.initMessage();
    
    })();
    
    /******/ })()
    ;
    //# sourceMappingURL=processor.js.map