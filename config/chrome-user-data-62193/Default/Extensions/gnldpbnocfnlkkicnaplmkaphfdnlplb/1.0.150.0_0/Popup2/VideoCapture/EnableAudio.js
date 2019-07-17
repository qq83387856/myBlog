function takeAudioPermission() {
    navigator.webkitGetUserMedia({ audio: true, video: false }, (audiostream) => {
        window.close();
    }, (error) => {

        document.getElementById("permission-detail").innerHTML = "<p>Allow Test &amp; Feedback extension to access microphone by clicking on 'microphone access blocked' icon in browser location bar, close this window and launch a session again</p>";
        document.getElementById("permission-image").src = "../Images/AllowAudioError.gif";
        console.log(error);
    });
}
 
window.onload = takeAudioPermission;