import { CARTO_CONFIG } from '../config'

describe('when entering the app', function () {
  it('user arrives home', function () {
    cy.visit(CARTO_CONFIG.url)
    cy.title().should('include', 'CARTO')
  })

  const loginUrl = `${CARTO_CONFIG.url}/login`

  describe('when trying to login in...', function () {
    it('it fails without credentials', function () {
      cy.visit(loginUrl)
      cy.contains('Log in').click()

      cy.get('#session_email').should('have.class', 'inputWithError')
      cy.get('#session_password').should('have.class', 'inputWithError')
      cy.url().should('include', 'sessions')
    })

    it('user logs in with valid credentials', function () {
      cy.visit(loginUrl)
      cy.get('#session_email').type(CARTO_CONFIG.username)
      cy.get('#session_password').type(CARTO_CONFIG.password)
      cy.contains('Log in').click()

      cy.url().should('include', 'dashboard')
    })
  })
})
