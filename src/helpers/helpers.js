export const getOS = ()=>{
    const userAgent = window.navigator.userAgent;
    let OSName = 'unknown';
    switch (true) {
        case /Windows NT 10.0/.test(userAgent):
          OSName = "Windows 10";
          break;
        case /Windows NT 6.3/.test(userAgent):
          OSName = "Windows 8.1";
          break;
        case /Windows NT 6.2/.test(userAgent):
          OSName = "Windows 8";
          break;
        case /Windows NT 6.1/.test(userAgent):
          OSName = "Windows 7";
          break;
        case /Windows NT 6.0/.test(userAgent):
          OSName = "Windows Vista";
          break;
        case /Windows NT 5.1/.test(userAgent):
          OSName = "Windows XP";
          break;
        case /Windows NT 5.0/.test(userAgent):
          OSName = "Windows 2000";
          break;
        case /Mac|iOS/.test(userAgent):
          OSName = "Mac";
          break;
        case /X11/.test(userAgent):
          OSName = "UNIX";
          break;
        case /Linux/.test(userAgent):
          OSName = "Linux";
          break;
        default:
          OSName = 'unknown';
      }
      return OSName;
}