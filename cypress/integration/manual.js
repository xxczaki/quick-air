describe('Manual (correct)', () => {
	it('successfully loads', () => {
		cy.visit('/');
	});

	it('clicks on a checkbox', () => {
		cy.get('#__next > div > label').click();
	});

	it('types location', () => {
		cy.get('#__next > div > input').type('Berlin');
	});

	it('clicks on a button', () => {
		cy.get('#__next > div > button').click();
	});
});

describe('Manual (incorrect)', () => {
	it('successfully loads', () => {
		cy.visit('/');
	});

	it('clicks on a checkbox', () => {
		cy.get('#__next > div > label').click();
	});

	it('types location', () => {
		cy.get('#__next > div > input').type('foobarbaz');
	});

	it('clicks on a button', () => {
		cy.get('#__next > div > button').click();
	});

	it('shows an error', () => {
		cy.get('div').contains('Location not found');
	});
});
