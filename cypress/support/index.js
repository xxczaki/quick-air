Cypress.on('window:before:load', win => {
	win.indexedDB.deleteDatabase('keyval-store');
});
