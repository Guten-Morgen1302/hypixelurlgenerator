(()=>{
    var e = {
        8962: e=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var t = function() {
                function PosdConfig() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdConfig)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdConfig, null, [{
                    key: "CONFIG_PANELOS_VERSION",
                    get: function get() {
                        return "1.9.12"
                    }
                }, {
                    key: "CONFIG_PINSTANCE_ID",
                    get: function get() {
                        return 1
                    }
                }, {
                    key: "CONFIG_PARTNER_ID",
                    get: function get() {
                        return 5
                    }
                }, {
                    key: "CONFIG_DISTRIBUTOR_ID",
                    get: function get() {
                        return 5
                    }
                }, {
                    key: "CONFIG_PANELBACKEND_ENDPOINT",
                    get: function get() {
                        return "https://analytics-toolbar.urban-vpn.com:40443"
                    }
                }, {
                    key: "CONFIG_PANELBACKEND_ENDPOINT_ULR_OUTTICKET",
                    get: function get() {
                        return "/tickets"
                    }
                }, {
                    key: "CONFIG_PANELBACKEND_ENDPOINT_ULR_INSTALL_EVENT",
                    get: function get() {
                        return "/install"
                    }
                }, {
                    key: "CONFIG_PANELBACKEND_ENDPOINT_ULR_CONFIGURATION",
                    get: function get() {
                        return "/configuration?pv=".concat(this.CONFIG_PANELOS_VERSION)
                    }
                }, {
                    key: "CONFIG_GLOBAL_ACTIVE_STATUS",
                    get: function get() {
                        return !1
                    }
                }, {
                    key: "CONFIG_USE_COMPRESSION",
                    get: function get() {
                        return !0
                    }
                }, {
                    key: "CONFIG_MARK_AD_CANDIDATES",
                    get: function get() {
                        return !1
                    }
                }, {
                    key: "CONFIG_MARK_PROCESSED_AD_CANDIDATES",
                    get: function get() {
                        return !1
                    }
                }, {
                    key: "CONFIG_ADBLOCKER_AVAILABLE",
                    get: function get() {
                        return !0
                    }
                }, {
                    key: "CONFIG_TARGET_URL_BY_CLICK_AVAILABLE",
                    get: function get() {
                        return !0
                    }
                }, {
                    key: "CONFIG_ANALYTIC_INSTALL_EVENTS_TRACING_AVAILABLE",
                    get: function get() {
                        return !0
                    }
                }, {
                    key: "CONFIG_ADBLOCK_INSPECTOR_AVAILABLE",
                    get: function get() {
                        return !0
                    }
                }, {
                    key: "CONFIG_UTILITY_HOST",
                    get: function get() {
                        return "https://authentication.urban-vpn.com"
                    }
                }]),
                PosdConfig
            }();
            e.exports = t
        }
        ,
        661: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(5212)
              , i = n(3124)
              , o = function() {
                function PosdAdBlockInspectorAgent(e) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdAdBlockInspectorAgent),
                    this.id = e,
                    this.init = !1,
                    this.InspectorConfig = null
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdAdBlockInspectorAgent, [{
                    key: "Init",
                    value: function Init(e) {
                        return this.InspectorConfig = e,
                        !this.init && this.InspectorConfig && this.InspectorConfig.active && (this.init = !0,
                        setTimeout(this.CheckForActiveAdblocker.bind(this), 1e3 * this.GetAgentActivationTimeout())),
                        this.init
                    }
                }, {
                    key: "CheckForActiveAdblocker",
                    value: function CheckForActiveAdblocker() {
                        document.readyState === i.DOCUMENT_READYSTATE_LOADING ? document.addEventListener("DOMContentLoaded", this.CheckAdblockerActivityStatus.bind(this)) : document.readyState !== i.DOCUMENT_READYSTATE_INTERACTIVE && document.readyState !== i.DOCUMENT_READYSTATE_COMPLETE || this.CheckAdblockerActivityStatus()
                    }
                }, {
                    key: "CheckAdblockerActivityStatus",
                    value: function CheckAdblockerActivityStatus() {
                        var e = this
                          , t = this.CreateDumpAdElement();
                        setTimeout((function() {
                            var n = {};
                            n.hasActiveAdblock = e.IsElementHidden(t),
                            t.remove(),
                            r.SendAdBlockInspectorAgentReport(e.id, n, null)
                        }
                        ), 1e3 * this.GetAdblockerAdRemovingTimeout())
                    }
                }, {
                    key: "IsElementHidden",
                    value: function IsElementHidden(e) {
                        return 0 === e.offsetHeight
                    }
                }, {
                    key: "CreateDumpAdElement",
                    value: function CreateDumpAdElement() {
                        var e = document.createElement("div");
                        return e.innerHTML = "&nbsp;",
                        e.className = this.GetAdblockerDetectionClassName(),
                        document.body.appendChild(e),
                        e
                    }
                }, {
                    key: "GetAdblockerDetectionClassName",
                    value: function GetAdblockerDetectionClassName() {
                        return this.init && this.InspectorConfig && this.InspectorConfig.detectionClassName
                    }
                }, {
                    key: "GetAgentActivationTimeout",
                    value: function GetAgentActivationTimeout() {
                        return this.init && this.InspectorConfig && this.InspectorConfig.agentActivationTimeoutSec
                    }
                }, {
                    key: "GetAdblockerAdRemovingTimeout",
                    value: function GetAdblockerAdRemovingTimeout() {
                        return this.init && this.InspectorConfig && this.InspectorConfig.adRemovingTimeoutSec
                    }
                }]),
                PosdAdBlockInspectorAgent
            }();
            e.exports = o
        }
        ,
        5733: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(8962)
              , i = n(3124)
              , o = n(1225)
              , s = n(5212)
              , a = function() {
                function PosdAdBlockerAgent(e, t) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdAdBlockerAgent),
                    this.id = e,
                    this.IOManager = t,
                    this.init = !1,
                    this.tabId = null,
                    this.status = o.GetDefaultAdblockerStatus(),
                    this.excludeList = {
                        domains: [],
                        pages: []
                    },
                    this.IOManager && (this.IOManager.onAdBlockerStatusChanged = this.onAdBlockerStatusChanged.bind(this))
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdAdBlockerAgent, [{
                    key: "GetStatus",
                    value: function GetStatus() {
                        return this.status
                    }
                }, {
                    key: "Init",
                    value: function Init(e, t, n) {
                        return !this.init && r.CONFIG_ADBLOCKER_AVAILABLE && (this.tabId = n,
                        this.status = e,
                        this.excludeList = t,
                        this.init = !0),
                        this.init
                    }
                }, {
                    key: "onAdBlockerStatusChanged",
                    value: function onAdBlockerStatusChanged(e) {
                        this.status = e
                    }
                }, {
                    key: "SetHiddenAmount",
                    value: function SetHiddenAmount(e) {
                        e > 0 && s.SendHiddenAdCandidatesAmount(this.id, e)
                    }
                }, {
                    key: "IsEnabled",
                    value: function IsEnabled() {
                        return this.init && r.CONFIG_ADBLOCKER_AVAILABLE && this.status[i.ADBLOCKER_FOR_DISPLAY] === i.ADBLOCKER_STATUS_ENABLED && this.IsNotExcluded()
                    }
                }, {
                    key: "IsEnabledForFacebook",
                    value: function IsEnabledForFacebook() {
                        return this.init && r.CONFIG_ADBLOCKER_AVAILABLE && this.status[i.ADBLOCKER_FOR_FACEBOOK] === i.ADBLOCKER_STATUS_ENABLED && this.IsNotExcluded()
                    }
                }, {
                    key: "IsEnabledForTwitter",
                    value: function IsEnabledForTwitter() {
                        return this.init && r.CONFIG_ADBLOCKER_AVAILABLE && this.status[i.ADBLOCKER_FOR_TWITTER] === i.ADBLOCKER_STATUS_ENABLED && this.IsNotExcluded()
                    }
                }, {
                    key: "IsEnabledForReddit",
                    value: function IsEnabledForReddit() {
                        return this.init && r.CONFIG_ADBLOCKER_AVAILABLE && this.status[i.ADBLOCKER_FOR_REDDIT] === i.ADBLOCKER_STATUS_ENABLED && this.IsNotExcluded()
                    }
                }, {
                    key: "IsEnabledForPinterest",
                    value: function IsEnabledForPinterest() {
                        return this.init && r.CONFIG_ADBLOCKER_AVAILABLE && this.status[i.ADBLOCKER_FOR_PINTEREST] === i.ADBLOCKER_STATUS_ENABLED && this.IsNotExcluded()
                    }
                }, {
                    key: "GetCurrentDomain",
                    value: function GetCurrentDomain() {
                        return window.location.origin
                    }
                }, {
                    key: "GetCurrentPageUrl",
                    value: function GetCurrentPageUrl() {
                        return window.location.href
                    }
                }, {
                    key: "IsExcluded",
                    value: function IsExcluded() {
                        return this.IsExcludedByDomainRule() || this.IsExcludedByPageRule()
                    }
                }, {
                    key: "IsNotExcluded",
                    value: function IsNotExcluded() {
                        return !this.IsExcluded()
                    }
                }, {
                    key: "IsExcludedByDomainRule",
                    value: function IsExcludedByDomainRule() {
                        return -1 !== this.excludeList.domains.indexOf(this.GetCurrentDomain())
                    }
                }, {
                    key: "IsExcludedByPageRule",
                    value: function IsExcludedByPageRule() {
                        return -1 !== this.excludeList.pages.indexOf(this.GetCurrentPageUrl())
                    }
                }]),
                PosdAdBlockerAgent
            }();
            e.exports = a
        }
        ,
        9543: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(4019)
              , i = n(9622)
              , o = n(1225)
              , s = n(3124)
              , a = function(e) {
                function PosdAdsCandidates(e) {
                    var t;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdAdsCandidates),
                    (t = _possibleConstructorReturn(this, _getPrototypeOf(PosdAdsCandidates).call(this))).id = e,
                    t.active = !1,
                    t.candidates = [],
                    t.hiddenAmount = 0,
                    t.pageUrl = "",
                    t.ticketId = "",
                    t.onPageRefreshed = null,
                    t.isActive = !1,
                    t.available = !1,
                    t.elementId = 0,
                    t
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdAdsCandidates, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdAdsCandidates, [{
                    key: "getGlobalContainer",
                    value: function getGlobalContainer() {}
                }, {
                    key: "sendAdCandidatesToBackground",
                    value: function sendAdCandidatesToBackground() {}
                }, {
                    key: "getUniqueContentId",
                    value: function getUniqueContentId() {}
                }, {
                    key: "Activated",
                    value: function Activated() {
                        this.active = !0
                    }
                }, {
                    key: "CandidateHidden",
                    value: function CandidateHidden() {
                        this.hiddenAmount = this.hiddenAmount + 1
                    }
                }, {
                    key: "ClearHiddenCounter",
                    value: function ClearHiddenCounter() {
                        this.hiddenAmount = 0
                    }
                }, {
                    key: "ClearCandidates",
                    value: function ClearCandidates() {
                        this.candidates = []
                    }
                }, {
                    key: "AddCandidate",
                    value: function AddCandidate(e) {
                        this.candidates.push(e)
                    }
                }, {
                    key: "PageRefreshed",
                    value: function PageRefreshed(e, t) {
                        this.pageUrl = e,
                        this.ticketId = t,
                        this.onPageRefreshed && this.onPageRefreshed(e, t)
                    }
                }, {
                    key: "getSponsorTwitterScreenName",
                    value: function getSponsorTwitterScreenName(e) {
                        var t = this.getSponsorPageRelativeUrl(e)
                          , n = t.lastIndexOf("/") + 1;
                        return t.substring(n)
                    }
                }, {
                    key: "getSponsorRedditScreenName",
                    value: function getSponsorRedditScreenName(e) {
                        var t = this.getSponsorScreenNameReddit(e);
                        return t ? t.replace(/^.*\/user\//gi, "").replace(/\/.*/gi, "") : ""
                    }
                }, {
                    key: "getSponsorPageRelativeUrl",
                    value: function getSponsorPageRelativeUrl(e) {
                        var t = ""
                          , n = e.querySelectorAll("a");
                        if (n.length) {
                            t = n[0].getAttribute("href");
                            var r = n[0].getBoundingClientRect().x;
                            n.forEach((function(e) {
                                e.getBoundingClientRect().x < r && (t = e.getAttribute("href"),
                                r = e.getBoundingClientRect().x)
                            }
                            ))
                        }
                        return t
                    }
                }, {
                    key: "getSponsorScreenNameReddit",
                    value: function getSponsorScreenNameReddit(e) {
                        for (var t, n = 0, r = Array.from(e.querySelectorAll("a[href]")); n < r.length; n++) {
                            var i = r[n]
                              , o = new RegExp(/^\/user\/.*\//)
                              , s = i.getAttribute("href");
                            if (s && o.test(s)) {
                                t = s.replace(/\/user\//, "").replace(/\/.*/, "");
                                break
                            }
                        }
                        return t
                    }
                }, {
                    key: "getStylesFromHeadTags",
                    value: function getStylesFromHeadTags() {
                        return Array.from(document.querySelector("head").querySelectorAll("style"))
                    }
                }, {
                    key: "getAdTwitterObject",
                    value: function getAdTwitterObject(e, t) {
                        var n = o.SetFullSizeToElement(e)
                          , i = o.GetCookie("ct0");
                        return {
                            content: r.encode(e.outerHTML),
                            screenName: this.getSponsorTwitterScreenName(e),
                            stylesByElementBisId: this.getStylesByElementsBisId(e),
                            adPlacementType: t,
                            size: n,
                            userDataByScreenName: "",
                            token: i
                        }
                    }
                }, {
                    key: "getAdRedditObject",
                    value: function getAdRedditObject(e, t, n) {
                        var i = o.SetFullSizeToElement(e);
                        return {
                            content: r.encode(t.outerHTML),
                            screenName: this.getSponsorRedditScreenName(e),
                            adPlacementType: n,
                            targetUrl: "",
                            size: i
                        }
                    }
                }, {
                    key: "getAdPinterestObject",
                    value: function getAdPinterestObject(e, t, n, i, s, a, c) {
                        var l = o.SetFullSizeToElement(e)
                          , u = this.getUniqueContentId(t);
                        return {
                            content: r.encode(t.outerHTML),
                            screenName: n,
                            adPlacementType: c,
                            targetUrl: i,
                            size: l,
                            adText: s,
                            advertiserUrl: a,
                            uniqueContentId: u
                        }
                    }
                }, {
                    key: "setSizesAndIdForAllElements",
                    value: function setSizesAndIdForAllElements(e) {
                        var t = this;
                        if (e && e.setAttribute) {
                            var n = this.getElementId();
                            e.setAttribute(s.ATTRIBUTE_BIS_ELEMENT_ID, n),
                            e.querySelectorAll("*").forEach((function(e) {
                                var n = t.getElementId();
                                e.setAttribute && (e.setAttribute(s.ATTRIBUTE_BIS_ELEMENT_ID, n),
                                o.SetFullSizeToElement(e))
                            }
                            ))
                        }
                    }
                }, {
                    key: "isEmpty",
                    value: function isEmpty(e) {
                        return void 0 === e || 0 === e.length
                    }
                }, {
                    key: "getElementId",
                    value: function getElementId() {
                        return this.elementId++
                    }
                }, {
                    key: "HideElement",
                    value: function HideElement(e) {
                        e && e.style && (e.style.cssText += "left: -10000px !important; position: absolute !important;",
                        this.CandidateHidden())
                    }
                }, {
                    key: "UnhideElement",
                    value: function UnhideElement(e) {
                        if (e && e.style) {
                            var t = e.style.cssText;
                            t.includes("left: -10000px !important; position: absolute !important;") && (t = t.replace("left: -10000px !important; position: absolute !important;", ""),
                            e.style.cssText = t)
                        }
                    }
                }, {
                    key: "removeCloneElement",
                    value: function removeCloneElement(e) {
                        e.remove()
                    }
                }, {
                    key: "CandidatesCount",
                    get: function get() {
                        return this.candidates.length
                    }
                }, {
                    key: "Candidates",
                    get: function get() {
                        return this.candidates
                    }
                }, {
                    key: "HiddenAmount",
                    get: function get() {
                        return this.hiddenAmount
                    }
                }, {
                    key: "PageUrl",
                    get: function get() {
                        return this.pageUrl
                    }
                }, {
                    key: "TicketId",
                    get: function get() {
                        return this.ticketId
                    }
                }, {
                    key: "IsActive",
                    get: function get() {
                        return this.active
                    }
                }, {
                    key: "Context",
                    get: function get() {
                        return this
                    }
                }, {
                    key: "setActive",
                    set: function set(e) {
                        "boolean" == typeof e && (this.isActive = e)
                    }
                }, {
                    key: "setAvailable",
                    set: function set(e) {
                        "boolean" == typeof e && (this.available = e)
                    }
                }]),
                PosdAdsCandidates
            }(i);
            e.exports = a
        }
        ,
        1828: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(3124)
              , i = n(1225)
              , o = n(8794)
              , s = n(2574)
              , a = n(1674)
              , c = n(3177)
              , l = n(9780)
              , u = n(3173)
              , d = n(5216)
              , f = n(9751)
              , h = function() {
                function PosdAdsManager(e, t, n, r) {
                    switch (function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdAdsManager),
                    this.id = e,
                    this.Config = t,
                    this.AdBlockerAgent = r,
                    this.IOManager = n,
                    this.PageUrl = document.location.href,
                    this.FacebookAds = null,
                    this.TwitterAds = null,
                    this.RedditAds = null,
                    this.SkinAds = null,
                    this.HTML5Ads = null,
                    this.VideoAds = null,
                    this.PinterestAds = null,
                    this.IsBlacklistedPublisher = i.IsPublisherInBlacklist(this.PageUrl, this.Config.GetBlacklistPublishers()),
                    !0) {
                    case i.IsFacebookUrl(this.PageUrl):
                        this.FacebookAds = new l(this.id,this.Config,this.IOManager,this.AdBlockerAgent);
                        break;
                    case i.IsTwitterUrl(this.PageUrl):
                        this.TwitterAds = new u(this.id,this.Config,this.IOManager,this.AdBlockerAgent);
                        break;
                    case i.IsRedditUrl(this.PageUrl):
                        this.RedditAds = new d(this.id,this.Config,this.IOManager,this.AdBlockerAgent);
                        break;
                    case i.IsTiktokUrl(this.PageUrl):
                        this.VideoAds = new c(this.id,this.Config,this.IOManager,!this.IsBlacklistedPublisher);
                        break;
                    case i.IsPinterestUrl(this.PageUrl):
                        this.PinterestAds = new f(this.id,this.Config,this.IOManager,this.AdBlockerAgent);
                        break;
                    default:
                        this.SkinAds = new o(this.id,this.Config,this.IOManager,this.AdBlockerAgent),
                        this.BannerAds = new s(this.id,this.Config,this.IOManager,this.AdBlockerAgent),
                        this.HTML5Ads = new a(this.id,this.Config,this.IOManager,this.AdBlockerAgent),
                        this.VideoAds = new c(this.id,this.Config,this.IOManager,!this.IsBlacklistedPublisher)
                    }
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdAdsManager, [{
                    key: "ActivateAdsdetectors",
                    value: function ActivateAdsdetectors() {
                        this.TwitterAds && this.TwitterAds.ActivateVideoTrafficDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        this.PinterestAds && this.PinterestAds.ActivateVideoTrafficDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        this.RedditAds && this.RedditAds.ActivateTrafficDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        document.readyState === r.DOCUMENT_READYSTATE_LOADING ? document.addEventListener("DOMContentLoaded", this.StartAdsdetectors.bind(this)) : document.readyState !== r.DOCUMENT_READYSTATE_INTERACTIVE && document.readyState !== r.DOCUMENT_READYSTATE_COMPLETE || this.StartAdsdetectors()
                    }
                }, {
                    key: "StartAdsdetectors",
                    value: function StartAdsdetectors() {
                        this.IsBlacklistedPublisher || (this.SkinAds && this.SkinAds.ActivateDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        this.BannerAds && this.BannerAds.ActivateDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        this.HTML5Ads && this.HTML5Ads.ActivateDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        this.VideoAds && this.VideoAds.ActivateDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        this.FacebookAds && this.FacebookAds.ActivateDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        this.TwitterAds && this.TwitterAds.ActivateDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        this.RedditAds && this.RedditAds.ActivateDetector(r.ACTIVATION_BY_ADS_MANAGER),
                        this.PinterestAds && this.PinterestAds.ActivateDetector(r.ACTIVATION_BY_ADS_MANAGER))
                    }
                }, {
                    key: "PageRefreshed",
                    value: function PageRefreshed(e, t) {
                        this.SkinAds && this.SkinAds.PageRefreshed(e, t),
                        this.BannerAds && this.BannerAds.PageRefreshed(e, t),
                        this.HTML5Ads && this.HTML5Ads.PageRefreshed(e, t),
                        this.VideoAds && this.VideoAds.PageRefreshed(e, t),
                        this.FacebookAds && this.FacebookAds.PageRefreshed(e, t),
                        this.TwitterAds && this.TwitterAds.PageRefreshed(e, t),
                        this.RedditAds && this.RedditAds.PageRefreshed(e, t),
                        this.PinterestAds && this.PinterestAds.PageRefreshed(e, t)
                    }
                }, {
                    key: "GetHtml5CandidatesPrebildInfo",
                    value: function GetHtml5CandidatesPrebildInfo() {
                        return this.HTML5Ads && this.HTML5Ads.IsActive ? this.HTML5Ads.GetPrebuildInfo() : []
                    }
                }]),
                PosdAdsManager
            }();
            e.exports = h
        }
        ,
        5152: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(1850)
              , i = function() {
                function PosdAtrMessageListener(e, t) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdAtrMessageListener),
                    this.id = e,
                    this.onGotWindowMessageCallback = t,
                    this.mesToFrameDeactivationIntervalId = null
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdAtrMessageListener, [{
                    key: "SetId",
                    value: function SetId(e) {
                        this.id = e
                    }
                }, {
                    key: "ActivateMesToFrameContentListener",
                    value: function ActivateMesToFrameContentListener(e) {
                        this.mesToFrameDeactivationIntervalId || (this.mesToFrameDeactivationIntervalId = setInterval(this.CheckMesToFrameContent.bind(this), 300),
                        setTimeout(this.DeactivateMesToFrameContentListener.bind(this), 3e3))
                    }
                }, {
                    key: "CheckMesToFrameContent",
                    value: function CheckMesToFrameContent() {
                        try {
                            var e = document.body.getAttribute("bis_mes_to_fr");
                            if (e && e) {
                                var t = JSON.parse(e);
                                document.body.setAttribute("bis_mes_to_fr", ""),
                                r.IsValid(t) && this.onGotWindowMessageCallback && this.onGotWindowMessageCallback(t),
                                this.DeactivateMesToFrameContentListener()
                            }
                        } catch (e) {}
                    }
                }, {
                    key: "DeactivateMesToFrameContentListener",
                    value: function DeactivateMesToFrameContentListener() {
                        this.mesToFrameDeactivationIntervalId && (clearInterval(this.mesToFrameDeactivationIntervalId),
                        this.mesToFrameDeactivationIntervalId = null)
                    }
                }]),
                PosdAtrMessageListener
            }();
            e.exports = i
        }
        ,
        2574: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _assertThisInitialized(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(8962)
              , i = n(1225)
              , o = n(4019)
              , s = n(9543)
              , a = n(5212)
              , c = n(3124)
              , l = function(e) {
                function PosdBannerAds(e, t, n, r) {
                    var i;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdBannerAds),
                    (i = function _possibleConstructorReturn(e, t) {
                        return !t || "object" !== _typeof(t) && "function" != typeof t ? _assertThisInitialized(e) : t
                    }(this, _getPrototypeOf(PosdBannerAds).call(this, e))).Config = t,
                    i.bannerAdsConfig = i.Config.BannerAdsConfig,
                    i.IOManager = n,
                    i.IOManager.onGotBannerCandidatesExtractionStatusesCallback = i.onGoBannerCandidatesExtractionStatuses.bind(_assertThisInitialized(i)),
                    i.AdBlockerAgent = r,
                    i
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdBannerAds, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdBannerAds, [{
                    key: "ActivateDetector",
                    value: function ActivateDetector() {
                        var e = this;
                        this.DetectCandidates(),
                        setTimeout((function() {
                            e.DetectCandidates()
                        }
                        ), 350),
                        setInterval((function() {
                            e.DetectCandidates()
                        }
                        ), 700)
                    }
                }, {
                    key: "PushCandidate",
                    value: function PushCandidate(e, t) {
                        var n = {
                            bisId: t,
                            content: o.encode(e)
                        };
                        this.AddCandidate(n)
                    }
                }, {
                    key: "IsValidCandidateSize",
                    value: function IsValidCandidateSize(e) {
                        return !!(e && e.width > 70 && e.height > 40 && e.height < 1100)
                    }
                }, {
                    key: "HideCandidate",
                    value: function HideCandidate(e) {
                        e && this.AdBlockerAgent.IsEnabled() && this.HideElement(e)
                    }
                }, {
                    key: "SetBorderToCandidate",
                    value: function SetBorderToCandidate(e) {
                        e && r.CONFIG_MARK_AD_CANDIDATES && !this.AdBlockerAgent.IsEnabled() && (r.CONFIG_MARK_PROCESSED_AD_CANDIDATES ? e.style.cssText += "border: 6px solid blueviolet !important;" : e.style.cssText += "border: 6px solid red !important;")
                    }
                }, {
                    key: "SendCandidatesToBackground",
                    value: function SendCandidatesToBackground() {
                        this.Candidates.length && (this.AdBlockerAgent.IsEnabled() && this.AdBlockerAgent.SetHiddenAmount(this.HiddenAmount),
                        a.SendAdCandidates(this.id, this.Candidates, c.MESSAGE_TYPE_CANDIDATES_DATA_BANNERS, null))
                    }
                }, {
                    key: "DetectCandidates",
                    value: function DetectCandidates() {
                        this.AdBlockerAgent.IsEnabled() && this.ClearHiddenCounter(),
                        this.ClearCandidates();
                        for (var e = i.QuerySelectorAll(document, this.bannerAdsConfig.QUERIES.FULL_IMG_COLLECTION), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (n) {
                                var r = n.src.toLowerCase()
                                  , o = this.getTagWithHref(n);
                                if (o) {
                                    var s = o.href.toLowerCase()
                                      , a = !1;
                                    if (!this.filterNonAdBanner(n) && (i.IsInFilterList(this.Config.GetBlacklistBannerHref(), s) || i.IsInFilterList(this.Config.GetBlacklistBannerImgSrc(), r) || n.hasAttribute("bis_skin_element") || (i.isValidUrl(r) && i.isValidUrl(s) && !i.IsUrlFromHost(document.location.host, s) || i.IsInFilterList(this.Config.GetWhitelistCandidatesUrlKeyWords(), r) || i.IsInFilterList(this.Config.GetWhitelistCandidatesUrlKeyWords(), s)) && (a = !0),
                                    a)) {
                                        var c = n.getBoundingClientRect();
                                        if (this.IsValidCandidateSize(c)) {
                                            this.SetBorderToCandidate(n),
                                            i.SetFullSizeToElement(n),
                                            i.SetFullSizeToElement(o);
                                            var l = i.GenerateAndSetBisIdToBanner(n);
                                            this.PushCandidate(o.outerHTML, l),
                                            this.HideCandidate(n)
                                        }
                                    }
                                }
                            }
                        }
                        for (var u = i.QuerySelectorAll(document, this.bannerAdsConfig.QUERIES.ON_EVENT_IMG_COLLECTION), d = 0; d < u.length; d++) {
                            var f = u[d]
                              , h = f.src.toLowerCase();
                            if (!i.IsInFilterList(this.Config.GetBlacklistBannerImgSrc(), h) && (i.isValidUrl(h) && !i.IsUrlFromHost(document.location.host, h) || i.IsInFilterList(this.Config.GetWhitelistCandidatesUrlKeyWords(), h))) {
                                var _ = f.getBoundingClientRect();
                                if (this.IsValidCandidateSize(_)) {
                                    this.SetBorderToCandidate(f),
                                    i.SetFullSizeToElement(f);
                                    var A = i.GenerateAndSetBisIdToBanner(f);
                                    this.PushCandidate(f.outerHTML, A),
                                    this.HideCandidate(f)
                                }
                            }
                        }
                        this.SendCandidatesToBackground()
                    }
                }, {
                    key: "filterNonAdBanner",
                    value: function filterNonAdBanner(e) {
                        var t = window.location.host || "__NULL__"
                          , n = e.src.toLowerCase()
                          , r = n.match(/\/\/(www\.)?[A-Za-z0-9.]+/)
                          , i = this.getTagWithHref(e)
                          , o = i ? i.href.match(/\/\/(www\.)?[A-Za-z0-9.]+/) : "";
                        return headOuterHTML = document.querySelector("head").outerHTML,
                        o = o ? o[0].replace("//", "") : "",
                        r = r ? r[0].replace("//", "") : "__NULL__",
                        t = 0 === t.indexOf("www") ? t.replace("www", "") : t,
                        o.includes(t) || headOuterHTML.includes(o) || n.includes(t) && o.includes(t) || -1 !== n.search(/^data/)
                    }
                }, {
                    key: "onGoBannerCandidatesExtractionStatuses",
                    value: function onGoBannerCandidatesExtractionStatuses(e) {
                        if (r.CONFIG_MARK_AD_CANDIDATES && r.CONFIG_MARK_PROCESSED_AD_CANDIDATES && e && e.length && !this.AdBlockerAgent.IsEnabled())
                            for (var t = 0; t < e.length; t++) {
                                var n = i.QuerySelector(document, '*[bis_id="'.concat(e[t].bannerId, '"]'));
                                n && i.UpdateCandidateStatusBorderColor(n, e[t].extractionStatus)
                            }
                    }
                }, {
                    key: "getTagWithHref",
                    value: function getTagWithHref(e) {
                        for (var t = e.parentElement, n = 0; n < 5 && "A" !== t.tagName; n++)
                            t = t.parentElement;
                        return "A" !== t.tagName && (t = null),
                        t
                    }
                }]),
                PosdBannerAds
            }(s);
            e.exports = l
        }
        ,
        3284: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(4019)
              , i = function() {
                function PosdConfigAgent(e, t) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdConfigAgent),
                    this.id = e,
                    this.configEncoded = t,
                    this.config = JSON.parse(r.decode(t))
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdConfigAgent, [{
                    key: "GetConfigEncoded",
                    value: function GetConfigEncoded() {
                        return this.configEncoded
                    }
                }, {
                    key: "GetBlacklistPublishers",
                    value: function GetBlacklistPublishers() {
                        return this.config.blacklistPublishers
                    }
                }, {
                    key: "GetBlacklistBannerImgSrc",
                    value: function GetBlacklistBannerImgSrc() {
                        return this.config.blacklistBannerImgSrc
                    }
                }, {
                    key: "GetBlacklistBannerHref",
                    value: function GetBlacklistBannerHref() {
                        return this.config.blacklistBannerHref
                    }
                }, {
                    key: "GetBlacklistIframeSrc",
                    value: function GetBlacklistIframeSrc() {
                        return this.config.blacklistIframeSrc
                    }
                }, {
                    key: "GetBlacklistIframeId",
                    value: function GetBlacklistIframeId() {
                        return this.config.blacklistIframeId
                    }
                }, {
                    key: "GetWhitelistCandidatesUrlKeyWords",
                    value: function GetWhitelistCandidatesUrlKeyWords() {
                        return this.config.whitelistCandidatesUrlKeyWords
                    }
                }, {
                    key: "GetWhitelistRedirectionCode",
                    value: function GetWhitelistRedirectionCode() {
                        return this.config.whitelistRedirectionCode
                    }
                }, {
                    key: "GetVideoValidatorsForHTML",
                    value: function GetVideoValidatorsForHTML() {
                        return this.config.videoValidatorsForHTML
                    }
                }, {
                    key: "GetVideoValidatorsForJS",
                    value: function GetVideoValidatorsForJS() {
                        return this.config.videoValidatorsForJS
                    }
                }, {
                    key: "GetVideoValidatorsForXHR",
                    value: function GetVideoValidatorsForXHR() {
                        return this.config.videoValidatorsForXHR
                    }
                }, {
                    key: "GetFacebookConfig",
                    value: function GetFacebookConfig() {
                        return this.config.facebookConfig
                    }
                }, {
                    key: "GetTwitterConfig",
                    value: function GetTwitterConfig() {
                        return this.config.twitterConfig
                    }
                }, {
                    key: "GetAdBlockInspectorConfig",
                    value: function GetAdBlockInspectorConfig() {
                        return this.config.adBlockInspectorConfig
                    }
                }, {
                    key: "GetBlacklistTargetUrl",
                    value: function GetBlacklistTargetUrl() {
                        return this.config.blacklistTargetUrl
                    }
                }, {
                    key: "GetHtml5TargetUrlDetectionConfig",
                    value: function GetHtml5TargetUrlDetectionConfig() {
                        return this.config.html5TargetUrlDetectionConfig
                    }
                }, {
                    key: "RedditConfig",
                    get: function get() {
                        return this.config.redditConfig
                    }
                }, {
                    key: "PinterestConfig",
                    get: function get() {
                        return this.config.pinterestConfig
                    }
                }, {
                    key: "BannerAdsConfig",
                    get: function get() {
                        return this.config.bannerAdsConfig
                    }
                }, {
                    key: "Html5AdsConfig",
                    get: function get() {
                        return this.config.HTML5AdsConfig
                    }
                }]),
                PosdConfigAgent
            }();
            e.exports = i
        }
        ,
        5212: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(3124)
              , i = n(1850)
              , o = n(1225)
              , s = (n(4019),
            function() {
                function PosdContentIOManager(e) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdContentIOManager),
                    this.id = e,
                    this.init = !1,
                    this.onGotHTML5CandidatesExtractionStatusesCallback = null,
                    this.onGotSkinAdCandidatesExtractionStatusesCallback = null,
                    this.onGotBannerCandidatesExtractionStatusesCallback = null,
                    this.onGotVideoXHRTrafficCallback = null,
                    this.onAdBlockerStatusChanged = null,
                    this.onTabUrlChanged = null,
                    this.twitterVideoInfoCandidates = [],
                    this.twitterAdCandidate = []
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdContentIOManager, [{
                    key: "IsInit",
                    value: function IsInit() {
                        return this.init
                    }
                }, {
                    key: "Init",
                    value: function Init() {
                        var e = this;
                        this.init || (this.init = !0,
                        window.addEventListener("message", (function(t) {
                            try {
                                var n = t.data;
                                if (i.IsValid(n))
                                    switch (!0) {
                                    case n.type === r.MESSAGE_TYPE_VIDEO_XHR_CANDIDATE:
                                        e.onGotVideoXHRTrafficCallback && e.onGotVideoXHRTrafficCallback(n.content);
                                        break;
                                    case n.type === r.MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA:
                                        PosdContentIOManager.SendFBInStreamData(e.id, n.content);
                                        break;
                                    case n.type === r.MESSAGE_TYPE_FACEBOOK_VIDEO_DATA:
                                        o.IsFBVideoDataValid(n.content) && PosdContentIOManager.SendFBVideoData(e.id, n.content);
                                        break;
                                    case n.type === r.MESSAGE_TYPE_PINTEREST_VIDEO_DATA:
                                        PosdContentIOManager.SendPinterestVideoData(e.id, n.content);
                                        break;
                                    case n.type === r.MESSAGE_TYPE_TWITTER_VIDEO_DATA:
                                        PosdContentIOManager.SendTWVideoData(e.id, n.content);
                                        break;
                                    case n.type === r.MESSAGE_TYPE_REDDIT_VIDEO_DATA:
                                        PosdContentIOManager.SendRedditVideoData(e.id, n.content);
                                        break;
                                    case n.type === r.MESSAGE_TYPE_REDDIT_RIGHT_COLUMN_DATA:
                                        PosdContentIOManager.SendRedditRightColumnData(e.id, n.content)
                                    }
                            } catch (e) {}
                        }
                        ), !1),
                        o.IsOnChromeRuntime() && chrome.runtime.onMessage.addListener((function(t, n, o) {
                            var s = t;
                            i.IsValid(s) && s.to === e.id && (s.type === r.MESSAGE_TYPE_HTML5_CANDIDATES_EXTRACTION_STATUSES ? e.onGotHTML5CandidatesExtractionStatusesCallback && e.onGotHTML5CandidatesExtractionStatusesCallback(s.content) : s.type === r.MESSAGE_TYPE_BANNER_CANDIDATES_EXTRACTION_STATUSES ? e.onGotBannerCandidatesExtractionStatusesCallback && e.onGotBannerCandidatesExtractionStatusesCallback(s.content) : s.type === r.MESSAGE_TYPE_SKIN_AD_CANDIDATES_EXTRACTION_STATUSES ? e.onGotSkinAdCandidatesExtractionStatusesCallback && e.onGotSkinAdCandidatesExtractionStatusesCallback(s.content) : s.type === r.MESSAGE_TYPE_TAB_URL_CHANGED ? e.onTabUrlChanged && e.onTabUrlChanged(s.content) : s.type === r.MESSAGE_TYPE_TAB_ADBLOCKER_STATUS_CHANGED && e.onAdBlockerStatusChanged && e.onAdBlockerStatusChanged(s.content))
                        }
                        )))
                    }
                }, {
                    key: "SendTicket",
                    value: function SendTicket(e) {
                        var t = i.EmptyMessage;
                        t.type = r.MESSAGE_TYPE_OUT_TICKET,
                        t.from = this.id,
                        t.to = "bg",
                        t.content = e,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(t, this.onTicketSend.bind(this))
                    }
                }, {
                    key: "onTicketSend",
                    value: function onTicketSend(e) {
                        e && e.status
                    }
                }], [{
                    key: "SendHiddenAdCandidatesAmount",
                    value: function SendHiddenAdCandidatesAmount(e, t) {
                        var n = i.EmptyMessage;
                        n.type = r.MESSAGE_TYPE_HIDDEN_AD_CANDIDATES_AMOUNT,
                        n.from = e,
                        n.to = "bg",
                        n.content = t,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(n)
                    }
                }, {
                    key: "SendInitMes",
                    value: function SendInitMes(e, t) {
                        var n = i.EmptyMessage;
                        n.type = r.MESSAGE_TYPE_TAB_INITIALIZATION,
                        n.to = "bg",
                        n.content = e,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(n, (function(e) {
                            e && e.config && t && t(e.config)
                        }
                        ))
                    }
                }, {
                    key: "SendSinglePageReinitMes",
                    value: function SendSinglePageReinitMes(e) {
                        var t = i.EmptyMessage;
                        t.type = r.MESSAGE_TYPE_TAB_SINGLE_PAGE_REINITIALIZATION,
                        t.to = "bg",
                        t.content = e,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(t)
                    }
                }, {
                    key: "SendNewPageCreatedTicket",
                    value: function SendNewPageCreatedTicket(e) {
                        var t = i.EmptyMessage;
                        t.type = r.MESSAGE_TYPE_NEW_PAGE_CREATED_TICKET,
                        t.to = "bg",
                        t.content = e,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(t)
                    }
                }, {
                    key: "SendPanelRegulatorResult",
                    value: function SendPanelRegulatorResult(e) {
                        var t = i.EmptyMessage;
                        t.type = r.MESSAGE_TYPE_PANEL_REGULATOR_RESULT,
                        t.to = "bg",
                        t.content = e,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(t)
                    }
                }, {
                    key: "SendMesToBackground",
                    value: function SendMesToBackground(e, t, n, r) {
                        var s = i.EmptyMessage;
                        s.type = t,
                        s.from = e,
                        s.to = "bg",
                        s.content = n,
                        o.IsOnChromeRuntime() && (r ? chrome.runtime.sendMessage(s, r) : chrome.runtime.sendMessage(s))
                    }
                }, {
                    key: "SendAdCandidates",
                    value: function SendAdCandidates(e, t, n, r) {
                        PosdContentIOManager.SendMesToBackground(e, n, t, r)
                    }
                }, {
                    key: "SendCandidatePlacementsCount",
                    value: function SendCandidatePlacementsCount(e, t, n, r) {
                        PosdContentIOManager.SendMesToBackground(e, n, t, r)
                    }
                }, {
                    key: "SendTestMes",
                    value: function SendTestMes(e, t, n) {
                        PosdContentIOManager.SendMesToBackground(e, r.MESSAGE_TYPE_TEST, t, n)
                    }
                }, {
                    key: "SendAdBlockInspectorAgentReport",
                    value: function SendAdBlockInspectorAgentReport(e, t) {
                        PosdContentIOManager.SendMesToBackground(e, r.MESSAGE_TYPE_ADBLOCK_INSPECTOR_AGENT_REPORT, t, null)
                    }
                }, {
                    key: "SendTWVideoData",
                    value: function SendTWVideoData(e, t) {
                        PosdContentIOManager.SendMesToBackground(e, r.MESSAGE_TYPE_TWITTER_VIDEO_DATA, t, null)
                    }
                }, {
                    key: "SendRedditVideoData",
                    value: function SendRedditVideoData(e, t) {
                        PosdContentIOManager.SendMesToBackground(e, r.MESSAGE_TYPE_REDDIT_VIDEO_DATA, t, null)
                    }
                }, {
                    key: "SendRedditRightColumnData",
                    value: function SendRedditRightColumnData(e, t) {
                        PosdContentIOManager.SendMesToBackground(e, r.MESSAGE_TYPE_REDDIT_RIGHT_COLUMN_DATA, t, null)
                    }
                }, {
                    key: "SendVideoHar",
                    value: function SendVideoHar(e, t) {
                        var n = i.EmptyMessage;
                        n.type = r.MESSAGE_TYPE_VIDEO_HAR,
                        n.from = e,
                        n.to = "bg",
                        n.content = t,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(n)
                    }
                }, {
                    key: "SendFBVideoData",
                    value: function SendFBVideoData(e, t) {
                        var n = i.EmptyMessage;
                        n.type = r.MESSAGE_TYPE_FACEBOOK_VIDEO_DATA,
                        n.from = e,
                        n.to = "bg",
                        n.content = t,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(n)
                    }
                }, {
                    key: "SendPinterestVideoData",
                    value: function SendPinterestVideoData(e, t) {
                        var n = i.EmptyMessage;
                        n.type = r.MESSAGE_TYPE_PINTEREST_VIDEO_DATA,
                        n.from = e,
                        n.to = "bg",
                        n.content = t,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(n)
                    }
                }, {
                    key: "SendFBInStreamData",
                    value: function SendFBInStreamData(e, t) {
                        var n = i.EmptyMessage;
                        t.encodedText = t.content,
                        t.alias = r.VIDEO_TRAFFIC_FACEBOOK_MEDIA_ALIAS_JSON,
                        t.mediaType = r.VIDEO_TRAFFIC_FACEBOOK_MEDIA_TYPE_JSON,
                        t.frameId = 0,
                        t.framesChain = [],
                        t.contentType = "json",
                        delete t.content,
                        n.type = r.MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA,
                        n.from = e,
                        n.to = "bg",
                        n.content = t,
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(n)
                    }
                }]),
                PosdContentIOManager
            }());
            e.exports = s
        }
        ,
        960: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(1225)
              , i = function() {
                function PosdContentValidator(e, t, n, r) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdContentValidator),
                    this.init = !1,
                    this.Config = r,
                    this.chainId = e,
                    this.frameId = t,
                    this.bisId = n,
                    this.documentObj = null,
                    this.onInputsDetectedCallback = null,
                    this.onRedirectsDetectedCallback = null,
                    this.detectedValidationInfo = {
                        inputs: !1,
                        redirect: !1
                    }
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdContentValidator, [{
                    key: "Init",
                    value: function Init(e, t, n) {
                        return !this.init && e && (this.init = !0,
                        this.fullIdStr = r.GetFullIdStr(this.chainId, this.frameId, this.bisId),
                        this.documentObj = e,
                        this.onInputsDetectedCallback = t,
                        this.onRedirectsDetectedCallback = n,
                        this.ValidateContent()),
                        this.init
                    }
                }, {
                    key: "ValidateContent",
                    value: function ValidateContent() {
                        this.detectedValidationInfo.inputs || this.GetInputsAmount() > 0 && (this.detectedValidationInfo.inputs = !0,
                        this.onInputsDetectedCallback && this.onInputsDetectedCallback());
                        this.detectedValidationInfo.redirect || this.HasRedirect() && (this.detectedValidationInfo.redirect = !0,
                        this.onRedirectsDetectedCallback && this.onRedirectsDetectedCallback())
                    }
                }, {
                    key: "GetInputsAmount",
                    value: function GetInputsAmount() {
                        var e = 0;
                        try {
                            var t = r.QuerySelectorAll(this.documentObj, "input");
                            t && t.length && t.forEach((function(t) {
                                var n = t.getBoundingClientRect();
                                n.width > 0 && n.height > 0 && (e += 1)
                            }
                            ))
                        } catch (e) {}
                        return e
                    }
                }, {
                    key: "IsWhiteListedRedirectionCode",
                    value: function IsWhiteListedRedirectionCode(e) {
                        var t = !1;
                        try {
                            if (e && e.length && this.Config && this.Config.GetWhitelistRedirectionCode)
                                for (var n = this.Config.GetWhitelistRedirectionCode(), r = 0; r < n.length && !t; r++)
                                    e.includes(n[r]) && (t = !0)
                        } catch (e) {}
                        return t
                    }
                }, {
                    key: "HasRedirect",
                    value: function HasRedirect() {
                        for (var e = !1, t = r.QuerySelectorAll(this.documentObj, "script"), n = 0; n < t.length && !e; n++) {
                            var i = t[n].innerHTML;
                            i.length && i.includes("location.replace") && (e = !this.IsWhiteListedRedirectionCode(i))
                        }
                        return e
                    }
                }]),
                PosdContentValidator
            }();
            e.exports = i
        }
        ,
        5106: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(4019)
              , i = n(1225)
              , o = n(1850)
              , s = n(3124)
              , a = n(8039)
              , c = n(960)
              , l = n(8185)
              , u = n(7983)
              , d = n(3177)
              , f = n(3284)
              , h = function() {
                function PosdFrameContent() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdFrameContent),
                    this.id = null,
                    this.frameId = null,
                    this.chainId = null,
                    this.fullIdStr = "",
                    this.init = !1,
                    this.chainActivated = !1,
                    this.finalFrame = !1,
                    this.activated = !1,
                    this.contentSenderTimer = null,
                    this.activationInfo = null,
                    this.IframesIO = null,
                    this.TargetUrlDetector = null,
                    this.ContentValidator = null,
                    this.VideoAds = null,
                    this.Config = null,
                    this.recheckerInterval = null,
                    this.PageUrl = document.location.href
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdFrameContent, [{
                    key: "Init",
                    value: function Init() {
                        this.init || (this.init = !0,
                        setTimeout(this.SendInitMessage.bind(this), 800))
                    }
                }, {
                    key: "SetBisStatus",
                    value: function SetBisStatus() {
                        document && document.body && document.body.setAttribute && document.body.setAttribute("bis_status", "ok")
                    }
                }, {
                    key: "RecheckBisStatus",
                    value: function RecheckBisStatus() {
                        document && document.body && document.body.getAttribute && "ok" !== document.body.getAttribute("bis_status") && this.SetBisStatus()
                    }
                }, {
                    key: "StopRechecker",
                    value: function StopRechecker() {
                        this.recheckerInterval && (clearInterval(this.recheckerInterval),
                        this.recheckerInterval = null)
                    }
                }, {
                    key: "SendInitMessage",
                    value: function SendInitMessage() {
                        var e = o.EmptyMessage;
                        e.type = s.MESSAGE_TYPE_IFRAME_INITIALIZATION,
                        e.from = this.id,
                        e.to = "bg",
                        e.content = {
                            location: document.location.href
                        },
                        i.IsOnChromeRuntime() && chrome.runtime.sendMessage(e, this.onGotInitMesResponse.bind(this))
                    }
                }, {
                    key: "onGotInitMesResponse",
                    value: function onGotInitMesResponse(e) {
                        if (e.status && "ok" === e.status && o.IsValid(e.mes) && e.mes.content.activeStatus && (this.frameId = e.mes.content.frameId,
                        this.fullIdStr = i.GetFullIdStr(this.chainId, this.frameId, this.id),
                        e.mes.content.isMaster)) {
                            this.SetBisStatus(),
                            setTimeout(this.StopRechecker.bind(this), 7e3),
                            this.recheckerInterval = setInterval(this.RecheckBisStatus.bind(this), 300),
                            this.IframesIO = new a(this.id),
                            this.IframesIO.Init(),
                            this.IframesIO.onGotChainActivationCallback = this.onGotChainActivation.bind(this),
                            this.IframesIO.onGotContentMesCallback = this.onGotContentMes.bind(this),
                            this.Config = new f(this.id,e.mes.content.configuration);
                            var t = i.IsPublisherInBlacklist(this.PageUrl, this.Config.GetBlacklistPublishers());
                            this.VideoAds = new d(this.id,this.Config,this.IframesIO,!t),
                            document && document.body && document.body.setAttribute && document.body.setAttribute("bis_frame_id", this.frameId)
                        }
                    }
                }, {
                    key: "onGotChainActivation",
                    value: function onGotChainActivation(e) {
                        e && e.headerInfo && e.headerInfo.bisId && (this.chainActivated || (this.id = e.headerInfo.bisId,
                        this.IframesIO.SetId(this.id),
                        this.chainId = e.chainId,
                        this.fullIdStr = i.GetFullIdStr(this.chainId, this.frameId, this.id),
                        this.StopRechecker(),
                        this.chainActivated = !0,
                        this.activationInfo = e,
                        this.Config || e.configEncoded && e.configEncoded.length && (this.Config = new f(this.id,e.configEncoded)),
                        this.ContentValidator = new c(this.chainId,this.frameId,this.id,this.Config),
                        this.ContentValidator.Init(document, this.onContentInputsDetected.bind(this), this.onContentRedirectsDetected.bind(this)),
                        this.TargetUrlDetector = new l(this.chainId,this.frameId,this.id,this.activationInfo.targetUrlCandidates,this.Config),
                        this.TargetUrlDetector.Init(this.IframesIO),
                        PosdFrameContent.SetBisId(document, window, this.id),
                        i.SetBisDepth(document.body, e.depth),
                        i.SetBisChainId(document.body, e.chainId),
                        this.InjectJs(),
                        this.onGotActivationMes()))
                    }
                }, {
                    key: "onGotActivationMes",
                    value: function onGotActivationMes() {
                        if (!this.activated) {
                            this.activated = !0;
                            var e = i.QuerySelectorAll(document, "iframe, frame");
                            if (e.length)
                                for (var t = 0; t < e.length; t++)
                                    if (i.SetFullSizeToElement(e[t], PosdFrameContent.GetAbsoluteCoordinates(this.activationInfo)),
                                    i.GenerateAndSetBisIdToFrame(e[t]),
                                    i.SetBisDepth(e[t], this.activationInfo.depth + 1),
                                    i.SetBisChainId(e[t], this.activationInfo.chainId),
                                    i.IsIframeHasContentScript(e[t]))
                                        PosdFrameContent.SendActivationMesToFrame(this.id, this.activationInfo.chainId, e[t], this.activationInfo.depth + 1, this.Config);
                                    else {
                                        var n = PosdFrameContent.GetInvalidChainSegmentContent(this.id, this.activationInfo.chainId, e[t], this.activationInfo.depth + 1, this.Config);
                                        PosdFrameContent.SendInvalidChainSegmentContent(this.id, n)
                                    }
                            this.TargetUrlDetector.DetectTargetUrl(1e3, this.onTargerUrlDetected.bind(this))
                        }
                    }
                }, {
                    key: "onTargerUrlDetected",
                    value: function onTargerUrlDetected() {
                        if (!this.contentSenderTimer) {
                            var e = i.GetRandomIntInRange(0, 200);
                            this.contentSenderTimer = setTimeout(this.SendContent.bind(this), e)
                        }
                    }
                }, {
                    key: "SendContent",
                    value: function SendContent() {
                        PosdFrameContent.PrepareContent(this.fullIdStr, document, PosdFrameContent.GetAbsoluteCoordinates(this.activationInfo)),
                        PosdFrameContent.RemoveInjectedJs(this.fullIdStr, document);
                        var e = document.querySelector("html").outerHTML;
                        if (e.length) {
                            var t = o.EmptyMessage;
                            t.type = s.MESSAGE_TYPE_IFRAME_CONTENT,
                            t.from = this.id,
                            t.to = "bg",
                            t.content = {
                                isValid: !0,
                                headerInfo: this.activationInfo.headerInfo,
                                contentFinal: r.encode(e),
                                targetUrl: this.TargetUrlDetector.FrameTargetUrl
                            },
                            i.IsOnChromeRuntime() && chrome.runtime.sendMessage(t, (function() {}
                            ))
                        }
                    }
                }, {
                    key: "onGotChainActivationResponse",
                    value: function onGotChainActivationResponse() {}
                }, {
                    key: "onGotContentMes",
                    value: function onGotContentMes() {}
                }, {
                    key: "onContentInputsDetected",
                    value: function onContentInputsDetected() {
                        this.IframesIO.SendInputsDetected()
                    }
                }, {
                    key: "onContentRedirectsDetected",
                    value: function onContentRedirectsDetected() {
                        this.IframesIO.SendRedirectDetected()
                    }
                }, {
                    key: "InjectJs",
                    value: function InjectJs() {
                        var e = document.createElement("script");
                        e && e.setAttribute && e.setAttribute("bis_script", "display");
                        var t = {
                            id: this.id + "_w",
                            html5TargetUrlDetectionConfig: this.Config.GetHtml5TargetUrlDetectionConfig()
                        };
                        e.innerHTML = "window.bisData = " + JSON.stringify(t) + ";" + u.GetWindowEmbeddedTargetUrlDataList.toString() + "(" + function() {
                            function GenerateQuickId() {
                                return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0, 22)
                            }
                            window.addEventListener("message", (function(e) {
                                try {
                                    var t = window.bisData.id
                                      , n = e.data;
                                    if (function IsValid(e) {
                                        return void 0 !== e && void 0 !== e.posdMessageId && void 0 !== e.from && void 0 !== e.to && void 0 !== e.type && void 0 !== e.content && e.posdMessageId && "PANELOS_MESSAGE" === e.posdMessageId
                                    }(n) && n.to === window.bisData.id)
                                        if ("GET_WINDOW_TARGET_URL" === n.type) {
                                            var r = GetWindowEmbeddedTargetUrlDataList(window.bisData.id, window, window.bisData.html5TargetUrlDetectionConfig);
                                            if (r.length) {
                                                var i = {
                                                    posdMessageId: "PANELOS_MESSAGE",
                                                    posdHash: GenerateQuickId(),
                                                    type: "GET_WINDOW_TARGET_URL_RESPOND",
                                                    from: t,
                                                    to: t.substring(0, t.length - 2),
                                                    content: r
                                                };
                                                document.body && document.body.setAttribute && document.body.setAttribute("bis_mes_to_fr", JSON.stringify(i)),
                                                e.source.postMessage && e.source.postMessage(i, e.origin)
                                            }
                                        } else if ("GET_WINDOW_CLICK_TARGET_URL" === n.type) {
                                            if (window.bisData.clickTargetUrlProcessed)
                                                return;
                                            if (function GetWindowClickTargetUrl() {
                                                if (window.bisData) {
                                                    var e = window.bisData.html5TargetUrlDetectionConfig.TARGET_URL_CLICK_ELEMENTS_SELECTOR
                                                      , t = document.querySelectorAll(e);
                                                    if (t.length) {
                                                        window.bisData.origWindowOpen = window.open,
                                                        window.bisData.elementSquare = 0,
                                                        window.bisData.clickTargetUrl = [],
                                                        window.bisData.clickTargetUrlProcessed = !1;
                                                        var n = function openCustom(e, t, n) {
                                                            return window.bisData.clickTargetUrl.push({
                                                                href: e,
                                                                square: window.bisData.elementSquare
                                                            }),
                                                            null
                                                        };
                                                        window.open = n;
                                                        for (var r = 0; r < t.length && 0 === window.bisData.clickTargetUrl.length; r++)
                                                            try {
                                                                if (t[r] && t[r].click && t[r].getBoundingClientRect) {
                                                                    var i = t[r].getBoundingClientRect();
                                                                    i.width > 40 && i.height > 40 && (window.bisData.elementSquare = i.width * i.height,
                                                                    window.open == n && t[r].click())
                                                                }
                                                            } catch (e) {}
                                                        setTimeout((function() {
                                                            window.open = window.bisData.origWindowOpen
                                                        }
                                                        ), 1e3),
                                                        window.bisData.clickTargetUrlProcessed = !0
                                                    }
                                                }
                                            }(),
                                            window.bisData && window.bisData.clickTargetUrl && window.bisData.clickTargetUrl.length) {
                                                var o = {
                                                    posdMessageId: "PANELOS_MESSAGE",
                                                    posdHash: GenerateQuickId(),
                                                    type: "GET_WINDOW_CLICK_TARGET_URL_RESPOND",
                                                    from: t,
                                                    to: t.substring(0, t.length - 2),
                                                    content: {
                                                        chainId: n.content.chainId,
                                                        clickTargetUrl: window.bisData.clickTargetUrl
                                                    }
                                                };
                                                document.body && document.body.setAttribute && document.body.setAttribute("bis_mes_to_fr", JSON.stringify(o)),
                                                e.source.postMessage && e.source.postMessage(o, e.origin)
                                            }
                                        }
                                } catch (e) {}
                            }
                            ), !1)
                        }
                        .toString() + "())",
                        document.head.appendChild(e)
                    }
                }], [{
                    key: "SetBisId",
                    value: function SetBisId(e, t, n) {
                        t && (t.bis_id = n),
                        e && (e.bis_id = n),
                        e.body && e.body.setAttribute && e.body.setAttribute("bis_body_id", n)
                    }
                }, {
                    key: "RemoveInjectedJs",
                    value: function RemoveInjectedJs(e, t) {
                        try {
                            var n = t.head.querySelectorAll("script[bis_script]");
                            if (n && n.length)
                                for (var r = 0; r < n.length; r++)
                                    n[r].remove()
                        } catch (e) {}
                    }
                }, {
                    key: "GetAbsoluteCoordinates",
                    value: function GetAbsoluteCoordinates(e) {
                        return {
                            x: e.headerInfo.size.abs_x,
                            y: e.headerInfo.size.abs_y
                        }
                    }
                }, {
                    key: "PrepareContent",
                    value: function PrepareContent(e, t, n) {
                        for (var r = i.QuerySelectorAll(t, "*:not(html):not(script):not(head):not(meta):not(link):not(title):not(style):not(param)"), o = 0; o < r.length; o++) {
                            var s = r[o];
                            if (s)
                                try {
                                    var a = !1
                                      , c = window.getComputedStyle(s).backgroundImage;
                                    if (c && c.length && "none" != c && c.includes("url") && (c = c.replace(/"/g, "'"),
                                    a = !0),
                                    s.hasAttribute("style")) {
                                        var l = s.getAttribute("style");
                                        l && s.setAttribute && (l = l.replace(/"/g, "'"),
                                        s.setAttribute("style", l),
                                        a && (s.style.cssText += "background-image: " + c + ";",
                                        s.setAttribute("bis_label", "style")))
                                    } else
                                        a && s.setAttribute && (s.setAttribute("style", "background-image: " + c + ";"),
                                        s.setAttribute("bis_label", "style"));
                                    try {
                                        if (s.attributes && s.attributes.length)
                                            for (var u = 0; u < s.attributes.length; u++)
                                                s.attributes[u] && s.attributes[u].value && s.attributes[u].value.length && "src" !== s.attributes[u].name && s.attributes[u].value.includes('"') && (s.attributes[u].value = s.attributes[u].value.replace(/"/g, "'"))
                                    } catch (e) {}
                                    i.SetFullSizeToElement(s, n)
                                } catch (e) {}
                        }
                    }
                }, {
                    key: "ExtractContent",
                    value: function ExtractContent(e, t) {
                        return t.document.querySelector("html").outerHTML
                    }
                }, {
                    key: "GetFrameHeaderInfo",
                    value: function GetFrameHeaderInfo(e, t, n) {
                        var i = {
                            depth: n,
                            chainId: e,
                            frameId: t.id,
                            src: t.src,
                            size: JSON.parse(t.getAttribute("bis_size")),
                            bisId: t.getAttribute("bis_id")
                        };
                        return 0 === n && (i.topHeaderContent = r.encode(t.outerHTML)),
                        i
                    }
                }, {
                    key: "SendActivationMesToFrame",
                    value: function SendActivationMesToFrame(e, t, n, a, c) {
                        var u = !1;
                        try {
                            var d = "";
                            if (c && c.GetConfigEncoded && (d = c.GetConfigEncoded()),
                            n) {
                                var f, h = o.EmptyMessage;
                                try {
                                    f = n.contentWindow.origin
                                } catch (e) {
                                    f = n.src
                                }
                                if (h.type = s.MESSAGE_TYPE_CHAIN_ACTIVATION,
                                h.from = e,
                                h.to = "fr",
                                h.content = {
                                    chainId: t,
                                    depth: a,
                                    headerInfo: PosdFrameContent.GetFrameHeaderInfo(t, n, a),
                                    configEncoded: d,
                                    targetUrlCandidates: []
                                },
                                i.IsIframeSecure(n))
                                    n.contentWindow && n.contentWindow.postMessage && n.contentWindow.postMessage(h, f);
                                else {
                                    try {
                                        var _ = l.DetectTargetUrlFromWindowObj(e, n.contentWindow, c);
                                        _.length && (h.content.targetUrlCandidates = _)
                                    } catch (e) {}
                                    n.contentWindow.document.body.setAttribute && n.contentWindow.document.body.setAttribute("bis_activation", r.encode(JSON.stringify(h)))
                                }
                                u = !0
                            }
                        } catch (e) {}
                        return u
                    }
                }, {
                    key: "GetInvalidChainSegmentContent",
                    value: function GetInvalidChainSegmentContent(e, t, n, o, s) {
                        var a = {}
                          , c = !1
                          , u = PosdFrameContent.GetFrameHeaderInfo(t, n, o)
                          , d = {
                            x: u.size.x,
                            y: u.size.y
                        };
                        try {
                            var f = i.QuerySelectorAll(n.contentWindow.document, "iframe, frame");
                            if (0 === f.length)
                                c = !0;
                            else {
                                c = !1;
                                for (var h = 0; h < f.length; h++)
                                    i.SetFullSizeToElement(f[h], d),
                                    i.GenerateAndSetBisIdToFrame(f[h]),
                                    i.SetBisDepth(f[h], o + 1),
                                    PosdFrameContent.SendActivationMesToFrame(e, t, f[h], o + 1, s)
                            }
                            PosdFrameContent.PrepareContent(e, n.contentWindow.document, d),
                            a.isValid = !1,
                            a.isChainCompleted = c,
                            a.headerInfo = u,
                            a.contentFinal = r.encode(PosdFrameContent.ExtractContent(e, n.contentWindow)),
                            a.targetUrl = l.DetectTargetUrlFromWindowObj(e, n.contentWindow, s)
                        } catch (e) {}
                        return a
                    }
                }, {
                    key: "SendInvalidChainSegmentContent",
                    value: function SendInvalidChainSegmentContent(e, t) {
                        if (t) {
                            var n = o.EmptyMessage;
                            n.type = s.MESSAGE_TYPE_IFRAME_INVALID_CHAIN_SEGMENT_CONTENT,
                            n.from = e,
                            n.to = "bg",
                            n.content = t,
                            i.IsOnChromeRuntime() && chrome.runtime.sendMessage(n)
                        }
                    }
                }]),
                PosdFrameContent
            }();
            e.exports = h
        }
        ,
        1674: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _assertThisInitialized(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(8962)
              , i = n(1225)
              , o = n(3124)
              , s = n(9543)
              , a = n(5106)
              , c = n(5212)
              , l = function(e) {
                function PosdHTML5Ads(e, t, n, r) {
                    var i;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdHTML5Ads),
                    (i = function _possibleConstructorReturn(e, t) {
                        return !t || "object" !== _typeof(t) && "function" != typeof t ? _assertThisInitialized(e) : t
                    }(this, _getPrototypeOf(PosdHTML5Ads).call(this, e))).Config = t,
                    i.HTML5AdsConfig = i.Config.Html5AdsConfig,
                    i.IOManager = n,
                    i.IOManager.onGotHTML5CandidatesExtractionStatusesCallback = i.onGotHTML5CandidatesExtractionStatuses.bind(_assertThisInitialized(i)),
                    i.AdBlockerAgent = r,
                    i.topFramesCandidates = [],
                    i.onDetectedCallback = null,
                    i.chainIdCounter = 0,
                    i
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdHTML5Ads, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdHTML5Ads, [{
                    key: "ActivateDetector",
                    value: function ActivateDetector() {
                        var e = this;
                        this.Activated(),
                        this.DetectHTML5AdsCandidates(),
                        setTimeout((function() {
                            e.DetectHTML5AdsCandidates()
                        }
                        ), 350),
                        setInterval((function() {
                            e.DetectHTML5AdsCandidates()
                        }
                        ), 700)
                    }
                }, {
                    key: "DetectHTML5AdsCandidates",
                    value: function DetectHTML5AdsCandidates() {
                        var e = this;
                        this.AdBlockerAgent.IsEnabled() && this.ClearHiddenCounter();
                        var t = i.QuerySelectorAll(document, this.HTML5AdsConfig.QUERIES.IFRAMES_COLLECTION)
                          , n = 0;
                        if (t.length)
                            for (var s = 0; s < t.length; s++) {
                                var a = t[s];
                                if (this.preCheckFrameContent(a)) {
                                    var l = a.src.toLowerCase();
                                    if (i.IsInFilterList(this.Config.GetBlacklistIframeSrc(), l) || i.IsInFilterList(this.Config.GetBlacklistIframeId(), a.id))
                                        i.SetFullSizeToElement(a);
                                    else if (!this.IsFrameFromSite(l) || i.IsInFilterList(this.Config.GetWhitelistCandidatesUrlKeyWords(), l)) {
                                        var u = a.getBoundingClientRect();
                                        if (u.width > 70 && u.height > 40 && u.height < 1100) {
                                            i.SetFullSizeToElement(a);
                                            var d = i.GenerateAndSetBisIdToFrame(a);
                                            this.chainIdCounter = this.chainIdCounter + 1;
                                            var f = {
                                                ticketId: this.TicketId,
                                                pageUrl: this.PageUrl,
                                                bisId: d,
                                                chainId: this.chainIdCounter,
                                                detectionTime: (new Date).getTime(),
                                                processingStartTime: null,
                                                frame: a,
                                                isSecure: i.IsIframeSecure(a),
                                                hasContentScript: i.IsIframeHasContentScript(a),
                                                status: o.CANDIDATE_PROCESS_STATUS_DETECED
                                            };
                                            this.topFramesCandidates.push(f),
                                            i.SetBisDepth(a, 0),
                                            i.SetBisChainId(a, this.chainIdCounter),
                                            n += 1,
                                            this.AdBlockerAgent.IsEnabled() && this.HideElement(a),
                                            r.CONFIG_MARK_AD_CANDIDATES && !this.AdBlockerAgent.IsEnabled() && (a.style.cssText += "border: 6px solid red !important;")
                                        }
                                    } else
                                        i.SetFullSizeToElement(a)
                                }
                            }
                        if (n > 0) {
                            c.SendCandidatePlacementsCount(this.id, n, o.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_HTML5, null);
                            for (var h = function _loop(t) {
                                e.topFramesCandidates[t].status === o.CANDIDATE_PROCESS_STATUS_DETECED && (e.topFramesCandidates[t].status = o.CANDIDATE_PROCESS_STATUS_START_PROCESSING,
                                setTimeout((function() {
                                    e.ActivateCandidateProcessing(e.topFramesCandidates[t])
                                }
                                ), 3e3 + i.GetRandomIntInRange(0, 500)))
                            }, _ = 0; _ < this.topFramesCandidates.length; _++)
                                h(_);
                            this.AdBlockerAgent.IsEnabled() && this.AdBlockerAgent.SetHiddenAmount(this.HiddenAmount)
                        }
                        return this.topFramesCandidates.length
                    }
                }, {
                    key: "preCheckFrameContent",
                    value: function preCheckFrameContent(e) {
                        if (!e.contentDocument)
                            return !0;
                        var t = e.contentDocument.querySelectorAll(this.HTML5AdsConfig.QUERIES.ACCEPTABLE_NODES_IN_IFRAME)
                          , n = e.contentDocument.querySelectorAll(this.HTML5AdsConfig.QUERIES.UNACCEPTABLE_NODES_IN_IFRAME)
                          , r = !1;
                        return t.length && !n.length && (r = !0),
                        r
                    }
                }, {
                    key: "onGotHTML5CandidatesExtractionStatuses",
                    value: function onGotHTML5CandidatesExtractionStatuses(e) {
                        if (e && e.length)
                            for (var t = 0; t < e.length; t++)
                                if (this.AdBlockerAgent.IsEnabled() && e[t].extractionStatus.filteredOut)
                                    this.UnhideElement(i.QuerySelector(document, 'iframe[bis_chainid="'.concat(e[t].chainId, '"]')));
                                else if (r.CONFIG_MARK_AD_CANDIDATES && r.CONFIG_MARK_PROCESSED_AD_CANDIDATES) {
                                    var n = i.QuerySelector(document, 'iframe[bis_chainid="'.concat(e[t].chainId, '"]'));
                                    n && i.UpdateCandidateStatusBorderColor(n, e[t].extractionStatus)
                                }
                    }
                }, {
                    key: "ActivateCandidateProcessing",
                    value: function ActivateCandidateProcessing(e) {
                        if (e && e.status && e.status === o.CANDIDATE_PROCESS_STATUS_START_PROCESSING) {
                            e.processingStartTime = (new Date).getTime(),
                            e.status = o.CANDIDATE_PROCESS_STATUS_PROCESSING_ACTIVATED;
                            var t = i.IsIframeSecure(e.frame);
                            e.isSecure !== t && (e.isSecure = t);
                            var n = i.IsIframeHasContentScript(e.frame);
                            if (e.hasContentScript !== n && (e.hasContentScript = n),
                            e.hasContentScript)
                                a.SendActivationMesToFrame(this.id, e.chainId, e.frame, 0, this.Config);
                            else {
                                var s = a.GetInvalidChainSegmentContent(this.id, e.chainId, e.frame, 0, this.Config);
                                if (r.CONFIG_MARK_AD_CANDIDATES && r.CONFIG_MARK_PROCESSED_AD_CANDIDATES && s.isChainCompleted) {
                                    var c = {
                                        fullContentExtracted: !1,
                                        targetUrlExtracted: !1,
                                        sentToBackend: !1
                                    };
                                    s.contentFinal && s.contentFinal.length && (c.fullContentExtracted = !0),
                                    s.targetUrl && s.targetUrl.length && (c.targetUrlExtracted = !0),
                                    i.UpdateCandidateStatusBorderColor(e.frame, c)
                                }
                                a.SendInvalidChainSegmentContent(this.id, s)
                            }
                        }
                    }
                }, {
                    key: "GetPrebuildInfo",
                    value: function GetPrebuildInfo() {
                        for (var e = [], t = (new Date).getTime(), n = 0; n < this.topFramesCandidates.length; n++)
                            this.topFramesCandidates[n].status === o.CANDIDATE_PROCESS_STATUS_PROCESSING_ACTIVATED && (this.topFramesCandidates[n].status = o.CANDIDATE_PROCESS_STATUS_PREBUILD_INFO_SENT,
                            e.push({
                                ticketId: this.topFramesCandidates[n].ticketId,
                                pageUrl: this.topFramesCandidates[n].pageUrl,
                                bisId: this.topFramesCandidates[n].bisId,
                                chainId: this.topFramesCandidates[n].chainId,
                                timeAfterDetection: t - this.topFramesCandidates[n].detectionTime,
                                timeAfterProcessingStart: t - this.topFramesCandidates[n].processingStartTime
                            }));
                        return e
                    }
                }, {
                    key: "IsFrameFromSite",
                    value: function IsFrameFromSite(e) {
                        var t = !1
                          , n = e;
                        if (n.length) {
                            var r = n.indexOf("?");
                            (r > 0 || (r = n.indexOf("#")) > 0) && (n = e.substring(0, r)),
                            -1 != n.indexOf(window.location.host) ? t = !0 : i.isValidUrl(n) || "about:blank" == n || (t = !0)
                        }
                        return t
                    }
                }]),
                PosdHTML5Ads
            }(s);
            e.exports = l
        }
        ,
        8039: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(1850)
              , i = n(3124)
              , o = n(1225)
              , s = n(4019)
              , a = n(5152)
              , c = function() {
                function PosdIframesIO(e) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdIframesIO),
                    this.id = e,
                    this.init = !1,
                    this.AtrMessageListeners = [],
                    this.webNavigationIframes = [],
                    this.chainActivationListernerIntervalId = null,
                    this.onWindowEmbeddedTargetUrlDetectionCallback = null,
                    this.onGotContentMesCallback = null,
                    this.onGotChainActivationCallback = null,
                    this.onGotVideoXHRTrafficCallback = null,
                    this.chainActivationEventProcessed = !1,
                    this.processedMessages = []
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdIframesIO, [{
                    key: "IsInit",
                    value: function IsInit() {
                        return this.init
                    }
                }, {
                    key: "SetId",
                    value: function SetId(e) {
                        this.id = e,
                        this.AtrMessageListener && this.AtrMessageListener.SetId(e)
                    }
                }, {
                    key: "Init",
                    value: function Init() {
                        var e = this;
                        this.init || (this.init = !0,
                        window.addEventListener("message", (function(t) {
                            try {
                                var n = t.data;
                                e.ProcessWindowMessage(n)
                            } catch (e) {}
                        }
                        ), !1),
                        o.IsOnChromeRuntime() && chrome.runtime.onMessage.addListener((function(t, n, o) {
                            var s = t;
                            r.IsValid(s) && (s.type === i.MESSAGE_TYPE_GET_FRAME_CONTENT ? s.multiTo.includes(e.id) && (e.webNavigationIframes = s.content,
                            e.onGotContentMesCallback && e.onGotContentMesCallback()) : s.type === i.MESSAGE_TYPE_TARGET_URL_DETECTION_BY_CLICK && s.multiTo.includes(e.id) && e.ActivateWindowClickTargetUrlDetection(s.content))
                        }
                        )),
                        this.chainActivationListernerIntervalId = setInterval((function() {
                            try {
                                if (!e.chainActivationEventProcessed && document && document.body) {
                                    var t = document.body.getAttribute("bis_activation");
                                    if (t && t.length) {
                                        var n = JSON.parse(s.decode(t));
                                        r.IsValid(n) && n.type === i.MESSAGE_TYPE_CHAIN_ACTIVATION && (e.chainActivationEventProcessed = !0,
                                        clearInterval(e.chainActivationListernerIntervalId),
                                        e.chainActivationListernerIntervalId = null,
                                        document.body.setAttribute("bis_activation", "done"),
                                        e.onGotChainActivationCallback && e.onGotChainActivationCallback(n.content))
                                    }
                                }
                            } catch (e) {}
                        }
                        ), 500))
                    }
                }, {
                    key: "ProcessWindowMessage",
                    value: function ProcessWindowMessage(e) {
                        r.IsValid(e) && e.posdHash && !this.processedMessages.includes(e.posdHash) && (e.posdHash && e.posdHash.length && this.processedMessages.push(e.posdHash),
                        e.type === i.MESSAGE_TYPE_CHAIN_ACTIVATION ? (this.chainActivationListernerIntervalId && (clearInterval(this.chainActivationListernerIntervalId),
                        this.chainActivationListernerIntervalId = null),
                        this.onGotChainActivationCallback && this.onGotChainActivationCallback(e.content)) : e.type === i.MESSAGE_TYPE_GET_WINDOW_TARGET_URL_RESPOND ? this.onWindowEmbeddedTargetUrlDetectionCallback && this.onWindowEmbeddedTargetUrlDetectionCallback(e.content) : e.type === i.MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL_RESPOND ? (e.to = "bg",
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(e)) : e.type === i.MESSAGE_TYPE_VIDEO_XHR_CANDIDATE && this.onGotVideoXHRTrafficCallback && this.onGotVideoXHRTrafficCallback(e.content))
                    }
                }, {
                    key: "ActivateWindowEmbeddedTargetUrlDetection",
                    value: function ActivateWindowEmbeddedTargetUrlDetection(e) {
                        try {
                            this.onWindowEmbeddedTargetUrlDetectionCallback = e;
                            var t = r.EmptyMessage;
                            t.type = i.MESSAGE_TYPE_GET_WINDOW_TARGET_URL,
                            t.from = this.id,
                            t.to = this.id + "_w",
                            window.postMessage && window.postMessage(t, "*");
                            var n = new a(this.id,this.ProcessWindowMessage.bind(this));
                            n.ActivateMesToFrameContentListener(i.MESSAGE_TYPE_GET_WINDOW_TARGET_URL_RESPOND),
                            this.AtrMessageListeners.push(n)
                        } catch (e) {}
                    }
                }, {
                    key: "ActivateWindowClickTargetUrlDetection",
                    value: function ActivateWindowClickTargetUrlDetection(e) {
                        try {
                            var t = r.EmptyMessage;
                            t.type = i.MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL,
                            t.from = this.id,
                            t.to = this.id + "_w",
                            t.content = e,
                            window.postMessage && window.postMessage(t, "*");
                            var n = new a(this.id,this.ProcessWindowMessage.bind(this));
                            n.ActivateMesToFrameContentListener(i.MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL),
                            this.AtrMessageListeners.push(n)
                        } catch (e) {}
                    }
                }, {
                    key: "SendInputsDetected",
                    value: function SendInputsDetected() {
                        var e = r.EmptyMessage;
                        e.type = i.MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_INPUTS,
                        e.from = this.id,
                        e.to = "bg",
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(e)
                    }
                }, {
                    key: "SendRedirectDetected",
                    value: function SendRedirectDetected() {
                        var e = r.EmptyMessage;
                        e.type = i.MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_REDIRECTS,
                        e.from = this.id,
                        e.to = "bg",
                        o.IsOnChromeRuntime() && chrome.runtime.sendMessage(e)
                    }
                }, {
                    key: "Context",
                    get: function get() {
                        return this
                    }
                }]),
                PosdIframesIO
            }();
            e.exports = c
        }
        ,
        4269: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(1225)
              , i = n(3124)
              , o = n(3255)
              , s = n(1828)
              , a = n(5212)
              , c = n(5733)
              , l = n(661)
              , u = n(3284)
              , d = n(353)
              , f = function() {
                function PosdMainPageContent() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdMainPageContent),
                    this.id = null,
                    this.tabId = null,
                    this.init = !1,
                    this.panalyticsId = "",
                    this.adsCandidatesDetectionInterval = null,
                    this.ticket = null,
                    this.RefreshTicket(),
                    a.SendNewPageCreatedTicket(r.ToJSON(this.ticket))
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdMainPageContent, [{
                    key: "RefreshTicket",
                    value: function RefreshTicket() {
                        this.pageUrl = document.location.href,
                        this.ticketId = r.GenerateTicketId(),
                        this.cycleNumber = 0,
                        this.ticket = o.GetSingleOutTicket(this.panalyticsId, this.ticketId, this.tabId),
                        this.init && this.AdsManager && this.AdsManager.PageRefreshed(this.pageUrl, this.ticketId)
                    }
                }, {
                    key: "Init",
                    value: function Init() {
                        this.init || a.SendInitMes({
                            ticketId: this.ticketId,
                            url: this.pageUrl
                        }, this.onGetInitConfig.bind(this))
                    }
                }, {
                    key: "onGetInitConfig",
                    value: function onGetInitConfig(e) {
                        e.activeStatus && (this.init || (this.init = !0,
                        this.tabId = e.tabId,
                        this.id = "mp_" + e.tabId,
                        this.panalyticsId = e.panalyticsId,
                        this.ticket.tabId = this.tabId,
                        this.ticket[i.TICKET_ALIAS_PANALYTICSID] = this.panalyticsId,
                        this.Config = new u(this.id,e.configuration),
                        this.IOManager = new a(this.id),
                        this.IOManager.onTabUrlChanged = this.onTabUrlChanged.bind(this),
                        this.IOManager.Init(),
                        this.AdBlockerAgent = new c(this.id,this.IOManager),
                        this.AdBlockerAgent.Init(e.adBlockerStatus, e.excludeList, e.tabId),
                        this.AdsManager = new s(this.id,this.Config,this.IOManager,this.AdBlockerAgent),
                        this.PanelsRegulator = new d(this.id),
                        this.PanelsRegulator.Init(this.AdBlockerAgent, this.onGotRegulatorRespond.bind(this)),
                        e.activeAdBlockInspectorAgent && (this.AdBlockInspectorAgent = new l(this.id),
                        this.AdBlockInspectorAgent.Init(this.Config.GetAdBlockInspectorConfig()))))
                    }
                }, {
                    key: "onGotRegulatorRespond",
                    value: function onGotRegulatorRespond(e) {
                        this.init && (e && (this.adsCandidatesDetectionInterval = setInterval(this.onAdsCandidatesDetected.bind(this), 1e4),
                        this.AdsManager.ActivateAdsdetectors(),
                        a.SendNewPageCreatedTicket(r.ToJSON(this.ticket))),
                        a.SendPanelRegulatorResult(e))
                    }
                }, {
                    key: "onTabUrlChanged",
                    value: function onTabUrlChanged(e) {
                        e && e.newUrl && e.initedTicketId && e.newUrl !== this.pageUrl && e.initedTicketId === this.ticketId && (this.RefreshTicket(),
                        a.SendSinglePageReinitMes({
                            ticketId: this.ticketId,
                            url: this.pageUrl
                        }),
                        a.SendNewPageCreatedTicket(r.ToJSON(this.ticket)))
                    }
                }, {
                    key: "onAdsCandidatesDetected",
                    value: function onAdsCandidatesDetected() {
                        this.init && (r.IsOnChromeRuntime() ? this.panalyticsId.length && (this.cycleNumber = this.cycleNumber + 1,
                        this.ticket[i.TICKET_ALIAS_PANALYTICSID] = this.panalyticsId,
                        this.ticket.windowSize = r.GetWindowSize(),
                        this.cycleNumber > 1 && (this.ticket.firstVisit = !1),
                        this.ticket.adCandidatesHtml5 = this.AdsManager.GetHtml5CandidatesPrebildInfo(),
                        this.IOManager.SendTicket(r.ToJSON(this.ticket))) : this.adsCandidatesDetectionInterval && clearInterval(this.adsCandidatesDetectionInterval))
                    }
                }]),
                PosdMainPageContent
            }();
            e.exports = f
        }
        ,
        353: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(8962)
              , i = n(3124)
              , o = n(1225)
              , s = n(4019)
              , a = function() {
                function PosdPanelsRegulator(e) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdPanelsRegulator),
                    this.id = e,
                    this.init = !1,
                    this.extensionId = "" + chrome.runtime.id,
                    this.AdBlockerAgent = null,
                    this.onInitCallback = null
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdPanelsRegulator, [{
                    key: "Init",
                    value: function Init(e, t) {
                        !this.init && e && (this.onInitCallback = t,
                        this.init = !0,
                        this.AdBlockerAgent = e,
                        document.readyState === i.DOCUMENT_READYSTATE_LOADING ? document.addEventListener("DOMContentLoaded", this.ActivateRegulator.bind(this)) : document.readyState !== i.DOCUMENT_READYSTATE_INTERACTIVE && document.readyState !== i.DOCUMENT_READYSTATE_COMPLETE || this.ActivateRegulator())
                    }
                }, {
                    key: "ActivateRegulator",
                    value: function ActivateRegulator() {
                        this.RegisterPanel(),
                        setTimeout(this.Regulate.bind(this), 500)
                    }
                }, {
                    key: "Regulate",
                    value: function Regulate() {
                        var e = !0
                          , t = ""
                          , n = [];
                        try {
                            var r = document.body.getAttribute("bis_register");
                            if (r && r.length) {
                                n = JSON.parse(s.decode(r));
                                for (var i = 0; i < n.length && 0 === t.length; i++)
                                    n[i].master && (t = n[i].extensionId);
                                t.length && this.extensionId !== t && (e = !1)
                            }
                        } catch (e) {}
                        this.onInitCallback && this.onInitCallback(e)
                    }
                }, {
                    key: "GetPanelScore",
                    value: function GetPanelScore() {
                        var e = r.CONFIG_PANELOS_VERSION.split(".")
                          , t = 1e4 * parseInt(e[0]) + 100 * parseInt(e[1]) + parseInt(e[2])
                          , n = this.AdBlockerAgent.GetStatus();
                        return o.IsFacebookUrl(document.location.href) ? n[i.ADBLOCKER_FOR_FACEBOOK] === i.ADBLOCKER_STATUS_ENABLED && (t *= 10) : o.IsTwitterUrl(document.location.href) ? n[i.ADBLOCKER_FOR_TWITTER] === i.ADBLOCKER_STATUS_ENABLED && (t *= 10) : o.IsRedditUrl(document.location.href) ? n[i.ADBLOCKER_FOR_REDDIT] === i.ADBLOCKER_STATUS_ENABLED && (t *= 10) : n[i.ADBLOCKER_FOR_DISPLAY] === i.ADBLOCKER_STATUS_ENABLED && (t *= 10),
                        t
                    }
                }, {
                    key: "UpdateRegister",
                    value: function UpdateRegister(e) {
                        for (var t = {
                            master: !0,
                            extensionId: this.extensionId,
                            adblockerStatus: this.AdBlockerAgent.GetStatus(),
                            version: r.CONFIG_PANELOS_VERSION,
                            score: this.GetPanelScore()
                        }, n = !0, i = 0; i < e.length && n; i++)
                            e[i].extensionId === this.extensionId && (n = !1,
                            e[i] = t);
                        n && e.push(t)
                    }
                }, {
                    key: "ChooseWinner",
                    value: function ChooseWinner(e) {
                        if (e && e.length)
                            if (1 === e.length)
                                ;
                            else {
                                for (var t = 0, n = e[t].score, r = 0; r < e.length; r++)
                                    e[r].master = !1,
                                    e[r].score > n && (n = e[r].score,
                                    t = r);
                                e[t].master = !0
                            }
                    }
                }, {
                    key: "RegisterPanel",
                    value: function RegisterPanel() {
                        try {
                            var e = []
                              , t = document.body.getAttribute("bis_register");
                            t && t.length && (e = JSON.parse(s.decode(t))),
                            this.UpdateRegister(e),
                            this.ChooseWinner(e),
                            document.body.setAttribute("bis_register", s.encode(JSON.stringify(e)))
                        } catch (e) {}
                    }
                }]),
                PosdPanelsRegulator
            }();
            e.exports = a
        }
        ,
        8794: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _assertThisInitialized(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(1225)
              , i = n(8962)
              , o = n(9543)
              , s = n(5212)
              , a = n(3124)
              , c = function(e) {
                function PosdSkinAds(e, t, n, r) {
                    var i;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdSkinAds),
                    (i = function _possibleConstructorReturn(e, t) {
                        return !t || "object" !== _typeof(t) && "function" != typeof t ? _assertThisInitialized(e) : t
                    }(this, _getPrototypeOf(PosdSkinAds).call(this, e))).Config = t,
                    i.skinAdsConfig = t.config.skinAdsConfig,
                    i.IOManager = n,
                    i.IOManager.onGotSkinAdCandidatesExtractionStatusesCallback = i.onGotSkinAdCandidatesExtractionStatuses.bind(_assertThisInitialized(i)),
                    i.AdBlockerAgent = r,
                    i
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdSkinAds, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdSkinAds, [{
                    key: "ActivateDetector",
                    value: function ActivateDetector() {
                        var e = this;
                        this.DetectCandidates(),
                        setTimeout((function() {
                            e.DetectCandidates()
                        }
                        ), 500),
                        setInterval((function() {
                            e.DetectCandidates()
                        }
                        ), 1e3)
                    }
                }, {
                    key: "SendCandidatesToBackground",
                    value: function SendCandidatesToBackground() {
                        this.Candidates.length && (this.AdBlockerAgent.IsEnabled() && this.AdBlockerAgent.SetHiddenAmount(this.HiddenAmount),
                        s.SendAdCandidates(this.id, this.Candidates, a.MESSAGE_TYPE_CANDIDATES_DATA_SKINADS, null))
                    }
                }, {
                    key: "DetectCandidates",
                    value: function DetectCandidates() {
                        this.AdBlockerAgent.IsEnabled() && this.ClearHiddenCounter(),
                        this.ClearCandidates(),
                        this.GetSkinAdFromBodyBackground(),
                        0 == this.CandidatesCount && this.GetSkinAdFromDivBackground(),
                        this.SendCandidatesToBackground()
                    }
                }, {
                    key: "GetSkinAdFromBodyBackground",
                    value: function GetSkinAdFromBodyBackground() {
                        var e, t = {
                            source: [],
                            targetUrl: []
                        }, n = document.body;
                        if (n && !n.hasAttribute("bis_skin_checked") && (e = r.GetUrlFromStyleStr(window.getComputedStyle(n).backgroundImage)),
                        e && r.isValidUrl(e)) {
                            n.setAttribute("bis_skin_checked", "1");
                            var i = {
                                type: "single",
                                src: e,
                                size: r.GetFullElementSize(n)
                            };
                            t.source.push(i);
                            for (var o = r.QuerySelectorAll(document, this.skinAdsConfig.QUERIES.FULL_HREF_COLLECTION), s = 0; s < o.length; s++) {
                                var a = o[s];
                                a.setAttribute && a.setAttribute("bis_skin_checked", "1");
                                var c = a.getBoundingClientRect()
                                  , l = a.firstElementChild ? a.firstElementChild.getBoundingClientRect() : null;
                                a.href && (c.width > 50 && c.height >= 100 && 0 == c.left || l && l.width > 50 && l.height >= 100 && 0 == l.left) && r.isValidUrl(a.href) && !t.targetUrl.includes(a.href) && t.targetUrl.push(a.href),
                                this.findElementsByHref(t.targetUrl, a)
                            }
                        }
                        t.source.length && t.targetUrl.length && (this.hideSkinAdElement(document),
                        this.AddCandidate(t))
                    }
                }, {
                    key: "GetSkinAdFromDivBackground",
                    value: function GetSkinAdFromDivBackground() {
                        for (var e = {
                            source: [],
                            targetUrl: []
                        }, t = !1, n = r.QuerySelectorAll(document, this.skinAdsConfig.QUERIES.FULL_DIV_COLLECTION), i = 0; i < n.length && !t; i++) {
                            if ((l = n[i]).setAttribute && l.setAttribute("bis_skin_checked", "1"),
                            (u = l.getBoundingClientRect()).width > 50 && u.height > 500 && 0 == u.left) {
                                var o = r.GetUrlFromStyleStr(window.getComputedStyle(l).backgroundImage);
                                if (o && r.isValidUrl(o)) {
                                    var s = {
                                        type: "single",
                                        src: o,
                                        size: r.GetFullElementSize(l)
                                    };
                                    e.source.push(s),
                                    t = !0,
                                    this.AdBlockerAgent.IsEnabled() && l.style && (l.style.backgroundImage = "none",
                                    this.CandidateHidden())
                                }
                            }
                        }
                        if (t)
                            for (var a = r.QuerySelectorAll(document, this.skinAdsConfig.QUERIES.FULL_HREF_COLLECTION), c = 0; c < a.length; c++) {
                                var l;
                                (l = a[c]).setAttribute && l.setAttribute("bis_skin_checked", "1");
                                var u = l.getBoundingClientRect();
                                l.href && 0 == u.left && (u.width > 50 && u.height > 500 || u.width > 500 && u.height > 50) && r.isValidUrl(l.href) && !e.targetUrl.includes(l.href) && e.targetUrl.push(l.href)
                            }
                        e.source.length && e.targetUrl.length && this.AddCandidate(e)
                    }
                }, {
                    key: "findElementsByHref",
                    value: function findElementsByHref(e, t) {
                        var n = t.href;
                        e.includes(n) && (this.SetBorderToCandidate(t),
                        this.hideSkinAdElement(t),
                        t.setAttribute("bis_skin_element", "1"))
                    }
                }, {
                    key: "hideSkinAdElement",
                    value: function hideSkinAdElement(e) {
                        this.AdBlockerAgent.IsEnabled() && (e.style && (e.style.visibility = "hidden",
                        e.style.backgroundImage = "none"),
                        e.body && e.body.style && (e.body.style.backgroundImage = "none"))
                    }
                }, {
                    key: "SetBorderToCandidate",
                    value: function SetBorderToCandidate(e) {
                        var t = e.getBoundingClientRect();
                        !this.AdBlockerAgent.IsEnabled() && e && (t.width > 1 && t.height > 1 ? e.style.cssText += "border: 6px solid red !important; display: block;" : e.firstElementChild.style.cssText += "border: 6px solid red !important; display: block;")
                    }
                }, {
                    key: "onGotSkinAdCandidatesExtractionStatuses",
                    value: function onGotSkinAdCandidatesExtractionStatuses(e) {
                        if (i.CONFIG_MARK_AD_CANDIDATES && i.CONFIG_MARK_PROCESSED_AD_CANDIDATES && e && e.length && !this.AdBlockerAgent.IsEnabled())
                            for (var t = function _loop(t) {
                                var n = r.QuerySelectorAll(document, e[t].query);
                                n && n.forEach((function(n) {
                                    n && r.UpdateCandidateStatusBorderColor(n, e[t].extractionStatus)
                                }
                                ))
                            }, n = 0; n < e.length; n++)
                                t(n)
                    }
                }]),
                PosdSkinAds
            }(o);
            e.exports = c
        }
        ,
        3255: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(8962)
              , i = n(1225)
              , o = n(3124)
              , s = function() {
                function PosdTicket() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdTicket)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdTicket, null, [{
                    key: "GetSingleOutTicket",
                    value: function GetSingleOutTicket(e, t, n) {
                        var s = {
                            tabId: n,
                            ticketFormatVersion: 3,
                            partnerId: r.CONFIG_PARTNER_ID,
                            distributorId: r.CONFIG_DISTRIBUTOR_ID,
                            ticketId: t,
                            firstVisit: !0,
                            url: document.location.href,
                            userAgent: navigator.userAgent,
                            creationTime: i.GetCurrentDataTimeStr(),
                            windowSize: i.GetWindowSize(),
                            timeOnPage: 0,
                            adCandidatesSkinAd: [],
                            adCandidatesBanner: [],
                            adCandidatesHtml5: [],
                            adsFacebook: [],
                            adsTwitter: [],
                            adsReddit: [],
                            adsPinterest: [],
                            adCandidatePlacements: {
                                skinAd: 0,
                                banner: 0,
                                html5: 0,
                                facebook: 0,
                                twitter: 0,
                                reddit: 0,
                                pinterest: 0,
                                tiktok: 0
                            },
                            videoTraffics: [],
                            activeAdBlocker: !1
                        };
                        s[o.TICKET_ALIAS_PANALYTICSID] = e,
                        s[o.TICKET_ALIAS_PINSTANCEID] = r.CONFIG_PINSTANCE_ID;
                        var a = i.GetBaseHref();
                        "" !== a && (s.base = a);
                        var c = chrome.runtime.getManifest();
                        return s.extensionVersion = c.version,
                        s.panelosVersion = r.CONFIG_PANELOS_VERSION,
                        s
                    }
                }]),
                PosdTicket
            }();
            e.exports = s
        }
        ,
        3177: (e,t,n)=>{
            function _toConsumableArray(e) {
                return function _arrayWithoutHoles(e) {
                    if (Array.isArray(e))
                        return _arrayLikeToArray(e)
                }(e) || function _iterableToArray(e) {
                    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                        return Array.from(e)
                }(e) || function _unsupportedIterableToArray(e, t) {
                    if (!e)
                        return;
                    if ("string" == typeof e)
                        return _arrayLikeToArray(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === n && e.constructor && (n = e.constructor.name);
                    if ("Map" === n || "Set" === n)
                        return Array.from(n);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return _arrayLikeToArray(e, t)
                }(e) || function _nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }
            function _arrayLikeToArray(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = new Array(t); n < t; n++)
                    r[n] = e[n];
                return r
            }
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(3124)
              , i = n(4019)
              , o = n(1225)
              , s = n(3206)
              , a = n(2714)
              , c = n(8245)
              , l = n(5212)
              , u = function() {
                function PosdVideoAds(e, t, n, r) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdVideoAds),
                    this.id = e,
                    this.Config = t,
                    this.IOManager = n,
                    this.onDetectVideoHarCallback = null,
                    this.VideoTrafficValidator = new c(this.id,this.Config),
                    this.VideoTrafficDetector = new a(this.id),
                    r && (this.VideoTrafficDetector.InjectXhrDetector(this.Config),
                    this.IOManager.onGotVideoXHRTrafficCallback = this.ProcessVideoXHRTraffic.bind(this))
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdVideoAds, [{
                    key: "ActivateDetector",
                    value: function ActivateDetector() {
                        this.CheckVideoTrafficInHTML(),
                        this.CheckVideoTrafficInJS()
                    }
                }, {
                    key: "PageRefreshed",
                    value: function PageRefreshed(e, t) {
                        this.CheckVideoTrafficInHTML(),
                        this.CheckVideoTrafficInJS()
                    }
                }, {
                    key: "CheckVideoTrafficInHTML",
                    value: function CheckVideoTrafficInHTML() {
                        var e = new s(r.VIDEO_TRAFFIC_SOURCE_HTML,"GET",window.location.href,"text/html",document.documentElement.outerHTML)
                          , t = this.VideoTrafficValidator.Validate(e);
                        t && this.SendVideoTraffic(e, t)
                    }
                }, {
                    key: "CheckVideoTrafficInJS",
                    value: function CheckVideoTrafficInJS() {
                        for (var e = o.QuerySelectorAll(document, "script"), t = 0; t < e.length; t++) {
                            var n = new s(r.VIDEO_TRAFFIC_SOURCE_JS,"GET",e[t].src,"text/javascript",e[t].innerHTML)
                              , i = this.VideoTrafficValidator.Validate(n);
                            if (i) {
                                if ("JSON_TIKTOK_FEED" === i.alias) {
                                    this.filterDataForTiktokJS(n);
                                    var a = JSON.parse(n.GetContent());
                                    if (!a.itemList.length)
                                        return;
                                    l.SendCandidatePlacementsCount(this.id, a.itemList.length, r.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_TIKTOK, null)
                                }
                                this.SendVideoTraffic(n, i)
                            }
                        }
                    }
                }, {
                    key: "ProcessVideoXHRTraffic",
                    value: function ProcessVideoXHRTraffic(e) {
                        if (s.IsXHRvalid(e)) {
                            var t = new s(r.VIDEO_TRAFFIC_SOURCE_XHR,e.requestMethod,e.url,e.type,e.content,e.encodedPostBody)
                              , n = this.VideoTrafficValidator.Validate(t);
                            if (n) {
                                if ("JSON_TIKTOK_FEED" === n.alias) {
                                    this.filterDataForTiktokXHR(t);
                                    var i = JSON.parse(t.GetContent());
                                    if (!i.itemList.length)
                                        return;
                                    l.SendCandidatePlacementsCount(this.id, i.itemList.length, r.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_TIKTOK, null)
                                }
                                this.SendVideoTraffic(t, n)
                            }
                        }
                    }
                }, {
                    key: "filterDataForTiktokJS",
                    value: function filterDataForTiktokJS(e) {
                        var t = JSON.parse(e.GetContent());
                        if (e.SetUrl("https://www.tiktok.com/api/recommend/item_list/?this=data&from=script&in=dom"),
                        t.ItemModule && "object" === _typeof(t.ItemModule)) {
                            for (var n = {
                                itemList: []
                            }, r = 0, i = Object.keys(t.ItemModule); r < i.length; r++) {
                                var o = i[r]
                                  , s = t.ItemModule[o];
                                s.adLabelVersion && 2 === parseInt(s.adLabelVersion) && n.itemList.push(s)
                            }
                            e.SetContent(JSON.stringify(n))
                        }
                    }
                }, {
                    key: "filterDataForTiktokXHR",
                    value: function filterDataForTiktokXHR(e) {
                        var t = JSON.parse(e.GetContent());
                        if (t.itemList) {
                            var n = {
                                itemList: t.itemList.filter((function(e) {
                                    if (e.adLabelVersion && 2 === parseInt(e.adLabelVersion))
                                        return e
                                }
                                ))
                            };
                            n.itemList.length || (n.itemList = []),
                            e.SetContent(JSON.stringify(n))
                        }
                    }
                }, {
                    key: "SendVideoTraffic",
                    value: function SendVideoTraffic(e, t) {
                        if (e && t) {
                            var n, r = {
                                requestMethod: e.GetRequestMethod(),
                                url: e.GetUrl(),
                                contentType: e.GetType(),
                                mediaType: t.name,
                                alias: t.alias
                            };
                            if (e.IsEncodedPostBodyExist() && "YT_MIDROLL_INFO" === t.alias && (r.encodedPostBody = i.encode(e.GetEncodedPostBody())),
                            t.reduceSizeFilter && t.reduceSizeFilter.active) {
                                if (null !== (n = c.CreateRegExp(t.reduceSizeFilter.reducePattern).exec(e.GetContent())) && n.length > 0 && Math.max.apply(Math, _toConsumableArray(t.reduceSizeFilter.regResIndexes)) < n.length) {
                                    var o = n.filter((function(e, n) {
                                        return t.reduceSizeFilter.regResIndexes.includes(n)
                                    }
                                    ));
                                    r.encodedText = i.encode(o.join(" "))
                                }
                            } else
                                r.encodedText = i.encode(e.GetContent());
                            l.SendVideoHar(this.id, r)
                        }
                    }
                }]),
                PosdVideoAds
            }();
            e.exports = u
        }
        ,
        3206: e=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var t = function() {
                function PosdVideoTraffic(e, t, n, r, i) {
                    var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null;
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdVideoTraffic),
                    this.trafficSource = e,
                    this.requestMethod = t,
                    this.url = n,
                    this.type = r,
                    this.content = i,
                    this.setEncodedPostBody(o)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdVideoTraffic, [{
                    key: "setEncodedPostBody",
                    value: function setEncodedPostBody(e) {
                        e && "string" == typeof e && e.length > 0 && (this.encodedPostBody = e)
                    }
                }, {
                    key: "GetEncodedPostBody",
                    value: function GetEncodedPostBody() {
                        return this.encodedPostBody ? this.encodedPostBody : null
                    }
                }, {
                    key: "IsEncodedPostBodyExist",
                    value: function IsEncodedPostBodyExist() {
                        return !!this.encodedPostBody
                    }
                }, {
                    key: "GetTrafficSource",
                    value: function GetTrafficSource() {
                        return this.trafficSource
                    }
                }, {
                    key: "GetRequestMethod",
                    value: function GetRequestMethod() {
                        return this.requestMethod
                    }
                }, {
                    key: "GetUrl",
                    value: function GetUrl() {
                        return this.url
                    }
                }, {
                    key: "GetType",
                    value: function GetType() {
                        return this.type
                    }
                }, {
                    key: "GetContent",
                    value: function GetContent() {
                        return this.content
                    }
                }, {
                    key: "SetContent",
                    value: function SetContent(e) {
                        this.content = e
                    }
                }, {
                    key: "SetUrl",
                    value: function SetUrl(e) {
                        this.url = e
                    }
                }], [{
                    key: "IsXHRvalid",
                    value: function IsXHRvalid(e) {
                        return e && e.hasOwnProperty("requestMethod") && e.hasOwnProperty("url") && "" !== e.url
                    }
                }]),
                PosdVideoTraffic
            }();
            e.exports = t
        }
        ,
        2714: e=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var t = function() {
                function PosdVideoTrafficDetector(e) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdVideoTrafficDetector),
                    this.id = e
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdVideoTrafficDetector, [{
                    key: "InjectXhrDetector",
                    value: function InjectXhrDetector(e) {
                        var t = document.createElement("script");
                        t.innerHTML = "(".concat(function inject(e) {
                            function SendXHRCandidate(e, t, n, r, i) {
                                try {
                                    var o = "detector"
                                      , s = {
                                        posdMessageId: "PANELOS_MESSAGE",
                                        posdHash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0, 22),
                                        type: "VIDEO_XHR_CANDIDATE",
                                        from: o,
                                        to: o.substring(0, 6),
                                        content: {
                                            requestMethod: e,
                                            url: t,
                                            type: n,
                                            content: r
                                        }
                                    };
                                    i && i[0] && i[0].length && (s.content.encodedPostBody = i[0]),
                                    window.postMessage(s, "*")
                                } catch (e) {}
                            }
                            var t = XMLHttpRequest.prototype.open;
                            XMLHttpRequest.prototype.open = function() {
                                this.requestMethod = arguments[0],
                                t.apply(this, arguments)
                            }
                            ;
                            var n = XMLHttpRequest.prototype.send;
                            XMLHttpRequest.prototype.send = function() {
                                var t = Object.assign(arguments, {})
                                  , r = this.onreadystatechange;
                                return this.onreadystatechange = function() {
                                    if (4 !== this.readyState || function isFrameInBlackList(t) {
                                        return e.some((function(e) {
                                            return t.includes(e)
                                        }
                                        ))
                                    }(this.responseURL) || setTimeout(SendXHRCandidate(this.requestMethod, this.responseURL, this.getResponseHeader("content-type"), this.response, t), 0),
                                    r)
                                        return r.apply(this, arguments)
                                }
                                ,
                                n.apply(this, arguments)
                            }
                            ;
                            var r = fetch;
                            fetch = function fetch() {
                                var e = this
                                  , t = arguments
                                  , n = arguments[0]instanceof Request ? arguments[0].url : arguments[0]
                                  , i = arguments[0]instanceof Request ? arguments[0].method : "GET";
                                return new Promise((function(o, s) {
                                    r.apply(e, t).then((function(e) {
                                        if (e.body instanceof ReadableStream) {
                                            var t = e.json;
                                            e.json = function() {
                                                var r = arguments
                                                  , o = this;
                                                return new Promise((function(s, a) {
                                                    t.apply(o, r).then((function(t) {
                                                        setTimeout(SendXHRCandidate(i, n, e.headers.get("content-type"), JSON.stringify(t)), 0),
                                                        s(t)
                                                    }
                                                    )).catch((function(e) {
                                                        a(e)
                                                    }
                                                    ))
                                                }
                                                ))
                                            }
                                            ;
                                            var r = e.text;
                                            e.text = function() {
                                                var t = arguments
                                                  , o = this;
                                                return new Promise((function(s, a) {
                                                    r.apply(o, t).then((function(t) {
                                                        setTimeout(SendXHRCandidate(i, n, e.headers.get("content-type"), t), 0),
                                                        s(t)
                                                    }
                                                    )).catch((function(e) {
                                                        a(e)
                                                    }
                                                    ))
                                                }
                                                ))
                                            }
                                        }
                                        o.apply(this, arguments)
                                    }
                                    )).catch((function() {
                                        s.apply(this, arguments)
                                    }
                                    ))
                                }
                                ))
                            }
                        }
                        .toString(), ")(").concat(JSON.stringify(e.config.blacklistIframeSrc), ");"),
                        document.head && document.head.appendChild(t)
                    }
                }]),
                PosdVideoTrafficDetector
            }();
            e.exports = t
        }
        ,
        8245: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(3124)
              , i = function() {
                function PosdVideoTrafficValidator(e, t) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdVideoTrafficValidator),
                    this.id = e,
                    this.Config = t
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdVideoTrafficValidator, [{
                    key: "Validate",
                    value: function Validate(e) {
                        var t = []
                          , n = !1;
                        if (e && (e.GetTrafficSource() === r.VIDEO_TRAFFIC_SOURCE_HTML ? (t = this.Config.GetVideoValidatorsForHTML(),
                        n = !0) : e.GetTrafficSource() === r.VIDEO_TRAFFIC_SOURCE_XHR ? (t = this.Config.GetVideoValidatorsForXHR(),
                        n = !0) : e.GetTrafficSource() === r.VIDEO_TRAFFIC_SOURCE_JS && (t = this.Config.GetVideoValidatorsForJS(),
                        n = !0),
                        n)) {
                            var i = !0
                              , o = !1
                              , s = void 0;
                            try {
                                for (var a, c = t[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                    var l = a.value;
                                    if (this.ValidateUseConfiguration(e, l))
                                        return l
                                }
                            } catch (e) {
                                o = !0,
                                s = e
                            } finally {
                                try {
                                    i || null == c.return || c.return()
                                } finally {
                                    if (o)
                                        throw s
                                }
                            }
                        }
                        return !1
                    }
                }, {
                    key: "ValidateUseConfiguration",
                    value: function ValidateUseConfiguration(e, t) {
                        for (var n = [], r = 0, i = Object.keys(t); r < i.length; r++) {
                            var o = i[r];
                            -1 !== o.indexOf("Pattern") && n.push(o)
                        }
                        for (var s = 0, a = {
                            domainPattern: "GetUrl",
                            mimePattern: "GetType",
                            contentPattern: "GetContent"
                        }, c = 0, l = n; c < l.length; c++) {
                            var u = l[c];
                            try {
                                var d = PosdVideoTrafficValidator.CreateRegExp(t[u])
                                  , f = a[u];
                                s += d.test(e[f]()) ? 1 : 0
                            } catch (e) {}
                        }
                        return s === n.length
                    }
                }], [{
                    key: "CreateRegExp",
                    value: function CreateRegExp(e) {
                        var t = e.replace(/.*\/([gimy]*)$/, "$1")
                          , n = e.replace(new RegExp("^/(.*?)/" + t + "$"), "$1");
                        return new RegExp(n,t)
                    }
                }]),
                PosdVideoTrafficValidator
            }();
            e.exports = i
        }
        ,
        1029: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(1225)
              , i = n(3124)
              , o = function() {
                function PosdAdDetector(e, t, n) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdAdDetector),
                    this.id = e,
                    this.options = t,
                    this.AdBlockerAgent = n,
                    this.active = !1,
                    this.lastDetectTime = r.GetCurrentTimestampMs() - 1e3,
                    this.activateDetectorTime = r.GetCurrentTimestampMs(),
                    this.detectorInterval = null,
                    this.observerNodesListenerInterval = null,
                    this.observerNodesChecksAmount = 0
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdAdDetector, [{
                    key: "ActualizeDetector",
                    value: function ActualizeDetector() {}
                }, {
                    key: "ActivateMutationObserver",
                    value: function ActivateMutationObserver() {}
                }, {
                    key: "DeactivateMutationObserver",
                    value: function DeactivateMutationObserver() {}
                }, {
                    key: "Detector",
                    value: function Detector() {}
                }, {
                    key: "HideAd",
                    value: function HideAd(e, t, n) {}
                }, {
                    key: "CheckIfAd",
                    value: function CheckIfAd(e) {}
                }, {
                    key: "CheckIfAdRendered",
                    value: function CheckIfAdRendered(e) {}
                }, {
                    key: "ExtractAd",
                    value: function ExtractAd(e) {}
                }, {
                    key: "ActivateDetector",
                    value: function ActivateDetector() {
                        var e = this;
                        this.active || (this.activateDetectorTime = r.GetCurrentTimestampMs(),
                        this.active = !0,
                        this.options.firstDetectionAfterActivationTimeoutMs && this.options.firstDetectionAfterActivationTimeoutMs > 0 && setTimeout((function() {
                            e.DetectCandidates(i.AD_DETECTOR_INITIATOR_ACTIVATION)
                        }
                        ), this.options.firstDetectionAfterActivationTimeoutMs),
                        this.options.secondDetectionAfterActivationTimeoutMs && this.options.secondDetectionAfterActivationTimeoutMs > 0 && setTimeout((function() {
                            e.DetectCandidates(i.AD_DETECTOR_INITIATOR_ACTIVATION)
                        }
                        ), this.options.secondDetectionAfterActivationTimeoutMs),
                        this.detectorInterval = setInterval((function() {
                            e.DetectCandidates(i.AD_DETECTOR_INITIATOR_TIMER)
                        }
                        ), this.options.detectionIntervalMs),
                        this.options.useObserver && (this.observerNodesListenerInterval = setInterval((function() {
                            e.observerNodesChecksAmount = e.observerNodesChecksAmount + 1,
                            (e.ActivateMutationObserver() || e.observerNodesChecksAmount > e.options.observerNodesChecksMaxAmount) && (clearInterval(e.observerNodesListenerInterval),
                            e.observerNodesListenerInterval = null,
                            e.observerNodesChecksAmount = 0)
                        }
                        ), this.options.observerNodesCheckIntervalMs)))
                    }
                }, {
                    key: "DeactivateDetector",
                    value: function DeactivateDetector() {
                        this.DeactivateMutationObserver(),
                        this.detectorInterval && (clearInterval(this.detectorInterval),
                        this.detectorInterval = null),
                        this.observerNodesListenerInterval && (clearInterval(this.observerNodesListenerInterval),
                        this.observerNodesListenerInterval = null,
                        this.observerNodesChecksAmount = 0),
                        this.active = !1
                    }
                }, {
                    key: "DetectCandidates",
                    value: function DetectCandidates(e) {
                        if (this.IsActualByKeyWordInUrl && this.ActualizeDetector()) {
                            var t = r.GetCurrentTimestampMs();
                            t - this.lastDetectTime > this.options.minTimeAfterLastDetectionMs && (this.lastDetectTime = t,
                            this.Detector())
                        } else
                            this.options.maxActualizeDetectorWaitTimeMs && r.GetCurrentTimestampMs() - this.activateDetectorTime > this.options.maxActualizeDetectorWaitTimeMs && this.DeactivateDetector()
                    }
                }, {
                    key: "IsActualByKeyWordInUrl",
                    get: function get() {
                        return !this.options.urlValidationByKeyWord || !this.options.urlValidationByKeyWord.length || window.location.href.includes(this.options.urlValidationByKeyWord)
                    }
                }]),
                PosdAdDetector
            }();
            e.exports = o
        }
        ,
        9780: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(8962)
              , i = n(1225)
              , o = n(4019)
              , s = n(3124)
              , a = n(9543)
              , c = n(5212)
              , l = n(3153)
              , u = n(8945)
              , d = n(555)
              , f = n(9317)
              , h = n(2757)
              , _ = n(7207)
              , A = function(e) {
                function PosdFacebookAds(e, t, n, r) {
                    var i;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdFacebookAds),
                    (i = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookAds).call(this, e))).available = !1,
                    i.onPageRefreshed = i.onPageUrlChanged,
                    i.fbConfig = t.GetFacebookConfig(),
                    i.IOManager = n,
                    i.AdBlockerAgent = r,
                    i.designVersion = null,
                    i
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdFacebookAds, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdFacebookAds, [{
                    key: "onPageUrlChanged",
                    value: function onPageUrlChanged(e, t) {
                        var n = this;
                        this.available && setTimeout((function() {
                            n.DeactivateDetectors(),
                            n.ActivateDetectors()
                        }
                        ), 50)
                    }
                }, {
                    key: "ActivateDetector",
                    value: function ActivateDetector(e) {
                        e === s.ACTIVATION_BY_ADS_MANAGER && (this.available = !0),
                        this.fbContent = document.querySelector(this.fbConfig.FB_CONTENT),
                        this.fbContent && (this.VideoTrafficDetector = new _(this.id),
                        this.VideoTrafficDetector.InjectDetector(this.id + "_w", JSON.stringify(this.fbConfig.videoDetectorConfigNew)),
                        this.DetectorRightColumn = new f(this.id,this.fbConfig.optionsForDetectorRightColumn,this.AdBlockerAgent,this.fbConfig),
                        this.DetectorRightColumn.HideAd = this.HideAd.bind(this),
                        this.DetectorRightColumn.CheckIfAdRendered = this.IsAdContentRendered.bind(this),
                        this.DetectorRightColumn.ExtractAd = this.ProcessFbCreative.bind(this),
                        this.DetectorFeed = new u(this.id,this.fbConfig.optionsForDetectorFeed,this.AdBlockerAgent,this.fbConfig),
                        this.DetectorFeed.HideAd = this.HideAd.bind(this),
                        this.DetectorFeed.CheckIfAdRendered = this.IsAdContentRendered.bind(this),
                        this.DetectorFeed.ExtractAd = this.ProcessFbCreative.bind(this),
                        this.DetectorWatch = new d(this.id,this.fbConfig.optionsForDetectorWatch,this.AdBlockerAgent,this.fbConfig),
                        this.DetectorWatch.HideAd = this.HideAd.bind(this),
                        this.DetectorWatch.CheckIfAdRendered = this.IsAdContentRendered.bind(this),
                        this.DetectorWatch.ExtractAd = this.ProcessFbCreative.bind(this),
                        this.DetectorMarketplace = new h(this.id,this.fbConfig.optionsForDetectorMarketplace,this.AdBlockerAgent,this.fbConfig),
                        this.DetectorMarketplace.HideAd = this.HideAd.bind(this),
                        this.DetectorMarketplace.CheckIfAdRendered = this.IsAdContentRendered.bind(this),
                        this.DetectorMarketplace.ExtractAd = this.ProcessFbCreative.bind(this),
                        this.ActivateDetectors())
                    }
                }, {
                    key: "ActivateDetectors",
                    value: function ActivateDetectors() {
                        this.DetectorRightColumn.ActivateDetector(),
                        this.DetectorFeed.ActivateDetector(),
                        this.DetectorWatch.ActivateDetector(),
                        this.DetectorMarketplace.ActivateDetector()
                    }
                }, {
                    key: "DeactivateDetectors",
                    value: function DeactivateDetectors() {
                        this.DetectorRightColumn.DeactivateDetector(),
                        this.DetectorFeed.DeactivateDetector(),
                        this.DetectorWatch.DeactivateDetector(),
                        this.DetectorMarketplace.DeactivateDetector()
                    }
                }, {
                    key: "ProcessFbCreative",
                    value: function ProcessFbCreative(e, t, n) {
                        try {
                            var o = !1;
                            if (e) {
                                var a = document.querySelector("[".concat(s.ATTRIBUTE_BIS_ID, "=").concat(e, "]"));
                                if (a)
                                    if (!0,
                                    this.IsAdContentRendered(a, l.GetMinImgsSpacePercentag(this.fbConfig, n))) {
                                        o = this.IsVideoCreative(a),
                                        c.SendCandidatePlacementsCount(this.id, 1, s.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_FACEBOOK, null);
                                        var u = {
                                            x: 0,
                                            y: 0
                                        };
                                        if (l.IsPostHidden(a)) {
                                            a.setAttribute(s.ATTRIBUTE_BIS_SIZE, i.ToJSON(l.GetPostContainerSize(a)));
                                            var d = a.getAttribute(s.ATTRIBUTE_BIS_HIDE_LEFT_OFFSET);
                                            d && (u.x = parseInt(d))
                                        } else
                                            i.SetFullSizeToElement(a);
                                        for (var f = a.querySelectorAll("*"), h = 0; h < f.length; h++)
                                            i.SetFullSizeToElement(f[h], null, u);
                                        var _ = [];
                                        _.push(this.BuildCreative(a, o, t, n)),
                                        this.fbConfig.ABOUT_SECTION_CONFIG && this.fbConfig.ABOUT_SECTION_CONFIG.LOAD_ABOUT_PAGE ? this.LoadAboutPageAndSendCandidates(_) : this.SendFacebookCandidates(_),
                                        r.CONFIG_MARK_AD_CANDIDATES && r.CONFIG_MARK_PROCESSED_AD_CANDIDATES && (this.IsVideoCreative(a) ? a.style.cssText += s.STYLES_OUTLINE_VIDEO_AD : a.style.cssText += s.STYLES_OUTLINE_SUCCESS_DETECT)
                                    } else
                                        a.removeAttribute && a.removeAttribute(s.ATTRIBUTE_BIS_ID)
                            }
                        } catch (e) {}
                    }
                }, {
                    key: "BuildCreative",
                    value: function BuildCreative(e, t, n, r) {
                        var i = l.GetPostContainerSize(e)
                          , a = Array.from(document.querySelectorAll("link"))
                          , c = Array.from(document.querySelector("head").querySelectorAll("style[nonce]"))
                          , u = a.concat(c)
                          , d = '<html><head><meta charset="utf-8">'
                          , f = !0
                          , h = !1
                          , _ = void 0;
                        try {
                            for (var A, E = u[Symbol.iterator](); !(f = (A = E.next()).done); f = !0) {
                                d += A.value.outerHTML
                            }
                        } catch (e) {
                            h = !0,
                            _ = e
                        } finally {
                            try {
                                f || null == E.return || E.return()
                            } finally {
                                if (h)
                                    throw _
                            }
                        }
                        if (d += "</head><body style='position:absolute; top:0px; left:0px; width:".concat(i.w, "px; height:").concat(i.h, "px;'>").concat(e.outerHTML, "</body></html>"),
                        this.AdBlockerAgent.IsEnabledForFacebook() && n && n.length && d.includes(n)) {
                            d = d.replace(n, "")
                        }
                        var T = ""
                          , g = !1;
                        this.fbConfig.ABOUT_SECTION_CONFIG && this.fbConfig.ABOUT_SECTION_CONFIG.LOAD_ABOUT_PAGE && (g = !0),
                        this.fbConfig && g && (this.DetectorFeed && r === s.FACEBOOK_AD_PLACEMENT_TYPE_FEED ? T = this.DetectorFeed.GetAboutPageLink(e) : this.DetectorMarketplace && r === s.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE ? T = this.DetectorMarketplace.GetAboutPageLink(e) : this.DetectorWatch && r === s.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH && (T = this.DetectorWatch.GetAboutPageLink(e)));
                        var p = {
                            content: o.encode(d),
                            adPlacementType: r,
                            designVersion: s.FACEBOOK_DESIGN_VERSION_NEW,
                            aboutPageLink: T,
                            aboutSectionContent: "",
                            size: i
                        };
                        return t && (p.videoData = {
                            videoId: "",
                            videoUrl: "",
                            audioUrl: ""
                        }),
                        e.setAttribute(s.ATTRIBUTE_BIS_STATUS, "extracted"),
                        p
                    }
                }, {
                    key: "HideAd",
                    value: function HideAd(e, t, n) {
                        var r = "";
                        return e && t && e && e.style && (r = "position: absolute !important; width: ".concat(t.w, "px; overflow: hidden; height: 0px;"),
                        l.IsPostHidden(e) || (e.style.cssText += r,
                        e.setAttribute(s.ATTRIBUTE_BIS_HIDE_HEIGHT, t.h),
                        e.setAttribute(s.ATTRIBUTE_BIS_HIDE_WIDTH, t.w),
                        e.setAttribute(s.ATTRIBUTE_BIS_HIDE_STATUS, "hidden"))),
                        e.style.cssText
                    }
                }, {
                    key: "IsAdContentRendered",
                    value: function IsAdContentRendered(e, t) {
                        var n = l.GetPostContainerSize(e);
                        if (i.GetImagesSpacePercentage(this.fbConfig.TAGS_FOR_LOADING_CHECK, e, n) >= t)
                            return !0;
                        var r = e.querySelector("a[".concat(s.ATTRIBUTE_BIS_LABEL, "]"));
                        return r && r.removeAttribute(s.ATTRIBUTE_BIS_LABEL),
                        !1
                    }
                }, {
                    key: "IsVideoCreative",
                    value: function IsVideoCreative(e) {
                        return 0 !== e.querySelectorAll("video").length
                    }
                }, {
                    key: "AddNeededStylesForElement",
                    value: function AddNeededStylesForElement(e, t) {
                        try {
                            if (t.w <= 3 && t.h <= 3 && ("SPAN" === e.nodeName || "DIV" === e.nodeName)) {
                                var n = e.getAttribute("class");
                                if (n && n.includes("accessible_elem")) {
                                    var r = getComputedStyle(e);
                                    e.setAttribute(s.ATTRIBUTE_BIS_STYLE, "clip:".concat(r.getPropertyValue("clip"), "; height:").concat(r.getPropertyValue("height"), "; overflow:").concat(r.getPropertyValue("overflow"), "; position:").concat(r.getPropertyValue("position"), "; white-space:").concat(r.getPropertyValue("white-space"), "; width:").concat(r.getPropertyValue("width"), ";"))
                                }
                            }
                        } catch (e) {}
                    }
                }, {
                    key: "LoadAboutPageAndSendCandidates",
                    value: function LoadAboutPageAndSendCandidates(e) {
                        var t = this;
                        if (e && e.length) {
                            var n = e[0].aboutPageLink;
                            n && n.length ? fetch(n, {
                                headers: this.fbConfig.ABOUT_SECTION_CONFIG.HEADERS,
                                method: "GET"
                            }).then((function(n) {
                                try {
                                    if (200 === n.status)
                                        return n.text();
                                    t.SendFacebookCandidates(e)
                                } catch (e) {}
                            }
                            )).then((function(n) {
                                var r = ""
                                  , i = n.split(/\r?\n/);
                                if (i.length)
                                    for (var s = 0; s < i.length && !r.length; s++) {
                                        new RegExp(t.fbConfig.ABOUT_SECTION_CONFIG.CONTENT_CHECK_STRING).test(i[s]) && (r = i[s])
                                    }
                                e[0].aboutSectionContent = o.encode(r),
                                t.SendFacebookCandidates(e)
                            }
                            )).catch((function(n) {
                                t.SendFacebookCandidates(e)
                            }
                            )) : this.SendFacebookCandidates(e)
                        }
                    }
                }, {
                    key: "SendFacebookCandidates",
                    value: function SendFacebookCandidates(e) {
                        c.SendAdCandidates(this.id, e, s.MESSAGE_TYPE_CANDIDATES_DATA_FACEBOOK, null),
                        this.AdBlockerAgent.IsEnabledForFacebook() && this.AdBlockerAgent.SetHiddenAmount(e.length)
                    }
                }]),
                PosdFacebookAds
            }(a);
            e.exports = A
        }
        ,
        3153: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(3124)
              , i = n(1225)
              , o = function() {
                function PosdFacebookCommon() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdFacebookCommon)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdFacebookCommon, null, [{
                    key: "GetVisibleText",
                    value: function GetVisibleText(e) {
                        var t = e.querySelectorAll(":scope > *");
                        if (0 !== t.length)
                            return Array.prototype.slice.call(t).map(PosdFacebookCommon.GetVisibleText).flat();
                        if ("none" !== getComputedStyle(e).display) {
                            var n = e.innerText;
                            try {
                                if (0 === n.length && e.getAttribute) {
                                    var r = e.getAttribute("data-content");
                                    r && r.length && (n = r)
                                }
                            } catch (e) {}
                            return n
                        }
                        return ""
                    }
                }, {
                    key: "GetVisibleSpansText",
                    value: function GetVisibleSpansText(e, t) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                        if (e.hasAttribute && e.hasAttribute("bis_sponsor_checked") && 2 == e.getAttribute("bis_sponsor_checked"))
                            return "";
                        var r = e.querySelectorAll(t)
                          , i = ""
                          , o = parseInt(e.getAttribute("bis_sponsor_checked")) || 0;
                        return r.forEach((function(e) {
                            var t = getComputedStyle(e);
                            if ("none" !== t.display && "absolute" !== t.position)
                                try {
                                    var n = Array.from(e.childNodes).filter((function(e) {
                                        return 3 === e.nodeType
                                    }
                                    )).map((function(e) {
                                        return e.nodeValue.trim()
                                    }
                                    )).reduce((function(e, t) {
                                        return e + t
                                    }
                                    ), "");
                                    if (0 === n.length && e.getAttribute) {
                                        var r = e.getAttribute("data-content");
                                        r && r.length && (n = r)
                                    }
                                    i += n
                                } catch (e) {}
                        }
                        )),
                        e.setAttribute("bis_sponsor_checked", parseInt(o) + 1),
                        i && n.length && !n.includes(i) && (i = this.checkLettersOfAlly(i, n)),
                        i
                    }
                }, {
                    key: "checkLettersOfAlly",
                    value: function checkLettersOfAlly(e, t) {
                        for (var n = e.split(""), r = n.length - 1, i = t.length, o = 1, s = !1, a = 0, c = ""; !s && o <= i; ) {
                            var l = t[o - 1]
                              , u = n[a];
                            -1 !== l.indexOf(u) && l.length === n.length ? r !== a ? a += 1 : r === a && e.length === l.length ? (s = !0,
                            c = l) : (o += 1,
                            a = 0) : (o += 1,
                            a = 0)
                        }
                        return c
                    }
                }, {
                    key: "HideSateliteSponsoredString",
                    value: function HideSateliteSponsoredString(e, t) {
                        try {
                            t && t.forEach((function(t) {
                                if (t.innerText) {
                                    var n = t.innerText;
                                    e.SPONSORED_TEXTS.some((function(e) {
                                        return -1 !== n.indexOf(e)
                                    }
                                    )) && (t.style.cssText += "visibility: hidden; z-index: -99999999;")
                                }
                            }
                            ))
                        } catch (e) {}
                    }
                }, {
                    key: "GetMinImgsSpacePercentag",
                    value: function GetMinImgsSpacePercentag(e, t) {
                        return t === r.FACEBOOK_AD_PLACEMENT_TYPE_FEED ? e.FEED_PAGE.MIN_IMGS_SPACE_PERCENTAGE : t === r.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE ? e.MARKETPLACE_ADS_CONFIG.MIN_IMGS_SPACE_PERCENTAGE : t === r.FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN ? e.RIGHT_COLUMN_ADS_CONFIG.MIN_IMGS_SPACE_PERCENTAGE : t === r.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH ? e.FEED_WATCH_PAGE.MIN_IMGS_SPACE_PERCENTAGE : 0
                    }
                }, {
                    key: "IsInitiallyRendered",
                    value: function IsInitiallyRendered(e, t) {
                        return !!PosdFacebookCommon.IsPostHidden(e) || t.w > 0 && t.h > 10
                    }
                }, {
                    key: "IsPostHidden",
                    value: function IsPostHidden(e) {
                        return "hidden" === e.getAttribute(r.ATTRIBUTE_BIS_HIDE_STATUS)
                    }
                }, {
                    key: "GetPostContainerSize",
                    value: function GetPostContainerSize(e) {
                        var t = i.GetFullElementSize(e);
                        if (PosdFacebookCommon.IsPostHidden(e)) {
                            var n = e.getAttribute(r.ATTRIBUTE_BIS_HIDE_HEIGHT);
                            n && (t.h = parseInt(n));
                            var o = e.getAttribute(r.ATTRIBUTE_BIS_HIDE_WIDTH);
                            o && (t.w = parseInt(o));
                            var s = e.getAttribute(r.ATTRIBUTE_BIS_HIDE_LEFT_OFFSET);
                            s && (t.x = t.x + parseInt(s),
                            t.abs_x = t.abs_x + parseInt(s))
                        }
                        return t
                    }
                }]),
                PosdFacebookCommon
            }();
            e.exports = o
        }
        ,
        8945: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(1029)
              , i = n(3153)
              , o = n(1225)
              , s = n(3124)
              , a = function(e) {
                function PosdFacebookFeed(e, t, n, r, i) {
                    var o;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdFacebookFeed),
                    (o = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookFeed).call(this, e, t, n))).fbConfig = r,
                    o.designVersion = i,
                    o.fbFeed = null,
                    o.fbFeedObserver = null,
                    o
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdFacebookFeed, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdFacebookFeed, [{
                    key: "ActualizeDetector",
                    value: function ActualizeDetector() {
                        if (this.isValidUrl) {
                            var e = !1;
                            return this.FeedContainer && this.isValidUrl && (e = !0),
                            e
                        }
                    }
                }, {
                    key: "ActivateMutationObserver",
                    value: function ActivateMutationObserver() {
                        var e = this;
                        if (this.isValidUrl)
                            return this.fbFeed = this.FeedContainer,
                            this.fbFeed && (this.fbFeedObserver || (this.fbFeedObserver = new MutationObserver(this.DetectCandidates.bind(this, s.AD_DETECTOR_INITIATOR_MUTATION)),
                            this.fbFeedObserver.observe(this.fbFeed, {
                                childList: !0,
                                subtree: !0
                            }),
                            window.addEventListener("beforeunload", (function() {
                                e.fbFeedObserver && (e.fbFeedObserver.disconnect(),
                                e.fbFeedObserver = null)
                            }
                            )))),
                            this.fbFeedObserver
                    }
                }, {
                    key: "DeactivateMutationObserver",
                    value: function DeactivateMutationObserver() {
                        this.fbFeedObserver && (this.fbFeedObserver.disconnect(),
                        this.fbFeedObserver = null)
                    }
                }, {
                    key: "Detector",
                    value: function Detector() {
                        if (this.isValidUrl) {
                            var e = this.FeedContainer;
                            if (e) {
                                var t = Array.from(e.children);
                                if (t.length && 1 !== t.length || (t = document.querySelectorAll(this.fbConfig.FEED_PAGE.POSTS_QUERY)),
                                !t)
                                    return;
                                for (var n = 0; n < t.length; n++) {
                                    var r = t[n]
                                      , a = o.GetElementSize(r);
                                    if (!r.hasAttribute(s.ATTRIBUTE_BIS_ID) && i.IsInitiallyRendered(r, a) && this.CheckIfAdRendered(r, i.GetMinImgsSpacePercentag(this.fbConfig, s.FACEBOOK_AD_PLACEMENT_TYPE_FEED)) && this.CheckIfAd(r)) {
                                        if (this.AdBlockerAgent.IsEnabledForFacebook())
                                            var c = this.HideAd(t[n], a, s.FACEBOOK_AD_PLACEMENT_TYPE_FEED);
                                        this.addCoverImageSrcAttribute(r);
                                        var l = o.GenerateAndSetBisIdToFBAds(r)
                                          , u = this.options.extractAdStaticPartTimeoutMs + o.GetRandomIntInRange(0, this.options.extractAdRandomPartTimeoutMs);
                                        this.AddHiddenTextTags(r),
                                        setTimeout(this.ReadyToExtractAd.bind(this, l, c), u)
                                    }
                                }
                            }
                        }
                    }
                }, {
                    key: "ReadyToExtractAd",
                    value: function ReadyToExtractAd(e, t) {
                        try {
                            if (e) {
                                var n = document.querySelector("[".concat(s.ATTRIBUTE_BIS_ID, "=").concat(e, "]"))
                                  , r = n.querySelector("[".concat(s.ATTRIBUTE_BIS_LABEL, '="fb_feed_ad"]'));
                                n && r ? this.ExtractAd(e, t, s.FACEBOOK_AD_PLACEMENT_TYPE_FEED) : (r.removeAttribute(s.ATTRIBUTE_BIS_ID),
                                n.removeAttribute(s.ATTRIBUTE_BIS_ID))
                            }
                        } catch (e) {}
                    }
                }, {
                    key: "CheckIfAd",
                    value: function CheckIfAd(e) {
                        for (var t = this.fbConfig.POSSIBLE_SPONSORED_TEXT_QUERIES, n = !1, r = 0; r < t.length && !n; r++) {
                            for (var o = t[r], a = e.querySelectorAll(o), c = 0; c < a.length && !n; c++) {
                                var l = a[c]
                                  , u = l.innerText
                                  , d = l.getAttribute(this.options.attributeWithSponsorAlly)
                                  , f = d ? [u, d] : u;
                                if ("string" == typeof u && u.length && this.isTagSponsored(f))
                                    l.setAttribute(s.ATTRIBUTE_BIS_LABEL, "fb_feed_ad"),
                                    n = !0;
                                else if (u && u.length >= 2 && !l.hasAttribute(s.ATTRIBUTE_BIS_LABEL)) {
                                    var h = i.GetVisibleSpansText(l, this.fbConfig.VISIBLE_SPANS_TEXT, this.fbConfig.SPONSORED_TEXTS);
                                    h !== u && h !== d && "string" == typeof h && h.length && this.isTagSponsored(h) && (l.setAttribute(s.ATTRIBUTE_BIS_LABEL, "fb_feed_ad"),
                                    n = !0)
                                }
                            }
                            n || (n = this.GetTextFromXlink(a))
                        }
                        return n
                    }
                }, {
                    key: "GetTextFromXlink",
                    value: function GetTextFromXlink(e) {
                        var t = this
                          , n = !1
                          , r = !0
                          , i = !1
                          , o = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done); r = !0) {
                                var l = a.value;
                                if (l.hasAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG)) {
                                    var u = l.parentElement
                                      , d = "";
                                    if (u && !u.hasAttribute("bis_proccessed") && !u.hasAttribute("fb_feed_ad")) {
                                        var f = Array.from(u.children);
                                        if (f && f.forEach((function(e) {
                                            var n = e.getAttribute(t.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG)
                                              , r = document.querySelector(n);
                                            r && (d += r.textContent)
                                        }
                                        )),
                                        u.setAttribute("bis_proccessed", ""),
                                        n = this.isTagSponsored(d))
                                            return u.setAttribute(s.ATTRIBUTE_BIS_LABEL, "fb_feed_ad"),
                                            u.removeAttribute("bis_proccessed"),
                                            n
                                    }
                                }
                            }
                        } catch (e) {
                            i = !0,
                            o = e
                        } finally {
                            try {
                                r || null == c.return || c.return()
                            } finally {
                                if (i)
                                    throw o
                            }
                        }
                        return n
                    }
                }, {
                    key: "AddHiddenTextTags",
                    value: function AddHiddenTextTags(e) {
                        var t = e.querySelectorAll("svg>use");
                        if (t)
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n]
                                  , i = r.parentElement
                                  , o = r.getAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG)
                                  , s = document.querySelector(o).cloneNode(!0);
                                s.style.display = "none",
                                s.id = s.id + "_bis",
                                i && i.appendChild(s)
                            }
                    }
                }, {
                    key: "isTagSponsored",
                    value: function isTagSponsored(e) {
                        var t = this
                          , n = !1;
                        if (!e)
                            return n;
                        if ("string" == typeof e)
                            n = this.fbConfig.SPONSORED_TEXTS.some((function(t) {
                                return e === t
                            }
                            ));
                        else {
                            var r = !0
                              , i = !1
                              , o = void 0;
                            try {
                                for (var s, a = function _loop() {
                                    var e = s.value;
                                    if (n = t.fbConfig.SPONSORED_TEXTS.some((function(t) {
                                        return e === t
                                    }
                                    )))
                                        return "break"
                                }, c = e[Symbol.iterator](); !(r = (s = c.next()).done); r = !0) {
                                    if ("break" === a())
                                        break
                                }
                            } catch (e) {
                                i = !0,
                                o = e
                            } finally {
                                try {
                                    r || null == c.return || c.return()
                                } finally {
                                    if (i)
                                        throw o
                                }
                            }
                        }
                        return n
                    }
                }, {
                    key: "GetAboutPageLink",
                    value: function GetAboutPageLink(e) {
                        var t = ""
                          , n = this.fbConfig.ABOUT_SECTION_CONFIG
                          , r = e.querySelector("*[".concat(s.ATTRIBUTE_BIS_LABEL, "='fb_feed_ad']"))
                          , i = e.querySelectorAll(n.QUERY_ABOUT_PAGE_HREF);
                        if (r && i && i.length) {
                            for (var o = "", a = r.getBoundingClientRect().top, c = a - e.getBoundingClientRect().top, l = function _loop2(e) {
                                if (n.ABOUT_PAGE_BAD_WORDS_MATCHES.some((function(t) {
                                    return i[e].href.indexOf(t) > -1
                                }
                                )))
                                    return "continue";
                                var t = i[e].getBoundingClientRect();
                                i[e].href && t.top <= a && a - t.top < c && (c = a - t.top,
                                o = i[e].href)
                            }, u = 0; u < i.length; u++)
                                l(u);
                            if (o.length) {
                                var d = o.substring(n.HREF_PREFIX.length, o.length);
                                t = n.ABOUT_PAGE_TEMPLATE.replace("%1", d.substring(0, d.search(/(\/|\?)/)))
                            }
                        }
                        return t
                    }
                }, {
                    key: "addCoverImageSrcAttribute",
                    value: function addCoverImageSrcAttribute(e) {
                        var t = e.querySelector(this.fbConfig.FEED_PAGE.COVER_IMAGE_QUERY);
                        if (t && t.hasAttribute("src")) {
                            var n = t.getAttribute("src");
                            e.setAttribute("data-cover-image-src", n)
                        }
                    }
                }, {
                    key: "FeedContainer",
                    get: function get() {
                        for (var e = this.fbConfig.FEED_PAGE.MIN_HEIGHT, t = this.fbConfig.FEED_PAGE.FEED_QUERIES, n = t.length, r = !1, i = null, o = 0; o < n && !r; o++) {
                            var s = t[o]
                              , a = document.querySelector(s);
                            if (a) {
                                var c = a.offsetHeight;
                                if (a.children.length > 2 && c > e)
                                    i = a,
                                    r = !0;
                                else if (a.nodeName.search(/span/i) > -1) {
                                    var l = a.nextElementSibling;
                                    if (l && l.children) {
                                        var u = l.offsetHeight;
                                        1 === l.children.length && l.querySelector("h3") ? (i = l.querySelector("h3").parentElement,
                                        r = !0) : 2 === l.children.length ? (a = l.querySelector("div:not([class])")) && a.offsetHeight > e && (i = a,
                                        r = !0) : l.children.length > 1 && u > e && (i = l,
                                        r = !0)
                                    }
                                }
                            }
                        }
                        return i
                    }
                }, {
                    key: "isValidUrl",
                    get: function get() {
                        return !this.fbConfig.FEED_PAGE.INVALID_PATHS.some((function(e) {
                            return window.location.href.includes(e)
                        }
                        ))
                    }
                }]),
                PosdFacebookFeed
            }(r);
            e.exports = a
        }
        ,
        2757: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(1029)
              , i = n(1225)
              , o = n(3153)
              , s = n(3124)
              , a = function(e) {
                function PosdFacebookMarketplace(e, t, n, r) {
                    var i;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdFacebookMarketplace),
                    (i = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookMarketplace).call(this, e, t, n))).fbConfig = r,
                    i.fbMarketplace = null,
                    i.fbMarketplaceObserver = null,
                    i
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdFacebookMarketplace, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdFacebookMarketplace, [{
                    key: "ActualizeDetector",
                    value: function ActualizeDetector() {
                        var e = !1;
                        return this.MainContainer && (e = !0),
                        e
                    }
                }, {
                    key: "ActivateMutationObserver",
                    value: function ActivateMutationObserver() {
                        var e = this;
                        return this.fbMarketplace = this.MainContainer,
                        this.fbMarketplace && (this.fbMarketplaceObserver || (this.fbMarketplaceObserver = new MutationObserver(this.DetectCandidates.bind(this, s.AD_DETECTOR_INITIATOR_MUTATION)),
                        this.fbMarketplaceObserver.observe(this.fbMarketplace, {
                            childList: !0,
                            subtree: !0
                        }),
                        window.addEventListener("beforeunload", (function() {
                            e.fbMarketplaceObserver && (e.fbMarketplaceObserver.disconnect(),
                            e.fbMarketplaceObserver = null)
                        }
                        )))),
                        this.fbMarketplaceObserver
                    }
                }, {
                    key: "DeactivateMutationObserver",
                    value: function DeactivateMutationObserver() {
                        this.fbMarketplaceObserver && (this.fbMarketplaceObserver.disconnect(),
                        this.fbMarketplaceObserver = null)
                    }
                }, {
                    key: "Detector",
                    value: function Detector() {
                        var e = this.MainContainer.querySelectorAll(this.fbConfig.MARKETPLACE_ADS_CONFIG.CARDS);
                        if (e && e.length)
                            for (var t = 0; t < e.length; t++) {
                                var n = e[t]
                                  , r = i.GetElementSize(n);
                                if (this.addCoverImageSrcAttribute(n),
                                !n.hasAttribute(s.ATTRIBUTE_BIS_ID) && o.IsInitiallyRendered(n, r) && (this.addCoverImageSrcAttribute(n),
                                this.CheckIfAd(n))) {
                                    if (this.AdBlockerAgent.IsEnabledForFacebook()) {
                                        o.HideSateliteSponsoredString(this.fbConfig, document.querySelectorAll(this.fbConfig.MARKETPLACE_ADS_CONFIG.SATELITE_SPONSORED_STRING));
                                        var a = this.HideAd(n, r, s.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE)
                                    }
                                    if (this.CheckIfAdRendered(n, o.GetMinImgsSpacePercentag(this.fbConfig, s.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE))) {
                                        var c = i.GenerateAndSetBisIdToFBAds(n)
                                          , l = this.options.extractAdStaticPartTimeoutMs + i.GetRandomIntInRange(0, this.options.extractAdRandomPartTimeoutMs);
                                        this.addCoverImageSrcAttribute(n),
                                        setTimeout(this.ExtractAd.bind(this, c, a, s.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE), l)
                                    }
                                }
                            }
                    }
                }, {
                    key: "addCoverImageSrcAttribute",
                    value: function addCoverImageSrcAttribute(e) {
                        var t = e.querySelector(this.fbConfig.MARKETPLACE_ADS_CONFIG.COVER_IMAGE_QUERY);
                        if (t && t.hasAttribute("src") && !e.hasAttribute("data-cover-image-src")) {
                            var n = t.getAttribute("src");
                            e.setAttribute("data-cover-image-src", n)
                        }
                    }
                }, {
                    key: "ReadyToExtractAd",
                    value: function ReadyToExtractAd(e, t) {
                        try {
                            if (e) {
                                var n = document.querySelector("[".concat(s.ATTRIBUTE_BIS_ID, "=").concat(e, "]"));
                                n && (o.IsPostHidden(n) && n.setAttribute(s.ATTRIBUTE_BIS_LABEL, "style"),
                                this.ExtractAd(e, t, s.FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE))
                            }
                        } catch (e) {}
                    }
                }, {
                    key: "CheckIfAd",
                    value: function CheckIfAd(e) {
                        var t = this
                          , n = !1;
                        if (e && this.MainContainer) {
                            var r = e.getBoundingClientRect()
                              , i = Array.from(this.MainContainer.querySelectorAll(this.fbConfig.MARKETPLACE_ADS_CONFIG.SPONSOR_BLOCKS));
                            if (i && i.length) {
                                var a = !0
                                  , c = !1
                                  , l = void 0;
                                try {
                                    for (var u, d = i[Symbol.iterator](); !(a = (u = d.next()).done); a = !0) {
                                        var f = u.value;
                                        if (f.getBoundingClientRect().x === r.x) {
                                            if ("break" === function() {
                                                var r = o.GetVisibleSpansText(f, t.fbConfig.VISIBLE_SPANS_TEXT, t.fbConfig.SPONSORED_TEXTS);
                                                if (t.fbConfig.SPONSORED_TEXTS.some((function(e) {
                                                    return -1 !== r.indexOf(e)
                                                }
                                                )))
                                                    return e.setAttribute(s.ATTRIBUTE_BIS_LABEL, "fb_marketplace_ad"),
                                                    n = !0,
                                                    "break"
                                            }())
                                                break
                                        } else if (this.fbConfig.MARKETPLACE_ADS_CONFIG.PREV_SIBLING_SPONSOR_BLOCK_QUERY_PATH) {
                                            var h = e
                                              , _ = !0
                                              , A = !1
                                              , E = void 0;
                                            try {
                                                for (var T, g = this.fbConfig.MARKETPLACE_ADS_CONFIG.PREV_SIBLING_SPONSOR_BLOCK_QUERY_PATH[Symbol.iterator](); !(_ = (T = g.next()).done); _ = !0) {
                                                    var p = T.value;
                                                    if (h[p])
                                                        h = h[p];
                                                    else if (p.includes(",")) {
                                                        var y = p.split(",");
                                                        h = h[y[0]](y[1])
                                                    }
                                                }
                                            } catch (e) {
                                                A = !0,
                                                E = e
                                            } finally {
                                                try {
                                                    _ || null == g.return || g.return()
                                                } finally {
                                                    if (A)
                                                        throw E
                                                }
                                            }
                                            if (h)
                                                if ("break" === function() {
                                                    var r = o.GetVisibleSpansText(h, t.fbConfig.VISIBLE_SPANS_TEXT, t.fbConfig.SPONSORED_TEXTS);
                                                    if (t.fbConfig.SPONSORED_TEXTS.some((function(e) {
                                                        return -1 !== r.indexOf(e)
                                                    }
                                                    )))
                                                        return e.setAttribute(s.ATTRIBUTE_BIS_LABEL, "fb_marketplace_ad"),
                                                        n = !0,
                                                        "break"
                                                }())
                                                    break
                                        }
                                    }
                                } catch (e) {
                                    c = !0,
                                    l = e
                                } finally {
                                    try {
                                        a || null == d.return || d.return()
                                    } finally {
                                        if (c)
                                            throw l
                                    }
                                }
                            }
                        }
                        return n
                    }
                }, {
                    key: "GetAboutPageLink",
                    value: function GetAboutPageLink(e) {
                        var t = ""
                          , n = this.fbConfig.ABOUT_SECTION_CONFIG
                          , r = e.querySelector("*[".concat(s.ATTRIBUTE_BIS_LABEL, "='fb_marketplace_ad']"))
                          , i = e.querySelectorAll("a[href^='".concat(n.HREF_PREFIX, "'"));
                        if (r && i && i.length) {
                            for (var o = "", a = r.getBoundingClientRect().top, c = a - e.getBoundingClientRect().top, l = 0; l < i.length; l++) {
                                var u = i[l].getBoundingClientRect();
                                i[l].href && u.top < a && a - u.top < c && (c = a - u.top,
                                o = i[l].href)
                            }
                            if (o.length) {
                                var d = o.substring(n.HREF_PREFIX.length, o.length);
                                t = n.ABOUT_PAGE_TEMPLATE.replace("%1", d.substring(0, d.search(/(\/|\?)/)))
                            }
                        }
                        return t
                    }
                }, {
                    key: "MainContainer",
                    get: function get() {
                        return document.querySelector(this.fbConfig.MARKETPLACE_ADS_CONFIG.CONTAINER)
                    }
                }]),
                PosdFacebookMarketplace
            }(r);
            e.exports = a
        }
        ,
        9317: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(1029)
              , i = n(1225)
              , o = n(3153)
              , s = n(3124)
              , a = n(8962)
              , c = function(e) {
                function PosdFacebookRightColumn(e, t, n, r, i) {
                    var o;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdFacebookRightColumn),
                    (o = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookRightColumn).call(this, e, t, n))).fbConfig = r,
                    o.designVersion = i,
                    o.fbRightColumn = null,
                    o.fbRightColumnObserver = null,
                    o
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdFacebookRightColumn, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdFacebookRightColumn, [{
                    key: "ActualizeDetector",
                    value: function ActualizeDetector() {
                        var e = !1;
                        return document.querySelector(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.CONTAINER) && (e = !0),
                        e
                    }
                }, {
                    key: "ActivateMutationObserver",
                    value: function ActivateMutationObserver() {
                        var e = this;
                        return this.fbRightColumn = document.querySelector(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.CONTAINER),
                        this.fbRightColumn && (this.fbRightColumnObserver || (this.fbRightColumnObserver = new MutationObserver(this.DetectCandidates.bind(this, s.AD_DETECTOR_INITIATOR_MUTATION)),
                        this.fbRightColumnObserver.observe(this.fbRightColumn, {
                            childList: !0,
                            subtree: !0
                        }),
                        window.addEventListener("beforeunload", (function() {
                            e.fbRightColumnObserver && (e.fbRightColumnObserver.disconnect(),
                            e.fbRightColumnObserver = null)
                        }
                        )))),
                        this.fbRightColumnObserver
                    }
                }, {
                    key: "DeactivateMutationObserver",
                    value: function DeactivateMutationObserver() {
                        this.fbRightColumnObserver && (this.fbRightColumnObserver.disconnect(),
                        this.fbRightColumnObserver = null)
                    }
                }, {
                    key: "Detector",
                    value: function Detector() {
                        var e = document.querySelectorAll(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.CARDS);
                        if (e && e.length)
                            for (var t = 0; t < e.length; t++) {
                                var n = i.GetElementSize(e[t]);
                                if (o.IsInitiallyRendered(e[t], n))
                                    if (e[t].hasAttribute(s.ATTRIBUTE_BIS_ID))
                                        this.CheckIfAdRotated(e[t]) && e[t].removeAttribute && (e[t].removeAttribute(s.ATTRIBUTE_BIS_ID),
                                        e[t].removeAttribute(s.ATTRIBUTE_BIS_SIZE),
                                        e[t].removeAttribute(s.ATTRIBUTE_BIS_STATUS),
                                        a.CONFIG_MARK_AD_CANDIDATES && a.CONFIG_MARK_PROCESSED_AD_CANDIDATES && "border: 6px solid green !important;" === e[t].style.cssText && (e[t].style.cssText = ""));
                                    else if (this.CheckIfAd(e[t])) {
                                        if (this.AdBlockerAgent.IsEnabledForFacebook()) {
                                            o.HideSateliteSponsoredString(this.fbConfig, document.querySelectorAll(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.SATELITE_SPONSORED_STRING));
                                            var r = this.HideAd(e[t], n, s.FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN)
                                        }
                                        if (this.CheckIfAdRendered(e[t], o.GetMinImgsSpacePercentag(this.fbConfig, s.FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN, this.designVersion))) {
                                            var c = i.GenerateAndSetBisIdToFBAds(e[t])
                                              , l = this.options.extractAdStaticPartTimeoutMs + i.GetRandomIntInRange(0, this.options.extractAdRandomPartTimeoutMs);
                                            setTimeout(this.ExtractAd.bind(this, c, r, s.FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN), l)
                                        }
                                    }
                            }
                    }
                }, {
                    key: "CheckIfAd",
                    value: function CheckIfAd(e) {
                        var t = this
                          , n = !1
                          , r = Array.from(e.querySelectorAll(this.fbConfig.RIGHT_COLUMN_ADS_CONFIG.IF_AD)).filter((function(e) {
                            var n = e.href
                              , r = t.fbConfig.RIGHT_COLUMN_ADS_CONFIG.IMPOSSIBLE_HREF_REG_FOR_AD;
                            if (-1 === n.indexOf(r))
                                return !0
                        }
                        ));
                        return e && r.length && (n = !0),
                        n
                    }
                }, {
                    key: "CheckIfAdRotated",
                    value: function CheckIfAdRotated(e) {
                        var t = !1;
                        if (e && "extracted" === e.getAttribute(s.ATTRIBUTE_BIS_STATUS)) {
                            var n = 0
                              , r = 0
                              , i = e.querySelectorAll("*");
                            i && i.length && (i.forEach((function(e) {
                                e.getAttribute(s.ATTRIBUTE_BIS_SIZE) ? n += 1 : r += 1
                            }
                            )),
                            (0 === n && r > 0 || n > 0 && r > 0 && (r / i.length * 100 | 0) > 50) && (t = !0))
                        }
                        return t
                    }
                }]),
                PosdFacebookRightColumn
            }(r);
            e.exports = c
        }
        ,
        7207: e=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var t = function() {
                function PosdFacebookVideoDetector(e) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdFacebookVideoDetector),
                    this.id = e
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdFacebookVideoDetector, [{
                    key: "InjectDetector",
                    value: function InjectDetector(e, t) {
                        var n = document.createElement("script");
                        n && n.setAttribute && n.setAttribute("bis_use", "true"),
                        n.innerHTML = PosdFacebookVideoDetector.SendVideoData.toString() + "(" + function(e, t) {
                            var n = "SCRIPT"
                              , r = "XML_HTTP_REQUEST"
                              , i = "INSTREAM_CONFIG"
                              , o = "MARKETPLACE_VIDEO_AD"
                              , s = "FEED_VIDEO_AD"
                              , a = function buildVideoData(e, t) {
                                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ""
                                  , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ""
                                  , i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ""
                                  , o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : ""
                                  , s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : ""
                                  , a = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "";
                                return {
                                    detectionTime: Date.now() / 1e3 | 0,
                                    videoId: e,
                                    videoUrl: t,
                                    previewImageUrl: r,
                                    audioUrl: n,
                                    linkDisplay: i,
                                    userName: o,
                                    adName: s,
                                    adLogo: a
                                }
                            }
                              , c = function cutTextBetween(e, t) {
                                var n = new RegExp(t,"i")
                                  , r = e.match(n);
                                if (!r)
                                    return !1;
                                var i = r.filter((function(e) {
                                    return e
                                }
                                ));
                                return !!i[1] && i[1]
                            }
                              , l = function parseFeedVideoAd(e, t) {
                                try {
                                    var n = "".concat(t).replace(/\}(\r\n| |)\{/g, "}BIS_SEPARATOR{").split(/BIS\_SEPARATOR/g)
                                      , r = e.CHECKER;
                                    n = n.filter((function(e) {
                                        return r.some((function(t) {
                                            return new RegExp(t,"i").test(e)
                                        }
                                        ))
                                    }
                                    ));
                                    var i = [];
                                    if (n.length) {
                                        var o = !0
                                          , s = !1
                                          , c = void 0;
                                        try {
                                            for (var l, u = n[Symbol.iterator](); !(o = (l = u.next()).done); o = !0) {
                                                var d = l.value
                                                  , f = d;
                                                "string" == typeof d && (f = JSON.parse(d));
                                                var h = T(f, e)
                                                  , _ = g(f, e)
                                                  , E = p(f, e)
                                                  , y = A(f, e.PATH_USER_NAME)
                                                  , S = a(E, h, "", _, "", y);
                                                E && h && i.push(S)
                                            }
                                        } catch (e) {
                                            s = !0,
                                            c = e
                                        } finally {
                                            try {
                                                o || null == u.return || u.return()
                                            } finally {
                                                if (s)
                                                    throw c
                                            }
                                        }
                                        i.forEach((function(e) {
                                            setTimeout(C(e, "FACEBOOK_VIDEO_DATA"), 0)
                                        }
                                        ))
                                    }
                                } catch (e) {}
                            }
                              , u = function parseInStream(e, t, n) {
                                var r = []
                                  , i = [];
                                try {
                                    r.push(JSON.parse(t)),
                                    setTimeout(C({
                                        url: n,
                                        requestMethod: "POST",
                                        content: r
                                    }, "FACEBOOK_INSTREAM_DATA"), 0)
                                } catch (n) {
                                    (r = "".concat(t).replace(/\}(\r\n| )\{/g, "}BIS_SEPARATOR{").split(/BIS\_SEPARATOR/g)).forEach((function(t, n) {
                                        if (!(t.length <= 3)) {
                                            var r = JSON.parse(t)
                                              , o = r
                                              , s = r
                                              , a = !0
                                              , c = !1
                                              , l = void 0;
                                            try {
                                                for (var u, h = e.PATH_NODES[Symbol.iterator](); !(a = (u = h.next()).done); a = !0) {
                                                    var _ = u.value
                                                      , A = e.PATH_NODES.indexOf(_)
                                                      , E = e.PATH_NODES.length - 1;
                                                    A !== E && o[_] && (o = o[_]),
                                                    A === E && o[_] && ((o = o[_]).length ? o.forEach((function(t) {
                                                        t.bisLinks = {
                                                            aboutPageLink: f(t, e.PATH_USER_ID)
                                                        },
                                                        t.video_id = d(t, e.PATH_VIDEO_ID),
                                                        i.push(t)
                                                    }
                                                    )) : (o.bisLinks = {
                                                        aboutPageLink: f(o, e.PATH_USER_ID)
                                                    },
                                                    o.video_id = d(o, e.PATH_VIDEO_ID),
                                                    i.push(o)))
                                                }
                                            } catch (e) {
                                                c = !0,
                                                l = e
                                            } finally {
                                                try {
                                                    a || null == h.return || h.return()
                                                } finally {
                                                    if (c)
                                                        throw l
                                                }
                                            }
                                            var T = !0
                                              , g = !1
                                              , p = void 0;
                                            try {
                                                for (var y, C = e.PATH_ALL_VIDEO[Symbol.iterator](); !(T = (y = C.next()).done); T = !0) {
                                                    var S = y.value
                                                      , I = e.PATH_ALL_VIDEO.indexOf(S)
                                                      , v = e.PATH_ALL_VIDEO.length - 1;
                                                    if (I !== v && s[S] && (s = s[S]),
                                                    I === v && s[S])
                                                        if ((s = s[S]).length)
                                                            s.forEach((function(e, t) {
                                                                var n = i[t];
                                                                n.video_id === e.video_id && (n.video_dash_prefetch_representations = e)
                                                            }
                                                            ));
                                                        else if (1 === i.length) {
                                                            var m = i[0];
                                                            m.video_id === s.video_id && (m.video_dash_prefetch_representations = s)
                                                        }
                                                }
                                            } catch (e) {
                                                g = !0,
                                                p = e
                                            } finally {
                                                try {
                                                    T || null == C.return || C.return()
                                                } finally {
                                                    if (g)
                                                        throw p
                                                }
                                            }
                                        }
                                    }
                                    ))
                                }
                                i.forEach((function(e) {
                                    setTimeout(C({
                                        url: n,
                                        requestMethod: "POST",
                                        content: e
                                    }, "FACEBOOK_INSTREAM_DATA"), 0)
                                }
                                ))
                            }
                              , d = function getVideoIdInstream(e, t) {
                                var n = e
                                  , r = null
                                  , i = !0
                                  , o = !1
                                  , s = void 0;
                                try {
                                    for (var a, c = t[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                        var l = a.value
                                          , u = t.indexOf(l)
                                          , d = t.length - 1;
                                        u !== d && n[l] && (n = n[l]),
                                        u === d && n[l] && (r = n[l])
                                    }
                                } catch (e) {
                                    o = !0,
                                    s = e
                                } finally {
                                    try {
                                        i || null == c.return || c.return()
                                    } finally {
                                        if (o)
                                            throw s
                                    }
                                }
                                return parseInt(r, 10)
                            }
                              , f = function getUserAboutPage(e, t) {
                                var n = e
                                  , r = null
                                  , i = !0
                                  , o = !1
                                  , s = void 0;
                                try {
                                    for (var a, c = t[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                        var l = a.value
                                          , u = t.indexOf(l)
                                          , d = t.length - 1;
                                        u !== d && n[l] && (n = n[l]),
                                        u === d && n[l] && (r = "https://www.facebook.com/".concat(n[l], "/about"))
                                    }
                                } catch (e) {
                                    o = !0,
                                    s = e
                                } finally {
                                    try {
                                        i || null == c.return || c.return()
                                    } finally {
                                        if (o)
                                            throw s
                                    }
                                }
                                return r
                            }
                              , h = function parseText(e, n) {
                                n = n.replace(/ /g, "");
                                var r = c(n, e.VIDEO_ID);
                                if (r) {
                                    var i = null
                                      , o = null
                                      , s = ""
                                      , l = ""
                                      , u = "";
                                    e.VIDEO_HD_URL && (i = c(n, e.VIDEO_HD_URL)),
                                    e.VIDEO_SD_URL && (o = c(n, e.VIDEO_SD_URL)),
                                    e.LINK_DISPLAY && (u = c(n, e.LINK_DISPLAY)),
                                    t.VIDEO_AUDIO_URL && (s = (s = c(n, e.VIDEO_AUDIO_URL)) ? s.split("\\").join("") : s),
                                    e.THUMBNAIL && (l = (l = c(n, e.THUMBNAIL)) ? l.split("\\").join("") : l);
                                    var d = o || i;
                                    if (d) {
                                        d = d.split("\\").join("");
                                        var f = a(r, d, s, l, u);
                                        setTimeout(C(f, "FACEBOOK_VIDEO_DATA"), 0)
                                    }
                                }
                            }
                              , _ = function parseMarketplaceVideo(e, t) {
                                try {
                                    var n = "".concat(t).replace(/\}(\r\n| |)\{/g, "}BIS_SEPARATOR{").split(/BIS\_SEPARATOR/g)
                                      , r = e.CHECKER;
                                    n = n.filter((function(e) {
                                        return r.some((function(t) {
                                            return new RegExp(t).test(e)
                                        }
                                        ))
                                    }
                                    ));
                                    var i = [];
                                    if (n.length) {
                                        var o = !0
                                          , s = !1
                                          , c = void 0;
                                        try {
                                            for (var l, u = n[Symbol.iterator](); !(o = (l = u.next()).done); o = !0) {
                                                var d = l.value
                                                  , f = d;
                                                "string" == typeof d && (f = JSON.parse(d));
                                                var h = E(f, e)
                                                  , _ = T(f, e)
                                                  , y = g(f, e)
                                                  , S = p(f, e)
                                                  , I = A(f, e.PATH_NAME)
                                                  , v = A(f, e.PATH_LOGO)
                                                  , m = a(S, _, h, y, "", "", I, v);
                                                S && _ && i.push(m)
                                            }
                                        } catch (e) {
                                            s = !0,
                                            c = e
                                        } finally {
                                            try {
                                                o || null == u.return || u.return()
                                            } finally {
                                                if (s)
                                                    throw c
                                            }
                                        }
                                        i.forEach((function(e) {
                                            setTimeout(C(e, "FACEBOOK_VIDEO_DATA"), 0)
                                        }
                                        ))
                                    }
                                } catch (e) {}
                            }
                              , A = function getValueByPath(e, t) {
                                var n = null
                                  , r = !0
                                  , i = !1
                                  , o = void 0;
                                try {
                                    for (var s, a = t[Symbol.iterator](); !(r = (s = a.next()).done); r = !0)
                                        for (var c = s.value, l = c.length, u = e, d = 0; d < l; d++) {
                                            var f = c[d]
                                              , h = l - 1;
                                            if (!u[f])
                                                break;
                                            d !== h && u[f] && (u = u[f]),
                                            d === h && u[f] && (n = u[f])
                                        }
                                } catch (e) {
                                    i = !0,
                                    o = e
                                } finally {
                                    try {
                                        r || null == a.return || a.return()
                                    } finally {
                                        if (i)
                                            throw o
                                    }
                                }
                                return n
                            }
                              , E = function getAudioUrl(e, t) {
                                var n = null
                                  , r = !0
                                  , i = !1
                                  , o = void 0;
                                try {
                                    for (var s, a = t.PATH_AUDIO_URL[Symbol.iterator](); !(r = (s = a.next()).done); r = !0)
                                        for (var c = s.value, l = c.length, u = e, d = 0; d < l; d++) {
                                            var f = c[d]
                                              , h = l - 1;
                                            if (!u[f])
                                                break;
                                            d !== h && u[f] && (u = u[f]),
                                            d === h && u[f] && (n = u[f])
                                        }
                                } catch (e) {
                                    i = !0,
                                    o = e
                                } finally {
                                    try {
                                        r || null == a.return || a.return()
                                    } finally {
                                        if (i)
                                            throw o
                                    }
                                }
                                return n
                            }
                              , T = function getVideoUrl(e, t) {
                                var n = null
                                  , r = !0
                                  , i = !1
                                  , o = void 0;
                                try {
                                    for (var s, a = t.PATH_VIDEO_URL[Symbol.iterator](); !(r = (s = a.next()).done); r = !0)
                                        for (var c = s.value, l = c.length, u = e, d = 0; d < l; d++) {
                                            var f = c[d]
                                              , h = l - 1;
                                            if (!u[f])
                                                break;
                                            d !== h && u[f] && (u = u[f]),
                                            d === h && u[f] && (n = u[f])
                                        }
                                } catch (e) {
                                    i = !0,
                                    o = e
                                } finally {
                                    try {
                                        r || null == a.return || a.return()
                                    } finally {
                                        if (i)
                                            throw o
                                    }
                                }
                                return n
                            }
                              , g = function getThumbnail(e, t) {
                                var n = null
                                  , r = !0
                                  , i = !1
                                  , o = void 0;
                                try {
                                    for (var s, a = t.PATH_THUMBNAIL[Symbol.iterator](); !(r = (s = a.next()).done); r = !0)
                                        for (var c = s.value, l = c.length, u = e, d = 0; d < l; d++) {
                                            var f = c[d]
                                              , h = l - 1;
                                            if (!u[f])
                                                break;
                                            d !== h && u[f] && (u = u[f]),
                                            d === h && u[f] && (n = u[f])
                                        }
                                } catch (e) {
                                    i = !0,
                                    o = e
                                } finally {
                                    try {
                                        r || null == a.return || a.return()
                                    } finally {
                                        if (i)
                                            throw o
                                    }
                                }
                                return n
                            }
                              , p = function getVideoId(e, t) {
                                var n = null
                                  , r = !0
                                  , i = !1
                                  , o = void 0;
                                try {
                                    for (var s, a = t.PATH_VIDEO_ID[Symbol.iterator](); !(r = (s = a.next()).done); r = !0)
                                        for (var c = s.value, l = c.length, u = e, d = 0; d < l; d++) {
                                            var f = c[d]
                                              , h = l - 1;
                                            if (!u[f])
                                                break;
                                            d !== h && u[f] && (u = u[f]),
                                            d === h && u[f] && (n = u[f])
                                        }
                                } catch (e) {
                                    i = !0,
                                    o = e
                                } finally {
                                    try {
                                        r || null == a.return || a.return()
                                    } finally {
                                        if (i)
                                            throw o
                                    }
                                }
                                return n
                            }
                              , y = function parse(e, n) {
                                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                                  , a = function splitIfNeed(e, n) {
                                    n = String(n);
                                    var r = t.PARSER_CONFIG[e];
                                    return r.SEPARATOR ? n.split(r.SEPARATOR) : [n]
                                }(n, e);
                                a.forEach((function(e) {
                                    setTimeout((function() {
                                        return function findParserAndParse(e) {
                                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
                                              , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                                              , a = n ? t.PARSERS.filter((function(e) {
                                                return e.TYPE === n
                                            }
                                            )) : t.PARSERS
                                              , c = !0
                                              , d = !1
                                              , f = void 0;
                                            try {
                                                for (var A, E = function _loop() {
                                                    var t = A.value;
                                                    if (t.CHECKER.some((function(t) {
                                                        return e.includes(t)
                                                    }
                                                    )))
                                                        return n === i ? (setTimeout((function() {
                                                            return u(t, e, r)
                                                        }
                                                        ), 0),
                                                        "break") : n === o ? (setTimeout((function() {
                                                            return _(t, e)
                                                        }
                                                        ), 0),
                                                        "break") : n === s ? (setTimeout((function() {
                                                            return l(t, e)
                                                        }
                                                        ), 0),
                                                        "break") : (setTimeout((function() {
                                                            return h(t, e)
                                                        }
                                                        ), 0),
                                                        "break")
                                                }, T = a[Symbol.iterator](); !(c = (A = T.next()).done) && "break" !== E(); c = !0)
                                                    ;
                                            } catch (e) {
                                                d = !0,
                                                f = e
                                            } finally {
                                                try {
                                                    c || null == T.return || T.return()
                                                } finally {
                                                    if (d)
                                                        throw f
                                                }
                                            }
                                        }(e, n, r)
                                    }
                                    ), 0)
                                }
                                ))
                            }
                              , C = function asyncSendVideoData(t, n) {
                                return function() {
                                    SendVideoData(e, t, n)
                                }
                            };
                            if (t.PARSER_CONFIG.SCRIPT.USE) {
                                setInterval((function loadTextDataFromScripts() {
                                    var e = document.querySelectorAll("script")
                                      , t = !0
                                      , r = !1
                                      , i = void 0;
                                    try {
                                        for (var o, s = e[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
                                            var a = o.value;
                                            a.hasAttribute("bis_use") || (a.setAttribute("bis_use", "true"),
                                            y(a.innerHTML, n))
                                        }
                                    } catch (e) {
                                        r = !0,
                                        i = e
                                    } finally {
                                        try {
                                            t || null == s.return || s.return()
                                        } finally {
                                            if (r)
                                                throw i
                                        }
                                    }
                                }
                                ), t.PARSER_CONFIG.SCRIPT.INTERVAL_MS || 5e3)
                            }
                            if (t.PARSER_CONFIG.LISTEN_HTTP_REQUESTS) {
                                var S = XMLHttpRequest.prototype.open
                                  , I = XMLHttpRequest.prototype.setRequestHeader;
                                XMLHttpRequest.prototype.setRequestHeader = function() {
                                    var e = arguments[0].toLowerCase()
                                      , t = arguments[1];
                                    this.requestHeaders || (this.requestHeaders = {}),
                                    this.requestHeaders[e] = t,
                                    I.apply(this, arguments)
                                }
                                ,
                                XMLHttpRequest.prototype.open = function() {
                                    this.requestMethod = arguments[0],
                                    S.apply(this, arguments)
                                }
                                ;
                                var v = XMLHttpRequest.prototype.send;
                                XMLHttpRequest.prototype.send = function() {
                                    var e = this.onreadystatechange;
                                    return this.onreadystatechange = function() {
                                        var n = this
                                          , a = t.MATCH_URLS
                                          , c = t.MATCH_HEADERS
                                          , l = this.requestHeaders ? Object.keys(this.requestHeaders) : null
                                          , u = t.PARSER_CONFIG.INSTREAM_CONFIG
                                          , d = t.PARSER_CONFIG.MARKETPLACE_VIDEO_AD
                                          , f = t.PARSER_CONFIG.FEED_VIDEO_AD
                                          , h = !1
                                          , _ = null
                                          , A = null;
                                        if (l && (h = l.some((function(e) {
                                            if (c[e] && c[e].includes(n.requestHeaders[e]))
                                                return _ = e,
                                                A = n.requestHeaders[e],
                                                !0
                                        }
                                        ))),
                                        4 === this.readyState && a.filter((function(e) {
                                            return e.indexOf(n.responseURL)
                                        }
                                        )).length > 0)
                                            if (h)
                                                switch (!0) {
                                                case u.USE && u.HEADERS[_].includes(A):
                                                    setTimeout((function() {
                                                        return y(n.response, i, n.responseURL)
                                                    }
                                                    ), 0);
                                                    break;
                                                case d.USE && d.HEADERS[_].includes(A):
                                                    setTimeout((function() {
                                                        return y(n.response, o, n.responseURL)
                                                    }
                                                    ), 0);
                                                    break;
                                                case f.USE && f.HEADERS[_].includes(A):
                                                    setTimeout((function() {
                                                        return y(n.response, s, n.responseURL)
                                                    }
                                                    ), 0)
                                                }
                                            else
                                                setTimeout((function() {
                                                    return y(n.response, r)
                                                }
                                                ), 0);
                                        if (e)
                                            return e.apply(this, arguments)
                                    }
                                    ,
                                    v.apply(this, arguments)
                                }
                            }
                        }
                        .toString() + '("'.concat(e, '", ').concat(t, "))"),
                        document.head && document.head.appendChild(n)
                    }
                }], [{
                    key: "SendVideoData",
                    value: function SendVideoData(e, t, n) {
                        try {
                            var r = {
                                posdMessageId: "PANELOS_MESSAGE",
                                posdHash: function GenerateQuickId() {
                                    return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0, 22)
                                }(),
                                type: n,
                                from: e,
                                to: e.substring(0, e.length - 2),
                                content: t
                            };
                            window.postMessage(r)
                        } catch (e) {}
                    }
                }]),
                PosdFacebookVideoDetector
            }();
            e.exports = t
        }
        ,
        555: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(1029)
              , i = n(3153)
              , o = n(1225)
              , s = n(3124)
              , a = function(e) {
                function PosdFacebookWatch(e, t, n, r) {
                    var i;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdFacebookWatch),
                    (i = _possibleConstructorReturn(this, _getPrototypeOf(PosdFacebookWatch).call(this, e, t, n))).fbConfig = r,
                    i.fbWatch = null,
                    i.fbWatchObserver = null,
                    i
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdFacebookWatch, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdFacebookWatch, [{
                    key: "ActualizeDetector",
                    value: function ActualizeDetector() {
                        var e = !1;
                        return this.FeedWatchContainer && (e = !0),
                        e
                    }
                }, {
                    key: "ActivateMutationObserver",
                    value: function ActivateMutationObserver() {
                        var e = this;
                        return this.fbWatch = this.FeedWatchContainer,
                        this.fbWatch && (this.fbWatchObserver || (this.fbWatchObserver = new MutationObserver(this.DetectCandidates.bind(this, s.AD_DETECTOR_INITIATOR_MUTATION)),
                        this.fbWatchObserver.observe(this.fbWatch, {
                            childList: !0,
                            subtree: !0
                        }),
                        window.addEventListener("beforeunload", (function() {
                            e.fbWatchObserver && (e.fbWatchObserver.disconnect(),
                            e.fbWatchObserver = null)
                        }
                        )))),
                        this.fbWatchObserver
                    }
                }, {
                    key: "DeactivateMutationObserver",
                    value: function DeactivateMutationObserver() {
                        this.fbWatchObserver && (this.fbWatchObserver.disconnect(),
                        this.fbWatchObserver = null)
                    }
                }, {
                    key: "Detector",
                    value: function Detector() {
                        var e = this.FeedWatchContainer;
                        if (e)
                            for (var t = Array.from(e.children), n = 0; n < t.length; n++) {
                                var r = t[n]
                                  , a = o.GetElementSize(r);
                                if (!r.hasAttribute(s.ATTRIBUTE_BIS_ID) && i.IsInitiallyRendered(r, a) && this.CheckIfAd(r)) {
                                    if (this.AdBlockerAgent.IsEnabledForFacebook())
                                        var c = this.HideAd(r, a, s.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH);
                                    if (this.CheckIfAdRendered(r, i.GetMinImgsSpacePercentag(this.fbConfig, s.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH))) {
                                        var l = o.GenerateAndSetBisIdToFBAds(r);
                                        this.addCoverImageSrcAttribute(r);
                                        var u = this.options.extractAdStaticPartTimeoutMs + o.GetRandomIntInRange(0, this.options.extractAdRandomPartTimeoutMs);
                                        this.AddHiddenTextTags(r),
                                        setTimeout(this.ReadyToExtractAd.bind(this, l, c), u)
                                    }
                                }
                            }
                    }
                }, {
                    key: "ReadyToExtractAd",
                    value: function ReadyToExtractAd(e, t) {
                        try {
                            if (e) {
                                var n = document.querySelector("[".concat(s.ATTRIBUTE_BIS_ID, "=").concat(e, "]"))
                                  , r = n.querySelector("[".concat(s.ATTRIBUTE_BIS_LABEL, '="fb_watch_ad"]'));
                                n && r ? this.ExtractAd(e, t, s.FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH) : (r.removeAttribute(s.ATTRIBUTE_BIS_ID),
                                n.removeAttribute(s.ATTRIBUTE_BIS_ID))
                            }
                        } catch (e) {}
                    }
                }, {
                    key: "CheckIfAd",
                    value: function CheckIfAd(e) {
                        for (var t = this.fbConfig.POSSIBLE_SPONSORED_TEXT_QUERIES, n = !1, r = 0; r < t.length && !n; r++)
                            for (var o = t[r], a = e.querySelectorAll(o), c = 0; c < a.length && !n; c++) {
                                var l = a[c]
                                  , u = l.innerText;
                                if (void 0 === u && "use" === l.tagName && l.hasAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG)) {
                                    var d = l.getAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG)
                                      , f = document.querySelector(d);
                                    u = f ? f.textContent : ""
                                }
                                var h = l.getAttribute(this.options.attributeWithSponsorAlly)
                                  , _ = h ? [u, h] : u;
                                if ("string" == typeof u && u.length && this.isTagSponsored(_))
                                    l.setAttribute(s.ATTRIBUTE_BIS_LABEL, "fb_watch_ad"),
                                    n = !0;
                                else if (!l.hasAttribute(s.ATTRIBUTE_BIS_LABEL)) {
                                    var A = i.GetVisibleSpansText(l, this.fbConfig.VISIBLE_SPANS_TEXT, this.fbConfig.SPONSORED_TEXTS);
                                    A && A !== u && A !== h && "string" == typeof A && A.length && this.isTagSponsored(A) && (l.setAttribute(s.ATTRIBUTE_BIS_LABEL, "fb_watch_ad"),
                                    n = !0)
                                }
                            }
                        return n
                    }
                }, {
                    key: "AddHiddenTextTags",
                    value: function AddHiddenTextTags(e) {
                        var t = e.querySelectorAll("svg>use");
                        if (t)
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n]
                                  , i = r.parentElement
                                  , o = r.getAttribute(this.fbConfig.XLING_HREF_ATTRIBUTE_FOR_SVG)
                                  , s = document.querySelector(o).cloneNode(!0);
                                s.style.display = "none",
                                i && i.appendChild(s)
                            }
                    }
                }, {
                    key: "isTagSponsored",
                    value: function isTagSponsored(e) {
                        var t = this
                          , n = !1;
                        if (!e)
                            return n;
                        if ("string" == typeof e)
                            n = this.fbConfig.SPONSORED_TEXTS.some((function(t) {
                                return e === t
                            }
                            ));
                        else {
                            var r = !0
                              , i = !1
                              , o = void 0;
                            try {
                                for (var s, a = function _loop() {
                                    var e = s.value;
                                    if (n = t.fbConfig.SPONSORED_TEXTS.some((function(t) {
                                        return e === t
                                    }
                                    )))
                                        return "break"
                                }, c = e[Symbol.iterator](); !(r = (s = c.next()).done); r = !0) {
                                    if ("break" === a())
                                        break
                                }
                            } catch (e) {
                                i = !0,
                                o = e
                            } finally {
                                try {
                                    r || null == c.return || c.return()
                                } finally {
                                    if (i)
                                        throw o
                                }
                            }
                        }
                        return n
                    }
                }, {
                    key: "GetAboutPageLink",
                    value: function GetAboutPageLink(e) {
                        var t = ""
                          , n = this.fbConfig.ABOUT_SECTION_CONFIG
                          , r = e.querySelector("*[".concat(s.ATTRIBUTE_BIS_LABEL, "='fb_watch_ad'"))
                          , i = e.querySelectorAll(n.HREF_PREFIX_WATCH);
                        if (r && i && i.length) {
                            for (var o = "", a = r.getBoundingClientRect().top, c = a - e.getBoundingClientRect().top, l = 0; l < i.length; l++) {
                                var u = i[l].getBoundingClientRect();
                                i[l].href && u.top < a && a - u.top < c && (c = a - u.top,
                                o = i[l].href)
                            }
                            if (o.length) {
                                var d = o.substring(n.HREF_TEMPLATE_WATCH.length, o.length);
                                t = n.ABOUT_PAGE_TEMPLATE.replace("%1", d.substring(0, d.indexOf("/")))
                            }
                        }
                        return t
                    }
                }, {
                    key: "addCoverImageSrcAttribute",
                    value: function addCoverImageSrcAttribute(e) {
                        var t = e.querySelector(this.fbConfig.FEED_WATCH_PAGE.COVER_IMAGE_QUERY);
                        if (t && t.hasAttribute("src")) {
                            var n = t.getAttribute("src");
                            e.setAttribute("data-cover-image-src", n)
                        }
                    }
                }, {
                    key: "FeedWatchContainer",
                    get: function get() {
                        for (var e = this.fbConfig.FEED_WATCH_PAGE.FEED_WATCH_QUERIES, t = e.length, n = !1, r = null, i = 0; i < t && !n; i++) {
                            var o = e[i]
                              , s = document.querySelector(o);
                            s && s.children.length > 2 && (r = s,
                            n = !0)
                        }
                        return r
                    }
                }]),
                PosdFacebookWatch
            }(r);
            e.exports = a
        }
        ,
        3718: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(1225)
              , i = function() {
                function PosdDocumentTargetUrlDetector() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdDocumentTargetUrlDetector)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdDocumentTargetUrlDetector, null, [{
                    key: "GetHyperlinkEmbeddedTargetUrlDataList",
                    value: function GetHyperlinkEmbeddedTargetUrlDataList(e, t, n) {
                        for (var i, o, s, a = r.QuerySelectorAll(t, "A[href]"), c = [], l = 0; l < a.length; l++)
                            if (i = a[l],
                            !r.IsInFilterList(n, i.href)) {
                                s = (o = r.GetElementSize(i)).w * o.h;
                                var u = i.querySelectorAll("img, canvas");
                                if (u.length)
                                    for (var d = void 0, f = void 0, h = 0; h < u.length; h++)
                                        (f = (d = r.GetElementSize(u[h])).w * d.h) > s && (s = f,
                                        o.w = d.w,
                                        o.h = d.h);
                                s >= 100 && r.isValidUrl(i.href) && c.push({
                                    href: i.href,
                                    square: s
                                })
                            }
                        return c && c.length,
                        c
                    }
                }, {
                    key: "GetDocumentEmbeddedTargetUrlDataList",
                    value: function GetDocumentEmbeddedTargetUrlDataList(e, t, n) {
                        var r = [this.strategyStrictFinalUrl, this.strategyScriptClickTag, this.strategyAppnexus, this.strategyNoscriptAnchors, this.strategyScriptJsonKeyWords]
                          , i = this.processStrategyList(t, r, n);
                        return i && i.length,
                        i
                    }
                }, {
                    key: "processStrategyList",
                    value: function processStrategyList(e, t, n) {
                        var r = []
                          , i = !0
                          , o = !1
                          , s = void 0;
                        try {
                            for (var a, c = t[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                var l = a.value;
                                try {
                                    var u = l(e, n);
                                    u && u.href && r.push(u)
                                } catch (e) {}
                            }
                        } catch (e) {
                            o = !0,
                            s = e
                        } finally {
                            try {
                                i || null == c.return || c.return()
                            } finally {
                                if (o)
                                    throw s
                            }
                        }
                        return r
                    }
                }, {
                    key: "strategyStrictFinalUrl",
                    value: function strategyStrictFinalUrl(e, t) {
                        for (var n = r.QuerySelectorAll(e, 'script[type="application/json"]'), i = 0; i < n.length; i++) {
                            var o = n[i].outerText;
                            if (o.length > 1 && "{" === o[0] && "}" === o[o.length - 1] && -1 != o.indexOf("targets") && -1 != o.indexOf("redirectUrl") && -1 != o.indexOf("finalUrl")) {
                                var s = JSON.parse(o);
                                if (void 0 !== s.targets && void 0 !== s.targets.redirectUrl && void 0 !== s.targets.redirectUrl.finalUrl) {
                                    var a = s.targets.redirectUrl.finalUrl;
                                    if (r.isValidUrl(a))
                                        return {
                                            href: a,
                                            square: 1e6
                                        }
                                }
                            }
                        }
                    }
                }, {
                    key: "strategyScriptClickTag",
                    value: function strategyScriptClickTag(e, t) {
                        for (var n = r.QuerySelectorAll(e, "script"), i = 0; i < n.length; i++) {
                            var o = n[i].outerText;
                            if (o.length > 1 && -1 !== o.indexOf("clickTag") && (o = o.replace(/\s/g, "")).startsWith('varclickTag="') && o.endsWith('";')) {
                                var s = o.indexOf('"')
                                  , a = o.lastIndexOf('"')
                                  , c = o.substring(s + 1, a);
                                if (r.isValidUrl(c))
                                    return {
                                        href: c,
                                        square: 1e6
                                    }
                            }
                        }
                    }
                }, {
                    key: "strategyAppnexus",
                    value: function strategyAppnexus(e, t) {
                        for (var n = r.QuerySelectorAll(e, ".GoogleActiveViewElement script"), i = Array.from(n).map((function(e) {
                            return e.innerHTML
                        }
                        )).filter((function(e) {
                            return e.indexOf("APPNEXUS.placement") >= 0
                        }
                        )), o = 0; o < i.length; o++) {
                            var s = extractAppnexusUrl(i[o]);
                            if (r.isValidUrl(s))
                                return {
                                    href: s,
                                    square: 1e6
                                }
                        }
                        function extractAppnexusUrl(e) {
                            var t = (e = e.replace(/(\r\n|\n|\r|\s)/gm, "")).match(/APPNEXUS.placement\(".+","(.+)",.+/);
                            return t && t.length > 1 ? t[1] : null
                        }
                    }
                }, {
                    key: "strategyNoscriptAnchors",
                    value: function strategyNoscriptAnchors(e, t) {
                        for (var n = r.QuerySelectorAll(e, "noscript"), i = 0; i < n.length; i++) {
                            var o = e.createElement("div");
                            o.innerHTML = n[i].innerText;
                            var s = o.querySelector("a[href]");
                            if (s) {
                                var a = s.getAttribute("href");
                                if (r.isValidUrl(a))
                                    return {
                                        href: a,
                                        square: 1
                                    }
                            }
                        }
                    }
                }, {
                    key: "strategyScriptJsonKeyWords",
                    value: function strategyScriptJsonKeyWords(e, t) {
                        var n = r.QuerySelectorAll(e, 'script[type="application/json"]')
                          , i = !0
                          , o = !1
                          , s = void 0;
                        try {
                            for (var a, c = n[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                var l = a.value.outerText;
                                if (l.length > 1 && "{" === l[0] && "}" === l[l.length - 1]) {
                                    var u = GetMatchedTargetUrl(JSON.parse(l), t);
                                    if (r.isValidUrl(u))
                                        return {
                                            href: u,
                                            square: 999999
                                        }
                                }
                            }
                        } catch (e) {
                            o = !0,
                            s = e
                        } finally {
                            try {
                                i || null == c.return || c.return()
                            } finally {
                                if (o)
                                    throw s
                            }
                        }
                        function GetMatchedTargetUrl(e, t) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : []
                              , i = t.WINDOW_TARGET_URL_SEARCH_DEPTH_LEVEL;
                            if (n.length > i)
                                return null;
                            var o = Object.getOwnPropertyNames(e)
                              , s = !0
                              , a = !1
                              , c = void 0;
                            try {
                                for (var l, u = o[Symbol.iterator](); !(s = (l = u.next()).done); s = !0) {
                                    var d = l.value;
                                    try {
                                        var f = e[d];
                                        if (!f)
                                            return null;
                                        var h = n.concat(d);
                                        if ("object" === _typeof(f)) {
                                            var _ = GetMatchedTargetUrl(f, t, h);
                                            if (_)
                                                return _
                                        } else if ("string" == typeof f && PropertyNameMatchesKeyWords(d, t) && r.isValidUrl(f))
                                            return f
                                    } catch (e) {}
                                }
                            } catch (e) {
                                a = !0,
                                c = e
                            } finally {
                                try {
                                    s || null == u.return || u.return()
                                } finally {
                                    if (a)
                                        throw c
                                }
                            }
                            return null
                        }
                        function PropertyNameMatchesKeyWords(e, t) {
                            var n = function PreparePropName(e) {
                                var t = e.toLowerCase();
                                return t.replace(/[^a-zA-Z]+/g, "")
                            }(e)
                              , r = t.WINDOW_TARGET_URL_PROPERTY_KEY_WORDS
                              , i = !0
                              , o = !1
                              , s = void 0;
                            try {
                                for (var a, c = r[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                    if (n === a.value)
                                        return !0
                                }
                            } catch (e) {
                                o = !0,
                                s = e
                            } finally {
                                try {
                                    i || null == c.return || c.return()
                                } finally {
                                    if (o)
                                        throw s
                                }
                            }
                            return !1
                        }
                    }
                }]),
                PosdDocumentTargetUrlDetector
            }();
            e.exports = i
        }
        ,
        8185: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(1225)
              , i = n(7983)
              , o = n(3718)
              , s = function() {
                function PosdTargetUrlDetector(e, t, n, i, o) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdTargetUrlDetector),
                    this.id = n,
                    this.fullIdStr = r.GetFullIdStr(e, t, n),
                    this.init = !1,
                    this.targetUrlDataList = [],
                    this.targetUrlDetected = !1,
                    this.IframesIO = null,
                    this.activationTargetUrlCandidates = i,
                    this.html5TargetUrlDetectionConfig = o.GetHtml5TargetUrlDetectionConfig(),
                    this.blacklistedTargetUrls = o.GetBlacklistTargetUrl(),
                    this.detectionTimerId = null,
                    this.onDetectTargetUrlCallBack = null
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdTargetUrlDetector, [{
                    key: "Init",
                    value: function Init(e) {
                        return e && (this.IframesIO = e,
                        this.init = !0),
                        this.init
                    }
                }, {
                    key: "DetectTargetUrl",
                    value: function DetectTargetUrl(e, t) {
                        if (this.init && !this.targetUrlDetected && this.html5TargetUrlDetectionConfig)
                            if (this.onDetectTargetUrlCallBack = t,
                            this.detectionTimerId = setTimeout(this.onTargetUrlDetectionTimout.bind(this), e),
                            this.activationTargetUrlCandidates && this.activationTargetUrlCandidates.length)
                                this.targetUrlDataList = this.activationTargetUrlCandidates,
                                this.TargetUrlDetected();
                            else {
                                var n = o.GetHyperlinkEmbeddedTargetUrlDataList(this.id, document, this.blacklistedTargetUrls);
                                this.targetUrlDataList = this.targetUrlDataList.concat(n);
                                var r = o.GetDocumentEmbeddedTargetUrlDataList(this.id, document, this.html5TargetUrlDetectionConfig);
                                r = PosdTargetUrlDetector.filterTargetUrlDataList(r, this.blacklistedTargetUrls),
                                this.targetUrlDataList = this.targetUrlDataList.concat(r),
                                this.targetUrlDataList && this.targetUrlDataList.length ? this.TargetUrlDetected() : this.IframesIO.ActivateWindowEmbeddedTargetUrlDetection(this.onGetWindowEmbeddedTargetUrlData.bind(this))
                            }
                    }
                }, {
                    key: "onGetWindowEmbeddedTargetUrlData",
                    value: function onGetWindowEmbeddedTargetUrlData(e) {
                        var t = this.filterTargetUrlDataList(e, this.blacklistedTargetUrls);
                        this.targetUrlDataList.push(t),
                        !t || t.length,
                        this.TargetUrlDetected()
                    }
                }, {
                    key: "onTargetUrlDetectionTimout",
                    value: function onTargetUrlDetectionTimout() {
                        this.targetUrlDetected || this.TargetUrlDetected()
                    }
                }, {
                    key: "TargetUrlDetected",
                    value: function TargetUrlDetected() {
                        this.targetUrlDetected = !0,
                        this.detectionTimerId && (clearTimeout(this.detectionTimerId),
                        this.detectionTimerId = null),
                        this.onDetectTargetUrlCallBack && this.onDetectTargetUrlCallBack()
                    }
                }, {
                    key: "FrameTargetUrl",
                    get: function get() {
                        return this.targetUrlDataList
                    }
                }], [{
                    key: "filterTargetUrlDataList",
                    value: function filterTargetUrlDataList(e, t) {
                        return e && 0 !== e.length ? e.filter((function(e) {
                            return !r.IsInFilterList(t, e.href)
                        }
                        )) : []
                    }
                }, {
                    key: "DetectTargetUrlFromWindowObj",
                    value: function DetectTargetUrlFromWindowObj(e, t, n) {
                        var r = []
                          , s = n.GetHtml5TargetUrlDetectionConfig()
                          , a = n.GetBlacklistTargetUrl();
                        try {
                            var c = o.GetHyperlinkEmbeddedTargetUrlDataList(e, t.document, s);
                            r = r.concat(c)
                        } catch (e) {}
                        try {
                            var l = o.GetDocumentEmbeddedTargetUrlDataList(e, t.document, s);
                            l = this.filterTargetUrlDataList(l, a),
                            r = r.concat(l)
                        } catch (e) {}
                        try {
                            var u = i.GetWindowEmbeddedTargetUrlDataList(e, t, s, this.defaultWindowProps);
                            u = this.filterTargetUrlDataList(u, a),
                            r = r.concat(u)
                        } catch (e) {}
                        return r && r.length,
                        r
                    }
                }]),
                PosdTargetUrlDetector
            }();
            e.exports = s
        }
        ,
        7983: e=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var t = function() {
                function PosdWindowTargetUrlDetector() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdWindowTargetUrlDetector)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdWindowTargetUrlDetector, null, [{
                    key: "GetWindowEmbeddedTargetUrlDataList",
                    value: function GetWindowEmbeddedTargetUrlDataList(e, t, n) {
                        var r = [function strategy1(e, t) {
                            if (void 0 !== e.clickTag && isValid(e.clickTag))
                                return {
                                    href: e.clickTag,
                                    square: 1000001
                                }
                        }
                        , function strategy2(e, t) {
                            if (void 0 !== e.adData && void 0 !== e.adData.destination_url && isValid(e.adData.destination_url))
                                return {
                                    href: e.adData.destination_url,
                                    square: 1000001
                                }
                        }
                        , function strategy3(e, t) {
                            if (void 0 !== e.BF && void 0 !== e.BF.Parameters && void 0 !== e.BF.Parameters.targeturl && isValid(e.BF.Parameters.targeturl))
                                return {
                                    href: e.BF.Parameters.targeturl,
                                    square: 1000001
                                }
                        }
                        , function strategy4(e, t) {
                            if (void 0 !== e.ADAPT && void 0 !== e.ADAPT.symbols && void 0 !== e.ADAPT.symbols.stage && void 0 !== e.ADAPT.symbols.stage.clickUrl && isValid(e.ADAPT.symbols.stage.clickUrl))
                                return {
                                    href: e.ADAPT.symbols.stage.clickUrl,
                                    square: 1000001
                                }
                        }
                        , function strategy5(e, t) {
                            if (void 0 !== e.admixAPI && void 0 !== e.admixAPI.ownerBanner && void 0 !== e.admixAPI.ownerBanner.clickUrl && isValid(e.admixAPI.ownerBanner.clickUrl))
                                return {
                                    href: e.admixAPI.ownerBanner.clickUrl,
                                    square: 1000001
                                }
                        }
                        , function strategyKeyWords(e, t) {
                            var n = function GetTargetUrlFromWindowMatchingKeyWords(e, t, n) {
                                var r = function GetCustomWindowPropertyNames(e, t) {
                                    var n = Object.getOwnPropertyNames(e);
                                    return n.filter((function(e) {
                                        return t.LOCAL_DEFAULT_WINDOWS_OBJECT_PROPERTIES.indexOf(e) < 0
                                    }
                                    ))
                                }(t, n);
                                if (!r || 0 === r.length)
                                    return null;
                                return GetMatchedTargetUrl(t, r, n)
                            }(0, e, t);
                            if (isValid(n))
                                return {
                                    href: n,
                                    square: 999999
                                }
                        }
                        ]
                          , i = function processStrategyList(e, t, n) {
                            var r = []
                              , i = !0
                              , o = !1
                              , s = void 0;
                            try {
                                for (var a, c = t[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                    var l = a.value;
                                    try {
                                        var u = l(e, n);
                                        u && u.href && r.push(u)
                                    } catch (e) {}
                                }
                            } catch (e) {
                                o = !0,
                                s = e
                            } finally {
                                try {
                                    i || null == c.return || c.return()
                                } finally {
                                    if (o)
                                        throw s
                                }
                            }
                            return r
                        }(t, r, n);
                        return i && i.length,
                        i;
                        function isValid(e) {
                            return "string" == typeof e && e.length > 0 && (-1 !== e.indexOf("http") || -1 !== e.indexOf("//"))
                        }
                        function GetMatchedTargetUrl(e, t, n) {
                            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : []
                              , i = n.WINDOW_TARGET_URL_SEARCH_DEPTH_LEVEL;
                            if (r.length > i)
                                return null;
                            var o = !0
                              , s = !1
                              , a = void 0;
                            try {
                                for (var c, l = t[Symbol.iterator](); !(o = (c = l.next()).done); o = !0) {
                                    var u = c.value;
                                    try {
                                        var d = e[u];
                                        if (!d)
                                            return null;
                                        var f = r.concat(u);
                                        if ("object" === _typeof(d)) {
                                            var h = GetMatchedTargetUrl(d, Object.getOwnPropertyNames(d), n, f);
                                            if (h)
                                                return h
                                        } else if ("string" == typeof d && PropertyNameMatchesKeyWords(u, n) && isValid(d))
                                            return d
                                    } catch (e) {}
                                }
                            } catch (e) {
                                s = !0,
                                a = e
                            } finally {
                                try {
                                    o || null == l.return || l.return()
                                } finally {
                                    if (s)
                                        throw a
                                }
                            }
                            return null
                        }
                        function PropertyNameMatchesKeyWords(e, t) {
                            var n = function PreparePropName(e) {
                                var t = e.toLowerCase();
                                return t.replace(/[^a-zA-Z]+/g, "")
                            }(e)
                              , r = t.WINDOW_TARGET_URL_PROPERTY_KEY_WORDS
                              , i = !0
                              , o = !1
                              , s = void 0;
                            try {
                                for (var a, c = r[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                    if (n === a.value)
                                        return !0
                                }
                            } catch (e) {
                                o = !0,
                                s = e
                            } finally {
                                try {
                                    i || null == c.return || c.return()
                                } finally {
                                    if (o)
                                        throw s
                                }
                            }
                            return !1
                        }
                    }
                }]),
                PosdWindowTargetUrlDetector
            }();
            e.exports = t
        }
        ,
        9751: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(3858)
              , i = n(893)
              , o = n(1290)
              , s = n(3124)
              , a = n(5212)
              , c = n(8962)
              , l = n(5427)
              , u = function() {
                function PosdPinterestAds(e, t, n, r) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdPinterestAds),
                    this.id = e,
                    this.IOManager = n,
                    this.AdBlockerAgent = r,
                    this.pinterestConfig = t.PinterestConfig,
                    this.available = !1,
                    this.pinterestContent = null,
                    this.pinterestFeedDetector = null,
                    this.pinterestPinDetector = null,
                    this.pinterestSearchDetector = null,
                    this.VideoTrafficDetector = null
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdPinterestAds, [{
                    key: "onPageUrlChanged",
                    value: function onPageUrlChanged(e, t) {
                        var n = this;
                        this.available && setTimeout((function() {
                            n.DeactivateDetectors(),
                            n.ActivateDetectors()
                        }
                        ), 100)
                    }
                }, {
                    key: "PageRefreshed",
                    value: function PageRefreshed(e, t) {
                        this.pageUrl = e,
                        this.ticketId = t,
                        this.onPageUrlChanged && this.onPageUrlChanged(e, t)
                    }
                }, {
                    key: "ActivateDetector",
                    value: function ActivateDetector(e) {
                        e === s.ACTIVATION_BY_ADS_MANAGER && (this.available = !0),
                        this.pinterestContent = document.querySelector(this.pinterestConfig.MAIN_CONTAINER_QUERY),
                        this.pinterestContent && (this.pinterestFeedDetector = new r(this.id,this.pinterestConfig,this.AdBlockerAgent),
                        this.pinterestFeedDetector.getGlobalContainer = this.GetGlobalContainer.bind(this),
                        this.pinterestFeedDetector.sendAdCandidatesToBackground = this.sendPinterestAd.bind(this),
                        this.pinterestFeedDetector.onPageUrlChanged = this.onPageUrlChanged.bind(this),
                        this.pinterestFeedDetector.getUniqueContentId = this.getUniqueContentId.bind(this),
                        this.pinterestSearchDetector = new o(this.id,this.pinterestConfig,this.AdBlockerAgent),
                        this.pinterestSearchDetector.getGlobalContainer = this.GetGlobalContainer.bind(this),
                        this.pinterestSearchDetector.sendAdCandidatesToBackground = this.sendPinterestAd.bind(this),
                        this.pinterestSearchDetector.onPageUrlChanged = this.onPageUrlChanged.bind(this),
                        this.pinterestSearchDetector.getUniqueContentId = this.getUniqueContentId.bind(this),
                        this.pinterestPinDetector = new i(this.id,this.pinterestConfig,this.AdBlockerAgent),
                        this.pinterestPinDetector.getGlobalContainer = this.GetGlobalContainer.bind(this),
                        this.pinterestPinDetector.sendAdCandidatesToBackground = this.sendPinterestAd.bind(this),
                        this.pinterestPinDetector.onPageUrlChanged = this.onPageUrlChanged.bind(this),
                        this.pinterestPinDetector.getUniqueContentId = this.getUniqueContentId.bind(this),
                        this.ActivateDetectors())
                    }
                }, {
                    key: "ActivateDetectors",
                    value: function ActivateDetectors() {
                        this.pinterestFeedDetector.ActivateDetector(),
                        this.pinterestSearchDetector.ActivateDetector(),
                        this.pinterestPinDetector.ActivateDetector()
                    }
                }, {
                    key: "DeactivateDetectors",
                    value: function DeactivateDetectors() {
                        this.pinterestFeedDetector.DeactivateDetector(),
                        this.pinterestSearchDetector.DeactivateDetector(),
                        this.pinterestPinDetector.DeactivateDetector()
                    }
                }, {
                    key: "ActivateVideoTrafficDetector",
                    value: function ActivateVideoTrafficDetector(e) {
                        this.VideoTrafficDetector || (this.VideoTrafficDetector = new l(this.id),
                        this.VideoTrafficDetector.InjectDetector(this.id + "_p", JSON.stringify(this.pinterestConfig)))
                    }
                }, {
                    key: "GetGlobalContainer",
                    value: function GetGlobalContainer() {
                        return this.pinterestContent
                    }
                }, {
                    key: "getUniqueContentId",
                    value: function getUniqueContentId(e) {
                        var t = e.querySelector("div[".concat(this.pinterestConfig.FEED_PAGE.UNIQUE_ATTRIBUTE, "]"));
                        return t ? t.getAttribute(this.pinterestConfig.FEED_PAGE.UNIQUE_ATTRIBUTE) : ""
                    }
                }, {
                    key: "sendPinterestAd",
                    value: function sendPinterestAd(e, t) {
                        var n = document.querySelector("[".concat(s.ATTRIBUTE_BIS_ID, "=").concat(e, "]"));
                        n && (a.SendAdCandidates(this.id, [t], s.MESSAGE_TYPE_CANDIDATES_DATA_PINTEREST, null),
                        c.CONFIG_MARK_AD_CANDIDATES && c.CONFIG_MARK_PROCESSED_AD_CANDIDATES && (t.videoData ? n.style.cssText += s.STYLES_OUTLINE_VIDEO_AD : n.style.cssText += s.STYLES_OUTLINE_SUCCESS_DETECT))
                    }
                }]),
                PosdPinterestAds
            }();
            e.exports = u
        }
        ,
        3858: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(9543)
              , i = n(3124)
              , o = n(1225)
              , s = function(e) {
                function PosdPinterestFeed(e, t, n) {
                    var r;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdPinterestFeed),
                    (r = _possibleConstructorReturn(this, _getPrototypeOf(PosdPinterestFeed).call(this, e))).id = e,
                    r.pinterestConfig = t,
                    r.adBlockerAgent = n,
                    r.feedContainer = null,
                    r.lastFeedAdsCheckTime = 0,
                    r.feedObserver = null,
                    r.observerNodesListenerInterval = null,
                    r.observerNodesChecksAmount = 0,
                    r.onPageRefreshed = r.onPageUrlChanged,
                    r
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdPinterestFeed, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdPinterestFeed, [{
                    key: "onPageUrlChanged",
                    value: function onPageUrlChanged() {}
                }, {
                    key: "ActivateDetector",
                    value: function ActivateDetector() {
                        var e = this;
                        if (!this.isActive && this.isFeedPageURL()) {
                            this.setActive = !0,
                            this.lastFeedAdsCheckTime = o.GetCurrentTimestampMs() - 3e3;
                            var t = this.processFeedAds.bind(this);
                            this.processPinterestAdsInterval = setInterval(t, 1e3),
                            this.adBlockerAgent.IsEnabledForPinterest() && (this.processFeedAds(),
                            setTimeout(this.processFeedAds.bind(this), 350),
                            setTimeout(this.processFeedAds.bind(this), 700));
                            var n = function() {
                                if (e.observerNodesChecksAmount = e.observerNodesChecksAmount + 1,
                                e.feedContainer = e.getFeedContainer(),
                                !e.feedObserver && e.feedContainer) {
                                    var t = e.processFeedAds.bind(e);
                                    e.feedObserver = new MutationObserver(t),
                                    e.feedObserver.observe(e.feedContainer, {
                                        childList: !0,
                                        subtree: !0
                                    })
                                }
                            }
                            .bind(this);
                            this.observerNodesListenerInterval = setInterval(n, 300)
                        }
                    }
                }, {
                    key: "DeactivateDetector",
                    value: function DeactivateDetector() {
                        this.processPinterestAdsInterval && (clearInterval(this.processPinterestAdsInterval),
                        this.processPinterestAdsInterval = null),
                        this.observerNodesListenerInterval && (clearInterval(this.observerNodesListenerInterval),
                        this.observerNodesListenerInterval = null),
                        this.feedObserver && (this.feedObserver.disconnect(),
                        this.feedObserver = null,
                        this.feedContainer = null),
                        this.observerNodesChecksAmount = 0,
                        this.setActive = !1
                    }
                }, {
                    key: "processFeedAds",
                    value: function processFeedAds() {
                        var e = this
                          , t = this.detectPromotedPins();
                        if (t && t.length) {
                            var n = !0
                              , r = !1
                              , s = void 0;
                            try {
                                for (var a, c = t[Symbol.iterator](); !(n = (a = c.next()).done); n = !0) {
                                    var l = a.value;
                                    o.GetElementSize(l);
                                    l.hasAttribute(i.ATTRIBUTE_BIS_ID) || function() {
                                        var t = o.GenerateAndSetBisIdToPinterestAds(l);
                                        e.setSizesAndIdForAllElements(l);
                                        var n = e.createHTML(l)
                                          , r = e.getAdvertiserName(l)
                                          , s = e.getTargetUrl(l)
                                          , a = e.getTitleText(l)
                                          , c = e.getAdvertiserUrl(l)
                                          , u = e.getAdPinterestObject(l, n, r, s, a, c, i.PINTEREST_AD_PLACEMENT_TYPE_FEED);
                                        e.isVideo(l) && (u.videoData = {}),
                                        e.adBlockerAgent.IsEnabledForPinterest() && (e.HideElement(l),
                                        e.adBlockerAgent.SetHiddenAmount(1)),
                                        e.removeCloneElement(n);
                                        var d = setTimeout((function() {
                                            e.sendAdCandidatesToBackground.call(e, t, u),
                                            clearTimeout(d)
                                        }
                                        ), 100)
                                    }()
                                }
                            } catch (e) {
                                r = !0,
                                s = e
                            } finally {
                                try {
                                    n || null == c.return || c.return()
                                } finally {
                                    if (r)
                                        throw s
                                }
                            }
                        }
                    }
                }, {
                    key: "detectPromotedPins",
                    value: function detectPromotedPins() {
                        var e = this;
                        if (!this.feedContainer)
                            return [];
                        for (var t = [], n = this.pinterestConfig.FEED_PAGE.IMG_SPACE_PERCENTAGE, r = this.pinterestConfig.FEED_PAGE.PROMOTED_PINS_QUERY_BY_REGEXP, i = Array.from(this.feedContainer.childNodes), o = this.pinterestConfig.PROMOTED_ALIASES, s = 0, a = i; s < a.length; s++) {
                            var c = a[s];
                            if (this.IsPostContentRendered(c, n))
                                if ("continue" === function() {
                                    var n = c.querySelector(e.pinterestConfig.FEED_PAGE.PROMOTED_PINS_QUERY);
                                    if (!n)
                                        return "continue";
                                    var i = n.innerText;
                                    if (!i) {
                                        i = n.textContent;
                                        var s = !0
                                          , a = !1
                                          , l = void 0;
                                        try {
                                            for (var u, d = r[Symbol.iterator](); !(s = (u = d.next()).done); s = !0) {
                                                var f = u.value
                                                  , h = f[0]
                                                  , _ = f[1]
                                                  , A = "join" !== h ? new RegExp(_,"g") : "";
                                                i = "replace" === h ? i[h](A, "") : i[h](A)
                                            }
                                        } catch (e) {
                                            a = !0,
                                            l = e
                                        } finally {
                                            try {
                                                s || null == d.return || d.return()
                                            } finally {
                                                if (a)
                                                    throw l
                                            }
                                        }
                                    }
                                    o.some((function(e) {
                                        return i.search(e) >= 0
                                    }
                                    )) && t.push(c)
                                }())
                                    continue
                        }
                        return t
                    }
                }, {
                    key: "getFeedContainer",
                    value: function getFeedContainer() {
                        var e = this.getGlobalContainer()
                          , t = null;
                        return e ? t = e.querySelector(this.pinterestConfig.FEED_PAGE.CONTAINER_QUERY) : t
                    }
                }, {
                    key: "createHTML",
                    value: function createHTML(e) {
                        var t = document.createElement("html")
                          , n = this.cloneBodyWithStyles
                          , r = this.cloneHeadWithStyles
                          , i = e.cloneNode(!0);
                        return this.styleFixes(i),
                        n.appendChild(i),
                        t.appendChild(r),
                        t.appendChild(n),
                        t
                    }
                }, {
                    key: "IsPostContentRendered",
                    value: function IsPostContentRendered(e, t) {
                        var n = !1;
                        if (e) {
                            var r = o.GetFullElementSize(e);
                            if (r.w > 0)
                                o.GetImagesSpacePercentage(this.pinterestConfig.FEED_PAGE.TAGS_FOR_LOADING_CHECK, e, r) >= t && (n = !0)
                        }
                        return n
                    }
                }, {
                    key: "getAdvertiserName",
                    value: function getAdvertiserName(e) {
                        var t = this.pinterestConfig.FEED_PAGE.ADVERTISER_NAME_QUERY
                          , n = e.querySelector(t);
                        return n ? n.innerText : ""
                    }
                }, {
                    key: "getAdvertiserUrl",
                    value: function getAdvertiserUrl(e) {
                        var t = this.pinterestConfig.FEED_PAGE.ADVERTISER_PINTEREST_URL_QUERY
                          , n = e.querySelector(t);
                        return n ? n.href : ""
                    }
                }, {
                    key: "styleFixes",
                    value: function styleFixes(e) {
                        e.style.cssText = e.style.cssText.replace(/transform.[^;]*;/, "");
                        var t = !0
                          , n = !1
                          , r = void 0;
                        try {
                            for (var o, s = this.pinterestConfig.FEED_PAGE.STYLE_FIXES[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
                                var a = o.value
                                  , c = e.querySelector(a.ELEMENT_QUERY)
                                  , l = a.NEW_RULES;
                                if (c) {
                                    if (a.NEW_RULES.includes("${")) {
                                        var u = JSON.parse(c.getAttribute(i.ATTRIBUTE_BIS_SIZE)).h;
                                        l = a.NEW_RULES.replace(/\$\{.[^}]*\}/, u)
                                    }
                                    c.style.cssText += l
                                }
                            }
                        } catch (e) {
                            n = !0,
                            r = e
                        } finally {
                            try {
                                t || null == s.return || s.return()
                            } finally {
                                if (n)
                                    throw r
                            }
                        }
                    }
                }, {
                    key: "isVideo",
                    value: function isVideo(e) {
                        return !(!e || !e.querySelectorAll(this.pinterestConfig.FEED_PAGE.TAGS_FOR_VIDEO_CHECK).length)
                    }
                }, {
                    key: "getTargetUrl",
                    value: function getTargetUrl(e) {
                        var t = this.pinterestConfig.FEED_PAGE.TARGET_URL_QUERY
                          , n = e.querySelector(t)
                          , r = "";
                        return n && n.href && (r = n.href),
                        r
                    }
                }, {
                    key: "getTitleText",
                    value: function getTitleText(e) {
                        var t = this.pinterestConfig.FEED_PAGE.TITLE_TEXT_QUERY
                          , n = e.querySelector(t)
                          , r = "";
                        return n && n.textContent.length && (r = n.textContent),
                        r
                    }
                }, {
                    key: "isFeedPageURL",
                    value: function isFeedPageURL() {
                        return -1 === document.location.href.search(/\.pinterest\..{1,6}\/(pin|search)\//)
                    }
                }, {
                    key: "cloneBodyWithStyles",
                    get: function get() {
                        var e = document.createElement("body")
                          , t = document.querySelectorAll("body style");
                        return t && t.forEach((function(t) {
                            var n = t.cloneNode(!0);
                            e.appendChild(n)
                        }
                        )),
                        e
                    }
                }, {
                    key: "cloneHeadWithStyles",
                    get: function get() {
                        var e = document.createElement("head")
                          , t = document.querySelectorAll('head link[rel="stylesheet"], head script');
                        return t && t.forEach((function(t) {
                            var n = t.cloneNode();
                            e.appendChild(n)
                        }
                        )),
                        e
                    }
                }]),
                PosdPinterestFeed
            }(r);
            e.exports = s
        }
        ,
        893: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(9543)
              , i = n(3124)
              , o = n(1225)
              , s = function(e) {
                function PosdPinterestPin(e, t, n) {
                    var r;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdPinterestPin),
                    (r = _possibleConstructorReturn(this, _getPrototypeOf(PosdPinterestPin).call(this, e))).id = e,
                    r.pinterestConfig = t,
                    r.adBlockerAgent = n,
                    r.pinContainer = null,
                    r.lastPinAdsCheckTime = 0,
                    r.pinObserver = null,
                    r.observerNodesListenerInterval = null,
                    r.observerNodesChecksAmount = 0,
                    r
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdPinterestPin, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdPinterestPin, [{
                    key: "onPageUrlChanged",
                    value: function onPageUrlChanged() {}
                }, {
                    key: "ActivateDetector",
                    value: function ActivateDetector() {
                        var e = this;
                        if (!this.isActive && this.isPinPageURL()) {
                            this.setActive = !0,
                            this.lastPinAdsCheckTime = o.GetCurrentTimestampMs() - 3e3;
                            var t = this.processPinAds.bind(this);
                            this.processPinterestAdsInterval = setInterval(t, 1e3),
                            this.adBlockerAgent.IsEnabledForPinterest() && (this.processPinAds(),
                            setTimeout(this.processPinAds.bind(this), 350),
                            setTimeout(this.processPinAds.bind(this), 700));
                            var n = function() {
                                if (e.observerNodesChecksAmount = e.observerNodesChecksAmount + 1,
                                e.pinContainer = e.getPinContainer(),
                                !e.pinObserver && e.pinContainer) {
                                    var t = e.processPinAds.bind(e);
                                    e.pinObserver = new MutationObserver(t),
                                    e.pinObserver.observe(e.pinContainer, {
                                        childList: !0,
                                        subtree: !0
                                    })
                                }
                            }
                            .bind(this);
                            this.observerNodesListenerInterval = setInterval(n, 300)
                        }
                    }
                }, {
                    key: "DeactivateDetector",
                    value: function DeactivateDetector() {
                        this.processPinterestAdsInterval && (clearInterval(this.processPinterestAdsInterval),
                        this.processPinterestAdsInterval = null),
                        this.observerNodesListenerInterval && (clearInterval(this.observerNodesListenerInterval),
                        this.observerNodesListenerInterval = null),
                        this.pinObserver && (this.pinObserver.disconnect(),
                        this.pinObserver = null,
                        this.pinContainer = null),
                        this.observerNodesChecksAmount = 0,
                        this.setActive = !1
                    }
                }, {
                    key: "processPinAds",
                    value: function processPinAds() {
                        var e = this
                          , t = this.detectPromotedPins();
                        if (t && t.length) {
                            var n = !0
                              , r = !1
                              , s = void 0;
                            try {
                                for (var a, c = t[Symbol.iterator](); !(n = (a = c.next()).done); n = !0) {
                                    var l = a.value;
                                    o.GetElementSize(l);
                                    l.hasAttribute(i.ATTRIBUTE_BIS_ID) || function() {
                                        var t = o.GenerateAndSetBisIdToPinterestAds(l);
                                        e.setSizesAndIdForAllElements(l);
                                        var n = e.createHTML(l)
                                          , r = e.getAdvertiserName(l)
                                          , s = e.getTargetUrl(l)
                                          , a = e.getTitleText(l)
                                          , c = e.getAdvertiserUrl(l)
                                          , u = e.getAdPinterestObject(l, n, r, s, a, c, i.PINTEREST_AD_PLACEMENT_TYPE_PIN);
                                        e.isVideo(l) && (u.videoData = {}),
                                        e.adBlockerAgent.IsEnabledForPinterest() && (e.HideElement(l),
                                        e.adBlockerAgent.SetHiddenAmount(1)),
                                        e.removeCloneElement(n);
                                        var d = setTimeout((function() {
                                            e.sendAdCandidatesToBackground.call(e, t, u),
                                            clearTimeout(d)
                                        }
                                        ), 100)
                                    }()
                                }
                            } catch (e) {
                                r = !0,
                                s = e
                            } finally {
                                try {
                                    n || null == c.return || c.return()
                                } finally {
                                    if (r)
                                        throw s
                                }
                            }
                        }
                    }
                }, {
                    key: "detectPromotedPins",
                    value: function detectPromotedPins() {
                        var e = this;
                        if (!this.pinContainer)
                            return [];
                        for (var t = [], n = this.pinterestConfig.PIN_PAGE.IMG_SPACE_PERCENTAGE, r = this.pinterestConfig.PIN_PAGE.PROMOTED_PINS_QUERY_BY_REGEXP, i = Array.from(this.pinContainer.childNodes), o = this.pinterestConfig.PROMOTED_ALIASES, s = 0, a = i; s < a.length; s++) {
                            var c = a[s];
                            if (this.IsPostContentRendered(c, n))
                                if ("continue" === function() {
                                    var n = c.querySelector(e.pinterestConfig.PIN_PAGE.PROMOTED_PINS_QUERY);
                                    if (!n)
                                        return "continue";
                                    var i = n.innerText;
                                    if (!i) {
                                        i = n.textContent;
                                        var s = !0
                                          , a = !1
                                          , l = void 0;
                                        try {
                                            for (var u, d = r[Symbol.iterator](); !(s = (u = d.next()).done); s = !0) {
                                                var f = u.value
                                                  , h = f[0]
                                                  , _ = f[1]
                                                  , A = "join" !== h ? new RegExp(_,"g") : "";
                                                i = "replace" === h ? i[h](A, "") : i[h](A)
                                            }
                                        } catch (e) {
                                            a = !0,
                                            l = e
                                        } finally {
                                            try {
                                                s || null == d.return || d.return()
                                            } finally {
                                                if (a)
                                                    throw l
                                            }
                                        }
                                    }
                                    o.some((function(e) {
                                        return i.search(e) >= 0
                                    }
                                    )) && t.push(c)
                                }())
                                    continue
                        }
                        return t
                    }
                }, {
                    key: "getPinContainer",
                    value: function getPinContainer() {
                        var e = this.getGlobalContainer()
                          , t = null;
                        return e ? t = e.querySelector(this.pinterestConfig.PIN_PAGE.CONTAINER_QUERY) : t
                    }
                }, {
                    key: "createHTML",
                    value: function createHTML(e) {
                        var t = document.createElement("html")
                          , n = this.cloneBodyWithStyles
                          , r = this.cloneHeadWithStyles
                          , i = e.cloneNode(!0);
                        return this.styleFixes(i),
                        n.appendChild(i),
                        t.appendChild(r),
                        t.appendChild(n),
                        t
                    }
                }, {
                    key: "IsPostContentRendered",
                    value: function IsPostContentRendered(e, t) {
                        var n = !1;
                        if (e) {
                            var r = o.GetFullElementSize(e);
                            if (r.w > 0)
                                o.GetImagesSpacePercentage(this.pinterestConfig.PIN_PAGE.TAGS_FOR_LOADING_CHECK, e, r) >= t && (n = !0)
                        }
                        return n
                    }
                }, {
                    key: "getAdvertiserName",
                    value: function getAdvertiserName(e) {
                        var t = this.pinterestConfig.PIN_PAGE.ADVERTISER_NAME_QUERY
                          , n = e.querySelector(t);
                        return n ? n.innerText : ""
                    }
                }, {
                    key: "getAdvertiserUrl",
                    value: function getAdvertiserUrl(e) {
                        var t = this.pinterestConfig.PIN_PAGE.ADVERTISER_PINTEREST_URL_QUERY
                          , n = e.querySelector(t);
                        return n ? n.href : ""
                    }
                }, {
                    key: "getTitleText",
                    value: function getTitleText(e) {
                        var t = this.pinterestConfig.PIN_PAGE.TITLE_TEXT_QUERY
                          , n = e.querySelector(t)
                          , r = "";
                        return n && n.textContent.length && (r = n.textContent),
                        r
                    }
                }, {
                    key: "styleFixes",
                    value: function styleFixes(e) {
                        e.style.cssText = e.style.cssText.replace(/transform.[^;]*;/, "");
                        var t = !0
                          , n = !1
                          , r = void 0;
                        try {
                            for (var o, s = this.pinterestConfig.PIN_PAGE.STYLE_FIXES[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
                                var a = o.value
                                  , c = e.querySelector(a.ELEMENT_QUERY)
                                  , l = a.NEW_RULES;
                                if (c) {
                                    if (a.NEW_RULES.includes("${")) {
                                        var u = JSON.parse(c.getAttribute(i.ATTRIBUTE_BIS_SIZE)).h;
                                        l = a.NEW_RULES.replace(/\$\{.[^}]*\}/, u)
                                    }
                                    c.style.cssText += l
                                }
                            }
                        } catch (e) {
                            n = !0,
                            r = e
                        } finally {
                            try {
                                t || null == s.return || s.return()
                            } finally {
                                if (n)
                                    throw r
                            }
                        }
                    }
                }, {
                    key: "isVideo",
                    value: function isVideo(e) {
                        return !(!e || !e.querySelectorAll(this.pinterestConfig.PIN_PAGE.TAGS_FOR_VIDEO_CHECK).length)
                    }
                }, {
                    key: "getTargetUrl",
                    value: function getTargetUrl(e) {
                        var t = this.pinterestConfig.PIN_PAGE.TARGET_URL_QUERY
                          , n = e.querySelector(t)
                          , r = "";
                        return n && n.href && (r = n.href),
                        r
                    }
                }, {
                    key: "isPinPageURL",
                    value: function isPinPageURL() {
                        return !(-1 === document.location.href.search(/\.pinterest\..{1,6}\/(pin)\//))
                    }
                }, {
                    key: "cloneBodyWithStyles",
                    get: function get() {
                        var e = document.createElement("body")
                          , t = document.querySelectorAll("body style");
                        return t && t.forEach((function(t) {
                            var n = t.cloneNode(!0);
                            e.appendChild(n)
                        }
                        )),
                        e
                    }
                }, {
                    key: "cloneHeadWithStyles",
                    get: function get() {
                        var e = document.createElement("head")
                          , t = document.querySelectorAll('head link[rel="stylesheet"], head script');
                        return t && t.forEach((function(t) {
                            var n = t.cloneNode();
                            e.appendChild(n)
                        }
                        )),
                        e
                    }
                }]),
                PosdPinterestPin
            }(r);
            e.exports = s
        }
        ,
        1290: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(9543)
              , i = n(3124)
              , o = n(1225)
              , s = function(e) {
                function PosdPinterestSearch(e, t, n) {
                    var r;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdPinterestSearch),
                    (r = _possibleConstructorReturn(this, _getPrototypeOf(PosdPinterestSearch).call(this, e))).id = e,
                    r.pinterestConfig = t,
                    r.adBlockerAgent = n,
                    r.searchContainer = null,
                    r.lastSearchPageAdsCheckTime = 0,
                    r.searchPageObserver = null,
                    r.observerNodesListenerInterval = null,
                    r.observerNodesChecksAmount = 0,
                    r.onPageRefreshed = r.onPageUrlChanged,
                    r
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdPinterestSearch, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdPinterestSearch, [{
                    key: "onPageUrlChanged",
                    value: function onPageUrlChanged() {}
                }, {
                    key: "ActivateDetector",
                    value: function ActivateDetector() {
                        var e = this;
                        if (!this.isActive && this.isSearchPageURL()) {
                            this.setActive = !0,
                            this.lastSearchPageAdsCheckTime = o.GetCurrentTimestampMs() - 3e3;
                            var t = this.processSearchPageAds.bind(this);
                            this.processPinterestAdsInterval = setInterval(t, 1e3),
                            this.adBlockerAgent.IsEnabledForPinterest() && (this.processSearchPageAds(),
                            setTimeout(this.processSearchPageAds.bind(this), 350),
                            setTimeout(this.processSearchPageAds.bind(this), 700));
                            var n = function() {
                                if (e.observerNodesChecksAmount = e.observerNodesChecksAmount + 1,
                                e.searchContainer = e.getSearchContainer(),
                                !e.searchPageObserver && e.searchContainer) {
                                    var t = e.processSearchPageAds.bind(e);
                                    e.searchPageObserver = new MutationObserver(t),
                                    e.searchPageObserver.observe(e.searchContainer, {
                                        childList: !0,
                                        subtree: !0
                                    })
                                }
                            }
                            .bind(this);
                            this.observerNodesListenerInterval = setInterval(n, 300)
                        }
                    }
                }, {
                    key: "DeactivateDetector",
                    value: function DeactivateDetector() {
                        this.processPinterestAdsInterval && (clearInterval(this.processPinterestAdsInterval),
                        this.processPinterestAdsInterval = null),
                        this.observerNodesListenerInterval && (clearInterval(this.observerNodesListenerInterval),
                        this.observerNodesListenerInterval = null),
                        this.searchPageObserver && (this.searchPageObserver.disconnect(),
                        this.searchPageObserver = null,
                        this.searchContainer = null),
                        this.observerNodesChecksAmount = 0,
                        this.setActive = !1
                    }
                }, {
                    key: "processSearchPageAds",
                    value: function processSearchPageAds() {
                        var e = this
                          , t = this.detectPromotedPins();
                        if (t && t.length) {
                            var n = !0
                              , r = !1
                              , s = void 0;
                            try {
                                for (var a, c = t[Symbol.iterator](); !(n = (a = c.next()).done); n = !0) {
                                    var l = a.value;
                                    o.GetElementSize(l);
                                    l.hasAttribute(i.ATTRIBUTE_BIS_ID) || function() {
                                        var t = o.GenerateAndSetBisIdToPinterestAds(l);
                                        e.setSizesAndIdForAllElements(l);
                                        var n = e.createHTML(l)
                                          , r = e.getAdvertiserName(l)
                                          , s = e.getTargetUrl(l)
                                          , a = e.getTitleText(l)
                                          , c = e.getAdvertiserUrl(l)
                                          , u = e.getAdPinterestObject(l, n, r, s, a, c, i.PINTEREST_AD_PLACEMENT_TYPE_SEARCH);
                                        e.isVideo(l) && (u.videoData = {}),
                                        e.adBlockerAgent.IsEnabledForPinterest() && (e.HideElement(l),
                                        e.adBlockerAgent.SetHiddenAmount(1)),
                                        e.removeCloneElement(n);
                                        var d = setTimeout((function() {
                                            e.sendAdCandidatesToBackground.call(e, t, u),
                                            clearTimeout(d)
                                        }
                                        ), 100)
                                    }()
                                }
                            } catch (e) {
                                r = !0,
                                s = e
                            } finally {
                                try {
                                    n || null == c.return || c.return()
                                } finally {
                                    if (r)
                                        throw s
                                }
                            }
                        }
                    }
                }, {
                    key: "detectPromotedPins",
                    value: function detectPromotedPins() {
                        var e = this;
                        if (!this.searchContainer)
                            return [];
                        for (var t = [], n = this.pinterestConfig.SEARCH_PAGE.IMG_SPACE_PERCENTAGE, r = this.pinterestConfig.SEARCH_PAGE.PROMOTED_PINS_QUERY_BY_REGEXP, i = Array.from(this.searchContainer.childNodes), o = this.pinterestConfig.PROMOTED_ALIASES, s = 0, a = i; s < a.length; s++) {
                            var c = a[s];
                            if (this.IsPostContentRendered(c, n))
                                if ("continue" === function() {
                                    var n = c.querySelector(e.pinterestConfig.SEARCH_PAGE.PROMOTED_PINS_QUERY);
                                    if (!n)
                                        return "continue";
                                    var i = n.innerText;
                                    if (!i) {
                                        i = n.textContent;
                                        var s = !0
                                          , a = !1
                                          , l = void 0;
                                        try {
                                            for (var u, d = r[Symbol.iterator](); !(s = (u = d.next()).done); s = !0) {
                                                var f = u.value
                                                  , h = f[0]
                                                  , _ = f[1]
                                                  , A = "join" !== h ? new RegExp(_,"g") : "";
                                                i = "replace" === h ? i[h](A, "") : i[h](A)
                                            }
                                        } catch (e) {
                                            a = !0,
                                            l = e
                                        } finally {
                                            try {
                                                s || null == d.return || d.return()
                                            } finally {
                                                if (a)
                                                    throw l
                                            }
                                        }
                                    }
                                    o.some((function(e) {
                                        return i.search(e) >= 0
                                    }
                                    )) && t.push(c)
                                }())
                                    continue
                        }
                        return t
                    }
                }, {
                    key: "getSearchContainer",
                    value: function getSearchContainer() {
                        var e = this.getGlobalContainer()
                          , t = null;
                        return e ? t = e.querySelector(this.pinterestConfig.SEARCH_PAGE.CONTAINER_QUERY) : t
                    }
                }, {
                    key: "createHTML",
                    value: function createHTML(e) {
                        var t = document.createElement("html")
                          , n = this.cloneBodyWithStyles
                          , r = this.cloneHeadWithStyles
                          , i = e.cloneNode(!0);
                        return this.styleFixes(i),
                        n.appendChild(i),
                        t.appendChild(r),
                        t.appendChild(n),
                        t
                    }
                }, {
                    key: "IsPostContentRendered",
                    value: function IsPostContentRendered(e, t) {
                        var n = !1;
                        if (e) {
                            var r = o.GetFullElementSize(e);
                            if (r.w > 0)
                                o.GetImagesSpacePercentage(this.pinterestConfig.SEARCH_PAGE.TAGS_FOR_LOADING_CHECK, e, r) >= t && (n = !0)
                        }
                        return n
                    }
                }, {
                    key: "getAdvertiserName",
                    value: function getAdvertiserName(e) {
                        var t = this.pinterestConfig.SEARCH_PAGE.ADVERTISER_NAME_QUERY
                          , n = e.querySelector(t);
                        return n ? n.innerText : ""
                    }
                }, {
                    key: "getAdvertiserUrl",
                    value: function getAdvertiserUrl(e) {
                        var t = this.pinterestConfig.SEARCH_PAGE.ADVERTISER_PINTEREST_URL_QUERY
                          , n = e.querySelector(t);
                        return n ? n.href : ""
                    }
                }, {
                    key: "styleFixes",
                    value: function styleFixes(e) {
                        e.style.cssText = e.style.cssText.replace(/transform.[^;]*;/, "");
                        var t = !0
                          , n = !1
                          , r = void 0;
                        try {
                            for (var o, s = this.pinterestConfig.SEARCH_PAGE.STYLE_FIXES[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
                                var a = o.value
                                  , c = e.querySelector(a.ELEMENT_QUERY)
                                  , l = a.NEW_RULES;
                                if (c) {
                                    if (a.NEW_RULES.includes("${")) {
                                        var u = JSON.parse(c.getAttribute(i.ATTRIBUTE_BIS_SIZE)).h;
                                        l = a.NEW_RULES.replace(/\$\{.[^}]*\}/, u)
                                    }
                                    c.style.cssText += l
                                }
                            }
                        } catch (e) {
                            n = !0,
                            r = e
                        } finally {
                            try {
                                t || null == s.return || s.return()
                            } finally {
                                if (n)
                                    throw r
                            }
                        }
                    }
                }, {
                    key: "isVideo",
                    value: function isVideo(e) {
                        return !(!e || !e.querySelectorAll(this.pinterestConfig.SEARCH_PAGE.TAGS_FOR_VIDEO_CHECK).length)
                    }
                }, {
                    key: "getTargetUrl",
                    value: function getTargetUrl(e) {
                        var t = this.pinterestConfig.SEARCH_PAGE.TARGET_URL_QUERY
                          , n = e.querySelector(t)
                          , r = "";
                        return n && n.href && (r = n.href),
                        r
                    }
                }, {
                    key: "getTitleText",
                    value: function getTitleText(e) {
                        var t = this.pinterestConfig.SEARCH_PAGE.TITLE_TEXT_QUERY
                          , n = e.querySelector(t)
                          , r = "";
                        return n && n.textContent.length && (r = n.textContent),
                        r
                    }
                }, {
                    key: "isSearchPageURL",
                    value: function isSearchPageURL() {
                        return !(-1 === document.location.href.search(/\.pinterest\..{1,6}\/(search)\//))
                    }
                }, {
                    key: "cloneBodyWithStyles",
                    get: function get() {
                        var e = document.createElement("body")
                          , t = document.querySelectorAll("body style");
                        return t && t.forEach((function(t) {
                            var n = t.cloneNode(!0);
                            e.appendChild(n)
                        }
                        )),
                        e
                    }
                }, {
                    key: "cloneHeadWithStyles",
                    get: function get() {
                        var e = document.createElement("head")
                          , t = document.querySelectorAll('head link[rel="stylesheet"], head script');
                        return t && t.forEach((function(t) {
                            var n = t.cloneNode();
                            e.appendChild(n)
                        }
                        )),
                        e
                    }
                }]),
                PosdPinterestSearch
            }(r);
            e.exports = s
        }
        ,
        5427: e=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var t = function() {
                function PosdPinterestVideoDetector(e) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdPinterestVideoDetector),
                    this.id = e
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdPinterestVideoDetector, [{
                    key: "InjectDetector",
                    value: function InjectDetector(e, t) {
                        var n = document.createElement("script");
                        n && n.setAttribute && n.setAttribute("bis_use", "true"),
                        n.innerHTML = PosdPinterestVideoDetector.SendVideoData.toString() + "(" + this.funcToInject() + '("'.concat(e, '", ').concat(t, "))"),
                        document.head && document.head.appendChild(n)
                    }
                }, {
                    key: "funcToInject",
                    value: function funcToInject() {
                        return function(e, t) {
                            var n = t.VIDEO_TRAFFIC_CONFIG.PARSERS
                              , r = t.VIDEO_TRAFFIC_CONFIG.PROPERTIES_FOR_VIDEO_DATA
                              , i = function buildVideoData(e, t) {
                                var n = null
                                  , i = !0
                                  , s = !1
                                  , c = void 0;
                                try {
                                    for (var l, u = r[Symbol.iterator](); !(i = (l = u.next()).done); i = !0) {
                                        var d = l.value
                                          , f = d.NAME
                                          , h = d.PATH_NAME;
                                        n || (n = {}),
                                        "detectionTime" != f ? "videoId" == f && n.videoUrl ? n[f] = a(n.videoUrl, t[h]) : n[f] = o(e, t[h]) : n[f] = Date.now() / 1e3 | 0
                                    }
                                } catch (e) {
                                    s = !0,
                                    c = e
                                } finally {
                                    try {
                                        i || null == u.return || u.return()
                                    } finally {
                                        if (s)
                                            throw c
                                    }
                                }
                                return n
                            }
                              , o = function GetVideoDataUnit(e, t) {
                                var n = e
                                  , r = !0
                                  , i = !1
                                  , o = void 0;
                                try {
                                    for (var s, a = t[Symbol.iterator](); !(r = (s = a.next()).done); r = !0) {
                                        var c = s.value;
                                        if (n[c])
                                            n = n[c];
                                        else if (!n[c]) {
                                            n = null;
                                            break
                                        }
                                    }
                                } catch (e) {
                                    i = !0,
                                    o = e
                                } finally {
                                    try {
                                        r || null == a.return || a.return()
                                    } finally {
                                        if (i)
                                            throw o
                                    }
                                }
                                return n
                            }
                              , s = function asyncSendVideoData(t, n) {
                                return function() {
                                    SendVideoData(e, t, n)
                                }
                            }
                              , a = function GetVideoId(e, t) {
                                if (!e)
                                    return "";
                                var n = new RegExp(t)
                                  , r = e.match(n);
                                return r && r[1] ? r[1] : ""
                            }
                              , c = {
                                script: function script(e) {
                                    var t = document.querySelector(e.QUERY);
                                    if (t) {
                                        var n = JSON.parse(t.text)
                                          , r = !0
                                          , o = !1
                                          , a = void 0;
                                        try {
                                            for (var c, l = e.PATH_TO_PINS[Symbol.iterator](); !(r = (c = l.next()).done); r = !0) {
                                                var u = c.value;
                                                n[u] && (n = n[u])
                                            }
                                        } catch (e) {
                                            o = !0,
                                            a = e
                                        } finally {
                                            try {
                                                r || null == l.return || l.return()
                                            } finally {
                                                if (o)
                                                    throw a
                                            }
                                        }
                                        !function PinsProcessingObject(e, t) {
                                            for (var n = null, r = Object.keys(e), o = function _loop() {
                                                var r = c[a]
                                                  , o = e[r];
                                                if (!t.CHECK_PROPERTIES.every((function(e) {
                                                    return o[e]
                                                }
                                                )))
                                                    return "continue";
                                                (n = i(o, t.PATHS_GET_PROPERTIES)) && setTimeout(s(n, "PINTEREST_VIDEO_DATA"), 0)
                                            }, a = 0, c = r; a < c.length; a++)
                                                o()
                                        }(n, e)
                                    }
                                },
                                XMLHttpRequest: function(e) {
                                    function XMLHttpRequest(t) {
                                        return e.apply(this, arguments)
                                    }
                                    return XMLHttpRequest.toString = function() {
                                        return e.toString()
                                    }
                                    ,
                                    XMLHttpRequest
                                }((function(e) {
                                    var t = XMLHttpRequest.prototype.open
                                      , n = XMLHttpRequest.prototype.setRequestHeader;
                                    XMLHttpRequest.prototype.setRequestHeader = function() {
                                        var e = arguments[0].toLowerCase()
                                          , t = arguments[1];
                                        this.requestHeaders || (this.requestHeaders = {}),
                                        this.requestHeaders[e] = t,
                                        n.apply(this, arguments)
                                    }
                                    ,
                                    XMLHttpRequest.prototype.open = function() {
                                        this.requestMethod = arguments[0],
                                        t.apply(this, arguments)
                                    }
                                    ;
                                    var r = XMLHttpRequest.prototype.send;
                                    XMLHttpRequest.prototype.send = function() {
                                        var t = this.onreadystatechange;
                                        return this.onreadystatechange = function() {
                                            var n = new RegExp(e.QUERY);
                                            if (4 === this.readyState && n.test(this.responseURL)) {
                                                var r = this.response.length ? JSON.parse(this.response) : this.response
                                                  , o = !0
                                                  , a = !1
                                                  , c = void 0;
                                                try {
                                                    for (var l, u = e.PATH_TO_PINS[Symbol.iterator](); !(o = (l = u.next()).done); o = !0) {
                                                        var d = l.value;
                                                        r[d] && (r = r[d])
                                                    }
                                                } catch (e) {
                                                    a = !0,
                                                    c = e
                                                } finally {
                                                    try {
                                                        o || null == u.return || u.return()
                                                    } finally {
                                                        if (a)
                                                            throw c
                                                    }
                                                }
                                                !function PinsProcessingArray(e, t) {
                                                    var n = null
                                                      , r = !0
                                                      , o = !1
                                                      , a = void 0;
                                                    try {
                                                        for (var c, l = function _loop2() {
                                                            var e = c.value;
                                                            if (!t.CHECK_PROPERTIES.every((function(t) {
                                                                return e[t]
                                                            }
                                                            )))
                                                                return "continue";
                                                            (n = i(e, t.PATHS_GET_PROPERTIES)) && setTimeout(s(n, "PINTEREST_VIDEO_DATA"), 0)
                                                        }, u = e[Symbol.iterator](); !(r = (c = u.next()).done); r = !0)
                                                            l()
                                                    } catch (e) {
                                                        o = !0,
                                                        a = e
                                                    } finally {
                                                        try {
                                                            r || null == u.return || u.return()
                                                        } finally {
                                                            if (o)
                                                                throw a
                                                        }
                                                    }
                                                }(r, e)
                                            }
                                            if (t)
                                                return t.apply(this, arguments)
                                        }
                                        ,
                                        r.apply(this, arguments)
                                    }
                                }
                                ))
                            }
                              , l = !0
                              , u = !1
                              , d = void 0;
                            try {
                                for (var f, h = n[Symbol.iterator](); !(l = (f = h.next()).done); l = !0) {
                                    var _ = f.value;
                                    _.USE && c[_.TYPE](_)
                                }
                            } catch (e) {
                                u = !0,
                                d = e
                            } finally {
                                try {
                                    l || null == h.return || h.return()
                                } finally {
                                    if (u)
                                        throw d
                                }
                            }
                        }
                        .toString()
                    }
                }], [{
                    key: "SendVideoData",
                    value: function SendVideoData(e, t, n) {
                        try {
                            var r = {
                                posdMessageId: "PANELOS_MESSAGE",
                                posdHash: function GenerateQuickId() {
                                    return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0, 22)
                                }(),
                                type: n,
                                from: e,
                                to: e.substring(0, e.length - 2),
                                content: t
                            };
                            window.postMessage(r)
                        } catch (e) {}
                    }
                }]),
                PosdPinterestVideoDetector
            }();
            e.exports = t
        }
        ,
        5216: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(9543)
              , i = n(4387)
              , o = n(3124)
              , s = n(1225)
              , a = n(8962)
              , c = n(5212)
              , l = function(e) {
                function PosdRedditAds(e, t, n, r) {
                    var i;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdRedditAds),
                    (i = _possibleConstructorReturn(this, _getPrototypeOf(PosdRedditAds).call(this, e))).id = e,
                    i.VideoTrafficDetector = null,
                    i.onPageRefreshed = i.onPageUrlChanged,
                    i.AdBlockerAgent = r,
                    i.IOManager = n,
                    i.feedContainer = null,
                    i.commentPageContainer = null,
                    i.rightColumnContainer = null,
                    i.feedObserver = null,
                    i.commentPageObserver = null,
                    i.rightColumnObserver = null,
                    i.processRedditAdsInterval = null,
                    i.observerNodesListenerInterval = null,
                    i.redditConfig = t.RedditConfig,
                    i.reactivateDetectorTimeout = null,
                    i.lastTopPosition = null,
                    i.observerNodesChecksAmount = 0,
                    i.ActivateTrafficDetector(o.ACTIVATION_BY_ADS_SELF),
                    i
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdRedditAds, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdRedditAds, [{
                    key: "ActivateDetector",
                    value: function ActivateDetector(e) {
                        var t = this;
                        if (e === o.ACTIVATION_BY_ADS_MANAGER && (this.setAvailable = !0),
                        !this.isActive) {
                            this.setActive = !0,
                            this.lastFeedAdsCheckTime = s.GetCurrentTimestampMs() - 3e3,
                            this.lastRightColumnAdsCheckTime = s.GetCurrentTimestampMs() - 3e3,
                            this.lastCommentPageAdsCheckTime = s.GetCurrentTimestampMs() - 3e3;
                            var n = this.processRedditAds.bind(this, !1);
                            this.processRedditAdsInterval = setInterval(n, 1e3),
                            this.AdBlockerAgent.IsEnabledForReddit() && this.processRedditAds(!0);
                            var r = function() {
                                if (t.observerNodesChecksAmount = t.observerNodesChecksAmount + 1,
                                t.isCommentPage && (t.commentPageContainer = t.doesElementExists(t.commentPageContainer) ? t.commentPageContainer : t.getCommentPageContainer,
                                !t.commentPageObserver && t.commentPageContainer)) {
                                    var e = t.processCommentPageAds.bind(t);
                                    t.commentPageObserver = new MutationObserver(e),
                                    t.commentPageObserver.observe(t.commentPageContainer, {
                                        childList: !0,
                                        subtree: !0
                                    })
                                }
                                if (!t.isCommentPage && !t.isCommentPopup && (t.feedContainer = t.doesElementExists(t.feedContainer) ? t.feedContainer : t.getFeedContainer,
                                !t.feedObserver && t.feedContainer)) {
                                    var n = t.processFeedAds.bind(t);
                                    t.feedObserver = new MutationObserver(n),
                                    t.feedObserver.observe(t.feedContainer, {
                                        childList: !0,
                                        subtree: !0
                                    })
                                }
                                if (t.rightColumnContainer = t.doesElementExists(t.rightColumnContainer) ? t.rightColumnContainer : t.getRightColumnContainer,
                                !t.rightColumnObserver && t.rightColumnContainer) {
                                    var r = t.processRightColumnAds.bind(t, o.AD_DETECTOR_INITIATOR_MUTATION);
                                    t.rightColumnObserver = new MutationObserver(r),
                                    t.rightColumnObserver.observe(t.rightColumnContainer, {
                                        childList: !0,
                                        subtree: !0
                                    })
                                }
                                ((t.feedContainer || t.commentPageContainer) && t.rightColumnContainer || t.observerNodesChecksAmount > 20) && (clearInterval(t.observerNodesListenerInterval),
                                t.observerNodesListenerInterval = null)
                            }
                            .bind(this);
                            this.observerNodesListenerInterval = setInterval(r, 300)
                        }
                    }
                }, {
                    key: "doesElementExists",
                    value: function doesElementExists(e) {
                        if (!e)
                            return !1;
                        var t = e.outerHTML;
                        return document.querySelector("html").outerHTML.includes(t)
                    }
                }, {
                    key: "ActivateTrafficDetector",
                    value: function ActivateTrafficDetector(e) {
                        this.VideoTrafficDetector || (this.VideoTrafficDetector = new i(this.id),
                        this.VideoTrafficDetector.InjectDetector(this.id + "_r", JSON.stringify(this.redditConfig)))
                    }
                }, {
                    key: "DeactivateDetector",
                    value: function DeactivateDetector() {
                        clearTimeout(this.reactivateDetectorTimeout),
                        this.reactivateDetectorTimeout = null,
                        this.processRedditAdsInterval && (clearInterval(this.processRedditAdsInterval),
                        this.processRedditAdsInterval = null),
                        this.observerNodesListenerInterval && (clearInterval(this.observerNodesListenerInterval),
                        this.observerNodesListenerInterval = null),
                        this.feedObserver && (this.lastTopPosition = parseInt(this.feedContainer.getBoundingClientRect().top),
                        this.feedObserver.disconnect(),
                        this.feedObserver = null,
                        this.feedContainer = null),
                        this.commentPageObserver && (this.commentPageObserver.disconnect(),
                        this.commentPageObserver = null,
                        this.commentPageContainer = null),
                        this.rightColumnObserver && (this.rightColumnObserver.disconnect(),
                        this.rightColumnObserver = null,
                        this.rightColumnContainer = null),
                        this.observerNodesChecksAmount = 0,
                        this.setAvailable = !1,
                        this.setActive = !1
                    }
                }, {
                    key: "ReActivateDetector",
                    value: function ReActivateDetector() {
                        this.DeactivateDetector(),
                        this.ActivateDetector("ACTIVATION_BY_ADS_MANAGER")
                    }
                }, {
                    key: "processRedditAds",
                    value: function processRedditAds(e) {
                        this.processRightColumnAds(e),
                        this.processFeedAds(e),
                        this.processCommentPageAds(e)
                    }
                }, {
                    key: "processFeedAds",
                    value: function processFeedAds(e) {
                        if (e || this.isCommentPopup || this.isCommentPage || this.doesElementExists(this.feedContainer) || this.reactivateDetectorTimeout) {
                            var t = s.GetCurrentTimestampMs();
                            t - this.lastFeedAdsCheckTime > 300 && (this.extractOccurrences(o.REDDIT_AD_PLACEMENT_TYPE_FEED),
                            this.lastFeedAdsCheckTime = t)
                        } else
                            this.reactivateDetectorTimeout = setTimeout(this.ReActivateDetector.bind(this), 100)
                    }
                }, {
                    key: "processCommentPageAds",
                    value: function processCommentPageAds(e) {
                        if (e || !this.isCommentPopup && !this.isCommentPage || this.doesElementExists(this.commentPageContainer) || this.reactivateDetectorTimeout) {
                            var t = s.GetCurrentTimestampMs();
                            t - this.lastCommentPageAdsCheckTime > 300 && (this.extractOccurrences(o.REDDIT_AD_PLACEMENT_TYPE_COMMENT_PAGE),
                            this.lastCommentPageAdsCheckTime = t)
                        } else
                            this.reactivateDetectorTimeout = setTimeout(this.ReActivateDetector.bind(this), 100)
                    }
                }, {
                    key: "processRightColumnAds",
                    value: function processRightColumnAds(e) {
                        if (e || this.doesElementExists(this.rightColumnContainer) || this.reactivateDetectorTimeout) {
                            var t = s.GetCurrentTimestampMs();
                            t - this.lastRightColumnAdsCheckTime > 300 && (this.extractOccurrences(o.REDDIT_AD_PLACEMENT_TYPE_RIGHT_COLUMN),
                            this.lastRightColumnAdsCheckTime = t)
                        } else
                            this.reactivateDetectorTimeout = setTimeout(this.ReActivateDetector.bind(this), 100)
                    }
                }, {
                    key: "allCellsAndMinImgSpace",
                    value: function allCellsAndMinImgSpace(e) {
                        var t = this
                          , n = []
                          , r = 0;
                        if (e === o.REDDIT_AD_PLACEMENT_TYPE_RIGHT_COLUMN && this.rightColumnContainer)
                            n = Array.from(this.rightColumnContainer.children).map((function(e) {
                                var n = e.querySelector(t.redditConfig.RIGHT_COLUMN_CONTAINER.PROMOTED_SELECTOR);
                                if (n)
                                    return n.parentElement
                            }
                            )).filter((function(e) {
                                return e
                            }
                            )),
                            r = this.redditConfig.RIGHT_COLUMN_CONTAINER.IMG_SPACE_PERCENTAGE;
                        else if (e === o.REDDIT_AD_PLACEMENT_TYPE_FEED && this.feedContainer) {
                            var i = Array.from(this.feedContainer.children)
                              , s = Array.from(this.feedContainer.querySelectorAll(this.redditConfig.FEED_CONTAINER.QUERY_POSTS));
                            n = i,
                            s && s.length && (n = i.concat(s)),
                            r = this.redditConfig.FEED_CONTAINER.IMG_SPACE_PERCENTAGE
                        } else
                            e === o.REDDIT_AD_PLACEMENT_TYPE_COMMENT_PAGE && this.commentPageContainer && (n = Array.from(this.commentPageContainer.children),
                            r = this.redditConfig.COMMENT_PAGE_CONTAINER.IMG_SPACE_PERCENTAGE);
                        return {
                            allCells: n = n.filter((function(e) {
                                return t.isPromoted(e) && e.offsetHeight < t.redditConfig.FEED_CONTAINER.MAX_CHILD_HEIGHT
                            }
                            )),
                            minImgSquerePercentage: r
                        }
                    }
                }, {
                    key: "extractOccurrences",
                    value: function extractOccurrences(e) {
                        var t = this.allCellsAndMinImgSpace(e)
                          , n = t.allCells
                          , r = t.minImgSquerePercentage;
                        if (n.length) {
                            var i = !0
                              , a = !1
                              , c = void 0;
                            try {
                                for (var l, u = n[Symbol.iterator](); !(i = (l = u.next()).done); i = !0) {
                                    var d = l.value;
                                    if (!d.hasAttribute(o.ATTRIBUTE_BIS_ID) && !d.hasAttribute(o.ATTRIBUTE_BIS_SIZE) && this.IsPostContentRendered(d, r) && this.isAvatarImgReady(d)) {
                                        this.isCarousel(d) && this.redditConfig.IS_ACTIVE_GET_SLIDES_SRC && this.getSlidesSrc(d);
                                        var f = s.GenerateAndSetBisIdToRedditAds(d);
                                        if (this.isShadowRootExist(d)) {
                                            var h = this.deepClone(d)
                                              , _ = this.buildBannerHtml(h, e)
                                              , A = this.getAdRedditObject(d, _, e);
                                            e === o.REDDIT_AD_PLACEMENT_TYPE_FEED && this.isVideo(d) && (A.videoData = this.lookingForVideoDataInContent(d)),
                                            this.AdBlockerAgent.IsEnabledForReddit() && (this.HideElement(d),
                                            this.AdBlockerAgent.SetHiddenAmount(1)),
                                            h.remove(),
                                            setTimeout(this.processAndSendRedditAd.bind(this, f, A), 100)
                                        } else {
                                            this.setSizesAndIdForAllElements(d);
                                            var E = d.cloneNode(!0)
                                              , T = this.buildBannerHtml(E, e)
                                              , g = this.getAdRedditObject(d, T, e);
                                            e === o.REDDIT_AD_PLACEMENT_TYPE_FEED && this.isVideo(d) && (g.videoData = this.lookingForVideoDataInContent(d)),
                                            this.AdBlockerAgent.IsEnabledForReddit() && (this.HideElement(d),
                                            this.AdBlockerAgent.SetHiddenAmount(1)),
                                            E.remove(),
                                            setTimeout(this.processAndSendRedditAd.bind(this, f, g), 100)
                                        }
                                    }
                                }
                            } catch (e) {
                                a = !0,
                                c = e
                            } finally {
                                try {
                                    i || null == u.return || u.return()
                                } finally {
                                    if (a)
                                        throw c
                                }
                            }
                        }
                    }
                }, {
                    key: "isShadowRootExist",
                    value: function isShadowRootExist(e) {
                        return Array.from(e.querySelectorAll("*")).some((function(e) {
                            return e.shadowRoot
                        }
                        ))
                    }
                }, {
                    key: "deepClone",
                    value: function deepClone(e) {
                        var t = this
                          , n = document.createElement(e.tagName);
                        return function cloneNode(e, n) {
                            var r = function walkTree(e, t) {
                                for (; e; )
                                    cloneNode(e, t),
                                    e = e.nextSibling
                            };
                            if (e) {
                                var i = e.cloneNode(!1);
                                n.appendChild(i),
                                e.shadowRoot && (t.setSizesAndIdForAllElements(e.shadowRoot),
                                r(e.shadowRoot.firstChild, i)),
                                t.setSizesAndIdForAllElements(e),
                                r(e.firstChild, i)
                            }
                        }(e, n),
                        n.firstElementChild
                    }
                }, {
                    key: "getSlidesSrc",
                    value: function getSlidesSrc(e) {
                        var t = e.querySelector("ul").parentElement
                          , n = t.querySelector(this.redditConfig.CAROUSEL_BUTTON_NEXT)
                          , r = t.querySelector(this.redditConfig.CAROUSEL_BUTTON_PREVIUOS);
                        n && r && (n.click(),
                        r.click())
                    }
                }, {
                    key: "buildBannerHtml",
                    value: function buildBannerHtml(e, t) {
                        var n;
                        t === o.REDDIT_AD_PLACEMENT_TYPE_RIGHT_COLUMN ? n = this.rightColumnContainer : t === o.REDDIT_AD_PLACEMENT_TYPE_FEED ? n = this.feedContainer : t === o.REDDIT_AD_PLACEMENT_TYPE_COMMENT_PAGE && (n = this.commentPageContainer),
                        this.setWrapperClass(n);
                        var r = this.headCopyWithStyles
                          , i = document.createElement("html")
                          , s = this.bodyCopyWithStyles
                          , a = n.cloneNode();
                        return this.setWrapperStyles(n, a),
                        r.appendChild(this.getClassNameForStyles(e)),
                        i.appendChild(r),
                        a.appendChild(e),
                        s.appendChild(a),
                        i.appendChild(s),
                        i
                    }
                }, {
                    key: "isCarousel",
                    value: function isCarousel(e) {
                        return e.querySelector("ul")
                    }
                }, {
                    key: "setWrapperClass",
                    value: function setWrapperClass(e) {
                        var t = e.parentElement
                          , n = !1;
                        if (t)
                            for (var r = 0; r < 50 && !n && t; r++)
                                if (t.nextSibling && -1 !== t.nextSibling.nodeName.search(/style/i) && t.previousSibling && -1 !== t.previousSibling.nodeName.search(/style/i)) {
                                    var i = t.getAttribute("class");
                                    e.className += e.className.length ? " " + i : i,
                                    n = !0
                                } else
                                    t = t.parentElement
                    }
                }, {
                    key: "setWrapperStyles",
                    value: function setWrapperStyles(e, t) {
                        t.style.cssText = t.style.cssText + "max-width: ".concat(this.maxWidthContainer(e))
                    }
                }, {
                    key: "getClassNameForStyles",
                    value: function getClassNameForStyles(e) {
                        var t = document.createElement("style");
                        return this.redditConfig.NECESSARY_STYLES.BY_CLASS_NAME.forEach((function(n) {
                            for (var r = e.querySelector(n.CLASS_NAME_CHILD), i = r && r.parentElement ? r.parentElement : null, o = "", s = 1; s < n.DEEP_LEVEL; s++)
                                i && (i = i.parentElement);
                            i && (o = i.classList[0],
                            t.innerHTML += "." + o + n.STYLES)
                        }
                        )),
                        t
                    }
                }, {
                    key: "getStylesByTagName",
                    value: function getStylesByTagName(e) {
                        var t = [];
                        this.redditConfig.NECESSARY_STYLES.BY_TAG_NAME.map((function(t) {
                            var n = new RegExp(t.ATTRIBUTE_REGEX_VALUE);
                            return Array.from(e.querySelectorAll(t.TAG_NAME)).filter((function(e) {
                                if (e && e[t.ATTRIBUTE_NAME] && -1 !== e[t.ATTRIBUTE_NAME].search(n))
                                    return e;
                                e.remove()
                            }
                            ))
                        }
                        )).filter((function(e) {
                            return e
                        }
                        )).forEach((function(e) {
                            t = t.concat(e)
                        }
                        )),
                        t.forEach((function(t) {
                            e.appendChild(t)
                        }
                        ))
                    }
                }, {
                    key: "maxWidthContainer",
                    value: function maxWidthContainer(e) {
                        return e ? e.offsetWidth + "px" : "auto"
                    }
                }, {
                    key: "isVideo",
                    value: function isVideo(e) {
                        var t = this
                          , n = !1;
                        e && (n = Array.from(e.querySelectorAll("*")).some((function(e) {
                            return e.shadowRoot ? !!e.shadowRoot.querySelectorAll(t.redditConfig.TAGS_FOR_VIDEO_CHECK).length : !!e.querySelectorAll(t.redditConfig.TAGS_FOR_VIDEO_CHECK).length
                        }
                        )));
                        return n
                    }
                }, {
                    key: "lookingForVideoDataInContent",
                    value: function lookingForVideoDataInContent(e) {
                        var t = this.redditConfig.VIDEO_TRAFFIC_DETECTOR.QUERY_VIDEO_DATA_FROM_CONTENT
                          , n = e.querySelector(t);
                        if (n) {
                            var r = n.getAttribute("src");
                            if (r && !r.includes("blob:")) {
                                var i = new RegExp(this.redditConfig.VIDEO_TRAFFIC_DETECTOR.VIDEO_ID_REGEX)
                                  , o = r.match(i);
                                if (o && o.length)
                                    return {
                                        videoId: o[1],
                                        url: r
                                    }
                            }
                        }
                        return {}
                    }
                }, {
                    key: "isPromoted",
                    value: function isPromoted(e) {
                        var t = this;
                        if (e) {
                            var n = e;
                            1 === n.childElementCount && n.firstElementChild.shadowRoot && n.firstElementChild.shadowRoot.firstElementChild && (n = n.firstElementChild.shadowRoot.firstElementChild);
                            var r = Array.from(n.querySelectorAll(this.redditConfig.FEED_CONTAINER.PROMOTED_SELECTOR))
                              , i = Array.from(n.querySelectorAll(this.redditConfig.COMMENT_PAGE_CONTAINER.PROMOTED_SELECTOR))
                              , o = Array.from(e.querySelectorAll(this.redditConfig.RIGHT_COLUMN_CONTAINER.PROMOTED_SELECTOR))
                              , s = r.concat(o).concat(i);
                            if (s.length)
                                return s.some((function(e) {
                                    var n = e.textContent.trim().toLowerCase();
                                    return n ? t.redditConfig.PROMOTED_ALIASES.some((function(e) {
                                        return n.indexOf(e) >= 0
                                    }
                                    )) : e.dataset.beforeContent ? (n = e.dataset.beforeContent,
                                    t.redditConfig.PROMOTED_ALIASES.some((function(e) {
                                        return n.indexOf(e) >= 0
                                    }
                                    ))) : void 0
                                }
                                ))
                        }
                        return !1
                    }
                }, {
                    key: "IsPostContentRendered",
                    value: function IsPostContentRendered(e, t) {
                        var n = !1;
                        if (e) {
                            var r = e.querySelectorAll(this.redditConfig.PROGRESS_SELECTOR);
                            if (r && 0 === r.length) {
                                var i = s.GetFullElementSize(e);
                                if (i.w > 0)
                                    s.GetImagesSpacePercentage(this.redditConfig.TAGS_FOR_LOADING_CHECK, e, i) >= t && (n = !0)
                            }
                            e.querySelector(this.redditConfig.TAGS_FOR_TEXT_AD_CHECK) && (n = !0)
                        }
                        return n
                    }
                }, {
                    key: "isAvatarImgReady",
                    value: function isAvatarImgReady(e) {
                        if (e) {
                            var t = e;
                            1 === t.childElementCount && t.firstElementChild.shadowRoot && (t = t.firstElementChild.shadowRoot.firstElementChild);
                            var n = t.querySelector(this.redditConfig.QUERY_CHECK_READY_AD_CELLS);
                            return !!n && (!n.shadowRoot || !!n.shadowRoot && !!n.shadowRoot.querySelector("img"))
                        }
                    }
                }, {
                    key: "processAndSendRedditAd",
                    value: function processAndSendRedditAd(e, t) {
                        var n = document.querySelector("[".concat(o.ATTRIBUTE_BIS_ID, "=").concat(e, "]"));
                        if (n) {
                            var r = this.isVideo(n)
                              , i = !!n.querySelector(this.redditConfig.TAGS_FOR_TEXT_AD_CHECK);
                            c.SendCandidatePlacementsCount(this.id, 1, o.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_REDDIT, null),
                            c.SendAdCandidates(this.id, [t], o.MESSAGE_TYPE_CANDIDATES_DATA_REDDIT, null),
                            a.CONFIG_MARK_AD_CANDIDATES && a.CONFIG_MARK_PROCESSED_AD_CANDIDATES && (n.style.cssText += r ? o.STYLES_OUTLINE_VIDEO_AD : i ? o.STYLES_OUTLINE_TEXT_AD : o.STYLES_OUTLINE_SUCCESS_DETECT)
                        }
                    }
                }, {
                    key: "onPageUrlChanged",
                    value: function onPageUrlChanged(e, t) {
                        this.available && (this.reactivateDetectorTimeout || (this.reactivateDetectorTimeout = setTimeout(this.ReActivateDetector.bind(this), 100)))
                    }
                }, {
                    key: "getFeedContainer",
                    get: function get() {
                        var e = this.redditConfig.FEED_CONTAINER.QUERIES
                          , t = window.innerWidth
                          , n = this.redditConfig.FEED_CONTAINER.QUERY_TO_EXCLUDE
                          , r = !0
                          , i = !1
                          , o = void 0;
                        try {
                            for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done); r = !0)
                                for (var c = s.value, l = Array.from(document.querySelectorAll(c)), u = 0, d = l; u < d.length; u++) {
                                    var f = d[u]
                                      , h = getComputedStyle(f)
                                      , _ = (t - parseInt(h.width)) / t * 100;
                                    if (parseInt(h.height) > 1e3 && _ > 2 && null === f.querySelector(n) && f.nextSibling)
                                        return f
                                }
                        } catch (e) {
                            i = !0,
                            o = e
                        } finally {
                            try {
                                r || null == a.return || a.return()
                            } finally {
                                if (i)
                                    throw o
                            }
                        }
                        return null
                    }
                }, {
                    key: "getCommentPageContainer",
                    get: function get() {
                        var e = this.redditConfig.COMMENT_PAGE_CONTAINER.QUERIES
                          , t = this.redditConfig.COMMENT_PAGE_CONTAINER.MIN_HEIGHT
                          , n = window.innerWidth
                          , r = this.redditConfig.COMMENT_PAGE_CONTAINER.TOP_DISTANCE
                          , i = !0
                          , o = !1
                          , s = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(i = (a = c.next()).done); i = !0)
                                for (var l = a.value, u = Array.from(document.querySelectorAll(l)), d = 0, f = u; d < f.length; d++) {
                                    var h = f[d]
                                      , _ = h.getBoundingClientRect()
                                      , A = (n - parseInt(h.offsetWidth)) / n * 100
                                      , E = Array.from(h.children);
                                    if (parseInt(h.offsetHeight) > t && A > 2 && (parseInt(_.top) > r || parseInt(_.top) < 0) && E.length >= 3)
                                        return h
                                }
                        } catch (e) {
                            o = !0,
                            s = e
                        } finally {
                            try {
                                i || null == c.return || c.return()
                            } finally {
                                if (o)
                                    throw s
                            }
                        }
                        return null
                    }
                }, {
                    key: "getRightColumnContainer",
                    get: function get() {
                        var e = this.redditConfig.RIGHT_COLUMN_CONTAINER.QUERIES
                          , t = null
                          , n = !0
                          , r = !1
                          , i = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done); n = !0) {
                                var a = o.value;
                                if (!this.isCommentPopup && !this.isCommentPage && (t = document.querySelector(a)))
                                    return t;
                                if (this.commentPageContainer && this.commentPageContainer.parentElement && this.commentPageContainer.parentElement.nextSibling) {
                                    var c = this.commentPageContainer.parentElement.nextSibling.firstChild;
                                    c && c.children.length && (t = c)
                                }
                                t || (t = document.querySelector(a))
                            }
                        } catch (e) {
                            r = !0,
                            i = e
                        } finally {
                            try {
                                n || null == s.return || s.return()
                            } finally {
                                if (r)
                                    throw i
                            }
                        }
                        return t
                    }
                }, {
                    key: "headCopyWithStyles",
                    get: function get() {
                        var e = this
                          , t = document.querySelector("head").cloneNode(!0);
                        if (this.redditConfig.NECESSARY_STYLES.BY_DATA_ATTRIBUTE.forEach((function(n) {
                            for (var r = n.KEY, i = n.ALL_STYLES_FROM, o = n.COMMENT_PAGE, s = n.FEED_PAGE, a = function _loop() {
                                var t = l[c];
                                if (-1 === t.nodeName.search(/^(style|link)$/gi))
                                    return t.remove(),
                                    "continue";
                                if (t.dataset[r]) {
                                    var n = i.some((function(e) {
                                        return t.dataset[r].includes(e)
                                    }
                                    ));
                                    !n && e.isCommentPage && (n = o.some((function(e) {
                                        return t.dataset[r].includes(e)
                                    }
                                    ))),
                                    n || e.isCommentPage || (n = s.some((function(e) {
                                        return t.dataset[r].includes(e)
                                    }
                                    ))),
                                    n || t.remove()
                                }
                            }, c = 0, l = Array.from(t.children); c < l.length; c++)
                                a()
                        }
                        )),
                        this.neccesaryStyleRules) {
                            var n = document.createElement("style");
                            n.innerHTML = this.neccesaryStyleRules,
                            t.appendChild(n)
                        }
                        return this.getStylesByTagName(t),
                        t
                    }
                }, {
                    key: "neccesaryStyleRules",
                    get: function get() {
                        var e = null
                          , t = this.redditConfig.NECESSARY_STYLES.BY_QUERIES_RULES.map((function(e) {
                            var t, n = new RegExp(e,"gi"), r = document.querySelector("head").outerHTML.match(n);
                            return r && r.length && (t = r.join("")),
                            t
                        }
                        )).filter((function(e) {
                            return e
                        }
                        ));
                        return t && t.length && (e = t.join("")),
                        e
                    }
                }, {
                    key: "bodyCopyWithStyles",
                    get: function get() {
                        var e, t = document.createElement("body"), n = null === (e = document.querySelector("body style")) || void 0 === e ? void 0 : e.cloneNode(!0);
                        return n && t.appendChild(n),
                        t
                    }
                }, {
                    key: "isCommentPage",
                    get: function get() {
                        return -1 !== window.location.href.indexOf(this.redditConfig.COMMENT_PAGE_CONTAINER.TEXT_FROM_HREF)
                    }
                }, {
                    key: "isCommentPopup",
                    get: function get() {
                        return !!document.querySelector(this.redditConfig.COMMENT_PAGE_CONTAINER.QUERY_IS_POPUP)
                    }
                }]),
                PosdRedditAds
            }(r);
            e.exports = l
        }
        ,
        4387: e=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var t = function() {
                function PosdRedditVideoAndRightColumnAdUrlDetector(e) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdRedditVideoAndRightColumnAdUrlDetector),
                    this.id = e
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdRedditVideoAndRightColumnAdUrlDetector, [{
                    key: "InjectDetector",
                    value: function InjectDetector(e, t) {
                        var n = document.createElement("script");
                        n && n.setAttribute && n.setAttribute("bis_use", "true"),
                        n.innerHTML = PosdRedditVideoAndRightColumnAdUrlDetector.SendVideoData.toString() + PosdRedditVideoAndRightColumnAdUrlDetector.SendRightColumnAdUrl.toString() + "(" + this.funcToInject() + '("'.concat(e, '", ').concat(t, "))"),
                        document.head && document.head.appendChild(n)
                    }
                }, {
                    key: "funcToInject",
                    value: function funcToInject() {
                        return function(e, t) {
                            function prepareVideoData(e) {
                                var n = function getVideoId(e) {
                                    var n = new RegExp(t.VIDEO_TRAFFIC_DETECTOR.VIDEO_ID_REGEX)
                                      , r = e.match(n)
                                      , i = null;
                                    r && r.length && (i = r[1]);
                                    return i
                                }(e);
                                return {
                                    videoId: n,
                                    url: e
                                }
                            }
                            var n = XMLHttpRequest.prototype.open;
                            XMLHttpRequest.prototype.open = function() {
                                this.requestMethod = arguments[0],
                                this.url = arguments[1],
                                n.apply(this, arguments)
                            }
                            ;
                            var r = XMLHttpRequest.prototype.send;
                            XMLHttpRequest.prototype.send = function() {
                                var n, i = this, o = function mpdUrlCheck(e) {
                                    return new RegExp(t.VIDEO_TRAFFIC_DETECTOR.VIDEO_MPD_URL_CHECK).test(e)
                                }(i.url), s = function rightColumnUrlAdCheck(e) {
                                    return new RegExp(t.RIGHT_COLUMN_CONTAINER.PATH_WITH_AD_URL).test(e)
                                }(i.url);
                                if (!o && !s)
                                    return r.apply(this, arguments);
                                return function getRightColumnAdUrl() {
                                    var t = arguments
                                      , r = this;
                                    s && 4 === i.readyState ? function PreSendRightColumnData(t) {
                                        var n;
                                        try {
                                            n = JSON.parse(t.content)
                                        } catch (e) {
                                            n = null
                                        }
                                        if (n) {
                                            var r = []
                                              , i = !0
                                              , o = !1
                                              , s = void 0;
                                            try {
                                                for (var a, c = n[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                                    var l = a.value
                                                      , u = {};
                                                    l.source && l.source.hasOwnProperty("outboundUrl") && (u.elementId = l.id,
                                                    u.targetUrl = l.source.outboundUrl,
                                                    r.push(u))
                                                }
                                            } catch (e) {
                                                o = !0,
                                                s = e
                                            } finally {
                                                try {
                                                    i || null == c.return || c.return()
                                                } finally {
                                                    if (o)
                                                        throw s
                                                }
                                            }
                                            SendRightColumnAdUrl(e, r)
                                        }
                                    }({
                                        url: i.url,
                                        content: "" === i.responseType || "text" === i.responseType ? i.responseText : ""
                                    }) : s && 4 !== i.readyState ? n = setTimeout((function() {
                                        return getRightColumnAdUrl.apply(r, t)
                                    }
                                    ), 100) : n && clearTimeout(n)
                                }(),
                                function PreSendVideoData(t) {
                                    var n = prepareVideoData(t);
                                    SendVideoData(e, n)
                                }(i.url),
                                r.apply(this, arguments)
                            }
                        }
                        .toString()
                    }
                }], [{
                    key: "SendVideoData",
                    value: function SendVideoData(e, t) {
                        try {
                            t.detectionTime = Date.now() / 1e3 | 0;
                            var n = {
                                posdMessageId: "PANELOS_MESSAGE",
                                posdHash: function GenerateQuickId() {
                                    return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0, 22)
                                }(),
                                type: "REDDIT_VIDEO_DATA",
                                from: e,
                                to: e.substring(0, e.length - 2),
                                content: t
                            };
                            window.postMessage(n)
                        } catch (e) {}
                    }
                }, {
                    key: "SendRightColumnAdUrl",
                    value: function SendRightColumnAdUrl(e, t) {
                        try {
                            var n = {
                                posdMessageId: "PANELOS_MESSAGE",
                                posdHash: function GenerateQuickId() {
                                    return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0, 22)
                                }(),
                                type: "REDDIT_RIGHT_COLUMN_DATA",
                                from: e,
                                to: e.substring(0, e.length - 2),
                                content: t
                            };
                            window.postMessage(n)
                        } catch (e) {}
                    }
                }]),
                PosdRedditVideoAndRightColumnAdUrlDetector
            }();
            e.exports = t
        }
        ,
        3173: (e,t,n)=>{
            function _typeof(e) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
                    return typeof e
                }
                : function _typeof(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                _typeof(e)
            }
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            function _possibleConstructorReturn(e, t) {
                return !t || "object" !== _typeof(t) && "function" != typeof t ? function _assertThisInitialized(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            function _getPrototypeOf(e) {
                return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                ,
                _getPrototypeOf(e)
            }
            function _setPrototypeOf(e, t) {
                return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(e, t) {
                    return e.__proto__ = t,
                    e
                }
                ,
                _setPrototypeOf(e, t)
            }
            var r = n(8962)
              , i = n(1225)
              , o = n(3124)
              , s = n(9543)
              , a = n(5212)
              , c = n(9426)
              , l = function(e) {
                function PosdTwitterAds(e, t, n, r) {
                    var s;
                    return function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdTwitterAds),
                    (s = _possibleConstructorReturn(this, _getPrototypeOf(PosdTwitterAds).call(this, e))).available = !1,
                    s.onPageRefreshed = s.onPageUrlChanged,
                    s.twConfig = t.GetTwitterConfig(),
                    s.IOManager = n,
                    s.AdBlockerAgent = r,
                    s.feedObserver = null,
                    s.rightColumnObserver = null,
                    s.activated = !1,
                    s.processTwitterAdsInterval = null,
                    s.observerNodesListenerInterval = null,
                    s.reactivateDetectorTimeout = null,
                    s.observerNodesChecksAmount = 0,
                    s.lastFeedPostAdsCheckTime = i.GetCurrentTimestampMs(),
                    s.lastFeedWhoToFollowAdsCheckTime = i.GetCurrentTimestampMs(),
                    s.lastRightColumnWhoToFollowAdsCheckTime = i.GetCurrentTimestampMs(),
                    s.VideoTrafficDetector = null,
                    s.ActivateVideoTrafficDetector(o.ACTIVATION_BY_ADS_SELF),
                    s
                }
                return function _inherits(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && _setPrototypeOf(e, t)
                }(PosdTwitterAds, e),
                function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdTwitterAds, [{
                    key: "onPageUrlChanged",
                    value: function onPageUrlChanged(e, t) {
                        this.available && (this.reactivateDetectorTimeout || (this.reactivateDetectorTimeout = setTimeout(this.ReActivateDetector.bind(this), 100)))
                    }
                }, {
                    key: "ActivateVideoTrafficDetector",
                    value: function ActivateVideoTrafficDetector(e) {
                        this.VideoTrafficDetector || (this.VideoTrafficDetector = new c(this.id),
                        this.VideoTrafficDetector.InjectDetector(this.id + "_w", JSON.stringify(this.twConfig.VIDEO_TRAFFIC_DETECTOR)))
                    }
                }, {
                    key: "ActivateDetector",
                    value: function ActivateDetector(e) {
                        var t = this;
                        e === o.ACTIVATION_BY_ADS_MANAGER && (this.available = !0),
                        this.twConfig && !this.activated && (this.activated = !0,
                        this.ActivateVideoTrafficDetector(e),
                        this.lastFeedPostAdsCheckTime = i.GetCurrentTimestampMs() - 3e3,
                        this.lastFeedWhoToFollowAdsCheckTime = i.GetCurrentTimestampMs() - 3e3,
                        this.lastRightColumnWhoToFollowAdsCheckTime = i.GetCurrentTimestampMs() - 3e3,
                        this.processTwitterAdsInterval = setInterval(this.processTwitterAds.bind(this, o.AD_DETECTOR_INITIATOR_TIMER), 1e3),
                        this.AdBlockerAgent.IsEnabledForTwitter() && (this.processTwitterAds(o.AD_DETECTOR_INITIATOR_ACTIVATION),
                        setTimeout(this.processTwitterAds.bind(this, o.AD_DETECTOR_INITIATOR_ACTIVATION), 350),
                        setTimeout(this.processTwitterAds.bind(this, o.AD_DETECTOR_INITIATOR_ACTIVATION), 700)),
                        this.observerNodesListenerInterval = setInterval((function() {
                            t.observerNodesChecksAmount = t.observerNodesChecksAmount + 1;
                            var e = document.querySelector(t.twConfig.FEED_CONTAINER);
                            !t.feedObserver && e && (t.feedObserver = new MutationObserver(t.processFeedTwitterAds.bind(t, o.AD_DETECTOR_INITIATOR_MUTATION)),
                            t.feedObserver.observe(e, {
                                childList: !0,
                                subtree: !0
                            }));
                            var n = document.querySelector(t.twConfig.RIGHT_COLUMN_CONTAINER);
                            !t.rightColumnObserver && n && (t.rightColumnObserver = new MutationObserver(t.processRightColumnWhoToFollowAds.bind(t, o.AD_DETECTOR_INITIATOR_MUTATION)),
                            t.rightColumnObserver.observe(n, {
                                childList: !0,
                                subtree: !0
                            })),
                            (e && n || t.observerNodesChecksAmount > 20) && (clearInterval(t.observerNodesListenerInterval),
                            t.observerNodesListenerInterval = null)
                        }
                        ), 300))
                    }
                }, {
                    key: "DeactivateDetector",
                    value: function DeactivateDetector() {
                        this.processTwitterAdsInterval && (clearInterval(this.processTwitterAdsInterval),
                        this.processTwitterAdsInterval = null),
                        this.observerNodesListenerInterval && (clearInterval(this.observerNodesListenerInterval),
                        this.observerNodesListenerInterval = null),
                        this.feedObserver && (this.feedObserver.disconnect(),
                        this.feedObserver = null),
                        this.rightColumnObserver && (this.rightColumnObserver.disconnect(),
                        this.rightColumnObserver = null),
                        this.observerNodesChecksAmount = 0,
                        this.activated = !1
                    }
                }, {
                    key: "ReActivateDetector",
                    value: function ReActivateDetector() {
                        this.reactivateDetectorTimeout = null,
                        this.DeactivateDetector(),
                        this.ActivateDetector()
                    }
                }, {
                    key: "processFeedTwitterAds",
                    value: function processFeedTwitterAds(e) {
                        this.processFeedPostAds(e),
                        this.processFeedWhoToFollowAds(e)
                    }
                }, {
                    key: "processTwitterAds",
                    value: function processTwitterAds(e) {
                        this.processRightColumnWhoToFollowAds(e),
                        this.processFeedTwitterAds(e)
                    }
                }, {
                    key: "processFeedPostAds",
                    value: function processFeedPostAds(e) {
                        var t = i.GetCurrentTimestampMs();
                        t - this.lastFeedPostAdsCheckTime > 300 && (this.extractOccurrences(o.TWITTER_AD_PLACEMENT_TYPE_FEED),
                        this.lastFeedPostAdsCheckTime = t)
                    }
                }, {
                    key: "processRightColumnWhoToFollowAds",
                    value: function processRightColumnWhoToFollowAds(e) {
                        var t = i.GetCurrentTimestampMs();
                        t - this.lastRightColumnWhoToFollowAdsCheckTime > 300 && (this.extractOccurrences(o.TWITTER_AD_PLACEMENT_TYPE_RIGHT_COLUMN_WHO_TO_FOLLOW),
                        this.lastRightColumnWhoToFollowAdsCheckTime = t)
                    }
                }, {
                    key: "processFeedWhoToFollowAds",
                    value: function processFeedWhoToFollowAds(e) {
                        var t = i.GetCurrentTimestampMs();
                        t - this.lastFeedWhoToFollowAdsCheckTime > 300 && (this.extractOccurrences(o.TWITTER_AD_PLACEMENT_TYPE_FEED_WHO_TO_FOLLOW),
                        this.lastFeedWhoToFollowAdsCheckTime = t)
                    }
                }, {
                    key: "allCellsAndMinImgSpace",
                    value: function allCellsAndMinImgSpace(e) {
                        var t = this
                          , n = []
                          , r = 0;
                        return e === o.TWITTER_AD_PLACEMENT_TYPE_RIGHT_COLUMN_WHO_TO_FOLLOW ? (n = Array.from(document.querySelectorAll(this.twConfig.RIGHT_COLUMN_WHO_TO_FOLLOW_SELECTOR)),
                        r = this.twConfig.RIGHT_COLUMN_MIN_IMGS_SPACE_PERCENTAGE) : e === o.TWITTER_AD_PLACEMENT_TYPE_FEED ? (n = Array.from(document.querySelectorAll(this.twConfig.FEED_TWEETS_SELECTOR)),
                        r = this.twConfig.FEED_MIN_IMGS_SPACE_PERCENTAGE) : e === o.TWITTER_AD_PLACEMENT_TYPE_FEED_WHO_TO_FOLLOW && (n = Array.from(document.querySelectorAll(this.twConfig.FEED_WHO_TO_FOLLOW_SELECTOR)),
                        r = this.twConfig.FEED_WHO_TO_FOLLOW_MIN_IMGS_SPACE_PERCENTAGE),
                        {
                            allCells: n = n.filter((function(e) {
                                return t.isPromoted(e)
                            }
                            )),
                            minImgSquerePercentage: r
                        }
                    }
                }, {
                    key: "extractOccurrences",
                    value: function extractOccurrences(e) {
                        var t = this.allCellsAndMinImgSpace(e)
                          , n = t.allCells
                          , r = t.minImgSquerePercentage;
                        if (n.length) {
                            var s = !0
                              , a = !1
                              , c = void 0;
                            try {
                                for (var l, u = n[Symbol.iterator](); !(s = (l = u.next()).done); s = !0) {
                                    var d = l.value;
                                    if (!d.hasAttribute(o.ATTRIBUTE_BIS_ID) && !d.hasAttribute(o.ATTRIBUTE_BIS_SIZE) && this.IsPostContentRendered(d, r)) {
                                        var f = i.GenerateAndSetBisIdToTwitterAds(d);
                                        this.setSizesAndIdForAllElements(d);
                                        var h = this.getAdTwitterObject(d, e);
                                        e === o.TWITTER_AD_PLACEMENT_TYPE_FEED && this.isVideo(d) && (h.videoData = {}),
                                        this.AdBlockerAgent.IsEnabledForTwitter() && (this.HideElement(d),
                                        this.AdBlockerAgent.SetHiddenAmount(1)),
                                        setTimeout(this.processAndSendTwitterAd.bind(this, f, h), 100)
                                    }
                                }
                            } catch (e) {
                                a = !0,
                                c = e
                            } finally {
                                try {
                                    s || null == u.return || u.return()
                                } finally {
                                    if (a)
                                        throw c
                                }
                            }
                        }
                    }
                }, {
                    key: "processAndSendTwitterAd",
                    value: function processAndSendTwitterAd(e, t) {
                        var n = document.querySelector("[".concat(o.ATTRIBUTE_BIS_ID, "=").concat(e, "]"))
                          , i = !!n && !!this.isVideo(n);
                        n && (a.SendCandidatePlacementsCount(this.id, 1, o.MESSAGE_TYPE_CANDIDATE_PLACEMENTS_TWITTER, null),
                        a.SendAdCandidates(this.id, [t], o.MESSAGE_TYPE_CANDIDATES_DATA_TWITTER, null),
                        r.CONFIG_MARK_AD_CANDIDATES && r.CONFIG_MARK_PROCESSED_AD_CANDIDATES && (n.style.cssText += i ? o.STYLES_OUTLINE_VIDEO_AD : o.STYLES_OUTLINE_SUCCESS_DETECT))
                    }
                }, {
                    key: "isPromoted",
                    value: function isPromoted(e) {
                        var t = this;
                        if (e) {
                            var n = Array.from(e.querySelectorAll(this.twConfig.PROMOTED_SELECTOR));
                            if (n.length)
                                return n.some((function(e) {
                                    var n = e.textContent;
                                    return !(!n || "string" != typeof n) && t.twConfig.PROMOTED_ALIASES.some((function(e) {
                                        return e.toLowerCase().trim() === n.toLowerCase().trim()
                                    }
                                    ))
                                }
                                ))
                        }
                        return !1
                    }
                }, {
                    key: "isVideo",
                    value: function isVideo(e) {
                        return !(!e || !e.querySelectorAll(this.twConfig.TAGS_FOR_VIDEO_TWEET_CHECK).length)
                    }
                }, {
                    key: "isCarousel",
                    value: function isCarousel(e) {
                        if (e && e.querySelector(this.twConfig.CHECK_IF_CAROUSEL_QUERY))
                            return !0;
                        return !1
                    }
                }, {
                    key: "IsPostContentRendered",
                    value: function IsPostContentRendered(e, t) {
                        var n = !1;
                        if (e) {
                            var r = e.querySelectorAll(this.twConfig.PROGRESS_SELECTOR);
                            if (r && 0 === r.length) {
                                var o = i.GetFullElementSize(e);
                                if (o.w > 0)
                                    i.GetImagesSpacePercentage(this.twConfig.TAGS_FOR_LOADING_CHECK, e, o) >= t && (n = !0)
                            }
                        }
                        return n
                    }
                }]),
                PosdTwitterAds
            }(s);
            e.exports = l
        }
        ,
        9426: e=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var t = function() {
                function PosdTwitterVideoDetector(e) {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdTwitterVideoDetector),
                    this.id = e
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdTwitterVideoDetector, [{
                    key: "InjectDetector",
                    value: function InjectDetector(e, t) {
                        var n = document.createElement("script");
                        n && n.setAttribute && n.setAttribute("bis_use", "true"),
                        n.innerHTML = PosdTwitterVideoDetector.SendVideoData.toString() + "(" + this.funcToInject() + '("'.concat(e, '", ').concat(t, "))"),
                        document.head && document.head.appendChild(n)
                    }
                }, {
                    key: "funcToInject",
                    value: function funcToInject() {
                        return function(e, t) {
                            var n = this && this.__extends || function(e, t) {
                                for (var n in t)
                                    t.hasOwnProperty(n) && (e[n] = t[n]);
                                function __() {
                                    this.constructor = e
                                }
                                __.prototype = t.prototype,
                                e.prototype = new __
                            }
                              , r = function() {
                                function Helper() {}
                                return Helper.isWhiteSpace = function(e) {
                                    return /\s/g.test(e)
                                }
                                ,
                                Helper.isLetter = function(e) {
                                    return e.match(/[a-z]/i)
                                }
                                ,
                                Helper.isNumber = function(e) {
                                    return !isNaN(parseFloat(e)) && !isNaN(e - 0)
                                }
                                ,
                                Helper.capitalizeFirst = function(e) {
                                    return "string" != typeof e ? "" : e.charAt(0).toUpperCase() + e.slice(1)
                                }
                                ,
                                Helper.isLookLikeLogicalOperator = function(e) {
                                    return [">", "<", "=", "!"].includes(e)
                                }
                                ,
                                Helper
                            }()
                              , i = function() {
                                function SelectorPropertyBuilder() {
                                    this.reset()
                                }
                                return SelectorPropertyBuilder.prototype.reset = function() {
                                    this._prop = "",
                                    this._alias = null
                                }
                                ,
                                SelectorPropertyBuilder.prototype.hasProp = function() {
                                    return this._prop.length > 0
                                }
                                ,
                                SelectorPropertyBuilder.prototype.build = function() {
                                    if (!this.hasProp())
                                        return [];
                                    var e = {
                                        prop: this._prop,
                                        alias: this._alias
                                    };
                                    return this.reset(),
                                    e
                                }
                                ,
                                SelectorPropertyBuilder.prototype.addCharToAlias = function(e) {
                                    this._alias = this._alias ? this._alias + e : e
                                }
                                ,
                                SelectorPropertyBuilder.prototype.addCharToProp = function(e) {
                                    this._prop = this._prop ? this._prop + e : e
                                }
                                ,
                                SelectorPropertyBuilder
                            }()
                              , o = "OPERATOR"
                              , s = "OPERAND_CONST_STRING_VALUE"
                              , a = "OPERAND_CONST_NUMBER_VALUE"
                              , c = "OPERAND_PROPERTY"
                              , l = function() {
                                function FilterConditionBuilder() {
                                    this.reset()
                                }
                                return FilterConditionBuilder.prototype.reset = function() {
                                    this._value = null,
                                    this._type = null
                                }
                                ,
                                FilterConditionBuilder.prototype.build = function() {
                                    if (!this._type)
                                        return [];
                                    var e = this._type === a ? parseFloat(this._value) : this._value
                                      , t = {
                                        type: {
                                            OPERATOR: "OPERATOR",
                                            OPERAND_CONST_STRING_VALUE: "CONST_VALUE",
                                            OPERAND_CONST_NUMBER_VALUE: "CONST_VALUE",
                                            OPERAND_PROPERTY: "PROPERTY"
                                        }[this._type],
                                        value: e
                                    };
                                    return this.reset(),
                                    t
                                }
                                ,
                                FilterConditionBuilder.prototype.markAsOperator = function() {
                                    return this._type = o,
                                    this
                                }
                                ,
                                FilterConditionBuilder.prototype.markAsConstStringValueOperand = function() {
                                    return this._type = s,
                                    this
                                }
                                ,
                                FilterConditionBuilder.prototype.markAsConstNumberValueOperand = function() {
                                    return this._type = a,
                                    this
                                }
                                ,
                                FilterConditionBuilder.prototype.markAsPropertyOperand = function() {
                                    return this._type = c,
                                    this
                                }
                                ,
                                FilterConditionBuilder.prototype.addCharToValue = function(e) {
                                    return this._value = this._value ? this._value + e : e,
                                    this
                                }
                                ,
                                FilterConditionBuilder.prototype.withValue = function(e) {
                                    return this._value = e,
                                    this
                                }
                                ,
                                FilterConditionBuilder
                            }()
                              , u = new (function() {
                                function RuleBuilder() {
                                    this._selectBuilder = new i,
                                    this._filterBuilder = new l,
                                    this.reset()
                                }
                                return RuleBuilder.prototype.reset = function() {
                                    return this.filterBuilder().reset(),
                                    this.selectBuilder().reset(),
                                    this._element = "",
                                    this._select = [],
                                    this._filter = [],
                                    this._limit = null,
                                    this
                                }
                                ,
                                RuleBuilder.prototype.filterBuilder = function() {
                                    return this._filterBuilder
                                }
                                ,
                                RuleBuilder.prototype.selectBuilder = function() {
                                    return this._selectBuilder
                                }
                                ,
                                RuleBuilder.prototype.build = function() {
                                    var e = {
                                        element: this._element,
                                        select: this._select,
                                        filter: this._filter,
                                        limit: this._limit
                                    };
                                    return this.reset(),
                                    e
                                }
                                ,
                                RuleBuilder.prototype.addCharToElementName = function(e) {
                                    return this._element += e,
                                    this
                                }
                                ,
                                RuleBuilder.prototype.hasElementName = function() {
                                    return this._element.length > 0
                                }
                                ,
                                RuleBuilder.prototype.addConditionToFilter = function(e) {
                                    return this._filter.push(e),
                                    this
                                }
                                ,
                                RuleBuilder.prototype.addPropertyToSelect = function(e) {
                                    return this._select.push(e),
                                    this
                                }
                                ,
                                RuleBuilder.prototype.hasPropertiesInSelect = function() {
                                    return this._select.length > 0
                                }
                                ,
                                RuleBuilder
                            }())
                              , d = function() {
                                function JsonQuery() {}
                                return JsonQuery.query = function(e, t) {
                                    for (var n = new U(e).parse(0), r = [{
                                        data: t,
                                        parents: []
                                    }], i = 0, o = [], s = 0; s < n.length; s++) {
                                        for (var a = n[s], c = [], l = 0; l < r.length; l++) {
                                            var u = r[l];
                                            if (u.data.hasOwnProperty(a.element)) {
                                                var d = {
                                                    data: u.data[a.element],
                                                    parents: u.parents.slice()
                                                };
                                                if ("*" === a.limit) {
                                                    var f = d.data;
                                                    d.data.length || (f = Object.keys(d.data));
                                                    var h = !0
                                                      , _ = !1
                                                      , A = void 0;
                                                    try {
                                                        for (var E, T = f[Symbol.iterator](); !(h = (E = T.next()).done); h = !0) {
                                                            var g = E.value
                                                              , p = "string" == typeof g ? g : d.data.indexOf(g)
                                                              , y = d.data[p]
                                                              , C = {
                                                                data: y,
                                                                parents: u.parents.slice()
                                                            };
                                                            if (a.select.length > 0) {
                                                                var S = {
                                                                    element: a.element,
                                                                    data: {}
                                                                };
                                                                a.select.forEach((function(e) {
                                                                    if (e.prop.includes(".")) {
                                                                        var t, n = e.prop.split("."), r = n.length - 1;
                                                                        n.forEach((function(n, i) {
                                                                            if (t || (t = y[n]),
                                                                            t.hasOwnProperty(n) && i !== r && t[n] && (t = t[n]),
                                                                            t.hasOwnProperty(n) && i === r && t[n]) {
                                                                                var o = e.alias ? e.alias : n;
                                                                                S.data[o] = t[n]
                                                                            }
                                                                        }
                                                                        ))
                                                                    }
                                                                    if (y.hasOwnProperty(e.prop) && !S.data[i]) {
                                                                        var i = e.alias ? e.alias : e.prop;
                                                                        S.data[i] = y[e.prop]
                                                                    }
                                                                }
                                                                )),
                                                                o.push(S),
                                                                C.parents.push(i),
                                                                i += 1
                                                            }
                                                            c.push(C)
                                                        }
                                                    } catch (e) {
                                                        _ = !0,
                                                        A = e
                                                    } finally {
                                                        try {
                                                            h || null == T.return || T.return()
                                                        } finally {
                                                            if (_)
                                                                throw A
                                                        }
                                                    }
                                                } else
                                                    c.push(d)
                                            }
                                        }
                                        if (r = c,
                                        a.filter.length > 0) {
                                            var I = a.filter[0]
                                              , v = a.filter[1]
                                              , m = a.filter[2]
                                              , b = function getValue(e, t) {
                                                return "CONST_VALUE" === t.type ? t.value : e.data[t.value]
                                            };
                                            r = r.filter((function(e) {
                                                var t = b(e, I)
                                                  , n = b(e, m);
                                                return "==" === v.value ? t == n : "===" === v.value ? t === n : "!=" === v.value ? t != n : "!==" === v.value ? t !== n : ">=" === v.value ? t >= n : "<=" === v.value ? t <= n : ">" === v.value ? t > n : "<" === v.value ? t < n : void 0
                                            }
                                            ))
                                        }
                                    }
                                    var P = n[n.length - 1]
                                      , O = [];
                                    r.forEach((function(e) {
                                        e.parents.length && e.parents.forEach((function(t) {
                                            var n = o[t];
                                            O.hasOwnProperty(t) || (O[t] = {},
                                            O[t][n.element] = n.data),
                                            O[t][P.element] = O[t][P.element] ? O[t][P.element].concat(e.data) : [e.data]
                                        }
                                        ))
                                    }
                                    ));
                                    var D = O.filter((function(e) {
                                        return e
                                    }
                                    ));
                                    return D
                                }
                                ,
                                JsonQuery
                            }()
                              , f = "filter"
                              , h = "select"
                              , _ = function() {
                                function AbstractParser(e) {
                                    if ("string" != typeof e)
                                        throw new TypeError('Param "query" must be string type');
                                    if (0 === e.trim().length)
                                        throw new TypeError('Param "query" must be not empty type');
                                    this._query = e,
                                    this._process = null,
                                    this._pos = null
                                }
                                return AbstractParser.prototype.switchProcess = function(e) {
                                    this._process = e
                                }
                                ,
                                AbstractParser.prototype.isRunningProcess = function(e) {
                                    return this._process === e
                                }
                                ,
                                AbstractParser.prototype.parse = function(e) {
                                    throw new Error("A child must implement this method")
                                }
                                ,
                                AbstractParser.prototype.name = function() {
                                    throw new Error("A child must implement this method")
                                }
                                ,
                                AbstractParser.prototype.throwSyntaxError = function(e) {
                                    throw new SyntaxError("JsonQuery: " + e)
                                }
                                ,
                                AbstractParser.prototype.throwSyntaxErrorWithTrace = function(e) {
                                    var t = this._query.substr(0, this._pos + 1);
                                    this.throwSyntaxError(e + ' "' + t + '"')
                                }
                                ,
                                AbstractParser.prototype.throwSyntaxErrorUnexpectedChar = function() {
                                    var e = this._query[this._pos];
                                    this.throwSyntaxErrorWithTrace('Unexpected symbol "' + e + '" in')
                                }
                                ,
                                AbstractParser
                            }()
                              , A = "LOOKING_FOR_PROPERTY"
                              , E = "LOOKING_FOR_SEPARATOR_OR_ALIAS"
                              , T = "LOOKING_FOR_ALIAS_NAME"
                              , g = "SELECT_OPERATION_SUCCESS"
                              , p = "SELECT_OPERATION_BEFORE_FINISH"
                              , y = "SELECT_RECORDING_PROPERTY_NAME"
                              , C = "SELECT_PARSING_ALIAS_KEYWORD"
                              , S = "SELECT_RECORDING_ALIAS_NAME"
                              , I = function(e) {
                                function SelectOperationParser() {
                                    e.apply(this, arguments)
                                }
                                return n(SelectOperationParser, e),
                                SelectOperationParser.prototype.parse = function(e) {
                                    var t = u.selectBuilder();
                                    for (this._runLookingForPropertyProcess(),
                                    this._pos = e; this._pos < this._query.length; this._pos++) {
                                        var n = this._query[this._pos];
                                        if (this._isLookingForProperty()) {
                                            if (" " === n)
                                                continue;
                                            ")" === n ? (this._pos = this._pos - 1,
                                            this._finishParsing()) : (this._pos = this._pos - 1,
                                            this._runRecordingPropertyNameProcess())
                                        } else if (this._isRecordingPropertyName())
                                            if (" " === n)
                                                this._runLookingForSeparatorOrAlias();
                                            else if ("," === n) {
                                                var r = t.build();
                                                u.addPropertyToSelect(r),
                                                this._runLookingForPropertyProcess()
                                            } else
                                                ")" === n ? (this._pos = this._pos - 1,
                                                this._finishParsing()) : t.addCharToProp(n);
                                        else if (this._isLookingForSeparatorOrAlias()) {
                                            if (" " === n)
                                                continue;
                                            if (")" === n)
                                                this._pos = this._pos - 1,
                                                this._finishParsing();
                                            else if ("," === n) {
                                                r = t.build();
                                                u.addPropertyToSelect(r),
                                                this._runLookingForPropertyProcess()
                                            } else
                                                "a" === n ? (this._pos = this._pos - 1,
                                                this._runParsingAlias()) : this.throwSyntaxErrorUnexpectedChar()
                                        } else if (this._isParsingAliasKeyword()) {
                                            if (this._query.substr(this._pos).toLowerCase().startsWith("as ")) {
                                                this._pos = this._pos + 3 - 1,
                                                this._runLookingForAliasName();
                                                continue
                                            }
                                            this.throwSyntaxErrorUnexpectedChar()
                                        } else if (this._isLookingForAliasName()) {
                                            if (" " === n)
                                                continue;
                                            this._pos = this._pos - 1,
                                            this._runRecordingAliasName()
                                        } else if (this._isRecordingAliasName())
                                            if (" " === n) {
                                                r = t.build();
                                                u.addPropertyToSelect(r),
                                                this._runLookingForPropertyProcess()
                                            } else if ("," === n) {
                                                r = t.build();
                                                u.addPropertyToSelect(r),
                                                this._runLookingForPropertyProcess()
                                            } else
                                                ")" === n ? (this._pos = this._pos - 1,
                                                this._finishParsing()) : t.addCharToAlias(n);
                                        else if (this._isFinishOperation()) {
                                            if (t.hasProp()) {
                                                r = t.build();
                                                u.addPropertyToSelect(r)
                                            }
                                            this._markAsSuccessParsing();
                                            break
                                        }
                                    }
                                    return this._isSuccessParsed() ? u.hasPropertiesInSelect() || this.throwSyntaxErrorWithTrace("select operation requires at least one property") : this.throwSyntaxErrorWithTrace("unexpected end of select operation"),
                                    this._pos
                                }
                                ,
                                SelectOperationParser.prototype.name = function() {
                                    return h
                                }
                                ,
                                SelectOperationParser.prototype._runLookingForPropertyProcess = function() {
                                    this.switchProcess(A)
                                }
                                ,
                                SelectOperationParser.prototype._runRecordingPropertyNameProcess = function() {
                                    this.switchProcess(y)
                                }
                                ,
                                SelectOperationParser.prototype._runLookingForSeparatorOrAlias = function() {
                                    this.switchProcess(E)
                                }
                                ,
                                SelectOperationParser.prototype._runParsingAlias = function() {
                                    this.switchProcess(C)
                                }
                                ,
                                SelectOperationParser.prototype._runLookingForAliasName = function() {
                                    this.switchProcess(T)
                                }
                                ,
                                SelectOperationParser.prototype._runRecordingAliasName = function() {
                                    this.switchProcess(S)
                                }
                                ,
                                SelectOperationParser.prototype._finishParsing = function() {
                                    this.switchProcess(p)
                                }
                                ,
                                SelectOperationParser.prototype._markAsSuccessParsing = function() {
                                    this.switchProcess(g)
                                }
                                ,
                                SelectOperationParser.prototype._isLookingForProperty = function() {
                                    return this.isRunningProcess(A)
                                }
                                ,
                                SelectOperationParser.prototype._isLookingForAliasName = function() {
                                    return this.isRunningProcess(T)
                                }
                                ,
                                SelectOperationParser.prototype._isRecordingPropertyName = function() {
                                    return this.isRunningProcess(y)
                                }
                                ,
                                SelectOperationParser.prototype._isSuccessParsed = function() {
                                    return this.isRunningProcess(g)
                                }
                                ,
                                SelectOperationParser.prototype._isLookingForSeparatorOrAlias = function() {
                                    return this.isRunningProcess(E)
                                }
                                ,
                                SelectOperationParser.prototype._isParsingAliasKeyword = function() {
                                    return this.isRunningProcess(C)
                                }
                                ,
                                SelectOperationParser.prototype._isRecordingAliasName = function() {
                                    return this.isRunningProcess(S)
                                }
                                ,
                                SelectOperationParser.prototype._isFinishOperation = function() {
                                    return this.isRunningProcess(p)
                                }
                                ,
                                SelectOperationParser
                            }(_)
                              , v = "FILTER_LOOKING_FOR_OPERAND"
                              , m = "FILTER_LOOKING_FOR_OPERATOR"
                              , b = "FILTER_RECORDING_PROPERTY_NAME"
                              , P = "FILTER_RECORDING_STRING_VALUE"
                              , O = "FILTER_RECORDING_NUMBER_VALUE"
                              , D = "FILTER_PARSING_OPERATOR"
                              , R = "FILTER_FINISH_PROCESS"
                              , k = "FILTER_SUCCESS"
                              , N = function(e) {
                                function FilterOperationParser() {
                                    e.apply(this, arguments)
                                }
                                return n(FilterOperationParser, e),
                                FilterOperationParser.prototype.parse = function(e) {
                                    var t = u.filterBuilder();
                                    for (this.switchProcess(v),
                                    this._pos = e; this._pos < this._query.length; this._pos++) {
                                        var n = this._query[this._pos];
                                        if (this.isRunningProcess(v)) {
                                            if (" " === n)
                                                continue;
                                            "@" === n ? (t.markAsPropertyOperand(),
                                            this.switchProcess(b)) : "'" === n ? (t.markAsConstStringValueOperand(),
                                            this.switchProcess(P)) : r.isNumber(n) ? (this._pos = this._pos - 1,
                                            t.markAsConstNumberValueOperand(),
                                            this.switchProcess(O)) : ")" === n ? (this._pos = this._pos - 1,
                                            this.switchProcess(R)) : this.throwSyntaxErrorUnexpectedChar()
                                        } else if (this.isRunningProcess(b))
                                            if (" " === n) {
                                                var i = t.build();
                                                u.addConditionToFilter(i),
                                                this.switchProcess(m)
                                            } else if (")" === n) {
                                                this._pos = this._pos - 1;
                                                i = t.build();
                                                u.addConditionToFilter(i),
                                                this.switchProcess(R)
                                            } else if (r.isLookLikeLogicalOperator(n)) {
                                                this._pos = this._pos - 1;
                                                i = t.build();
                                                u.addConditionToFilter(i),
                                                this.switchProcess(m)
                                            } else
                                                t.addCharToValue(n);
                                        else if (this.isRunningProcess(m)) {
                                            if (" " === n)
                                                continue;
                                            ")" === n ? (this._pos = this._pos - 1,
                                            this.switchProcess(R)) : r.isLookLikeLogicalOperator(n) && (this._pos = this._pos - 1,
                                            this.switchProcess(D))
                                        } else if (this.isRunningProcess(P))
                                            if ("'" === n) {
                                                i = t.build();
                                                u.addConditionToFilter(i),
                                                this.switchProcess(m)
                                            } else
                                                t.addCharToValue(n);
                                        else if (this.isRunningProcess(O))
                                            if (" " === n) {
                                                i = t.build();
                                                u.addConditionToFilter(i),
                                                this.switchProcess(m)
                                            } else if (r.isLookLikeLogicalOperator(n))
                                                this._pos = this._pos - 1,
                                                this.switchProcess(D);
                                            else if (")" === n) {
                                                this._pos = this._pos - 1;
                                                i = t.build();
                                                u.addConditionToFilter(i),
                                                this.switchProcess(R)
                                            } else
                                                r.isNumber(n) || "." === n ? t.addCharToValue(n) : this.throwSyntaxErrorUnexpectedChar();
                                        else if (this.isRunningProcess(D)) {
                                            var o = this.parseLogicalOperation(this._query.substr(this._pos));
                                            t.markAsOperator().withValue(o);
                                            i = t.build();
                                            u.addConditionToFilter(i),
                                            this._pos = this._pos + o.length - 1,
                                            this.switchProcess(v)
                                        } else if (this.isRunningProcess(R)) {
                                            this.switchProcess(k);
                                            break
                                        }
                                    }
                                    return this.isRunningProcess(k) || this.throwSyntaxErrorWithTrace("unexpected end of filter operation"),
                                    this._pos
                                }
                                ,
                                FilterOperationParser.prototype.name = function() {
                                    return f
                                }
                                ,
                                FilterOperationParser.prototype.parseLogicalOperation = function(e) {
                                    for (var t = e.substr(0, 3), n = [["!==", "==="], ["!=", "==", "<=", ">="], ["<", ">"]], r = 0; r < n.length; r++) {
                                        var i = n[r].find((function(e) {
                                            return t.startsWith(e)
                                        }
                                        ));
                                        if (i)
                                            return i
                                    }
                                    throw new Error("JsonQuery: could not find operator")
                                }
                                ,
                                FilterOperationParser
                            }(_)
                              , L = "LOOKING_FOR_ELEMENT_NAME"
                              , M = "RECORDING_ELEMENT_NAME"
                              , G = "BLOCK_PARSING"
                              , w = "LOOKING_FOR_OPERATION"
                              , F = "RECORDING_OPERATION_NAME"
                              , U = function(e) {
                                function Parser(t) {
                                    e.call(this, t),
                                    this._operations = [new N(t), new I(t)]
                                }
                                return n(Parser, e),
                                Parser.prototype.parse = function(e) {
                                    u.reset();
                                    var t = ""
                                      , n = [];
                                    for (this._runLookingForElementNameProcess(),
                                    this._pos = e; this._pos < this._query.length; this._pos++) {
                                        var r = this._query[this._pos];
                                        if (this._isLookingForElementNameProcess()) {
                                            if (" " === r)
                                                continue;
                                            "." === r || (this._pos = this._pos - 1),
                                            this._runRecordingElementNameProcess()
                                        } else if (this.isRunningProcess(M))
                                            if (this._isElementSeparator(r)) {
                                                var i = u.build();
                                                n.push(i)
                                            } else
                                                this._needStartParseBlock(r) ? this._runParsingBlockProcess() : this._isNotAllowedCharForElementName(r) ? this.throwSyntaxErrorWithTrace('symbol "' + r + '" is not allowed as part of element name') : u.addCharToElementName(r);
                                        else if (this._isRunningBlockParsingProcess()) {
                                            if (" " === r)
                                                continue;
                                            this._isLooksLikeLimitOperation(r) ? (u._limit = "*",
                                            this._runLookingForOperation()) : "#" === r ? this._runRecordingOperationName() : this.throwSyntaxErrorUnexpectedChar()
                                        } else if (this._isRunningLookingForOperation()) {
                                            if (" " === r)
                                                continue;
                                            if ("#" === r)
                                                this._runRecordingOperationName();
                                            else if ("]" === r) {
                                                i = u.build();
                                                n.push(i),
                                                this._runLookingForElementNameProcess()
                                            } else
                                                this.throwSyntaxErrorUnexpectedChar()
                                        } else if (this._isRunningRecordingOperationName())
                                            if ("(" === r) {
                                                var o = this._findParserForOperatorOrThrowException(t);
                                                t = "",
                                                this._pos = this._pos + 1,
                                                this._pos = o.parse(this._pos),
                                                this._runLookingForOperation()
                                            } else
                                                this._isNotAllowedCharForOperationName(r) ? this.throwSyntaxErrorUnexpectedChar() : t += r
                                    }
                                    if (u.hasElementName()) {
                                        i = u.build();
                                        n.push(i)
                                    }
                                    return n
                                }
                                ,
                                Parser.prototype._runLookingForElementNameProcess = function() {
                                    this.switchProcess(L)
                                }
                                ,
                                Parser.prototype._runRecordingElementNameProcess = function() {
                                    this.switchProcess(M)
                                }
                                ,
                                Parser.prototype._runParsingBlockProcess = function() {
                                    this.switchProcess(G)
                                }
                                ,
                                Parser.prototype._runLookingForOperation = function() {
                                    this.switchProcess(w)
                                }
                                ,
                                Parser.prototype._runRecordingOperationName = function() {
                                    this.switchProcess(F)
                                }
                                ,
                                Parser.prototype._isLookingForElementNameProcess = function() {
                                    return this.isRunningProcess(L)
                                }
                                ,
                                Parser.prototype._isRunningBlockParsingProcess = function() {
                                    return this.isRunningProcess(G)
                                }
                                ,
                                Parser.prototype._isRunningLookingForOperation = function() {
                                    return this.isRunningProcess(w)
                                }
                                ,
                                Parser.prototype._isRunningRecordingOperationName = function() {
                                    return this.isRunningProcess(F)
                                }
                                ,
                                Parser.prototype._isElementSeparator = function(e) {
                                    return "." === e
                                }
                                ,
                                Parser.prototype._isNotAllowedCharForElementName = function(e) {
                                    return r.isWhiteSpace(e) || ["#", "@", "!", "[", "]", "%", "-", "+", "^", "*", "(", ")", "?", ":", "{", "}"].includes(e)
                                }
                                ,
                                Parser.prototype._isNotAllowedCharForOperationName = function(e) {
                                    return r.isWhiteSpace(e) || ["#", "@", "!", "[", "]", "%", "-", "+", "^", "*", "(", ")", "?", ":", "{", "}"].includes(e)
                                }
                                ,
                                Parser.prototype._isLooksLikeLimitOperation = function(e) {
                                    return "*" === e
                                }
                                ,
                                Parser.prototype._needStartParseBlock = function(e) {
                                    return "[" === e
                                }
                                ,
                                Parser.prototype._findParserForOperatorOrThrowException = function(e) {
                                    var t = this._operations.find((function(t) {
                                        return t.name() === e
                                    }
                                    ));
                                    return t || this.throwSyntaxErrorWithTrace('unknown operation "' + e + '"'),
                                    t
                                }
                                ,
                                Parser
                            }(_)
                              , B = {
                                parseJSON: function parseJSON(e) {
                                    return JSON.parse(e)
                                },
                                jsonQuery: function jsonQuery(e, t) {
                                    var n = []
                                      , r = t.queries.map((function(r, i) {
                                        var o = Object.assign({}, e);
                                        return n.push(o),
                                        d.query(r, n[i]).map((function(e) {
                                            if (t.props) {
                                                var n = !0
                                                  , r = !1
                                                  , i = void 0;
                                                try {
                                                    for (var o, s = function _loop() {
                                                        var t = o.value
                                                          , n = t[0]
                                                          , r = t[1];
                                                        e[n] && (e[n] = e[n][0].map((function(e) {
                                                            var t = {};
                                                            return e.key && r.includes(e.key) ? e.value : e.key ? void 0 : (r.forEach((function(n) {
                                                                e[n] && !t[n] && (e[n].length && "string" != typeof e[n] ? t[n] = e[n][0] : t[n] = e[n])
                                                            }
                                                            )),
                                                            Object.keys(t).length ? t : void 0)
                                                        }
                                                        )).filter((function(e) {
                                                            return e
                                                        }
                                                        )))
                                                    }, a = t.props[Symbol.iterator](); !(n = (o = a.next()).done); n = !0)
                                                        s()
                                                } catch (e) {
                                                    r = !0,
                                                    i = e
                                                } finally {
                                                    try {
                                                        n || null == a.return || a.return()
                                                    } finally {
                                                        if (r)
                                                            throw i
                                                    }
                                                }
                                            } else
                                                !e.hasOwnProperty(t.prop) && e.media && (e[t.prop] = [JSON.stringify(e.media[0])],
                                                delete e.media);
                                            return e
                                        }
                                        ))
                                    }
                                    ))
                                      , i = [];
                                    return r.forEach((function(e) {
                                        i = i.concat(e)
                                    }
                                    )),
                                    i
                                },
                                forEach: function forEach(e, t) {
                                    var n = [];
                                    return e.forEach((function(e) {
                                        var r = t.prop ? e[t.prop] : e
                                          , i = B[t.pipe](r);
                                        n.push(i)
                                    }
                                    )),
                                    n
                                },
                                filterContains: function filterContains(e, t) {
                                    return e.filter((function(e) {
                                        var n = !1;
                                        return t.props && t.props.length && (n = t.props.some((function(t) {
                                            return e.hasOwnProperty(t)
                                        }
                                        ))),
                                        !(!e.hasOwnProperty(t.prop) && !n) && t.types.some((function(r) {
                                            var i = !1;
                                            if (e[t.prop] && (i = e[t.prop].includes('"'.concat(r, '"'))),
                                            n) {
                                                var o = !0
                                                  , s = !1
                                                  , a = void 0;
                                                try {
                                                    for (var c, l = t.props[Symbol.iterator](); !(o = (c = l.next()).done); o = !0) {
                                                        var u = c.value;
                                                        if ("string" == typeof e[u] && e[u].includes('"'.concat(r, '"'))) {
                                                            i = !0;
                                                            break
                                                        }
                                                        if (e.hasOwnProperty("type") && e.type === r) {
                                                            i = !0;
                                                            break
                                                        }
                                                    }
                                                } catch (e) {
                                                    s = !0,
                                                    a = e
                                                } finally {
                                                    try {
                                                        o || null == l.return || l.return()
                                                    } finally {
                                                        if (s)
                                                            throw a
                                                    }
                                                }
                                            }
                                            return i
                                        }
                                        ))
                                    }
                                    ))
                                },
                                arrToVal: function arrToVal(e, t) {
                                    return e.map((function(e) {
                                        var n = {};
                                        return t.prop && e[t.prop] && !t.props && (e[t.prop] = e[t.prop][0],
                                        n = e),
                                        t.props && t.props.forEach((function(t) {
                                            var r = t[0];
                                            t[1].forEach((function(t) {
                                                e[r] && (e[r].length && (e[r] = e[r][0]),
                                                e[r][t] && (n[t] = e[r][t]))
                                            }
                                            ))
                                        }
                                        )),
                                        n
                                    }
                                    ))
                                },
                                sendVideoData: function sendVideoData(t) {
                                    SendVideoData(e, t)
                                },
                                mapParseJsonToObj: function mapParseJsonToObj(e, t) {
                                    return e.map((function(e) {
                                        return e[t.prop] && "string" == typeof e[t.prop] && (e[t.prop] = JSON.parse(e[t.prop])),
                                        e[t.prop] && 1 === e[t.prop].length && (e[t.prop] = e[t.prop][0]),
                                        e
                                    }
                                    ))
                                },
                                mapVideoData: function mapVideoData(e, t) {
                                    return e.map((function(e) {
                                        var n = e.tweets ? e.tweets : {};
                                        t && t.props && t.props.forEach((function(t) {
                                            e[t] && (n[t] = e[t])
                                        }
                                        ));
                                        var r = {
                                            tweets: n
                                        };
                                        if (e.string_value) {
                                            if (e.string_value.media_entities) {
                                                var i = Object.keys(e.string_value.media_entities);
                                                return r.variants = e.string_value.media_entities[i[0]].video_info.variants,
                                                r
                                            }
                                            if (e.string_value.video_info && e.string_value.video_info.variants)
                                                return r.variants = e.string_value.video_info.variants,
                                                r
                                        } else if (e.video_info && e.video_info.variants)
                                            return r.variants = e.video_info.variants,
                                            r
                                    }
                                    )).filter((function(e) {
                                        return void 0 !== e
                                    }
                                    ))
                                }
                            };
                            var x = "WATCH_EVENT"
                              , H = new (function() {
                                function EventDispatcher() {
                                    this.listeners = {}
                                }
                                return EventDispatcher.prototype.on = function(e, t) {
                                    this.listeners[e] = t
                                }
                                ,
                                EventDispatcher.prototype.emit = function(e, t) {
                                    var n = this;
                                    setTimeout((function() {
                                        return n.listeners[e](t)
                                    }
                                    ), 0)
                                }
                                ,
                                EventDispatcher
                            }());
                            function findParsers(e) {
                                return (t.parsers || []).filter((function(t) {
                                    return new RegExp(t.watch).test(e)
                                }
                                ))
                            }
                            H.on(x, (function(e) {
                                findParsers(e.url).forEach((function(t) {
                                    return setTimeout((function() {
                                        return function runPipeLine(e, t) {
                                            var n = !0
                                              , r = !1
                                              , i = void 0;
                                            try {
                                                for (var o, s = e.pipes[Symbol.iterator](); !(n = (o = s.next()).done); n = !0) {
                                                    var a = o.value
                                                      , c = B[a.name];
                                                    c && (t = c(t, a.arguments))
                                                }
                                            } catch (e) {
                                                r = !0,
                                                i = e
                                            } finally {
                                                try {
                                                    n || null == s.return || s.return()
                                                } finally {
                                                    if (r)
                                                        throw i
                                                }
                                            }
                                        }(t, e.content)
                                    }
                                    ), 0)
                                }
                                ))
                            }
                            ));
                            var V = XMLHttpRequest.prototype.open;
                            XMLHttpRequest.prototype.open = function() {
                                this.requestMethod = arguments[0],
                                this.url = arguments[1],
                                V.apply(this, arguments)
                            }
                            ;
                            var Y = XMLHttpRequest.prototype.send;
                            XMLHttpRequest.prototype.send = function() {
                                var e = this.onreadystatechange
                                  , n = this
                                  , r = !1
                                  , i = !0
                                  , o = !1
                                  , s = void 0;
                                try {
                                    for (var a, c = t.parsers[Symbol.iterator](); !(i = (a = c.next()).done); i = !0) {
                                        var l = a.value;
                                        if (r = new RegExp(l.watch,"i").test(n.url))
                                            break
                                    }
                                } catch (e) {
                                    o = !0,
                                    s = e
                                } finally {
                                    try {
                                        i || null == c.return || c.return()
                                    } finally {
                                        if (o)
                                            throw s
                                    }
                                }
                                return r ? (this.onreadystatechange = function() {
                                    if (4 === this.readyState && function needParse(e) {
                                        return findParsers(e).length > 0
                                    }(this.url)) {
                                        var t = {
                                            url: this.url,
                                            content: "" === n.responseType || "text" === n.responseType ? n.responseText : ""
                                        };
                                        H.emit(x, t)
                                    }
                                    if (e)
                                        return e.apply(this, arguments)
                                }
                                ,
                                Y.apply(this, arguments)) : Y.apply(this, arguments)
                            }
                        }
                        .toString()
                    }
                }], [{
                    key: "SendVideoData",
                    value: function SendVideoData(e, t) {
                        t.detectionTime = Date.now() / 1e3 | 0;
                        var n = {
                            posdMessageId: "PANELOS_MESSAGE",
                            posdHash: function GenerateQuickId() {
                                return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0, 22)
                            }(),
                            type: "TWITTER_VIDEO_DATA",
                            from: e,
                            to: e.substring(0, e.length - 2),
                            content: t
                        };
                        try {
                            window.postMessage(n)
                        } catch (e) {}
                    }
                }]),
                PosdTwitterVideoDetector
            }();
            e.exports = t
        }
        ,
        1225: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(3124)
              , i = function() {
                function PosdCommon() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdCommon)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdCommon, null, [{
                    key: "QuerySelectorAll",
                    value: function QuerySelectorAll(e, t) {
                        return document.__proto__.querySelectorAll.call(e, t)
                    }
                }, {
                    key: "QuerySelector",
                    value: function QuerySelector(e, t) {
                        return document.__proto__.querySelector.call(e, t)
                    }
                }, {
                    key: "Escape",
                    value: function Escape(e) {
                        return e.replace(/\"/g, "&quot;")
                    }
                }, {
                    key: "ToJSON",
                    value: function ToJSON(e) {
                        return "function" == typeof e.toJSON ? e.toJSON() : JSON.stringify(e)
                    }
                }, {
                    key: "GetBaseHref",
                    value: function GetBaseHref() {
                        var e = PosdCommon.QuerySelector(document, "base");
                        return e && e.href ? e.href : ""
                    }
                }, {
                    key: "GetTabIdKey",
                    value: function GetTabIdKey(e) {
                        return "tb_" + e
                    }
                }, {
                    key: "GetMainPageId",
                    value: function GetMainPageId(e) {
                        return "mp_" + e
                    }
                }, {
                    key: "IsOnChromeRuntime",
                    value: function IsOnChromeRuntime() {
                        return chrome.app && chrome.runtime ? void 0 !== chrome.app.isInstalled : !!self.navigator.userAgent.toLowerCase().includes("firefox") && !!chrome.runtime
                    }
                }, {
                    key: "GetElementSize",
                    value: function GetElementSize(e) {
                        var t = {
                            x: 0,
                            y: 0,
                            w: 0,
                            h: 0
                        };
                        if (e && e.getBoundingClientRect) {
                            var n = e.getBoundingClientRect();
                            t = {
                                x: ~~(n.left + window.scrollX),
                                y: ~~(n.top + window.scrollX),
                                w: ~~n.width,
                                h: ~~n.height
                            }
                        }
                        return t
                    }
                }, {
                    key: "IsCoordinatesValid",
                    value: function IsCoordinatesValid(e) {
                        return !!(e && e.hasOwnProperty("x") && "number" == typeof e.x && e.hasOwnProperty("y") && "number" == typeof e.y)
                    }
                }, {
                    key: "GetFullElementSize",
                    value: function GetFullElementSize(e, t, n) {
                        var r = PosdCommon.GetElementSize(e);
                        return PosdCommon.IsCoordinatesValid(n) && (r.x = r.x + n.x,
                        r.y = r.y + n.y),
                        PosdCommon.IsCoordinatesValid(t) ? (r.abs_x = r.x + t.x,
                        r.abs_y = r.y + t.y) : (r.abs_x = r.x,
                        r.abs_y = r.y),
                        r
                    }
                }, {
                    key: "SetFullSizeToElement",
                    value: function SetFullSizeToElement(e, t, n) {
                        var r = {
                            x: 0,
                            y: 0,
                            w: 0,
                            h: 0
                        };
                        return PosdCommon.IsCoordinatesValid(n) && (r.x = r.x + n.x,
                        r.y = r.y + n.y),
                        e && e.setAttribute && (r = PosdCommon.GetFullElementSize(e, t, n),
                        e.setAttribute("bis_size", PosdCommon.ToJSON(r))),
                        r
                    }
                }, {
                    key: "GenerateAndSetBisId",
                    value: function GenerateAndSetBisId(e, t) {
                        var n = t + PosdCommon.GenerateQuickId();
                        return e && e.setAttribute && e.setAttribute(r.ATTRIBUTE_BIS_ID, n),
                        n
                    }
                }, {
                    key: "GenerateAndSetBisIdToFrame",
                    value: function GenerateAndSetBisIdToFrame(e) {
                        return PosdCommon.GenerateAndSetBisId(e, "fr_")
                    }
                }, {
                    key: "GenerateAndSetBisIdToBanner",
                    value: function GenerateAndSetBisIdToBanner(e) {
                        return PosdCommon.GenerateAndSetBisId(e, "bn_")
                    }
                }, {
                    key: "GenerateAndSetBisIdToFBAds",
                    value: function GenerateAndSetBisIdToFBAds(e) {
                        return PosdCommon.GenerateAndSetBisId(e, "fb_")
                    }
                }, {
                    key: "GenerateAndSetBisIdToTwitterAds",
                    value: function GenerateAndSetBisIdToTwitterAds(e) {
                        return PosdCommon.GenerateAndSetBisId(e, "tw_")
                    }
                }, {
                    key: "GenerateAndSetBisIdToRedditAds",
                    value: function GenerateAndSetBisIdToRedditAds(e) {
                        return PosdCommon.GenerateAndSetBisId(e, "rd_")
                    }
                }, {
                    key: "GenerateAndSetBisIdToPinterestAds",
                    value: function GenerateAndSetBisIdToPinterestAds(e) {
                        return PosdCommon.GenerateAndSetBisId(e, "pt_")
                    }
                }, {
                    key: "SetBisDepth",
                    value: function SetBisDepth(e, t) {
                        e && e.setAttribute && e.setAttribute("bis_depth", t)
                    }
                }, {
                    key: "SetBisChainId",
                    value: function SetBisChainId(e, t) {
                        e && e.setAttribute && e.setAttribute("bis_chainid", t)
                    }
                }, {
                    key: "SetBannerId",
                    value: function SetBannerId(e, t) {
                        e && e.setAttribute && e.setAttribute("bis_bannerid", t)
                    }
                }, {
                    key: "UpdateCandidateStatusBorderColor",
                    value: function UpdateCandidateStatusBorderColor(e, t) {
                        if (e && e.style && e.style.cssText && t) {
                            var n = "";
                            t.filteredOut ? n = r.STYLES_BORDER_BANNER_FILTERED : t.sentToBackend ? n = r.STYLES_BORDER_BANNER_SENT : t.targetUrlExtracted ? n = r.STYLES_BORDER_BANNER_URL_EXTRACTED : t.fullContentExtracted && (n = r.STYLES_BORDER_BANNER_CONTENT_EXTRACTED);
                            var i = e.style.cssText;
                            i.includes(n) || (i = i.replace(/(border: .{3,} solid 6px !important;)|(border: 6px solid .{3,} !important;)/, n),
                            e.style.cssText = i)
                        }
                    }
                }, {
                    key: "GetMainDomainFromHost",
                    value: function GetMainDomainFromHost(e) {
                        if (e && e.split) {
                            var t = e.split(".");
                            if (t.length >= 2)
                                return t[t.length - 2] + "." + t[t.length - 1]
                        }
                        return null
                    }
                }, {
                    key: "GetMainDomainFromUrl",
                    value: function GetMainDomainFromUrl(e) {
                        return PosdCommon.GetMainDomainFromHost(PosdCommon.GetHostNameFromUrl(e))
                    }
                }, {
                    key: "GetHostNameFromUrl",
                    value: function GetHostNameFromUrl(e) {
                        var t = e.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
                        return null != t && t.length > 2 && "string" == typeof t[2] && t[2].length > 0 ? t[2] : null
                    }
                }, {
                    key: "IsUrlFromHost",
                    value: function IsUrlFromHost(e, t) {
                        return -1 !== e.indexOf(PosdCommon.GetMainDomainFromUrl(t))
                    }
                }, {
                    key: "IsPublisherInBlacklist",
                    value: function IsPublisherInBlacklist(e, t) {
                        var n = !1
                          , r = PosdCommon.GetHostNameFromUrl(e);
                        return t && t.length && r && t.includes(r) && (n = !0),
                        n
                    }
                }, {
                    key: "GetUrlFromStyleStr",
                    value: function GetUrlFromStyleStr(e) {
                        var t = e.replace(/"/g, "'")
                          , n = t.indexOf("http");
                        -1 == n && (n = t.indexOf("//"));
                        var r = t.indexOf("'", n)
                          , i = "";
                        return n > 0 && r > 0 && n < r && (i = t.substr(n, r - n)),
                        i
                    }
                }, {
                    key: "GetCurrentDataTimeStr",
                    value: function GetCurrentDataTimeStr() {
                        function Normalize2(e) {
                            return e < 10 ? "0" + e : "" + e
                        }
                        var e = new Date;
                        return "".concat(e.getFullYear(), "-").concat(Normalize2(e.getMonth() + 1), "-").concat(Normalize2(e.getDate()), " ").concat(Normalize2(e.getHours()), ":").concat(Normalize2(e.getMinutes()), ":").concat(Normalize2(e.getSeconds()))
                    }
                }, {
                    key: "GetWindowSize",
                    value: function GetWindowSize() {
                        return {
                            w: document.documentElement.clientWidth,
                            h: document.documentElement.clientHeight
                        }
                    }
                }, {
                    key: "IsIframeHasContentScript",
                    value: function IsIframeHasContentScript(e) {
                        try {
                            if (e && !PosdCommon.IsIframeSecure(e) && "ok" !== e.contentDocument.body.getAttribute("bis_status"))
                                return !1
                        } catch (e) {}
                        return !0
                    }
                }, {
                    key: "IsIframeSecure",
                    value: function IsIframeSecure(e) {
                        return !e || 0 !== e.src.length && "about:blank" !== e.src && "about:srcdoc" !== e.src && 0 !== e.src.indexOf("javascript:")
                    }
                }, {
                    key: "isValidUrl",
                    value: function isValidUrl(e) {
                        return "string" == typeof e && e.length > 0 && (-1 !== e.indexOf("http") || -1 !== e.indexOf("//"))
                    }
                }, {
                    key: "IsValidBisId",
                    value: function IsValidBisId(e) {
                        return !!(e.startsWith("mp_") || e.startsWith("bg_") || e.startsWith("fr_"))
                    }
                }, {
                    key: "IsYouTubeUrl",
                    value: function IsYouTubeUrl(e) {
                        var t = PosdCommon.GetHostNameFromUrl(e);
                        return !!t && -1 !== t.indexOf("youtube.com")
                    }
                }, {
                    key: "IsFacebookUrl",
                    value: function IsFacebookUrl(e) {
                        var t = PosdCommon.GetHostNameFromUrl(e);
                        return !!t && -1 !== t.indexOf("facebook.com")
                    }
                }, {
                    key: "IsTwitterUrl",
                    value: function IsTwitterUrl(e) {
                        var t = PosdCommon.GetHostNameFromUrl(e);
                        return !!t && -1 !== t.indexOf("twitter.com")
                    }
                }, {
                    key: "IsRedditUrl",
                    value: function IsRedditUrl(e) {
                        var t = PosdCommon.GetHostNameFromUrl(e);
                        return !!t && -1 !== t.indexOf("reddit.com")
                    }
                }, {
                    key: "IsTiktokUrl",
                    value: function IsTiktokUrl(e) {
                        var t = PosdCommon.GetHostNameFromUrl(e);
                        return !!t && -1 !== t.indexOf("tiktok.com")
                    }
                }, {
                    key: "IsPinterestUrl",
                    value: function IsPinterestUrl(e) {
                        var t = PosdCommon.GetHostNameFromUrl(e);
                        return !!t && -1 !== t.search(/pinterest\.(com|ca|at|ch|cl|co\.kr|com\.au|com\.mx|co\.uk|de|dk|es|fr|ie|it|jp|nz|ph|pt|se)/)
                    }
                }, {
                    key: "GetFullIdStr",
                    value: function GetFullIdStr(e, t, n) {
                        return "ext:".concat(chrome.runtime.id, "-chainId:").concat(e, "-frameId:").concat(t, "-bisId:").concat(n)
                    }
                }, {
                    key: "GetRandomIntInRange",
                    value: function GetRandomIntInRange(e, t) {
                        return parseInt((Math.random() * (t - e) + e).toFixed(0))
                    }
                }, {
                    key: "GetCurrentTimestamp",
                    value: function GetCurrentTimestamp() {
                        return Date.now() / 1e3 | 0
                    }
                }, {
                    key: "GetCurrentTimestampMs",
                    value: function GetCurrentTimestampMs() {
                        return Date.now()
                    }
                }, {
                    key: "GenerateQuickId",
                    value: function GenerateQuickId() {
                        return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0, 22)
                    }
                }, {
                    key: "GenerateTicketId",
                    value: function GenerateTicketId() {
                        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                            var t = 16 * Math.random() | 0;
                            return ("x" == e ? t : 3 & t | 8).toString(16)
                        }
                        ))
                    }
                }, {
                    key: "IsInFilterList",
                    value: function IsInFilterList(e, t) {
                        var n = !1;
                        if (e)
                            for (var r = 0; r < e.length && !n; r++)
                                -1 != t.indexOf(e[r]) && (n = !0);
                        return n
                    }
                }, {
                    key: "IsChrome",
                    value: function IsChrome() {
                        return -1 !== navigator.userAgent.indexOf("Chrome")
                    }
                }, {
                    key: "IsFirefox",
                    value: function IsFirefox() {
                        return -1 !== navigator.userAgent.indexOf("Firefox")
                    }
                }, {
                    key: "IsFBVideoDataValid",
                    value: function IsFBVideoDataValid(e) {
                        var t = !1;
                        if (e)
                            try {
                                "number" == typeof e.detectionTime && "string" == typeof e.videoId && "string" == typeof e.videoUrl && e.videoId.length && e.videoUrl.length && (t = !0)
                            } catch (e) {}
                        return t
                    }
                }, {
                    key: "GetDefaultAdblockerStatus",
                    value: function GetDefaultAdblockerStatus() {
                        var e = {};
                        return e[r.ADBLOCKER_FOR_DISPLAY] = r.ADBLOCKER_STATUS_DISABLED,
                        e[r.ADBLOCKER_FOR_FACEBOOK] = r.ADBLOCKER_STATUS_DISABLED,
                        e[r.ADBLOCKER_FOR_TWITTER] = r.ADBLOCKER_STATUS_DISABLED,
                        e[r.ADBLOCKER_FOR_REDDIT] = r.ADBLOCKER_STATUS_DISABLED,
                        e[r.ADBLOCKER_FOR_PINTEREST] = r.ADBLOCKER_STATUS_DISABLED,
                        e
                    }
                }, {
                    key: "GetImagesSpacePercentage",
                    value: function GetImagesSpacePercentage(e, t, n) {
                        var r = 0;
                        if (t) {
                            var i = Array.from(t.querySelectorAll("*")).map((function(t) {
                                return t.shadowRoot ? t.shadowRoot.querySelectorAll(e) : t.querySelectorAll(e)
                            }
                            )).filter((function(e) {
                                return e
                            }
                            )).reduce((function(e, t) {
                                return t && t.length && t.forEach((function(t) {
                                    e.includes(t) || e.push(t)
                                }
                                )),
                                e
                            }
                            ), []);
                            if (i && i.length >= 1 && n.w * n.h > 0) {
                                var o = 0;
                                i.forEach((function(e) {
                                    var t = PosdCommon.GetElementSize(e);
                                    o += t.w * t.h
                                }
                                )),
                                o && (r = o / (n.w * n.h) * 100)
                            }
                        }
                        return r
                    }
                }, {
                    key: "GetCookie",
                    value: function GetCookie(e) {
                        for (var t = e + "=", n = decodeURIComponent(document.cookie).split(";"), r = 0; r < n.length; r++) {
                            for (var i = n[r]; " " == i.charAt(0); )
                                i = i.substring(1);
                            if (0 == i.indexOf(t))
                                return i.substring(t.length, i.length)
                        }
                        return ""
                    }
                }]),
                PosdCommon
            }();
            e.exports = i
        }
        ,
        3124: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(4019)
              , i = function() {
                function PosdConst() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdConst)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdConst, null, [{
                    key: "EXCLUDE_DOMAINS_LIST",
                    value: function EXCLUDE_DOMAINS_LIST() {
                        return "EXCLUDE_DOMAINS_LIST"
                    }
                }, {
                    key: "EXCLUDE_PAGES_LIST",
                    value: function EXCLUDE_PAGES_LIST() {
                        return "EXCLUDE_PAGES_LIST"
                    }
                }, {
                    key: "DOCUMENT_READYSTATE_LOADING",
                    get: function get() {
                        return "loading"
                    }
                }, {
                    key: "DOCUMENT_READYSTATE_INTERACTIVE",
                    get: function get() {
                        return "interactive"
                    }
                }, {
                    key: "DOCUMENT_READYSTATE_COMPLETE",
                    get: function get() {
                        return "complete"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_ID",
                    get: function get() {
                        return "bis_id"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_SIZE",
                    get: function get() {
                        return "bis_size"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_STYLE",
                    get: function get() {
                        return "bis_style"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_STATUS",
                    get: function get() {
                        return "bis_status"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_LABEL",
                    get: function get() {
                        return "bis_label"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_ELEMENT_ID",
                    get: function get() {
                        return "bis_element_id"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_HIDE_HEIGHT",
                    get: function get() {
                        return "bis_hide_height"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_HIDE_WIDTH",
                    get: function get() {
                        return "bis_hide_width"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_HIDE_STATUS",
                    get: function get() {
                        return "bis_hide_status"
                    }
                }, {
                    key: "ATTRIBUTE_BIS_HIDE_LEFT_OFFSET",
                    get: function get() {
                        return "bis_hide_left_offset"
                    }
                }, {
                    key: "ACTIVATION_BY_ADS_MANAGER",
                    get: function get() {
                        return "ACTIVATION_BY_ADS_MANAGER"
                    }
                }, {
                    key: "ACTIVATION_BY_ADS_SELF",
                    get: function get() {
                        return "ACTIVATION_BY_ADS_SELF"
                    }
                }, {
                    key: "MESSAGE_ID",
                    get: function get() {
                        return "PANELOS_MESSAGE"
                    }
                }, {
                    key: "MESSAGE_TYPE_TEST",
                    get: function get() {
                        return "TEST"
                    }
                }, {
                    key: "MESSAGE_TYPE_IFRAME_CONTENT",
                    get: function get() {
                        return "IFRAME_CONTENT"
                    }
                }, {
                    key: "MESSAGE_TYPE_IFRAME_INVALID_CHAIN_SEGMENT_CONTENT",
                    get: function get() {
                        return "IFRAME_INVALID_CHAIN_SEGMENT_CONTENT"
                    }
                }, {
                    key: "MESSAGE_TYPE_TAB_INITIALIZATION",
                    get: function get() {
                        return "TAB_INITIALIZATION"
                    }
                }, {
                    key: "MESSAGE_TYPE_TAB_SINGLE_PAGE_REINITIALIZATION",
                    get: function get() {
                        return "TAB_SINGLE_PAGE_REINITIALIZATION"
                    }
                }, {
                    key: "MESSAGE_TYPE_TAB_URL_CHANGED",
                    get: function get() {
                        return "TAB_URL_CHANGED"
                    }
                }, {
                    key: "MESSAGE_TYPE_TAB_ADBLOCKER_STATUS_CHANGED",
                    get: function get() {
                        return "TAB_ADBLOCKER_STATUS_CHANGED"
                    }
                }, {
                    key: "MESSAGE_TYPE_IFRAME_INITIALIZATION",
                    get: function get() {
                        return "IFRAME_INITIALIZATION"
                    }
                }, {
                    key: "MESSAGE_TYPE_IFRAME_INITIALIZATION_RESPONSE",
                    get: function get() {
                        return "IFRAME_INITIALIZATION_RESPONSE"
                    }
                }, {
                    key: "MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_INPUTS",
                    get: function get() {
                        return "IFRAME_CONTENT_INFO_DETECTED_INPUTS"
                    }
                }, {
                    key: "MESSAGE_TYPE_IFRAME_CONTENT_INFO_DETECTED_REDIRECTS",
                    get: function get() {
                        return "IFRAME_CONTENT_INFO_DETECTED_REDIRECTS"
                    }
                }, {
                    key: "MESSAGE_TYPE_HIDDEN_AD_CANDIDATES_AMOUNT",
                    get: function get() {
                        return "HIDDEN_AD_CANDIDATES_AMOUNT"
                    }
                }, {
                    key: "MESSAGE_TYPE_GET_WINDOW_TARGET_URL",
                    get: function get() {
                        return "GET_WINDOW_TARGET_URL"
                    }
                }, {
                    key: "MESSAGE_TYPE_GET_WINDOW_TARGET_URL_RESPOND",
                    get: function get() {
                        return "GET_WINDOW_TARGET_URL_RESPOND"
                    }
                }, {
                    key: "MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL",
                    get: function get() {
                        return "GET_WINDOW_CLICK_TARGET_URL"
                    }
                }, {
                    key: "MESSAGE_TYPE_GET_WINDOW_CLICK_TARGET_URL_RESPOND",
                    get: function get() {
                        return "GET_WINDOW_CLICK_TARGET_URL_RESPOND"
                    }
                }, {
                    key: "MESSAGE_TYPE_GET_FRAME_CONTENT",
                    get: function get() {
                        return "GET_FRAME_CONTENT"
                    }
                }, {
                    key: "MESSAGE_TYPE_TARGET_URL_DETECTION_BY_CLICK",
                    get: function get() {
                        return "TARGET_URL_DETECTION_BY_CLICK"
                    }
                }, {
                    key: "MESSAGE_TYPE_NEW_PAGE_CREATED_TICKET",
                    get: function get() {
                        return "NEW_PAGE_CREATED_TICKET"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANEL_REGULATOR_RESULT",
                    get: function get() {
                        return "PANEL_REGULATOR_RESULT"
                    }
                }, {
                    key: "MESSAGE_TYPE_OUT_TICKET",
                    get: function get() {
                        return "OUT_TICKET"
                    }
                }, {
                    key: "MESSAGE_TYPE_CHAIN_ACTIVATION",
                    get: function get() {
                        return "CHAIN_ACTIVATION"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATES_DATA_SKINADS",
                    get: function get() {
                        return "CANDIDATES_DATA_SKINADS"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATES_DATA_BANNERS",
                    get: function get() {
                        return "CANDIDATES_DATA_BANNERS"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATES_DATA_FACEBOOK",
                    get: function get() {
                        return "CANDIDATES_DATA_FACEBOOK"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATES_DATA_TWITTER",
                    get: function get() {
                        return "CANDIDATES_DATA_TWITTER"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATES_DATA_REDDIT",
                    get: function get() {
                        return "CANDIDATES_DATA_REDDIT"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATES_DATA_PINTEREST",
                    get: function get() {
                        return "CANDIDATES_DATA_PINTEREST"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_FACEBOOK",
                    get: function get() {
                        return "CANDIDATE_PLACEMENTS_FACEBOOK"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_TWITTER",
                    get: function get() {
                        return "CANDIDATE_PLACEMENTS_TWITTER"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_REDDIT",
                    get: function get() {
                        return "CANDIDATE_PLACEMENTS_REDDIT"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_PINTEREST",
                    get: function get() {
                        return "CANDIDATE_PLACEMENTS_PINTEREST"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_HTML5",
                    get: function get() {
                        return "CANDIDATE_PLACEMENTS_HTML5"
                    }
                }, {
                    key: "MESSAGE_TYPE_CANDIDATE_PLACEMENTS_TIKTOK",
                    get: function get() {
                        return "CANDIDATE_PLACEMENTS_TIKTOK"
                    }
                }, {
                    key: "MESSAGE_TYPE_HTML5_CANDIDATES_EXTRACTION_STATUSES",
                    get: function get() {
                        return "HTML5_CANDIDATES_EXTRACTION_STATUSES"
                    }
                }, {
                    key: "MESSAGE_TYPE_BANNER_CANDIDATES_EXTRACTION_STATUSES",
                    get: function get() {
                        return "BANNER_CANDIDATES_EXTRACTION_STATUSES"
                    }
                }, {
                    key: "MESSAGE_TYPE_SKIN_AD_CANDIDATES_EXTRACTION_STATUSES",
                    get: function get() {
                        return "SKIN_AD_CANDIDATES_EXTRACTION_STATUSES"
                    }
                }, {
                    key: "MESSAGE_TYPE_VIDEO_XHR_CANDIDATE",
                    get: function get() {
                        return "VIDEO_XHR_CANDIDATE"
                    }
                }, {
                    key: "MESSAGE_TYPE_VIDEO_HAR",
                    get: function get() {
                        return "VIDEO_HAR"
                    }
                }, {
                    key: "MESSAGE_TYPE_FACEBOOK_VIDEO_DATA",
                    get: function get() {
                        return "FACEBOOK_VIDEO_DATA"
                    }
                }, {
                    key: "MESSAGE_TYPE_FACEBOOK_INSTREAM_DATA",
                    get: function get() {
                        return "FACEBOOK_INSTREAM_DATA"
                    }
                }, {
                    key: "MESSAGE_TYPE_FACEBOOK_MARKETPLACE_VIDEO_DATA",
                    get: function get() {
                        return "FACEBOOK_MARKETPLACE_VIDEO_DATA"
                    }
                }, {
                    key: "MESSAGE_TYPE_PINTEREST_VIDEO_DATA",
                    get: function get() {
                        return "PINTEREST_VIDEO_DATA"
                    }
                }, {
                    key: "MESSAGE_TYPE_TWITTER_VIDEO_DATA",
                    get: function get() {
                        return "TWITTER_VIDEO_DATA"
                    }
                }, {
                    key: "MESSAGE_TYPE_REDDIT_VIDEO_DATA",
                    get: function get() {
                        return "REDDIT_VIDEO_DATA"
                    }
                }, {
                    key: "MESSAGE_TYPE_REDDIT_RIGHT_COLUMN_DATA",
                    get: function get() {
                        return "REDDIT_RIGHT_COLUMN_DATA"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_PANALYTICS_ID",
                    get: function get() {
                        return "GET_PANALYTICS_ID"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_PANELOS_VERSION",
                    get: function get() {
                        return "GET_PANELOS_VERSION"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_ADBLOCKER_STATUS",
                    get: function get() {
                        return "GET_ADBLOCKER_STATUS"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_ADBLOCKER_COUNTERS",
                    get: function get() {
                        return "GET_ADBLOCKER_COUNTERS"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_ENABLE_ADBLOCKER",
                    get: function get() {
                        return "ENABLE_ADBLOCKER"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_DISABLE_ADBLOCKER",
                    get: function get() {
                        return "DISABLE_ADBLOCKER"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_GET_DATA_COLLECTION_STATUS",
                    get: function get() {
                        return "GET_DATA_COLLECTION_STATUS"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_ENABLE_DATA_COLLECTION",
                    get: function get() {
                        return "ENABLE_DATA_COLLECTION"
                    }
                }, {
                    key: "MESSAGE_TYPE_PANELOS_CLIENT_REQUESTS_DISABLE_DATA_COLLECTION",
                    get: function get() {
                        return "DISABLE_DATA_COLLECTION"
                    }
                }, {
                    key: "MESSAGE_TYPE_ADBLOCK_INSPECTOR_AGENT_REPORT",
                    get: function get() {
                        return "ADBLOCK_INSPECTOR_AGENT_REPORT"
                    }
                }, {
                    key: "MESSAGE_TYPE_GET_EXCLUDE_LIST",
                    get: function get() {
                        return "GET_EXCLUDE_LIST"
                    }
                }, {
                    key: "MESSAGE_TYPE_ADD_INTO_EXCLUDE_LIST",
                    get: function get() {
                        return "ADD_INTO_EXCLUDE_LIST"
                    }
                }, {
                    key: "MESSAGE_TYPE_REMOVE_FROM_EXCLUDE_LIST",
                    get: function get() {
                        return "REMOVE_FROM_EXCLUDE_LIST"
                    }
                }, {
                    key: "MESSAGE_TYPE_ADD_CURRENT_DOMAIN_INTO_EXCLUDE_LIST",
                    get: function get() {
                        return "ADD_CURRENT_DOMAIN_INTO_EXCLUDE_LIST"
                    }
                }, {
                    key: "MESSAGE_TYPE_ADD_CURRENT_PAGE_INTO_EXCLUDE_LIST",
                    get: function get() {
                        return "ADD_CURRENT_PAGE_INTO_EXCLUDE_LIST"
                    }
                }, {
                    key: "MESSAGE_TYPE_GET_CURRENT_DOMAIN",
                    get: function get() {
                        return "GET_CURRENT_DOMAIN"
                    }
                }, {
                    key: "MESSAGE_TYPE_GET_CURRENT_PAGE_URL",
                    get: function get() {
                        return "GET_CURRENT_PAGE_URL"
                    }
                }, {
                    key: "ADBLOCKER_STATUS_ENABLED",
                    get: function get() {
                        return "enabled"
                    }
                }, {
                    key: "ADBLOCKER_STATUS_DISABLED",
                    get: function get() {
                        return "disabled"
                    }
                }, {
                    key: "VIDEO_TRAFFIC_SOURCE_HTML",
                    get: function get() {
                        return "HTML"
                    }
                }, {
                    key: "VIDEO_TRAFFIC_SOURCE_JS",
                    get: function get() {
                        return "JS"
                    }
                }, {
                    key: "VIDEO_TRAFFIC_SOURCE_XHR",
                    get: function get() {
                        return "XHR"
                    }
                }, {
                    key: "VIDEO_TRAFFIC_MEDIA_TYPE_HTML",
                    get: function get() {
                        return "HTML"
                    }
                }, {
                    key: "VIDEO_TRAFFIC_FACEBOOK_MEDIA_TYPE_JSON",
                    get: function get() {
                        return "JSON"
                    }
                }, {
                    key: "VIDEO_TRAFFIC_FACEBOOK_MEDIA_ALIAS_JSON",
                    get: function get() {
                        return "JSON_FB"
                    }
                }, {
                    key: "VIDEO_TRAFFIC_ALIAS_YT_JSON_NEXTPAGE",
                    get: function get() {
                        return "YT_JSON_NEXTPAGE"
                    }
                }, {
                    key: "VIDEO_TRAFFIC_ALIAS_YT_HTML_DESKTOP_INSCRIPT_PLAYER_RESPONSE",
                    get: function get() {
                        return "YT_HTML_DESKTOP_INSCRIPT_PLAYER_RESPONSE"
                    }
                }, {
                    key: "FACEBOOK_AD_PLACEMENT_TYPE_FEED",
                    get: function get() {
                        return "feed"
                    }
                }, {
                    key: "FACEBOOK_AD_PLACEMENT_TYPE_FEED_WATCH",
                    get: function get() {
                        return "feedWatch"
                    }
                }, {
                    key: "FACEBOOK_AD_PLACEMENT_TYPE_MARKETPLACE",
                    get: function get() {
                        return "marketplace"
                    }
                }, {
                    key: "FACEBOOK_AD_PLACEMENT_TYPE_RIGHT_COLOMN",
                    get: function get() {
                        return "rightColumn"
                    }
                }, {
                    key: "FACEBOOK_AD_PLACEMENT_TYPE_STORIES",
                    get: function get() {
                        return "stories"
                    }
                }, {
                    key: "FACEBOOK_AD_PLACEMENT_TYPE_VIDEO_PAGE",
                    get: function get() {
                        return "videoPage"
                    }
                }, {
                    key: "FACEBOOK_AD_VIDEO_URL_REPLACE_NAME",
                    get: function get() {
                        return "[ADVERTISER_NAME]"
                    }
                }, {
                    key: "FACEBOOK_AD_VIDEO_URL_REPLACE_VIDEO_ID",
                    get: function get() {
                        return "[VIDEO_ID]"
                    }
                }, {
                    key: "TWITTER_AD_PLACEMENT_TYPE_FEED",
                    get: function get() {
                        return "feedPost"
                    }
                }, {
                    key: "TWITTER_AD_PLACEMENT_TYPE_FEED_WHO_TO_FOLLOW",
                    get: function get() {
                        return "feedWhoToFollow"
                    }
                }, {
                    key: "TWITTER_AD_PLACEMENT_TYPE_RIGHT_COLUMN_WHO_TO_FOLLOW",
                    get: function get() {
                        return "rightColumnWhoToFollow"
                    }
                }, {
                    key: "REDDIT_AD_PLACEMENT_TYPE_FEED",
                    get: function get() {
                        return "feed"
                    }
                }, {
                    key: "REDDIT_AD_PLACEMENT_TYPE_COMMENT_PAGE",
                    get: function get() {
                        return "commentPage"
                    }
                }, {
                    key: "REDDIT_AD_PLACEMENT_TYPE_RIGHT_COLUMN",
                    get: function get() {
                        return "rightColumn"
                    }
                }, {
                    key: "PINTEREST_AD_PLACEMENT_TYPE_FEED",
                    get: function get() {
                        return "feed"
                    }
                }, {
                    key: "PINTEREST_AD_PLACEMENT_TYPE_SEARCH",
                    get: function get() {
                        return "searchPage"
                    }
                }, {
                    key: "PINTEREST_AD_PLACEMENT_TYPE_PIN",
                    get: function get() {
                        return "pinPage"
                    }
                }, {
                    key: "PINTEREST_LOADER_TYPE_PIN_PAGE",
                    get: function get() {
                        return "pinPage"
                    }
                }, {
                    key: "PINTEREST_LOADER_TYPE_USER_INFO",
                    get: function get() {
                        return "userInfo"
                    }
                }, {
                    key: "KNOWN_CSS_NAMES",
                    get: function get() {
                        return ["align-content", "align-items", "align-self", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "block-size", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-end-end-radius", "border-end-start-radius", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "color-adjust", "color-interpolation", "color-interpolation-filters", "column-count", "column-fill", "column-gap", "column-rule-color", "column-rule-style", "column-rule-width", "column-width", "contain", "content", "counter-increment", "counter-reset", "counter-set", "cursor", "cx", "cy", "direction", "display", "dominant-baseline", "empty-cells", "fill", "fill-opacity", "fill-rule", "filter", "flex-basis", "flex-direction", "flex-grow", "flex-shrink", "flex-wrap", "float", "flood-color", "flood-opacity", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column-end", "grid-column-start", "grid-row-end", "grid-row-start", "grid-template-areas", "grid-template-columns", "grid-template-rows", "height", "hyphens", "image-orientation", "image-rendering", "ime-mode", "inline-size", "inset-block-end", "inset-block-start", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "left", "letter-spacing", "lighting-color", "line-break", "line-height", "list-style-image", "list-style-position", "list-style-type", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "marker-end", "marker-mid", "marker-start", "mask", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-position-x", "mask-position-y", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "object-fit", "object-position", "opacity", "order", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overscroll-behavior-x", "overscroll-behavior-y", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "paint-order", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "r", "resize", "right", "row-gap", "ruby-align", "ruby-position", "rx", "ry", "scroll-behavior", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-type", "scrollbar-color", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "shape-rendering", "stop-color", "stop-opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "table-layout", "text-align", "text-align-last", "text-anchor", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-offset", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "user-select", "vector-effect", "vertical-align", "visibility", "white-space", "width", "will-change", "word-break", "word-spacing", "writing-mode", "x", "y", "z-index", "-moz-appearance", "-moz-box-align", "-moz-box-direction", "-moz-box-flex", "-moz-box-ordinal-group", "-moz-box-orient", "-moz-box-pack", "-moz-float-edge", "-moz-force-broken-image-icon", "-moz-image-region", "-moz-orient", "-moz-outline-radius-bottomleft", "-moz-outline-radius-bottomright", "-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-moz-stack-sizing", "-moz-tab-size", "-moz-text-size-adjust", "-moz-user-focus", "-moz-user-input", "-moz-user-modify", "-moz-window-dragging", "-webkit-line-clamp", "-webkit-text-fill-color", "-webkit-text-stroke-color", "-webkit-text-stroke-width", "offset-distance", "offset-path", "offset-rotate", "orphans", "speak", "tab-size", "text-underline-position", "text-size-adjust", "widows", "zoom", "-webkit-appearance", "-webkit-border-horizontal-spacing", "-webkit-border-image", "-webkit-border-vertical-spacing", "-webkit-box-align", "-webkit-box-decoration-break", "-webkit-box-direction", "-webkit-box-flex", "-webkit-box-ordinal-group", "-webkit-box-orient", "-webkit-box-pack", "-webkit-box-reflect", "column-span", "backdrop-filter", "-webkit-font-smoothing", "-webkit-highlight", "-webkit-hyphenate-character", "-webkit-line-break", "-webkit-locale", "-webkit-margin-before-collapse", "-webkit-margin-after-collapse", "-webkit-mask-box-image", "-webkit-mask-box-image-outset", "-webkit-mask-box-image-repeat", "-webkit-mask-box-image-slice", "-webkit-mask-box-image-source", "-webkit-mask-box-image-width", "-webkit-mask-clip", "-webkit-mask-composite", "-webkit-mask-image", "-webkit-mask-origin", "-webkit-mask-position", "-webkit-mask-repeat", "-webkit-mask-size", "-webkit-print-color-adjust", "-webkit-rtl-ordering", "-webkit-tap-highlight-color", "-webkit-text-combine", "-webkit-text-decorations-in-effect", "-webkit-text-emphasis-color", "-webkit-text-emphasis-position", "-webkit-text-emphasis-style", "-webkit-text-orientation", "-webkit-text-security", "-webkit-user-drag", "-webkit-user-modify", "-webkit-writing-mode", "-webkit-app-region", "buffered-rendering", "color-rendering", "alignment-baseline", "baseline-shift", "d"]
                    }
                }, {
                    key: "FACEBOOK_DESIGN_VERSION_OLD",
                    get: function get() {
                        return 1
                    }
                }, {
                    key: "FACEBOOK_DESIGN_VERSION_NEW",
                    get: function get() {
                        return 2
                    }
                }, {
                    key: "OUT_TICKET_TYPE_SINGLE",
                    get: function get() {
                        return "SINGLE"
                    }
                }, {
                    key: "OUT_TICKET_TYPE_MULTI",
                    get: function get() {
                        return "MULTI"
                    }
                }, {
                    key: "ADBLOCKER_FOR_DISPLAY",
                    get: function get() {
                        return "DISPLAY"
                    }
                }, {
                    key: "ADBLOCKER_FOR_FACEBOOK",
                    get: function get() {
                        return "FACEBOOK"
                    }
                }, {
                    key: "ADBLOCKER_FOR_TWITTER",
                    get: function get() {
                        return "TWITTER"
                    }
                }, {
                    key: "ADBLOCKER_FOR_REDDIT",
                    get: function get() {
                        return "REDDIT"
                    }
                }, {
                    key: "ADBLOCKER_FOR_PINTEREST",
                    get: function get() {
                        return "PINTEREST"
                    }
                }, {
                    key: "AD_DETECTOR_INITIATOR_TIMER",
                    get: function get() {
                        return "timer"
                    }
                }, {
                    key: "AD_DETECTOR_INITIATOR_MUTATION",
                    get: function get() {
                        return "mutation"
                    }
                }, {
                    key: "AD_DETECTOR_INITIATOR_PAGECHANGE",
                    get: function get() {
                        return "pagechange"
                    }
                }, {
                    key: "AD_DETECTOR_INITIATOR_ACTIVATION",
                    get: function get() {
                        return "activation"
                    }
                }, {
                    key: "IFRAMES_CHAIN_BUILDING_STATUS_NONE",
                    get: function get() {
                        return 0
                    }
                }, {
                    key: "IFRAMES_CHAIN_BUILDING_STATUS_INITED",
                    get: function get() {
                        return 1
                    }
                }, {
                    key: "IFRAMES_CHAIN_BUILDING_STATUS_STARTED",
                    get: function get() {
                        return 2
                    }
                }, {
                    key: "IFRAMES_CHAIN_BUILDING_STATUS_TARGET_URL_DETECTION_STARTED",
                    get: function get() {
                        return 3
                    }
                }, {
                    key: "IFRAMES_CHAIN_BUILDING_STATUS_TARGET_URL_DETECTION_FINISHED",
                    get: function get() {
                        return 4
                    }
                }, {
                    key: "IFRAMES_CHAIN_BUILDING_STATUS_FINISHED",
                    get: function get() {
                        return 5
                    }
                }, {
                    key: "CANDIDATE_PROCESS_STATUS_DETECED",
                    get: function get() {
                        return 1
                    }
                }, {
                    key: "CANDIDATE_PROCESS_STATUS_START_PROCESSING",
                    get: function get() {
                        return 2
                    }
                }, {
                    key: "CANDIDATE_PROCESS_STATUS_PROCESSING_ACTIVATED",
                    get: function get() {
                        return 3
                    }
                }, {
                    key: "CANDIDATE_PROCESS_STATUS_PREBUILD_INFO_SENT",
                    get: function get() {
                        return 4
                    }
                }, {
                    key: "TICKET_BUILDING_STATUS_INIT",
                    get: function get() {
                        return 0
                    }
                }, {
                    key: "TICKET_BUILDING_STATUS_STARTED",
                    get: function get() {
                        return 1
                    }
                }, {
                    key: "TICKET_BUILDING_STATUS_GETTING_WEBNAVIGATION_IFRAMES",
                    get: function get() {
                        return 2
                    }
                }, {
                    key: "TICKET_BUILDING_STATUS_GOT_WEBNAVIGATION_IFRAMES",
                    get: function get() {
                        return 3
                    }
                }, {
                    key: "TICKET_BUILDING_STATUS_CONSTRUCT_IFRAME_CHAINS_ACTIVE",
                    get: function get() {
                        return 4
                    }
                }, {
                    key: "TICKET_BUILDING_STATUS_CONSTRUCT_IFRAME_CHAINS_DONE",
                    get: function get() {
                        return 5
                    }
                }, {
                    key: "TICKET_BUILDING_STATUS_DEEP_TARGET_URL_DETECTION_ACTIVE",
                    get: function get() {
                        return 6
                    }
                }, {
                    key: "TICKET_BUILDING_STATUS_DEEP_TARGET_URL_DETECTION_DONE",
                    get: function get() {
                        return 7
                    }
                }, {
                    key: "TICKET_BUILDING_STATUS_DONE",
                    get: function get() {
                        return 8
                    }
                }, {
                    key: "TICKET_ALIAS_PANALYTICSID",
                    get: function get() {
                        return r.decode("cGFuZWxpc3RJZA==")
                    }
                }, {
                    key: "TICKET_ALIAS_PINSTANCEID",
                    get: function get() {
                        return r.decode("cGFuZWxJZA==")
                    }
                }, {
                    key: "MAX_OUT_TICKETS_QUEUE_LENGTH",
                    get: function get() {
                        return 20
                    }
                }, {
                    key: "STYLES_BORDER_BANNER_CONTENT_EXTRACTED",
                    get: function get() {
                        return "border: 6px solid blue !important;"
                    }
                }, {
                    key: "STYLES_BORDER_BANNER_URL_EXTRACTED",
                    get: function get() {
                        return "border: 6px solid blueviolet !important;"
                    }
                }, {
                    key: "STYLES_BORDER_BANNER_FILTERED",
                    get: function get() {
                        return "border: 6px solid orange !important;"
                    }
                }, {
                    key: "STYLES_BORDER_BANNER_SENT",
                    get: function get() {
                        return "border: green solid 6px !important;"
                    }
                }, {
                    key: "STYLES_OUTLINE_SUCCESS_DETECT",
                    get: function get() {
                        return "outline: green solid 6px !important;"
                    }
                }, {
                    key: "STYLES_OUTLINE_VIDEO_AD",
                    get: function get() {
                        return "outline: rgba(42, 213, 255, 1) solid 6px !important;"
                    }
                }, {
                    key: "STYLES_OUTLINE_TEXT_AD",
                    get: function get() {
                        return "outline: rgba(243, 143, 20, 1) solid 6px !important;"
                    }
                }]),
                PosdConst
            }();
            e.exports = i
        }
        ,
        1850: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(3124)
              , i = n(1225)
              , o = function() {
                function PosdMessage() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, PosdMessage)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(PosdMessage, null, [{
                    key: "IsValid",
                    value: function IsValid(e) {
                        try {
                            if (void 0 !== e && void 0 !== e.posdMessageId && void 0 !== e.type && void 0 !== e.content)
                                return e.posdMessageId && e.posdMessageId === r.MESSAGE_ID
                        } catch (e) {}
                        return !1
                    }
                }, {
                    key: "IsStrictValid",
                    value: function IsStrictValid(e) {
                        try {
                            if (void 0 !== e && void 0 !== e.posdMessageId && void 0 !== e.from && void 0 !== e.to && void 0 !== e.type && void 0 !== e.content)
                                return e.posdMessageId && e.posdMessageId === r.MESSAGE_ID
                        } catch (e) {}
                        return !1
                    }
                }, {
                    key: "EmptyMessage",
                    get: function get() {
                        return {
                            posdMessageId: r.MESSAGE_ID,
                            posdHash: i.GenerateQuickId(),
                            from: "",
                            to: "",
                            multiTo: [],
                            type: "",
                            content: ""
                        }
                    }
                }]),
                PosdMessage
            }();
            e.exports = o
        }
        ,
        9622: (e,t,n)=>{
            function _defineProperties(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            var r = n(3124)
              , i = function() {
                function StylesMinimizer() {
                    !function _classCallCheck(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, StylesMinimizer)
                }
                return function _createClass(e, t, n) {
                    return t && _defineProperties(e.prototype, t),
                    n && _defineProperties(e, n),
                    e
                }(StylesMinimizer, [{
                    key: "getStylesByElementsBisId",
                    value: function getStylesByElementsBisId(e) {
                        var t = this
                          , n = {};
                        return this.addStylesForNode(e, n),
                        e.querySelectorAll("*").forEach((function(e) {
                            t.addStylesForNode(e, n)
                        }
                        )),
                        n
                    }
                }, {
                    key: "addStylesForNode",
                    value: function addStylesForNode(e, t) {
                        var n = this.getStyles(e);
                        t[e.getAttribute(r.ATTRIBUTE_BIS_ELEMENT_ID)] = n
                    }
                }, {
                    key: "getStyles",
                    value: function getStyles(e) {
                        var t = window.getComputedStyle(e, null);
                        return this.minimiseComputedStyles(t)
                    }
                }, {
                    key: "minimiseComputedStyles",
                    value: function minimiseComputedStyles(e) {
                        for (var t = {}, n = 0; n < e.length; n++) {
                            var i = e.item(n)
                              , o = e.getPropertyValue(i);
                            t[o] || (t[o] = []);
                            var s = r.KNOWN_CSS_NAMES.indexOf(i);
                            s >= 0 ? t[o].push(s) : t[o].push(i)
                        }
                        return t
                    }
                }]),
                StylesMinimizer
            }();
            e.exports = i
        }
        ,
        4019: e=>{
            var t = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode: function encode(e) {
                    var n, r, i, o, s, a, c, l = "", u = 0;
                    for (e = t._utf8_encode(e); u < e.length; )
                        o = (n = e.charCodeAt(u++)) >> 2,
                        s = (3 & n) << 4 | (r = e.charCodeAt(u++)) >> 4,
                        a = (15 & r) << 2 | (i = e.charCodeAt(u++)) >> 6,
                        c = 63 & i,
                        isNaN(r) ? a = c = 64 : isNaN(i) && (c = 64),
                        l = l + this._keyStr.charAt(o) + this._keyStr.charAt(s) + this._keyStr.charAt(a) + this._keyStr.charAt(c);
                    return l
                },
                decode: function decode(e) {
                    if ("{" === e[0])
                        return e;
                    var n, r, i, o, s, a, c = "", l = 0;
                    for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < e.length; )
                        n = this._keyStr.indexOf(e.charAt(l++)) << 2 | (o = this._keyStr.indexOf(e.charAt(l++))) >> 4,
                        r = (15 & o) << 4 | (s = this._keyStr.indexOf(e.charAt(l++))) >> 2,
                        i = (3 & s) << 6 | (a = this._keyStr.indexOf(e.charAt(l++))),
                        c += String.fromCharCode(n),
                        64 != s && (c += String.fromCharCode(r)),
                        64 != a && (c += String.fromCharCode(i));
                    return c = t._utf8_decode(c)
                },
                _utf8_encode: function _utf8_encode(e) {
                    e = e.replace(/\r\n/g, "\n");
                    for (var t = "", n = 0; n < e.length; n++) {
                        var r = e.charCodeAt(n);
                        r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192),
                        t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
                        t += String.fromCharCode(r >> 6 & 63 | 128),
                        t += String.fromCharCode(63 & r | 128))
                    }
                    return t
                },
                _utf8_decode: function _utf8_decode(e) {
                    for (var t = "", n = 0, r = 0, i = 0, o = 0; n < e.length; )
                        (r = e.charCodeAt(n)) < 128 ? (t += String.fromCharCode(r),
                        n++) : r > 191 && r < 224 ? (i = e.charCodeAt(n + 1),
                        t += String.fromCharCode((31 & r) << 6 | 63 & i),
                        n += 2) : (i = e.charCodeAt(n + 1),
                        o = e.charCodeAt(n + 2),
                        t += String.fromCharCode((15 & r) << 12 | (63 & i) << 6 | 63 & o),
                        n += 3);
                    return t
                }
            };
            e.exports = t
        }
    }
      , t = {};
    function __webpack_require__(n) {
        var r = t[n];
        if (void 0 !== r)
            return r.exports;
        var i = t[n] = {
            exports: {}
        };
        return e[n](i, i.exports, __webpack_require__),
        i.exports
    }
    (()=>{
        var e = __webpack_require__(3124)
          , t = __webpack_require__(4269)
          , n = __webpack_require__(5106);
        if (self == top)
            (new t).Init();
        else if (document.readyState === e.DOCUMENT_READYSTATE_LOADING)
            document.addEventListener("DOMContentLoaded", (function() {
                (new n).Init()
            }
            ));
        else if (document.readyState === e.DOCUMENT_READYSTATE_INTERACTIVE || document.readyState === e.DOCUMENT_READYSTATE_COMPLETE) {
            (new n).Init()
        }
    }
    )()
}
)();
//# sourceMappingURL=panelos-content.js.map
