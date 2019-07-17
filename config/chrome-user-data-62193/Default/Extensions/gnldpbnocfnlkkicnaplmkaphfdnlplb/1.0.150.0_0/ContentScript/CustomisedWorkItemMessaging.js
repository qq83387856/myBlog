/*
* ---------------------------------------------------------
* Copyright(C) Microsoft Corporation. All rights reserved.
* ---------------------------------------------------------
*/
window.addEventListener("message", function (event) {
    // GUID is used to uniquely identify the message type which is send over to content script
    if (event.source !== window)
        return;
    if (event.data.type && (event.data.type === "xtPage-547BB7B6-7345-41C8-8CCB-A09999B89924")) {
        // Using Console logs since do not wanted to add dependency on Tracing js as this runs in context of web page.
        console.log("Content script received: " + event.data.text);
        // notification type 0 is for new message which is send from content script. We can convert this to guid later whenever required
        if (!isCustomizedBugCreated) {
            isCustomizedBugCreated = true;
            chrome.runtime.sendMessage({ notificationType: "0", data: { id: event.data.id, type: event.data.workItemtype, title: event.data.title } }, function (response) {
            });
        }
    }
    // Using same event data type in twa code while sending message.
    // So whenver make changes here make sure to update twa code as well.
    if (event.data.type && (event.data.type === "xtPage-traceability-c07e08f5-c27c-4025-868c-e4ddc3947767")) {
        // using to handle standalone scenario
        chrome.runtime.sendMessage({ notificationType: "3" }, function (response) {
            if (!response) {
                window.postMessage({ type: "xtPage-traceability-enabled" }, '*');
            }
        });
    }
    if (event.data.type && (event.data.type === "xtPage-traceability-workItem")) {
        var workItemObject = event.data.workItem;
        var tfsTeamPath = event.data.tfsTeamPath;
        //Notification type 2 is for message StartTraceability
        chrome.runtime.sendMessage({ notificationType: "2", data: { workItem: workItemObject, tfsTeamPath: tfsTeamPath } }, function (response) {
        });
    }
    if (event.data.type && (event.data.type === "xtPage-get-activeTabs-metaData-v1")) {
        //Notification type 51 is for message ScreenshotCaptureGetActiveWindow_V1
        chrome.runtime.sendMessage({ notificationType: "51", data: {} }, function (response) {
            window.postMessage({ type: "xtPage-get-activeTabs-metaData-response-v1", data: response }, '*');
        });
    }
    if (event.data.type && (event.data.type === "xtPage-capture-screenshot-v1")) {
        //Notification type 52 is for message CaptureScreenshot_V1
        chrome.runtime.sendMessage({ notificationType: "52", data: event.data.screenshotPayload }, function (response) {
        });
    }
    if (event.data.type && (event.data.type === "xtPage-capture-desktopScreenshot-v1")) {
        //Notification type 83 is for message CaptureDesktopScreenshot_V1
        chrome.runtime.sendMessage({ notificationType: "83", data: event.data.screenshotPayload }, function (response) {
            window.postMessage({ type: "xtPage-capture-desktopScreenshot-response-v1", data: response }, '*');
        });
    }
    if (event.data.type && (event.data.type === "xtPage-get-systemInfo-v1")) {
        //Notification type 57 is for message GetSystemInfomation_V1
        chrome.runtime.sendMessage({ notificationType: "57", data: {} }, function (response) {
            window.postMessage({ type: "xtPage-get-systemInfo-response-v1", data: response }, '*');
        });
    }
    if (event.data.type && (event.data.type === "xtPage-start-video-capture-v1")) {
        //Notification type 58 is for message StartVideoCapture_V1
        chrome.runtime.sendMessage({ notificationType: "58", data: event.data.videoCapturePayload }, function (response) {
            window.postMessage({ type: "xtPage-start-video-capture-response-v1", data: response }, '*');
        });
    }
    if (event.data.type && (event.data.type === "xtPage-stop-video-capture-v1")) {
        //Notification type 59 is for message StopVideoCapture_V1
        chrome.runtime.sendMessage({ notificationType: "59", data: {} }, function (response) {
        });
    }
    if (event.data.type && (event.data.type === "xtPage-start-capture-action-v1")) {
        //Notification type 66 is for message StartActionLogCapture_V1
        chrome.runtime.sendMessage({ notificationType: "66", data: event.data.startActionLogPayload }, function (response) {
        });
    }
    if (event.data.type && (event.data.type === "xtPage-stop-capture-action-v1")) {
        //Notification type 67 is for message StopActionLogCapture_V1
        chrome.runtime.sendMessage({ notificationType: "67", data: event.data.actionLogPayload }, function (response) {
        });
    }
    if (event.data.type && (event.data.type === "xtPage-generate-inprogress-action-v1")) {
        //Notification type 68 is for message GetActionLogReport_V1
        chrome.runtime.sendMessage({ notificationType: "68", data: event.data.actionLogPayload }, function (response) {
        });
    }
    if (event.data.type && (event.data.type === "xtPage-get-isSessionActive-v1")) {
        //Notification type 75 is for VerifyIfSessionIsRunning
        chrome.runtime.sendMessage({ notificationType: "75", data: {} }, function (response) {
            window.postMessage({ type: "xtPage-get-isSessionActive-response-v1", data: response }, '*');
        });
    }
    if (event.data.type && (event.data.type === "xtPage-configure-xt-v1")) {
        //Notification type 76 is for ConfigureXtForFeedbackRequest
        chrome.runtime.sendMessage({ notificationType: "76", data: event.data.configSettings }, function (response) {
            window.postMessage({ type: "xtPage-configure-xt-response-v1", data: response }, '*');
        });
    }
}, false);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request) {
        // handle cancellation, maps to ScreenshotCaptureCancelled_V1
        if (request.notificationType === 53) {
            window.postMessage({ type: "xtPage-capture-cancelled-v1", data: {} }, '*');
        }
        // handle completion, maps to ScreenshotCaptureCompleted_V1
        if (request.notificationType === 54) {
            window.postMessage({ type: "xtPage-capture-completed-v1", data: request.data }, '*');
        }
        // handle error, maps to ScreenshotCaptureError_V1
        if (request.notificationType === 55) {
            window.postMessage({ type: "xtPage-capture-error-v1", data: request.data }, '*');
        }
        // handle error, maps to VideoCaptureError_V1
        if (request.notificationType === 60) {
            window.postMessage({ type: "xtPage-video-capture-error-v1", data: request.data }, '*');
        }
        // handle completion, maps to VideoCaptureCompleted_V1
        if (request.notificationType === 61) {
            window.postMessage({ type: "xtPage-video-capture-completed-v1", data: request.data }, '*');
        }
        // handle completion, maps to VideoCaptureCancelled_V1
        if (request.notificationType === 62) {
            window.postMessage({ type: "xtPage-video-capture-cancelled-v1", data: request.data }, '*');
        }
        // handle completion, maps to VideoCaptureStarted_V1
        if (request.notificationType === 63) {
            window.postMessage({ type: "xtPage-video-capture-started-v1", data: request.data }, '*');
        }
        // handle completion, maps to ActionLogContainerCreated_V1
        if (request.notificationType === 69) {
            window.postMessage({ type: "xtPage-capture-action-container-created-v1", data: request.data }, '*');
        }
        // handle completion, maps to ActionLogError_V1
        if (request.notificationType === 70) {
            window.postMessage({ type: "xtPage-capture-action-error-v1", data: request.data }, '*');
        }
        // handle completion, maps to ActionLogUploadCompleted_V1
        if (request.notificationType === 71) {
            window.postMessage({ type: "xtPage-capture-action-upload-completed-v1", data: request.data }, '*');
        }
        // handle completion, maps to PingTab
        if (request.notificationType === 72) {
            sendResponse(request);
        }
    }
});
var isCustomizedBugCreated = false;
//# sourceMappingURL=CustomisedWorkItemMessaging.js.map