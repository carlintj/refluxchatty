export function dumpState(state) {
    var json = JSON.stringify(state);
    var blob = new Blob([json], {type: 'application/json'});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download    = 'backup.json';
    a.href        = url;
    a.textContent = 'Download backup.json';
    a.click();

    

    return state;
}