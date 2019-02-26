// TODO: this feature is for future
// NOTE: because the extension is not running in the same thread as where the studentNumber exists
// We have to hack around it to get the value using ugly document querySelector and matching strings
// Sure we could use chrome extension api to access the window api but then the extension will break on other browsers
// If you find a better (and crossbrowser) way to do this, please feel free to do it
// UGH
export const getOpiskelijanumero = (): string | null =>
  (((document.querySelector('script') || { innerText: '' }).innerText.match(
    /"studentNumber":"\d+"/,
  ) || [''])[0].match(/\d+/) || [null])[0];
