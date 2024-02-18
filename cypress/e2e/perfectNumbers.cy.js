describe('Perfect Numbers App', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('loads the app', () => {
        cy.contains('Perfect Numbers')
    })

    it('input data', () => {
        const input = "6"
        cy.get('input').first().type(input).should('have.value', input)
    })

    it('button click has to show the spinner', () => {
        cy.get('input').first().type('6')
        cy.get('input').last().type('28')
        cy.get('button').contains('Get Perfect Numbers').click()
        cy.get('#spinner').should('exist')

    })

    it('displays perfect numbers', () => {
        cy.get('input').first().type('7')
        cy.get('input').last().type('28')
        cy.get('button').contains('Get Perfect Numbers').click()
        cy.contains('Number one (7) is not a perfect number')
        cy.contains('Number two (28) is a perfect number')
    })

    it('clear all fields', () => {
        cy.get('input').first().type('6')
        cy.get('input').last().type('28')
        cy.get('button').contains('Get Perfect Numbers').click()
        cy.contains('Number one (6) is a perfect number')
        cy.contains('Number two (28) is a perfect number')
        cy.get('#clearButton').click()
        cy.get('input').first().should('have.value', '')
        cy.get('input').last().should('have.value', '')
    })
})