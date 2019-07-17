require.config({
    paths: {
        "jquery.xml2json": "../../Scripts/jquery.xml2json",
        "PersistentStorage": "../Common/PersistentStorageProxy",
        "MediaRecorder": "../Common/MediaRecordProxy",
        "q": "../../Scripts/q.min",
        "VSS": "../../VSS"
    },
    shim: {
        'Popup.Module': {
            deps: [
                'Shell/Shell.Module',
                '../../Tracing/Tracing'
            ]
        },
        'Shell/Shell.Module': {
            deps: [
                'Toolbar/Toolbar.Module',
                'BugForm/BugForm.Module',
                'BugForm/BugForm2.Module',
                'SignIn/SignInForm.Module',
                'NoteForm/NoteForm.Module',
                'Timeline/Timeline.Module',
                'Session/Session.Module',
                'VideoCapture/VideoCapture.Module',
                'MobileXt/MobileXt.Module',
                'About/About.Module',
                'License/License.Module'
            ]
        },
        'Toolbar/Toolbar.Module': {
            exports: 'Toolbar/Toolbar.Module',
            deps: [
                'Common/Common.Module',
                'CommonControls/CommonControls.Module',
                'Toolbar/Toolbar.Controller',
                'Toolbar/Toolbar.Filter',
                'Toolbar/ToolbarItem.Service'
            ]
        },
        'BugForm/BugForm.Module': {
            deps: [
                'BugForm/BugForm.Controller',
                'CommonControls/CommonControls.Module',
                'Common/Common.Module'
            ]
        },
        'TaskForm/TaskForm.Module': {
            deps: [
                'TaskForm/TaskForm.Controller',
                'CommonControls/CommonControls.Module',
                'Common/Common.Module'
            ]
        },
        'FeedbackResponseForm/FeedbackResponseForm.Module': {
            deps: [
                'FeedbackResponseForm/FeedbackResponseForm.Controller',
                'StarRatingControl/StarRating.Module',
                'CommonControls/CommonControls.Module',
                'Common/Common.Module'
            ]
        },
        'FeedbackRequests/FeedbackRequests.Module': {
            deps: [
                'FeedbackRequests/FeedbackRequests.Controller',
                'FeedbackRequests/FeedbackRequestDetail.Controller',
                'CommonControls/CommonControls.Module',
                'FeedbackRequests/Feedback.Filter'
            ]
        },
        'ForceStopSession/ForceStopSession.Module': {
            deps: [
                'ForceStopSession/ForceStopSession.Controller',
                'CommonControls/CommonControls.Module',
                'Common/Common.Module'
            ]
        },
        'BugForm/BugForm2.Module': {
            deps: [
                'BugForm/BugForm2.Controller',
                'BugForm/BugSearchResult.Controller',
                'CommonControls/CommonControls.Module',
                'Common/Common.Module'
            ]
        },
        'SignIn/SignInForm.Module': {
            deps: [
                'SignIn/SignIn.Controller',
                'CommonControls/Url.Filter',
                'AngularTreeControl/TreeView.Module',
                'Common/Common.Module'
            ]
        },
        'NoteForm/NoteForm.Module': {
            deps: [
                'NoteForm/NoteForm.Controller']
        },
        'Session/Session.Module': {
            deps: [
                'CommonControls/CommonControls.Module'
            ]
        },
        'VideoCapture/VideoCapture.Module': {
            deps: [
                'CommonControls/CommonControls.Module',
                'VideoCapture/VideoCapture.Controller'
            ]
        },
        'Timeline/Timeline.Module': {
            deps: [
                'Timeline/Timeline.Controller',
                'PersistentStorage'
            ]
        },
        'Traceability/Traceability.Module': {
            deps: [
                'Traceability/Traceability.Controller'
            ]
        },
        'MobileXt/MobileXt.Module': {
            deps: [
                'MobileXt/MobileXt.Controller',
                'CommonControls/Url.Filter'
            ]
        },
        'CommonControls/CommonControls.Module': {
            deps: [
                'CommonControls/HtmlEditor.Directive',
                'CommonControls/InputDropdown.Directive',
                'CommonControls/ngEnter.Directive',
                'CommonControls/ngSave.Directive',
                'CommonControls/ContentEditable.Directive',
                'CommonControls/ToLocaleDate.Filter'
            ]
        },
        'Common/Common.Module': {
            deps: [
                'Common/WorkItem.Service',
                'Common/Session.Service',
                'Common/Utility.Service',
                'Common/ConnectionInfo.Service',
                'Common/Screenshot.Service',
                'Common/Timeline.Service',
                'Common/MobileXt.Service',
                'Common/Traceability.Service'
            ]
        },
        'AngularTreeControl/TreeView.Module': {
            deps: [
                'AngularTreeControl/TreeView.Directive',
                'CommonControls/Scroll.Directive'
            ]
        },
        'StarRatingControl/StarRating.Module': {
            deps: [
                'StarRatingControl/StarRating.Directive',
                'CommonControls/Scroll.Directive']
        },
        'About/About.Module': {
            deps: [
                'Common/ResourceUtility.Service',
                'About/About.Controller'
            ]
        },
        'Notification/Notification.Module': {
            deps: [
                'Notification/Notification.Controller'
            ]
        },
        'License/License.Module': {
            deps: [
                'License/License.Controller'
            ]
        }
    }
});