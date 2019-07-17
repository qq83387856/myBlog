define('../Messaging/Messaging',["require", "exports"], function (require, exports) {
    (function (NotificationType) {
        //CustomizedBugCreated is the first entry. If we remove its positioning then we need to reflect it in ContentScript where hard coded value is used to improve perf
        NotificationType[NotificationType["CustomizedWorkItemCreated"] = 0] = "CustomizedWorkItemCreated";
        //PageEventCaptured is the second entry. If we remove its positioning then we need to reflect it in ContentScript where hard coded value is used to improve perf
        NotificationType[NotificationType["PageEventCaptured"] = 1] = "PageEventCaptured";
        //StartTraceability is entry for enabling traceability via twa. If we remove its positioning then we need to reflect it in ContentScript where hard coded value is used to improve perf
        NotificationType[NotificationType["StartTraceability"] = 2] = "StartTraceability";
        //VerifyIfOfflineSessionRunning is entry for verfiy offline condition to enable traceability via twa. If we remove its positioning then we need to reflect it in ContentScript where hard coded value is used to improve perf
        NotificationType[NotificationType["VerifyIfOfflineSessionRunning"] = 3] = "VerifyIfOfflineSessionRunning";
        NotificationType[NotificationType["AnnotationToolReady"] = 4] = "AnnotationToolReady";
        NotificationType[NotificationType["AnnotateScreenshot"] = 5] = "AnnotateScreenshot";
        NotificationType[NotificationType["AnnotationDone"] = 6] = "AnnotationDone";
        NotificationType[NotificationType["AnnotationCancelled"] = 7] = "AnnotationCancelled";
        NotificationType[NotificationType["SessionLoad"] = 8] = "SessionLoad";
        NotificationType[NotificationType["SessionUpdate"] = 9] = "SessionUpdate";
        NotificationType[NotificationType["SessionStart"] = 10] = "SessionStart";
        NotificationType[NotificationType["SessionStop"] = 11] = "SessionStop";
        NotificationType[NotificationType["ExportSession"] = 12] = "ExportSession";
        NotificationType[NotificationType["CaptureScreenshot"] = 13] = "CaptureScreenshot";
        NotificationType[NotificationType["ScreenshotCaptureCompleted"] = 14] = "ScreenshotCaptureCompleted";
        NotificationType[NotificationType["ScreenshotCaptureCancelled"] = 15] = "ScreenshotCaptureCancelled";
        NotificationType[NotificationType["SaveSettings"] = 16] = "SaveSettings";
        NotificationType[NotificationType["CreateWorkItem"] = 17] = "CreateWorkItem";
        NotificationType[NotificationType["NewAttachmentCreated"] = 18] = "NewAttachmentCreated";
        NotificationType[NotificationType["NewBugCreated"] = 19] = "NewBugCreated";
        NotificationType[NotificationType["CloseWorkItemDialog"] = 20] = "CloseWorkItemDialog";
        NotificationType[NotificationType["AttachmentsAvailable"] = 21] = "AttachmentsAvailable";
        NotificationType[NotificationType["SaveAnnotationSettings"] = 22] = "SaveAnnotationSettings";
        NotificationType[NotificationType["FetchAnnotationSettings"] = 23] = "FetchAnnotationSettings";
        NotificationType[NotificationType["AnnotationSettingsFetchResponse"] = 24] = "AnnotationSettingsFetchResponse";
        NotificationType[NotificationType["FetchObjectFromLocalStorage"] = 25] = "FetchObjectFromLocalStorage";
        NotificationType[NotificationType["FetchObjectFromLocalStorageResponse"] = 26] = "FetchObjectFromLocalStorageResponse";
        NotificationType[NotificationType["TracingLevelChanged"] = 27] = "TracingLevelChanged";
        NotificationType[NotificationType["SaveNote"] = 28] = "SaveNote";
        NotificationType[NotificationType["NoteSaved"] = 29] = "NoteSaved";
        NotificationType[NotificationType["Trace"] = 30] = "Trace";
        NotificationType[NotificationType["ExecuteTfsCommand"] = 31] = "ExecuteTfsCommand";
        NotificationType[NotificationType["UploadInlineImage"] = 32] = "UploadInlineImage";
        NotificationType[NotificationType["ActivityErrorChanged"] = 33] = "ActivityErrorChanged";
        NotificationType[NotificationType["ExecutePerfectoCommand"] = 34] = "ExecutePerfectoCommand";
        NotificationType[NotificationType["TfsLoginFailed"] = 35] = "TfsLoginFailed";
        NotificationType[NotificationType["TfsLoginSucceeded"] = 36] = "TfsLoginSucceeded";
        NotificationType[NotificationType["StartAutoRefresh"] = 37] = "StartAutoRefresh";
        NotificationType[NotificationType["TfsReconnectSucceeded"] = 38] = "TfsReconnectSucceeded";
        NotificationType[NotificationType["TfsReconnectFailed"] = 39] = "TfsReconnectFailed";
        NotificationType[NotificationType["QueryTraceableWorkItems"] = 40] = "QueryTraceableWorkItems";
        NotificationType[NotificationType["QueryWorkItem"] = 41] = "QueryWorkItem";
        NotificationType[NotificationType["ClearTraceabilityData"] = 42] = "ClearTraceabilityData";
        NotificationType[NotificationType["QuerySimilarBugs"] = 43] = "QuerySimilarBugs";
        NotificationType[NotificationType["QueryBug"] = 44] = "QueryBug";
        NotificationType[NotificationType["UpdateWorkItem"] = 45] = "UpdateWorkItem";
        NotificationType[NotificationType["ActionLogFeatureChanged"] = 46] = "ActionLogFeatureChanged";
        NotificationType[NotificationType["PublishTelemetryData"] = 47] = "PublishTelemetryData";
        NotificationType[NotificationType["CreateTestCase"] = 48] = "CreateTestCase";
        NotificationType[NotificationType["StartVideoCapture"] = 49] = "StartVideoCapture";
        NotificationType[NotificationType["StopVideoCapture"] = 50] = "StopVideoCapture";
        NotificationType[NotificationType["ScreenshotCaptureGetActiveWindow_V1"] = 51] = "ScreenshotCaptureGetActiveWindow_V1";
        NotificationType[NotificationType["CaptureScreenshot_V1"] = 52] = "CaptureScreenshot_V1";
        NotificationType[NotificationType["ScreenshotCaptureCancelled_V1"] = 53] = "ScreenshotCaptureCancelled_V1";
        NotificationType[NotificationType["ScreenshotCaptureCompleted_V1"] = 54] = "ScreenshotCaptureCompleted_V1";
        NotificationType[NotificationType["ScreenshotCaptureError_V1"] = 55] = "ScreenshotCaptureError_V1";
        NotificationType[NotificationType["StopTraceability"] = 56] = "StopTraceability";
        NotificationType[NotificationType["GetSystemInfomation_V1"] = 57] = "GetSystemInfomation_V1";
        NotificationType[NotificationType["StartVideoCapture_V1"] = 58] = "StartVideoCapture_V1";
        NotificationType[NotificationType["StopVideoCapture_V1"] = 59] = "StopVideoCapture_V1";
        NotificationType[NotificationType["VideoCaptureError_V1"] = 60] = "VideoCaptureError_V1";
        NotificationType[NotificationType["VideoCaptureCompleted_V1"] = 61] = "VideoCaptureCompleted_V1";
        NotificationType[NotificationType["VideoCaptureCancelled_V1"] = 62] = "VideoCaptureCancelled_V1";
        NotificationType[NotificationType["VideoCaptureStarted_V1"] = 63] = "VideoCaptureStarted_V1";
        NotificationType[NotificationType["PerfData"] = 64] = "PerfData";
        NotificationType[NotificationType["FeatureFlagStatus"] = 65] = "FeatureFlagStatus";
        NotificationType[NotificationType["StartActionLogCapture_V1"] = 66] = "StartActionLogCapture_V1";
        NotificationType[NotificationType["StopActionLogCapture_V1"] = 67] = "StopActionLogCapture_V1";
        NotificationType[NotificationType["GetActionLogReport_V1"] = 68] = "GetActionLogReport_V1";
        NotificationType[NotificationType["ActionLogContainerCreated_V1"] = 69] = "ActionLogContainerCreated_V1";
        NotificationType[NotificationType["ActionLogError_V1"] = 70] = "ActionLogError_V1";
        NotificationType[NotificationType["ActionLogUploadCompleted_V1"] = 71] = "ActionLogUploadCompleted_V1";
        NotificationType[NotificationType["PingTab"] = 72] = "PingTab";
        NotificationType[NotificationType["ShowNotification"] = 73] = "ShowNotification";
        NotificationType[NotificationType["CreateFeedbackResponse"] = 74] = "CreateFeedbackResponse";
        NotificationType[NotificationType["VerifyIfSessionIsRunning_V1"] = 75] = "VerifyIfSessionIsRunning_V1";
        NotificationType[NotificationType["ConfigureXtForFeedbackRequest_V1"] = 76] = "ConfigureXtForFeedbackRequest_V1";
        NotificationType[NotificationType["QueryFeedbackRequests"] = 77] = "QueryFeedbackRequests";
        NotificationType[NotificationType["QueryFeedbackRequestDetail"] = 78] = "QueryFeedbackRequestDetail";
        NotificationType[NotificationType["UpdateSessionState"] = 79] = "UpdateSessionState";
        NotificationType[NotificationType["CreateOrUpdateFeedbackSessionWithGivenState"] = 80] = "CreateOrUpdateFeedbackSessionWithGivenState";
        NotificationType[NotificationType["ProvideFeedback"] = 81] = "ProvideFeedback";
        NotificationType[NotificationType["EnableDefaultWorkItemInToolbar"] = 82] = "EnableDefaultWorkItemInToolbar";
        NotificationType[NotificationType["CaptureDesktopScreenshot_V1"] = 83] = "CaptureDesktopScreenshot_V1";
        NotificationType[NotificationType["LoadScreenshotContentFromBlob"] = 84] = "LoadScreenshotContentFromBlob";
        NotificationType[NotificationType["CaptureDesktopScreenshot"] = 85] = "CaptureDesktopScreenshot"; //85
    })(exports.NotificationType || (exports.NotificationType = {}));
    var NotificationType = exports.NotificationType;
});
//# sourceMappingURL=Messaging.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Common/Constants',["require", "exports"], function (require, exports) {
    var ActionLogConstants = (function () {
        function ActionLogConstants() {
        }
        ActionLogConstants.focusAreaWidth = 300;
        ActionLogConstants.focusAreaHeight = 60;
        ActionLogConstants.runnerActionLogThumbnailWidth = 200;
        ActionLogConstants.runnerActionLogThumbnailHeight = 100;
        ActionLogConstants.thumbnailFocusAreaWidth = 100;
        ActionLogConstants.thumbnailFocusAreaHeight = 60;
        ActionLogConstants.thumbnailScaleFactor = 0.50;
        ActionLogConstants.imageTageClassName = "action-log-image";
        ActionLogConstants.linkTageClassName = "action-log-link";
        ActionLogConstants.canvasId = "image-editor";
        ActionLogConstants.inputTextActionLogPrefix = "Update input field with value";
        ActionLogConstants.videoThumbnailClassName = "xt-video-attachment";
        ActionLogConstants.actionLogFileNamePrefix = "actionLog-";
        ActionLogConstants.actionLogFileFormat = "jpeg";
        ActionLogConstants.clickEventType = "click";
        ActionLogConstants.keyboardEventType = "keyboard";
        ActionLogConstants.actionLogsFileName = "actionLog";
        ActionLogConstants.stepHeader = "Steps";
        ActionLogConstants.actionHeader = "Actions";
        ActionLogConstants.imageHeader = "Image";
        ActionLogConstants.screenshotHeader = "Full screen image";
        ActionLogConstants.maxRunnerActionLogs = 100;
        ActionLogConstants.defaultActionLogCount = 15;
        ActionLogConstants.defaultActionLogBufferLength = 20;
        return ActionLogConstants;
    })();
    exports.ActionLogConstants = ActionLogConstants;
    var KeyCodeConstants = (function () {
        function KeyCodeConstants() {
        }
        KeyCodeConstants.enterKeyCode = 13;
        KeyCodeConstants.escKeyCode = 27;
        KeyCodeConstants.sKeyCode = 83;
        KeyCodeConstants.rightArrow = 39;
        KeyCodeConstants.leftArrow = 37;
        KeyCodeConstants.downArrow = 40;
        KeyCodeConstants.upArrow = 38;
        KeyCodeConstants.spaceBar = 32;
        return KeyCodeConstants;
    })();
    exports.KeyCodeConstants = KeyCodeConstants;
    var VideoCaptureConstants = (function () {
        function VideoCaptureConstants() {
        }
        VideoCaptureConstants.minFrameRate = 1;
        VideoCaptureConstants.maxFrameRate = 60;
        VideoCaptureConstants.defaultFrameRate = 30;
        VideoCaptureConstants.defaultWindowHeight = 1280;
        VideoCaptureConstants.vgaWindowHeight = 640;
        VideoCaptureConstants.defaultWindowWidth = 720;
        VideoCaptureConstants.vgaWindowWidth = 360;
        VideoCaptureConstants.captureIntervalInSeconds = 1;
        VideoCaptureConstants.maxVideoLengthInMinutes = 10;
        VideoCaptureConstants.optimalFrameRate = 5;
        VideoCaptureConstants.maxVideoSizeInBytes = 52428800; //(50 mb)
        return VideoCaptureConstants;
    })();
    exports.VideoCaptureConstants = VideoCaptureConstants;
    var WorkItemConstants = (function () {
        function WorkItemConstants() {
        }
        WorkItemConstants.defaultWorkItemCategoryColorMap = {
            "Microsoft.BugCategory": "FFCC293D",
            "Microsoft.TaskCategory": "FFF2CB1D",
            "Microsoft.EpicCategory": "FFFF7B00",
            "Microsoft.FeatureCategory": "FF773B93",
            "Microsoft.RequirementCategory": "FF009CCC",
            "Microsoft.TestCaseCategory": "FFFF9D00",
            "Microsoft.SharedStepCategory": "FFFF9D00",
            "Microsoft.SharedParameterCategory": "FFFF9D00",
            "Microsoft.CodeReviewResponseCategory": "FFFF9D00",
            "Microsoft.FeedbackRequestCategory": "FFFF9D00",
            "Microsoft.FeedbackResponseCategory": "FFFF9D00",
            "Microsoft.TestPlanCategory": "FFFF9D00",
            "Microsoft.TestSuiteCategory": "FFFF9D00",
        };
        WorkItemConstants.defaultWorkItemColor = "FFCC293D";
        return WorkItemConstants;
    })();
    exports.WorkItemConstants = WorkItemConstants;
    var TelemetryConstants = (function () {
        function TelemetryConstants() {
        }
        TelemetryConstants.XTSource = "XT";
        TelemetryConstants.WebRunnerSource = "WebRunner";
        return TelemetryConstants;
    })();
    exports.TelemetryConstants = TelemetryConstants;
    var PerfDataConstants = (function () {
        function PerfDataConstants() {
        }
        PerfDataConstants.maxRecords = 7;
        return PerfDataConstants;
    })();
    exports.PerfDataConstants = PerfDataConstants;
    var CommonExtensionContants = (function () {
        function CommonExtensionContants() {
        }
        CommonExtensionContants.exploratoryTestingExtensionGalleryId = "ms.vss-exploratorytesting-web";
        CommonExtensionContants.testManagerExtensionGalleryId = "ms.vss-testmanager-web";
        return CommonExtensionContants;
    })();
    exports.CommonExtensionContants = CommonExtensionContants;
    var ConnectionOptionConstants = (function () {
        function ConnectionOptionConstants() {
        }
        ConnectionOptionConstants.stakeholderMode = "stakeholder";
        ConnectionOptionConstants.teamMode = "tfs";
        ConnectionOptionConstants.offlineMode = "offline";
        ConnectionOptionConstants.connectedMode = "connected";
        return ConnectionOptionConstants;
    })();
    exports.ConnectionOptionConstants = ConnectionOptionConstants;
    var FeedbackStateOptionConstants = (function () {
        function FeedbackStateOptionConstants() {
        }
        FeedbackStateOptionConstants.pendingState = "Pending";
        FeedbackStateOptionConstants.completedState = "Completed";
        FeedbackStateOptionConstants.declinedState = "Declined";
        return FeedbackStateOptionConstants;
    })();
    exports.FeedbackStateOptionConstants = FeedbackStateOptionConstants;
    var StakeHolderTraceabiltyPageUrls = (function () {
        function StakeHolderTraceabiltyPageUrls() {
        }
        StakeHolderTraceabiltyPageUrls.feedbackDetailsPageUrl = "#/FeedbackRequestDetail";
        StakeHolderTraceabiltyPageUrls.feedbackListsPageUrl = "#/FeedbackRequests";
        return StakeHolderTraceabiltyPageUrls;
    })();
    exports.StakeHolderTraceabiltyPageUrls = StakeHolderTraceabiltyPageUrls;
    var ExceptionConstants = (function () {
        function ExceptionConstants() {
        }
        ExceptionConstants.unAuthorized = "UnauthorizedAccessException";
        return ExceptionConstants;
    })();
    exports.ExceptionConstants = ExceptionConstants;
    var BrowserConstants = (function () {
        function BrowserConstants() {
        }
        BrowserConstants.chromeBrowserName = "Google Chrome";
        BrowserConstants.firefoxBrowserName = "Mozilla Firefox";
        BrowserConstants.edgeBrowserName = "Microsoft Edge";
        return BrowserConstants;
    })();
    exports.BrowserConstants = BrowserConstants;
    var ElementIds = (function () {
        function ElementIds() {
        }
        ElementIds.xtMinimizeId = "minimize-page";
        return ElementIds;
    })();
    exports.ElementIds = ElementIds;
    var Messages = (function () {
        function Messages() {
        }
        Messages.login = "To capture screen or action logs, make sure Test & Feedback extension is connected to {0}.";
        return Messages;
    })();
    exports.Messages = Messages;
});
//# sourceMappingURL=Constants.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Model/BrowserHelper',["require", "exports", "../Common/Constants"], function (require, exports, Constants) {
    var BrowserHelper = (function () {
        function BrowserHelper() {
        }
        BrowserHelper.isChrome = function () {
            return chrome.extension.getURL("").split(this.hostSeparator)[0] === this.chromeExtensionHost;
        };
        BrowserHelper.isFirefox = function () {
            return chrome.extension.getURL("").split(this.hostSeparator)[0] === this.firefoxExtensionHost;
        };
        BrowserHelper.isEdge = function () {
            return chrome.extension.getURL("").split(this.hostSeparator)[0] === this.edgeExtensionHost;
        };
        BrowserHelper.getBrowserInfo = function () {
            if (BrowserHelper.isFirefox()) {
                return Constants.BrowserConstants.firefoxBrowserName;
            }
            else if (BrowserHelper.isEdge()) {
                return Constants.BrowserConstants.edgeBrowserName;
            }
            return Constants.BrowserConstants.chromeBrowserName;
        };
        BrowserHelper.getOptionsPage = function () {
            return chrome.extension.getURL("options/options.html");
        };
        // This is required as index database sometimes fails if database name has more than 4 characters.
        BrowserHelper.getSessionStorageDirectoryName = function () {
            if (this.isChrome()) {
                return "Session";
            }
            return "Main";
        };
        BrowserHelper.chromeExtensionHost = "chrome-extension:";
        BrowserHelper.firefoxExtensionHost = "moz-extension:";
        BrowserHelper.edgeExtensionHost = "ms-browser-extension:";
        BrowserHelper.hostSeparator = "//";
        return BrowserHelper;
    })();
    exports.BrowserHelper = BrowserHelper;
});
//# sourceMappingURL=BrowserHelper.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('../Messaging/ChromeMessaging',["require", "exports", "../Messaging/Messaging", "../Model/BrowserHelper"], function (require, exports, Messaging, BrowserHelper) {
    var NotificationType = Messaging.NotificationType;
    var ChromeTabMessagingService = (function () {
        function ChromeTabMessagingService() {
        }
        ChromeTabMessagingService.prototype.sendMessage = function (tabId, notificationType, message, responseCallback) {
            var notification = { notificationType: notificationType, data: message };
            chrome.tabs.sendMessage(tabId, notification, responseCallback);
        };
        ChromeTabMessagingService.prototype.queryTabs = function (options, filterTabId, sendReponse) {
            chrome.tabs.query(options, function (tabs) {
                var response = [];
                tabs.forEach(function (tab) {
                    if (tab.id !== filterTabId) {
                        response.push({ windowId: tab.windowId, url: tab.url, title: tab.title });
                    }
                });
                sendReponse(response);
            });
        };
        return ChromeTabMessagingService;
    })();
    var BaseBroadcastingService = (function () {
        function BaseBroadcastingService() {
        }
        BaseBroadcastingService.prototype.broadcast = function (notificationType, data, callback) {
            var notification = { notificationType: notificationType, data: data };
            this.sendMessage(notification, callback);
        };
        BaseBroadcastingService.prototype.broadcastAsync = function (notificationType, data) {
            if (isSandbox()) {
                throw "async messaging not supported in sandbox";
            }
            var deferred = Q.defer();
            this.broadcast(notificationType, data, function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };
        BaseBroadcastingService.prototype.sendMessage = function (message, callback) {
            // requires override;
        };
        return BaseBroadcastingService;
    })();
    var ChromeBroadcastingService = (function (_super) {
        __extends(ChromeBroadcastingService, _super);
        function ChromeBroadcastingService() {
            _super.apply(this, arguments);
        }
        ChromeBroadcastingService.prototype.sendMessage = function (message, callback) {
            //TODO: Remove isEdge check once the edge team fixes bug for null callbacks
            if (!callback && BrowserHelper.BrowserHelper.isEdge()) {
                callback = function (sendResponse) {
                };
            }
            chrome.runtime.sendMessage(message, callback);
        };
        return ChromeBroadcastingService;
    })(BaseBroadcastingService);
    var SandboxBroadcastingService = (function (_super) {
        __extends(SandboxBroadcastingService, _super);
        function SandboxBroadcastingService() {
            _super.apply(this, arguments);
        }
        SandboxBroadcastingService.prototype.sendMessage = function (message, callback) {
            window.parent.postMessage(message, "*");
        };
        return SandboxBroadcastingService;
    })(BaseBroadcastingService);
    var BaseSubscriptionService = (function () {
        function BaseSubscriptionService() {
            this.subscriptions = {};
        }
        BaseSubscriptionService.prototype.subscribe = function (callback, notificationType) {
            var callbacks = this.subscriptions[notificationType];
            if (!callbacks) {
                callbacks = [];
                callbacks.push(callback);
                this.subscriptions[notificationType] = callbacks;
            }
            else {
                this.subscriptions[notificationType].push(callback);
            }
        };
        BaseSubscriptionService.prototype.clearAll = function () {
            this.subscriptions = {};
        };
        BaseSubscriptionService.prototype.clearAllForNotificationType = function (notificationType) {
            if (this.subscriptions && this.subscriptions[notificationType]) {
                this.subscriptions[notificationType] = [];
            }
        };
        BaseSubscriptionService.prototype.notifySubscribers = function (notificationType, data, sendResponse, sender) {
            var callbacks = this.subscriptions[notificationType];
            if (callbacks) {
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](data, sendResponse, sender);
                }
            }
        };
        return BaseSubscriptionService;
    })();
    var ChromeSubscriptionService = (function (_super) {
        __extends(ChromeSubscriptionService, _super);
        function ChromeSubscriptionService() {
            var _this = this;
            _super.call(this);
            this.listenToMessages(function (notificationType, data, sendResponse, sender) {
                _this.notifySubscribers(notificationType, data, sendResponse, sender);
            });
        }
        ChromeSubscriptionService.prototype.listenToMessages = function (callback) {
            chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                if (message) {
                    callback(message.notificationType, message.data, sendResponse, sender);
                    if (sendResponse) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            });
        };
        return ChromeSubscriptionService;
    })(BaseSubscriptionService);
    var SandboxSubscriptionService = (function (_super) {
        __extends(SandboxSubscriptionService, _super);
        function SandboxSubscriptionService() {
            var _this = this;
            _super.call(this);
            this.listenToMessages(function (notificationType, data) {
                _this.notifySubscribers(notificationType, data, null, null);
            });
        }
        SandboxSubscriptionService.prototype.listenToMessages = function (callback) {
            window.addEventListener("message", function (event) {
                if (event.data) {
                    callback(event.data.notificationType, event.data.data);
                }
            });
        };
        return SandboxSubscriptionService;
    })(BaseSubscriptionService);
    function isSandbox() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    var MessagingFactory = (function () {
        function MessagingFactory() {
        }
        MessagingFactory.getSubscriptionService = function () {
            if (isSandbox()) {
                return MessagingFactory.getSandboxSubscriptionService();
            }
            return this.getChromeSubscriptionService();
        };
        MessagingFactory.getBroadcastingService = function () {
            if (isSandbox()) {
                return MessagingFactory.getSandboxBroadcastingService();
            }
            return this.getChromeBroadcastingService();
        };
        MessagingFactory.getChromeMessagingTabService = function () {
            if (MessagingFactory.chromeTabMessagingService) {
                return MessagingFactory.chromeTabMessagingService;
            }
            else {
                MessagingFactory.chromeTabMessagingService = new ChromeTabMessagingService();
                return MessagingFactory.chromeTabMessagingService;
            }
        };
        MessagingFactory.getSandboxSubscriptionService = function () {
            if (MessagingFactory.sandboxSubscriptionService) {
                return MessagingFactory.sandboxSubscriptionService;
            }
            else {
                MessagingFactory.sandboxSubscriptionService = new SandboxSubscriptionService();
                return MessagingFactory.sandboxSubscriptionService;
            }
        };
        MessagingFactory.getChromeSubscriptionService = function () {
            if (MessagingFactory.chromeSubscriptionService) {
                return MessagingFactory.chromeSubscriptionService;
            }
            else {
                MessagingFactory.chromeSubscriptionService = new ChromeSubscriptionService();
                return MessagingFactory.chromeSubscriptionService;
            }
        };
        MessagingFactory.getSandboxBroadcastingService = function () {
            if (MessagingFactory.sandboxBroadcastingService) {
                return MessagingFactory.sandboxBroadcastingService;
            }
            else {
                MessagingFactory.sandboxBroadcastingService = new SandboxBroadcastingService();
                return MessagingFactory.sandboxBroadcastingService;
            }
        };
        MessagingFactory.getChromeBroadcastingService = function () {
            if (MessagingFactory.chromeBroadcastingService) {
                return MessagingFactory.chromeBroadcastingService;
            }
            else {
                MessagingFactory.chromeBroadcastingService = new ChromeBroadcastingService();
                return MessagingFactory.chromeBroadcastingService;
            }
        };
        return MessagingFactory;
    })();
    exports.MessagingFactory = MessagingFactory;
    var SandboxMessagingRelay = (function () {
        function SandboxMessagingRelay(iframe) {
            this._iframe = iframe;
            this._sandbox = iframe.contentWindow;
            this.listenToChromeMessages();
            this.listenToSandboxMessages();
        }
        SandboxMessagingRelay.prototype.listenToSandboxMessages = function () {
            var _this = this;
            window.addEventListener("message", function (event) {
                // required since popup iframes don't resize on their own
                if (event.data && event.data.resize && event.data.height) {
                    _this._iframe.style.height = event.data.height;
                }
                else {
                    _this.sendMessageToChrome(event.data);
                }
            });
        };
        SandboxMessagingRelay.prototype.sendMessageToChrome = function (message) {
            if (message.notificationType === NotificationType.AnnotationToolReady) {
                chrome.windows.getCurrent(function (window) {
                    message.data.windowId = window.id;
                    chrome.runtime.sendMessage(message);
                });
            }
            else {
                chrome.runtime.sendMessage(message);
            }
        };
        SandboxMessagingRelay.prototype.listenToChromeMessages = function () {
            var _this = this;
            chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                if (message && message.notificationType != undefined) {
                    _this.sendMessageToSandbox(message);
                }
            });
        };
        SandboxMessagingRelay.prototype.sendMessageToSandbox = function (message) {
            this._sandbox.postMessage(message, "*");
        };
        return SandboxMessagingRelay;
    })();
    exports.SandboxMessagingRelay = SandboxMessagingRelay;
});
//# sourceMappingURL=ChromeMessaging.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('../Common/ExtensionStorage',["require", "exports", "../Messaging/ChromeMessaging", "../Messaging/Messaging", "../Model/BrowserHelper"], function (require, exports, ChromeMessaging, Messaging, BrowserHelp) {
    var BrowserHelper = BrowserHelp.BrowserHelper;
    var moduleName = "ExtensionStorage";
    var LocalStorageService = (function () {
        function LocalStorageService() {
        }
        // LocalStorageService to be initialized only in Background, to respond to retrieveAsync calls from sandbox.
        // To support ngStorage module to help bind UI to local usage add "ngStorage-" as prefix to all keys. 
        LocalStorageService.initializeService = function () {
            var _this = this;
            ChromeMessaging.MessagingFactory.getSubscriptionService().subscribe(function (key) {
                ChromeMessaging.MessagingFactory.getBroadcastingService().
                    broadcast(Messaging.NotificationType.FetchObjectFromLocalStorageResponse, _this.retrieve(key));
            }, Messaging.NotificationType.FetchObjectFromLocalStorage);
        };
        LocalStorageService.store = function (key, data) {
            localStorage.setItem(exports.ngStoragePrefix + key, JSON.stringify(data));
        };
        LocalStorageService.retrieve = function (key) {
            return JSON.parse(localStorage.getItem(exports.ngStoragePrefix + key));
        };
        LocalStorageService.retrieveAsync = function (key, callback) {
            if (isSandbox()) {
                ChromeMessaging.MessagingFactory.getBroadcastingService().broadcast(Messaging.NotificationType.FetchObjectFromLocalStorage, key);
                ChromeMessaging.MessagingFactory.getSubscriptionService().subscribe(function (returnValue) {
                    callback(JSON.parse(returnValue));
                }, Messaging.NotificationType.FetchObjectFromLocalStorageResponse);
            }
            else {
                var value = localStorage.getItem(exports.ngStoragePrefix + key);
                callback(JSON.parse(value));
            }
        };
        LocalStorageService.remove = function (key) {
            localStorage.removeItem(exports.ngStoragePrefix + key);
            // This was required in edge since it was not able to sync the data to popup local storage if key is removed. Hence added a work around in edge
            if (BrowserHelper.isEdge()) {
                LocalStorageService.store(key, null);
            }
        };
        return LocalStorageService;
    })();
    exports.LocalStorageService = LocalStorageService;
    var PersistentStorageFactory = (function () {
        function PersistentStorageFactory() {
        }
        PersistentStorageFactory.getStorageService = function () {
            if (this.storageService) {
                // return if already set. this is done to avoid calling browser checks every time this method is called.
                return this.storageService;
            }
            if (BrowserHelper.isChrome()) {
                // chrome
                this.storageService = new PersistentStorageService();
            }
            else {
                // firefox or edge
                this.storageService = new IndexDatabaseStorageService();
            }
            return this.storageService;
        };
        return PersistentStorageFactory;
    })();
    exports.PersistentStorageFactory = PersistentStorageFactory;
    var BaseStorageService = (function () {
        function BaseStorageService() {
        }
        BaseStorageService.prototype.getBlobContentAsync = function (fileName, isUnderXTSession) {
            if (isUnderXTSession === void 0) { isUnderXTSession = true; }
            var q = Q.defer();
            this.getBlob(fileName, function (file) {
                if (file) {
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        q.resolve(reader.result);
                    };
                    reader.readAsText(file);
                }
                else {
                    q.resolve(null);
                }
            }, q.reject, isUnderXTSession);
            return q.promise;
        };
        return BaseStorageService;
    })();
    exports.BaseStorageService = BaseStorageService;
    var IndexDatabaseStorageService = (function (_super) {
        __extends(IndexDatabaseStorageService, _super);
        function IndexDatabaseStorageService() {
            _super.apply(this, arguments);
        }
        IndexDatabaseStorageService.prototype.writeBlobInDir = function (dir, fileName, blob, onSuccess, onFailure, appendContent) {
            var _this = this;
            if (appendContent === void 0) { appendContent = false; }
            if (appendContent) {
                this.openIndexDb(dir, function (db) {
                    _this.getFile(db, fileName, false, function (file) {
                        var newBlob = new Blob([file, blob], { type: blob.type });
                        _this.storeFile(db, fileName, newBlob, onSuccess, onFailure);
                    }, onFailure);
                }, onFailure);
            }
            else {
                this.openIndexDb(dir, function (db) {
                    _this.storeFile(db, fileName, blob, onSuccess, onFailure);
                }, onFailure);
            }
        };
        IndexDatabaseStorageService.prototype.writeBlob = function (fileName, blob, onSuccess, onFailure, appendContent, storeUnderXTSession) {
            var _this = this;
            if (appendContent === void 0) { appendContent = false; }
            if (storeUnderXTSession === void 0) { storeUnderXTSession = true; }
            var fileInfo = this.getFileInfo(fileName, storeUnderXTSession);
            if (appendContent) {
                this.openIndexDb(fileInfo.dbName, function (db) {
                    _this.getFile(db, fileInfo.fileName, false, function (file) {
                        var newBlob = new Blob([file, blob], { type: blob.type });
                        _this.storeFile(db, fileInfo.fileName, newBlob, onSuccess, onFailure);
                    }, onFailure);
                }, onFailure);
            }
            else {
                this.openIndexDb(fileInfo.dbName, function (db) {
                    _this.storeFile(db, fileInfo.fileName, blob, onSuccess, onFailure);
                }, onFailure);
            }
        };
        IndexDatabaseStorageService.prototype.storeFile = function (db, fileName, blob, onSuccess, onFailure) {
            db.blobs.put({ name: fileName, data: blob }).then(function () {
                db.close();
                onSuccess(URL.createObjectURL(blob));
            }).catch(function (e) {
                db.close();
                onFailure(e);
            });
        };
        IndexDatabaseStorageService.prototype.getBlob = function (fileName, onSuccess, onFailure, storeUnderXTSession) {
            var _this = this;
            if (storeUnderXTSession === void 0) { storeUnderXTSession = true; }
            var fileInfo = this.getFileInfo(fileName, storeUnderXTSession);
            this.openIndexDb(fileInfo.dbName, function (db) {
                _this.getFile(db, fileInfo.fileName, true, onSuccess, onFailure);
            }, onFailure);
        };
        IndexDatabaseStorageService.prototype.getFile = function (db, fileName, closeConnection, onSuccess, onFailure) {
            db.blobs.get(fileName).then(function (blob) {
                if (closeConnection) {
                    db.close();
                }
                if (blob) {
                    onSuccess(blob.data);
                }
                else {
                    onSuccess(null);
                }
            }).catch(function (e) {
                if (closeConnection) {
                    db.close();
                }
                onFailure(e);
            });
        };
        IndexDatabaseStorageService.prototype.removeBlobInDir = function (dirName, fileName, onSuccess, onFailure) {
            this.openIndexDb(dirName, function (db) {
                db.blobs.clear(fileName).then(function () {
                    db.close();
                    onSuccess();
                }).catch(function (e) {
                    db.close();
                    onFailure(e);
                });
            }, onFailure);
        };
        IndexDatabaseStorageService.prototype.removeBlob = function (fileName, onSuccess, onFailure, storeUnderXTSession) {
            if (storeUnderXTSession === void 0) { storeUnderXTSession = true; }
            var fileInfo = this.getFileInfo(fileName, storeUnderXTSession);
            this.removeBlobInDir(fileInfo.dbName, fileInfo.fileName, onSuccess, onFailure);
        };
        IndexDatabaseStorageService.prototype.createDirectory = function (dirName, size, onSuccess, onFailure) {
            var db = new Dexie(dirName);
            db.version(1).stores({
                blobs: 'name,data'
            });
            onSuccess(dirName);
        };
        IndexDatabaseStorageService.prototype.removeDirectory = function (dirName, size, onSuccess, onFailure) {
            this.openIndexDb(dirName, function (db) {
                db.blobs.clear().then(function () {
                    db.close();
                    onSuccess(dirName);
                }).catch(function (e) {
                    db.close();
                    onFailure(e);
                });
            }, onFailure);
        };
        IndexDatabaseStorageService.prototype.openIndexDb = function (dir, onSuccess, onFailure) {
            var db = new Dexie(dir);
            db.version(1).stores({
                blobs: 'name,data'
            });
            db.open().catch(function (e) {
                onFailure(e);
            });
            onSuccess(db);
        };
        IndexDatabaseStorageService.prototype.getFileInfo = function (fileName, storeUnderXTSession) {
            var pathSplitter = fileName.split("/");
            if (pathSplitter.length === 1) {
                // Keeping name less than 5 characters as there is issue in firefox indexed db for words greater than 5
                var trimmedName = fileName.substr(0, 4);
                var dbName = storeUnderXTSession ? BrowserHelper.getSessionStorageDirectoryName() : trimmedName;
            }
            else {
                dbName = pathSplitter[0];
                fileName = pathSplitter[1];
            }
            return { dbName: dbName, fileName: fileName };
        };
        return IndexDatabaseStorageService;
    })(BaseStorageService);
    exports.IndexDatabaseStorageService = IndexDatabaseStorageService;
    var PersistentStorageService = (function (_super) {
        __extends(PersistentStorageService, _super);
        function PersistentStorageService() {
            _super.apply(this, arguments);
        }
        PersistentStorageService.prototype.writeBlobInDir = function (dir, fileName, blob, onSuccess, onFailure, appendContent) {
            if (appendContent === void 0) { appendContent = false; }
            if (this.isUnitTest()) {
                return;
            }
            var fullFilePath = dir.concat("/").concat(fileName);
            PersistentStorageProxy.writeBlob(fullFilePath, blob, onSuccess, onFailure, appendContent);
        };
        // storeUnderXTSession boolean is used to store data in data collector mode
        PersistentStorageService.prototype.writeBlob = function (fileName, blob, onSuccess, onFailure, appendContent, storeUnderXTSession) {
            if (appendContent === void 0) { appendContent = false; }
            if (storeUnderXTSession === void 0) { storeUnderXTSession = true; }
            if (this.isUnitTest()) {
                return;
            }
            PersistentStorageProxy.writeBlob(this.getFilePath(fileName, storeUnderXTSession), blob, onSuccess, onFailure, appendContent);
        };
        PersistentStorageService.prototype.getBlob = function (fileName, onSuccess, onFailure, storeUnderXTSession) {
            if (storeUnderXTSession === void 0) { storeUnderXTSession = true; }
            if (this.isUnitTest()) {
                return;
            }
            PersistentStorageProxy.getBlob(this.getFilePath(fileName, storeUnderXTSession), onSuccess, onFailure);
        };
        PersistentStorageService.prototype.removeBlobInDir = function (dir, fileName, onSuccess, onFailure) {
            if (this.isUnitTest()) {
                return;
            }
            var fullFilePath = dir.concat("/").concat(fileName);
            PersistentStorageProxy.removeBlob(fullFilePath, onSuccess, onFailure);
        };
        // storeUnderXTSession boolean is used to store data in data collector mode
        PersistentStorageService.prototype.removeBlob = function (fileName, onSuccess, onFailure, storeUnderXTSession) {
            if (storeUnderXTSession === void 0) { storeUnderXTSession = true; }
            if (this.isUnitTest()) {
                return;
            }
            PersistentStorageProxy.removeBlob(this.getFilePath(fileName, storeUnderXTSession), onSuccess, onFailure);
        };
        PersistentStorageService.prototype.createDirectory = function (dirName, size, onSuccess, onFailure) {
            if (this.isUnitTest()) {
                return;
            }
            PersistentStorageProxy.createDirectory(dirName, size, onSuccess, onFailure);
        };
        PersistentStorageService.prototype.removeDirectory = function (dirName, size, onSuccess, onFailure) {
            if (this.isUnitTest()) {
                return;
            }
            PersistentStorageProxy.removeDirectory(dirName, size, onSuccess, onFailure);
        };
        PersistentStorageService.prototype.getFilePath = function (fileName, storeUnderXTSession) {
            if (storeUnderXTSession === void 0) { storeUnderXTSession = true; }
            if (!storeUnderXTSession) {
                return fileName;
            }
            var curSession = LocalStorageService.retrieve(exports.activeSessionKey);
            if (curSession && curSession.version === 1) {
                // session v1 prefix session id as directory name.
                return curSession.id.concat("/").concat(fileName);
            }
            // session v2, prefix static directory name.
            return BrowserHelper.getSessionStorageDirectoryName().concat("/").concat(fileName);
        };
        // check for unit tests since persistent storage not supported in console mode
        PersistentStorageService.prototype.isUnitTest = function () {
            return localStorage.getItem("isUnitTest") === "true";
        };
        return PersistentStorageService;
    })(BaseStorageService);
    exports.PersistentStorageService = PersistentStorageService;
    function isSandbox() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    exports.activeSessionKey = "activeSession";
    exports.actionLogUrlKey = "actionLogUrl";
    exports.actionLogUrl_DataCollectorKey = "actionLogUrl_DataCollector";
    exports.activeScreenShotAndWindowIdMap = "activeScreenShotAndWindowIdMap";
    exports.activeScreenShotAndWindowIdMap_Datacollector = "activeScreenShotAndWindowIdMap_DataCollector";
    exports.toolbarErrorMap = "toolbarErrorMap";
    exports.activeSettingsKey = "activeSettings";
    exports.activeAnnotationSettingsKey = "activeAnnotationSettings";
    exports.notesCountKey = "numberOfNotesInSession";
    exports.videosCountKey = "numberOfVideosInSession";
    exports.enableAudio = "enableAudio";
    exports.currentVideoCaptureIdKey = "currentVideoCaptureId";
    exports.currentVideoCaptureId_DataCollectorKey = "currentVideoCaptureId_DataCollector";
    exports.activeVideoCaptureRequestPresent = "videoCaptureRequestPresent";
    exports.activeVideoCaptureRequestPresent_DataCollector = "videoCaptureRequestPresent_DataCollector";
    exports.videoFileFormatKey = "videoFileFormat";
    exports.videoFileFormat_DataCollectorKey = "videoFileFormat_DataCollector";
    exports.currentVideoCaptureTimeKey = "elapsedVideoTime";
    exports.currentVideoCaptureTime_DataCollectorKey = "elapsedVideoTime_DataCollector";
    exports.browserCloseEventsWhileVideoRecordingKey = "browserCloseEventsWhileVideoRecording";
    exports.browserCloseEventsWhileVideoRecording_DataCollectorKey = "browserCloseEventsWhileVideoRecording_DataCollector";
    exports.browserCloseEventsWhileVideoUploadingKey = "browserCloseEventsWhileVideoUploading";
    exports.screenshotsCountKey = "numberOfScreenshotsInSession";
    exports.ngStoragePrefix = "ngStorage-";
    exports.connectionSettingsKey = "connectionSettings";
    exports.basicConnectionSettingsKey = "basicConnectionSettings";
    exports.connectionOptionKey = "connectionOption";
    exports.connectedModeKey = "connectedMode";
    exports.changeTeamDetailsKey = "changeTeamDetails";
    exports.loginInProgressKey = "loginInProgress";
    exports.mostRecentlyUsedUrlsKey = "mostRecentlyUsedUrls";
    exports.initialBaseUrlKey = "initialBaseUrl";
    exports.refreshingKey = "refreshing";
    exports.loggedInKey = "loggedIn";
    exports.reconnectKey = "reconnected";
    exports.deviceListLocalStorageKey = "perfectoMobileDeviceList";
    exports.mobileXtUrlKey = "perfectoCloudUrl";
    exports.mobileXtUsernameKey = "perfectoUserName";
    exports.iconBlinkKey = "iconBlink";
    exports.lastUrlKey = "lastUrl";
    exports.useSoapApiForUpgradeKey = "useSoapApiForUpgrade";
    exports.useSoapApiFprUpgradeKey = "useSoapApiFprUpgrade";
    exports.perfAttachmentCountKey = "perfAttachmentCount";
    exports.perfDataMaxRecords = "perfDataMaxRecords";
    exports.perfDataNextIndex = "perfDataNextIndex";
    // Cache the last visited page before getting into notifications 
    exports.lastUrlBeforeNotificationKey = "lastUrlBeforeNotification";
    // This key keeps notification active until user dismisses it.
    exports.isNotificationDismissedKey = "isNotificationDismissed";
    // linked workitem details used for traceability
    exports.linkedWorkItemKey = "linkedWorkItem";
    // all workitems details as per query
    exports.searchResultsForTraceabilityKey = "searchResultsForTraceability";
    // all workitems details as per query
    exports.searchResultsForFeedbackRequestsKey = "searchResultsForFeedbackRequests";
    // flag to check if traceability is enabled
    exports.traceabilityEnabledKey = "traceabilityEnabled";
    // pattern string for workitem search query
    exports.workItemQueryPatternForTraceabilityKey = "workItemQueryPatternForTraceability";
    // last pattern string which is searched
    exports.lastSearchedQueryPatternKey = "lastSearchedQueryPattern";
    // traceability search in progress
    exports.workItemSearchInProgressKey = "workItemSearchInProgress";
    // update timeline once traceability is enabled
    exports.notifyTimelineForTraceabilityKey = "notifyTimelineForTraceability";
    // similar bugs
    exports.similarBugsKey = "searchResultsForSimilarBugs";
    // selected bugs
    exports.selectedBugKey = "selectedBugForUpdate";
    exports.selectedBugDescriptionKey = "selectedBugDescriptionKey";
    exports.isBugSelectedForUpdateKey = "isBugSelectedForUpdate";
    // dirty task
    exports.taskFormDirtyKey = "taskFormDirty";
    exports.taskTitleDirtyKey = "taskTitleDirty";
    exports.unsavedTaskDescriptionKey = "unsavedTaskDescription";
    exports.unsavedTaskTitleKey = "unsavedTaskTitle";
    exports.includeImageActionLogsInTaskKey = "includeImageActionLogsInTask";
    //selected feedback
    exports.selectedFeedbackRequestApplicationLaunchKey = "selectedFeedbackRequestApplicationLaunch";
    exports.selectedFeedbackRequestKey = "selectedFeedback";
    exports.isProvideFeedbackInitiatedFromWeb = "isProvideFeedbackInitiatedFromWeb";
    // dirty bug
    exports.bugFormDirtyKey = "bugFormDirty";
    exports.bugTitleDirtyKey = "bugTitleDirty";
    exports.unsavedBugTitleKey = "unsavedBugTitle";
    exports.searchResultsForSimilarBugsKey = "searchResultsForSimilarBugs";
    exports.selectedBugForUpdateKey = "selectedBugForUpdate";
    exports.includeImageActionLogsInBugKey = "includeImageActionLogsInBug";
    //dirty test case
    exports.testCaseFormDirtyKey = "testCaseFormDirty";
    exports.unsavedTestCaseStepsKey = "unsavedTestCaseSteps";
    exports.unsavedTestCaseTitleKey = "unsavedTestCaseTitle";
    //dirty feedback response
    exports.feedbackResponseFormDirtyKey = "feedbackResponseFormDirty";
    exports.feedbackResponseTitleDirtyKey = "feedbackResponseTitleDirty";
    exports.unsavedFeedbackResponseDescriptionKey = "unsavedFeedbackResponseDescription";
    exports.unsavedFeedbackResponseTitleKey = "unsavedFeedbackResponseTitle";
    exports.includeImageActionLogsInFeedbackResponseKey = "includeImageActionLogsInFeedbackResponse";
    exports.includePerfDataInFeedbackResponseKey = "includePerfDataInFeedbackResponse";
    //toolbar grouping details
    exports.groupingDetails = "groupingDetails";
    // toolbar controller use this for traceability scenario
    exports.traceabilityRequestKey = "traceabilityRequest";
    // icon before error
    exports.iconBeforeErrorKey = "iconBeforeError";
    // current icon
    exports.currentIconKey = "currentIcon";
    // report directory
    exports.offlineReport = "offlineReport";
    // Report directory name
    exports.reportDirectoryName = "Reports";
    // image action log 
    exports.actionLogKey = "ActionLog";
    // new branding
    exports.newBranding = "NewBranding";
    // image action log limit
    exports.sessionActionLogMaxCountKey = "sessionActionLogMaxCount";
    // exported image path
    exports.exportedSessionReportPath = "Reports/SessionReport.html";
    // Extensions unique identifier.
    exports.extensionUniqueIdentifier = "ExtensionID";
    // telemetry key for image size
    exports.actionLogFullImageSizeInBytes = "actionLogFullImageSizeInKB";
    // boolean for tracking whether image action log feature log has been enabled during upgrade
    exports.isImageActionLogTurnedOnDuringUpgrade = "isImageActionLogTurnedOnDuringUpgrade";
    // boolean for tracking wheather create/update session REST APIS are supported or not
    exports.supportTfsSessionCompactKey = "supportTfsSessionCompact";
    // current version number
    exports.currentVersionKey = "currentVersion";
    // work item types
    exports.workItemTypeMetaDataCache = "workItemTypeMetaDataCache";
    exports.workItemCategoryMetaDataCache = "workItemCategoryMetaDataCache";
    exports.bugWorkItemTypeCache = "bugWorkItemTypeCache";
    // alerts
    exports.alertInformationKey = "alertInformation";
    exports.licenseUpdatedDateTimeKey = "licenseUpdatedDateTime";
    exports.licenseUpdateIntervalKey = "licenseUpdateIntervalInHrs";
    exports.selectedFeedbackRequestWorkitemObjectKey = "selectedFeedbackRequestWorkitemObject";
    exports.teamSettingsKey = "teamSettings";
    exports.forceStopSessionReason = "forceStopSessionReason";
});
//# sourceMappingURL=ExtensionStorage.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Model/Model',["require", "exports"], function (require, exports) {
    (function (ToolbarType) {
        ToolbarType[ToolbarType["Session"] = 0] = "Session";
        ToolbarType[ToolbarType["ScreenShot"] = 1] = "ScreenShot";
        ToolbarType[ToolbarType["Note"] = 2] = "Note";
        ToolbarType[ToolbarType["Bug"] = 3] = "Bug";
        ToolbarType[ToolbarType["Bug2"] = 4] = "Bug2";
        ToolbarType[ToolbarType["TimeLine"] = 5] = "TimeLine";
        ToolbarType[ToolbarType["Settings"] = 6] = "Settings";
        ToolbarType[ToolbarType["MobileXt"] = 7] = "MobileXt";
        ToolbarType[ToolbarType["Traceability"] = 8] = "Traceability";
        ToolbarType[ToolbarType["About"] = 9] = "About";
        ToolbarType[ToolbarType["Task"] = 10] = "Task";
        ToolbarType[ToolbarType["TestCase"] = 11] = "TestCase";
        ToolbarType[ToolbarType["Video"] = 12] = "Video";
        ToolbarType[ToolbarType["FeedbackResponse"] = 13] = "FeedbackResponse";
        ToolbarType[ToolbarType["FeedbackRequests"] = 14] = "FeedbackRequests";
        ToolbarType[ToolbarType["ScreenShotScreen"] = 15] = "ScreenShotScreen";
        ToolbarType[ToolbarType["ScreenShotApplication"] = 16] = "ScreenShotApplication";
    })(exports.ToolbarType || (exports.ToolbarType = {}));
    var ToolbarType = exports.ToolbarType;
    (function (ScreenshotType) {
        ScreenshotType[ScreenshotType["BrowserTab"] = 0] = "BrowserTab";
        ScreenshotType[ScreenshotType["Screen"] = 1] = "Screen";
        ScreenshotType[ScreenshotType["Application"] = 2] = "Application";
    })(exports.ScreenshotType || (exports.ScreenshotType = {}));
    var ScreenshotType = exports.ScreenshotType;
    (function (BugsBehavior) {
        BugsBehavior[BugsBehavior["Off"] = 0] = "Off";
        BugsBehavior[BugsBehavior["AsRequirements"] = 1] = "AsRequirements";
        BugsBehavior[BugsBehavior["AsTasks"] = 2] = "AsTasks";
    })(exports.BugsBehavior || (exports.BugsBehavior = {}));
    var BugsBehavior = exports.BugsBehavior;
    // Below enum is copy from "VSS/TestManagement/Contracts". Dont want direct vss reference in XT OM.
    (function (TestSessionSource) {
        /**
         * Source of test session uncertain as it is stale
         */
        TestSessionSource[TestSessionSource["Unknown"] = 0] = "Unknown";
        /**
         * The session was created from Microsoft Test Manager exploratory desktop tool.
         */
        TestSessionSource[TestSessionSource["XTDesktop"] = 1] = "XTDesktop";
        /**
         * The session was created from feedback client.
         */
        TestSessionSource[TestSessionSource["FeedbackDesktop"] = 2] = "FeedbackDesktop";
        /**
         * The session was created from browser extension.
         */
        TestSessionSource[TestSessionSource["XTWeb"] = 3] = "XTWeb";
        /**
         * The session was created from browser extension.
         */
        TestSessionSource[TestSessionSource["FeedbackWeb"] = 4] = "FeedbackWeb";
    })(exports.TestSessionSource || (exports.TestSessionSource = {}));
    var TestSessionSource = exports.TestSessionSource;
    // Copied from TestManagement/Contracts/TestSession/TestSessionConstants.cs. Used to fill propertyBag in server session.
    var TestSessionConstants = (function () {
        function TestSessionConstants() {
        }
        TestSessionConstants.testPlanIdString = "TestPlanId";
        TestSessionConstants.feedbackRequestIdString = "FeedbackRequestId";
        return TestSessionConstants;
    })();
    exports.TestSessionConstants = TestSessionConstants;
    var FeedbackTypeConstants = (function () {
        function FeedbackTypeConstants() {
        }
        FeedbackTypeConstants.solicited = "Solicited";
        FeedbackTypeConstants.unsolicited = "UnSolicited";
        FeedbackTypeConstants.none = "None";
        return FeedbackTypeConstants;
    })();
    exports.FeedbackTypeConstants = FeedbackTypeConstants;
    (function (SessionState) {
        SessionState[SessionState["None"] = 0] = "None";
        SessionState[SessionState["InProgress"] = 1] = "InProgress";
        SessionState[SessionState["Completed"] = 2] = "Completed";
        SessionState[SessionState["Paused"] = 3] = "Paused";
        SessionState[SessionState["Declined"] = 4] = "Declined";
    })(exports.SessionState || (exports.SessionState = {}));
    var SessionState = exports.SessionState;
    (function (FeedbackResponseRating) {
        FeedbackResponseRating[FeedbackResponseRating["0 - Not Rated"] = 0] = "0 - Not Rated";
        FeedbackResponseRating[FeedbackResponseRating["1 - Poor"] = 1] = "1 - Poor";
        FeedbackResponseRating[FeedbackResponseRating["2 - Fair"] = 2] = "2 - Fair";
        FeedbackResponseRating[FeedbackResponseRating["3 - Good"] = 3] = "3 - Good";
        FeedbackResponseRating[FeedbackResponseRating["4 - Very Good"] = 4] = "4 - Very Good";
        FeedbackResponseRating[FeedbackResponseRating["5 - Excellent"] = 5] = "5 - Excellent";
    })(exports.FeedbackResponseRating || (exports.FeedbackResponseRating = {}));
    var FeedbackResponseRating = exports.FeedbackResponseRating;
    (function (ServerSessionState) {
        ServerSessionState[ServerSessionState["NotStarted"] = 1] = "NotStarted";
        ServerSessionState[ServerSessionState["InProgress"] = 2] = "InProgress";
        ServerSessionState[ServerSessionState["Completed"] = 4] = "Completed";
    })(exports.ServerSessionState || (exports.ServerSessionState = {}));
    var ServerSessionState = exports.ServerSessionState;
    (function (AttachmentState) {
        AttachmentState[AttachmentState["Created"] = 0] = "Created";
        AttachmentState[AttachmentState["ContainerCreated"] = 1] = "ContainerCreated";
        AttachmentState[AttachmentState["Uploaded"] = 2] = "Uploaded";
        AttachmentState[AttachmentState["Failed"] = 3] = "Failed";
    })(exports.AttachmentState || (exports.AttachmentState = {}));
    var AttachmentState = exports.AttachmentState;
    (function (AttachmentType) {
        AttachmentType[AttachmentType["Screenshot"] = 0] = "Screenshot";
        AttachmentType[AttachmentType["SystemInformation"] = 1] = "SystemInformation";
        AttachmentType[AttachmentType["Note"] = 2] = "Note";
        AttachmentType[AttachmentType["Video"] = 3] = "Video";
        AttachmentType[AttachmentType["ActionLog"] = 4] = "ActionLog";
        AttachmentType[AttachmentType["PerfData"] = 5] = "PerfData";
    })(exports.AttachmentType || (exports.AttachmentType = {}));
    var AttachmentType = exports.AttachmentType;
    /**
     * Payload sent as part of capture screenshot from web test runner.
     */
    var CaptureWindowPayload = (function () {
        function CaptureWindowPayload() {
        }
        return CaptureWindowPayload;
    })();
    exports.CaptureWindowPayload = CaptureWindowPayload;
    (function (ActionLogType) {
        ActionLogType[ActionLogType["Mouse"] = 1] = "Mouse";
        ActionLogType[ActionLogType["Keyboard"] = 2] = "Keyboard";
    })(exports.ActionLogType || (exports.ActionLogType = {}));
    var ActionLogType = exports.ActionLogType;
    var IActionLogReportPayload = (function () {
        function IActionLogReportPayload() {
        }
        return IActionLogReportPayload;
    })();
    exports.IActionLogReportPayload = IActionLogReportPayload;
    /**
     * Error codes sent to web test runner. Error is sent in codes so that web test runner can show localized error messages corresponding to these error codes.
     */
    (function (ErrorCode) {
        ErrorCode[ErrorCode["TFS_CONNECTION_FAILED"] = 1] = "TFS_CONNECTION_FAILED";
        ErrorCode[ErrorCode["TFS_AUTH_FAILED"] = 2] = "TFS_AUTH_FAILED";
        ErrorCode[ErrorCode["WINDOW_NOT_FOUND"] = 3] = "WINDOW_NOT_FOUND";
        ErrorCode[ErrorCode["SCREEN_RECORDING_DISABLED"] = 4] = "SCREEN_RECORDING_DISABLED";
        ErrorCode[ErrorCode["DATACOLLECTION_ALREADY_INPROGRESS"] = 5] = "DATACOLLECTION_ALREADY_INPROGRESS";
        ErrorCode[ErrorCode["TAB_NOT_REACHABLE"] = 6] = "TAB_NOT_REACHABLE";
        ErrorCode[ErrorCode["ACTIONLOG_FEATURE_DISABLED"] = 7] = "ACTIONLOG_FEATURE_DISABLED";
        ErrorCode[ErrorCode["MICROPHONE_NOTFOUND"] = 8] = "MICROPHONE_NOTFOUND";
    })(exports.ErrorCode || (exports.ErrorCode = {}));
    var ErrorCode = exports.ErrorCode;
    ;
    var IConnectedUserDetails = (function () {
        function IConnectedUserDetails() {
        }
        return IConnectedUserDetails;
    })();
    exports.IConnectedUserDetails = IConnectedUserDetails;
    // Common events
    (function (TelemetryEvent) {
        TelemetryEvent[TelemetryEvent["AnnotationSettings"] = 0] = "AnnotationSettings";
        TelemetryEvent[TelemetryEvent["WorkItemFiling"] = 1] = "WorkItemFiling";
        TelemetryEvent[TelemetryEvent["VsoSessionSettings"] = 2] = "VsoSessionSettings";
        TelemetryEvent[TelemetryEvent["DeviceProvider"] = 3] = "DeviceProvider";
        TelemetryEvent[TelemetryEvent["Traceability"] = 4] = "Traceability";
        TelemetryEvent[TelemetryEvent["TestCaseForm"] = 5] = "TestCaseForm";
        TelemetryEvent[TelemetryEvent["VideoCapture"] = 6] = "VideoCapture";
        TelemetryEvent[TelemetryEvent["ActionLog"] = 7] = "ActionLog";
        TelemetryEvent[TelemetryEvent["QueryFeedbackRequestsData"] = 8] = "QueryFeedbackRequestsData";
        TelemetryEvent[TelemetryEvent["ProvideFeedback"] = 9] = "ProvideFeedback";
        TelemetryEvent[TelemetryEvent["FirefoxInstallEvent"] = 10] = "FirefoxInstallEvent";
    })(exports.TelemetryEvent || (exports.TelemetryEvent = {}));
    var TelemetryEvent = exports.TelemetryEvent;
    (function (AlertType) {
        AlertType[AlertType["ConnectedModeAvailable"] = 0] = "ConnectedModeAvailable";
        AlertType[AlertType["TrialModeOn"] = 1] = "TrialModeOn";
        AlertType[AlertType["TrialModeExpired"] = 2] = "TrialModeExpired";
    })(exports.AlertType || (exports.AlertType = {}));
    var AlertType = exports.AlertType;
    (function (ServerType) {
        ServerType[ServerType["Offline"] = 0] = "Offline";
        ServerType[ServerType["VSTS"] = 1] = "VSTS";
        ServerType[ServerType["TFS"] = 2] = "TFS";
    })(exports.ServerType || (exports.ServerType = {}));
    var ServerType = exports.ServerType;
    ;
    var WorkItemType = (function () {
        function WorkItemType() {
        }
        WorkItemType.epic = 'Epic';
        WorkItemType.productBacklogItem = 'Product Backlog Item';
        WorkItemType.testCase = 'Test Case';
        WorkItemType.userStory = 'User Story';
        WorkItemType.feature = 'Feature';
        WorkItemType.scenario = 'Scenario';
        WorkItemType.requirement = 'Requirement';
        WorkItemType.bug = 'Bug';
        WorkItemType.task = 'Task';
        WorkItemType.feedbackResponse = 'Feedback Response';
        return WorkItemType;
    })();
    exports.WorkItemType = WorkItemType;
    var WorkItemCategories = (function () {
        function WorkItemCategories() {
        }
        WorkItemCategories.BugCategory = "Microsoft.BugCategory";
        WorkItemCategories.TaskCategory = "Microsoft.TaskCategory";
        WorkItemCategories.TestCaseCategory = "Microsoft.TestCaseCategory";
        WorkItemCategories.ScenarioCategory = 'Microsoft.ScenarioCategory';
        WorkItemCategories.EpicCategory = 'Microsoft.EpicCategory';
        WorkItemCategories.RequirementCategory = 'Microsoft.RequirementCategory';
        WorkItemCategories.FeatureCategory = 'Microsoft.FeatureCategory';
        WorkItemCategories.FeedbackResponseCategory = "Microsoft.FeedbackResponseCategory";
        WorkItemCategories.FeedbackRequestCategory = 'Microsoft.FeedbackRequestCategory';
        WorkItemCategories.HiddenCategory = 'Microsoft.HiddenCategory';
        return WorkItemCategories;
    })();
    exports.WorkItemCategories = WorkItemCategories;
    var WorkItemField = (function () {
        function WorkItemField() {
        }
        WorkItemField.workItemType = "System.WorkItemType";
        WorkItemField.id = "System.Id";
        WorkItemField.title = "System.Title";
        WorkItemField.iterationPath = "System.IterationPath";
        WorkItemField.assignedTo = "System.AssignedTo";
        WorkItemField.workItemState = "System.State";
        WorkItemField.acceptanceCriteria = "Microsoft.VSTS.Common.AcceptanceCriteria";
        WorkItemField.description = "System.Description";
        WorkItemField.areaPath = "System.AreaPath";
        WorkItemField.reproSteps = "Microsoft.VSTS.TCM.ReproSteps";
        WorkItemField.systemInfo = "Microsoft.VSTS.TCM.SystemInfo";
        WorkItemField.applicationStartInfo = "Microsoft.VSTS.Feedback.ApplicationStartInformation";
        WorkItemField.applicationLaunchInstruction = "Microsoft.VSTS.Feedback.ApplicationLaunchInstructions";
        WorkItemField.createdBy = "System.CreatedBy";
        WorkItemField.createdDate = "System.CreatedDate";
        WorkItemField.url = "url";
        WorkItemField.startTime = "startTime";
        WorkItemField.relations = "Relations";
        return WorkItemField;
    })();
    exports.WorkItemField = WorkItemField;
    var WorkItemRelations = (function () {
        function WorkItemRelations() {
        }
        WorkItemRelations.relatedLink = "System.LinkTypes.Related";
        WorkItemRelations.relatedLinkForward = "System.LinkTypes.Related-Forward";
        WorkItemRelations.parentLink = "System.LinkTypes.Hierarchy-Reverse";
        WorkItemRelations.testedByForward = "Microsoft.VSTS.Common.TestedBy-Forward";
        WorkItemRelations.testedByReverse = "Microsoft.VSTS.Common.TestedBy-Reverse";
        return WorkItemRelations;
    })();
    exports.WorkItemRelations = WorkItemRelations;
    var SessionKeys = (function () {
        function SessionKeys() {
        }
        SessionKeys.filedWorkItemKey = "AssociatedWorkItem";
        SessionKeys.exploredWorkItemKey = "ExploredWorkItem";
        return SessionKeys;
    })();
    exports.SessionKeys = SessionKeys;
    var PerfData = (function () {
        function PerfData(eventType, timing, requestURL, eventData) {
            this.eventType = eventType;
            this.timing = timing;
            this.requestURL = requestURL;
            this.eventData = eventData;
        }
        return PerfData;
    })();
    exports.PerfData = PerfData;
    var PerfResourceData = (function () {
        function PerfResourceData() {
        }
        return PerfResourceData;
    })();
    exports.PerfResourceData = PerfResourceData;
    var MostRecentlyUsedUrls = (function () {
        function MostRecentlyUsedUrls(serverUrl, lastAccessedTime) {
            this.serverUrl = serverUrl;
            this.lastAccessedTime = lastAccessedTime;
        }
        return MostRecentlyUsedUrls;
    })();
    exports.MostRecentlyUsedUrls = MostRecentlyUsedUrls;
});
//# sourceMappingURL=Model.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('../Common/SessionData',["require", "exports", "../Common/ExtensionStorage"], function (require, exports, ExtensionStorage) {
    (function (chromeApiType) {
        chromeApiType[chromeApiType["chromeScreenCapture"] = 0] = "chromeScreenCapture";
        chromeApiType[chromeApiType["chromeDesktopCapture"] = 1] = "chromeDesktopCapture";
    })(exports.chromeApiType || (exports.chromeApiType = {}));
    var chromeApiType = exports.chromeApiType;
    var Screenshot = (function () {
        function Screenshot(id, content, state, name, isXTSession, chromeApiType) {
            this._screenshotDefaultPrefix = "Screenshot-";
            this.id = id;
            this.content = content;
            if (state) {
                this.state = state;
            }
            this.isXTSession = isXTSession;
            if (name) {
                this.name = name;
            }
            else {
                this.name = this._generateScreenshotName();
            }
            if (chromeApiType != null) {
                this.chromeApiType = chromeApiType;
            }
        }
        Screenshot.prototype.setPosition = function (top, left) {
            this.top = top;
            this.left = left;
        };
        Screenshot.prototype.setDimension = function (width, height) {
            this.width = width;
            this.height = height;
        };
        Screenshot.prototype._generateScreenshotName = function () {
            return this._screenshotDefaultPrefix.concat(this._generateScreenshotSuffix());
        };
        Screenshot.prototype._generateScreenshotSuffix = function () {
            if (this.isXTSession) {
                return this._getScreenshotCountAndUpdateInLocalStorage().toString();
            }
            else {
                var date = new Date(Date.now());
                return date.toISOString().replace(/:/g, '-');
            }
        };
        Screenshot.prototype._getScreenshotCountAndUpdateInLocalStorage = function () {
            var screenshotCount = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.screenshotsCountKey);
            if (screenshotCount) {
                screenshotCount = screenshotCount + 1;
            }
            else {
                screenshotCount = 1;
            }
            ExtensionStorage.LocalStorageService.store(ExtensionStorage.screenshotsCountKey, screenshotCount);
            return screenshotCount;
        };
        return Screenshot;
    })();
    exports.Screenshot = Screenshot;
    var ScreenshotEx = (function (_super) {
        __extends(ScreenshotEx, _super);
        function ScreenshotEx() {
            _super.apply(this, arguments);
        }
        return ScreenshotEx;
    })(Screenshot);
    exports.ScreenshotEx = ScreenshotEx;
    var SystemInformation = (function () {
        function SystemInformation(id, content) {
            this.id = id;
            this.content = content;
        }
        return SystemInformation;
    })();
    exports.SystemInformation = SystemInformation;
    var Note = (function () {
        function Note(content, size) {
            this.notesPrefix = "Note-";
            this.content = content;
            this.size = size;
            this.id = this.getNoteId();
        }
        Note.prototype.getNoteId = function () {
            var noteCount = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.notesCountKey);
            var numberOfNotes = parseInt(noteCount) + 1;
            ExtensionStorage.LocalStorageService.store(ExtensionStorage.notesCountKey, numberOfNotes);
            return this.notesPrefix.concat(numberOfNotes.toString());
        };
        return Note;
    })();
    exports.Note = Note;
    var Video = (function () {
        function Video(size, isXTSession) {
            this.videoPrefix = "ScreenRecording-";
            this.size = size;
            this.isXTSession = isXTSession;
            this.id = this.getVideoId();
        }
        Video.prototype.getVideoId = function () {
            if (this.isXTSession) {
                var videoCount = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.videosCountKey);
                var numberOfVideos = parseInt(videoCount) + 1;
                ExtensionStorage.LocalStorageService.store(ExtensionStorage.videosCountKey, numberOfVideos);
                var fileFormat = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.videoFileFormatKey);
                fileFormat = fileFormat === null ? "webm" : fileFormat;
                return this.videoPrefix.concat(numberOfVideos.toString()).concat("." + fileFormat);
            }
            else {
                var fileFormat = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.videoFileFormat_DataCollectorKey);
                fileFormat = fileFormat === null ? "webm" : fileFormat;
                var date = new Date(Date.now());
                return this.videoPrefix.concat(date.toISOString().replace(/:/g, '-')).concat("." + fileFormat);
            }
        };
        return Video;
    })();
    exports.Video = Video;
    var ActionLog = (function () {
        function ActionLog(size) {
            this.actionLogPrefix = "ActionLog-";
            this.fileFormat = ".html";
            this.size = size;
            this.id = this.getActionLogId();
        }
        ActionLog.getActionLogSessionData = function (fileName, content, size) {
            var actionLogData = new ActionLog(size);
            actionLogData.id = fileName ? fileName : actionLogData.id;
            actionLogData.content = content ? content : actionLogData.content;
            return actionLogData;
        };
        ActionLog.prototype.getActionLogId = function () {
            var date = new Date(Date.now());
            return this.actionLogPrefix.concat(date.toISOString().replace(/:/g, '-')).concat(this.fileFormat);
        };
        return ActionLog;
    })();
    exports.ActionLog = ActionLog;
    var PerfData = (function () {
        function PerfData(content, size, storageId) {
            this.content = content;
            this.size = size;
            this.id = storageId;
        }
        return PerfData;
    })();
    exports.PerfData = PerfData;
});
//# sourceMappingURL=SessionData.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Model/BrowserActionService',["require", "exports", "../Common/ExtensionStorage", "../Model/Model"], function (require, exports, ExtensionStorage, Model) {
    function initializeService() {
        if (!service) {
            service = new BrowserActionService();
        }
    }
    exports.initializeService = initializeService;
    function getService() {
        if (!service) {
            initializeService();
        }
        return service;
    }
    exports.getService = getService;
    (function (ExtensionIconType) {
        ExtensionIconType[ExtensionIconType["Default"] = 0] = "Default";
        ExtensionIconType[ExtensionIconType["InProgress"] = 1] = "InProgress";
        ExtensionIconType[ExtensionIconType["Error"] = 2] = "Error";
        ExtensionIconType[ExtensionIconType["Empty"] = 3] = "Empty";
    })(exports.ExtensionIconType || (exports.ExtensionIconType = {}));
    var ExtensionIconType = exports.ExtensionIconType;
    var service;
    // This is only used in Tests.
    function deinitializeService() {
        service = null;
    }
    exports.deinitializeService = deinitializeService;
    var BrowserActionService = (function () {
        function BrowserActionService() {
            this.iconLookup = {};
            this.iconWidth = 19;
            this.iconHeight = 19;
            this.iconLookup[ExtensionIconType.Default] = "../../Images/NormalState-";
            this.iconLookup[ExtensionIconType.InProgress] = "../../Images/SessionOnState-";
            this.iconLookup[ExtensionIconType.Error] = "../../Images/ErrorState-";
            var activeSession = ExtensionStorage.LocalStorageService
                .retrieve(ExtensionStorage.activeSessionKey);
            if (activeSession && activeSession.state === Model.SessionState.InProgress) {
                ExtensionStorage.LocalStorageService.store(ExtensionStorage.iconBeforeErrorKey, ExtensionIconType.InProgress);
                ExtensionStorage.LocalStorageService.store(ExtensionStorage.currentIconKey, ExtensionIconType.InProgress);
            }
            else {
                ExtensionStorage.LocalStorageService.store(ExtensionStorage.iconBeforeErrorKey, ExtensionIconType.Default);
                ExtensionStorage.LocalStorageService.store(ExtensionStorage.currentIconKey, ExtensionIconType.Default);
            }
        }
        BrowserActionService.prototype.setIcon = function (iconType) {
            if (iconType === ExtensionIconType.Empty) {
                var canvas = document.createElement('canvas');
                var imageData = canvas.getContext('2d').createImageData(this.iconWidth, this.iconHeight);
                chrome.browserAction.setIcon({ imageData: imageData });
            }
            else {
                var iconUrl = this.iconLookup[iconType];
                ExtensionStorage.LocalStorageService.store(ExtensionStorage.currentIconKey, iconType);
                if (iconType !== ExtensionIconType.Error) {
                    ExtensionStorage.LocalStorageService.store(ExtensionStorage.iconBeforeErrorKey, iconType);
                }
                chrome.browserAction.setIcon({ path: { 19: iconUrl + "19.png", 38: iconUrl + "38.png" } });
            }
        };
        BrowserActionService.prototype.clearError = function () {
            this.setIcon(ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.iconBeforeErrorKey));
        };
        BrowserActionService.prototype.getCurrentIconState = function () {
            return ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.currentIconKey);
        };
        return BrowserActionService;
    })();
});
//# sourceMappingURL=BrowserActionService.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Common/ResourceStrings',["require", "exports"], function (require, exports) {
    var ResourceStrings = (function () {
        function ResourceStrings() {
        }
        ResourceStrings.productNameShort = "TF";
        ResourceStrings.productName = "Test & Feedback";
        ResourceStrings.Tfs2015Name = "TFS 2015";
        ResourceStrings.Tfs2017Name = "TFS 2017";
        ResourceStrings.productNameWithExtension = ResourceStrings.productName + " extension";
        // Bugbug - extension is add-on on FireFox
        ResourceStrings.buyProductTitleString = "Buy " + ResourceStrings.productName + " extension";
        ResourceStrings.trialExpiredTitleString = "Your 30-day trial has expired";
        ResourceStrings.trialAboutToExpireTitleString = "Your trial will expire in {0}";
        ResourceStrings.startTrialMessage = "The preview of " + ResourceStrings.productName + " extension has ended. To continue using this extension in Connected mode, select an option below. We'll send a request to your admin.";
        ResourceStrings.trialExpiredMessage = "To continue using " + ResourceStrings.productName + " in Connected mode, select Buy. We'll send a request to your admin.";
        ResourceStrings.trialAboutToExpireMessage = "To continue using " + ResourceStrings.productName + " in Connected mode after trial ends, select Buy. We'll send a request to your admin.";
        ResourceStrings.trialNotificationContactAdminFooter = "You can use Connected mode when your admin approves your request.";
        ResourceStrings.trialNotificationContinueFooter = "For now, you can keep using " + ResourceStrings.productName + " in Standalone mode for free!";
        ResourceStrings.trialNotificationConitnueFooter2 = "And remember, you can use " + ResourceStrings.productName + " in Standalone mode for free!";
        ResourceStrings.stakeholderTfsNotSupportedMessage = "TFS version you are connecting to is not supported. Use " + ResourceStrings.Tfs2017Name + " and above to respond to feedback requests.";
        ResourceStrings.teamModeTfsNotSupportedMessage = "TFS version you are connecting to is not supported. Use " + ResourceStrings.Tfs2015Name + " and above to use in connected mode.";
        return ResourceStrings;
    })();
    exports.ResourceStrings = ResourceStrings;
});
//# sourceMappingURL=ResourceStrings.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Common/ResourceHelper',["require", "exports", "../Common/ResourceStrings"], function (require, exports, RS) {
    // Gets the product name short
    function getProductNameShortMessage() {
        return RS.ResourceStrings.productNameShort;
    }
    exports.getProductNameShortMessage = getProductNameShortMessage;
    // Gets the product name
    function getProductNameMessage() {
        return RS.ResourceStrings.productName;
    }
    exports.getProductNameMessage = getProductNameMessage;
    // Gets the product name with extension
    function getProductNameWithExtensionMessage() {
        return RS.ResourceStrings.productNameWithExtension;
    }
    exports.getProductNameWithExtensionMessage = getProductNameWithExtensionMessage;
    // Gets the buy product name extension string
    function getBuyProductTitleMessage() {
        return RS.ResourceStrings.buyProductTitleString;
    }
    exports.getBuyProductTitleMessage = getBuyProductTitleMessage;
    // Gets the trial expired title message
    function getTrialExpiredTitleMessage() {
        return RS.ResourceStrings.trialExpiredTitleString;
    }
    exports.getTrialExpiredTitleMessage = getTrialExpiredTitleMessage;
    // Gets the trial about to expire title message
    function getTrialAboutToExpireTitleMessage() {
        return RS.ResourceStrings.trialAboutToExpireTitleString;
    }
    exports.getTrialAboutToExpireTitleMessage = getTrialAboutToExpireTitleMessage;
    // Gets the start trial info message
    function getStartTrialMessage() {
        return RS.ResourceStrings.startTrialMessage;
    }
    exports.getStartTrialMessage = getStartTrialMessage;
    // Gets the trial expired detailed info message
    function getTrialExpiredMessage() {
        return RS.ResourceStrings.trialExpiredMessage;
    }
    exports.getTrialExpiredMessage = getTrialExpiredMessage;
    // Gets the trial is about to expire detailed message
    function getTrialAboutToExpireMessage() {
        return RS.ResourceStrings.trialAboutToExpireMessage;
    }
    exports.getTrialAboutToExpireMessage = getTrialAboutToExpireMessage;
    // Gets the trial about to expire - contact admin message
    function getTrialNotificationContactAdminFooterMessage() {
        return RS.ResourceStrings.trialNotificationContactAdminFooter;
    }
    exports.getTrialNotificationContactAdminFooterMessage = getTrialNotificationContactAdminFooterMessage;
    // Gets the trial about to expire - can use standalone mode message
    function getTrialNotificationContinueFooterMessage() {
        return RS.ResourceStrings.trialNotificationContinueFooter;
    }
    exports.getTrialNotificationContinueFooterMessage = getTrialNotificationContinueFooterMessage;
    // Gets the trial - what to do message on expired
    function getTrialNotificationConitnueFooter2Message() {
        return RS.ResourceStrings.trialNotificationConitnueFooter2;
    }
    exports.getTrialNotificationConitnueFooter2Message = getTrialNotificationConitnueFooter2Message;
    // Get the error message when TFS is not supported for Stakeholders
    function getTFSNotSupportedMessageForStakeholder() {
        return RS.ResourceStrings.stakeholderTfsNotSupportedMessage;
    }
    exports.getTFSNotSupportedMessageForStakeholder = getTFSNotSupportedMessageForStakeholder;
    // Get the error message when TFS is not supported for Basic/Advanced users
    function getTFSNotSupportedMessageForBasicUser() {
        return RS.ResourceStrings.teamModeTfsNotSupportedMessage;
    }
    exports.getTFSNotSupportedMessageForBasicUser = getTFSNotSupportedMessageForBasicUser;
});
//# sourceMappingURL=ResourceHelper.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Popup2/Common/ResourceUtility.Service',["require", "exports", "../../Common/ResourceHelper"], function (require, exports, RS) {
    var ResourceUtilityService = (function () {
        function ResourceUtilityService() {
        }
        ResourceUtilityService.prototype.getProductNameMessage = function () {
            return RS.getProductNameMessage();
        };
        ResourceUtilityService.prototype.getProductNameWithExtensionMessage = function () {
            return RS.getProductNameWithExtensionMessage();
        };
        // Gets the product name short
        ResourceUtilityService.getProductNameShortMessage = function () {
            return RS.getProductNameShortMessage();
        };
        ResourceUtilityService.GetProductNameMessage = function () {
            return RS.getProductNameMessage();
        };
        ResourceUtilityService.GetProductNameWithExtensionMessage = function () {
            return RS.getProductNameWithExtensionMessage();
        };
        return ResourceUtilityService;
    })();
    exports.ResourceUtilityService = ResourceUtilityService;
});
//# sourceMappingURL=ResourceUtility.Service.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Common/Types',["require", "exports"], function (require, exports) {
    /**
         * Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
         * @return New GUID.(UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
         * @notes This code is taken from \WebAccess\Search\Scripts\TFS.Search.Helpers.ts and \WebAccess\Build\Scripts\TFS.BuildvNext.WebApi.ts
         * @notes Disclaimer: This implementation uses non-cryptographic random number generator so absolute uniqueness is not guarantee.
         */
    function newGuid() {
        // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
        // "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
        var clockSequenceHi = (128 + Math.floor(Math.random() * 64)).toString(16);
        return oct(8) + "-" + oct(4) + "-4" + oct(3) + "-" + clockSequenceHi + oct(2) + "-" + oct(12);
    }
    exports.newGuid = newGuid;
    /**
         * Generated non-zero octet sequences for use with GUID generation.
         *
         * @param length Length required.
         * @return Non-Zero hex sequences.
         */
    function oct(length) {
        if (!length) {
            return (Math.floor(Math.random() * 0x10)).toString(16);
        }
        var result = "";
        for (var i = 0; i < length; i++) {
            result += oct();
        }
        return result;
    }
    function isStringNullOrEmpty(value) {
        var isNullOrEmpty = true;
        if (value && value.length > 0) {
            isNullOrEmpty = false;
        }
        return isNullOrEmpty;
    }
    exports.isStringNullOrEmpty = isStringNullOrEmpty;
    function endsWith(value, searchString) {
        if (isStringNullOrEmpty(value)) {
            return false;
        }
        if (value.lastIndexOf(searchString) + searchString.length === value.length) {
            return true;
        }
        else {
            return false;
        }
    }
    exports.endsWith = endsWith;
    function stringFormat(format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _stringFormat(false, format, args);
    }
    exports.stringFormat = stringFormat;
    function _stringFormat(useLocale, format, args) {
        var result = '';
        for (var i = 0;;) {
            var open = format.indexOf("{", i);
            var close = format.indexOf("}", i);
            if ((open < 0) && (close < 0)) {
                result += format.slice(i);
                break;
            }
            if ((close > 0) && ((close < open) || (open < 0))) {
                if (format.charAt(close + 1) !== '}') {
                    throw new Error("The format string contains an unmatched opening or closing brace.");
                }
                result += format.slice(i, close + 1);
                i = close + 2;
                continue;
            }
            result += format.slice(i, open);
            i = open + 1;
            if (format.charAt(i) === "{") {
                result += "{";
                i++;
                continue;
            }
            if (close < 0) {
                throw new Error("The format string contains an unmatched opening or closing brace.");
            }
            var brace = format.substring(i, close);
            var colonIndex = brace.indexOf(":");
            var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);
            if (isNaN(argNumber)) {
                throw new Error("The format string is invalid.");
            }
            var argFormat = (colonIndex < 0) ? "" : brace.substring(colonIndex + 1);
            var arg = args[argNumber];
            if (typeof (arg) === "undefined" || arg === null) {
                arg = "";
            }
            if (arg.toFormattedString) {
                result += arg.toFormattedString(argFormat);
            }
            else if (arg.format) {
                result += arg.format(argFormat);
            }
            else {
                result += arg.toString();
            }
            i = close + 1;
        }
        return result;
    }
});
//# sourceMappingURL=Types.js.map;
define('../Common/FeatureAvailabiliy',["require", "exports", "../Common/ExtensionStorage", "../Messaging/ChromeMessaging", "../Messaging/Messaging"], function (require, exports, ExtensionStorage, ChromeMessaging, Messaging) {
    var FeatureAvailibilityService = (function () {
        function FeatureAvailibilityService() {
        }
        FeatureAvailibilityService.initialize = function () {
            var _this = this;
            this._subscriptionService = ChromeMessaging.MessagingFactory.getSubscriptionService();
            this._subscriptionService
                .subscribe(function (data, response) {
                if (_this.isFeatureEnabled(data.flagType)) {
                    response();
                }
            }, Messaging.NotificationType.FeatureFlagStatus);
            this.updateDefaultFeatureStatesInLocalStore();
        };
        FeatureAvailibilityService.updateDefaultFeatureStatesInLocalStore = function () {
            for (var key in this.defaultFeatureStates) {
                if (!this.doesFeatureExists(key) && this.defaultFeatureStates.hasOwnProperty(key)) {
                    var value = this.defaultFeatureStates[key];
                    ExtensionStorage.LocalStorageService.store(key, value);
                    if (key === FeatureFlag[FeatureFlag.ActionLog]) {
                        chrome.storage.local.set(this.getFeatureFlagJson(key, value));
                    }
                }
            }
        };
        FeatureAvailibilityService.isFeatureEnabled = function (feature) {
            return ExtensionStorage.LocalStorageService.retrieve(FeatureFlag[feature]) || false;
        };
        FeatureAvailibilityService.doesFeatureExists = function (feature) {
            return ExtensionStorage.LocalStorageService.retrieve(feature) !== null;
        };
        FeatureAvailibilityService.setFeatureFlagState = function (feature, state) {
            var featureName = FeatureFlag[feature];
            ExtensionStorage.LocalStorageService.store(featureName, state);
            if (feature === FeatureFlag.ActionLog) {
                chrome.storage.local.set(this.getFeatureFlagJson(featureName, state));
            }
        };
        FeatureAvailibilityService.getFeatureFlagJson = function (featureName, featureState) {
            var flagJson = {};
            flagJson[featureName] = featureState;
            return flagJson;
        };
        FeatureAvailibilityService.defaultFeatureStates = {
            "ActionLog": true,
            "Task": true,
            "SearchSimilarBugs": true,
            "OfflineMode": true,
            "RestApiForSession": true,
            "PerfData": true,
            "RunnerActionLog": true,
            "XTTrialMode": false,
            "OngoingRecording": true,
            "StakeholderMode": true
        };
        return FeatureAvailibilityService;
    })();
    exports.FeatureAvailibilityService = FeatureAvailibilityService;
    (function (FeatureFlag) {
        FeatureFlag[FeatureFlag["ActionLog"] = 0] = "ActionLog";
        FeatureFlag[FeatureFlag["Task"] = 1] = "Task";
        FeatureFlag[FeatureFlag["SearchSimilarBugs"] = 2] = "SearchSimilarBugs";
        FeatureFlag[FeatureFlag["OfflineMode"] = 3] = "OfflineMode";
        FeatureFlag[FeatureFlag["RestApiForSession"] = 4] = "RestApiForSession";
        FeatureFlag[FeatureFlag["PerfData"] = 5] = "PerfData";
        FeatureFlag[FeatureFlag["RunnerActionLog"] = 6] = "RunnerActionLog";
        FeatureFlag[FeatureFlag["XTTrialMode"] = 7] = "XTTrialMode";
        FeatureFlag[FeatureFlag["OngoingRecording"] = 8] = "OngoingRecording";
        FeatureFlag[FeatureFlag["StakeholderMode"] = 9] = "StakeholderMode";
        FeatureFlag[FeatureFlag["NewBranding"] = 10] = "NewBranding";
    })(exports.FeatureFlag || (exports.FeatureFlag = {}));
    var FeatureFlag = exports.FeatureFlag;
});
//# sourceMappingURL=FeatureAvailabiliy.js.map;
define('../Popup2/CommonControls/InputDropdown.Template',["require", "exports"], function (require, exports) {
    exports.inputDropdownControlTemplate = '' +
        '<div id="input-mrutfsurls">' +
        '  <div class ="typeahead-dropdown-icon bowtie-triangle-down bowtie-icon dropdown-button" role="button" aria-label="Open drop down" tabIndex="0" aria-pressed="{{ isDropOpen }}" ng-click="onDropDownClick()" ng-mousedown="onMouseDown($event)" ng-keydown="onKeyDown($event)" ng-if="isDropButtonVisible()"> </div>' +
        '  <input class="typeahead" type= "text" aria-labelledby="team-services-url" placeholder=" Enter Team Services / Team Foundation Server url" ng-model="url">' +
        '</div>';
    exports.inputDropdownControlTemplateNewBranding = '' +
        '<div id="input-mrutfsurls">' +
        '  <div class ="typeahead-dropdown-icon bowtie-triangle-down bowtie-icon dropdown-button" role="button" aria-label="Open drop down" tabIndex="0" aria-pressed="{{ isDropOpen }}" ng-click="onDropDownClick()" ng-mousedown="onMouseDown($event)" ng-keydown="onKeyDown($event)" ng-if="isDropButtonVisible()"> </div>' +
        '  <input class="typeahead" type= "text" aria-labelledby="team-services-url" placeholder=" Enter Azure DevOps Services / Team Foundation Server url" ng-model="url">' +
        '</div>';
});
//# sourceMappingURL=InputDropdown.Template.js.map;
define('../Popup2/SignIn/SignIn.Template',["require", "exports"], function (require, exports) {
    exports.signInTemplate = '' +
        '<div class="sign-in-page" ng-controller="SignInFormController as controller" ng-escape="controller.utilityService.minimizeForm()">' +
        '    <error-control></error-control>' +
        '    <div class="form-container">' +
        '        <div role="group" aria-labelledby="connection-settings">' +
        '           <div id="connection-settings" class="sign-in-page-title">' +
        '               <legend>Connection settings</legend>' +
        '           </div>' +
        '           <div class="sign-in-option">' +
        '               <div class="{{ controller.$localStorage.activeSession.state | ChangeClassFilter: \'tfs-option\'}}">' +
        '                   <input id="connected-radio-button" type="radio" aria-labelledby="connected" name="connection" value="connected" ng-disabled="controller.$localStorage.activeSession.state === 1" ng-change="controller.changeConnectionOption()" ng-model="controller.connectionOption">' +
        '                   <span id="connected">{{ controller.getTeamRadioText() }}</span>' +
        '               </div>' +
        '               <div class="{{ controller.$localStorage.activeSession.state | ChangeClassFilter: \'offline-option\'}}">' +
        '                   <input id="standalone-radio-button" type="radio" aria-labelledby="standalone" name="connection" value="offline" ng-disabled="controller.$localStorage.activeSession.state === 1" ng-change="controller.changeConnectionOption()" ng-model="controller.connectionOption">' +
        '                   <span id="standalone">Standalone</span>' +
        '               </div>' +
        '           </div>' +
        '        </div>' +
        '        <div class="tfs-content" ng-if="controller.connectionOption === \'connected\'">' +
        '           <div class="connected-mode-description" ng-if="!controller.isloggedIn">' +
        '               {{ controller.getConnectedModeDescription() }}<a ng-click="controller.utilityService.openLink(\'https://aka.ms/xtmodes \')" ng-keydown="controller.utilityService.openLinkOnEnterPress($event, \'http://aka.ms/xtmodes \')" target="_blank" tabindex=\"0\">Learn more</a>' +
        '                <br>' +
        '           </div>' +
        '        <div class="connect-tfs-control">' +
        '            <div class="tfs-header-section">' +
        '                <div class="tfs-header">Server URL</div>' +
        '            <button class="disconnect-button" ng-if="controller.connectionStatusPassed && controller.$localStorage.activeSession.state !== 1" ng-click="controller.disconnect()" tabindex="{{ controller.enableTabIndex(controller.isloggedIn) }}">' +
        '                <div class="{{ controller.$localStorage.activeSession.state | ChangeClassFilter: \'disconnect\'}}" title="{{ controller.$localStorage.activeSession.state | TooltipFilter }}">' +
        '                    Disconnect' +
        '                </div>' +
        '            </button>' +
        '            <button class="disconnect-button" ng-if="(!controller.connectionStatusPassed && controller.$localStorage.initialBaseUrl  && $root.actionInProgress) || controller.$localStorage.activeSession.state === 1" ng-click="controller.repair()" tabindex="{{ controller.enableTabIndex(controller.isloggedIn) }}">' +
        '                <div  class="disconnect" title="Repair">' +
        '                    Repair' +
        '                </div>' +
        '            </button>' +
        '                <!--' +
        '                <div class="icon-info"></div>' +
        '                -->' +
        '            </div>' +
        '            <div class="tfs-url" ng-style="{\'background-color\': !controller.isInputEditable ? \'#DDDDDD\' : \'white\' }">' +
        '                  <span ng-if="!controller.isInputEditable"> <input ng-style="{\'background-color\': !controller.isInputEditable ? \'#DDDDDD\' : \'white\' }" type="text" ng-model="controller.baseUrl;" tabindex="{{ controller.enableTabIndex(!controller.isloggedIn) }}" aria-labelledby="team-services-url" ng-readonly="!controller.isInputEditable" ng-keydown="controller.keyDownOnNext($event)" enable="{{ controller.isloggedIn === false }}" placeholder=" Enter Team Services / Team Foundation Server url" /></span>' +
        '                  <span id="team-services-url" class="hidden-aria-label">Team Foundation Server or Team Services URL</span>' +
        '                  <span ng-if="controller.isInputEditable"> <input-dropdown tfsurl="controller.baseUrl" ng-style="{\'background-color\': !controller.isInputEditable ? \'#DDDDDD\' : \'white\' }" type="text"  tabindex="-1" ng-readonly="!controller.isInputEditable" ng-keydown="controller.keyDownOnNext($event)" enable="{{ controller.isloggedIn === false }}"></input-dropdown></span>' +
        '                <div class="connection-status">' +
        '                    <div class="passed"' +
        '                         ng-class="controller.statusPassedItem.css"' +
        '                         ng-bind-html="controller.statusPassedItem.unicode"' +
        '                         ng-if="controller.connectionStatusPassed && controller.showConnectionStatusIcon"></div>' +
        '                </div>' +
        '            </div>' +
        '            <div class="tfs-url-preview" ng-if="!controller.connectionStatusPassed && controller.baseUrl && controller.baseUrl.length != 0 " ng-if="!controller.isTeamSelected" >' +
        '                <span>Preview:&nbsp;</span>' +
        '                <input type="text" value="{{ controller.$localStorage.initialBaseUrl = controller.baseUrl; controller.baseUrl | tfsurlFilter }}" title="{{ controller.baseUrl | tfsurlFilter }}" readonly tabindex="-1" />' +
        '            </div>' +
        '            <div class="tfs-url-preview" ng-if="controller.isInputEditable && (!controller.baseUrl || controller.baseUrl.length === 0) ">' +
        '            </div>' +
        '            <div class="vso-sign-up" ng-if="!controller.isloggedIn">' +
        "              Don't have a Visual Studio Team Services account? <a ng-href=\"\" ng-click=\"controller.loadSignUpPage()\" ng-keydown=\"controller.keyDownOnNewUser($event)\" tabindex=\"0\">Sign up </a>for free." +
        '            </div>' +
        '        </div>' +
        '        <div class="button-container" ng-if="!controller.isloggedIn" tabindex="-1">' +
        '            <button ng-click="controller.validateTfsUrl()" ng-disabled="$root.actionInProgress || !controller.$localStorage.initialBaseUrl" tabindex="{{ controller.enableTabIndex(!controller.isloggedIn) }}">' +
        '                <div class="submit-text">' +
        '                    Next' +
        '                </div>' +
        '            </button>' +
        '        </div>' +
        '        <div ng-if="controller.$storage.changeTeamDetails !== false" >' +
        '            <div ng-if="controller.isloggedIn" class="team-path">' +
        '                <div class="project-team-header">' +
        '                    <div class="select-team-text" tabindex="-1" ng-if="!controller.isTeamSelected"><label for="team-search-input" id="search-label-id">Select your team<label></div>' +
        '                </div>' +
        '                   <div class="refresh-button" title="Refresh" ng-click="controller.refresh()" role="button" tabindex="{{ controller.enableTabIndex(controller.isloggedIn) }}" ng-keydown="controller.keyDownOnRefresh($event)">Refresh</div>' +
        '                <div class="select-team">' +
        '                   <div class="filter"> ' +
        '                       <div class="select-collection-header" title="{{controller.collectionFilter.name}}" ng-if="controller.data.length > 1" > ' +
        '                           <select class="select-collection" tabindex="{{ controller.enableTabIndex(controller.data.length > 1 && !controller.isloggedIn) }}" ng-disabled="controller.$storage.activeSession.state === 1" ng-options="collection.name for collection in controller.data" ng-model="controller.collectionFilter"> </select>' +
        '                       </div>' +
        '                       <div class="team-filter" > ' +
        '                           <input class="input-box" id="team-search-input" type="text" results="0"  ng-disabled="controller.$storage.activeSession.state === 1" ng-change="controller.teamFilterChanged()" ng-model="controller.teamFilter" aria-describedby="team-search-input" ng-model-options="{debounce: 300}" enable="controller.isloggedIn"  placeholder= " Search..." />' +
        '                           <div class="team-search-button-container" title="Search">&#57492;</div>' +
        '                       </div>' +
        '                   </div>' +
        '                 </div>' +
        '             </div>' +
        '            <!-- as a Dom element -->' +
        '            <div class="team-selector" id="team-selector-container" ng-if="controller.isloggedIn">' +
        '                <div ng-if="!controller.isRefreshing"' +
        '                     data-angular-treeview="true"' +
        '                     data-tree-id="tree"' +
        '                     data-tree-model="controller.data"' +
        '                     data-node-id="id"' +
        '                     data-node-label="name"' +
        '                     data-node-children="children"' +
        '                     data-container-id="team-selector-container">' +
        '                </div>' +
        '                <div ng-if="controller.isRefreshing" class="refresh-icon">' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '            <button class="change-button" ng-click="controller.changeConnectionSettings()" ng-disabled="controller.isChangeButtonDisabled()" ng-if="controller.$storage.changeTeamDetails === false">' +
        '                   <div class="{{ controller.$localStorage.activeSession.state | ChangeClassFilter: \'change\' }}" > Change </div>' +
        '            </button>' +
        '            <div class="selected-team-title" ng-if="controller.isloggedIn && controller.$storage.changeTeamDetails === false">Selected Team: </div>' +
        '            <div class="selected-team-text" ng-if="controller.$storage.changeTeamDetails === false && controller.isloggedIn" title="{{ controller.teamPath }} ">{{ controller.teamPath }} </div>' +
        '            <div class="selected-team-text-without-title" ng-if="controller.$storage.changeTeamDetails !== false && controller.isloggedIn" title="{{ controller.teamPath }} ">{{ controller.teamPath }} </div>' +
        '            <div class="button-container" ng-if="controller.isloggedIn && controller.$storage.changeTeamDetails !== false" tabindex=-1>' +
        '                 <button ng-click="controller.save()" ng-disabled="controller.isSaveDisable() || controller.$storage.activeSession.state === 1 || $root.actionInProgress" tabindex="{{ controller.enableTabIndex(!controller.isSaveDisable()) }}">' +
        '                    <div class="submit-text">' +
        '                         Save' +
        '                    </div>' +
        '                 </button>' +
        '             </div>' +
        '        </div>' +
        '        <div class="offline-content" ng-if="controller.connectionOption === \'offline\'">' +
        '        Make notes, take screenshots, file bugs, and share your findings as a report. Open to everyone. No connection to Visual Studio Team Services or Team Foundation Server required. <a ng-click="controller.utilityService.openLink(\'https://aka.ms/xtmodes \')" target="_blank" ng-keydown="controller.utilityService.openLinkOnEnterPress($event, \'http://aka.ms/xtmodes \')" tabindex=\"0\">Learn more</a><br><br>Don\'t have a Visual Studio Team Services account? <a ng-href=\"\" ng-click=\"controller.loadSignUpPage()\" ng-keydown=\"controller.keyDownOnNewUser($event)\" tabindex=\"0\">Sign up</a> for free.' +
        '        <br>' +
        '        <br>' +
        '        <i> {{ controller.getOfflineFooterMessage() }} </i>' +
        '        </div>' +
        '        <xt-minimizepage></xt-minimizepage>' +
        '    </div>' +
        '</div>';
    exports.signInTemplateNewBranding = '' +
        '<div class="sign-in-page" ng-controller="SignInFormController as controller" ng-escape="controller.utilityService.minimizeForm()">' +
        '    <error-control></error-control>' +
        '    <div class="form-container">' +
        '        <div role="group" aria-labelledby="connection-settings">' +
        '           <div id="connection-settings" class="sign-in-page-title">' +
        '               <legend>Connection settings</legend>' +
        '           </div>' +
        '           <div class="sign-in-option">' +
        '               <div class="{{ controller.$localStorage.activeSession.state | ChangeClassFilter: \'tfs-option\'}}">' +
        '                   <input id="connected-radio-button" type="radio" aria-labelledby="connected" name="connection" value="connected" ng-disabled="controller.$localStorage.activeSession.state === 1" ng-change="controller.changeConnectionOption()" ng-model="controller.connectionOption">' +
        '                   <span id="connected">{{ controller.getTeamRadioText() }}</span>' +
        '               </div>' +
        '               <div class="{{ controller.$localStorage.activeSession.state | ChangeClassFilter: \'offline-option\'}}">' +
        '                   <input id="standalone-radio-button" type="radio" aria-labelledby="standalone" name="connection" value="offline" ng-disabled="controller.$localStorage.activeSession.state === 1" ng-change="controller.changeConnectionOption()" ng-model="controller.connectionOption">' +
        '                   <span id="standalone">Standalone</span>' +
        '               </div>' +
        '           </div>' +
        '        </div>' +
        '        <div class="tfs-content" ng-if="controller.connectionOption === \'connected\'">' +
        '           <div class="connected-mode-description" ng-if="!controller.isloggedIn">' +
        '               {{ controller.getConnectedModeDescription() }}<a ng-click="controller.utilityService.openLink(\'https://aka.ms/xtmodes \')" ng-keydown="controller.utilityService.openLinkOnEnterPress($event, \'http://aka.ms/xtmodes \')" target="_blank" tabindex=\"0\">Learn more</a>' +
        '                <br>' +
        '           </div>' +
        '        <div class="connect-tfs-control">' +
        '            <div class="tfs-header-section">' +
        '                <div class="tfs-header">Server URL</div>' +
        '            <button class="disconnect-button" ng-if="controller.connectionStatusPassed && controller.$localStorage.activeSession.state !== 1" ng-click="controller.disconnect()" tabindex="{{ controller.enableTabIndex(controller.isloggedIn) }}">' +
        '                <div class="{{ controller.$localStorage.activeSession.state | ChangeClassFilter: \'disconnect\'}}" title="{{ controller.$localStorage.activeSession.state | TooltipFilter }}">' +
        '                    Disconnect' +
        '                </div>' +
        '            </button>' +
        '            <button class="disconnect-button" ng-if="(!controller.connectionStatusPassed && controller.$localStorage.initialBaseUrl  && $root.actionInProgress) || controller.$localStorage.activeSession.state === 1" ng-click="controller.repair()" tabindex="{{ controller.enableTabIndex(controller.isloggedIn) }}">' +
        '                <div  class="disconnect" title="Repair">' +
        '                    Repair' +
        '                </div>' +
        '            </button>' +
        '                <!--' +
        '                <div class="icon-info"></div>' +
        '                -->' +
        '            </div>' +
        '            <div class="tfs-url" ng-style="{\'background-color\': !controller.isInputEditable ? \'#DDDDDD\' : \'white\' }">' +
        '                  <span ng-if="!controller.isInputEditable"> <input ng-style="{\'background-color\': !controller.isInputEditable ? \'#DDDDDD\' : \'white\' }" type="text" ng-model="controller.baseUrl;" tabindex="{{ controller.enableTabIndex(!controller.isloggedIn) }}" aria-labelledby="team-services-url" ng-readonly="!controller.isInputEditable" ng-keydown="controller.keyDownOnNext($event)" enable="{{ controller.isloggedIn === false }}" placeholder=" Enter Azure DevOps Services / Team Foundation Server url" /></span>' +
        '                  <span id="team-services-url" class="hidden-aria-label">Team Foundation Server or Azure DevOps Services URL</span>' +
        '                  <span ng-if="controller.isInputEditable"> <input-dropdown tfsurl="controller.baseUrl" ng-style="{\'background-color\': !controller.isInputEditable ? \'#DDDDDD\' : \'white\' }" type="text"  tabindex="-1" ng-readonly="!controller.isInputEditable" ng-keydown="controller.keyDownOnNext($event)" enable="{{ controller.isloggedIn === false }}"></input-dropdown></span>' +
        '                <div class="connection-status">' +
        '                    <div class="passed"' +
        '                         ng-class="controller.statusPassedItem.css"' +
        '                         ng-bind-html="controller.statusPassedItem.unicode"' +
        '                         ng-if="controller.connectionStatusPassed && controller.showConnectionStatusIcon"></div>' +
        '                </div>' +
        '            </div>' +
        '            <div class="tfs-url-preview" ng-if="!controller.connectionStatusPassed && controller.baseUrl && controller.baseUrl.length != 0 " ng-if="!controller.isTeamSelected" >' +
        '                <span>Preview:&nbsp;</span>' +
        '                <input type="text" value="{{ controller.$localStorage.initialBaseUrl = controller.baseUrl; controller.baseUrl | tfsurlFilter }}" title="{{ controller.baseUrl | tfsurlFilter }}" readonly tabindex="-1" />' +
        '            </div>' +
        '            <div class="tfs-url-preview" ng-if="controller.isInputEditable && (!controller.baseUrl || controller.baseUrl.length === 0) ">' +
        '            </div>' +
        '            <div class="vso-sign-up" ng-if="!controller.isloggedIn">' +
        "              Don't have a Azure DevOps organization? <a ng-href=\"\" ng-click=\"controller.loadSignUpPage()\" ng-keydown=\"controller.keyDownOnNewUser($event)\" tabindex=\"0\">Sign up </a>for free." +
        '            </div>' +
        '        </div>' +
        '        <div class="button-container" ng-if="!controller.isloggedIn" tabindex="-1">' +
        '            <button ng-click="controller.validateTfsUrl()" ng-disabled="$root.actionInProgress || !controller.$localStorage.initialBaseUrl" tabindex="{{ controller.enableTabIndex(!controller.isloggedIn) }}">' +
        '                <div class="submit-text">' +
        '                    Next' +
        '                </div>' +
        '            </button>' +
        '        </div>' +
        '        <div ng-if="controller.$storage.changeTeamDetails !== false" >' +
        '            <div ng-if="controller.isloggedIn" class="team-path">' +
        '                <div class="project-team-header">' +
        '                    <div class="select-team-text" tabindex="-1" ng-if="!controller.isTeamSelected"><label for="team-search-input" id="search-label-id">Select your team<label></div>' +
        '                </div>' +
        '                   <div class="refresh-button" title="Refresh" ng-click="controller.refresh()" role="button" tabindex="{{ controller.enableTabIndex(controller.isloggedIn) }}" ng-keydown="controller.keyDownOnRefresh($event)">Refresh</div>' +
        '                <div class="select-team">' +
        '                   <div class="filter"> ' +
        '                       <div class="select-collection-header" title="{{controller.collectionFilter.name}}" ng-if="controller.data.length > 1" > ' +
        '                           <select class="select-collection" tabindex="{{ controller.enableTabIndex(controller.data.length > 1 && !controller.isloggedIn) }}" ng-disabled="controller.$storage.activeSession.state === 1" ng-options="collection.name for collection in controller.data" ng-model="controller.collectionFilter"> </select>' +
        '                       </div>' +
        '                       <div class="team-filter" > ' +
        '                           <input class="input-box" id="team-search-input" type="text" results="0"  ng-disabled="controller.$storage.activeSession.state === 1" ng-change="controller.teamFilterChanged()" ng-model="controller.teamFilter" aria-describedby="team-search-input" ng-model-options="{debounce: 300}" enable="controller.isloggedIn"  placeholder= " Search..." />' +
        '                           <div class="team-search-button-container" title="Search">&#57492;</div>' +
        '                       </div>' +
        '                   </div>' +
        '                 </div>' +
        '             </div>' +
        '            <!-- as a Dom element -->' +
        '            <div class="team-selector" id="team-selector-container" ng-if="controller.isloggedIn">' +
        '                <div ng-if="!controller.isRefreshing"' +
        '                     data-angular-treeview="true"' +
        '                     data-tree-id="tree"' +
        '                     data-tree-model="controller.data"' +
        '                     data-node-id="id"' +
        '                     data-node-label="name"' +
        '                     data-node-children="children"' +
        '                     data-container-id="team-selector-container">' +
        '                </div>' +
        '                <div ng-if="controller.isRefreshing" class="refresh-icon">' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '            <button class="change-button" ng-click="controller.changeConnectionSettings()" ng-disabled="controller.isChangeButtonDisabled()" ng-if="controller.$storage.changeTeamDetails === false">' +
        '                   <div class="{{ controller.$localStorage.activeSession.state | ChangeClassFilter: \'change\' }}" > Change </div>' +
        '            </button>' +
        '            <div class="selected-team-title" ng-if="controller.isloggedIn && controller.$storage.changeTeamDetails === false">Selected Team: </div>' +
        '            <div class="selected-team-text" ng-if="controller.$storage.changeTeamDetails === false && controller.isloggedIn" title="{{ controller.teamPath }} ">{{ controller.teamPath }} </div>' +
        '            <div class="selected-team-text-without-title" ng-if="controller.$storage.changeTeamDetails !== false && controller.isloggedIn" title="{{ controller.teamPath }} ">{{ controller.teamPath }} </div>' +
        '            <div class="button-container" ng-if="controller.isloggedIn && controller.$storage.changeTeamDetails !== false" tabindex=-1>' +
        '                 <button ng-click="controller.save()" ng-disabled="controller.isSaveDisable() || controller.$storage.activeSession.state === 1 || $root.actionInProgress" tabindex="{{ controller.enableTabIndex(!controller.isSaveDisable()) }}">' +
        '                    <div class="submit-text">' +
        '                         Save' +
        '                    </div>' +
        '                 </button>' +
        '             </div>' +
        '        </div>' +
        '        <div class="offline-content" ng-if="controller.connectionOption === \'offline\'">' +
        '        Make notes, take screenshots, file bugs, and share your findings as a report. Open to everyone. No connection to Azure DevOps Services or Team Foundation Server required. <a ng-click="controller.utilityService.openLink(\'https://aka.ms/xtmodes \')" target="_blank" ng-keydown="controller.utilityService.openLinkOnEnterPress($event, \'http://aka.ms/xtmodes \')" tabindex=\"0\">Learn more</a><br><br>Don\'t have a Azure DevOps organization? <a ng-href=\"\" ng-click=\"controller.loadSignUpPage()\" ng-keydown=\"controller.keyDownOnNewUser($event)\" tabindex=\"0\">Sign up</a> for free.' +
        '        <br>' +
        '        <br>' +
        '        <i> {{ controller.getOfflineFooterMessage() }} </i>' +
        '        </div>' +
        '        <xt-minimizepage></xt-minimizepage>' +
        '    </div>' +
        '</div>';
});
//# sourceMappingURL=SignIn.Template.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Common/Utility',["require", "exports", "../Common/Constants", "../Common/ExtensionStorage", "../Common/Types", "../Common/FeatureAvailabiliy", "../Popup2/CommonControls/InputDropdown.Template", "../Popup2/SignIn/SignIn.Template"], function (require, exports, Constants, ExtensionStorage, Types, FeatureAvailabiliy_1, InputDropdownTemplate, SignInTemplate) {
    // Checks if the event should be ignored
    // Criteria - if events last fired time is under 400 milliseconds of current time ==> ignore.
    // Helps handling multiple clicks in popup.
    function ignoreEvent(eventsLastTime) {
        var shouldIgnore = false;
        if (eventsLastTime) {
            var diff = new Date().getTime() - eventsLastTime.getTime();
            if (diff < 400) {
                shouldIgnore = true;
            }
        }
        return shouldIgnore;
    }
    exports.ignoreEvent = ignoreEvent;
    // Gets the current browser and version
    function getBrowserNameAndVersion() {
        var ua = navigator.userAgent, tem, m = ua.match(/(opera|chrome|safari|firefox|chromium|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(m[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return "IE " + (tem[1] || "");
        }
        if (m[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null)
                return tem.slice(1).join(" ").replace("OPR", "Opera");
        }
        m = m[2] ? [getFullyQualifiedBrowerName(m[1]), m[2]] : [navigator.appName, navigator.appVersion, "-?"];
        //if ((tem = ua.match(/version\/(\d+)/i)) != null) m.splice(1, 1, tem[1]);
        return m.join(' ');
    }
    exports.getBrowserNameAndVersion = getBrowserNameAndVersion;
    function getFullyQualifiedBrowerName(browserName) {
        switch (browserName.toLowerCase()) {
            case "chrome":
                return Constants.BrowserConstants.chromeBrowserName;
            case "firefox":
                return Constants.BrowserConstants.firefoxBrowserName;
            case "edge":
                return Constants.BrowserConstants.edgeBrowserName;
            default:
                return browserName;
        }
    }
    exports.getFullyQualifiedBrowerName = getFullyQualifiedBrowerName;
    // If we are connected to VSTS then always use "DefaultCollection" - to fix "Collection in the domain" issue.
    function getCollectionUrl(serverUrl, collectionName) {
        var defaultCollectionUriSuffix = "DefaultCollection/";
        // Below check is required to unblock app-fabric deployments, mostly used in demos.
        var appfabric = "tfsallin.net";
        var collectionUrl = serverUrl;
        // we don't need to make default collection specific calls here for online accounts
        // With new domain change account name itself would be collection
        if (serverUrl.search(appfabric) <= 0 && !isHostedUrl(serverUrl)) {
            collectionUrl += collectionName + "/";
        }
        return collectionUrl;
    }
    exports.getCollectionUrl = getCollectionUrl;
    function isHostedUrl(serverUri) {
        var hostName = getHostName(serverUri);
        if (hostName.match(/.visualstudio.com$/) || hostName.match(/^dev.azure.com$/) || hostName.match(/^codeapp.ms$/) || hostName.match(/^codedev.ms$/)) {
            return true;
        }
        return false;
    }
    exports.isHostedUrl = isHostedUrl;
    function getHostName(url) {
        var parser = document.createElement('a');
        parser.href = url;
        if (parser.hostname)
            return parser.hostname;
        return "";
    }
    //Removes the collection from tfsurl;
    function getTfsUrl(connectionString, collectionName) {
        var tfsUrl = "";
        if (connectionString && collectionName) {
            tfsUrl = connectionString;
            if (!isHostedUrl(connectionString)) {
                tfsUrl = connectionString.replace(collectionName + "/", "");
            }
        }
        return tfsUrl;
    }
    exports.getTfsUrl = getTfsUrl;
    function ValidateTabHost(tabid, successCallback, errorCallback) {
        chrome.tabs.get(tabid, function (tab) {
            if (tab) {
                var basicConnectionSettings = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.basicConnectionSettingsKey);
                var activeSettings = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.activeSettingsKey);
                var loggedInUrl = basicConnectionSettings ? basicConnectionSettings : activeSettings.serverbaseUrl;
                var isloggedIn = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.loggedInKey);
                var tabUri = document.createElement('a');
                tabUri.href = tab.url;
                if (isloggedIn && loggedInUrl) {
                    var loggedInUri = document.createElement('a');
                    loggedInUri.href = loggedInUrl;
                    if (tabUri.protocol == loggedInUri.protocol && tabUri.host === loggedInUri.host) {
                        successCallback();
                        return;
                    }
                }
                errorCallback(Types.stringFormat(Constants.Messages.login, tabUri.hostname));
            }
            else {
                errorCallback(Types.stringFormat(Constants.Messages.login, "server"));
            }
        });
    }
    exports.ValidateTabHost = ValidateTabHost;
    var Map = (function () {
        function Map() {
            this.items = {};
            this.length = 0;
        }
        Map.prototype.add = function (key, value) {
            this.items[key] = value;
            this.length++;
        };
        Map.prototype.has = function (key) {
            return key in this.items;
        };
        Map.prototype.get = function (key) {
            return this.items[key];
        };
        return Map;
    })();
    exports.Map = Map;
    var BrandingChangesHelper = (function () {
        function BrandingChangesHelper() {
        }
        BrandingChangesHelper.getFooterBrandingPerfPage = function () {
            var footerBranding = '';
            if (FeatureAvailabiliy_1.FeatureAvailibilityService.isFeatureEnabled(FeatureAvailabiliy_1.FeatureFlag.NewBranding)) {
                footerBranding = 'Azure DevOps </a>. ';
            }
            else {
                footerBranding = 'Visual Studio Team Services</a> / Team Foundation Server using the Connected mode. ';
            }
            return footerBranding;
        };
        BrandingChangesHelper.getConnectedServerTypeForHosted = function () {
            var serverType = '';
            if (FeatureAvailabiliy_1.FeatureAvailibilityService.isFeatureEnabled(FeatureAvailabiliy_1.FeatureFlag.NewBranding)) {
                serverType = "Azure DevOps organization";
            }
            else {
                serverType = "VSTS account";
            }
            return serverType;
        };
        BrandingChangesHelper.getInputDropDownTemplate = function () {
            var inputDropdownTemplate = '';
            if (FeatureAvailabiliy_1.FeatureAvailibilityService.isFeatureEnabled(FeatureAvailabiliy_1.FeatureFlag.NewBranding)) {
                inputDropdownTemplate = InputDropdownTemplate.inputDropdownControlTemplateNewBranding;
            }
            else {
                inputDropdownTemplate = InputDropdownTemplate.inputDropdownControlTemplate;
            }
            return inputDropdownTemplate;
        };
        BrandingChangesHelper.getSignInTemplate = function () {
            var signInTemplate = '';
            if (FeatureAvailabiliy_1.FeatureAvailibilityService.isFeatureEnabled(FeatureAvailabiliy_1.FeatureFlag.NewBranding)) {
                signInTemplate = SignInTemplate.signInTemplateNewBranding;
            }
            else {
                signInTemplate = SignInTemplate.signInTemplate;
            }
            return signInTemplate;
        };
        BrandingChangesHelper.getHostedBrandingName = function (useShorthand) {
            if (FeatureAvailabiliy_1.FeatureAvailibilityService.isFeatureEnabled(FeatureAvailabiliy_1.FeatureFlag.NewBranding)) {
                if (useShorthand) {
                    return "Azure DevOps";
                }
                else {
                    return "Azure DevOps Services";
                }
            }
            else {
                return "Visual Studio Team Services";
            }
        };
        BrandingChangesHelper.getHostedBrandingShortName = function (useShorthand) {
            if (FeatureAvailabiliy_1.FeatureAvailibilityService.isFeatureEnabled(FeatureAvailabiliy_1.FeatureFlag.NewBranding)) {
                return "Azure DevOps";
            }
            else {
                return "Team Services";
            }
        };
        return BrandingChangesHelper;
    })();
    exports.BrandingChangesHelper = BrandingChangesHelper;
});
//# sourceMappingURL=Utility.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Model/PerfDataInsightViewService',["require", "exports", "../Popup2/Common/ResourceUtility.Service", "../Common/Utility"], function (require, exports, Utils, Utility_1) {
    var PerfInsightView = (function () {
        function PerfInsightView() {
        }
        PerfInsightView.getInsightView = function (perfSummaryObject, barHeight, barWidth) {
            var url = perfSummaryObject.url;
            var perfSummary = perfSummaryObject.data;
            var start = perfSummary.items.start;
            var end = perfSummary.items.end;
            var count = perfSummary.items.count;
            delete perfSummary.start;
            delete perfSummary.end;
            delete perfSummary.count;
            PerfInsightView.barHeight = barHeight ? barHeight : 10;
            PerfInsightView.barWidth = barWidth ? barWidth : 1500;
            PerfInsightView.RSvgWidth = PerfInsightView.barWidth + PerfInsightView.hShift;
            var perfInsightHtml = '<html><head><title>Performance Insights</title>';
            perfInsightHtml += '<script>' +
                'function showB(t) {' +
                'var bStart = document.getElementById("bStart" + t.id);' +
                'var bEnd = document.getElementById("bEnd" + t.id);' +
                'var bTxtStart = document.getElementById("bTxtStart" + t.id);' +
                'var bTxtEnd = document.getElementById("bTxtEnd" + t.id);' +
                'bStart.setAttribute("visibility", "visible");' +
                'bEnd.setAttribute("visibility", "visible");' +
                'bTxtStart.setAttribute("visibility", "visible");' +
                'bTxtEnd.setAttribute("visibility", "visible");' +
                '}' +
                'function hideB(t) {' +
                'var bStart = document.getElementById("bStart" + t.id);' +
                'var bEnd = document.getElementById("bEnd" + t.id);' +
                'var bTxtStart = document.getElementById("bTxtStart" + t.id);' +
                'var bTxtEnd = document.getElementById("bTxtEnd" + t.id);' +
                'bStart.setAttribute("visibility", "hidden");' +
                'bEnd.setAttribute("visibility", "hidden");' +
                'bTxtStart.setAttribute("visibility", "hidden");' +
                'bTxtEnd.setAttribute("visibility", "hidden");' +
                '}' +
                'var gTags = document.getElementsByTagName("g");' +
                'var startYPos = 15;' +
                'function translateBoundaries(gTag, diff){' +
                'var rects = gTag.getElementsByTagName("rect"), bStart, bEnd, bTxtStart, bTxtEnd, id;' +
                'for(var i=0;i<rects.length;i++){' +
                'if(rects[i].getAttribute("id")){' +
                'id = rects[i].getAttribute("id");' +
                'bStart = document.getElementById("bStart"+id);' +
                'bEnd = document.getElementById("bEnd"+id);' +
                'bTxtStart = document.getElementById("bTxtStart"+id);' +
                'bTxtEnd = document.getElementById("bTxtEnd"+id);' +
                'bStart.setAttribute("y1", Number(bStart.getAttribute("original_y1"))+diff);' +
                'bStart.setAttribute("y2", Number(bStart.getAttribute("original_y2"))+diff);' +
                'bEnd.setAttribute("y1", Number(bEnd.getAttribute("original_y1"))+diff);' +
                'bEnd.setAttribute("y2", Number(bEnd.getAttribute("original_y2"))+diff);' +
                'bTxtStart.setAttribute("y", Number(bTxtStart.getAttribute("original_y"))+diff);' +
                'bTxtEnd.setAttribute("y", Number(bTxtEnd.getAttribute("original_y"))+diff);' +
                '}' +
                '}' +
                '}' +
                'function translateTicks(y){' +
                'var ticks = document.getElementsByClassName("resourceTick");' +
                'for(var i=0;i<ticks.length;i++){' +
                'ticks[i].setAttribute("y2", y+15);' +
                '}' +
                '}' +
                'function showAll(){' +
                'var currY = startYPos, original_y;' +
                'for(var i=0;i<gTags.length;i++){' +
                'if(gTags[i].getAttribute("type") === null){' +
                'continue;' +
                '}' +
                'gTags[i].setAttribute("visibility", "visible");' +
                'gTags[i].setAttribute("transform", "translate(0, "+currY+")");' +
                'original_y = gTags[i].getAttribute("original_y");' +
                'translateBoundaries(gTags[i], 0);' +
                'currY += 15;' +
                '}' +
                'translateTicks(currY);' +
                'document.getElementById("resourceSvg").setAttribute("height", currY+70);' +
                '}' +
                'function filter(filter){' +
                'if(filter === "All"){' +
                'showAll();' +
                'return;' +
                '};' +
                'var currY = startYPos, original_y;' +
                'for(var i=0;i<gTags.length;i++){' +
                'if(gTags[i].getAttribute("type") === null){' +
                'continue;' +
                'console.log("NULL");' +
                '}' +
                'if(gTags[i].getAttribute("type") === filter){' +
                'gTags[i].setAttribute("visibility", "visible");' +
                'gTags[i].setAttribute("transform", "translate(0, "+currY+")");' +
                'original_y = gTags[i].getAttribute("original_y");' +
                'translateBoundaries(gTags[i], currY-original_y);' +
                'currY += 15;' +
                '} else{' +
                'gTags[i].setAttribute("visibility", "hidden");' +
                '}' +
                '}' +
                'translateTicks(currY);' +
                'document.getElementById("resourceSvg").setAttribute("height", currY+70);' +
                '}' +
                'function setSvgHeight() {' +
                'y = 15;' +
                'for(var i=0;i<gTags.length;i++){' +
                'if(gTags[i].getAttribute("type") === null){' +
                'continue;' +
                '}' +
                'y += 15;' +
                '}' +
                'document.getElementById("resourceSvg").setAttribute("height", y+70);' +
                '}' +
                'window.onload = setSvgHeight;' +
                '</script>';
            perfInsightHtml += '</head><body style="min-width:' + PerfInsightView.RSvgWidth + '">';
            perfInsightHtml += PerfInsightView.addCSS();
            perfInsightHtml += PerfInsightView.addReportTitle(url);
            perfInsightHtml += '<div class="perfInsight" width= "100%" height= "100%" >\n';
            end = end > perfSummary.items.pageTimings.loadEventEnd - perfSummary.items.pageTimings.navigationStart ? end : perfSummary.items.pageTimings.loadEventEnd - perfSummary.items.pageTimings.navigationStart;
            if (perfSummary.items.pageTimings.loadEventEnd <= 0) {
                return perfInsightHtml + '</div>\n</body></html>';
            }
            perfInsightHtml += PerfInsightView.generateNavigationWaterfall(perfSummary.items.pageTimings, perfSummary.items.pageTimings.navigationStart, perfSummary.items.pageTimings.loadEventEnd, 12);
            perfInsightHtml += PerfInsightView.generateResourceWaterfall(perfSummary, start, end, count);
            perfInsightHtml += '</div>\n';
            perfInsightHtml += PerfInsightView.addFooter();
            return perfInsightHtml + '</body></html > ';
        };
        PerfInsightView.addCSS = function () {
            var css = '<style>' +
                '.perfInsight {' +
                'font-family: "Segoe UI", Arial, Helvetica, sans-serif;' +
                'font-size: 100%;' +
                'text-align: left;' +
                'color: #333;' +
                'line-height: 120%;' +
                'padding-bottom: 2px;' +
                'padding-top: 1px;' +
                'padding-left: 1px;' +
                'position: relative;' +
                'margin-bottom: 0;' +
                'overflow: auto;' +
                '}' +
                '.line {' +
                'position: relative;' +
                'margin-bottom: 0;' +
                'border-bottom: 2px solid #ccc;' +
                'height: 2px;' +
                'overflow: hidden;' +
                '}' +
                '#main p.inlineBlock {' +
                'margin-bottom: 0;' +
                'display: inline-block;' +
                '}' +
                '.ReportGenerationText {' +
                'font-family: "Segoe UI", Arial, Helvetica, sans-serif;' +
                'font-size: 140%;' +
                'text-align: left;' +
                'color: #999;' +
                'line-height: 120%;' +
                'padding-bottom: 2px;' +
                'padding-top: 1px;' +
                'position: relative;' +
                'margin-bottom: 0;' +
                'float: left;' +
                'padding-top: 5px;' +
                'margin-top: 20px;' +
                'margin-bottom: 20px;' +
                'width: 100%;' +
                '}' +
                '.PageLoaded {' +
                'font-family: "Segoe UI", Arial, Helvetica, sans-serif;' +
                'font-size: 200%;' +
                'text-align: left;' +
                'color: #999;' +
                'line-height: 120%;' +
                'padding-bottom: 2px;' +
                'position: relative;' +
                'margin-bottom: 10px;' +
                'width: 100%;' +
                'float: left;' +
                'margin-top: 10px;' +
                '}' +
                '.ReportHeader {' +
                'position: relative;' +
                'width: 95%;' +
                'height: 300px;' +
                'margin-bottom: 10px;' +
                'margin-bottom: 20px;' +
                'padding-left: 1px;' +
                '}' +
                '.ReportTitle {' +
                'font-family: "Segoe UI", Arial, Helvetica, sans-serif;' +
                'font-size: 400%;' +
                'text-align: left;' +
                'color: #0079cc;' +
                'line-height: 120%;' +
                'padding-bottom: 2px;' +
                'padding-top: 1px;' +
                'position: relative;' +
                'margin-bottom: 0;' +
                'width: 100%;' +
                'float: left;' +
                'display: inline-block;' +
                '}' +
                '.ExploratoryTestingLabel {' +
                'font-family: "Segoe UI", Arial, Helvetica, sans-serif;' +
                'padding-left: 1px;' +
                'font-size: 200%;' +
                'text-align: left;' +
                'color: #999;' +
                'line-height: 120%;' +
                'padding-bottom: 2px;' +
                'position: relative;' +
                'margin-top: 10px;' +
                'width: 100%;' +
                'float: left;' +
                'display: inline-block;' +
                '}' +
                '.TocTitleDiv {' +
                'position: relative;' +
                'top: 0px;' +
                'height: 60px;' +
                'width: 100%;' +
                'background: #eee;' +
                '}.TocHeader {' +
                'font-family: "Segoe UI Semibold", Arial, Helvetica, sans-serif;' +
                'font-size: 200%;' +
                'font-weight: bold;' +
                'text-align: left;' +
                'color: #0079cc;' +
                'line-height: 120%;' +
                'padding: 15px;' +
                'position: relative;' +
                '}.ReportEndText {' +
                'font-family: "Segoe UI Semibold", Arial, Helvetica, sans-serif;' +
                'font-size: 200%;' +
                'font-weight: bold;' +
                'text-align: left;' +
                'color: #0079cc;' +
                'position: relative;' +
                'margin-bottom: 0;' +
                'padding: 15px;' +
                '}' +
                '.GreyedTileFooterDiv {' +
                'position: relative;' +
                'margin-bottom: 0;' +
                'margin-top: 20px;' +
                'background-color: #eee;' +
                'width: 100%;' +
                'padding-top: 0px;' +
                'height: 60px;' +
                '}' +
                'caption, h2{' +
                'text-align: left' +
                '}.appCache:hover, .blocked:hover, .connect:hover, .crossDomainRed:hover, .dns:hover, .dnsN:hover, .domContentLoadEvent:hover, .domProcessing:hover, .networkServer:hover, .onLoadEvent:hover, .redirect:hover, .request:hover, .response:hover, .responseN:hover, .tcp:hover, .total:hover, .ttfb:hover, .unload:hover {' +
                '    opacity: .5' +
                '}' +
                'html, body, caption, h1, h2, h3, html, li, p, a, section, table, tbody, td, th, thead, tr, ul {' +
                'margin: 0;padding: 0;border: none;font: inherit;vertical-align: baseline' +
                '}' +
                'h3 {' +
                'font-weight: 700' +
                '}' +
                'body, html {' +
                'height: 100%' +
                '}' +
                'html {' +
                'font-size: 100.01%' +
                '}' +
                'body {' +
                'padding: 0 32px;' +
                'font-family: helvetica, arial, sans-serif;' +
                'font-size: 75% ;' +
                '}' +
                'h1 {' +
                'margin: 1em 0;font-size: 2em' +
                '}' +
                'caption, h2 {' +
                'margin: .7em 0;font-size: 1.4em' +
                '}' +
                'h3 {' +
                'display: inline' +
                '}' +
                'table {' +
                'border-collapse: collapse;' +
                'border: 1px solid #111' +
                '}' +
                'th{' +
                'padding:.5em 1em' +
                'font-weight: 700' +
                '}.background{background-color:#fff;' +
                'fill: #fff' +
                '}.background:hover {' +
                'background-color: #999;fill:#999;' +
                'opacity: .5' +
                '}.blocked {' +
                'fill: #FFE0D9;background-color: #FFE0D9;color: #000}' +
                '.connect,.dns,.redirect,.request,.response{' +
                'color: #fff' +
                '}.redirect {' +
                'fill: #DEEAF6;background-color: #DEEAF6' +
                '}.dns {' +
                'fill: #FEFCBA;background-color: #FEFCBA' +
                '}.connect {' +
                'fill: #CFC;background-color: #CFC' +
                '}.request {' +
                'fill: #D1A3FF;background-color: #D1A3FF' +
                '}.response {' +
                'fill: #ECD9FF;background-color: #ECD9FF' +
                '}.unload {' +
                'fill: #FB9FC6;background-color: #FB9FC6' +
                '}.tick {' +
                'stroke: #ccc' +
                '}.resource-detail {' +
                'position: absolute;visibility: hidden' +
                '}.crossDomainRed {' +
                'fill: #f3c;background-color: #f3c;color: #000' +
                '}.total{fill:#3BCCFF;background-color: #3BCCFF;color:#000' +
                '}.networkServer {' +
                'fill: #C8FFFF;background-color: #C8FFFF;color: #fff' +
                '}.tcp {' +
                'fill: #FEFCBA;background-color: #FEFCBA;color: #fff' +
                '}.appCache {' +
                'fill: #F7CAAC;background-color: #F7CAAC;color: #fff' +
                '}.ttfb {' +
                'fill: #CFC;background-color: #CFC;color: #fff' +
                '}.dnsN {' +
                'fill: #FCF;background-color: #FCF;color: #fff' +
                '}.domProcessing {' +
                'fill: #FCDF74;background-color: #FCDF74;color: #fff' +
                '}.domContentLoadEvent {' +
                'fill: #FCCC74;background-color: #FCCC74;color: #fff' +
                '}.onLoadEvent {' +
                'fill: #A8D08D;background-color: #A8D08D;color: #fff' +
                '}.responseN {' +
                'fill: #9CF;background-color:#9CF;color: #fff' +
                '}' +
                '</style>';
            return css;
        };
        PerfInsightView.generateResourceWaterfall = function (perfSummary, start, end, count) {
            PerfInsightView.RSvgHeight = (count + 1) * (PerfInsightView.barHeight + PerfInsightView.margin) + PerfInsightView.vShift;
            PerfInsightView.RBoundaries = "";
            PerfInsightView.setScale(start ? start : 0, end, false);
            for (var type in PerfInsightView.typesDict) {
                PerfInsightView.typesDict[type].done = false;
                PerfInsightView.typesDict[type].count = 0;
            }
            var resourceWaterfallHtml = '<div>\n' +
                '<div class="TocTitleDiv">\n' +
                '<div class="TocHeader">Resource Chart</div>\n' +
                '</div>\n' +
                '<div class="line"></div>' +
                '<div style="float:right;">\n' + PerfInsightView.addRTable() + '</div>\n' +
                '</div><br>\n';
            resourceWaterfallHtml += PerfInsightView.addSelectMenu(perfSummary) + '<br><br>';
            resourceWaterfallHtml += '<div style="margin-bottom:10px" class="resourceTimingChart">\n' +
                '<svg id="resourceSvg" width="100%" height="' + PerfInsightView.RSvgHeight + 'px">\n' +
                '<g transform="translate(950, 19)"><text style="font-weight: bold;">Time (ms) </text></g>' +
                '<g transform="translate(25, 19)"><text style="font-weight: bold;">Resources </text></g>' +
                '<g transform="translate(165, 19)"><text style="font-weight: bold;">Total Time (ms)</text></g>' +
                '<g transform="translate(250, 60)">';
            resourceWaterfallHtml += PerfInsightView.addNavigationChart(perfSummary.items.pageTimings, 0, PerfInsightView.barWidth, PerfInsightView.barHeight, "Navigations");
            var resourceIndex = 1;
            for (var resource in perfSummary.items) {
                if (resource !== "pageTimings" && resource !== "timestamp" && perfSummary.items[resource] && perfSummary.items[resource].intervals) {
                    var chartHtml = PerfInsightView.generateChart(perfSummary.items[resource], resourceIndex++, PerfInsightView.barWidth, PerfInsightView.barHeight, resource);
                    resourceWaterfallHtml += chartHtml;
                }
            }
            resourceWaterfallHtml += PerfInsightView.getTicks(false);
            resourceWaterfallHtml += '</g>\n</svg><hr style="width=' + (PerfInsightView.barWidth + 300) + '">\n</div>';
            return resourceWaterfallHtml;
        };
        PerfInsightView.generateNavigationWaterfall = function (pageTimings, start, end, count) {
            var rows = {
                total: ["Total", "0"],
                networkServer: ["Network/Server", "navigationStart"],
                crossDomainRedirect: ["Cross-Domain-Redirect", "navigationStart"],
                tcp: ["tcp", "connectStart"],
                appCache: ["App-Cache", "domainLookupStart"],
                dnsN: ["Dns", "domainLookupStart"],
                ttfb: ["Time to first Byte", "requestStart"],
                responseN: ["Response", "responseStart"],
                unload: ["Unload", "unloadEventStart"],
                domProcessing: ["DomProcessing", "domProcessingStart"],
                domContentLoadedEvent: ["DomContentLoaded", "domContentLoadedEventStart"],
                onLoadEvent: ["Load Event", "onLoadEventStart"]
            };
            PerfInsightView.NSvgWidth = PerfInsightView.barWidth + PerfInsightView.hShift;
            PerfInsightView.NSvgHeight = count * (PerfInsightView.barHeight + PerfInsightView.margin) + PerfInsightView.vShift;
            PerfInsightView.NBoundaries = "";
            PerfInsightView.setScale(start ? start : 0, end, true);
            var navigationWaterfallHtml = '<div>\n' +
                '\n<div class="TocTitleDiv">\n' +
                '<div class="TocHeader">Navigation Chart</div>\n' +
                '</div>\n' +
                '<div class="line"></div>' +
                '</div>\n' +
                '<div style="margin-bottom:10px;margin-top:20px" class="NavigationTimingChart">\n' +
                '<svg width="100%" height="' + PerfInsightView.NSvgHeight + 'px">' +
                '<g transform="translate(950, 19)"><text style="font-weight: bold;">Time (ms) </text></g>' +
                '<g transform="translate(25, 19)"><text style="font-weight: bold;">Navigations </text></g>' +
                '<g transform="translate(165, 19)"><text style="font-weight: bold;">Total Time (ms)</text></g>' +
                '<g transform="translate(250, 60)">';
            var resourceIndex = 0;
            for (var resourceName in rows) {
                if (rows[resourceName][1] === "0") {
                    navigationWaterfallHtml += PerfInsightView.generateNavigationChart(pageTimings, resourceIndex++, PerfInsightView.barWidth, PerfInsightView.barHeight, resourceName, rows[resourceName]);
                }
                if (pageTimings[resourceName] >= 0 && pageTimings[rows[resourceName][1]] >= 0) {
                    navigationWaterfallHtml += PerfInsightView.generateNavigationChart(pageTimings, resourceIndex++, PerfInsightView.barWidth, PerfInsightView.barHeight, resourceName, rows[resourceName]);
                }
            }
            navigationWaterfallHtml += PerfInsightView.getTicks(true);
            navigationWaterfallHtml += '</g></svg><hr style="width=' + (PerfInsightView.barWidth + 300) + '">\n</div>\n<br>';
            return navigationWaterfallHtml;
        };
        PerfInsightView.generateNavigationChart = function (pageTimings, index, barWidth, barHeight, resourceName, dependency) {
            var chartHtml;
            var yPos = index * (barHeight + 5);
            chartHtml = '<g transform="translate(0, ' + yPos + ')" style="opacity: 1">';
            chartHtml += '<rect x="-250" y="0" width="100%" height="' + barHeight + 'px" class="background"></rect>';
            if (index === 0) {
                chartHtml += PerfInsightView.generateNRect(index, pageTimings.navigationStart, pageTimings[resourceName], resourceName, barWidth, barHeight, yPos);
            }
            if (pageTimings[dependency[1]] >= 0) {
                chartHtml += PerfInsightView.generateNRect(index, pageTimings[dependency[1]], pageTimings[resourceName], resourceName, barWidth, barHeight, yPos);
            }
            chartHtml += '<text x="-250" y="10" class="resource-label">' + dependency[0] + '</text>';
            var charArray = new Array();
            for (var i = 0; i < PerfInsightView.totalTimeInLength; i++) {
                charArray.push("&nbsp;");
            }
            var totalTime = pageTimings[resourceName].toFixed(2);
            for (var i = totalTime.length - 1, j = PerfInsightView.totalTimeInLength - 1; i >= 0; i--, j -= 2) {
                charArray[j] = totalTime[i];
                charArray[j - 1] = "";
            }
            chartHtml += '<text x="-100" y="10" class="resource-label">' + charArray.join("") + ' </text>';
            return chartHtml + '</g>';
        };
        PerfInsightView.generateChart = function (perfData, index, barWidth, barHeight, resourceName) {
            var chartHtml;
            var yPos = index * (barHeight + 5);
            chartHtml = '<g visibility="visible" original_y="' + yPos + '" type="' + perfData.type + '" transform="translate(0, ' + yPos + ')" style="opacity: 1">';
            chartHtml += '<rect x="-250" y="0" width="100%" height="' + barHeight + 'px" class="background"><title>';
            if (perfData.intervals.requestStart > 0) {
                for (var key in perfData.intervals) {
                    chartHtml += key + '- ' + perfData.intervals[key] + ' ; ';
                }
            }
            else {
                chartHtml += 'Total duration- ' + (perfData.end - perfData.start).toString();
            }
            chartHtml += '</title></rect>';
            if (perfData.intervals.requestStart > 0) {
                chartHtml += PerfInsightView.generateRect(index, perfData.start, perfData.intervals.requestStartDelay, "blocked", barWidth, barHeight, yPos);
                chartHtml += PerfInsightView.generateRect(index, perfData.intervals.redirectStart, perfData.intervals.redirect, "redirect", barWidth, barHeight, yPos);
                chartHtml += PerfInsightView.generateRect(index, perfData.intervals.dnsLookupStart, perfData.intervals.dnsLookupTime, "dns", barWidth, barHeight, yPos);
                chartHtml += PerfInsightView.generateRect(index, perfData.intervals.connectStart, perfData.intervals.connectTime, "connect", barWidth, barHeight, yPos);
                chartHtml += PerfInsightView.generateRect(index, perfData.intervals.requestStart, perfData.intervals.request, "request", barWidth, barHeight, yPos);
                chartHtml += PerfInsightView.generateRect(index, perfData.intervals.reponseStart, perfData.intervals.response, "response", barWidth, barHeight, yPos);
            }
            else {
                chartHtml += PerfInsightView.generateRect(index, perfData.start, perfData.end - perfData.start, "response", barWidth, barHeight, yPos);
            }
            var name = perfData.name.length > 20
                ? perfData.name.substr(0, 10) + "....." + perfData.name.substr(-5, perfData.name.length)
                : perfData.name;
            chartHtml += '<text x="-250" y="10" class="resource-label">' + name + '<title>' + resourceName + '</title></text>';
            var charArray = new Array();
            for (var i = 0; i < PerfInsightView.totalTimeInLength; i++) {
                charArray.push("&nbsp;");
            }
            var totalTime = perfData.totalDuration.toFixed(2);
            for (var i = totalTime.length - 1, j = PerfInsightView.totalTimeInLength - 1; i >= 0; i--, j -= 2) {
                charArray[j] = totalTime[i];
                charArray[j - 1] = "";
            }
            chartHtml += '<text x="-100" y="10" class="resource-label">' + charArray.join("") + ' </text>';
            return chartHtml + '</g>';
        };
        PerfInsightView.addNavigationChart = function (pageTimings, index, barWidth, barHeight, name) {
            var rows = {
                networkServer: ["NW/Server", "navigationStart"],
                crossDomainRedirect: ["Cross-Domain-Redirect", "navigationStart"],
                tcp: ["TCP", "connectStart"],
                appCache: ["AppCache", "domainLookupStart"],
                dnsN: ["DNS", "domainLookupStart"],
                ttfb: ["Time to first Byte", "requestStart"],
                responseN: ["Response", "responseStart"],
                unload: ["Unload", "unloadEventStart"],
                domProcessing: ["DomProcessing", "domProcessingStart"],
                domContentLoadedEvent: ["DomContentLoaded", "domContentLoadedEventStart"],
                onLoadEvent: ["Load Event", "onLoadEventStart"]
            };
            var chartHtml;
            var yPos = index * (barHeight + PerfInsightView.margin);
            chartHtml = '<g transform="translate(0, ' + yPos + ')" style="opacity: 1">';
            chartHtml += '<rect x="-250" y="0" width="100%" height="' + barHeight + 'px" class="background"><title>Total Time ' + pageTimings.total + '</title></rect>';
            for (var resourceName in rows) {
                if (rows[resourceName][1] === "0") {
                    chartHtml += PerfInsightView.generateRect(index, 0, pageTimings[resourceName], resourceName, barWidth, barHeight, yPos);
                }
                if (pageTimings[resourceName] >= 0 && pageTimings[rows[resourceName][1]] >= 0) {
                    chartHtml += PerfInsightView.generateRect(index, pageTimings[rows[resourceName][1]] - pageTimings.navigationStart, pageTimings[resourceName], resourceName, barWidth, barHeight, yPos);
                }
            }
            chartHtml += '<text x="-250" y="10" class="resource-label">' + name + '<title>Page Navigation Timings</title></text>';
            var charArray = new Array();
            for (var i = 0; i < PerfInsightView.totalTimeInLength; i++) {
                charArray.push("&nbsp;");
            }
            var totalTime = pageTimings.total.toFixed(2);
            for (var i = totalTime.length - 1, j = PerfInsightView.totalTimeInLength - 1; i >= 0; i--, j -= 2) {
                charArray[j] = totalTime[i];
                charArray[j - 1] = "";
            }
            chartHtml += '<text x="-100" y="10" class="resource-label">' + charArray.join("") + ' </text>';
            return chartHtml + '</g>';
        };
        PerfInsightView.generateRect = function (index, start, timing, type, barWidth, barHeight, yPos) {
            var rectHtml = "";
            if (start >= 0) {
                var x = (start) * PerfInsightView.RScale;
                var x2 = x + timing * PerfInsightView.RScale;
                var end = start + timing;
                var id = type;
                type = type === "responseN" || type === "dnsN" ? type.substr(0, type.length - 1) : type;
                rectHtml = '<rect onmouseover="showB(this)" onmouseout="hideB(this)" id="' + id + index + '" x="' + x + '" y="0" width="' + timing * PerfInsightView.RScale + '" height="' + barHeight + '" class="resourceRect ' + type + '"><title>' + type + '- ' + timing + '</title></rect>';
                PerfInsightView.RBoundaries += '<line class="boundaryStart" stroke="blue" visibility="hidden" id="bStart' + id + index + '" x1="' + x + '" x2="' + x + '" y1="' + (yPos + 10) + '" y2="' + (yPos - 8) + '" original_y1="' + (yPos + 10) + '" original_y2="' + (yPos - 8) + '"></line>';
                PerfInsightView.RBoundaries += '<text fill="blue" visibility="hidden" id="bTxtStart' + id + index + '" x="' + x + '" y="' + (yPos - 10) + '" dy="-3" text-anchor="middle" original_y="' + (yPos - 10) + '">' + start.toFixed(0) + '</text>';
                PerfInsightView.RBoundaries += '<line class="boundaryEnd" stroke="blue" visibility="hidden" id="bEnd' + id + index + '" x1="' + x2 + '" x2="' + x2 + '" y1="' + (yPos + 10) + '" y2="' + (yPos + 25) + '" original_y1="' + (yPos + 10) + '" original_y2="' + (yPos + 25) + '"></line>';
                PerfInsightView.RBoundaries += '<text fill="blue" visibility="hidden" id="bTxtEnd' + id + index + '" x="' + x2 + '" y="' + (yPos + 30) + '" dy="+5" text-anchor="middle" original_y="' + (yPos + 30) + '">' + end.toFixed(0) + '</text>';
                PerfInsightView.currX += timing * PerfInsightView.RScale;
            }
            return rectHtml;
        };
        PerfInsightView.generateNRect = function (index, start, timing, type, barWidth, barHeight, yPos) {
            var rectHtml = "";
            if (start > 0) {
                var x = (start - PerfInsightView.NStartMs) * PerfInsightView.NScale;
                var x2 = x + timing * PerfInsightView.NScale;
                var end = start - PerfInsightView.NStartMs + timing;
                var id = type;
                type = type === "responseN" || type === "dnsN" ? type.substr(0, type.length - 1) : type;
                rectHtml = '<rect onmouseover="showB(this)" onmouseout="hideB(this)" id="' + id + index + '" x="' + x + '" y="0" width="' + timing * PerfInsightView.NScale + '" height="' + barHeight + '" class="navigationRect ' + type + '"><title>' + type + '- ' + timing + '</title></rect>';
                PerfInsightView.NBoundaries += '<line class="boundaryStart" stroke="blue" visibility="hidden" id="bStart' + id + index + '" x1="' + x + '" x2="' + x + '" y1="' + (yPos + 10) + '" y2="' + (yPos - 8) + '"></line>';
                PerfInsightView.NBoundaries += '<text fill="blue" visibility="hidden" id="bTxtStart' + id + index + '" x="' + x + '" y="' + (yPos - 10) + '" dy="-3" text-anchor="middle">' + (start - PerfInsightView.NStartMs).toFixed(0) + '</text>';
                PerfInsightView.NBoundaries += '<line class="boundaryEnd" stroke="blue" visibility="hidden" id="bEnd' + id + index + '" x1="' + x2 + '" x2="' + x2 + '" y1="' + (yPos + 10) + '" y2="' + (yPos + 25) + '"></line>';
                PerfInsightView.NBoundaries += '<text fill="blue" visibility="hidden" id="bTxtEnd' + id + index + '" x="' + x2 + '" y="' + (yPos + 30) + '" dy="+5" text-anchor="middle">' + end.toFixed(0) + '</text>';
                PerfInsightView.currX += timing * PerfInsightView.RScale;
            }
            return rectHtml;
        };
        // Finding the range of the milliseconds to plot and calculating the scale in pixels/millisecond
        PerfInsightView.setScale = function (start, end, isNavigation) {
            if (isNavigation) {
                PerfInsightView.NStartMs = start;
                PerfInsightView.NEndMs = end - (end % 10) + 100;
                PerfInsightView.NScale = PerfInsightView.barWidth / (PerfInsightView.NEndMs - PerfInsightView.NStartMs);
            }
            else {
                PerfInsightView.RStartMs = 0;
                PerfInsightView.REndMs = end - (end % 10) + 100;
                PerfInsightView.RScale = PerfInsightView.barWidth / (PerfInsightView.REndMs - PerfInsightView.RStartMs);
            }
        };
        PerfInsightView.getTicks = function (isNavigation) {
            var ticksHtml, x, y, steps, i;
            if (isNavigation) {
                ticksHtml = '<g transform="translate(0, -6)">';
                steps = Number(((PerfInsightView.NEndMs - PerfInsightView.NStartMs) / 10));
                for (i = 0; i <= (PerfInsightView.NEndMs - PerfInsightView.NStartMs); i += steps) {
                    x = i * PerfInsightView.NScale;
                    y = PerfInsightView.NSvgHeight - 30;
                    ticksHtml += '<line x1="' + x + '" x2="' + x + '" y1="0px" y2="' + y + '" class="tick"></line>';
                    ticksHtml += '<text x="' + x + '" y="0" dy="-3" text-anchor="middle">' + i.toFixed(0) + '</text>';
                }
                if ((i - steps) < (PerfInsightView.NEndMs - PerfInsightView.NStartMs)) {
                    x = i * PerfInsightView.NScale;
                    y = PerfInsightView.NSvgHeight - 30;
                    ticksHtml += '<line x1="' + x + '" x2="' + x + '" y1="0px" y2="' + y + '" class="tick"></line>';
                    ticksHtml += '<text x="' + x + '" y="0" dy="-3" text-anchor="middle">' + i.toFixed(0) + '</text>';
                }
                return ticksHtml + PerfInsightView.NBoundaries + '</g>';
            }
            ticksHtml = '<g transform="translate(0, -6)">';
            steps = Number(((PerfInsightView.REndMs - PerfInsightView.RStartMs) / 10));
            for (i = PerfInsightView.RStartMs; i <= PerfInsightView.REndMs; i += steps) {
                x = (i - PerfInsightView.RStartMs) * PerfInsightView.RScale;
                y = PerfInsightView.RSvgHeight + 30;
                ticksHtml += '<line x1="' + x + '" x2="' + x + '" y1="0px" y2="' + y + '" class="tick resourceTick"></line>';
                ticksHtml += '<text x="' + x + '" y="0" dy="-3" text-anchor="middle">' + i.toFixed(0) + '</text>';
            }
            if ((i - steps) < PerfInsightView.REndMs) {
                x = i * PerfInsightView.NScale;
                y = PerfInsightView.NSvgHeight - 30;
                ticksHtml += '<line x1="' + x + '" x2="' + x + '" y1="0px" y2="' + y + '" class="tick"></line>';
                ticksHtml += '<text x="' + x + '" y="0" dy="-3" text-anchor="middle">' + i.toFixed(0) + '</text>';
            }
            return ticksHtml + PerfInsightView.RBoundaries + '</g>';
        };
        PerfInsightView.addRTable = function () {
            var tableHtml = '<br><br>' +
                '\n<table style="margin:0 auto;text-align:center;padding:0;margin-bottom:10px;">\n' +
                '<thead>' +
                '<tr>' +
                '<td width="16.67%" style="padding:0;background-color:#FFE0D9">Blocked</td>' +
                '<td width="16.67%" style="padding:0;background-color:#DEEAF6">Redirect</td>' +
                '<td width="16.67%" style="padding:0;background-color:#FEFCBA">DNS</td>' +
                '<td width="16.67%" style="padding:0;background-color:#CCFFCC">Connect</td>' +
                '<td width="16.67%" style="padding:0;background-color:#D1A3FF">Request</td>' +
                '<td width="16.67%" style="padding:0;background-color:#ECD9FF">Response</td>' +
                '</tr>' +
                '</thead>' +
                '\n</table>\n';
            return tableHtml;
        };
        PerfInsightView.addNTable = function () {
            var tableHtml = '<br><br>' +
                '<table style="margin:0 auto;text-align:center;padding:0;margin-bottom:10px;">' +
                '<thead>' +
                '<tr>' +
                '<td width="9.09%" style="padding:0;background-color:#C8FFFF">NW/Server</td>' +
                '<td width="9.09%" style="padding:0;background-color:#ff33cc">Cross-Domain-Redirect</td>' +
                '<td width="9.09%" style="padding:0;background-color:#FEFCBA">TCP</td>' +
                '<td width="9.09%" style="padding:0;background-color:#F7CAAC">AppCache</td>' +
                '<td width="9.09%" style="padding:0;background-color:#FFCCFF">DNS</td>' +
                '<td width="9.09%" style="padding:0;background-color:#CCFFCC">Time to first Byte</td>' +
                '<td width="9.09%" style="padding:0;background-color:#99CCFF">Response</td>' +
                '<td width="9.09%" style="padding:0;background-color:#FB9FC6">Unload</td>' +
                '<td width="9.09%" style="padding:0;background-color:#FCDF74">DomProcessing</td>' +
                '<td width="9.09%" style="padding:0;background-color:#FCCC74">DomContentLoad</td>' +
                '<td width="9.09%" style="padding:0;background-color:#A8D08D">Load Event</td>' +
                '</tr>' +
                '</thead>' +
                '</table>';
            return tableHtml;
        };
        PerfInsightView.addSelectMenu = function (perfSummary) {
            var totalResources = 0;
            for (var resource in perfSummary.items) {
                if (resource !== "pageTimings" && resource !== "timestamp" && perfSummary.items[resource] && perfSummary.items[resource].intervals && perfSummary.items[resource].intervals.requestStart >= 0 && perfSummary.items[resource].type) {
                    PerfInsightView.typesDict[perfSummary.items[resource].type.split(' ')[0]].done = true;
                    PerfInsightView.typesDict[perfSummary.items[resource].type.split(' ')[0]].count++;
                    totalResources++;
                }
            }
            var menuHtml = '<br><select style="margin-top:10px" onchange="filter(this.value)">';
            menuHtml += '<option value="All" title="' + totalResources + '">All</option>';
            for (var type in PerfInsightView.typesDict) {
                if (PerfInsightView.typesDict[type].done) {
                    menuHtml += '<option value="' + PerfInsightView.typesDict[type].name + '" title="' + PerfInsightView.typesDict[type].count + '">' + PerfInsightView.typesDict[type].name + '</option>';
                }
            }
            return menuHtml + '</select>';
        };
        PerfInsightView.addFooter = function () {
            var footerBranding = Utility_1.BrandingChangesHelper.getFooterBrandingPerfPage();
            var footerHtml = '<div class="ReportGenerationText">' +
                '<p class="inlineBlock">' +
                'This page load report was generated using <a style="color:0079cc" href="http://aka.ms/xtmarketplace">' + Utils.ResourceUtilityService.GetProductNameWithExtensionMessage() + '</a> for <a style="color:0079cc" href="https://visualstudio.com">' +
                footerBranding + '<a style="color:0079cc" href="http://aka.ms/xtlearn">Learn more</a>' +
                '</p>';
            footerHtml += '<div class="GreyedTileFooterDiv">' +
                '<div class="ReportEndText">' +
                '<p>' +
                'End of report.' +
                '</p>' +
                '</div>' +
                '</div>' +
                '<div class="line"></div>';
            return footerHtml + '</div>';
        };
        PerfInsightView.addReportTitle = function (url) {
            var title = '<div class="ReportTitle">\n' +
                '<p class="inlineBlock">' +
                'Page Load Report' +
                '</p>' +
                '</div>\n';
            var trimmedUrl = url.length > 123 ? url.substr(0, 123) + '...' : url;
            var subTitle = 
            // Contains XT icon and page loaded URL
            '<div class="ExploratoryTestingLabel">\n' +
                '<p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAkCAYAAAAKNyObAAAIYUlEQVRYR+1YfXBU1RW/977dL' +
                'KkhbULTFgTKRJSY/Yg2rSNFnEw7Tlu1DnaMlewmxMLASCC7RP/oOLYsjBVGxWQ3JANBJU12ozYw004/xtoPY6dTi5ha9iMIYUaQqh' +
                '1pCQ0Bk82+d/s7b/dmN58kzMhfvpk7++59997zO+f8zj3nLmczPpLT55qSlkLDqu/D6wo0iWaOp9/VDmrMHEdn1OB8dzhSf8jP/ALNm' +
                'FnW5K/ZG076WlHht/T0+JPVzmCtZPLgXDfH/JOhqBcKEVZOSs3pmRFcSuPtsqas5UbD0A9h8vWQMB8SNDQdNvyfKY2b1pyHdl1a+kX8' +
                'DgNPMBTxPfWpWC5bzUq7PyfXkl9kGNoRjF9PVhGj2jdljqYN658kbZplPZPy6TTWBp3ltHdFNw/MyVQTJs9oOTVXaU6/p5wF72F8KV' +
                'ofXGZXczzO4Ca4j3gJjHx9OFb/4sby/da23k2jVwtwVuBSnGGsdlm7TZ9/8ST4twTd46FovX1jeZulrXcj8XIzfLvXBMfkxnDU+3xFxQ' +
                '6NOHsNwHG5dXnQdiGX9WfAeUtV0LhdTZu55C0ZcL4D6ttn4D6zXBYH5hAQXNYuOzhvfEBMzTlsuqkz6m27ppwjYYvPF5xCOH5VHSVTBg' +
                'RntUhbHdckWscyhT24xBAsCmCUJfopNWVSXKBOHSWc8z2dkfrHKit/oXV3P6h/qtGqhHicgVcg6MG0sDDAedRBW2VvvEUI8Ta+EVWGpS' +
                'ErwnHfUQKvwFX0MIPSIfXJquavOTZ1UXBFzilgbmfz9zgzfof9qLoYMpKaq+v4ljNk1XhlKScLIUs04wjekgIj94+ULKqbjeVSMiqx7/ji' +
                '4ArgJPezHfzD8oXzLidGjkHgDWQZyfk2cKop47ZUBqksb8u3jQwfZYJ1WQbzd7effnh4bfmzX9QSOd/B2jthsmLOZS44O4L397Hkb7rUX' +
                '3059uhZc/0EGswIbsydjuDPAOlx2gALes8uGLi9qKhUTqVtlbO1gBK+Gdl5g08A9gYs+/IMvLuAPTsZz3myM/LIx9kApwWnkv26sufsuqH1' +
                'YnOr6SzOV8Fqf5+K7GOR62x2ggJhTHdOAPUR+gPQ8DpYbzHeTd6llOZndUOu64p7X1d7TwsuEwTB1wGpIkUj1hqKeeumAqaUqXYFHFLKP0H' +
                'cl9JyLyB6XwChDklpOSHYaCMU3ActL2HD+1EKopphi9JzR1DR3IeK5jWSMSU4JXx8BSw/tlqEYyhx3iwwzxWZgcGUe4mb8fKF822JEUSs' +
                'XJ4W9gbT9Q2hvoZTykJuZ1OV1bD+uT1e928aqynZu8Cw6HthuofQpT0HLZpxa/s/fWcmgSML0KIztxYuGE0aMVigCN0kirR7QjHfHya4yexm' +
                'lGlqlIz7FDDLxfzvUlDQcbOo9yM9dYykIlJRgLh5aeEAz7mk7ceX6rSHDsNDD0wCN+ZOV+B5uHE9aYNJF2CNvXCFZnBpbg4NDKgpOBP/Ql23' +
                '/yHHniUWbjmOT7loA0mLcL38ztYPx6cwySvtO6zdcX+C9nA7mn7IOF8rmfXhvBxt6HJiGMZgN5JMwYzV48ApYFXOpjsF4z1pM5Mlp49qyTtCsf' +
                'p1HkfgMcx6hoTCetvD0fqdE4Epq1WVBW/TpPwJ1LwXfLwP2eTXtM7jaqqBAX5O7wiQA1lCoVVlt2B9fZpNFNBJT5FGHDDdjGdiRUt9C8i9lq' +
                '5/yB6/Qf9utIQw2E0dce/7mYtN6vblublxIbNorYC/xtyRsxdCEe8GpUTlyudybUPitBlMkvWPgctkgsCPMbgLSyknjoV6GmD2j3l/BbiVdLQA' +
                'HA5p5kI7KYT2/aQhznVFHwEdiJPd4ty5Pr74vwV/hdD3AOobGP4CLkgrit/9j3kJituLPpfLkoXgUBjf78DQsAlOJfZ1juZinUsSQryhb9O5' +
                'U12spc5E6UvRre8CHEXkDSD1W7DTaXDpl6FI/Ut0ayOOgV+PwoXPGhq7ietwHTdC4YivVeXmmrLAHYbO6iAxP+0B4nom2tKuuWcWVqNlKYDcKA' +
                '9Ftv0Da+Pol4Jv8Q8WnL+FLjYqZ1bd3LJUWHQiex7aIBbuwgVod/Z9Vr1jn9cw5y60BHiWKmvcruADCMTuWQIjcKbbQcg1HVHvr7DpH9H/NtqQE' +
                'HpJx7GGD7KqmTcwvhqgWmVSe0YVDJlqJMVJOlaS8wdPYO5SyhhI7H7Rv7wwT+SyGG5VlFLIIioICMR0jxkQOOF3our1u52BndjwiZRJ6Wro' +
                'O0DJrtoR+JHkwiMEa+g4Vv9OtqfUxsrCbkfzXSgMfp/GcNh0K7Teg5+GOVhtzHJ4OYK67naUVJRPSbgAulMFw9w58nmb8clIoqwztpWi3zysKT' +
                'B6erbD6qo8klxVzMDxF0yjYIDO/F5e42xcaTBBZqfInCkIprIgWdkA724j3uHuehjh+wNzYvqYoFci/UBxgTG+tksfXfhu0soZ/CkQ7UhZnr+ZKPnK' +
                'al7tDLwNCeWmkNm5Mxtk6riRzEw3OERXQOOjGKM/dASYtM86mL+NUhgtIgqdLCv8OjMs/dn/o2QBI6pocO3KzojvCIcpL2PALIeu8kkpJfkaZIrfep' +
                'yNOGDFobQXiLvHwMGnE4bxane84bzbFegQhrGLiSSKTdu3kCVAJ7PqMRWF67aAwy1mVYIq4SCIXHuVwLKXjeLesIruDW5H4H7OGaUhugipB' +
                '7Ucp0jEIwn0MjT6Q0g9SQDzKWDkam6Gb97gFvDza1RJcoFt5/hISTUAt4LiJ7Sh/CfJjW57sBSOfQqbUUq7gmd4j2D64x3RbW/OqhKeI76s6SmiK/J7' +
                'HI0VyBao1fgqTCpGs6HR32J0h3gLhekr4ZiP8vKkO8T/AUdXecW4X2hcAAAAAElFTkSuQmCC" style="vertical-align: sub"> ' + Utils.ResourceUtilityService.GetProductNameMessage() +
                '</img></p>' +
                '<p style="margin-top:50px"> \n' +
                'Page loaded: <a target="_blank" href="' + url + '" style="color:#0079cc" title="' + url + '">' + trimmedUrl + '</a>' +
                '</p\n><br>' +
                '</div>\n';
            return title + subTitle;
        };
        PerfInsightView.hShift = 300;
        PerfInsightView.vShift = 75;
        PerfInsightView.margin = 5;
        PerfInsightView.totalTimeInLength = 20;
        PerfInsightView.typesDict = {
            Image: { name: 'Image', done: false, count: 0 },
            JavaScript: { name: 'JavaScript', done: false, count: 0 },
            Php: { name: 'Php', done: false, count: 0 },
            Style: { name: 'Style Sheet', done: false, count: 0 },
            Flash: { name: 'Flash', done: false, count: 0 },
            Font: { name: 'Font', done: false, count: 0 },
            Video: { name: 'Video', done: false, count: 0 },
            Source: { name: 'Source Map', done: false, count: 0 },
            XHR: { name: 'XHR', done: false, count: 0 },
            Object: { name: 'Object resource', done: false, count: 0 },
            SVG: { name: 'SVG', done: false, count: 0 },
            Link: { name: 'Link', done: false, count: 0 },
            Html: { name: 'Html', done: false, count: 0 },
            Script: { name: 'Script resource', done: false, count: 0 },
            CSS: { name: 'CSS resource', done: false, count: 0 },
            Embed: { name: 'Embed resource', done: false, count: 0 },
            Doc: { name: 'Doc', done: false, count: 0 },
            Manifest: { name: 'Manifest', done: false, count: 0 },
            Other: { name: 'Other Request', done: false, count: 0 }
        };
        return PerfInsightView;
    })();
    exports.PerfInsightView = PerfInsightView;
});
//# sourceMappingURL=PerfDataInsightViewService.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Model/ModelHelper',["require", "exports", "../Model/Model", "../Common/SessionData", "../Common/ExtensionStorage", "../Messaging/ChromeMessaging", "../Messaging/Messaging", "../Model/BrowserActionService", "../Model/PerfDataInsightViewService", "../Common/Constants", "../Common/ResourceHelper"], function (require, exports, Model, SessionData, ExtensionStorage, ChromeMessaging, Messaging, BrowserAction, PerfDataInsightViewService, Constants, RS) {
    var SystemInformation = SessionData.SystemInformation;
    var Screenshot = SessionData.Screenshot;
    var Note = SessionData.Note;
    var Video = SessionData.Video;
    var PerfData = SessionData.PerfData;
    var ActionLog = SessionData.ActionLog;
    var LocalStorageService = ExtensionStorage.LocalStorageService;
    var AttachmentConverter = (function () {
        function AttachmentConverter() {
        }
        AttachmentConverter.getAttachment = function (data) {
            var attachment;
            if (data instanceof Screenshot) {
                attachment = {
                    url: data.id, name: data.name, length: data.size,
                    state: Model.AttachmentState.Created, getContent: this.getContentFunction(data.id, data.isXTSession ? true : false), type: Model.AttachmentType.Screenshot,
                    source: data.source, timeStamp: new Date()
                };
            }
            else if (data instanceof SystemInformation) {
                attachment = {
                    url: data.id, name: data.id, length: data.size,
                    state: Model.AttachmentState.Created, getContent: this.getContentFunction(data.id), type: Model.AttachmentType.SystemInformation, timeStamp: new Date()
                };
            }
            else if (data instanceof Note) {
                attachment = {
                    url: data.id, name: data.id, length: data.size, timeStamp: new Date(),
                    state: Model.AttachmentState.Created, getContent: this.getContentFunction(data.id), type: Model.AttachmentType.Note
                };
            }
            else if (data instanceof Video) {
                attachment = {
                    url: data.id, name: data.id, length: data.size, timeStamp: new Date(),
                    state: Model.AttachmentState.Created, getContent: this.getContentFunction(data.id, data.isXTSession ? true : false), type: Model.AttachmentType.Video
                };
            }
            else if (data instanceof PerfData) {
                var perfData = JSON.parse(data.content);
                var perfInsights = PerfDataInsightViewService.PerfInsightView.getInsightView(perfData);
                var blob = new Blob([perfInsights], { type: 'application/json' });
                ExtensionStorage.PersistentStorageFactory.getStorageService().writeBlob(data.id, blob, function () { }, function () { });
                attachment = {
                    url: data.id, name: data.id, length: data.size, timeStamp: new Date(),
                    state: Model.AttachmentState.Created, getContent: this.getPerfDataContentFunction(data.id, perfInsights), type: Model.AttachmentType.PerfData
                };
            }
            else if (data instanceof ActionLog) {
                attachment = {
                    url: data.id, name: data.id, length: data.size, timeStamp: new Date(),
                    state: Model.AttachmentState.Created, getContent: this.getActionLogContentFunction(data.id, data.content, data.isXTSession ? true : false), type: Model.AttachmentType.ActionLog
                };
            }
            return attachment;
        };
        AttachmentConverter.getContentFunction = function (fileName, storeUnderXTSession) {
            if (storeUnderXTSession === void 0) { storeUnderXTSession = true; }
            return function (onSuccess) {
                ExtensionStorage.PersistentStorageFactory.getStorageService().getBlob(fileName, function (file) {
                    onSuccess(file);
                }, function (error) { console.log(error); }, storeUnderXTSession);
            };
        };
        AttachmentConverter.getActionLogContentFunction = function (fileName, fileContent, storeUnderXTSession) {
            if (storeUnderXTSession === void 0) { storeUnderXTSession = true; }
            return function (onSuccess) {
                var blob = new Blob([fileContent], { type: 'text/plain' });
                var file = new File([blob], fileName);
                onSuccess(file);
            };
        };
        AttachmentConverter.getPerfDataContentFunction = function (fileName, fileContent) {
            return function (onSuccess) {
                var blob = new Blob([fileContent], { type: 'application/json' });
                // file object is not defined in edge , IE , safari
                var file = blob;
                onSuccess(file);
            };
        };
        return AttachmentConverter;
    })();
    exports.AttachmentConverter = AttachmentConverter;
    function sendMessage(messagType, data, rootScope) {
        // using angular framework to communicate between controllers in popup
        if (rootScope) {
            rootScope.$emit(messagType.toString(), data);
        }
        else {
            ChromeMessaging.MessagingFactory.getBroadcastingService().broadcast(messagType, data);
        }
    }
    exports.sendMessage = sendMessage;
    function getTabId(windowId) {
        var d = Q.defer();
        var options = { windowId: windowId };
        chrome.tabs.query(options, function (tabs) {
            d.resolve(tabs[0].id);
        });
        return d.promise;
    }
    exports.getTabId = getTabId;
    /* Converts chrome extension local image urls to data url. */
    function convertToDataUrl(url, callback, outputFormat) {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement("CANVAS");
            var ctx = canvas.getContext("2d");
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            var dataUrl = canvas.toDataURL(outputFormat);
            callback(dataUrl);
        };
        img.src = url;
    }
    exports.convertToDataUrl = convertToDataUrl;
    var ErrorHelper = (function () {
        function ErrorHelper() {
        }
        ErrorHelper.getError = function (toolbarType) {
            var toolBarErrorMap = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.toolbarErrorMap);
            if (!toolBarErrorMap) {
                return null;
            }
            var toolbarPaneErrors = toolBarErrorMap[toolbarType];
            if (!toolbarPaneErrors || toolbarPaneErrors.length === 0) {
                return null;
            }
            return toolbarPaneErrors.pop();
        };
        ErrorHelper.saveError = function (error, toolbarType, errorLevel, sticky, showNotification, rootScope) {
            if (errorLevel === void 0) { errorLevel = 0; }
            if (sticky === void 0) { sticky = true; }
            if (showNotification === void 0) { showNotification = true; }
            if (!error) {
                return;
            }
            var toolBarErrorMap = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.toolbarErrorMap);
            if (!toolBarErrorMap) {
                toolBarErrorMap = new Object();
            }
            var toolbarPaneErrors = toolBarErrorMap[toolbarType];
            if (!toolbarPaneErrors) {
                toolbarPaneErrors = [];
            }
            var errorMessage = this.getErrorMessage(error);
            if (!errorMessage) {
                return;
            }
            else {
                errorMessage = errorMessage.trim();
            }
            if (errorMessage.indexOf("404") === 0) {
                errorMessage = ErrorHelper.GetNotSupportedTfsErrorMessage();
            }
            var errorCode = error.status;
            toolbarPaneErrors.push({ errorCode: errorCode, errorMessage: errorMessage, errorLevel: errorLevel, sticky: sticky, showNotification: showNotification });
            toolBarErrorMap[toolbarType] = toolbarPaneErrors;
            LocalStorageService.store(ExtensionStorage.toolbarErrorMap, toolBarErrorMap);
            sendMessage(Messaging.NotificationType.ActivityErrorChanged, { toolbarType: toolbarType, errorMessage: errorMessage, errorLevel: errorLevel, showNotification: showNotification }, rootScope);
            if (errorLevel === 0) {
                BrowserAction.getService().setIcon(BrowserAction.ExtensionIconType.Error);
            }
        };
        ErrorHelper.clearLastError = function (toolbarType, rootScope) {
            var toolBarErrorMap = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.toolbarErrorMap);
            if (!toolBarErrorMap) {
                return;
            }
            var toolbarPaneErrors = toolBarErrorMap[toolbarType];
            if (!toolbarPaneErrors || toolbarPaneErrors.length === 0) {
                return;
            }
            //remove the last error
            //TODO: change this based on error exp later
            toolbarPaneErrors.pop();
            toolBarErrorMap[toolbarType] = toolbarPaneErrors;
            LocalStorageService.remove(ExtensionStorage.toolbarErrorMap);
            LocalStorageService.store(ExtensionStorage.toolbarErrorMap, toolBarErrorMap);
            var errorMessage = null;
            var errorLevel;
            var showNotification;
            if (toolbarPaneErrors.length > 0) {
                var errorDetail = toolbarPaneErrors.pop();
                errorMessage = errorDetail.errorMessage;
                errorLevel = errorDetail.errorLevel;
                showNotification = errorDetail.showNotification;
            }
            else {
                BrowserAction.getService().clearError();
            }
            sendMessage(Messaging.NotificationType.ActivityErrorChanged, { toolbarType: toolbarType, errorMessage: errorMessage, errorLevel: errorLevel, showNotification: showNotification }, rootScope);
        };
        ErrorHelper.clearNonStickyErrors = function (toolbarType, rootScope) {
            var toolBarErrorMap = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.toolbarErrorMap);
            if (!toolBarErrorMap) {
                return;
            }
            var toolbarPaneErrors = toolBarErrorMap[toolbarType];
            if (!toolbarPaneErrors || toolbarPaneErrors.length === 0) {
                return;
            }
            var stickyToolbarPaneErrors = [];
            for (var errorIndex in toolbarPaneErrors) {
                var error = toolbarPaneErrors[errorIndex];
                if (error.sticky) {
                    stickyToolbarPaneErrors.push(error);
                }
            }
            toolBarErrorMap[toolbarType] = stickyToolbarPaneErrors;
            LocalStorageService.store(ExtensionStorage.toolbarErrorMap, toolBarErrorMap);
            var errorMessage = null;
            var errorLevel;
            var showNotification;
            if (stickyToolbarPaneErrors.length > 0) {
                var errorDetail = stickyToolbarPaneErrors.pop();
                errorMessage = errorDetail.errorMessage;
                errorLevel = errorDetail.errorLevel;
                showNotification = errorDetail.showNotification;
            }
            else {
                BrowserAction.getService().clearError();
            }
            sendMessage(Messaging.NotificationType.ActivityErrorChanged, { toolbarType: toolbarType, errorMessage: errorMessage, errorLevel: errorLevel, showNotification: showNotification }, rootScope);
        };
        ErrorHelper.clearAllErrors = function (toolbarType, rootScope) {
            var toolBarErrorMap = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.toolbarErrorMap);
            if (!toolBarErrorMap) {
                return;
            }
            var toolbarPaneErrors = toolBarErrorMap[toolbarType];
            if (!toolbarPaneErrors || toolbarPaneErrors.length === 0) {
                return;
            }
            toolBarErrorMap[toolbarType] = [];
            LocalStorageService.store(ExtensionStorage.toolbarErrorMap, toolBarErrorMap);
            sendMessage(Messaging.NotificationType.ActivityErrorChanged, { toolbarType: toolbarType }, rootScope);
            BrowserAction.getService().clearError();
        };
        ErrorHelper.getErrorMessage = function (error, provideRepairGuidance) {
            if (provideRepairGuidance === void 0) { provideRepairGuidance = true; }
            var errorMessage = null;
            if (typeof error === 'string' || error instanceof String) {
                errorMessage = error;
            }
            else {
                if (error.statusText) {
                    errorMessage = error.statusText;
                }
                else if (error.message) {
                    errorMessage = error.message;
                }
                else if (error.errorMessage) {
                    errorMessage = error.errorMessage;
                }
                if (provideRepairGuidance) {
                    if ((errorMessage && errorMessage.match("parsererror$")) || (error.status && error.status === 401)) {
                        errorMessage = "Unable to connect to server. Click on repair in connection settings page. Details:" + errorMessage;
                    }
                }
            }
            return errorMessage;
        };
        ErrorHelper.GetNotSupportedTfsErrorMessage = function () {
            var message = RS.getTFSNotSupportedMessageForBasicUser();
            var connectionOption = ExtensionStorage.LocalStorageService.retrieve(ExtensionStorage.connectedModeKey);
            if (connectionOption === Constants.ConnectionOptionConstants.stakeholderMode) {
                message = RS.getTFSNotSupportedMessageForStakeholder();
            }
            return message;
        };
        return ErrorHelper;
    })();
    exports.ErrorHelper = ErrorHelper;
});
//# sourceMappingURL=ModelHelper.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('../Tracing/Tracing',["require", "exports", "../Common/ExtensionStorage", "../Messaging/ChromeMessaging", "../Messaging/Messaging", "../Model/ModelHelper"], function (require, exports, ExtensionStorage, ChromeMessaging, Messaging, ModelHelper) {
    var ErrorHelper = ModelHelper.ErrorHelper;
    // Trace levels - XT runs at 'Error' level by default.
    (function (TraceLevel) {
        TraceLevel[TraceLevel["Error"] = 0] = "Error";
        TraceLevel[TraceLevel["Perf"] = 1] = "Perf";
        TraceLevel[TraceLevel["Warning"] = 2] = "Warning";
        TraceLevel[TraceLevel["Info"] = 3] = "Info";
        TraceLevel[TraceLevel["Verbose"] = 4] = "Verbose";
    })(exports.TraceLevel || (exports.TraceLevel = {}));
    var TraceLevel = exports.TraceLevel;
    (function (Component) {
        Component[Component["Background"] = 0] = "Background";
        Component[Component["Popup"] = 1] = "Popup";
        Component[Component["AnnotationTool"] = 2] = "AnnotationTool";
    })(exports.Component || (exports.Component = {}));
    var Component = exports.Component;
    // Wrapper around console logging, Idea is to route all tracing through this wrapper.
    // Makes is easy to manage current logging levels - done thru key in local storage - "TracingLevel". 
    // Console logs can be exported and shared easily.
    // For any richer information we can add more functions in this wrapper.
    var TracingService = (function () {
        function TracingService() {
        }
        TracingService.initializeService = function (component) {
            var _this = this;
            this.component = component;
            // Idempotent. TracingService level is read at init only, to optimize on performace.
            // This implies any change in tracing level will take affect when init is called again from various services.
            this.setTracingLevel();
            // Listen to any change in tracing level done from extension options page.
            ChromeMessaging.MessagingFactory.getSubscriptionService().subscribe(function (levelAsString) {
                _this.setTracingLevelFromString(levelAsString);
            }, Messaging.NotificationType.TracingLevelChanged);
            // If tracing service is running in background, we listen to all broadcasted traces.
            if (this.component === Component.Background) {
                // Create tracing directory, its created if its not already there.
                ExtensionStorage.PersistentStorageFactory.getStorageService().createDirectory(this.tracingDirectoryName, this.tracingDirectorySize, function () { }, function () { });
                // Force flush traces queue on session end.
                ChromeMessaging.MessagingFactory.getSubscriptionService().subscribe(function (data, sendResponse) {
                    _this.flushTraceQueue();
                }, Messaging.NotificationType.SessionStop);
                ChromeMessaging.MessagingFactory.getSubscriptionService().subscribe(function (tracePayLoad) {
                    _this.traceInternal(tracePayLoad.traceLevel, tracePayLoad.formattedMessage, tracePayLoad.optionalParams);
                }, Messaging.NotificationType.Trace);
            }
        };
        // Meant to evaluate performance. Mark entry of events/functions with traceEnter.
        // Event name of traceEnter and traceLeave should match to form a pair.
        // We are not using calee.name for perf and use strict issues.
        TracingService.traceEnter = function (eventName, module, tracepoint, message) {
            var optionalParams = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                optionalParams[_i - 4] = arguments[_i];
            }
            // Avoid writing anything to console in perf mode, as it can impact performance.
            // e.g. just by avoiding couple of traces we save ~3ms
            if (this.tracingLevel >= TraceLevel.Perf) {
                console.time(eventName);
            }
            this.trace(module, tracepoint, TraceLevel.Verbose, message, optionalParams);
        };
        // Meant to evaluate performance. Mark exit of events/functions with traceLeave. eventName should match the one used in traceEnter.
        TracingService.traceLeave = function (eventName, module, tracepoint, message) {
            var optionalParams = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                optionalParams[_i - 4] = arguments[_i];
            }
            // Avoid writing anything to console in perf mode, as it can impact performance.
            if (this.tracingLevel >= TraceLevel.Perf) {
                console.timeEnd(eventName);
            }
            this.trace(module, tracepoint, TraceLevel.Verbose, message, optionalParams);
        };
        TracingService.traceError = function (module, tracepoint, message) {
            var optionalParams = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                optionalParams[_i - 3] = arguments[_i];
            }
            this.trace(module, tracepoint, TraceLevel.Error, ErrorHelper.getErrorMessage(message), optionalParams);
        };
        TracingService.traceWarning = function (module, tracepoint, message) {
            var optionalParams = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                optionalParams[_i - 3] = arguments[_i];
            }
            this.trace(module, tracepoint, TraceLevel.Warning, message, optionalParams);
        };
        TracingService.traceInfo = function (module, tracepoint, message) {
            var optionalParams = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                optionalParams[_i - 3] = arguments[_i];
            }
            this.trace(module, tracepoint, TraceLevel.Info, message, optionalParams);
        };
        TracingService.traceVerbose = function (module, tracepoint, message) {
            var optionalParams = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                optionalParams[_i - 3] = arguments[_i];
            }
            this.trace(module, tracepoint, TraceLevel.Verbose, message, optionalParams);
        };
        TracingService.trace = function (module, tracepoint, traceLevel, message) {
            var optionalParams = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                optionalParams[_i - 4] = arguments[_i];
            }
            if (this.tracingLevel < traceLevel) {
                //Return if application is running at lower tracing level as compared to trace itself
                return;
            }
            // ISO time format - 
            // E.g. "2016-05-03T12:23:53.726Z" for local time "Tue May 03 2016 17:53:53 GMT+0530 (India Standard Time)"
            var now = new Date(Date.now());
            var isoNow = "(" + now.toISOString() + ")";
            var formattedMessage = "[" + Component[this.component] + "-" + TraceLevel[traceLevel] + " @" + isoNow + "];XTModule:" + module
                + ";XTModuleTracepoint:" + tracepoint + ";" + message;
            // If tracing service is not running in background context, broadcast tracing message.
            if (this.component !== Component.Background) {
                ChromeMessaging.MessagingFactory.getBroadcastingService().broadcast(Messaging.NotificationType.Trace, { traceLevel: traceLevel, formattedMessage: formattedMessage, optionalParams: optionalParams });
            }
            else {
                this.traceInternal(traceLevel, formattedMessage, optionalParams);
            }
        };
        TracingService.traceInternal = function (traceLevel, message) {
            var optionalParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                optionalParams[_i - 2] = arguments[_i];
            }
            switch (traceLevel) {
                case TraceLevel.Verbose:
                    console.log(message, optionalParams);
                    this.persistTrace(10, message, optionalParams);
                    break;
                case TraceLevel.Info:
                    console.info(message, optionalParams);
                    this.persistTrace(5, message, optionalParams);
                    break;
                case TraceLevel.Warning:
                    console.warn(message, optionalParams);
                    this.persistTrace(0, message, optionalParams);
                    break;
                case TraceLevel.Error:
                    console.error(message, optionalParams);
                    this.persistTrace(0, message, optionalParams);
                    break;
            }
        };
        // Sets local static variable from local storage.
        TracingService.setTracingLevel = function () {
            var _this = this;
            ExtensionStorage.LocalStorageService.retrieveAsync(this.tracingLevelKey, function (levelAsString) {
                _this.setTracingLevelFromString(levelAsString);
            });
        };
        TracingService.setTracingLevelFromString = function (levelAsString) {
            if (levelAsString != undefined) {
                var level = Number(levelAsString);
                this.tracingLevel = level;
            }
        };
        TracingService.persistTrace = function (chunkingSize, message) {
            var optionalParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                optionalParams[_i - 2] = arguments[_i];
            }
            var trace = this.getFormattedTrace(message, optionalParams);
            this.traceQueue.push(trace);
            if (this.traceQueue.length > chunkingSize) {
                this.flushTraceQueue();
            }
        };
        TracingService.getFormattedTrace = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            for (var param in optionalParams) {
                message = '\n' + message.replace("{" + param + "}", arguments[param]);
            }
            return message;
        };
        TracingService.flushTraceQueue = function () {
            if (this.traceQueue.length > 0) {
                var traces = this.traceQueue;
                this.traceQueue = new Array();
                var blob = new Blob([traces], { type: 'text/plain' });
                ExtensionStorage.PersistentStorageFactory.getStorageService().writeBlobInDir(this.tracingDirectoryName, this.getTraceFileName(), blob, function () {
                }, function () { }, true);
            }
        };
        TracingService.getDayOfWeek = function () {
            var now = new Date();
            return now.getDay();
        };
        TracingService.getTraceFileName = function () {
            var currentDayofWeek = this.getDayOfWeek();
            var lastTraceDate = ExtensionStorage.LocalStorageService.retrieve(this.lastTraceDate);
            var traceFileName = this.traceFileNamePrefix + currentDayofWeek;
            // If the day has changed since we logged last, then clear the trace file for current day.
            if (lastTraceDate !== currentDayofWeek) {
                ExtensionStorage.LocalStorageService.store(this.lastTraceDate, currentDayofWeek);
                ExtensionStorage.PersistentStorageFactory.getStorageService().removeBlobInDir(this.tracingDirectoryName, traceFileName, function () {
                }, function () { });
            }
            return traceFileName;
        };
        TracingService.tracingLevelKey = "TracingLevel";
        TracingService.component = Component.Background;
        TracingService.tracingDirectoryName = "Logs";
        // Default tracing level is set to error.
        TracingService.tracingLevel = TraceLevel.Error;
        TracingService.traceFileNamePrefix = "xt-console-traces-";
        TracingService.traceQueue = new Array();
        TracingService.tracingDirectorySize = 100 * 1024 * 1024; // 100 MB
        TracingService.lastTraceDate = "LastTraceDate";
        return TracingService;
    })();
    exports.TracingService = TracingService;
});
//# sourceMappingURL=Tracing.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
define('Options',["require", "exports", "../Tracing/Tracing", "../Messaging/ChromeMessaging", "../Messaging/Messaging", "../Common/ExtensionStorage", "../Common/Constants", "../Common/FeatureAvailabiliy", "../Model/BrowserHelper"], function (require, exports, Tracing, ChromeMessaging, Messaging, Storage, Constants, FeatureAvailabiliy, BrowserHelp) {
    var FeatureFlags = FeatureAvailabiliy.FeatureFlag;
    var FeatureFlagService = FeatureAvailabiliy.FeatureAvailibilityService;
    var BrowserHelper = BrowserHelp.BrowserHelper;
    var optionsModule = angular.module('options', []);
    var tracingLevelKey = Tracing.TracingService.tracingLevelKey;
    var actionLogKey = Storage.actionLogKey;
    optionsModule.config([
        '$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(filesystem):/);
        }
    ]);
    optionsModule.controller('optionsController', function ($scope) {
        $scope.showTraceLink = true;
        // Get current tracing level from storage.
        var tracingLevel = Storage.LocalStorageService.retrieve(tracingLevelKey);
        $scope.selected = (tracingLevel === undefined || tracingLevel === null) ? "0" : tracingLevel;
        // Todo: replace following with enum, will be done along with angular dependency injection.
        // None is added to workaround angular bug https://github.com/angular/angular.js/issues/10161
        $scope.values = [{ "0": "Error" }, { "1": "Perf" }, { "2": "Warning" }, { "3": "Info" }, { "4": "Verbose" }, { "5": "none" }];
        // Save the changed level on selection changed.
        $scope.selectedItemChanged = function () {
            Storage.LocalStorageService.store(tracingLevelKey, $scope.selected);
            // Broadcast the change, any active tracer can change the level
            ChromeMessaging.MessagingFactory.getChromeBroadcastingService().
                broadcast(Messaging.NotificationType.TracingLevelChanged, $scope.selected);
        };
        var actionLogCount = Storage.LocalStorageService.retrieve(Storage.sessionActionLogMaxCountKey);
        actionLogCount = !!actionLogCount ? actionLogCount : Constants.ActionLogConstants.defaultActionLogCount;
        var actionLog = FeatureFlagService.isFeatureEnabled(FeatureFlags.ActionLog);
        var perfData = FeatureFlagService.isFeatureEnabled(FeatureFlags.PerfData);
        var includeInProgressVideoRecording = FeatureFlagService.isFeatureEnabled(FeatureFlags.OngoingRecording) && BrowserHelper.isChrome();
        $scope.actionLog = (actionLog === undefined || actionLog === null) ? false : actionLog;
        $scope.actionLogCount = actionLogCount;
        $scope.perfData = (perfData === undefined || perfData === null) ? false : perfData;
        $scope.includeInProgressVideoRecording = (includeInProgressVideoRecording === undefined || includeInProgressVideoRecording === null) ? false : includeInProgressVideoRecording;
        $scope.disableVideoOption = !BrowserHelper.isChrome();
        $scope.changeActionLogFlag = function () {
            FeatureFlagService.setFeatureFlagState(FeatureFlags.ActionLog, $scope.actionLog);
            $scope.$apply();
        };
        $scope.changePerfDataFlag = function () {
            FeatureFlagService.setFeatureFlagState(FeatureFlags.PerfData, $scope.perfData);
            $scope.$apply();
        };
        $scope.changeVidRecFlag = function () {
            FeatureFlagService.setFeatureFlagState(FeatureFlags.OngoingRecording, $scope.includeInProgressVideoRecording);
            $scope.$apply();
        };
        $scope.changeMaxActionLogCount = function () {
            if ($scope.actionLogCount >= 1 && $scope.actionLogCount <= 200) {
                $scope.actionLogCountError = false;
                Storage.LocalStorageService.store(Storage.sessionActionLogMaxCountKey, $scope.actionLogCount);
            }
            else {
                $scope.actionLogCountError = true;
            }
            $scope.$apply();
        };
        $scope.showAllTraces = function () {
            var tracingDirLink = "";
            if (BrowserHelper.isChrome()) {
                tracingDirLink = "filesystem:" + chrome.extension.getURL("persistent/" + Tracing.TracingService.tracingDirectoryName);
                chrome.tabs.create({ url: tracingDirLink }, function (window) { });
            }
            else {
                tracingDirLink = chrome.extension.getURL("TracesPage/TracesPage.html");
                var win = window.open(tracingDirLink, '_blank');
                win.focus();
            }
        };
    });
});
//# sourceMappingURL=Options.js.map;
/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
require(['Options'], function () {
    angular.bootstrap(document, ['options']);
});
//# sourceMappingURL=main.js.map;
define("main", function(){});

